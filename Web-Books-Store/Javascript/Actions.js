'use strict'
import * as bridge from "./Bridge.js";

function scrollTop (elementsObj) {
     const scrollTopBtn = elementsObj.getScrollTop();
     if (scrollTopBtn) {
          scrollTopBtn.addEventListener("click", () => {
               window.scroll({
                    top: 0,
                    left : 0,
                    behavior: "smooth"
               });
          });
     }
}

function returnHomepage (elementsObj, nowPath) {
     const webLogo = elementsObj.getWebLogo();
     if (webLogo) {
          webLogo.forEach((element) => {
               const originPath = nowPath.slice(0, nowPath.lastIndexOf("/") + 1);
               element.addEventListener("click", () => location.replace(`${location.origin}${originPath}`));
          });
     }
}

// function for popstate listener (it's will be very long)
function popStateHandler (pathsObj, docsURL) {
     window.addEventListener ("popstate", (event) => {
          const currentPath = event.target.location.pathname;
          const path = currentPath.slice(docsURL.lastIndexOf("/"), currentPath.length + 1);  
          console.log(path);   
          if (pathsObj[path]) {
               switch (path) {
                    case "/account/login":
                    case "/account/register":
                         accountDOM(`${path.slice(path.lastIndexOf("/") + 1, path.length + 1)}`);
                         break;

                    case "/":
                    case "/index.html":
                         window.history.go();
                         break;

                    case "Header_Footer/footer":
                    case "Header_Footer/header":
                         alert("forbidden!");
                         throw new Error("forbidden!");
                    default:
                         accountDOM(path.slice(1, path.length + 1));
                    
               }

          }
     });
}

// function for push state with mutation observer method 
function pushStateHandler () {

}

// handle url path changed
function urlHandler (pathName, docsURL) {
     const pathsObj = bridge.pathNamesHandler();
     if (pathName[0] !== "/")
          pathName = `/${pathName}`;
     popStateHandler(pathsObj, docsURL);
     
     if (pathsObj[pathName]) {
          window.history.pushState({}, "", `${docsURL.slice(0, docsURL.lastIndexOf("/"))}${pathName}`)
          return true;
     }
     else {
          alert ("404 not found!");
          return false;
     }
}

// first params for checkActiveHTML would be added active class
function checkActiveHTML (nameForm, ...restForm) {
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
     const signupBtn = elementsObj.getJsSignupBtn();
     if (!loginBtn || !signupBtn) {
          console.log("not found button!");
          return;
     }

     loginBtn.forEach((button) => {
          button.addEventListener("click", () => {
               if (urlHandler("/account/login", docsURL))
                    accountDOM("login");
          });
     });

     signupBtn.forEach((button) => {
          button.addEventListener("click", () => {
               if (urlHandler("/account/register", docsURL))
                    accountDOM("register");
          });
     });
}

// render html DOM
async function accountDOM (request) {
     try {
          if (!request)
               throw new Error(request);
          const elementsObj = bridge.default();
          const accountDOM = await bridge.promiseDOMHandler(`../account/${request}.html`);
          const accountTitle = accountDOM.querySelector("title");
          const accountContent = accountDOM.getElementById("main-content");
          const webContent = elementsObj.getWebContent();
          const mainContainer = elementsObj.getMainContainer();
          if (!webContent || !mainContainer)
               return;
          let placeInsert = Array.from(mainContainer.children).find((element) => element.id === "main-content");

          if (request === "login") {
               accountTitle.innerText = "Đăng Nhập";
               bridge.query("title").innerText = accountTitle.innerText;
               placeInsert.innerHTML = accountContent.innerHTML;
               webContent.scrollIntoView({ behavior: "instant", block: "start", inline: "nearest" });
          }

          if (request === "register") {
               accountTitle.innerText = "Đăng Ký";
               bridge.query("title").innerText = accountTitle.innerText;
               placeInsert.innerHTML = accountContent.innerHTML;
               webContent.scrollIntoView({ behavior: "instant", block: "start", inline: "nearest" });
          }
     } 
     catch (error) {
          alert ("something went wrong!\n" + "Error type: " + error);
     }

}

document.addEventListener ("DOMContentLoaded", () => {
     let elementsObj = bridge.default();
     
     // check DOM of header, sub header and footer
     const checkDOM = setInterval(() => {
          if (elementsObj.getHeader() && elementsObj.getSubHeader() && elementsObj.getFooter()) {
               accountEvents(elementsObj);
               returnHomepage(elementsObj, location.pathname);
               clearInterval(checkDOM);
          }
     }, 200);
     scrollTop(elementsObj);
})