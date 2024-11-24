"use strict";
import * as Bridge from "./Bridge.js";
import { isEmpty } from "./Interface.js";
import * as Navigate from "./Navigate.js";

// get / set products
function getProductBooks() {
  console.log(Array.from(JSON.parse(localStorage.getItem("products"))));
  return Array.from(JSON.parse(localStorage.getItem("products")));
}

function setProductBooks(product) {
  localStorage.setItem("products", JSON.stringify(product));
}


// for show detail products
async function renderProductDetails(list, wrapper) {
  try {
    // first param on fields requestRest when renderDOM is now object item
    if (!list || !wrapper) return;
    let arrayChild = Array.from(wrapper.children);
    arrayChild?.forEach((child, index) => {
      let block = child.querySelector(".block-product");
      block.addEventListener("click", () => {
        let bookName = (list[index].name).replaceAll("&", "").replaceAll("!", "").replaceAll(" ", "-");
        let newURL = `${location.href.slice(0, location.href.lastIndexOf("/HTML/") + 6)}detail_product?name=${bookName}`;
        window.history.pushState({}, "", newURL);
        Navigate.renderDOMHandler("detail_product", list[index]);
      });
    });
  } catch (error) {
    console.error(error);
  }
}

// render products
function renderProducts(list, wrapper) {
  if (!list) return;
  let html = "";
  for (let product of list) {
    html += `
            <div class="product-item grid-col col-l-2-4 col-m-3 col-s-6">
                    <div class="block-product product-resize">
                         <span class="product-image js-item">
                              <img src="${product.img}" alt="${product.name}">
                         </span>
                         <div class="sale-label">${product.sale * 100}%</div>
                         <div class="sale-off font-bold capitalize ${product.quantity > 0 ? "" : "active"}">hết hàng</div>
                         <div class="info-inner flex justify-center align-center line-height-1-6">
                              <h4 class="font-light capitalize">${product.name}</h4>
                              <div class="margin-y-4">
                                   <span class="price font-bold">${Math.round(product.price * (1 - product.sale))}</span>
                                   <del class="price old-price padding-left-8 font-size-14">${product.price}</del>
                              </div>
                         </div>
                    </div>
                    <div class="action ${product.quantity > 0 ? "" : "disable"}">
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
               `;
  }
  if (wrapper) {
    wrapper.innerHTML = html;
    renderProductDetails(list, wrapper);
  } else 
    return html;
}

// get container for product and call render products
function productContainers(productsList, container) {
  if (!productsList) return;
  let listLength = productsList.length;

  if (!container) {
    let containers = Bridge.$$(".container");
    // return if not have any container
    if (!containers) return;
    containers.forEach((container) => {
      let list;
      let containerID = container.getAttribute("id");
      let wrapper = container.querySelector(".product-container");

      //gene script html
      if (!isEmpty(wrapper)) return;
      if (wrapper && containerID === "fs-container")
        list = productsList.sort((a, b) => b.sale - a.sale).toSpliced(5);
      
      else if (wrapper && containerID === "new-books-container")
        list = productsList.toSpliced(0, listLength - 5);
      
      else if (wrapper && containerID === "best-selling-container")
        list = productsList.sort((a, b) => b.quantity - a.quantity).toSpliced(5);

      else if (wrapper && containerID === "light-novel-container")
        list = productsList.filter((product) => product.type === "light novel").toSpliced(5);
      
      else if (wrapper && containerID === "manga-container")
        list = productsList.filter((product) => product.type === "manga").toSpliced(5);

      else if (wrapper && containerID === "other-books-container")
        list = productsList.sort((a, b) => a.releaseDate - b.releaseDate).toSpliced(5);
      else list = productsList.sort((a, b) => a.author - b.author).toSpliced(5);
      // render script and add it to DOM
      renderProducts(list, wrapper);
    });
    return;
  }

  if (isEmpty(container)) return;
}

export { getProductBooks, setProductBooks, productContainers };
