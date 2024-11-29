'use strict'
import * as Bridge from "./Bridge.js";
import { activeFlashSale } from "./FlashSales.js";
import * as Navigate from "./Navigate.js";
import { getValueQuery } from "./Products.js";
 import { slidesHandler } from "./Slides.js";

// funcs event
function cancelButtons(elementsObj) {
     const cancelBtn = elementsObj.getJsCancelBtn();
     if (cancelBtn)
          cancelBtn.forEach((btn) => btn.addEventListener("click", () => window.history.back()));
}

function trackingNavigate(elementsObj) {
     const docsURL = location.pathname;
     const buttons = elementsObj.getOrderTrackingBtn();

     if (!buttons) return;
     buttons.forEach((btn) => {
          btn.addEventListener("click", Bridge.throttle(() => {
               if (Navigate.urlHandler("/order/status", docsURL))
                    Navigate.renderDOMHandler("orderStatus");
          }, 200, "statusNav"));
     });
}

function returnHomepage(elementsObj, nowPath) {
     const webLogo = elementsObj.getWebLogo();
     const originPath = nowPath.slice(0, nowPath.indexOf("/HTML/") + 6);
     if (webLogo)
          webLogo.forEach((element) => element.addEventListener("click", () => location.replace(`${location.origin}${originPath}`)));
}

function historyNavigate(elementsObj) {
     const docsURL = location.pathname;
     const buttons = elementsObj.getHistoryBtn();

     if (!buttons) return;
     buttons.forEach((btn) => {
          btn.addEventListener("click", Bridge.throttle(() => {
               if (Navigate.urlHandler("/order/history", docsURL))
                    Navigate.renderDOMHandler("orderHistory");
          }, 200, "historyNav"));
     });
}


function setQuantityBox (elementsObj) {
     let reduceBtn = elementsObj.getQuantityBox().querySelector("input[type=button].reduce");
     let increaseBtn = elementsObj.getQuantityBox().querySelector("input[type=button].increase");
     let quantity = elementsObj.getQuantityBox().querySelector("input[type=text]#quantity");
     let productID = Bridge.$(".product-id")?.innerHTML;
     let realQuantity = Array.from(JSON.parse(localStorage.getItem("products"))).find((product) => product.productID === productID)?.quantity;

     reduceBtn.addEventListener("click", () => quantity.value = parseInt(quantity.value) - 1 <= 0 ? 1 : parseInt(quantity.value) - 1);
     increaseBtn.addEventListener("click", () => quantity.value = parseInt(quantity.value) + 1 <= realQuantity ? parseInt(quantity.value) + 1 : realQuantity);
     quantity.addEventListener("change", () => quantity.value = parseInt(quantity.value) > realQuantity ? realQuantity : parseInt(quantity.value));
}

// handle scrolls
function scrollToHandler(nameStaticPage) {
     let staticPage;
     const elementsObj = Bridge.default();

     if (nameStaticPage === "news")
          staticPage = elementsObj.getNewsBlogs();

     if (nameStaticPage === "services")
          staticPage = elementsObj.getFooter();

     if (!staticPage && nameStaticPage === "news") {
          // edit state and render homepage where news has been located
          const nowPath = location.pathname;
          //window.history.pushState({}, "", `${nowPath.slice(0, nowPath.lastIndexOf("/HTML/") + 6)}index.html`);
          if (Navigate.urlHandler("/", nowPath))
               Navigate.renderDOMHandler("homepage");

          const checkBlog = setInterval(() => {
               staticPage = elementsObj.getNewsBlogs();
               if (staticPage) {
                    window.scroll({
                         top: staticPage.offsetTop + 3 * 16,
                         left: 0,
                         behavior: "smooth"
                    });
                    clearInterval(checkBlog);
               }
          }, 600);
     }
     else if (!staticPage && nameStaticPage === "services") {
          alert("not found services!");
          return false;
     }

     // check if action is scroll to top or not
     if (nameStaticPage === "top")
          window.scroll({
               top: 0,
               left: 0,
               behavior: "smooth"
          });

     else if (staticPage)
          window.scroll({
               top: staticPage.offsetTop + 3 * 16,
               left: 0,
               behavior: "smooth"
          });

}

// func for click nav btn on sub header or click to scroll top btn
function staticContents(elementsObj) {
     const newsButtons = elementsObj.getNewsBtn();
     const scrollTopButtons = elementsObj.getScrollTop();
     const servicesButtons = elementsObj.getServicesBtn();

     // add event listener
     if (newsButtons) {
          newsButtons.forEach((btn) => {
               btn.addEventListener("click", Bridge.throttle(() => scrollToHandler("news"), 200, "newsBtn"));
          });
     }

     if (servicesButtons) {
          servicesButtons.forEach((btn) => {
               btn.addEventListener("click", Bridge.throttle(() => scrollToHandler("services"), 200, "servicesBtn"));
          });
     }

     if (scrollTopButtons) {
          scrollTopButtons.addEventListener("click", Bridge.throttle(() => scrollToHandler("top"), 200, "ScrollTopBtn"));
     }
}

// DOM navigate handler (SPAs)
// func account's events handle
function accountEvents(elementsObj) {
     const docsURL = location.pathname;
     const loginButtons = elementsObj.getJsLoginBtn();
     const registerButtons = elementsObj.getJsRegisterBtn();
     const forgotButtons = elementsObj.getJsForgotBtn();

     loginButtons?.forEach((btn) => {
          btn.addEventListener("click", Bridge.throttle(() => {
               if (Navigate.urlHandler("/account/login", docsURL))
                    (Navigate.renderDOMHandler("account", "login"));
          }, 200, "login"));
     });

     registerButtons?.forEach((btn) => {
          btn.addEventListener("click", Bridge.throttle(() => {
               if (Navigate.urlHandler("/account/register", docsURL))
                    Navigate.renderDOMHandler("account", "register");
          }, 200, "register"));
     });

     forgotButtons?.forEach((btn) => {
          btn.addEventListener("click", Bridge.throttle(() => {
               if (Navigate.urlHandler("/account/forgot_password", docsURL))
                    Navigate.renderDOMHandler("account", "forgotPassword");
          }, 200, "forgotPassword"));
     })
}

document.addEventListener("DOMContentLoaded", () => {
     let elementsObj = Bridge.default();
     const pathsObj = Bridge.pathNamesHandler();

     // check DOM of header, sub header and footer
     const checkDOM = setInterval(() => {
          if (elementsObj.getHeader() && elementsObj.getSubHeader() && elementsObj.getFooter()) {
               // call funcs
               accountEvents(elementsObj);
               staticContents(elementsObj);
               historyNavigate(elementsObj);
               trackingNavigate(elementsObj);
               returnHomepage(elementsObj, location.pathname);
               // remove Interval 
               clearInterval(checkDOM);
          }
     }, 200);

     // call funcs
     cancelButtons(elementsObj);
     slidesHandler("news");
     Navigate.execQueryHandler();
     Navigate.popStateHandler(pathsObj, location.pathname);
})

export { cancelButtons, accountEvents, staticContents, historyNavigate, setQuantityBox }