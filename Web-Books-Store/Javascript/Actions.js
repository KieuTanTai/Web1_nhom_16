'use strict'
import * as Bridge from "./Bridge.js";
import { activeFlashSale } from "./FlashSales.js";
import { hiddenException, scrollView } from "./Interface.js";
import * as Navigate from "./Navigate.js";
import { getValueQuery } from "./Products.js";
import { test } from "./search.js";
import { slidesHandler } from "./Slides.js";

// funcs event
function disableSiblingContainer(container) {
     if (!container) return;
     Array.of(...container.children).forEach((child) => {
          child.classList.contains("active") ? child.classList.remove(active) : child;
          child.offsetWidth > 0 ? child.classList.add("disable") : child;
     });
}

function returnHomepage(elementsObj) {
     let testURL = location.pathname;
     testURL = testURL.slice(testURL.lastIndexOf("/") + 1, testURL.indexOf("?") + 1);

     // console.log(testURL);
     const webLogo = elementsObj.getWebLogo();
     webLogo?.forEach((element) => element.addEventListener("click", () => {
          if (testURL !== "index.html")
               window.location.replace(`${location.href.slice(0, location.href.lastIndexOf("/") + 1)}`);
          hiddenException();
     }));
}

function cancelButtons(elementsObj) {
     let loginForm = Bridge.$("#login");
     let forgotForm = Bridge.$("#forgot-password");
     const cancelBtn = elementsObj.getJsCancelBtn();
     if (cancelBtn)
          cancelBtn.forEach((btn) => btn.addEventListener("click", () => {
               loginForm?.classList.add("active");
               forgotForm?.classList.contains("active") ? forgotForm.classList.remove("active") : forgotForm;
          }));
}

// navigate to order-tracking
function trackingNavigate(elementsObj) {
     const container = elementsObj.getStatusContainer();
     const blankOrder = container?.querySelector("#blank-order");
     const customerOrder = container?.querySelector("#customer-order");
     const buttons = elementsObj.getOrderTrackingBtn();
     const trackers = localStorage.getItem("trackers");
     if (!buttons || !blankOrder || !customerOrder) return;

     buttons.forEach((btn) => { 
          btn.addEventListener("click", Bridge.throttle(() => {
               hiddenException("order-content");
               disableSiblingContainer(elementsObj.getOrderContent());
               (elementsObj.getStatusContainer())?.classList.remove("disable");
               if (!trackers) {
                    blankOrder.classList.add("active");
                    customerOrder.classList.contains("active") ? customerOrder.classList.remove("active") : customerOrder;
               }
               else {
                    customerOrder.classList.add("active");
                    blankOrder.classList.contains("active") ? blankOrder.classList.remove("active") : blankOrder;
               }


          }, 200, "statusNav"));
     });
}

// navigate to history tracking
function historyNavigate(elementsObj) {
     let historyBtn = elementsObj.getHistoryBtn();
     let historyContainer = elementsObj.getHistoryOrder();

     historyBtn.forEach((btn) => btn.addEventListener("click", () => {
          hiddenException("order-content");
          disableSiblingContainer(elementsObj.getOrderContent());
          (elementsObj.getHistoryContainer())?.classList.remove("disable");
          historyContainer.classList.add("active");
     }));
}

// set quantity box on detail product
function setQuantityBox(elementsObj) {
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

     if (nameStaticPage === "news") {
          staticPage = elementsObj.getNewsBlogs();
          hiddenException();
     }

     if (nameStaticPage === "services")
          staticPage = elementsObj.getFooter();
     else if (!staticPage && nameStaticPage === "services") {
          alert("not found services!");
          return false;
     }

     // check if action is scroll to top or not
     if (nameStaticPage === "top")
          window.scroll({ top: 0, left: 0, behavior: "smooth" });

     else if (staticPage)
          window.scroll({ top: staticPage.offsetTop + 3 * 16, left: 0, behavior: "smooth" });

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
     const loginButtons = elementsObj.getJsLoginBtn();
     let loginForm = Bridge.$("#login");
     const registerButtons = elementsObj.getJsRegisterBtn();
     let registForm = Bridge.$("#register");
     const forgotButtons = elementsObj.getJsForgotBtn();
     let forgotForm = Bridge.$("#forgot-password");

     loginButtons?.forEach((btn) => {
          btn.addEventListener("click", Bridge.throttle(() => {
               hiddenException("account-content");
               loginForm?.classList.add("active");
               registForm?.classList.contains("active") ? registForm.classList.remove("active") : registForm;
               forgotForm?.classList.contains("active") ? forgotForm.classList.remove("active") : forgotForm;
               scrollView();
          }, 200, "login"));
     });

     registerButtons?.forEach((btn) => {
          btn.addEventListener("click", Bridge.throttle(() => {
               hiddenException("account-content");
               registForm?.classList.add("active");
               loginForm?.classList.contains("active") ? loginForm.classList.remove("active") : loginForm;
               forgotForm?.classList.contains("active") ? forgotForm.classList.remove("active") : forgotForm;
               scrollView();
          }, 200, "register"));
     });

     forgotButtons?.forEach((btn) => {
          btn.addEventListener("click", Bridge.throttle(() => {
               hiddenException("account-content");
               forgotForm?.classList.add("active");
               loginForm?.classList.contains("active") ? loginForm.classList.remove("active") : loginForm;
               registForm?.classList.contains("active") ? registForm.classList.remove("active") : registForm;
               scrollView();
          }, 200, "forgotPassword"));
     })
}

document.addEventListener("DOMContentLoaded", () => {
     let elementsObj = Bridge.default();

     // check DOM of header, sub header and footer
     const checkDOM = setInterval(() => {
          if (elementsObj.getHeader() && elementsObj.getSubHeader() && elementsObj.getFooter()) {
               // call funcs
               accountEvents(elementsObj);
               staticContents(elementsObj);
               historyNavigate(elementsObj);
               trackingNavigate(elementsObj);
               returnHomepage(elementsObj);
               // remove Interval 
               clearInterval(checkDOM);
          }
     }, 200);

     // call funcs
     cancelButtons(elementsObj);
     slidesHandler("news");
     Navigate.execQueryHandler();
     Navigate.popStateHandler(location.href);
})

export { cancelButtons, accountEvents, staticContents, historyNavigate, setQuantityBox }