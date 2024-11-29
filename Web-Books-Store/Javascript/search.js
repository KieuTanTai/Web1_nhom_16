"use strict";

import * as Bridge from "./Bridge.js";
import { formatPrices } from "./Interface.js";
import { execQueryHandler } from "./Navigate.js";
import { getProductBooks, renderProducts } from "./Products.js";

  // Hàm áp dụng bộ lọc
function applyFilters(productList, searchQuery, elementsObj) {
  if (!elementsObj)
    elementsObj = Bridge.default();
  const categoryFilter = elementsObj.getCategoryFilter();
  const priceFilter = elementsObj.getPriceFilter();
  const category = categoryFilter?.value;
  const priceRange = priceFilter?.value;

  // Lọc theo từ khóa (nếu có)
  return productList.filter((product) => {
    const name = product.name?.toLowerCase() || "";
    const author = product.author?.toLowerCase() || "";
    const genre = product.genre?.toLowerCase() || "";
    const type = product.type?.toLowerCase() || "";
    const queryMatch = searchQuery? name.includes(searchQuery) || author.includes(searchQuery) 
      || genre.includes(searchQuery) || type.includes(searchQuery) : true;

    // Lọc theo thể loại
    const categoryMatch = category ? product.type === category : true;

    // Lọc theo khoảng giá
    const price = product.price * (1 - product.sale); // Giá sau giảm giá
    let priceMatch = true;
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      priceMatch = max ? price >= min && price <= max : price >= min;
    }

    return queryMatch && categoryMatch && priceMatch;
  });
}

  // Hàm hiển thị sản phẩm
function displayProducts(productList, searchQuery, elementsObj) {
  if (!elementsObj)
    elementsObj = Bridge.default();
  const filteredProducts = applyFilters(productList, searchQuery);
  const productContainer = elementsObj.getResultContainer()?.querySelector(".product-container");

  if (!productContainer)
    return;
  if (filteredProducts.length > 0) {
    renderProducts(filteredProducts, productContainer);
    formatPrices(Bridge.default());
  } 
  else
    productContainer.innerHTML = '<div class="font-size-13 font-bold">Không tìm thấy sản phẩm nào phù hợp</div>';
}

function changeByFilter (elements ,query, productList) {
  elements.forEach((filter) => filter?.addEventListener("change", () => displayProducts(productList, query)));
}

function test () {
  let elementsObj = Bridge.default();
  const query = execQueryHandler("query");
  // Lấy danh sách sản phẩm từ localStorage
  let productList = getProductBooks();
  // Khi có từ khóa tìm kiếm hoặc không
  displayProducts(productList, query, elementsObj); // Hiển thị sản phẩm theo từ khóa tìm kiếm (hoặc toàn bộ nếu không có từ khóa)
  // Sự kiện thay đổi bộ lọc
  changeByFilter([elementsObj.getCategoryFilter(), elementsObj.getPriceFilter()], query, productList);
}

document.addEventListener("DOMContentLoaded", () => {
  test();
});

export { test };