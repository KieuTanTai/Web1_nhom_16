'use strict'
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const fromId = document.getElementById.bind(document);
const fromClass = document.getElementsByClassName.bind(document);
const fromTag = document.getElementsByTagName.bind(document);

// get Elements object 
function getElementsHandler () {
     let getElements = {
          getImages: () => queryAll(".product-image.js-item img"),
          getSubMenuNav: () => query(".sub-menu-item.menu-nav"),
          getJsLoginButton: () => queryAll(".lnw-btn.js-login"),
          getJsSignupButton: () => queryAll(".lnw-btn.js-signup"),
          getMainContainer: () => query("#main-container"),
          getWebContent: () => query(".web-content")
     }
     return getElements;
}

// obj of path name
function pathNamesHandler () {
     let pathNamesObj = {
          "/": " ",
          "/index.html" : "homepage",
          "/login" : "login",
          "/register": "sign up",
          "/product" : "product",
          "/order" : "order",
          "/tracking" : "order tracking",
          "/history" : "history order",
     }
     return pathNamesObj;
}

export default getElementsHandler;
export {query, queryAll, fromId, fromClass, fromTag, pathNamesHandler};
