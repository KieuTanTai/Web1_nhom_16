'use strict'

const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const throttleList = {};

// get Elements object 
function getElementsHandler () {
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
function pathNamesHandler () {
     let pathNamesObj = {
          "/": " ",
          "/index.html" : "homepage",
          "/account/login" : "login",
          "/account/register": "sign up",
          "/account/forgot_password": "forgot password",
          "/cart" : "cart",
          "/product" : "product",
          "/order" : "order",
          "/history" : "history order",
          "/tracking" : "order tracking",
          "Header_Footer/footer": "footer",
          "Header_Footer/header": "header",
     }
     return pathNamesObj;
}

function throttle(callback, delayTime, key) {

     // create key for multi throttle
     if (!throttleList[key])
          throttleList[key] = {lastCall: 0};
     return function(...args) {
          let now = Date.now();
          const lastCall = throttleList[key].lastCall;
          // console.log('Last call:', lastCall);
          // console.log('Now:', now);
          // console.log('Delay Time:', delayTime);
          // console.log('Elapsed time:', now - lastCall);
          
          if (now - lastCall < delayTime) return;
          
          throttleList[key].lastCall = now;
          return callback(...args);
     };
}


// get promise DOM function (use async await with fetch api)
async function promiseDOMHandler (fileAddress) {
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
export {query, queryAll, pathNamesHandler, promiseDOMHandler, throttle};
