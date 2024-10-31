'use strict'
import * as bridge from "./Bridge.js";

function cancelAction (elementsObj) {
     const cancelBtn = elementsObj.getJsCancelBtn();
     if (cancelBtn) {
          cancelBtn.forEach((btn) => {
               btn.addEventListener("click", () => {
                    window.history.back();
               });
          });
     }
}

function returnHomepage(elementsObj, nowPath) {
     const webLogo = elementsObj.getWebLogo();

     if (webLogo) {
          webLogo.forEach((element) => {
               // let temp = nowPath.match(/^\/(?!.*\/\/)([a-zA-Z-\/]+)$/g);
               const originPath = nowPath.slice(0, nowPath.indexOf("/HTML/") + 6);
               element.addEventListener("click", () => location.replace(`${location.origin}${originPath}`));
          });
     }
}

// handle event click
function onclickHandler () {

}



// handle scroll 
function scrollToHandler(nameStaticPage) {
     let staticPage;
     const elementsObj = bridge.default();
     
     if (nameStaticPage === "news")
          staticPage = elementsObj.getNewsBlogs();

     if (nameStaticPage === "services")
          staticPage = elementsObj.getFooter();

     if (!staticPage && nameStaticPage === "news") {
          // edit state and render homepage where news has been located
          const nowPath = location.pathname;
          window.history.pushState({}, "", `${nowPath.slice(0, nowPath.lastIndexOf("/HTML/") + 6)}index.html`);
          renderDOMHandler("homepage");
          const checkBlog = setInterval(() => {
               staticPage = elementsObj.getNewsBlogs();
               if (staticPage) {
                    window.scroll({
                         top: staticPage.offsetTop + 3 * 16,
                         left: 0,
                         behavior: "smooth"
                    });
                    console.log("total: " + (staticPage.offsetTop + 3 * 16));
                    console.log(staticPage.offsetTop);
                    clearInterval(checkBlog);
               }
          }, 800);
     }
     else if (!staticPage && nameStaticPage === "services") {
          alert("not found services!");
          return false;
     }

     // check if action is scroll to top or not
     if (nameStaticPage === "scrollTop")
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

// function for click nav btn on sub header or click to scroll top btn
function staticContents(elementsObj) {
     const newsBtn = elementsObj.getNewsBtn();
     const scrollTopBtn = elementsObj.getScrollTop();
     const servicesBtn = elementsObj.getServicesBtn();

     // add event listener
     if (newsBtn) {
          newsBtn.forEach((btn) => {
               btn.addEventListener("click", () => {
                    scrollToHandler("news");
               });
          });
     }

     if (servicesBtn) {
          servicesBtn.forEach((btn) => {
               btn.addEventListener("click", () => {
                    scrollToHandler("services");
               });
          });
     }

     if (scrollTopBtn) {
          scrollTopBtn.addEventListener("click", () => {
               scrollToHandler("scrollTop");
          });
     }

}

// function for popstate listener (it's will be very long)
function popStateHandler(pathsObj, docsURL) {
     window.addEventListener("popstate",
          bridge.throttle((event) => {
               const currentPath = event.target.location.pathname;
               let path = currentPath.slice(docsURL.lastIndexOf("/HTML/") + 5, currentPath.length + 1);
               if (path.includes(".html"))
                    path = path.replace(".html", "");
               console.log(path);
               // execute DOM with specific path
               if (pathsObj[path]) {
                    switch (path) {
                         case "/account/login":
                         case "/account/register":
                         case "/account/forgot_password":
                              renderDOMHandler("account", `${path.slice(path.lastIndexOf("/") + 1, path.length + 1)}`);
                              break;

                         case "order/status":
                         case "order/history":
                              if (path === "order/status")
                                   renderDOMHandler("orderStatus");
                              else
                                   renderDOMHandler("orderHistory");
                              break;

                         case "/":
                         case "/index":
                              renderDOMHandler("homepage");
                              break;

                         case "Header_Footer/footer":
                         case "Header_Footer/header":
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
     if (typeof pathName !== "string" || !pathName) 
          return false;

     if (pathName[0] !== "/")
          pathName = `/${pathName}`;

     const pathsObj = bridge.pathNamesHandler();
     if (!pathsObj[pathName]) {
          alert("404 not found!");
          return false;
     }

     let newURL = `${docsURL.slice(0, docsURL.lastIndexOf("/HTML/") + 5)}${pathName}`;
     window.history.pushState({}, "", newURL);
     return true;
}

// first params for checkActiveHTML would be added active class
function checkActiveHTML(nameForm, ...restForm) {
     restForm.forEach((form) => {
          if (form.classList.contains("active"))
               form.classList.remove("active");
     });

     if (!nameForm.classList.contains("active"))
          nameForm.classList.add("active");
     return nameForm;
}

// DOM navigate handler (SPA)
// function account's events handle
function accountEvents(elementsObj) {
     const docsURL = location.pathname;
     const loginBtn = elementsObj.getJsLoginBtn();
     const registerBtn = elementsObj.getJsRegisterBtn();
     const forgotBtn = elementsObj.getJsForgotBtn();

     if (!loginBtn || !registerBtn || !forgotBtn)
          return false;

     loginBtn.forEach((btn) => {
          btn.addEventListener("click", bridge.throttle(() => {
               if (urlHandler("/account/login", docsURL))
                    (renderDOMHandler("account", "login"));
          }, 200, "login"));
     });

     registerBtn.forEach((btn) => {
          btn.addEventListener("click", bridge.throttle(() => {
               if (urlHandler("/account/register", docsURL))
                    renderDOMHandler("account", "register");
          }, 200, "register"));
     });

     forgotBtn.forEach((btn) => {
          btn.addEventListener("click", bridge.throttle(() => {
               if (urlHandler("/account/forgot_password", docsURL))
                    renderDOMHandler("account", "forgotPassword");
          }, 200, "forgotPassword"));
     })
}

// render html DOM
async function renderDOMHandler(nameDOM, ...requestRest) {
     try {
          const elementsObj = bridge.default();
          const webContent = elementsObj.getWebContent();
          const mainContainer = elementsObj.getMainContainer();
          if (!webContent || !mainContainer)
               return false;

          if (nameDOM === "account" && !requestRest) {
               let loginStatus = localStorage.getItem("loginStatus");
               if (!loginStatus)
                    requestRest = "login";
          }

          // set await promise DOM
          let scriptDOM, request;
          if (nameDOM === "account") {
               for (request of requestRest)
                    // validate request is one of these types or not
                    if (request === "login" || request === "register" || request === "forgotPassword") {
                         if (request === "forgotPassword")
                              request = "forgot_password";
                         scriptDOM = await bridge.promiseDOMHandler(`/Web-Books-Store/HTML/account/${request}.html`);
                         break;
                    }
                    else
                         throw new Error(`invalid request: ${request}\ntry again with request type 
                                         "login", "register", "forgot_password" for account DOM`);
          }

          if (nameDOM === "homepage")
               scriptDOM = await bridge.promiseDOMHandler(`/Web-Books-Store/HTML/index.html`);

          if (nameDOM === "orderStatus" || nameDOM === "orderHistory") {
               nameDOM = nameDOM.replace("order", "");
               nameDOM = nameDOM.toLowerCase();
               scriptDOM = await bridge.promiseDOMHandler(`/Web-Books-Store/HTML/order/${request}.html`);
          }

          if (!scriptDOM)
               throw new Error("scripDOM: " + scriptDOM);

          const title = scriptDOM.querySelector("title");
          const content = scriptDOM.getElementById("main-content");
          let placeInsert = Array.from(mainContainer.children).find((element) => element.id === "main-content");

          // for account DOM
          if (nameDOM === "account" && request === "forgot_password")
               placeInsert.style.paddingTop = 0.7 + "em";
          else 
               placeInsert.removeAttribute("style");

          // for render DOM
               bridge.query("title").innerText = title.innerText;
               placeInsert.innerHTML = content.innerHTML;
               webContent.scrollIntoView({ behavior: "instant", block: "start", inline: "nearest" });

          // call some functions again after render DOM
          cancelAction(elementsObj);
          accountEvents(elementsObj);
          staticContents(elementsObj);
     } 
     catch (error) {
          alert("something went wrong!\n" + "Error type: " + error + "\nwe will navigate you to homepage!");
          const nowPath = location.pathname;
          window.history.pushState({}, "", `${nowPath.slice(0, nowPath.lastIndexOf("/HTML/") + 6)}index.html`);
          renderDOMHandler("homepage");
     }
}

document.addEventListener("DOMContentLoaded", () => {
     let elementsObj = bridge.default();
     const pathsObj = bridge.pathNamesHandler();
     // check DOM of header, sub header and footer
     const checkDOM = setInterval(() => {
          if (elementsObj.getHeader() && elementsObj.getSubHeader() && elementsObj.getFooter()) {
               accountEvents(elementsObj);
               staticContents(elementsObj);
               returnHomepage(elementsObj, location.pathname);
               clearInterval(checkDOM);
          }
     }, 200);

     cancelAction(elementsObj);
     popStateHandler(pathsObj, location.pathname);
})