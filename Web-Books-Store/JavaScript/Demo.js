'use strict'
function DOMLoaded() {
}

DOMLoaded();

let getItemContainer = document.querySelectorAll('.content-container');
function handleLoadItems(container) {
     let sourceFlashSaleItems = 'http://localhost:3000/books';
     fetch(sourceFlashSaleItems)
          .then(function(sourceItems) {
               return sourceItems.json();
          })
          .then(function(items) {
               let renderItems = items.map((flashSaleItems) => {
                    return `
                         <div class="grid-col col-l-2-4 col-m-3 col-s-6">
                              <div  class="item-inner">
                                   <div class="item-image">
                                        <a href=" " title="${flashSaleItems.name}">
                                             <img src="${flashSaleItems.source}" alt="${flashSaleItems.name}">
                                        </a>
                                   </div>
                                   <div class="sale-label">${flashSaleItems.sale}%</div>
                                   <div class="sale-off font-bold">Hết hàng</div>
                                   <div class="info-inner flex-center line-height-1-6">
                                        <h4 class="font-light capitalize">${flashSaleItems.name}</h4>
                                        <div class="margin-y-4">
                                             <span class="cost font-bold">${flashSaleItems.salePrice}₫</span>
                                             <del class="padding-left-8 font-size-14">${flashSaleItems.originalPrice}₫</del>
                                        </div>
                                   </div>
                                   <div class="action">
                                        <div>
                                             <a href="#" title="mua ngay">
                                                  <i class="fa-solid fa-bag-shopping fa-lg" style="color: var(--primary-white);"></i>
                                             </a>
                                        </div>

                                        <div>
                                             <a href="#" title="thêm vào giỏ hàng">
                                                  <i class="fa-solid fa-basket-shopping fa-lg" style="color: var(--primary-white);"></i>
                                             </a>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    `
               });
               return renderItems.join('');
          })
          .then((htmlCode) => {
               let childOfParticularParent = [...container].find((childElement) => {
                    let parentElement = childElement.parentNode;
                    return parentElement.id === 'fs-container';
               })

               console.log(childOfParticularParent)
               childOfParticularParent.innerHTML = htmlCode;
          }) 
}

handleLoadItems(getItemContainer);

let array = ['javascript', 'python', 'Nodejs', 'ReactJs'];

let object1 = {
     course: 'javascript',
     course2: 'Golang',
     course3: 'C++',
     price: 2000
}

let object2 = {
     ...object1,
     price: 3432, 
     price2: 43223, 
     price3: 44242322,
     course: 'java',
     childObject: {
          name: 'hello world',
          price: 9
     }
}

let object3 = {...object2, ...object1};
console.log(object2);

function logger([first, ...stringArray],...rest) {
     let coursesTitle = rest.reduce((defaultString, currentCourse, index) => {
          return [...defaultString, currentCourse, stringArray.shift()];
     }, [first]).join('');
     console.log(coursesTitle);
} 
let templateLiteral = logger`Here is the value of course ${object1.course} and ${object1.course2}!`;
// logger(...array);

import {updateChildPositionI as test} from './Interface.js'
test('hello world', 'warn');
console.log(object2.childObject?.price);