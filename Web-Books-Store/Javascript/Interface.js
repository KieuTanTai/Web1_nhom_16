function getImages () {
     return document.querySelectorAll(".product-image.js-item img") 
}

function getSubMenuNav () {
     return document.querySelector(".sub-menu-item.menu-nav");
}

// resize image
function resizeImages (productImages) {
     productImages.forEach((image) => {
          image.addEventListener("load", () => {
               image.style.height = ( 9/6 * image.offsetWidth) + "px";
          });
     });

     window.addEventListener("resize", () => {
          productImages.forEach ((image) => {
               image.style.height = (9/6 * image.offsetWidth) + "px";
          });
     })
}

function resizeSmNav (subMenuNav) {
     const childInner = subMenuNav.firstElementChild;
     let parentWidth =  subMenuNav.offsetWidth;
     childInner.style.width = (parentWidth / 16) + "em";

     window.addEventListener("resize", function() {
          parentWidth = subMenuNav.offsetWidth;
          console.log(parentWidth);
          if (!childInner.width === "unset")
               childInner.style.width = "unset";
          else
               childInner.style.width = (parentWidth / 16) + "em";
     }); 

     // childInner.addEventListener("mouseleave", function() {
     //      childInner.removeAttribute("style");
     // })
}

document.addEventListener ("DOMContentLoaded", function() {
     const productImages = getImages();
     const subMenuNav = getSubMenuNav();
     resizeImages(productImages);
     resizeSmNav(subMenuNav);
})