'use strict'
import * as Storage from "./Storage.js";
import * as Products from "./Products.js";
import * as Interface from "./Interface.js";
import * as Bridge from "./Bridge.js";
import * as Actions from "./Actions.js";
import * as FlashSales from "./FlashSales.js";
import * as Navigate from "./Navigate.js";
import * as Search from "./search.js";
import * as ThongKe from "./thongke.js";
import * as DonHang from "./donhang.js";
import * as Login from "./Login.js";
import * as Register from "./Register.js";
import * as Slides from "./Slides.js";

document.addEventListener("DOMContentLoaded", () => {
     let elementsObj = Bridge.default();

     // DOM ON action.js
     Interface.addDOMHeaderFooter(elementsObj);
     const checkDOM = setInterval(() => {
          if (elementsObj.getHeader() && elementsObj.getSubHeader() && elementsObj.getFooter()) {
               // call funcs
               Interface.resizeSmNav(elementsObj);
               Actions.accountEvents(elementsObj);
               Actions.staticContents(elementsObj);
               Actions.historyNavigate(elementsObj);
               Actions.returnHomepage(elementsObj);
               Actions.trackingNavigate(elementsObj);
               Actions.smNavigationMenu(elementsObj);
               Search.searchBtn();
               // remove Interval 
               clearInterval(checkDOM);
          }
     }, 200);
     // call funcs
     Interface.hiddenException();
     Actions.cancelButtons(elementsObj);
     Interface.getInitProducts(elementsObj);

     // navigate.js
     Navigate.execQueryHandler();
     Navigate.popStateHandler();
     Navigate.forbiddenDOM();

     Slides.slidesHandler("news");
     Login.validateAccount();
     Register.validateRegister();
})