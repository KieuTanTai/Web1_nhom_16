'use strict';
function getElementsHandler() {
    let getElements = {
        getCartItems: () => document.querySelectorAll(".block-product"), 
        getQuantityInputs: () => document.querySelectorAll(".quantity-cart"), 
        getTotalPrice: () => document.querySelector(".total-price"),  
        getshippingFee: () => document.querySelector(".shipping-fee"),
        getshippingDiscount: () => document.querySelector(".shipping-discount"),
        getvoucherDiscount: () => document.querySelector(".voucher-discount"),
        getPrices:() =>document.querySelector(".prices"),
        getRemoveButtons: () => document.querySelectorAll(".fa-trash"),  
        getSelectAllCheckbox: () => document.querySelector('#selection-item'),  
    };
    return getElements;
}

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

    // elementsObj.getTotalPrice().innerText = `${total.toFixed(2)} đ`;
    // elementsObj.getshippingFee().innerText = `${shippingFee.toFixed(2)} đ`;
    // elementsObj.getshippingDiscount().innerText = `${shippingDiscount.toFixed(2)} đ`;
    // elementsObj.getvoucherDiscount().innerText = `${voucherDiscount.toFixed(2)} đ`;
    // elementsObj.getPrices().innerText = `${Prices.toFixed(2)} đ`;
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
            pricePerItemElement.innerText = `${(price * quantity).toFixed(2)} đ`;
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
    const removeButtons = elementsObj.getRemoveButtons();

    removeButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemName = event.target.closest(".block-product").querySelector('p').textContent;

            // Lọc bỏ sản phẩm bị xóa khỏi giỏ hàng
            const updatedCart = cart.filter(item => item.name !== itemName);

            // Lưu lại giỏ hàng sau khi xóa
            localStorage.setItem('cart', JSON.stringify(updatedCart));

            // Hiển thị lại các sản phẩm trong giỏ hàng
            displayCartItems(elementsObj);

            // Cập nhật số lượng sản phẩm trong icon giỏ hàng
            updateCartCount();

            // Cập nhật lại tổng giá trị giỏ hàng
            updateCartTotal(elementsObj);

            // Gán lại sự kiện cho các phần tử còn lại sau khi cập nhật
            handleQuantityChange(elementsObj);
            handleCheckboxChange(elementsObj);
            handleSelectAllCheckbox(elementsObj);
            handleRemoveItem(elementsObj);  // gọi lại chính nó để cập nhật các nút xóa mới
        });
    });
}
function addToCart(name, price, image) {
    const product = { name, price, image, quantity: 1 };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
    const existingProductIndex = cart.findIndex(item => item.name === name);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push(product);
        increaseCartCount();
    }

    // Lưu giỏ hàng vào LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}
function increaseCartCount() {
    const cartCountElement = document.querySelectorAll('.cart-count');
    const currentCount = parseInt(cartCountElement[0]?.textContent) || 0;
    cartCountElement.forEach(el => {
        el.textContent = currentCount + 1;
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
    // cartContainer.innerHTML = '';
    if (cartContainer) {
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
                            ${(item.price * item.quantity).toFixed(2)} đ
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
    }
    updateCartTotal(elementsObj);
}
document.addEventListener("DOMContentLoaded", function () {
    let elementsObj = getElementsHandler();
    increaseCartCount();
    updateCartCount();
    displayCartItems(elementsObj);
    updateCartTotal(elementsObj); 
    handleQuantityChange(elementsObj);  
    handleCheckboxChange(elementsObj); 
    handleSelectAllCheckbox(elementsObj);  
    handleRemoveItem(elementsObj);  
});
function navigateToCart() {
        window.location.href = "cart.html";
}
//onclick="addToCart('name', price, 'imglink')"
//onclick="navigateToCart()"
