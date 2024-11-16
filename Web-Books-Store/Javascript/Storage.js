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
          price: 78400,
          
     }
]

function getProductBooks () {
     let products = [];  
     products.push(localStorage.getItem("Products"));   
     return products;  
}

function setProductBooks () {
     localStorage.setItem("Products", JSON.stringify(testArray[0]));
}

function renderProducts () {
     `
     <div class="grid-col col-l-2-4 col-m-3 col-s-6">
     <div class="block-product product-resize">
          <span class="product-image js-item">
               <img src="../Assets/Images/Books/Light_Novel/khi_muon_khoc_toi_deo_mat_na_meo.webp" 
                    alt="Khi Muốn Khóc Tôi Đeo Mặt Nạ Mèo">
          </span>
          <div class="sale-label">20%</div>
          <div class="sale-off font-bold">Hết hàng</div>
          <div class="info-inner flex justify-center align-center line-height-1-6">
               <h4 class="font-light capitalize">Khi Muốn Khóc Tôi Đeo Mặt Nạ Mèo</h4>
               <div class="margin-y-4">
                    <span class="price font-bold">78400</span>
                    <del class="price old-price padding-left-8 font-size-14">98000</del>
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
     console.log(JSON.parse(test[0]));
     console.log((bridge.default().getCategories()[0].children));
})