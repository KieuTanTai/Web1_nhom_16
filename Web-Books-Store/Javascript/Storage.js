'use strict'
import * as bridge from "./Bridge.js";
import * as fInterface from "./Interface.js";

function getProductsList() {
     let productsListList = [
          {
               "productID": "BK0001",
               "img": "../Assets/Images/Books/Manga/khe_hat_loi_yeu_1.webp",
               "name": "Khẽ Hát Lời Yêu - 1",
               "author": "Eku Takeshima",
               "sale": 0.15,
               "status": "Còn hàng",
               "price": 65000,
               "release": "2023",
               "format": "bìa mềm",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "BK0002",
               "img": "../Assets/Images/Books/Manga/khe_hat_loi_yeu_2.webp",
               "name": "Khẽ Hát Lời Yêu - 2",
               "author": "Eku Takeshima",
               "sale": 0.15,
               "status": "Còn hàng",
               "price": 65000,
               "release": "2024",
               "format": "bìa mềm",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "BK0003",
               "img": "../Assets/Images/Books/Manga/khe_hat_loi_yeu_3.webp",
               "name": "Khẽ Hát Lời Yêu - 3",
               "author": "Eku Takeshima",
               "sale": 0.15,
               "status": "Còn hàng",
               "price": 65000,
               "release": "2024",
               "format": "bìa mềm",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "BK0004",
               "img": "../Assets/Images/Books/Manga/khe_hat_loi_yeu_4.webp",
               "name": "Khẽ Hát Lời Yêu - 4",
               "author": "Eku Takeshima",
               "sale": 0.15,
               "status": "Còn hàng",
               "price": 65000,
               "release": "2024",
               "format": "bìa mềm",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "BK0005",
               "img": "../Assets/Images/Books/Manga/khe_hat_loi_yeu_5.webp",
               "name": "Khẽ Hát Lời Yêu - 5",
               "author": "Eku Takeshima",
               "sale": 0.15,
               "status": "Còn hàng",
               "price": 65000,
               "release": "2024",
               "format": "bìa mềm",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "BK0006",
               "img": "../Assets/Images/Books/Light_Novel/suzume__bia_cung_bia_cung.webp",
               "name": "Khóa Chặt Cửa Nào Suzume (Bìa Cứng)",
               "author": "Shinkai Makoto",
               "sale": 0.2,
               "status": "Hết hàng",
               "price": 190000,
               "release": "2023",
               "format": "bìa cứng",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "BK0007",
               "img": "../Assets/Images/Books/Light_Novel/suzume__bia_mem.webp",
               "name": "Khóa Chặt Cửa Nào Suzume (Bìa Mềm)",
               "author": "Shinkai Makoto",
               "sale": 0.2,
               "status": "Còn hàng",
               "price": 145000,
               "release": "2023",
               "format": "bìa mềm",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "BK0008",
               "img": "../Assets/Images/Books/Light_Novel/3_ngay_hanh_phuc.webp",
               "name": "3 ngày hạnh phúc",
               "author": "Sugaru Miaki",
               "sale": 0.31,
               "status": "Còn hàng",
               "price": 85000,
               "release": "2019",
               "format": "bìa mềm",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "BK0009",
               "img": "../Assets/Images/Books/Light_Novel/dau_oi_bay_di.webp",
               "name": "đau ơi bay đi",
               "author": "Sugaru Miaki",
               "sale": 0.45,
               "status": "Còn hàng",
               "price": 120000,
               "release": "2022",
               "format": "bìa mềm",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "P00010",
               "img": "../Assets/Images/Books/Light_Novel/dem-day-sao.webp",
               "name": "Khi ấy là một đêm đầy sao",
               "author": "Milito Amasaki, Nagu",
               "sale": 0.2,
               "status": "Hết hàng",
               "price": 139000,
               "release": "2023",
               "format": "bìa mềm",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "P00011",
               "img": "../Assets/Images/Books/Light_Novel/dem_nay_dau_tinh_yeu_bien_mat.webp",
               "name": "đêm nay dẫu tình yêu biến mất khỏi thế gian",
               "author": "Misaki Ichijo",
               "sale": 0.4,
               "status": "Hết hàng",
               "price": 129000,
               "release": "2022",
               "format": "bìa mềm",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "P00012",
               "img": "../Assets/Images/Books/Light_Novel/em_la_anh_sang_giua_dem_trang.webp",
               "name": "em là ánh sáng giữa đêm trăng",
               "author": " Sano Tetsuya",
               "sale": 0.26,
               "status": "Hết hàng",
               "price": 80000,
               "release": "2021",
               "format": "bìa mềm",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "P00013",
               "img": "../Assets/Images/Books/Light_Novel/belle.webp",
               "name": "BELLE - Rồng Và Công Chúa Tàn Nhang",
               "author": "Mamoru Hosoda",
               "sale": 0.7,
               "status": "Hết hàng",
               "price": 110000,
               "release": "2022",
               "format": "bìa mềm",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "P00014",
               "img": "../Assets/Images/Books/Light_Novel/tang_hoa_cho_quai_vat_trong_rung.webp",
               "name": "Tặng Hoa Cho Quái Vật Trong Rừng",
               "author": "Kimito Kogi",
               "sale": 0.35,
               "status": "Hết hàng",
               "price": 115000,
               "release": "2024",
               "format": "bìa mềm",
               "packagingSize": "13.5 x 20.5 cm"
          },

          {
               "productID": "P00015",
               "img": "../Assets/Images/Books/Manga/yotsuba___tap_4.webp",
               "name": "Yotsuba&! - 4",
               "author": " Azuma Kiyohiko",
               "sale": 0.15,
               "status": "Hết hàng",
               "price": 65000,
               "release": "2024",
               "format": "bìa mềm",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "P00016",
               "img": "../Assets/Images/Books/Van_Hoc/co-tich-nguoi-dien.webp",
               "name": "Cổ tích của người điên",
               "author": " Thời Thần",
               "sale": 0.23,
               "status": "Còn hàng",
               "price": 110000,
               "release": "2014",
               "format": "bìa mềm",
               "packagingSize": "13.5 x 20.5 cm"
          },

          {
               "productID": "P00017",
               "img": "../Assets/Images/Books/Technology/clean_code.webp",
               "name": "Clean Code - Mã Sạch Và Con Đường Trở Thành Lập Trình Viên Giỏi (Tái Bản 2023)",
               "author": "Nguyễn Văn Trung",
               "sale": 0.2,
               "status": "Còn hàng",
               "price": 386000,
               "release": "2023",
               "format": "bìa mềm",
               "packagingSize": "24 x 16 cm"
          },

          {
               "productID": "P00018",
               "img": "../Assets/Images/Books/Light_Novel/khi_muon_khoc_toi_deo_mat_na_meo.webp",
               "name": "Khi Muốn Khóc Tôi Đeo Mặt Nạ Mèo",
               "author": "Iwasa Mamoru",
               "sale": 0.2,
               "status": "Hết hàng",
               "price": 98000,
               "release": "2023",
               "format": "bìa mềm",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "P00019",
               "img": "../Assets/Images/Books/Light_Novel/bau_troi_xanh_cua_em.webp",
               "name": "Bầu Trời Xanh Của Em",
               "author": "Cho-Heiwa Busters",
               "sale": 0.3,
               "status": "Hết hàng",
               "price": 110000,
               "release": "2023",
               "format": "bìa mềm",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "P00020",
               "img": "../Assets/Images/Books/Light_Novel/hello_world.webp",
               "name": "Hello World",
               "author": "Nozaki Mado",
               "sale": 0.4,
               "status": "Hết hàng",
               "price": 120000,
               "release": "2023",
               "format": "bìa mềm",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "P00021",
               "img": "../Assets/Images/Books/Light_Novel/khu-vuon-ngon-tu.webp",
               "name": "Khu Vườn Ngôn Từ",
               "author": "Shinkai Makoto",
               "sale": 0.2,
               "status": "Hết hàng",
               "price": 120000,
               "release": "2015",
               "format": "bìa mềm",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "P00022",
               "img": "../Assets/Images/Books/Light_Novel/toi-muon-bao-ve-cau-du-phai-mat-di-tinh-yeu-nay.webp",
               "name": "Tôi Muốn Bảo Vệ Cậu Dù Phải Mất Đi... Tình Yêu Này",
               "author": "Sou Inaida",
               "sale": 0.2,
               "status": "Còn hàng",
               "price": 126000,
               "release": "2023",
               "format": "bìa mềm",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "P00023",
               "img": "../Assets/Images/Books/Light_Novel/tam-biet-troi-xanh.webp",
               "name": "Tạm Biệt Trời Xanh",
               "author": "Misaki",
               "sale": 0.5,
               "status": "Còn hàng",
               "price": 116000,
               "release": "2022",
               "format": "bìa mềm",
               "packagingSize": "13 x 19 cm"
          },

          {
               "productID": "P00024",
               "img": "../Assets/Images/Books/Light_Novel/okitegamikyoko_1.webp",
               "name": "Okitegami Kyoko I - Sổ Ghi Chép",
               "author": " NISIOISIN",
               "sale": 0.26,
               "status": "Còn hàng",
               "price": 145000,
               "release": "2022",
               "format": "bìa mềm",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "P00025",
               "img": "../Assets/Images/Books/Light_Novel/okitegamikyoko_2.webp",
               "name": "Okitegami Kyoko II - Thư Tiến Cử",
               "author": " NISIOISIN",
               "sale": 0.5,
               "status": "Còn hàng",
               "price": 175000,
               "release": "2023",
               "format": "bìa mềm",
               "packagingSize": "13 x 18 cm"
          },

          {
               "productID": "P00026",
               "img": "../Assets/Images/Books/Learn_Language/kanji-look-learn.webp",
               "name": "Kanji Look And Learn - 512 Chữ Kanji Có Minh Họa Và Gợi Nhớ Bằng Hình",
               "author": " Nhiều Tác Giả",
               "sale": 0.2,
               "status": "Còn hàng",
               "price": 160000,
               "release": "2020",
               "format": "bìa mềm",
               "packagingSize": "19 x 25.5 cm"
          },

          {
               "productID": "P00027",
               "img": "../Assets/Images/Books/Learn_Language/kanji-look-learn-bai-tap.webp",
               "name": "Kanji Look And Learn - 512 Chữ Kanji Có Minh Họa Và Gợi Nhớ Bằng Hình - Bài Tập Workbook",
               "author": " Nhiều Tác Giả",
               "sale": 0.2,
               "status": "Còn hàng",
               "price": 120000,
               "release": "2020",
               "format": "bìa mềm",
               "packagingSize": "19 x 25.5 cm"
          },

          {
               "productID": "P00028",
               "img": "../Assets/Images/Books/Thieu_Nhi/alice.webp",
               "name": "Alice Ở Xứ Sở Diệu Kỳ Và Thế Giới Trong Gương",
               "author": " LEWIS CARROLL",
               "sale": 0.4,
               "status": "Còn hàng",
               "price": 150000,
               "release": "2019",
               "format": "bìa mềm",
               "packagingSize": "13.5 x 20.5 cm"

          },

          {
               "productID": "P00029",
               "img": "../Assets/Images/Books/Van_Hoc/am_hac_quan_combo.webp",
               "name": "Ám Hắc Quán – Combo 2 Tập",
               "author": "Yukito Ayatsuji",
               "sale": 0.2,
               "status": "Còn hàng",
               "price": 350000,
               "release": "2023",
               "format": "bìa mềm",
               "packagingSize": "13.5 x 20.5 cm"
          }
     ]
     return productsListList;
}

function getProductBooks() {
     let productsList = [];
     productsList.push(localStorage.getItem("ProductsList"));
     return productsList;
}

function setProductBooks(product) {
     localStorage.setItem("productsList", JSON.stringify(product));
}

function productsFS(productsList) {
     const fsContainer = bridge.default().getFSTable()?.querySelector(".product-container");
     let html = "";

     if (fsContainer && productsList) {
          for (let product in productsList) {
               if (productsList.hasOwnProperty(product)) {
                    html +=
                         `
                    <div class="grid-col col-l-2-4 col-m-3 col-s-6">
                         <div class="block-product product-resize">
                              <span class="product-image js-item">
                                   <img src="${productsList[product].img}" 
                                        alt="${productsList[product].name}">
                              </span>
                              <div class="sale-label">${productsList[product].sale * 100}%</div>
                              <div class="sale-off font-bold capitalize ${productsList[product].quantity <= 0 ? "active" : ""}">hết hàng</div>
                              <div class="info-inner flex justify-center align-center line-height-1-6">
                                   <h4 class="font-light capitalize">${productsList[product].name}</h4>
                                   <div class="margin-y-4">
                                        <span class="price font-bold">${Math.round(productsList[product].price * (1 - productsList[product].sale))}</span>
                                        <del class="price old-price padding-left-8 font-size-14">${productsList[product].price}</del>
                                   </div>
                              </div>
                              <div class="action">
                                   <div class="buy-btn">
                                        <div title="mua ngay" class="button">
                                             <i class="fa-solid fa-bag-shopping fa-lg" style="color: var(--primary-white);"></i>
                                        </div>
                                   </div>
     
                                   <div class="add-to-cart">
                                        <div title="thêm vào giỏ hàng" class="button">
                                             <i class="fa-solid fa-basket-shopping fa-lg" style="color: var(--primary-white);"></i>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div> 
                    `
               }
          }
          fsContainer.innerHTML = html;
     }

}

function geneProducts(productsList) {
     const getHandler = bridge.default();
     let containers = bridge.$$(".container");
     // return if not have any container
     if (!containers)
          return;
     containers.forEach((container) => {
          console.log(container)
          let containerID = container.getAttribute("id");
          console.log(containerID);
     })
}

document.addEventListener("DOMContentLoaded", () => {
     const initProducts = getProductsList();
     let localProducts = getProductBooks();
     console.log((initProducts.sort((a, b) => a.sale - b.sale)).splice(0, 10))
     // productsFS((initProducts.sort((a,b) => a.sale - b.sale)).splice(0, 10));
     geneProducts(initProducts);


     fInterface.resizeImages(bridge.default());
     fInterface.formatPrices(bridge.default());
})