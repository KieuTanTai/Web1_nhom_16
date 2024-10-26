'use strict'

const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);

// get Elements object 
function getElementsHandler () {
     let getElements = {
          getImages: () => queryAll(".product-image.js-item img"),
          getWebLogo: () => queryAll(".web-logo a"),
          getSubMenuNav: () => query(".sub-menu-item.menu-nav"),
          getJsLoginBtn: () => queryAll(".lnw-btn.js-login"),
          getJsSignupBtn: () => queryAll(".lnw-btn.js-signup"),
          getMainContainer: () => query("#main-container"),
          getWebContent: () => query(".web-content"),
          getWebContent: () => query(".web-content"),
          getScrollTop: () => query("#scroll-top"),
          getJsCartBtn: () => queryAll(".cart-btn"),
          getElementPrices: () => queryAll(".price"),
          getTimeFS: () => query(".fs-time"),
          getFSTable: () => query("#fs-container"),
          getJsAccountBtn: () => query("#user-account"),
          getHeader: () => query("#header-container"),
          getSubHeader: () => query("#sub-header"),
          getFooter: () => query("#footer-container"),
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
          "/cart" : "cart",
          "/product" : "product",
          "/order" : "order",
          "/tracking" : "order tracking",
          "/history" : "history order",
          "Header_Footer/footer": "footer",
          "Header_Footer/header": "header",
     }
     return pathNamesObj;
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
export {query, queryAll, pathNamesHandler, promiseDOMHandler};
