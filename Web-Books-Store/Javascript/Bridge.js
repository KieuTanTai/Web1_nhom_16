'use strict'

const throttleList = {}; //object for throttle function
const debounceList = {};
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// get Elements object 
function getElementsHandler() {
     let getElements = {
          // containers
          getWebContent: () => $(".web-content"),
          getHeader: () => $("#header-container"),
          getSubHeader: () => $("#sub-header"),
          getMainContainer: () => $("#main-container"),
          getFooter: () => $("#footer-container"),
          // news blogs
          getNewsBtn: () => $$(".news-nav"),
          getNewsBlogs: () => $("#news-blogs-container"),
          // flash sale elements
          getTimeFS: () => $(".fs-time"),
          getFSTable: () => $("#fs-container"),
          // buttons
          getNavBtn: () => $$(".nav-btn"),
          getPrevBtn: () => $$(".prev-btn"),
          getNextBtn: () => $$(".next-btn"),
          getJsCancelBtn: () => $$(".js-cancel"),
          getServicesBtn: () => $$(".services"),
          getJsCartBtn: () => $$(".cart-btn"),
          getHistoryBtn: () => $$(".history-order-link"),
          // account buttons
          getJsAccountBtn: () => $("#user-account"),
          getJsLoginBtn: () => $$(".js-login"),
          getJsRegisterBtn: () => $$(".js-register"),
          getJsForgotBtn: () => $$(".js-forgot-password"),
          // others
          getScrollTop: () => $("#scroll-top"),
          getDotsBar: () => $$(".dots-bar"),
          getSubMenuNav: () => $(".sub-menu-item.menu-nav"),
          getElementPrices: () => $$(".price"),
          getWebLogo: () => $$(".web-logo div"),
          getImages: () => $$(".product-image.js-item img"),
     }
     return getElements;
}

// obj of path name
function pathNamesHandler() {
     let pathNamesObj = {
          // root url
          "/": "homepage",
          "/index": "homepage",
          // other pages url
          "/cart": "cart",
          "/product": "product",
          "/tracking": "order tracking",
          // account url
          "/account/": "account",
          "/account/login": "login",
          "/account/register": "sign up",
          "/account/forgot_password": "forgot password",
          // order url
          "/order/": "order",
          "/order/status": "status",
          "/order/history": "history",
          // forbidden url 
          "/header_footer/footer": "footer",
          "/header_footer/header": "header",
     }
     return pathNamesObj;
}

function throttle(callback, delayTime, key) {
     // create obj key for multi throttle
     if (!throttleList[key])
          throttleList[key] = {shouldWait: false};

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
     // create obj key for multi debounce
     if (!debounceList[key])
          debounceList[key] = { time: 0 };

     return function (...restArgs) {
          clearTimeout(debounceList[key].time);
          debounceList[key].time = setTimeout(() => {
               callback(...restArgs);
          }, delayTime);
     }
}

// get promise DOM func (use async await with fetch api)
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
export { $, $$, pathNamesHandler, promiseDOMHandler, throttle, debounce };
