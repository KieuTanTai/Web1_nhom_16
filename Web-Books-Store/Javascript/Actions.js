"use strict";
import * as Bridge from "./Bridge.js";
import { disableSiblingContainer, fakeOverlay, headerUserInfo, hiddenException, scrollView } from "./Interface.js";
import { sleep } from "./Navigate.js";


function returnHomepage(elementsObj) {
  let testURL = location.pathname;
  const webLogo = elementsObj.getWebLogo();
  let homepageBtns = elementsObj.getHomepageBtn();
  testURL = testURL.slice(testURL.lastIndexOf("/") + 1, testURL.indexOf("?") + 1);

  homepageBtns?.forEach((btn) => btn.addEventListener("click", () => Bridge.navigateRootURL()))
  webLogo?.forEach((element) => element.addEventListener("click", () => {
    if (!testURL.includes("index"))
      Bridge.navigateRootURL();
  }));
}

// header navigation button on mobile
function smNavigationMenu(elementsObj) {
  let navigateBtn = elementsObj.getMobileNavigate();
  navigateBtn.addEventListener("click", Bridge.debounce((event) => {
    let overlay = navigateBtn.querySelector(".overlay");
    overlay.classList.add("active");
    overlay.classList.remove("overflowText");
    overlay.classList.add("menu");
    if (event.target.classList.contains("overlay")) {
      setTimeout(() => overlay.classList.remove("active"), 200);
      overlay.classList.remove("menu");
      overlay.classList.add("overflowText");
    }
  }), 200, "mobileHeaderNavigate");
}

function cancelButtons(elementsObj) {
  let loginForm = Bridge.$("#login");
  let forgotForm = Bridge.$("#forgot-password");
  const cancelBtn = elementsObj.getJsCancelBtn();
  if (cancelBtn)
    cancelBtn.forEach((btn) => btn.addEventListener("click", () => {
      loginForm?.classList.add("active");
      forgotForm?.classList.contains("active") ? forgotForm.classList.remove("active") : forgotForm;
    }));
}

// navigate to order-tracking
function trackingNavigate(elementsObj) {
  // navigate to index.html if not have any container
  const buttons = elementsObj.getOrderTrackingBtn();
  if (!buttons) return;
  const trackers = localStorage.getItem("pay");
  buttons.forEach((btn) => btn.addEventListener("click", Bridge.throttle(() => showTracking(trackers), 200, "statusNav")));
}

function showTracking(trackers) {
  const elementsObj = Bridge.default();
  const container = elementsObj.getStatusContainer();
  const blankOrder = container?.querySelector("#blank-order");
  const customerOrder = container?.querySelector("#customer-order");
  // navigate to index.html if not have any container
  if (!container) {
    sessionStorage.setItem("retryTracking", "true");
    Bridge.navigateRootURL();
  }

  hiddenException("order-content");
  disableSiblingContainer(elementsObj.getOrderContent());
  (elementsObj.getStatusContainer())?.classList.remove("disable");
  if (!trackers || !sessionStorage.getItem("hasLogin")) {
    blankOrder.classList.add("active");
    customerOrder.classList.contains("active") ? customerOrder.classList.remove("active") : customerOrder;
  }
  else {
    customerOrder.classList.add("active");
    blankOrder.classList.contains("active") ? blankOrder.classList.remove("active") : blankOrder;
  }
}

// navigate to history tracking
function historyNavigate(elementsObj) {
  let historyBtn = elementsObj.getHistoryBtn();
  historyBtn.forEach((btn) => btn.addEventListener("click", showOrderContent));
}

function showOrderContent() {
  let elementsObj = Bridge.default();
  let historyContainer = elementsObj.getHistoryOrder();
  let lists = localStorage.getItem("hadBought");
  hiddenException("order-content");
  disableSiblingContainer(elementsObj.getOrderContent());
  if (!lists) {
    let orderContainer = elementsObj.getOrderContent();
    orderContainer = elementsObj.getOrderContent();
    // navigate to index.html if not have any container
    if (!orderContainer) {
      sessionStorage.setItem("retryShowOrder", "true");
      Bridge.navigateRootURL();
    }
    let statusContainer = orderContainer.querySelector(".order-status-container");
    disableSiblingContainer(statusContainer);

    (orderContainer)?.classList.remove("disable");
    (statusContainer)?.classList.remove("disable");
    (elementsObj.getBlankOrder()).classList.add("active");
    return;
  }

  (elementsObj.getHistoryContainer())?.classList.remove("disable");
  historyContainer.classList.add("active");
}

// set quantity box on detail product
function setQuantityBox(elementsObj) {
  let reduceBtn = elementsObj.getQuantityBox().querySelector("input[type=button].reduce");
  let increaseBtn = elementsObj.getQuantityBox().querySelector("input[type=button].increase");
  let quantity = elementsObj.getQuantityBox().querySelector("input[type=text]#quantity");
  let productID = Bridge.$(".product-id")?.innerHTML;
  let realQuantity = Array.from(JSON.parse(localStorage.getItem("products"))).find((product) => product.productID === productID)?.quantity;

  reduceBtn.addEventListener("click", () => quantity.value = parseInt(quantity.value) - 1 <= 0 ? 1 : parseInt(quantity.value) - 1);
  increaseBtn.addEventListener("click", () => quantity.value = parseInt(quantity.value) + 1 <= realQuantity ? parseInt(quantity.value) + 1 : realQuantity);
  quantity.addEventListener("change", () => quantity.value = parseInt(quantity.value) > realQuantity ? realQuantity : parseInt(quantity.value));
}

// handle scrolls
function scrollToHandler(nameStaticPage) {
  let staticPage;
  const elementsObj = Bridge.default();

  if (nameStaticPage === "news") {
    staticPage = elementsObj.getNewsBlogs();
    hiddenException();
  }

  if (nameStaticPage === "services")
    staticPage = elementsObj.getFooter();
  else if (!staticPage && nameStaticPage === "services") {
    alert("not found services!");
    return false;
  }

  // check if action is scroll to top or not
  if (nameStaticPage === "top")
    window.scroll({ top: 0, left: 0, behavior: "smooth" });

  else if (staticPage)
    window.scroll({ top: staticPage.offsetTop + 3 * 16, left: 0, behavior: "smooth" });

  // check if action is scroll to top or not
  if (nameStaticPage === "top")
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  else if (staticPage)
    window.scroll({
      top: staticPage.offsetTop + 3 * 16,
      left: 0,
      behavior: "smooth",
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
      btn.addEventListener("click", Bridge.throttle(() => scrollToHandler("news"), 200, "newsBtn")
      );
    });
  }

  if (servicesButtons) {
    servicesButtons.forEach((btn) => {
      btn.addEventListener("click", Bridge.throttle(() => scrollToHandler("services"), 200, "servicesBtn"));
    });
  }

  if (scrollTopButtons) {
    scrollTopButtons.addEventListener("click", Bridge.throttle(() => scrollToHandler("top"), 200, "ScrollTopBtn"));
  }
}

// DOM navigate handler (SPAs)
// func account's events handle
function accountEvents(elementsObj) {
  const loginButtons = elementsObj.getJsLoginBtn();
  let loginForm = Bridge.$("#login");
  const registerButtons = elementsObj.getJsRegisterBtn();
  let registForm = Bridge.$("#register");
  const forgotButtons = elementsObj.getJsForgotBtn();
  let forgotForm = Bridge.$("#forgot-password");
  const signoutButtons = elementsObj.getJsSignoutBtn();

  loginButtons?.forEach((btn) =>
    btn.addEventListener("click", Bridge.throttle(() => showLogin(loginForm, registForm, forgotForm), 200, "login")));

  registerButtons?.forEach((btn) =>
    btn.addEventListener("click", Bridge.throttle(() => showRegister(loginForm, registForm, forgotForm), 200, "register")));

  forgotButtons?.forEach((btn) => 
    btn.addEventListener("click", Bridge.throttle(() => showForgotPassword(loginForm, registForm, forgotForm), 200, "forgotPassword")));

  signoutButtons?.forEach((btn) => 
    btn.addEventListener("click", Bridge.throttle(() => singoutAccount(elementsObj), 200, "signout")));
}

// for login 
function showLogin(loginForm, registForm, forgotForm) {
  hiddenException("account-content");
      if (!loginForm) {
        sessionStorage.setItem("login", "true");
        Bridge.navigateRootURL();
      }
      loginForm?.classList.add("active");
      registForm?.classList.contains("active") ? registForm.classList.remove("active") : registForm;
      forgotForm?.classList.contains("active") ? forgotForm.classList.remove("active") : forgotForm;
      scrollView();
}

// for register
function showRegister(loginForm, registForm, forgotForm) {
  hiddenException("account-content");
  if (!registForm) {
    sessionStorage.setItem("register", "true");
    Bridge.navigateRootURL();
  }
  registForm?.classList.add("active");
  loginForm?.classList.contains("active") ? loginForm.classList.remove("active") : loginForm;
  forgotForm?.classList.contains("active") ? forgotForm.classList.remove("active") : forgotForm;
  scrollView();
}

// for show forgot password 
function showForgotPassword(loginForm, registForm, forgotForm) {
  if (!registForm) {
    sessionStorage.setItem("forgotPassword", "true");
    Bridge.navigateRootURL();
  }
  hiddenException("account-content");
  forgotForm?.classList.add("active");
  loginForm?.classList.contains("active") ? loginForm.classList.remove("active") : loginForm;
  registForm?.classList.contains("active") ? registForm.classList.remove("active") : registForm;
  scrollView();
}

// for signout account
function singoutAccount(elementsObj) {
  sessionStorage.removeItem("hasLogin");
  sessionStorage.removeItem("hasLoginAccount");
  headerUserInfo(elementsObj);
  Bridge.navigateRootURL();
}

export { cancelButtons, accountEvents, staticContents, historyNavigate, setQuantityBox, returnHomepage, trackingNavigate, smNavigationMenu }
export { showOrderContent, showTracking, showLogin, showRegister, showForgotPassword }
