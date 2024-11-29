"use strict";
import * as Bridge from "./Bridge.js";
import * as FlashSale from "./FlashSales.js";
import * as RenderProducts from "./Products.js";

// check container is empty or not
function isEmpty(container) {
  let children = container.children;
  if (children.length === 0) return true;
  for (let child of children)
    if (child.classList.contains("empty-mess")) return true;
  return false;
}

// format prices from default to vi-VN format
function formatPrices(elementsObj) {
  const pricesContainer = elementsObj.getElementPrices();
  if (pricesContainer) {
    const formatPricesHandler = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumSignificantDigits: "3",
    });
    pricesContainer.forEach((element) => {
      element.innerText = formatPricesHandler.format(element.innerText);
    });
  }
}

// create Dots
function createDots(parent, totalDots) {
  let dotCount = 0,
    breakpoint = 46.1875 * 16;
  let container = parent.querySelector(".nav-tab-container");
  let childInners = Array.from(container?.children);
  let dotBar = parent.querySelector(".dots-bar");

  if (window.innerWidth <= breakpoint) dotCount = childInners.length;
  else dotCount = Math.ceil(childInners.length / totalDots);

  if (dotBar) {
    dotBar.innerHTML = "";
    if (dotCount === 1) return;

    for (let i = 0; i < dotCount; i++) {
      let dot = document.createElement("div");

      if (i == 0) dot.classList.add("active");
      dot.classList.add("dot");
      dotBar.appendChild(dot);
    }
  }
}

//change DOM on categories if it not have any product inside
function categoryIsEmpty() {
  Bridge.default()
    .getCategories()
    .forEach((category) => {
      const container = category.querySelector(".product-container");
      if (isEmpty(container)) {
        container.innerHTML =
          '<div class="empty-mess font-size-20 font-bold">Không có sản phẩm trong phần này</div>';
        container.classList.add(
          "flex",
          "full-height",
          "align-center",
          "justify-center"
        );
        container.querySelector(".nav-btn")?.classList.add("disable");
        category.querySelector(".category-btn")?.classList.add("disable");
      }
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
      image.style.height = ratio * imageWidth + "px";
    });

    if (image && !image.getAttribute("style")) {
      let imageWidth = image.offsetWidth;
      image.style.height = ratio * imageWidth + "px";
    }
  });
  window.addEventListener("resize", () => {
    productImages.forEach((image) => {
      let imageWidth = image.offsetWidth;
      image.style.height = ratio * imageWidth + "px";
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
  childInner.style.width = parentWidth / 16 + "em";

  window.addEventListener("resize", function () {
    parentWidth = subMenuNav.offsetWidth;
    if (!childInner.width === "unset") childInner.style.width = "unset";
    else childInner.style.width = parentWidth / 16 + "em";
  });
}

// default add header footer and initProducts
async function addDOMHeader(elementsObj) {
  try {
    const headerDOM = await Bridge.promiseDOMHandler(
      "/Web-Books-Store/HTML/header_footer/header.html"
    );
    const header = headerDOM.getElementById("header-container");
    const subHeader = headerDOM.getElementById("sub-header");
    let placeInsert = elementsObj.getMainContainer();
    const webContent = elementsObj.getWebContent();

    // add elements into DOM
    webContent.before(header);
    placeInsert.insertAdjacentElement("afterbegin", subHeader);
  } catch (error) {
    alert(error);
  }
}

async function addDOMFooter(elementsObj) {
  try {
    const footerDOM = await Bridge.promiseDOMHandler(
      "/Web-Books-Store/HTML/header_footer/footer.html"
    );
    const footer = footerDOM.getElementById("footer-container");
    const webContent = elementsObj.getWebContent();

    // add elements into DOM
    webContent.after(footer);
  } catch (error) {
    alert(error);
  }
}

async function getInitProducts(elementsObj) {
  try {
    const storage = await fetch("/Web-Books-Store/Javascript/Storage.js");
    const jsonArray = await storage.json();
    const productsList = Array.from(jsonArray);

    // render init products
    // RenderProducts.setProductBooks(productsList);
    RenderProducts.geneProducts(productsList);
    formatPrices(elementsObj);
    resizeImages(elementsObj);
    categoryIsEmpty();
  } catch (error) {
    alert(error);
  }
}

// call functions when DOM Loaded
document.addEventListener("DOMContentLoaded", function () {
  const elementsObj = Bridge.default();

  //create check DOM of Header and Footer
  addDOMHeader(elementsObj);
  addDOMFooter(elementsObj);
  const checkDOM = setInterval(() => {
    if (
      elementsObj.getHeader() &&
      elementsObj.getSubHeader() &&
      elementsObj.getFooter()
    ) {
      // call funcs
      resizeSmNav(elementsObj);
      // remove Interval
      clearInterval(checkDOM);
    }
  }, 200);

  // call funcs
  getInitProducts(elementsObj);
  FlashSale.setTimeFS(elementsObj);
});

export {
  formatPrices,
  resizeImages,
  createDots,
  isEmpty,
  categoryIsEmpty,
  getInitProducts,
};
