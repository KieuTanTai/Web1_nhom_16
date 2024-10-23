'use strict'
import {query, queryAll} from "./Bridge.js";
import getElementsHandler from "./Bridge.js";

function getElementPrices () {
     return queryAll(".price");
} 

function getTimeFS () {
     return query(".fs-time");
}

function formatPrices (pricesContainer) {
     const formatPricesHandler = new Intl.NumberFormat("vi-VN", {style: "currency" ,currency: "VND", minimumSignificantDigits: "3"});
     pricesContainer.forEach ((element) => {
          element.innerText = formatPricesHandler.format(element.innerText);
     })
}

function setTimeFS (fSTime) {
     let testDate = new Date();
     let stringTime = localStorage.getItem("flashSaleTime"); 
     if (stringTime === null)
          localStorage.setItem("flashSaleTime", testDate.toLocaleTimeString("vi-VN"));
     else {
          let index = 0;
          stringTime = stringTime.split(":");
          let timeArray = [];
          fSTime.forEach ((time) => {
               if (time.classList.contains("fs-number")) {
                    time.innerText = stringTime[index];
                    timeArray.push(time);
                    index++;
               }                    
          });
          startCountDown(timeArray);

     }
}

async function startCountDown (timeArray) {
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
          else 
               alert ("End sale event !");
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

document.addEventListener ("DOMContentLoaded", function () {
     const ratio = 9 / 6;
     const elementsObj = getElementsHandler();
     const timeFS = Array.from(getTimeFS().children);
     setTimeFS(timeFS);
     formatPrices(getElementPrices());
     resizeSmNav(elementsObj.getSubMenuNav());
     resizeImages(elementsObj.getImages(), ratio);
})