'use strict'
// change background color
document.addEventListener('DOMContentLoaded', function() {
    const allElement = document.querySelectorAll('*');
    var bodyIndex = document.querySelectorAll('.body-index');
    var button = document.getElementById('change-bg-btn');
    button.onclick = function () {
        allElement.forEach((element) => {
            const style = window.getComputedStyle(element);
            const changeBackground = style.backgroundColor;

            if (changeBackground === 'rgb(255, 255, 255)') {
                element.style.backgroundColor = 'rgb(0, 0, 0)';
                element.style.color = 'rgb(255, 255, 255)';
            }
            else if (changeBackground === 'rgb(0, 0, 0)') {
                element.style.backgroundColor = 'rgb(255, 255, 255)';
                element.style.color = 'rgb(0, 0, 0)';
            }
        });

        // change background for body 
        bodyIndex.forEach((bodyBackground) => {
            if(!bodyBackground.classList.contains('body-theme')) {
                bodyBackground.classList.add('body-theme');
            }
            else {
                bodyBackground.classList.remove('body-theme');
            }
        })
    }

});

//  scroll back top
document.addEventListener('DOMContentLoaded', function () {
    var scrollTop = document.getElementById('scroll-top');
    scrollTop.addEventListener('click', function () {
        scrollTop.classList.add('animation');
        
        setTimeout(function() {
            window.scrollTo({top: 0, behavior: 'smooth'});
            scrollTop.classList.remove('animation');
        }, 100);
    });
});


// test
window.addEventListener('scroll', updateChildPosition);
window.addEventListener('resize', updateChildPosition);
document.addEventListener('DOMContentLoaded', updateChildPosition);

function updateChildPosition(test, type = 'log') {
    const parent = document.querySelector('.sub-menu-item');
    const child = document.querySelector('.list-btn');
    
    const rect = parent.getBoundingClientRect();
    
    child.style.width = `${rect.width / 16}em`;
    child.style.height = `${rect.height / 16}em`;
}

export const updateChildPositionI = updateChildPosition;





// function GetImageProducts() {
//     return document.querySelectorAll(".product-image");
// }

// function ResizeImage(productImage) {
//     let productImgWidth = productImage.naturalWidth;
//     let productImgHeight = productImage.naturalHeight;
//     console.log(productImgWidth, productImgHeight);
// }

// document.addEventListener("DOMContentLoaded", () => {
//     const productHandler = GetImageProducts();
//     let productContainer = [];
//     productHandler.forEach((product) => {
//         let productImage = product.querySelector('img');
//         productImage.addEventListener('load', () => {
//             ResizeImage(productImage);
//         })
//     });
// })