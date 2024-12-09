"use strict";

import * as Bridge from "./Bridge.js";
import {
  formatPrices,
  hiddenException,
  resizeImages,
  scrollView,
} from "./Interface.js";
import { execQueryHandler } from "./Navigate.js";
import { getProductBooks, renderProducts } from "./Products.js";

function searchBtn() {
  // Lấy nút và input tìm kiếm
  let searchBtn = Bridge.$("button[type=button].search-btn");
  let searchInput = Bridge.$("#search-input");

  // Sự kiện click vào nút tìm kiếm
  searchBtn.addEventListener("click", () => {
    let bookName = searchInput?.value.trim(); // Lấy giá trị từ input nếu có
    bookName = bookName;
    renderSearchDOM(bookName); // Gọi hàm hiển thị với từ khóa
  });

  // Sự kiện nhấn phím Enter để tìm kiếm
  searchInput?.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Ngăn chặn hành vi mặc định
      let bookName = searchInput.value.trim();
      bookName = bookName;
      renderSearchDOM(bookName);
    }
  });
}

async function renderSearchDOM(bookName) {
  let searchContent = Bridge.default().getSearchContent();
  hiddenException("search-content");
  searchContent.innerHTML = searchDOM(); // Tạo giao diện tìm kiếm
  scrollView();
  let newURL = `${location.href.slice(0, location.href.lastIndexOf("/") + 1)}index.html?query=${bookName}`;
  window.history.pushState({}, "", newURL); // Cập nhật URL
  test(); // Hiển thị sản phẩm theo từ khóa
}

function searchDOM() {
  return `
          <section id="filters">
            <label for="category-filter">Thể loại:</label>
            <select id="category-filter">
                  <option value="">Tất cả</option>
                  <option value="manga">Manga</option>
                  <option value="light novel">Light Novel</option>
                  <option value="education">Education</option>
            </select>

            <label for="price-filter" class="padding-left-12">Khoảng giá:</label>
            <select id="price-filter">
                  <option value="">Tất cả</option>
                  <option value="0-100000">0đ - 100,000đ</option>
                  <option value="100000-200000">100,000đ - 200,000đ</option>
                  <option value="200000-300000">200,000đ - 300,000đ</option>
                  <option value="300000-">300,000đ trở lên</option>
            </select>
        </section>

        <!-- Vùng hiển thị sản phẩm -->
        <section id="search-results-container" class="container flex grid-col col-l-12 col-m-12 col-s-12 no-gutter">
            <div class="category-tab">
                  <div class="heading">
                      <div id="search-book-label" class="heading-label"></div>
                      <div class="uppercase font-bold font-size-20 padding-left-8"> Kết quả tìm kiếm: </div>
                  </div>

                  <!-- container for products -->
                  <div class="product-container" style="flex-flow: row wrap"></div>
            </div>
        </section>
  `;
}

// Hàm áp dụng bộ lọc
function applyFilters(productList, searchQuery, elementsObj) {
  if (!elementsObj) elementsObj = Bridge.default();
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
    const queryMatch = searchQuery ? name.includes(searchQuery) || author.includes(searchQuery) || genre.includes(searchQuery) || type.includes(searchQuery) : true;

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
  if (!elementsObj) elementsObj = Bridge.default();
  const filteredProducts = applyFilters(productList, searchQuery);
  const productContainer = elementsObj.getResultContainer() ?.querySelector(".product-container");

  if (!productContainer) return;
  if (filteredProducts.length > 0) {
    renderProducts(filteredProducts, productContainer);
    formatPrices(elementsObj);
    resizeImages(elementsObj);
  } else
    productContainer.innerHTML = '<div class="font-size-13 font-bold">Không tìm thấy sản phẩm nào phù hợp</div>';
}

function changeByFilter(elements, query, productList) {
  elements.forEach((filter) => filter?.addEventListener("change", () => displayProducts(productList, query)));
}

function test() {
  let elementsObj = Bridge.default();
  const query = execQueryHandler("query");
  // Lấy danh sách sản phẩm từ localStorage
  let productList = getProductBooks();
  // Khi có từ khóa tìm kiếm hoặc không
  displayProducts(productList, query, elementsObj); // Hiển thị sản phẩm theo từ khóa tìm kiếm (hoặc toàn bộ nếu không có từ khóa)
  // Sự kiện thay đổi bộ lọc
  changeByFilter([elementsObj.getCategoryFilter(), elementsObj.getPriceFilter()], query, productList);
}

export { test, searchBtn, renderSearchDOM };
