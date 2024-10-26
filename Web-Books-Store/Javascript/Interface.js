'use strict'
import * as bridge from "./Bridge.js";

function formatPrices (elementsObj) {
     const pricesContainer = elementsObj.getElementPrices();
     if (pricesContainer) {
          const formatPricesHandler = new Intl.NumberFormat("vi-VN", {style: "currency" ,currency: "VND", minimumSignificantDigits: "3"});
          pricesContainer.forEach ((element) => {
               element.innerText = formatPricesHandler.format(element.innerText);
          });
     }
}

// functions for count down time flash sale events
function setTimeFS (elementsObj) {
     let fSTime = elementsObj.getTimeFS(); 
     if (fSTime) {
          let testDate = new Date();
          let stringTime = localStorage.getItem("flashSaleTime"); 
          fSTime = Array.from(elementsObj.getTimeFS().children);
          if (!stringTime)
               localStorage.setItem("flashSaleTime", testDate.toLocaleTimeString("vi-VN"));
          else {
               let index = 0;
               let timeArray = [];
               stringTime = stringTime.split(":");
               fSTime.forEach ((time) => {
                    if (time.classList.contains("fs-number")) {
                         time.innerText = stringTime[index];
                         timeArray.push(time);
                         index++;
                    }                    
               });
               startCountDown(timeArray, elementsObj);
          }
     } 

}

async function startCountDown (timeArray, elementsObj) {
     try {
          window.addEventListener ("beforeunload", (e) => {
               localStorage.setItem("flashSaleTime", `${timeArray[0].innerText}:${timeArray[1].innerText}:${timeArray[2].innerText}`);
          }) ;

          if (timeArray[2].innerText !== "0" ) {
               timeArray[2].innerText = await countDown(timeArray[2], "seconds");
          }

          if (timeArray[2].innerText === "0" && timeArray[1].innerText !== "0") {
               timeArray[2].innerText = "60";
               timeArray[1].innerText = await countDown (timeArray[1], "minutes");
          }
          else if (timeArray[2].innerText === "0" && timeArray[1].innerText === "0" && timeArray[0].innerText !== "0") {
               timeArray[1].innerText = "60";
               timeArray[0].innerText = await countDown (timeArray[0], "minutes");
          }

          if (timeArray[2].innerText !== "0" || timeArray[1].innerText !== "0" || timeArray[0].innerText !== "0")
               startCountDown (timeArray);
          else {
               const fSTable = elementsObj.getFSTable(); 
               if (!fSTable) {
                    alert("not found flash sale product!");
                    return;
               }
               fSTable.classList.add("disable");
          }
     } catch (error) {
          alert(error);               
     }
}

function countDown (timeHandler, typeTime) {
     if (typeTime === "seconds")
          return new Promise ((resolve, reject) => {
               if (timeHandler <= 0)
                    reject(timeHandler.innerText);
               const timeLength = timeHandler.innerText;
               for (let i = 0; i < timeLength; i++) {
                    setTimeout (()=> {
                         timeHandler.innerText-- ;
                         if (timeHandler.innerText === "0")
                              resolve(timeHandler.innerText);
                    }, 1000 * i);
               }
          });

     if (typeTime === "minutes" || typeTime === "hours")
          return new Promise ((resolve, reject) => {
               if (timeHandler <= 0)
                    reject(timeHandler.innerText);
               timeHandler.innerText-- ;
               resolve(timeHandler.innerText);
          });
}

// fix bug interface function
// resize image
function resizeImages (elementsObj, ratio) {
     const productImages = elementsObj.getImages();
     if (!productImages) {
          alert("not found any image!");
          return;
     }

     productImages.forEach((image) => {
          image.addEventListener("load", () => {
               image.style.height = (ratio * image.offsetWidth) + "px";
          });
     });

     window.addEventListener("resize", () => {
          productImages.forEach((image) => {
               image.style.height = (ratio * image.offsetWidth) + "px";
          });
     });
}

// resize width of nav
function resizeSmNav (elementsObj) {
     const subMenuNav = elementsObj.getSubMenuNav();
     if (!subMenuNav) {
          alert ("not found nav!");
          return;
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
async function addDOMHeader (elementsObj) {
     try {
          const headerDOM = await bridge.promiseDOMHandler("/Web-Books-Store/HTML/Header_Footer/header.html");
          const header = headerDOM.getElementById("header-container");
          const subHeader = headerDOM.getElementById("sub-header");
          let placeInsert = elementsObj.getMainContainer();
          const webContent = elementsObj.getWebContent();

          webContent.before(header);
          placeInsert.insertAdjacentElement('afterbegin' , subHeader);
     }
     catch (error) {
          alert(error);
     }
}

async function addDOMFooter (elementsObj) {
     try {
          const footerDOM = await bridge.promiseDOMHandler("/Web-Books-Store/HTML/Header_Footer/footer.html");
          const footer = footerDOM.getElementById("footer-container");
          const webContent = elementsObj.getWebContent();

          webContent.after(footer);
     }
     catch (error) {
          alert(error);
     }
}

document.addEventListener ("DOMContentLoaded", function () {
     const ratio = 9 / 6;
     const elementsObj = bridge.default();

     //create check DOM of Header and Footer
     addDOMHeader(elementsObj);
     addDOMFooter(elementsObj);    
     const checkDOM = setInterval(() => {
          if (elementsObj.getHeader() && elementsObj.getSubHeader() && elementsObj.getFooter()) {
               resizeSmNav(elementsObj);
               clearInterval(checkDOM);
          }
     }, 200);     

     setTimeFS(elementsObj);
     formatPrices(elementsObj);
     resizeImages(elementsObj, ratio);
})