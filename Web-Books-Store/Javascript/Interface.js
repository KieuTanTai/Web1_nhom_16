'use strict'
import * as bridge from "./Bridge.js";

// format prices from default to vi-VN format
function formatPrices(elementsObj) {
     const pricesContainer = elementsObj.getElementPrices();
     if (pricesContainer) {
          const formatPricesHandler = new Intl.NumberFormat("vi-VN",{ style: "currency", currency: "VND", minimumSignificantDigits: "3" });
          pricesContainer.forEach((element) => {
               element.innerText = formatPricesHandler.format(element.innerText);
          });
     }
}

// create Dots
function createDots(parent, totalDots) {
     let dotCount = 0, breakpoint = 46.1875 * 16;
     let container = parent.querySelector(".nav-tab-container");
     let childInners = Array.from(container?.children);
     let dotBar = parent.querySelector(".dots-bar");
     
     if (window.innerWidth <= breakpoint)
          dotCount = childInners.length;
     else 
          dotCount = Math.ceil(childInners.length / totalDots);

     if (dotBar) {
          dotBar.innerHTML = ""; 
          if (dotCount === 1) return;

          for (let i = 0; i < dotCount; i++) {
               let dot = document.createElement("div");

               if (i == 0)
                    dot.classList.add("active");
               dot.classList.add("dot");
               dotBar.appendChild(dot);
          }
     }
}

//change DOM on categories if it not have any product inside
function categoryIsEmpty() {
     bridge.default().getCategories().forEach((category) => {
          const container = category.querySelector(".product-container");
          if ((container.childNodes).length === 0) {
               container.innerHTML = "<div class=\"s-m-hidden font-size-26 font-bold\">Không có sản phẩm trong phần này</div>";
               container.classList.add("flex", "full-height", "align-center", "justify-center");
               (container.querySelector(".nav-btn"))?.classList.add("disable");
               (container.querySelector(".category-btn"))?.classList.add("disable");
               container.style.color = "unset";
          }
     })
} 

// active flash sale event
function activeFlashSale () {
     const date = new Date();
     localStorage.setItem("flashSaleTime", date.toLocaleTimeString("it-IT"));
     return localStorage.getItem("flashSaleTime");
}

// funcs for count down time flash sale events
function setTimeFS(elementsObj) {
     let countDown = elementsObj.getFSCountDown();
     let fSTime = elementsObj.getTimeFS();

     if (countDown && fSTime) {
          let stringTime = localStorage.getItem("flashSaleTime");
          fSTime = Array.from(fSTime.children);

          if (!stringTime)
               stringTime = activeFlashSale();

          if (stringTime.includes("-"))
               stringTime = activeFlashSale();

          if (stringTime === "00:00:00") {
               localStorage.removeItem("flashSaleTime");
               let timeCount = bridge.$(".fs-countdown");
               timeCount.innerHTML = "<p class=\"s-m-hidden padding-right-8 font-size-20 font-bold\">Đã hết hạn</p>"
          }
          
          let index = 0;
          let timeArray = [];
          stringTime = stringTime.split(":");
          fSTime.forEach((time) => {
               if (time.classList.contains("fs-number")) {
                    time.innerText = stringTime[index];
                    timeArray.push(time);
                    index++;
               }
          });
          startCountDown(timeArray, elementsObj);
     }

}

async function startCountDown(timeArray, elementsObj) {
     try {
          window.addEventListener("beforeunload", () => {
               console.log(`${timeArray[0].innerText}:${timeArray[1].innerText}:${timeArray[2].innerText}`);
               localStorage.setItem("flashSaleTime",
                    `${timeArray[0].innerText}:${timeArray[1].innerText}:${timeArray[2].innerText}`);
          });

          if (timeArray[2].innerText !== "00")
               timeArray[2].innerText = await countDown(timeArray[2], "seconds");

          if (timeArray[2].innerText === "00" && timeArray[1].innerText !== "00") {
               timeArray[2].innerText = "60";
               timeArray[1].innerText = await countDown(timeArray[1], "minutes");
          }
          else if (timeArray[2].innerText === "00" && timeArray[1].innerText === "00" && timeArray[0].innerText !== "00") {
               timeArray[1].innerText = "60";
               timeArray[0].innerText = await countDown(timeArray[0], "minutes");
          }

          if (timeArray[2].innerText !== "00" || timeArray[1].innerText !== "00" || timeArray[0].innerText !== "00")
               startCountDown(timeArray);
          else {
               const fSTable = elementsObj.getFSTable();
               if (!fSTable)  
                    throw new Error ("not found flash sale product!");
               categoryIsEmpty();

          }
     }
     catch (error) {
          alert(error);
     }
}

function countDown(timeHandler, typeTime) {
     return new Promise((resolve, reject) => {
          if (!timeHandler || isNaN(parseInt(timeHandler.innerText)) || parseInt(timeHandler.innerText) <= 0)
               reject(new Error("invalid time!"));

          const timeLength = timeHandler.innerText;

          if (typeTime === "seconds") {
               for (let i = 0; i < timeLength; i++) {
                    setTimeout(() => {
                         let currentTime = parseInt(timeHandler.innerText);
                         timeHandler.innerText = (--currentTime).toString().padStart(2, '0');
                         if (timeHandler.innerText === "00")
                              resolve(timeHandler.innerText);
                    }, 1000 * i);
               }
          }
          else if (typeTime === "minutes" || typeTime === "hours") {
               let currentTime = parseInt(timeHandler.innerText);
               timeHandler.innerText = (--currentTime).toString().padStart(2, '0');
               resolve(timeHandler.innerText);
          }
          else
               reject(new Error("error time!"));
     });
}

// fix bug interface func
// resize image
function resizeImages(elementsObj) {
     const ratio = 333.5 / 216;
     const productImages = elementsObj.getImages();

     if (!productImages) {
          alert("not found any image!");
          return false;
     }
     productImages.forEach((image) => {
          image.addEventListener("load", () => {
               let imageWidth = image.offsetWidth;
               image.style.height = (ratio * imageWidth) + "px";
          });

          if (image && !image.getAttribute("style")) {
               let imageWidth = image.offsetWidth;
               image.style.height = (ratio * imageWidth) + "px";
          }
     });
     window.addEventListener("resize", () => {
          productImages.forEach((image) => {
               let imageWidth = image.offsetWidth;
               image.style.height = (ratio * imageWidth) + "px";
          });
     });
}

// resize width of nav
function resizeSmNav(elementsObj) {
     const subMenuNav = elementsObj.getSubMenuNav();

     if (!subMenuNav) {
          alert("not found nav!");
          return false;
     }

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

// default add header footer
async function addDOMHeader(elementsObj) {
     try {
          const headerDOM = await bridge.promiseDOMHandler("/Web-Books-Store/HTML/header_footer/header.html");
          const header = headerDOM.getElementById("header-container");
          const subHeader = headerDOM.getElementById("sub-header");
          let placeInsert = elementsObj.getMainContainer();
          const webContent = elementsObj.getWebContent();

          // add elements into DOM
          webContent.before(header);
          placeInsert.insertAdjacentElement('afterbegin', subHeader);
     }
     catch (error) {
          alert(error);
     }
}

async function addDOMFooter(elementsObj) {
     try {
          const footerDOM = await bridge.promiseDOMHandler("/Web-Books-Store/HTML/header_footer/footer.html");
          const footer = footerDOM.getElementById("footer-container");
          const webContent = elementsObj.getWebContent();

          // add elements into DOM
          webContent.after(footer);
     }
     catch (error) {
          alert(error);
     }
}

document.addEventListener("DOMContentLoaded", function () {
     const elementsObj = bridge.default();

     //create check DOM of Header and Footer
     addDOMHeader(elementsObj);
     addDOMFooter(elementsObj);
     const checkDOM = setInterval(() => {
          if (elementsObj.getHeader() && elementsObj.getSubHeader() && elementsObj.getFooter()) {
               // call funcs
               resizeSmNav(elementsObj);
               // remove Interval
               clearInterval(checkDOM);
          }
     }, 200);

     // call funcs
     setTimeFS(elementsObj);
     categoryIsEmpty();
     // formatPrices(elementsObj);
     // resizeImages(elementsObj);
})

export { formatPrices, setTimeFS, resizeImages, createDots};