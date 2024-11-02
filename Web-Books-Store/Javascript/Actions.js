'use strict'
import * as bridge from "./Bridge.js";
import * as fInterface from "./Interface.js";
// index for news slides

// funcs event
function cancelAction(elementsObj) {
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

function historyNavigate(elementsObj) {
     const docsURL = location.pathname;
     const buttons = elementsObj.getHistoryBtn();
     if (!buttons)
          return;
     buttons.forEach((btn) => {
          btn.addEventListener("click", bridge.throttle(() => {
               if (urlHandler("/order/history", docsURL))
                    renderDOMHandler("orderHistory");
          }, 200, "historyNav"));
     });
}

// get buttons and add behavior for slide
function slidesNews(elementsObj) {
     let slidesIndex = 1;
     const blockNews = elementsObj.getNewsBlogs();
     const navButtons = blockNews.querySelector(".nav-btn");
     const prevButtons = blockNews.querySelector(".prev-btn");
     const nextButtons = blockNews.querySelector(".next-btn");
     let container = (blockNews.querySelector(".news-blogs-items")).children;
     container = Array.from(container);

     if (!navButtons || !prevButtons || !nextButtons) {
          alert("not found button!");
          return false;
     }

     // increase 1 for slidesIndex when click next btn
     nextButtons.addEventListener("click", bridge.throttle(() => {
          if (++slidesIndex > container.length)
               slidesIndex = 1;
          showSlides(container, slidesIndex, 3);
     }, 200, "nextBtn"));
     
     // decrease 1 for slidesIndex when click next btn
     prevButtons.addEventListener("click", bridge.throttle(() => {
          if(--slidesIndex < 1)
               slidesIndex = container.length;
          showSlides(container, slidesIndex, 3);
     }, 200, "nextBtn"));

     // resize handler for set active 
     window.addEventListener("resize", bridge.throttle(() => {
          showSlides(container, slidesIndex, 3);
     }, 300, "activeItems"));
     showSlides(container, slidesIndex, 3);
}

// slides active / hidden
function showSlides(slidesContainer, slidesIndex, showCount) {
     let i, breakpoint = 46.1875 * 16;
     const elementsObj = bridge.default();
     const dots = (elementsObj.getNewsBlogs()).querySelectorAll(".dot");    

     // reset display slides
     for (i = 0; i < slidesContainer.length; i++) {
          if (slidesContainer[i].classList.contains("active"))
               slidesContainer[i].classList.remove("active");
     }

     if (dots && dots[0]) {
          for (i = 0; i < dots.length; i++)
               if (dots[i].classList.contains("active"))
                    dots[i].classList.remove("active");

          // dots behavior
          console.log("97 before: " + slidesIndex);
          i = 0;
          i = Math.floor((slidesIndex - 1) / 3);
          dots[i].classList.add("active");
          console.log("101 after: " + slidesIndex);

          dots.forEach((dot, index) => {
               dot.addEventListener("click", bridge.throttle(() => {
                    if (!dot.classList.contains("active")) {
                         showCount = 3;
                         if (slidesIndex > slidesContainer.length)
                              slidesIndex = 1;

                         console.log("110 now: " + slidesIndex);
                         slidesIndex += index;
                         showSlides (slidesContainer, slidesIndex, showCount);
                    }
               }, 200, "dotBehavior"));
          });
     }

     // add active class for show items
     if (window.innerWidth <= breakpoint)
          showCount = 1;

     // add class active to show now items
     while (showCount > 0) {
          if (slidesIndex > slidesContainer.length) {
               slidesIndex = 1;
               console.warn("inner while and if: " + slidesIndex);
          }
          console.log("128: index slide show: " + (slidesIndex - 1));
          slidesContainer[slidesIndex - 1].classList.add("active");
          slidesIndex++, showCount--;

          console.log("131: slides after: " + slidesIndex);
     }
}

// handle scrolls
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
                    clearInterval(checkBlog);
               }
          }, 600);
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

// func for click nav btn on sub header or click to scroll top btn
function staticContents(elementsObj) {
     const newsButtons = elementsObj.getNewsBtn();
     const scrollTopButtons = elementsObj.getScrollTop();
     const servicesButtons = elementsObj.getServicesBtn();

     // add event listener
     if (newsButtons) {
          newsButtons.forEach((btn) => {
               btn.addEventListener("click", bridge.throttle(() => scrollToHandler("news"), 200, "newsBtn"));
          });
     }

     if (servicesButtons) {
          servicesButtons.forEach((btn) => {
               btn.addEventListener("click", bridge.throttle(() => scrollToHandler("services"), 200, "servicesBtn"));
          });
     }

     if (scrollTopButtons) {
          scrollTopButtons.addEventListener("click", bridge.throttle(() => scrollToHandler("scrollTop"), 200, "ScrollTopBtn"));
     }

}

// funcs execute url
// func for popstate listener (it's will be very long)
function popStateHandler(pathsObj, docsURL) {
     window.addEventListener("popstate",
          bridge.throttle((event) => {
               const currentPath = event.target.location.pathname;
               let path = currentPath.slice(docsURL.lastIndexOf("/HTML/") + 5, currentPath.length + 1);
               if (path.includes(".html"))
                    path = path.replace(".html", "");
               // execute DOM with specific path
               if (pathsObj[path]) {
                    switch (path) {
                         case "/account/":
                         case "/account/login":
                         case "/account/register":
                         case "/account/forgot_password":

                              if (path === "/account/")
                                   path = "/account/login";
                              renderDOMHandler("account", `${path.slice(path.lastIndexOf("/") + 1, path.length + 1)}`);
                              break;

                         case "/order/":
                         case "/order/status":
                         case "/order/history":

                              if (path === "/order/status" || path === "/order/")
                                   renderDOMHandler("orderStatus");
                              else
                                   renderDOMHandler("orderHistory");
                              break;

                         case "/":
                         case "/index":
                              renderDOMHandler("homepage");
                              fInterface.setTimeFS(elementsObj);
                              break;

                         case "/header_footer/footer":
                         case "/header_footer/header":

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
function checkActiveHTML(nameForm, ...restForms) {
     restForms.forEach((form) => {
          if (form.classList.contains("active"))
               form.classList.remove("active");
     });

     if (!nameForm.classList.contains("active"))
          nameForm.classList.add("active");
     return nameForm;
}

// DOM navigate handler (SPA)
// func account's events handle
function accountEvents(elementsObj) {
     const docsURL = location.pathname;
     const loginButtons = elementsObj.getJsLoginBtn();
     const registerButtons = elementsObj.getJsRegisterBtn();
     const forgotButtons = elementsObj.getJsForgotBtn();

     if (!loginButtons || !registerButtons || !forgotButtons)
          return false;

     loginButtons.forEach((btn) => {
          btn.addEventListener("click", bridge.throttle(() => {
               if (urlHandler("/account/login", docsURL))
                    (renderDOMHandler("account", "login"));
          }, 200, "login"));
     });

     registerButtons.forEach((btn) => {
          btn.addEventListener("click", bridge.throttle(() => {
               if (urlHandler("/account/register", docsURL))
                    renderDOMHandler("account", "register");
          }, 200, "register"));
     });

     forgotButtons.forEach((btn) => {
          btn.addEventListener("click", bridge.throttle(() => {
               if (urlHandler("/account/forgot_password", docsURL))
                    renderDOMHandler("account", "forgotPassword");
          }, 200, "forgotPassword"));
     })
}

// render html DOM
async function renderDOMHandler(nameDOM, ...requestRests) {
     try {
          const elementsObj = bridge.default();
          const originPath = location.pathname.slice(0, location.pathname.lastIndexOf("/HTML/") + 5);
          const webContent = elementsObj.getWebContent();
          const mainContainer = elementsObj.getMainContainer();

          if (!webContent || !mainContainer)
               return false;

          // set default request when name of DOM is account
          if (nameDOM === "account" && !requestRests) {
               let loginStatus = localStorage.getItem("loginStatus");
               if (!loginStatus)
                    requestRests = "login";
          }

          // set await promise DOM
          let scriptDOM, request;

          if (nameDOM === "account") {
               for (request of requestRests)
                    // validate request is one of these types or not
                    if (request === "login" || request === "register" || request === "forgotPassword") {
                         if (request === "forgotPassword")
                              request = "forgot_password";

                         scriptDOM = await bridge.promiseDOMHandler(`${originPath}/account/${request}.html`);
                         break;
                    }
                    else
                         throw new Error(`invalid request: ${request}\ntry again with request type 
                                             "login", "register", "forgotPassword" for account DOM`);
          }

          if (nameDOM === "homepage")
               scriptDOM = await bridge.promiseDOMHandler(`${originPath}/index.html`);

          if (nameDOM === "orderStatus" || nameDOM === "orderHistory") {
               nameDOM = (nameDOM.replace("order", "")).toLowerCase();
               scriptDOM = await bridge.promiseDOMHandler(`${originPath}/order/${nameDOM}.html`);
          }

          // error if script DOM is invalid
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
          bridge.$("title").innerText = title.innerText;
          placeInsert.innerHTML = content.innerHTML;
          webContent.scrollIntoView({ behavior: "instant", block: "start", inline: "nearest" });

          // call some functions again after render DOM
          cancelAction(elementsObj);
          accountEvents(elementsObj);
          staticContents(elementsObj);
          fInterface.formatPrices(elementsObj);
          fInterface.resizeImages(elementsObj);
     }
     catch (error) {
          alert("something went wrong!\n" + "Error type: " + error + "\nwe will navigate you to homepage!");
          window.history.pushState({}, "", `${originPath}/index.html`);
          renderDOMHandler("homepage");
     }
}

document.addEventListener("DOMContentLoaded", () => {
     let elementsObj = bridge.default();
     const pathsObj = bridge.pathNamesHandler();

     // check DOM of header, sub header and footer
     const checkDOM = setInterval(() => {
          if (elementsObj.getHeader() && elementsObj.getSubHeader() && elementsObj.getFooter()) {
               // call funcs
               accountEvents(elementsObj);
               staticContents(elementsObj);
               historyNavigate(elementsObj);
               returnHomepage(elementsObj, location.pathname);
               // remove Interval 
               clearInterval(checkDOM);
          }
     }, 200);

     // call funcs
     cancelAction(elementsObj);
     slidesNews(elementsObj);
     popStateHandler(pathsObj, location.pathname);
})