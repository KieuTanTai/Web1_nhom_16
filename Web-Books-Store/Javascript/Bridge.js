'use strict'

const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const throttleList = {}; //object for throttle function
const debounceList = {};

// get Elements object 
function getElementsHandler() {
     let getElements = {
          getFSTable: () => query("#fs-container"),
          getSubHeader: () => query("#sub-header"),
          getScrollTop: () => query("#scroll-top"),
          getHeader: () => query("#header-container"),
          getFooter: () => query("#footer-container"),
          getJsAccountBtn: () => query("#user-account"),
          getMainContainer: () => query("#main-container"),
          getNewsBlogs: () => query("#news-blogs-container"),
          getTimeFS: () => query(".fs-time"),
          getJsCartBtn: () => queryAll(".cart-btn"),
          getNewsBtn: () => queryAll(".news-blogs"),
          getServicesBtn: () => queryAll(".services"),
          getElementPrices: () => queryAll(".price"),
          getWebContent: () => query(".web-content"),
          getWebLogo: () => queryAll(".web-logo div"),
          getJsLoginBtn: () => queryAll(".js-login"),
          getJsCancelBtn: () => queryAll(".js-cancel"),
          getJsRegisterBtn: () => queryAll(".js-register"),
          getJsForgotBtn: () => queryAll(".js-forgot-password"),
          getSubMenuNav: () => query(".sub-menu-item.menu-nav"),
          getImages: () => queryAll(".product-image.js-item img"),
     }
     return getElements;
}

// obj of path name
function pathNamesHandler() {
     let pathNamesObj = {
          "/": " ",
          "/index": "homepage",
          "/account/login": "login",
          "/account/register": "sign up",
          "/account/forgot_password": "forgot password",
          "/cart": "cart",
          "/product": "product",
          "/order": "order",
          "/history": "history order",
          "/tracking": "order tracking",
          "Header_Footer/footer": "footer",
          "Header_Footer/header": "header",
     }
     return pathNamesObj;
}

function throttle(callback, delayTime, key) {

     // create key for multi throttle
     if (!throttleList[key])
          throttleList[key] = { shouldWait: false };
     return function (...restArgs) {
          let shouldWait = throttleList[key].shouldWait;

          if (shouldWait)
               return;
          callback(...restArgs);
          throttleList[key].shouldWait = true;
          setTimeout(() => throttleList[key].shouldWait = false, delayTime);
     };
}

function debounce(callback, delayTime, key) {
     if (!debounceList[key])
          debounceList[key] = {time: 0};
     return function(...restArgs) {
          clearTimeout(debounceList[key].time);
          debounceList[key].time = setTimeout(() => {
               callback(...restArgs);
          }, delayTime);
     }
}

// get promise DOM function (use async await with fetch api)
async function promiseDOMHandler(fileAddress) {
     try {
          const response = await fetch(fileAddress);
          if (!response.ok)
               throw new Error(`${response.status} (${response.statusText})`);
          const text = await response.text();
          return (new DOMParser()).parseFromString(text, "text/html");
     }
     catch (error) {
          throw (`error when fetch your address! \n ${error}`);
     }
}

export default getElementsHandler;
export { query, queryAll, pathNamesHandler, promiseDOMHandler, throttle, debounce};
