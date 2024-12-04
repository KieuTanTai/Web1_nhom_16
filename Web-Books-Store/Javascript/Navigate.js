'use strict'
import * as Interface from "./Interface.js";
import * as Action from "./Actions.js";
import * as Bridge from "./Bridge.js";
import * as FlashSale from "./FlashSales.js";
import { slidesHandler } from "./Slides.js";
import { dynamicDetail, getProductBooks, getValueQuery, productContainers } from "./Products.js";
import { test } from "./search.js";

function sleep(ms) {
     return new Promise(resolve => setTimeout(resolve, ms));
}

// funcs execute url
function execQueryHandler(request) {
     // case not have
     if (!request) {
          let href = location.href; 
          request = href.slice(href.lastIndexOf("?") + 1, href.lastIndexOf("="));
     }

     // case have request
     let query = getValueQuery(request);
     let url = location.href;
     url = url.slice(url.lastIndexOf("/") + 1);
     let productsList = JSON.parse(localStorage.getItem("products"));
     if (query && request === "name") {
          let product = productsList.find((item) => (item.name).replaceAll("&", "").replaceAll("!", "").replaceAll(" ", "-") === query);
          if (Bridge.$("#detail-content").classList.contains("disable"))
               Interface.hiddenException("detail-content");
          dynamicDetail(product);
     }
     else if (query && request === "query")
          return query;
}

// func for popstate listener (it's will be very long)
function popStateHandler() {
     window.addEventListener("popstate", Bridge.throttle(() => {
          let url = location.href;
          let path = url.slice(url.lastIndexOf("/") + 1, url.length);
          if (!path) {
               window.location.replace(`${location.href.slice(0, location.href.lastIndexOf("/") + 1)}`);
               Interface.hiddenException();
          }
               
          execQueryHandler("name");
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

export { popStateHandler, urlHandler, callAgain, execQueryHandler, sleep }