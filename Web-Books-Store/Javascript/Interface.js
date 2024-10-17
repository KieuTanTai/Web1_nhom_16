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
               getWebContent : () => query(".web-content")
     }
     return getElements; 
}


// resize image
function resizeImages (productImages, ratio) {
     productImages.forEach((image) => {
          image.addEventListener("load", () => {
               image.style.height = ( ratio * image.offsetWidth) + "px";
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
     let parentWidth =  subMenuNav.offsetWidth;
     childInner.style.width = (parentWidth / 16) + "em";

     window.addEventListener("resize", function() {
          parentWidth = subMenuNav.offsetWidth;
          if (!childInner.width === "unset")
               childInner.style.width = "unset";
          else
               childInner.style.width = (parentWidth / 16) + "em";
     }); 
}

// get promise DOM function
async function getPromiseDOM (fileAddress) {
     try {
          const response = await fetch(fileAddress);
          if (!response.ok) {
               throw (`your response status is : ${response.status} !`);
          }
          const text = await response.text();
          const parser = new DOMParser();
          return parser.parseFromString(text, "text/html");
     }
     catch (error) {
          throw (`error when fetch your address! : ${error}`);
     }
}

// function account
function accountEvents (getElements, promiseAccount) {
     const loginBtn = getElements.getJsLoginButton();
     const signupBtn = getElements.getJsSignupButton();
     loginBtn.forEach((button) => {
          button.addEventListener("click", () => {
               accountDOMHandler(promiseAccount, button, getElements);
          });
     });

     signupBtn.forEach((button) => {
          button.addEventListener("click", () => {
               accountDOMHandler(promiseAccount, button, getElements);
          });
     });
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
async function accountDOMHandler (promiseDOM, jsBtn, getElements) {
     try {
          const accountDocs = await promiseDOM;
          const accountContent = await accountDocs.getElementById("main-content");
          let loginHTML = await accountDocs.getElementById("login");               
          let signupHTML = await accountDocs.getElementById("sign-up");
          let forgotPassHTML = await accountDocs.getElementById("forgot-password");
          const accountTitle = accountDocs.querySelector("title");
          const webContent = getElements.getWebContent();
          let placeInsert = Array.from(getElements.getMainContainer().children).find((element) => element.id === "main-content");

          if (placeInsert !== undefined) {
               if (jsBtn.classList.contains("js-login")) {
                    accountTitle.innerText = "Đăng Nhập";
                    query("Title").innerText = accountTitle.innerText;
                    webContent.scrollIntoView({behavior: "instant", block: "start", inline: "nearest"});
                    // check if login form have active or not
                    loginHTML = checkActiveHTML(loginHTML, signupHTML, forgotPassHTML);
                    placeInsert.innerHTML = accountContent.innerHTML;
               }
               else if (jsBtn.classList.contains("js-signup")) {
                    accountTitle.innerText = "Đăng Ký";
                    query("Title").innerText = accountTitle.innerText;
                    webContent.scrollIntoView({behavior: "instant", block: "start", inline: "nearest"});
                    // check if signup form have active or not
                    signupHTML = checkActiveHTML(signupHTML, loginHTML, forgotPassHTML);
                    placeInsert.innerHTML = accountContent.innerHTML;
               }
          }
     }
     catch (error) {
          alert(`something went wrong! \n${error}`);
     }
}

document.addEventListener ("DOMContentLoaded", function() {
     let ratio = 9/6;
     let getElements = getElementsHandler();
     let promiseAccountDOM = getPromiseDOM("../HTML/account.html"); 
     resizeImages(getElements.getImages(), ratio);
     resizeSmNav(getElements.getSubMenuNav());
     accountEvents(getElements, promiseAccountDOM);
})