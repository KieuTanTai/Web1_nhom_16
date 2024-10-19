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
          "/login" : "login",
          "/register": "sign up",
          "/product" : "product",
          "/order" : "order",
          "/tracking" : "order tracking",
          "/history" : "history order",
     }
     return pathNamesObj;
}

// function for popstate listener (it's will be very long)
function popStateHandler (pathsObj) {
     window.addEventListener ("popstate", (event) => {
          const currentPath = event.target.location.pathname;
          const path = currentPath.slice(currentPath.lastIndexOf("/"), currentPath.length + 1);  
          if (pathsObj[path]) {
               switch (path) {
                    case "/login":
                    case "/register":
                         accountDOMHandler(path.slice(1, path.length + 1));
                         break;
                    case "/":
                         window.location.reload();
                         break;
                    default:
                         accountDOMHandler(path.slice(1, path.length + 1));
                    
               }

          }
     });
}

// handle url path changed
function urlHandler (pathName) {
     const docsURL = document.URL;
     const pathsObj = pathNamesHandler();
     if (!pathName.includes("/"))
          pathName = `/${pathName}`;
     popStateHandler(pathsObj);

     if (pathsObj[pathName]) {
          window.history.pushState({}, "", `${docsURL.slice(0, docsURL.lastIndexOf("/"))}${pathName}`)
          return true;
     }
     else {
          alert ("404 not found!");
          return false;
     }
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

// fix bug interface function
// resize image
function resizeImages (productImages, ratio) {
     productImages.forEach((image) => {
          image.addEventListener("load", () => {
               image.style.height = (ratio * image.offsetWidth) + "px";
          });
     });

     window.addEventListener("resize", () => {
          productImages.forEach((image) => {
               image.style.height = (ratio * image.offsetWidth) + "px";
          });
     })
}

// resize width of nav
function resizeSmNav (subMenuNav) {
     const childInner = subMenuNav.firstElementChild;
     let parentWidth = subMenuNav.offsetWidth;
     childInner.style.width = (parentWidth / 16) + "em";

     window.addEventListener("resize", function () {
          parentWidth = subMenuNav.offsetWidth;
          if (!childInner.width === "unset")
               childInner.style.width = "unset";
          else
               childInner.style.width = (parentWidth / 16) + "em";
     });
}

// DOM navigate handler (SPA)
// function account's events handle
function accountEvents(elementsObj) {
     const loginBtn = elementsObj.getJsLoginButton();
     const signupBtn = elementsObj.getJsSignupButton();
     loginBtn.forEach((button) => {
          button.addEventListener("click", () => {
               if (urlHandler("login"))
                    accountDOMHandler("login");
          });
     });

     signupBtn.forEach((button) => {
          button.addEventListener("click", () => {
               if (urlHandler("register"))
                    accountDOMHandler("register");
          });
     });
}

// render html DOM
// render account.html DOM 
async function accountDOMHandler (request) {
     try {
          const accountDocs = await promiseDOMHandler("../HTML/account.html");
          let loginHTML = accountDocs.getElementById("login");
          let signupHTML = accountDocs.getElementById("sign-up");
          const accountTitle = accountDocs.querySelector("title");
          const accountContent = accountDocs.getElementById("main-content");
          let forgotPassHTML = accountDocs.getElementById("forgot-password");
          const elementsObj = getElementsHandler();
          let placeInsert = Array.from(elementsObj.getMainContainer().children).find((element) => element.id === "main-content");
          const webContent = elementsObj.getWebContent();

          if ((placeInsert === undefined) && (request === undefined))
               throw new Error(`your place you wanna insert is ${placeInsert}!`)

          if (request === "login") {
               accountTitle.innerText = "Đăng Nhập";
               query("title").innerText = accountTitle.innerText;
               webContent.scrollIntoView({ behavior: "instant", block: "start", inline: "nearest" });

               // check if login form have active or not
               loginHTML = checkActiveHTML(loginHTML, signupHTML, forgotPassHTML);
               placeInsert.innerHTML = accountContent.innerHTML;
          }
          else if (request === "register") {
               accountTitle.innerText = "Đăng Ký";
               query("title").innerText = accountTitle.innerText;
               webContent.scrollIntoView({ behavior: "instant", block: "start", inline: "nearest" });

               // check if signup form have active or not
               signupHTML = checkActiveHTML(signupHTML, loginHTML, forgotPassHTML);
               placeInsert.innerHTML = accountContent.innerHTML;
          }
     }
     catch (error) {
          alert(`something went wrong! \n${error}`);
     }
}

document.addEventListener ("DOMContentLoaded", function () {
     const ratio = 9 / 6;
     let elementsObj = getElementsHandler();
     resizeSmNav(elementsObj.getSubMenuNav());
     resizeImages(elementsObj.getImages(), ratio);
     accountEvents(elementsObj);

})