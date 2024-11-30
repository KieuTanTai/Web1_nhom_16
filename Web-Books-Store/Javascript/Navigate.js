'use strict'
import * as Interface from "./Interface.js";
import * as Action from "./Actions.js";
import * as Bridge from "./Bridge.js";
import * as FlashSale from "./FlashSales.js";
import { slidesHandler } from "./Slides.js";
import { getProductBooks, getValueQuery, productContainers } from "./Products.js";
import { test } from "./search.js";

function sleep(ms) {
     return new Promise(resolve => setTimeout(resolve, ms));
}

// funcs execute url
function execQueryHandler(request) {
     let query = getValueQuery(request);
     let url = location.href;
     url = url.slice(url.lastIndexOf("/") + 1);
     let productsList = JSON.parse(localStorage.getItem("products"));
     if (query && request === "name") {
          let product = productsList.find((item) => (item.name).replaceAll("&", "").replaceAll("!", "").replaceAll(" ", "-") === query);
          renderDOMHandler("detail_product", product);
     }
     else if (url.includes("detail")) {
          urlHandler("/", location.href);
          renderDOMHandler("homepage");
     }
     else if (query && request === "query")
          return query;
}

// func for popstate listener (it's will be very long)
function popStateHandler(pathsObj, docsURL) {
     const elementsObj = Bridge.default();

     window.addEventListener("popstate",
          Bridge.throttle((event) => {
               const currentPath = event.target.location.pathname;
               let path;
                    if (docsURL.includes("?") && docsURL.includes("="))
                         path = currentPath.slice(docsURL.lastIndexOf("/HTML/") + 5, docsURL.indexOf("?"));
                    else 
                         path = currentPath.slice(docsURL.lastIndexOf("/HTML/") + 5, currentPath.length + 1)

               if (path.includes(".html"))
                    path = path.replace(".html", "");
               // execute DOM with specific path
               if (pathsObj[path]) {
                    switch (path) {
                         case "/account/":
                         case "/account/login":
                         case "/account/register":
                         case "/account/forgot_password":
                         case "/account/user":
                              if (path === "/account/")
                                   path = "/account/login";
                              renderDOMHandler("account", `${path.slice(path.lastIndexOf("/") + 1, path.length + 1)}`);
                              break;

                         case "/order/":
                         case "/order/status":
                         case "/order/history":
                              if (path === "/order/status" || path === "/order/")
                                   renderDOMHandler("orderStatus");
                              else
                                   renderDOMHandler("orderHistory");
                              Action.historyNavigate(elementsObj);
                              break;

                         case "/":
                         case "/index":
                              renderDOMHandler("homepage");
                              break;

                         case "/news/test":
                              renderDOMHandler("news");
                              break;

                         case "/detail_product":
                              execQueryHandler("name");
                              break;
                         
                         case "/search": 
                              renderDOMHandler("search");
                              break;

                         case "/header_footer/footer":
                         case "/header_footer/header":
                              alert("forbidden!");
                              throw new Error("forbidden!");

                         default:
                              renderDOMHandler("account", path.slice(1, path.length + 1));

                    }
               }
          }, 200, "popstate"));
}

// handle url path changed
function urlHandler(pathName, docsURL) {
     if (typeof pathName !== "string" || !pathName) return false;
     if (pathName[0] !== "/") pathName = `/${pathName}`;
     
     const pathsObj = Bridge.pathNamesHandler();
     if (!pathsObj[pathName]) {
          alert("404 not found!");
          return false;
     }

     let newURL = `${docsURL.slice(0, docsURL.lastIndexOf("/HTML/") + 5)}${pathName}`;
     window.history.pushState({}, "", newURL);
     return true;
}

// render html specific DOM with required is name of DOM and option is requests
async function renderDOMHandler(nameDOM, ...requestRests) {
     const originPath = location.pathname.slice(0, location.pathname.lastIndexOf("/HTML/") + 5);
     try {
          const elementsObj = Bridge.default();
          const webContent = elementsObj.getWebContent();
          const mainContainer = elementsObj.getMainContainer();
          const placeInsert = Array.from(mainContainer.children).find((element) => element.id === "main-content");

          if (!webContent || !mainContainer) return false;
          // set default request when name of DOM is account
          if (nameDOM === "account" && !requestRests) {
               let loginStatus = localStorage.getItem("loginStatus");
               if (!loginStatus) requestRests = "login";
          }
          webContent.scrollIntoView({ behavior: "instant", block: "start", inline: "nearest" });
          // set await promise DOM
          let scriptDOM, request;
          if (nameDOM === "account") {
               for (request of requestRests)
                    // validate request is one of these types or not
                    if (request === "login" || request === "register" || request === "forgotPassword" || request === "user") {
                         if (request === "forgotPassword")
                              request = "forgot_password";
                         if (request === "user")
                              if (!localStorage.getItem("hasLogin"))
                                   throw new Error(`you must be login!`);
                         scriptDOM = await Bridge.promiseDOMHandler(`${originPath}/account/${request}.html`);
                         break;
                    }
                    else
                         throw new Error(`invalid request: ${request}\ntry again with request type "login", "register", "forgotPassword" for account DOM`);
          }

          if (nameDOM === "homepage") {
               // call again some funcs
               scriptDOM = await Bridge.promiseDOMHandler(`${originPath}/index.html`);
          }

          if (nameDOM === "orderStatus" || nameDOM === "orderHistory") {
               nameDOM = (nameDOM.replace("order", "")).toLowerCase();
               scriptDOM = await Bridge.promiseDOMHandler(`${originPath}/order/${nameDOM}.html`);
          }

          if ((nameDOM === "detail_product") && requestRests || nameDOM === "search")
               scriptDOM = await Bridge.promiseDOMHandler(`${originPath}/${nameDOM}.html`);

          // error if script DOM is invalid
          if (!scriptDOM)
               throw new Error("scripDOM: " + scriptDOM);
          let title = scriptDOM.querySelector("title");
          let content = scriptDOM.getElementById("main-content");

          // render DOM
          // !for account DOM
          if (nameDOM === "account" && request === "forgot_password")
               placeInsert.style.paddingTop = 0.7 + "em";
          else
               placeInsert.removeAttribute("style");

          // !for render DOM
          let currentTitle = Bridge.$("title");
          currentTitle.innerText = title.innerText;
          placeInsert.classList.add("hidden"); // for fake loading
          placeInsert.innerHTML = content.innerHTML;
          // css for placeInsert and remove it when show
          placeInsert.style.height = placeInsert.offsetHeight + 5 + "em";

          // overlay when loading 
          const overlay = document.createElement('div');
          overlay.className = 'overlay';
          overlay.innerHTML = 'Loading... :3';
          overlay.style.display = 'flex';
          overlay.style.alignItems = 'center';
          overlay.style.justifyContent = 'center';
          overlay.style.fontSize = 3 + "em";
          overlay.style.color = "var(--primary-white)";
          document.body.appendChild(overlay); 
          await sleep(250);
          if (!nameDOM === "/" || !nameDOM === "homepage")
               webContent.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

          // scroll before show DOM
          await sleep(0); // fake loading
          document.body.removeChild(overlay);
          placeInsert.removeAttribute("style");
          placeInsert.classList.remove("hidden");
          
          // execute after render
          if (nameDOM === "search")
               test();

          if (nameDOM === "detail_product" && requestRests) {
               // !book detail
               let product = requestRests[0];
               let quantity = product.quantity;
               let release = product.release, packaging = product.packagingSize;
               let productSale = product.sale, productPrice = product.price;
               let srcImage = product.img, productDescription = product.description;
               let format = product.format, type = product.type, genre = product.genre;
               let productAuth = product.author, productName = product.name, id = product.productID;
               let productCategories = product.category; 
               
               // !Container for detail
               let saleLabel = placeInsert.querySelector(".detail-block .sale-label");
               let imageContainer = placeInsert.querySelector(".detail-block .product-image img");
               let bookTitle = placeInsert.querySelector(".product-title h1");
               let bookID = placeInsert.querySelector(".product-title .product-id");
               let bookPrice = placeInsert.querySelector(".block-product-price");
               let tableInfo = placeInsert.querySelector(".product-info");
               let bookDesc = placeInsert.querySelector(".short-desc div:last-child"); 
               let bookTags = placeInsert.querySelector(".product-tags div:first-child p");
               let bookCategory = placeInsert.querySelector(".product-tags div:last-child p");
               let quantityBox = placeInsert.querySelector(".quantity-box");
               let buttons = placeInsert.querySelectorAll(".button");
               // for selections
               let listOptions = placeInsert.querySelector("#product-selector-options");
               let selectOptions = Array.from(listOptions?.children);
               
               // !set data (CONTINUE) GET FIELDS ON OBJ -> ADD DATA TO DOM 
               currentTitle.innerText = productName;
               // img
               imageContainer.setAttribute("src", srcImage);
               imageContainer.setAttribute("alt", productName);
               imageContainer.style.width = 80 + "%";
               // other details
               saleLabel.innerText = (productSale * 100 ) + "%";
               bookTitle.innerText = productName;
               bookID.innerText =id; 

               // price
               (Array.from(bookPrice.children)).forEach((child) => {
                    let oldPrice = bookPrice.querySelector(".old-price");
                    let newPrice = bookPrice.querySelector(".new-price");
                    if (oldPrice)
                              oldPrice.innerText = productPrice;
                    if (newPrice)
                              newPrice.innerText = Math.round(productPrice * (1 - productSale));
               });
               // table info
               (Array.from(tableInfo.children)).forEach((child) => {
                    let bAuthor = child.querySelector(".b-author");
                    let bRelease = child.querySelector(".b-release");
                    let bFormat = child.querySelector(".b-format");
                    let bSize = child.querySelector(".b-size");

                    if (bAuthor) 
                         bAuthor.innerText = productAuth;
                    else if (bRelease)
                         bRelease.innerText = release;
                    else if (bFormat)
                         bFormat.innerText = format;
                    else if (bSize)
                         bSize.innerText = packaging;
               });

               // remove not exist selections
               if (!productCategories)
                    selectOptions.remove();
               if (!productCategories.includes("normal"))
                    (selectOptions.find((child) => child.value === "normal")).remove();
               if (!productCategories.includes("special"))
                    (selectOptions.find((child) => child.value === "special")).remove();
               if (productCategories.includes("collectible"))
                    listOptions.innerHTML = "<option value=\"collectible\">bản sưu tập</option>"

               // execute buttons when quantity > 0 or not 
               if (quantity <= 0) {
                    buttons.forEach((button) => button.classList.add("disable"));
                    quantityBox.classList.add("disable")
               }

               bookDesc.innerText = productDescription;
               bookTags.innerText = genre;
               bookCategory.innerText = type;
               Action.setQuantityBox(Bridge.default());

               // execute other container
               let sameAuthor = elementsObj.getSameAuthorContainer();
               let productLike = elementsObj.getProductLikeContainer();
               let list = getProductBooks();
               productContainers(list, sameAuthor);
               productContainers(list, productLike);

          }

          // call some functions again after render DOM
          callAgain(elementsObj, "homepage");

     }
     catch (error) {
          alert("something went wrong!\n" + "Error type: " + error);
     }
}

// call again
function callAgain(elementsObj, ...names) {
     names.forEach((name) => {
          if (name === "homepage") {
               const checkBlog = setInterval(() => {
                    let newsContainer = elementsObj.getNewsBlogs();
                    let timeFS = elementsObj.getTimeFS();
                    if (newsContainer && timeFS) {
                         slidesHandler("news");
                         FlashSale.setTimeFS(elementsObj);
                         clearInterval(checkBlog);
                    }
               }, 400);
          }
     });

     Action.cancelButtons(elementsObj);
     Action.accountEvents(elementsObj);
     Action.staticContents(elementsObj);
     Interface.getInitProducts(elementsObj);
     Action.historyNavigate(elementsObj);

}

export { popStateHandler, urlHandler, renderDOMHandler, callAgain, execQueryHandler }