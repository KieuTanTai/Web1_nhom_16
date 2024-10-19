'use strict'
const query = document.querySelector.bind(document);
const queryAll = document.querySelectorAll.bind(document);
const fromId = document.getElementById.bind(document);
const fromClass = document.getElementsByClassName.bind(document);
const fromTag = document.getElementsByTagName.bind(document);
// get Elements object 
function getElementsHandler() {
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

// resize image
function resizeImages(productImages, ratio) {
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
function resizeSmNav(subMenuNav) {
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

// handle url


// get promise DOM function
async function promiseDOMHandler(fileAddress, elementsObj) {
     try {
          const response = await fetch(fileAddress);
          if (!response.ok)
               throw new Error(`${response.status} (${response.statusText})`);
          const text = await response.text();
          const newDOM = (new DOMParser()).parseFromString(text, "text/html");
          accountEvents(elementsObj, newDOM);
     }
     catch (error) {
          throw (`error when fetch your address! \n ${error}`);
     }
}

// function account
function accountEvents(elementsObj, promiseAccount) {
     const loginBtn = elementsObj.getJsLoginButton();
     const signupBtn = elementsObj.getJsSignupButton();
     loginBtn.forEach((button) => {
          button.addEventListener("click", () => {
               accountDOMHandler(promiseAccount, button, elementsObj);
          });
     });

     signupBtn.forEach((button) => {
          button.addEventListener("click", () => {
               accountDOMHandler(promiseAccount, button, elementsObj);
          });
     });
}

async function accountDOMHandler(promiseDOM, jsBtn, elementsObj) {
     try {
          const accountDocs = await promiseDOM;
          let loginHTML = await accountDocs.getElementById("login");
          let signupHTML = await accountDocs.getElementById("sign-up");
          const accountTitle = await accountDocs.querySelector("title");
          const accountContent = await accountDocs.getElementById("main-content");
          let forgotPassHTML = await accountDocs.getElementById("forgot-password");
          let placeInsert = Array.from(elementsObj.getMainContainer().children).find((element) => element.id === "main-content");
          const webContent = elementsObj.getWebContent();

          if (placeInsert === undefined)
               throw new Error(`your place you wanna insert is ${placeInsert}!`)

          if (jsBtn.classList.contains("js-login")) {
               accountTitle.innerText = "Đăng Nhập";
               query("Title").innerText = accountTitle.innerText;
               webContent.scrollIntoView({ behavior: "instant", block: "start", inline: "nearest" });
               // check if login form have active or not
               loginHTML = checkActiveHTML(loginHTML, signupHTML, forgotPassHTML);
               placeInsert.innerHTML = accountContent.innerHTML;
          }
          else if (jsBtn.classList.contains("js-signup")) {
               accountTitle.innerText = "Đăng Ký";
               query("Title").innerText = accountTitle.innerText;
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

document.addEventListener("DOMContentLoaded", function () {
     const ratio = 9 / 6;
     let elementsObj = getElementsHandler();
     resizeSmNav(elementsObj.getSubMenuNav());
     resizeImages(elementsObj.getImages(), ratio);
     promiseDOMHandler("../HTML/account.html", elementsObj);
})