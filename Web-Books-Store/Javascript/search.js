"use strict";

import { renderProducts } from "./Products.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get("query")?.toLowerCase() || "";

  const productContainer = document.getElementById("productContainer");
  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter = document.getElementById("priceFilter");

  // Lấy danh sách sản phẩm từ localStorage
  const products = JSON.parse(localStorage.getItem("products") || "[]");

  // Hàm áp dụng bộ lọc
  const applyFilters = (productList, searchQuery) => {
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;

    return productList.filter((product) => {
      // Lọc theo từ khóa (nếu có)
      const name = product.name?.toLowerCase() || "";
      const author = product.author?.toLowerCase() || "";
      const genre = product.genre?.toLowerCase() || "";
      const type = product.type?.toLowerCase() || "";
      const queryMatch = searchQuery? name.includes(searchQuery) ||
          author.includes(searchQuery) ||
          genre.includes(searchQuery) ||
          type.includes(searchQuery)
        : true;

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
  };

  // Hàm hiển thị sản phẩm
  const displayProducts = (searchQuery) => {
    const filteredProducts = applyFilters(products, searchQuery);

    if (filteredProducts.length > 0) {
      renderProducts(filteredProducts, productContainer);
    } else {
      productContainer.innerHTML =
        '<div class="font-size-13 font-bold">Không tìm thấy sản phẩm nào phù hợp</div>';
    }
  };

  // Khi có từ khóa tìm kiếm hoặc không
  if (productContainer) {
    displayProducts(query); // Hiển thị sản phẩm theo từ khóa tìm kiếm (hoặc toàn bộ nếu không có từ khóa)
  }

  // Sự kiện thay đổi bộ lọc
  [categoryFilter, priceFilter].forEach((filter) => {
    filter?.addEventListener("change", () => {
      displayProducts(query); // Áp dụng lại bộ lọc với từ khóa hiện tại
    });
  });
});
