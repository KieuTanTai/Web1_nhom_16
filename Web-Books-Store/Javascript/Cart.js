"use strict";
import * as Bridge from "./Bridge.js";
import { getProductBooks } from "./Products.js";
import { formatPrices, hiddenException } from "./Interface.js";
import { sleep } from "./Navigate.js";
function updateCartTotal(elementsObj) {
  const cartItems = elementsObj.getCartItems();
  let total = 0;
  let shippingFee = 0;
  let shippingDiscount = 0;
  let voucherDiscount = 0;
  let Prices = 0;
  cartItems.forEach((item) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const priceElement = item.querySelector(".price");
    const quantityElement = item.querySelector(".quantity-cart");
    if (!checkbox || !checkbox.checked) return;

    const rawPrice = priceElement
      ? priceElement.innerText.replace(/\D/g, "")
      : "0";
    const price = parseFloat(rawPrice) || 0;
    const quantity = quantityElement ? parseInt(quantityElement.value, 10) : 1;

    shippingFee = 10000;
    shippingDiscount = 5250;
    voucherDiscount += 3000;
    Prices += price * quantity;
  });
  total = Prices + shippingFee - shippingDiscount - voucherDiscount;

  if (Prices === 0) {
    shippingFee = 0;
    shippingDiscount = 0;
    voucherDiscount = 0;
    total = 0;
  }
  const formatCurrency = (value) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  const PricesPriceElement = document.querySelector(".prices");
  const totalPriceElement = document.querySelector(".total-price");
  const shippingFeeElement = document.querySelector(".shipping-fee");
  const shippingDiscountElement = document.querySelector(".shipping-discount");
  const voucherDiscountElement = document.querySelector(".voucher-discount");
  if (PricesPriceElement) PricesPriceElement.innerText = formatCurrency(Prices);
  if (totalPriceElement) totalPriceElement.innerText = formatCurrency(total);
  if (shippingFeeElement)
    shippingFeeElement.innerText = formatCurrency(shippingFee);
  if (shippingDiscountElement)
    shippingDiscountElement.innerText = formatCurrency(shippingDiscount);
  if (voucherDiscountElement)
    voucherDiscountElement.innerText = formatCurrency(voucherDiscount);

  console.log(
    `Tổng tiền: ${total}, Giá sản phẩm: ${Prices}, Phí vận chuyển: ${shippingFee}, Giảm giá vận chuyển: ${shippingDiscount}, Giảm giá voucher: ${voucherDiscount}`
  );
}

function handleQuantityChange(elementsObj) {
  const quantityInputs = elementsObj.getQuantityInputs();

  quantityInputs.forEach((input, index) => {
    input.addEventListener("change", () => {
      const cartItems = elementsObj.getCartItems();
      const item = cartItems[index];
      const pricePerItemElement = item.querySelector(".price-per-item");
      const priceElement = item.querySelector(".price");

      const rawPrice = priceElement.innerText.replace(/\D/g, "");
      const price = parseFloat(rawPrice);

      const quantity = parseInt(input.value, 10);

      if (isNaN(price) || isNaN(quantity)) {
        console.error("Giá hoặc số lượng không hợp lệ:", { price, quantity });
        return;
      }

      const newPricePerItem = price * quantity;
      pricePerItemElement.innerText = newPricePerItem;

      formatPrices({ getElementPrices: () => [pricePerItemElement] });
      updateCartTotal(elementsObj);
    });
  });
}

function handleCheckboxChange(elementsObj) {
  const cartItems = elementsObj.getCartItems();
  cartItems.forEach((item) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    checkbox.addEventListener("change", () => {
      updateCartTotal(elementsObj);
    });
  });
}
function handleSelectAllCheckbox(elementsObj) {
  const selectAllCheckbox = elementsObj.getSelectAllCheckbox();
  const cartItems = elementsObj.getCartItems();

  selectAllCheckbox.addEventListener("change", () => {
    const isChecked = selectAllCheckbox.checked;

    cartItems.forEach((item) => {
      const checkbox = item.querySelector('input[type="checkbox"]');
      checkbox.checked = isChecked;
    });

    updateCartTotal(elementsObj);
  });
}

function handleRemoveItem(elementsObj) {
  const cartContainer = document.querySelector(".list-carts");
  if (!cartContainer) {
    console.warn(
      "Không tìm thấy phần tử '.list-carts'. Kiểm tra HTML của bạn."
    );
    return;
  }

  cartContainer.addEventListener("click", (event) => {
    if (event.target.closest(".rm-cart-btn")) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const productElement = event.target.closest(".block-product");
      if (!productElement) return;
      const itemName = productElement
        .querySelector(".info-product-cart p")
        .textContent.trim();
      const updatedCart = cart.filter((item) => item.name !== itemName);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      displayCartItems(elementsObj);
      updateCartCount(elementsObj);
      updateCartTotal(elementsObj);
      handleQuantityChange(elementsObj);
      handleCheckboxChange(elementsObj);
      handleSelectAllCheckbox(elementsObj);
    }
  });
}

function increaseCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const uniqueProductCount = cart.length;
  const cartCountElements = document.querySelectorAll(".cart-count");
  cartCountElements.forEach((el) => {
    el.textContent = uniqueProductCount;
  });
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.length;
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = cartCount;
  });
}
function displayCartItems(elementsObj) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector(".list-carts");
  if (!cartContainer) return;
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Giỏ hàng trống</p>";
    return;
  }

  cartContainer.innerHTML = "";
  cart.forEach((item, index) => {
    const priceAfterDiscount =
      typeof item.price === "number" &&
      typeof item.sale === "number" &&
      item.sale >= 0 &&
      item.sale <= 1
        ? Math.round(item.price * (1 - item.sale))
        : item.price || 0;
    const totalPricePerItem = priceAfterDiscount * item.quantity || 0;
    cartContainer.innerHTML += `
            <div class="block-product">
                <input type="checkbox" name="select-block-product" id="block-product-${index}" class="grid-col col-l-1 col-m-1 col-s-1"/>
                <div class="product-cart grid-col col-l-1 col-m-1 col-s-1 no-gutter full-width">
                    <img src="${item.image}" alt="${item.name}" />
                </div>
                <div class="grid-col col-l-10 col-m-10 col-s-10 no-gutter flex align-center">
                    <div class="info-product-cart padding-left-8 grid-col col-l-6 col-m-12 col-s-12">
                        <p class="font-bold capitalize margin-bottom-16">${
                          item.name
                        }</p>
                        <div class="block-product-price">
                            <span class="new-price font-bold padding-right-8 price">${priceAfterDiscount}</span>
                            <del class="price old-price">${item.price || 0}</del>
                        </div>
                    </div>
                    <div class="number-product-cart grid-col col-l-2 col-m-10 col-s-10 no-gutter">
                        <input type="number" name="quantity-cart" id="update_${index}" value="${item.quantity}" min="1" max="99" class="quantity-cart"/>
                    </div>
                    <div class="price-per-item price font-bold grid-col col-l-3 s-m-hidden no-gutter text-center">
                        ${totalPricePerItem}
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
  setTimeout(() => {
    formatPrices({
      getElementPrices: () => cartContainer.querySelectorAll(".price"),
    });
  }, 0);
  updateCartTotal(elementsObj);
  console.log("Giỏ hàng đã được hiển thị:", cart);
}

function addToCart(productName) {
  const products = getProductBooks();
  const product = products.find((item) => item.name === productName);

  if (!product) {
    console.error(`Sản phẩm "${productName}" không tìm thấy!`);
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex(
    (item) => item.name === product.name
  );

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({
      name: product.name,
      price: Math.round(product.price * (1 - product.sale)),
      image: product.img,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

function attachAddToCartEvents() {
  const mainContainer = document.querySelector("#main-container");

  if (!mainContainer) {
    console.error("Không tìm thấy #main-container!");
    return;
  }

  const productItems = mainContainer.querySelectorAll(".product-item");

  productItems.forEach((productItem) => {
    const addToCartButton = productItem.querySelector(".add-to-cart .button");
    const buyNowButton = productItem.querySelector(".buy-btn .button");

    if (!addToCartButton || !buyNowButton) {
      console.warn("Không tìm thấy nút 'Thêm vào giỏ hàng' hoặc 'Mua ngay' cho sản phẩm:", productItem);
      return;
    }

    addToCartButton.replaceWith(addToCartButton.cloneNode(true));
    const newAddToCartButton = productItem.querySelector(
      ".add-to-cart .button"
    );

    const productName = productItem.querySelector("h4")?.textContent.trim();
    if (!productName) {
      console.warn("Không tìm thấy tên sản phẩm trong .product-item:", productItem);
      return;
    }

    newAddToCartButton.addEventListener("click", () => {
      console.log(`Đang thêm sản phẩm: ${productName}`);
      addToCart(productName);
      increaseCartCount();
    });

    buyNowButton.replaceWith(buyNowButton.cloneNode(true));
    const newBuyNowButton = productItem.querySelector(".buy-btn .button");

    newBuyNowButton.addEventListener("click", () => {
      if (sessionStorage.getItem("hasLogin")) {
        console.log(`Đang thêm sản phẩm và chuyển đến giỏ hàng: ${productName}`);
        addToCart(productName);
        increaseCartCount();
        window.location.href = "cart.html";
      } else {
        alert("Phải đăng nhập trước");
      }
    });
  });
}

function handleCategoryNavigation() {
  const categoryButtons = document.querySelectorAll(".category-btn");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const parentSection = button.closest("section");
      if (parentSection && parentSection.id) {
        const categoryId = parentSection.id;
        window.location.href = `index.html?category=${categoryId}`;
      }
    });
  });
}

function handleCartNavigation() {
  const categoryButtons = document.querySelectorAll(".cart-btn");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "cart.html";
    });
  });
}
function handleOrderPlacement(elementsObj) {
  const checkoutButton = document.querySelector(".checkout-btn");
  if (!checkoutButton) {
    console.warn("Không tìm thấy nút 'checkout-btn'.");
    return;
  }

  checkoutButton.addEventListener("click", () => {
    const cartItems = document.querySelectorAll(".block-product");
    if (cartItems.length === 0) {
      alert(
        "Giỏ hàng của bạn đang trống. Hãy thêm sản phẩm trước khi đặt hàng!"
      );
      return;
    }

    if (!sessionStorage.getItem("hasLogin")) {
      alert("Vui lòng đăng nhập");
      return;
    }

    const selectedItems = Array.from(cartItems)
      .filter((item) => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        return checkbox && checkbox.checked;
      })
      .map((item) => {
        const priceElement = item.querySelector(".price");
        const quantityElement = item.querySelector(".quantity-cart");
        const rawPrice = priceElement
          ? priceElement.innerText.replace(/\D/g, "")
          : "0";
        const price = parseFloat(rawPrice) || 0;
        const quantity = quantityElement
          ? parseInt(quantityElement.value, 10)
          : 1;
        const name = item
          .querySelector(".info-product-cart p")
          .innerText.trim();
        const image = item.querySelector("img").src;
        return { name, price, quantity, image };
      });

    if (selectedItems.length === 0) {
      alert("Bạn chưa chọn sản phẩm nào để đặt hàng.");
      return;
    }
    const paymentOption = document.querySelector(
      'input[name="payment-option"]:checked'
    );
    if (!paymentOption) {
      alert("Hãy chọn một phương thức thanh toán.");
      return;
    }

    const userPhone = document.querySelector("#user-phone").value.trim();
    const userAddress = document.querySelector("#user-address").value.trim();
    const userNote = document.querySelector("#user-note").value.trim();

    if (!userAddress) {
      alert("Hãy nhập địa chỉ giao hàng.");
      return;
    }
    if (!userPhone) {
      alert("Hãy nhập số điện thoại liên lạc.");
      return;
    }
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(userPhone)) {
      alert("Số điện thoại không hợp lệ. Vui lòng nhập lại.");
      return;
    }

    const voucherCode = document.querySelector("#voucher-code").value.trim();

    const Prices = selectedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const shippingFee = 10000;
    const shippingDiscount = 5250;
    const voucherDiscount = 3000;

    const totalOrderPrice =
      Prices + shippingFee - shippingDiscount - voucherDiscount;
    const orderId = `ORDER-${Date.now()}`;
    const user = JSON.parse(sessionStorage.getItem("hasLoginAccount"));
    const userName = user ? `${user.firstName} ${user.lastName}` : "Khách hàng";
    let orders = JSON.parse(localStorage.getItem("orders"));
    console.log(orders);
    const order = {
      orderId: orderId,
      userName: userName,
      products: selectedItems,
      date: new Date().toLocaleString("vi-VN"),
      totalPrice: totalOrderPrice,
      address: userAddress,
      phonenumber: userPhone,
      paymentMethod: paymentOption.id,
      note: userNote,
      voucherCode: voucherCode || null,
    };
    if (!orders) {
      orders = [];
      orders.push(order);
    } else orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    const updatedCart = Array.from(cartItems)
      .filter((item) => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        return !checkbox || !checkbox.checked;
      })
      .map((item) => {
        const name = item.querySelector(".info-product-cart p").innerText.trim();
        const priceElement = item.querySelector(".price");
        const quantityElement = item.querySelector(".quantity-cart");
        const rawPrice = priceElement ? priceElement.innerText.replace(/\D/g, "") : "0";
        const price = parseFloat(rawPrice) || 0;
        const quantity = quantityElement ? parseInt(quantityElement.value, 10) : 1;
        const image = item.querySelector("img").src;
        return { name, price, quantity, image };
      });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartCount();
    displayCartItems(elementsObj);
    handleQuantityChange(elementsObj);
    handleCheckboxChange(elementsObj);
    handleSelectAllCheckbox(elementsObj);
    updateCartTotal(elementsObj);
    alert("Đặt hàng thành công!");
  });
}

function attachAddToCartInDetails() {
  const addToCartButton = Bridge.$$(".add-to-cart.button");
  const buyNowButton = Bridge.$$(".buy-btn.button");
  let historyCart = Bridge.$$(".block-product .cart-content");

  if (!addToCartButton || !buyNowButton) {
    console.error("Không tìm thấy nút 'Thêm vào giỏ hàng' hoặc 'Mua ngay' trong Product Details.");
    return;
  }

  addToCartButton.forEach((button) => {
    if (button.dataset.eventAttached)
      return;
    button.addEventListener("click", Bridge.throttle(() => {
      const productName = document.querySelector(".product-title h1")?.textContent.trim();
      const productPrice = parseFloat(document.querySelector(".new-price")?.textContent.replace(/\D/g, "")) || 0;
      const productImage = document.querySelector(".product-image img")?.src;
  
      if (!productName || !productPrice || !productImage) {
        console.error("Không thể lấy thông tin sản phẩm từ Product Details.");
        return;
      }
  
      const product = {
        name: productName,
        price: productPrice,
        img: productImage,
        quantity: 1,
      };
  
      addToCart(productName);
      increaseCartCount();
    }), 200, "add-to-cart");
    button.dataset.eventAttached = true;
  });

  buyNowButton.forEach((button) => button.addEventListener("click", Bridge.throttle(() => {
    if (!sessionStorage.getItem("hasLogin")) {
      alert("Bạn cần đăng nhập để mua ngay.");
      return;
    }

    const productName = document.querySelector(".product-title h1")?.textContent.trim();
    const productPrice = parseFloat(document.querySelector(".new-price")?.textContent.replace(/\D/g, "")) || 0;
    const productImage = document.querySelector(".product-image img")?.src;

    if (!productName || !productPrice || !productImage) {
      console.error("Không thể lấy thông tin sản phẩm từ Product Details.");
      return;
    }

    const product = {
      name: productName,
      price: productPrice,
      img: productImage,
      quantity: 1,
    };

    addToCart(productName);
    increaseCartCount();
    window.location.href = "cart.html";
  })), 200, "buy-now");

}

export { addToCart, attachAddToCartEvents, increaseCartCount, displayCartItems, updateCartCount, updateCartTotal, handleOrderPlacement, attachAddToCartInDetails };
export { handleQuantityChange, handleCheckboxChange, handleSelectAllCheckbox, handleRemoveItem, handleCartNavigation, handleCategoryNavigation };
