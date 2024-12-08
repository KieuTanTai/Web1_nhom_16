import { getProductBooks, renderProducts } from './Products.js';

// page.js: Xử lý hiển thị phần nội dung dựa trên URL
document.addEventListener('DOMContentLoaded', () => {
    // Khởi chạy khi DOM đã tải xong
    initializePage();
});
const ITEMS_PER_PAGE = 10; // Số sản phẩm trên mỗi trang
/**
 * Hàm khởi tạo trang
 */
function initializePage() {
    // Lấy tham số từ URL
    const categoryId = getCategoryFromURL();

    if (categoryId) {
        // Ẩn tất cả các section
        hideAllSections();

        // Hiển thị section mục tiêu
        showTargetSection(categoryId);
        // Lấy danh sách sản phẩm từ localStorage
        const allProducts = getProductBooks();

        // Lọc sản phẩm theo danh mục
        const filteredProducts = filterProductsByCategory(allProducts, categoryId);
        console.log("Filtered Products:", filteredProducts);
        

        // Tích hợp phân trang
        setupPagination(filteredProducts, categoryId);
    }
}
/**
 * Lọc sản phẩm theo danh mục
 * @param {Array} products Danh sách sản phẩm
 * @param {string} categoryId ID của danh mục
 * @returns {Array} Danh sách sản phẩm đã lọc
 */
function filterProductsByCategory(products, categoryId) {
    if (!products || !categoryId) return [];
    switch (categoryId) {
        case 'fs-container':
            return products.sort((a, b) => b.sale - a.sale);
        case 'new-books-container':
            return products.slice(-5);
        case 'best-selling-container':
            return products.sort((a, b) => b.quantity - a.quantity);
        case 'light-novel-container':
            return products.filter((product) => product.type === 'light novel');
        case 'manga-container':
            return products.filter((product) => product.type === 'manga');
        case 'other-books-container':
            return products.sort((a, b) => a.releaseDate - b.releaseDate);
        default:
            return products;
    }
}

/**
 * Tích hợp phân trang
 * @param {Array} products Danh sách sản phẩm đã lọc
 * @param {string} categoryId ID của danh mục
 */
function setupPagination(products, categoryId) {
    if (!products || products.length === 0) {
        console.error("Không có sản phẩm để phân trang.");
        return;
    }

    const targetSection = document.getElementById(categoryId);
    if (!targetSection) {
        console.error(`Không tìm thấy section với ID "${categoryId}".`);
        return;
    }

    const container = targetSection.querySelector('.product-container');
    if (!container) {
        console.error("Không tìm thấy container sản phẩm.");
        return;
    }

    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    console.log(`Tổng số trang: ${totalPages}, Tổng sản phẩm: ${products.length}`);

    displayPage(products, container, 1);
    createPaginationControls(targetSection, products, container, totalPages);
}


/**
 * Hiển thị sản phẩm của một trang
 * @param {Array} products Danh sách sản phẩm
 * @param {HTMLElement} container Container hiển thị sản phẩm
 * @param {number} pageNumber Số trang hiện tại
 */
function displayPage(products, container, pageNumber) {
    container.innerHTML = ""; // Làm trống container

    const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const pageProducts = products.slice(startIndex, endIndex);

    // Hiển thị sản phẩm
    renderProducts(pageProducts, container);

    console.log(`Hiển thị trang ${pageNumber}:`, pageProducts);
}


/**
 * Tạo nút điều khiển phân trang
 * @param {HTMLElement} section Phần tử chứa phân trang
 * @param {Array} products Danh sách sản phẩm
 * @param {HTMLElement} container Container hiển thị sản phẩm
 * @param {number} totalPages Tổng số trang
 */
function createPaginationControls(section, products, container, totalPages) {
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination-controls';
    paginationContainer.style.textAlign = 'center';
    paginationContainer.style.marginTop = '20px';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = 'page-button';
        pageButton.style.margin = '0 5px';
        pageButton.style.padding = '5px 10px';
        pageButton.style.cursor = 'pointer';
        pageButton.addEventListener('click', () => {
            displayPage(products, container, i);
        });

        paginationContainer.appendChild(pageButton);
    }

    section.appendChild(paginationContainer);
}
/**
 * Lấy ID của category từ URL
 * @returns {string | null} ID của category hoặc null nếu không có
 */
function getCategoryFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category');
}

/**
 * Ẩn tất cả các section trên trang
 */
function hideAllSections() {
    const allSections = document.querySelectorAll('section.container');
    const allCategoryButtons = document.querySelectorAll('.category-btn'); // Lấy tất cả các nút "Xem thêm"
    
    // Ẩn tất cả các section
    allSections.forEach(section => {
        section.style.display = 'none';
    });

    // Ẩn tất cả các nút "Xem thêm"
    allCategoryButtons.forEach(button => {
        button.style.display = 'none';
    });
}

/**
 * Hiển thị section mục tiêu theo ID
 * @param {string} categoryId ID của section cần hiển thị
 */
function showTargetSection(categoryId) {
    const targetSection = document.getElementById(categoryId);
    if (targetSection) {
        targetSection.style.display = 'block';
    } else {
        console.error(`Section với ID "${categoryId}" không tồn tại.`);
    }
}

