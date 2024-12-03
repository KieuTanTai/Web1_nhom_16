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
     let query = getValueQuery(request);
     let url = location.href;
     url = url.slice(url.lastIndexOf("/") + 1);
     let productsList = JSON.parse(localStorage.getItem("products"));
     if (query && request === "name") {
          let product = productsList.find((item) => (item.name).replaceAll("&", "").replaceAll("!", "").replaceAll(" ", "-") === query);
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

// render html specific DOM with required is name of DOM and option is requests
async function renderDOMHandler(nameDOM, ...requestRests) {
     const originPath = location.pathname.slice(0, location.pathname.lastIndexOf("/HTML/") + 5);
     try {
          const webContent = elementsObj.getWebContent();
          const mainContainer = elementsObj.getMainContainer();
          const placeInsert = Array.from(mainContainer.children).find((element) => element.id === "main-content");

          if (!webContent || !mainContainer) return false;
          // set default request when name of DOM is account
          if (nameDOM === "account" && !requestRests) {
               let loginStatus = localStorage.getItem("loginStatus");
               if (!loginStatus) requestRests = "login";
          }
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


          // execute after render
          if (nameDOM === "search")
               test();

          if (nameDOM === "detail_product" && requestRests) {

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

export { popStateHandler, urlHandler, renderDOMHandler, callAgain, execQueryHandler, sleep }