'use strict'
import * as bridge from "./Bridge.js";
import * as fInterface from "./Interface.js";

let testArray = [
     {
          img : "../Assets/Images/Books/Light_Novel/khi_muon_khoc_toi_deo_mat_na_meo.webp",
          name : "Khi Muốn Khóc Tôi Đeo Mặt Nạ Mèo",
          sale : 0.2,
          status : "còn hàng",
          quantity: 200,
          price: 98000,
          
     }
]

function getProductBooks () {
     let products = [];  
     products.push(localStorage.getItem("Products"));   
     return products;  
}

function setProductBooks (product) {
     localStorage.setItem("Products", JSON.stringify(product));
}

function renderProducts (product) {
     console.log(bridge.default().getProductContainer());
     bridge.default().getProductContainer()[0].innerHTML =
     `
     <div class="grid-col col-l-2-4 col-m-3 col-s-6">
          <div class="block-product product-resize">
               <span class="product-image js-item">
                    <img src="${product.img}" 
                         alt="${product.name}">
               </span>
               <div class="sale-label">${product.sale * 100}%</div>
               <div class="sale-off font-bold capitalize ${product.quantity <= 0 ? "active" : ""}">hết hàng</div>
               <div class="info-inner flex justify-center align-center line-height-1-6">
                    <h4 class="font-light capitalize">${product.name}</h4>
                    <div class="margin-y-4">
                         <span class="price font-bold">${product.price * (1 - product.sale)}</span>
                         <del class="price old-price padding-left-8 font-size-14">${product.price}</del>
                    </div>
               </div>
               <div class="action">
                    <div class="buy-btn">
                         <div title="mua ngay" class="button">
                              <i class="fa-solid fa-bag-shopping fa-lg" style="color: var(--primary-white);"></i>
                         </div>
                    </div>

                    <div class="add-to-cart">
                         <div title="thêm vào giỏ hàng" class="button">
                              <i class="fa-solid fa-basket-shopping fa-lg" style="color: var(--primary-white);"></i>
                         </div>
                    </div>
               </div>
          </div>
     </div> 
     `
}

document.addEventListener("DOMContentLoaded", () => {
     setProductBooks();
     let test = getProductBooks();
     renderProducts(testArray[0]);
})