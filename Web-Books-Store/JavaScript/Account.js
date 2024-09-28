'use strict'
// get DOM Elements
function getMainContainer() {
     let mainContainer = document.getElementById("main-content");
     return mainContainer;
}
function getScripts () {
     let scriptsHTML = async function showAccountFormHandler() {
          let accountHTML = "../HTML/account.html"; 
          try {
               const response = await fetch(accountHTML);
               const responseText = await response.text();
               const parserHTML = new DOMParser();
               const containerScripts = parserHTML.parseFromString(responseText, "text/html");
               const getFormScripts = containerScripts.body.querySelector("#main-container");
               return getFormScripts;
               // customer choses 
          } catch (error) {
               console.error(error);
          }
     }
     return scriptsHTML();
}

// window function 
function scrollToHeader() {
     window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
     })
}


// change show or hide login form / signup form
function showHideForm(containerScripts, option) {
     const loginScripts =  containerScripts.querySelector("#login");
     const signupScripts = containerScripts.querySelector("#signup");
     if(option) {
          if(signupScripts.classList.contains("active")) {
               signupScripts.classList.remove("active");
               loginScripts.classList.add("active");
          }
          else 
               loginScripts.classList.add("active");
     }
     else {
          if(loginScripts.classList.contains("active")) {
               loginScripts.classList.remove("active");
               signupScripts.classList.add("active");
          }
          else
               signupScripts.classList.add("active");
     }
}

// overwrite scripts with link btn
function buttonShowForm(mainContainer, scriptsHandler) {
     let lnwBtn = document.querySelectorAll("button.lnw-btn"); 
     try {
          lnwBtn.forEach((btnClicked) => {
               btnClicked.addEventListener("click", () => {
                    if (btnClicked.classList.contains("js-login")) {
                         showHideForm(scriptsHandler, true);
                    }
                    else if (btnClicked.classList.contains("js-signup")) { 
                         showHideForm(scriptsHandler, false);
                    }
                    mainContainer.innerHTML = scriptsHandler.innerHTML;
                    linkChangeForm(mainContainer, scriptsHandler);
                    scrollToHeader();
               })
          })
     } catch(error) {
          window.alert(error);
     }
}

function linkChangeForm(mainContainer, getFormScripts) {
     let links = document.querySelectorAll("a");
     let linkLoginForm;
     let linkSignupForm;
     try {
          links.forEach((link) => {
               if (link.href.match("#login"))
                    linkLoginForm = link;
               if(link.href.match("#signup"))
                    linkSignupForm = link;
          })
          // have account ?
          linkLoginForm.addEventListener("click", (event) => {
               showHideForm(getFormScripts, true);
               mainContainer.innerHTML = getFormScripts.innerHTML;
               window.setTimeout(() => {
                    scrollToHeader();
                    linkChangeForm(mainContainer, getFormScripts);
               }, 10);
          })
     
          // don't have account ?
          linkSignupForm.addEventListener("click", (event) => {
               showHideForm(getFormScripts, false);
               mainContainer.innerHTML = getFormScripts.innerHTML;
               window.setTimeout(() => {
                    scrollToHeader();
                    linkChangeForm(mainContainer, getFormScripts);
               }, 10);
          })          
     } catch (error) {
          window.alert(error);
     }
}

// overwrite scripts with hash
const hashChange = document.addEventListener("DOMContentLoaded", () => {})
function hashChangeForm(mainContainer, getFormScripts, hashLocation) {
     try {
          window.addEventListener("hashchange", () => {

          })
     } catch (error) {
          window.alert(error);
     }
}




// DOM LOADED
document.addEventListener ("DOMContentLoaded", function() {
     let mainContainerScripts = getMainContainer();
     let scriptsHandler = getScripts();
     scriptsHandler.then((scripts) => {
          buttonShowForm(mainContainerScripts, scripts);
     })
})



