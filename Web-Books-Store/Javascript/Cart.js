'use strict';
import * as Bridge from "./Bridge.js";
import {getProductBooks} from "./Products.js";
import {formatPrices} from "./Interface.js";
function updateCartTotal(elementsObj) {
    const cartItems = elementsObj.getCartItems();
    let total = 0;
    let shippingFee = 0;
    let shippingDiscount = 0;
    let voucherDiscount = 0;
    let Prices = 0;
    let hasCheckedItem = false;
    cartItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]'); 
        if (checkbox.checked) {  
            hasCheckedItem = true;
            const price = parseFloat(item.querySelector(".price").innerText);  
            const quantity = parseInt(item.querySelector(".quantity-cart").value); 
            shippingFee = 10000;
            shippingDiscount = 5250;
            voucherDiscount +=3000;
            Prices += price * quantity;
            total += price * quantity + shippingFee - shippingDiscount - voucherDiscount ;
            
        }
    });
    if (!hasCheckedItem) {
        total = 0;
        shippingFee = 0;
        shippingDiscount = 0;
        voucherDiscount = 0;
        Prices = 0;
    }

    elementsObj.getTotalPrice().innerText = `${total} `;
    elementsObj.getshippingFee().innerText = `${shippingFee} `;
    elementsObj.getshippingDiscount().innerText = `${shippingDiscount} `;
    elementsObj.getvoucherDiscount().innerText = `${voucherDiscount} `;
    elementsObj.getPrices().innerText = `${Prices} `;
    formatPrices(elementsObj);
}

function handleQuantityChange(elementsObj) {
    const quantityInputs = elementsObj.getQuantityInputs();
    quantityInputs.forEach((input, index) => {
        input.addEventListener("change", () => {
            const cartItems = elementsObj.getCartItems();
            const item = cartItems[index];
            const pricePerItemElement = item.querySelector(".price-per-item");
            const price = parseFloat(item.querySelector(".price").innerText);
            const quantity = parseInt(input.value);
            pricePerItemElement.innerText = `${(price * quantity)} `;
            formatPrices(elementsObj);
            updateCartTotal(elementsObj);
        });
    });
}


function handleCheckboxChange(elementsObj) {
    const cartItems = elementsObj.getCartItems();
    cartItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        checkbox.addEventListener("change", () => {
            updateCartTotal(elementsObj); 
        });
    });
}
function handleSelectAllCheckbox(elementsObj) {
    const selectAllCheckbox = elementsObj.getSelectAllCheckbox();
    const cartItems = elementsObj.getCartItems();

    selectAllCheckbox.addEventListener('change', () => {
        const isChecked = selectAllCheckbox.checked;

        cartItems.forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            checkbox.checked = isChecked;
        });

        updateCartTotal(elementsObj);
    });
}


function handleRemoveItem(elementsObj) {
    const cartContainer = document.querySelector('.list-carts'); // Chọn vùng chứa giỏ hàng
    if (!cartContainer) {
        console.warn("Không tìm thấy phần tử '.list-carts'. Kiểm tra HTML của bạn.");
        return;
    }

    cartContainer.addEventListener("click", (event) => {
        // Kiểm tra nếu phần tử được click là nút xóa
        if (event.target.closest('.rm-cart-btn')) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Xác định phần tử sản phẩm cần xóa
            const productElement = event.target.closest(".block-product");
            if (!productElement) return; // Thoát nếu không tìm thấy phần tử sản phẩm
            
            const itemName = productElement.querySelector('.info-product-cart p').textContent.trim(); // Lấy tên sản phẩm
            
            // Lọc bỏ sản phẩm khỏi giỏ hàng
            const updatedCart = cart.filter(item => item.name !== itemName);

            // Lưu lại giỏ hàng sau khi xóa
            localStorage.setItem('cart', JSON.stringify(updatedCart));

            // Hiển thị lại các sản phẩm trong giỏ hàng
            displayCartItems(elementsObj);

            // Cập nhật số lượng sản phẩm trong icon giỏ hàng
            updateCartCount(elementsObj);

            // Cập nhật lại tổng giá trị giỏ hàng
            updateCartTotal(elementsObj);
            // Gắn lại các sự kiện cho các phần tử
            handleQuantityChange(elementsObj);
            handleCheckboxChange(elementsObj);
            handleSelectAllCheckbox(elementsObj);
        }
    });
}


function increaseCartCount() {
    // Lấy dữ liệu giỏ hàng từ localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Đếm số sản phẩm khác nhau
    const uniqueProductCount = cart.length; // Mỗi sản phẩm là một mục trong mảng `cart`

    // Cập nhật số lượng sản phẩm khác nhau trên giao diện
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = uniqueProductCount; // Hiển thị số sản phẩm duy nhất
    });
}


function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.length;
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = cartCount;
    });
}
function displayCartItems(elementsObj) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.list-carts');

    // Kiểm tra nếu giỏ hàng trống
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Giỏ hàng trống</p>';
        return;
    }

    // Hiển thị các sản phẩm trong giỏ hàng
    cartContainer.innerHTML = '';
    cart.forEach((item, index) => {
        cartContainer.innerHTML += `
            <div class="block-product">
                <input
                    type="checkbox"
                    name="select-block-product"
                    id="block-product-${index}"
                    class="grid-col col-l-1 col-m-1 col-s-1"
                />
                <div class="product-cart grid-col col-l-1 col-m-1 col-s-1 no-gutter full-width">
                    <img src="${item.image}" alt="${item.name}" />
                </div>
                <div class="grid-col col-l-10 col-m-10 col-s-10 no-gutter flex align-center">
                    <div class="info-product-cart padding-left-8 grid-col col-l-6 col-m-12 col-s-12">
                        <p class="font-bold capitalize margin-bottom-16">${item.name}</p>
                        <div class="block-product-price">
                            <span class="new-price font-bold padding-right-8 price">${item.price}</span>
                            <del class="price old-price">65000</del>
                        </div>
                    </div>
                    <div class="number-product-cart grid-col col-l-2 col-m-10 col-s-10 no-gutter">
                        <input
                            type="number"
                            name="quantity-cart"
                            id="update_${index}"
                            value="${item.quantity}"
                            min="1"
                            max="99"
                            class="quantity-cart"
                        />
                    </div>
                    <div class="price-per-item font-bold grid-col col-l-3 s-m-hidden no-gutter text-center">
                        ${(item.price * item.quantity)} 
                    </div>
                    <div class="rm-cart-btn col-l col-l-1 col-m-2 col-s-2 flex justify-center">
                        <div>
                            <i class="fa-solid fa-trash fa-lg" style="color: var(--primary-dark)"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    formatPrices(elementsObj);
    updateCartTotal(elementsObj);
    
}

function addToCart(productName) {
    const products = getProductBooks(); // Lấy danh sách sản phẩm từ localStorage
    const product = products.find(item => item.name === productName); // Tìm sản phẩm dựa trên tên

    if (!product) {
        console.error(`Sản phẩm "${productName}" không tìm thấy!`);
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.name === product.name);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1; // Tăng số lượng nếu đã có
    } else {
        cart.push({
            name: product.name,
            price: Math.round(product.price * (1 - product.sale)), // Giá sau giảm
            image: product.img,
            quantity: 1,
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Lưu lại vào localStorage
}


function attachAddToCartEvents() {
    // Lấy container chính chứa tất cả sản phẩm
    const mainContainer = document.querySelector('#main-container');
  
    if (!mainContainer) {
        console.error("Không tìm thấy #main-container!");
        return;
    }
  
    // Lấy danh sách tất cả các sản phẩm trong main-container
    const productItems = mainContainer.querySelectorAll('.product-item');
  
    productItems.forEach((productItem) => {
        // Tìm nút "Thêm vào giỏ hàng" gần nhất trong sản phẩm
        const addToCartButton = productItem.querySelector('.add-to-cart .button');
  
        if (!addToCartButton) {
            console.warn("Không tìm thấy nút 'Thêm vào giỏ hàng' cho sản phẩm:", productItem);
            return;
        }
  
        // Xóa sự kiện cũ trước khi thêm sự kiện mới
        addToCartButton.replaceWith(addToCartButton.cloneNode(true));
        const newButton = productItem.querySelector('.add-to-cart .button');
  
        // Lấy thông tin sản phẩm
        const productName = productItem.querySelector('h4')?.textContent.trim();
        if (!productName) {
            console.warn("Không tìm thấy tên sản phẩm trong .product-item:", productItem);
            return;
        }
  
        // Gán sự kiện click cho nút "Thêm vào giỏ hàng"
        newButton.addEventListener('click', () => {
            console.log(`Đang thêm sản phẩm: ${productName}`);
            addToCart(productName); // Gọi hàm thêm sản phẩm vào giỏ hàng
            increaseCartCount(); // Cập nhật số lượng hiển thị trên icon giỏ hàng
        });
    });
  }
// Định nghĩa hàm để xử lý sự kiện chuyển trang khi bấm "Xem thêm"
function handleCategoryNavigation() {
    const categoryButtons = document.querySelectorAll('.category-btn');
  
    categoryButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Ngăn hành vi mặc định của nút
            const parentSection = button.closest('section'); // Tìm section cha của nút
            if (parentSection && parentSection.id) {
                const categoryId = parentSection.id; // Lấy id của section
                window.location.href = `index.html?category=${categoryId}`; // Chuyển hướng với tham số
            }
        });
    });
  }
  
  function handleCartNavigation() {
    const categoryButtons = document.querySelectorAll('.cart-btn');
  
    categoryButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Ngăn hành vi mặc định của nút
                window.location.href = "cart.html"; // Chuyển hướng với tham số
            
        });
    });
  }

export {addToCart, attachAddToCartEvents,increaseCartCount, displayCartItems, updateCartCount, updateCartTotal};
export {handleQuantityChange, handleCheckboxChange, handleSelectAllCheckbox, handleRemoveItem, handleCartNavigation, handleCategoryNavigation}