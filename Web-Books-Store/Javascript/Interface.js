// resize image

function getImages () {
     return document.querySelectorAll(".product-image.js-item img") 
}

// function calcWidth (containerWidth, containerHeight) {
//      let aspectRatio = containerHeight / containerWidth;
//      let width = 
// }

function resizeImages (productImages) {
     window.addEventListener("resize", () => {
          productImages.forEach ((image) => {
               image.style.height = (7/5 * image.offsetWidth) + "px";
          });
     })
}

document.addEventListener ("DOMContentLoaded", () => {
     const productImages = getImages();
     productImages.forEach((image) => {
          image.addEventListener("load", () => {
               image.style.height = ( 7/5 * image.offsetWidth) + "px";
          });
     });
     resizeImages(productImages);

})