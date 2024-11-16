'use strict'
import * as bridge from "./Bridge.js";
import * as fInterface from "./Interface.js";

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

     if (!buttons) return;
     buttons.forEach((btn) => {
          btn.addEventListener("click", bridge.throttle(() => {
               if (urlHandler("/order/history", docsURL))
                    renderDOMHandler("orderHistory");
          }, 200, "historyNav"));
     });
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

// slide handler with name that need to use slide's behavior
function slidesHandler(...names) {
     let parent, nameSlide;
     const elementsObj = bridge.default();

     // params is name of html need to use add behavior
     // default flag dots is "true" / add "else if" & change flag to "false" if not need dot 
     names.forEach((name) => {
          if (name.includes("news")) {
               parent = elementsObj.getNewsBlogs();
               nameSlide = (parent?.querySelector(".news-blogs-items"));

               if (nameSlide)
                    behaviorSlides(nameSlide, 3, true);
          }

     });
}

// get buttons and add behavior for slide
function behaviorSlides(nameSlide, showCount, haveDots) {
     let slidesIndex = 1;
     showCount = showCount ? showCount : 1; //check if showCount is falsy or not
     let parent = nameSlide.parentElement;
     let prevButtons = nameSlide.querySelector(".prev-btn");
     let nextButtons = nameSlide.querySelector(".next-btn");
     let container = nameSlide.children;
     // check if container is empty or not 
     if (container.length === 0) return;
     container = Array.from(container);

     // execute for dots and others if not found
     let limitParent = bridge.$("#main-content");
     while(parent !== limitParent && parent.parentElement !== limitParent) {
          parent = parent.parentElement;
     }
     // first call init for create dot
     fInterface.createDots(parent, showCount);

     let dots = (haveDots) ? parent.querySelectorAll(".dot") : null;
     // allow prev and next buttons find again with nearest parent when nearest parent is not main-content
     if (!prevButtons || !nextButtons) {
          if (!prevButtons)
               prevButtons = parent.querySelector(".prev-btn");

          if (!nextButtons)
               nextButtons = parent.querySelector(".next-btn");

          console.log(prevButtons);
          console.log(nextButtons);
     }

     if (nextButtons) {
          // increase 1 for slidesIndex when click next btn
          nextButtons.addEventListener("click", bridge.throttle(() => {
               if (++slidesIndex > container.length)
                    slidesIndex = 1;
               showSlides(container, dots, slidesIndex, showCount);
          }, 200, "nextBtn"));
     }

     if (prevButtons) {
          // decrease 1 for slidesIndex when click next btn
          prevButtons.addEventListener("click", bridge.throttle(() => {
               if (--slidesIndex < 1)
                    slidesIndex = container.length;
               showSlides(container, dots, slidesIndex, showCount);
          }, 200, "nextBtn"));
     }

     // resize handler for set active 
     window.addEventListener("resize", bridge.debounce(() => {
          fInterface.createDots(parent, showCount);
          dots = (haveDots) ? parent.querySelectorAll(".dot") : null;
          showSlides(container, dots, slidesIndex, showCount);
     }, 150, "activeItems"));

     // first call init for slide behaviors
     showSlides(container, dots, slidesIndex, showCount);
}

// slides active / hidden
function showSlides(slidesContainer, dots, slidesIndex, showCount) {
     let i, breakpoint = 46.1875 * 16;
     // check when screen is mobile or larger mobile for active elements nav
     if (window.innerWidth <= breakpoint)
          showCount = 1;

     // reset display slides
     for (i = 0; i < slidesContainer.length; i++)
          if (slidesContainer[i].classList.contains("active"))
               slidesContainer[i].classList.remove("active");

     if (dots && dots[0]) {
          // remove active dot 
          for (i = 0; i < dots.length; i++)
               if (dots[i].classList.contains("active"))
                    dots[i].classList.remove("active");

          // dots behavior
          i = Math.floor((slidesIndex - 1) / 3); //calc i for now index (case screen larger than mobile)

          if (window.innerWidth <= breakpoint)  //case for mobile screen
               i = slidesIndex - 1;
          dots[i].classList.add("active");

          // add event listener when click dots
          dots.forEach((dot, index) => {
               dot.addEventListener("click", bridge.throttle(() => {
                    if (!dot.classList.contains("active")) {
                         // after run code add active and codes below it showCount will decrease and equal 0
                         slidesIndex = 1  // set default slidesIndex = init value of slidesIndex
                         slidesIndex += showCount * index;
                         showSlides(slidesContainer, dots, slidesIndex, showCount);
                    }
               }, 200, "dotBehavior"));
          });
     }

     // add class active to show now items
     let tempCount = showCount;
     while (tempCount > 0) {
          if (slidesIndex > slidesContainer.length)
               slidesIndex = 1;
          slidesContainer[slidesIndex - 1].classList.add("active");
          slidesIndex++, tempCount--;
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
          //window.history.pushState({}, "", `${nowPath.slice(0, nowPath.lastIndexOf("/HTML/") + 6)}index.html`);
          if (urlHandler("/", nowPath))
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
     if (nameStaticPage === "top")
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
          scrollTopButtons.addEventListener("click", bridge.throttle(() => scrollToHandler("top"), 200, "ScrollTopBtn"));
     }

}

// funcs execute url
// func for popstate listener (it's will be very long)
function popStateHandler(pathsObj, docsURL) {
     const elementsObj = bridge.default();

     window.addEventListener("popstate",
          bridge.throttle((event) => {
               const currentPath = event.target.location.pathname;
               let path = currentPath.slice(docsURL.lastIndexOf("/HTML/") + 5, currentPath.length + 1);

               if (path.includes(".html"))
                    path = path.replace(".html", "");

               console.log("hello: " + (Math.random() * 100 + 1));
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
                              break;

                         case "/news/test":
                              renderDOMHandler("news");
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

     const pathsObj = bridge.pathNamesHandler();

     if (pathName[0] !== "/")
          pathName = `/${pathName}`;


     if (!pathsObj[pathName]) {
          alert("404 not found!");
          return false;
     }

     let newURL = `${docsURL.slice(0, docsURL.lastIndexOf("/HTML/") + 5)}${pathName}`;
     console.log(newURL);
     window.history.pushState({}, "", newURL);
     return true;
}

// DOM navigate handler (SPAs)
// func account's events handle
function accountEvents(elementsObj) {
     const docsURL = location.pathname;
     const loginButtons = elementsObj.getJsLoginBtn();
     const registerButtons = elementsObj.getJsRegisterBtn();
     const forgotButtons = elementsObj.getJsForgotBtn();

     loginButtons?.forEach((btn) => {
          btn.addEventListener("click", bridge.throttle(() => {
               if (urlHandler("/account/login", docsURL))
                    (renderDOMHandler("account", "login"));
          }, 200, "login"));
     });

     registerButtons?.forEach((btn) => {
          btn.addEventListener("click", bridge.throttle(() => {
               if (urlHandler("/account/register", docsURL))
                    renderDOMHandler("account", "register");
          }, 200, "register"));
     });

     forgotButtons?.forEach((btn) => {
          btn.addEventListener("click", bridge.throttle(() => {
               if (urlHandler("/account/forgot_password", docsURL))
                    renderDOMHandler("account", "forgotPassword");
          }, 200, "forgotPassword"));
     })
}

// render html specific DOM with required is name of DOM and option is requests
async function renderDOMHandler(nameDOM, ...requestRests) {
     const originPath = location.pathname.slice(0, location.pathname.lastIndexOf("/HTML/") + 5);
     try {
          const elementsObj = bridge.default();
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

          if (nameDOM === "homepage") {
               scriptDOM = await bridge.promiseDOMHandler(`${originPath}/index.html`);
               // call again some funcs
          }

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
          callAgain(elementsObj, "homepage");

     }
     catch (error) {
          alert("something went wrong!\n" + "Error type: " + error);
     }
}

function callAgain(elementsObj, ...names) {
     names.forEach((name) => {
          if (name === "homepage") {
               const checkBlog = setInterval(() => {
                    let newsContainer = elementsObj.getNewsBlogs();
                    let timeFS = elementsObj.getTimeFS();
                    if (newsContainer && timeFS) {
                         slidesHandler("news");
                         fInterface.setTimeFS(elementsObj);
                         clearInterval(checkBlog);
                    }
               }, 400);
          }     
     });

     cancelAction(elementsObj);
     accountEvents(elementsObj);
     staticContents(elementsObj);
     fInterface.formatPrices(elementsObj);
     fInterface.resizeImages(elementsObj);
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
     slidesHandler("news");
     popStateHandler(pathsObj, location.pathname);
})