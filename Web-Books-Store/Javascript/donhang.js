// localStorage.clear()
// const chitiet_donhang = [
//      { id_donhang: "DH001", id_sanpham: "BK0001", sanpham: "Khẽ Hát Lời Yêu-1", don_gia: "65,000", sl: 2, tong: "130,000" },
//      { id_donhang: "DH001", id_sanpham: "BK0002", sanpham: "Khẽ Hát Lời Yêu-2", don_gia: "65,000", sl: 1, tong: "65,000" },
//      { id_donhang: "DH002", id_sanpham: "BK0006", sanpham: "Khóa Chặt Cửa Nào Suzume (Bìa Cứng)", don_gia: "190,000", sl: 1, tong: "190,000" },
//      { id_donhang: "DH002", id_sanpham: "P00013", sanpham: "BELLE-Rồng Và Công Chúa Tàn Nhang", don_gia: "110,000", sl: 2, tong: "220,000" },
//      { id_donhang: "DH003", id_sanpham: "P00015", sanpham: "Yotsuba&!-4", don_gia: "65,000", sl: 1, tong: "65,000" },
//      { id_donhang: "DH004", id_sanpham: "P00017", sanpham: "Clean Code-Mã Sạch Và Con Đường Trở Thành Lập Trình Viên Giỏi (Tái Bản 2023)", don_gia: "386,000", sl: 1, tong: "386,000" },
//      { id_donhang: "DH004", id_sanpham: "P00025", sanpham: "Okitegami Kyoko II-Thư Tiến Cử", don_gia: "175,000", sl: 2, tong: "350,000" },
//      { id_donhang: "DH004", id_sanpham: "P00028", sanpham: "Alice Ở Xứ Sở Diệu Kỳ Và Thế Giới Trong Gương", don_gia: "150,000", sl: 1, tong: "150,000" },
//      { id_donhang: "DH005", id_sanpham: "P00029", sanpham: "Ám Hắc Quán – Combo 2 Tập", don_gia: "350,000", sl: 2, tong: "700,000" },
//      { id_donhang: "DH006", id_sanpham: "BK0001", sanpham: "Khẽ Hát Lời Yêu-1", don_gia: "65,000", sl: 3, tong: "195,000" },
//      { id_donhang: "DH006", id_sanpham: "P00017", sanpham: "Clean Code-Mã Sạch Và Con Đường Trở Thành Lập Trình Viên Giỏi (Tái Bản 2023)", don_gia: "386,000", sl: 1, tong: "386,000" },
//      { id_donhang: "DH007", id_sanpham: "P00013", sanpham: "BELLE-Rồng Và Công Chúa Tàn Nhang", don_gia: "110,000", sl: 1, tong: "110,000" },
//      { id_donhang: "DH007", id_sanpham: "P00025", sanpham: "Okitegami Kyoko II-Thư Tiến Cử", don_gia: "175,000", sl: 2, tong: "350,000" },
//      { id_donhang: "DH008", id_sanpham: "P00018", sanpham: "Khi Muốn Khóc Tôi Đeo Mặt Nạ Mèo", don_gia: "98,000", sl: 2, tong: "196,000" },
//      { id_donhang: "DH009", id_sanpham: "P00017", sanpham: "Clean Code-Mã Sạch Và Con Đường Trở Thành Lập Trình Viên Giỏi (Tái Bản 2023)", don_gia: "386,000", sl: 1, tong: "386,000" },
//      { id_donhang: "DH010", id_sanpham: "P00013", sanpham: "BELLE-Rồng Và Công Chúa Tàn Nhang", don_gia: "110,000", sl: 1, tong: "110,000" },
//      { id_donhang: "DH011", id_sanpham: "P00029", sanpham: "Ám Hắc Quán – Combo 2 Tập", don_gia: "350,000", sl: 1, tong: "350,000" },
//      { id_donhang: "DH012", id_sanpham: "BK0002", sanpham: "Khẽ Hát Lời Yêu-2", don_gia: "65,000", sl: 1, tong: "65,000" },
//      { id_donhang: "DH013", id_sanpham: "BK0006", sanpham: "Khóa Chặt Cửa Nào Suzume (Bìa Cứng)", don_gia: "190,000", sl: 1, tong: "190,000" },
//      { id_donhang: "DH014", id_sanpham: "P00017", sanpham: "Clean Code-Mã Sạch Và Con Đường Trở Thành Lập Trình Viên Giỏi (Tái Bản 2023)", don_gia: "386,000", sl: 1, tong: "386,000" },
//      { id_donhang: "DH015", id_sanpham: "P00025", sanpham: "Okitegami Kyoko II-Thư Tiến Cử", don_gia: "175,000", sl: 2, tong: "350,000" },
//      { id_donhang: "DH016", id_sanpham: "P00028", sanpham: "Alice Ở Xứ Sở Diệu Kỳ Và Thế Giới Trong Gương", don_gia: "150,000", sl: 1, tong: "150,000" },
//      { id_donhang: "DH017", id_sanpham: "P00013", sanpham: "BELLE-Rồng Và Công Chúa Tàn Nhang", don_gia: "110,000", sl: 3, tong: "330,000" },
//      { id_donhang: "DH018", id_sanpham: "P00029", sanpham: "Ám Hắc Quán – Combo 2 Tập", don_gia: "350,000", sl: 1, tong: "350,000" },
//      { id_donhang: "DH019", id_sanpham: "P00015", sanpham: "Yotsuba&!-4", don_gia: "65,000", sl: 2, tong: "130,000" },
//      { id_donhang: "DH020", id_sanpham: "BK0001", sanpham: "Khẽ Hát Lời Yêu-1", don_gia: "65,000", sl: 3, tong: "195,000" }
// ];

// var chitiet_donhangJSON = JSON.stringify(chitiet_donhang);
// localStorage.setItem('chitiet_donhang', chitiet_donhangJSON);


// const customers = [
//      { id_khachhang: "KH001", ten_khach_hang: "Nguyễn Minh Quân" },
//      { id_khachhang: "KH002", ten_khach_hang: "Trần Thảo Vy" },
//      { id_khachhang: "KH003", ten_khach_hang: "Phạm Anh Tuấn" },
//      { id_khachhang: "KH004", ten_khach_hang: "Lê Hoàng Mai" },
//      { id_khachhang: "KH005", ten_khach_hang: "Vũ Minh Tâm" },
//      { id_khachhang: "KH006", ten_khach_hang: "Đặng Thị Ngọc Lan" },
//      { id_khachhang: "KH007", ten_khach_hang: "Bùi Thị Thanh Hương" },
//      { id_khachhang: "KH008", ten_khach_hang: "Ngô Quang Huy" },
//      { id_khachhang: "KH009", ten_khach_hang: "Hoàng Thanh Bình" },
//      { id_khachhang: "KH010", ten_khach_hang: "Dương Lan Anh" },
//      { id_khachhang: "KH011", ten_khach_hang: "Phan Minh Tự" },
//      { id_khachhang: "KH012", ten_khach_hang: "Lê Hải Dương" },
//      { id_khachhang: "KH013", ten_khach_hang: "Nguyễn Thị Hương Giang" },
//      { id_khachhang: "KH014", ten_khach_hang: "Trương Đình Kiên" },
//      { id_khachhang: "KH015", ten_khach_hang: "Lâm Hoàng Đức" }
//  ];
 
//  // Tạo danh sách địa chỉ ngẫu nhiên
//  const addresses = [
//      "123 Nguyễn Thị Minh Khai, Phường 2, Quận 3, TP.HCM",
//      "456 Lê Văn Sỹ, Phường 14, Quận 3, TP.HCM",
//      "789 Điện Biên Phủ, Phường 15, Quận Bình Thạnh, TP.HCM",
//      "101 Hùng Vương, Phường 9, Quận 5, TP.HCM",
//      "202 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
//      "303 Trần Hưng Đạo, Phường Cầu Kho, Quận 1, TP.HCM",
//      "404 Phạm Ngọc Thạch, Phường 6, Quận 3, TP.HCM",
//      "505 Lý Thái Tổ, Phường 10, Quận 5, TP.HCM",
//      "606 Đinh Tiên Hoàng, Phường Đa Kao, Quận 1, TP.HCM",
//      "707 Lê Thánh Tôn, Phường Bến Thành, Quận 1, TP.HCM",
//      "808 Nguyễn Xí, Phường 26, Quận Bình Thạnh, TP.HCM",
//      "909 Võ Văn Tần, Phường 6, Quận 3, TP.HCM",
//      "1001 Cách Mạng Tháng Tám, Phường 4, Quận Tân Bình, TP.HCM",
//      "114 Bà Huyện Thanh Quan, Phường 6, Quận 3, TP.HCM",
//      "125 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, TP.HCM",
//      "139 Hoàng Sa, Phường Tân Định, Quận 1, TP.HCM",
//      "141 Nguyễn Oanh, Phường 7, Quận Gò Vấp, TP.HCM",
//      "152 Lê Quang Định, Phường 5, Quận Gò Vấp, TP.HCM"
//  ];
 
//  // Hàm chuyển đổi giá trị chuỗi thành số
// function parseCurrency(value) {
//      return parseFloat(value.replace(/,/g, ''));
//  }
// // Hàm tạo giá trị ngày ngẫu nhiên
// function generateRandomDate() {
//      const startDate = new Date("2021-01-01");
//      const endDate = new Date(); // Ngày hôm nay
//      const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
//      const randomDate = new Date(randomTime);
 
//      // Định dạng ngày theo "dd/M/yyyy h:mm A"
//      const options = { day: '2-digit', month: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
//      return randomDate.toLocaleString("en-US", options).replace(',', '');
//  }
 
//  // Hàm tạo đối tượng đơn hàng ngẫu nhiên
// function generateRandomOrder(orderId) {
//     const customer = customers[Math.floor(Math.random() * customers.length)];
//     const address = addresses[Math.floor(Math.random() * addresses.length)];

//     // Lọc các chi tiết đơn hàng cho mã đơn hàng hiện tại (orderId)
//     const currentOrderDetails = chitiet_donhang.filter(detail => detail.id_donhang === orderId);

//     // Tính tổng giá trị đơn hàng từ chi tiết sản phẩm
//     const total = currentOrderDetails.reduce((acc, detail) => {
//      // Chuyển đổi don_gia và tong từ chuỗi thành số để tính tổng
//      const donGia = parseCurrency(detail.don_gia);  // Chuyển đổi giá thành số
//      const sl = parseInt(detail.sl);  // Số lượng thành số nguyên
//      return acc + (donGia * sl);  // Tính tổng
//  }, 0);

//     const status = Math.floor(Math.random() * 4) + 1; // Trạng thái từ 1 đến 4

//     return {
//         id_donhang: orderId,
//         id_khachhang: customer.id_khachhang,
//         ten_khach_hang: customer.ten_khach_hang,
//         dia_chi: address,
//         tong: total.toLocaleString("vi-VN").replace(/\./g, ","),
//         date: generateRandomDate(),
//         trang_thai: status.toString(),
//     };
// }

// // Mảng các mã đơn hàng có sẵn từ DH001 đến DH020
// const orderIds = Array.from({ length: 20 }, (_, i) => `DH${String(i + 1).padStart(3, '0')}`);

// // Tạo danh sách đối tượng đơn hàng từ các mã có sẵn
// const donhang = orderIds.map(orderId => generateRandomOrder(orderId));

// var donhangJSON = JSON.stringify(donhang);
// localStorage.setItem('donhang', donhangJSON);

// Lấy chuỗi JSON từ localStorage
const donhang_list = localStorage.getItem('donhang');
// Chuyển chuỗi JSON thành mảng đối tượng
const donhangArray = JSON.parse(donhang_list);
// Tạo một mảng mới chỉ chứa các giá trị của đối tượng
var data_temp = donhangArray?.map(({ id_khachhang, ...otherProps }) => Object.values(otherProps));
var data = donhangArray?.map(({ id_khachhang, ...otherProps }) => Object.values(otherProps));

// Lấy chuỗi JSON từ localStorage
const chitiet_donhang_list = localStorage.getItem('chitiet_donhang');
// Chuyển chuỗi JSON thành mảng đối tượng
const chitiet_donhangArray = JSON.parse(chitiet_donhang_list);
// Tạo một mảng mới chỉ chứa các giá trị của đối tượng
var data_chitiet = chitiet_donhangArray?.map(({ id_sanpham, ...otherProps }) => Object.values(otherProps));

var num_page = 1;

function storage_to_array(){
     // Lấy chuỗi JSON từ localStorage
     const donhang_list = localStorage.getItem('donhang');
     // Chuyển chuỗi JSON thành mảng đối tượng
     const donhangArray = JSON.parse(donhang_list);
     // Tạo một mảng mới chỉ chứa các giá trị của đối tượng
     return donhangArray.map(({ id_khachhang, ...otherProps }) => Object.values(otherProps));
}


// Cập nhật table (số trang về 1)
function update_table_donhang(flag) {
     var parent = document.getElementsByClassName("table-content")[2];
     var children = parent.children;
     Array.from(children).forEach(child => {
          parent.removeChild(child);
     });
     num_page = 1
     if (flag == 1) {
          add_table_donhang(data_temp);
          add_page(data_temp);
     } else {
          add_table_donhang(data);
          add_page(data);
     }
}

// Cập nhật table (giữ số trang)
function update_table_donhang_now() {
     var parent = document.getElementsByClassName("table-content")[2];
     var children = parent.children;
     Array.from(children).forEach(child => {
          parent.removeChild(child);
     });
     add_table_donhang(data_temp)
     add_page(data_temp);
}

// Table đơn hàng
function add_table_donhang(objData) {
     for (let i = (num_page - 1) * 8; i < (num_page - 1) * 8 + 8 && i < objData.length; i++) {
          var new_donhang = document.createElement('div');
          new_donhang.className = "table-donhang";
          switch (objData[i][5]) {
               case '1':
                    new_donhang.innerHTML = `
                     <div style="width: 5%">${i + 1}</div>
                     <div style="width: 12%">${objData[i][0]}</div>
                     <div style="width: 12%">${objData[i][1]}</div>
                     <div style="width: 24%">${objData[i][2]}</div>
                     <div style="width: 15%">${objData[i][3]}</div>
                     <div style="width: 12%">${objData[i][4]}</div>
                     <div style="width: 10%">
                         <select style="color: black" onChange="state_donhang(this, this.closest('.table-donhang').children[1])" data-previous-value="chua_xu_ly">
                             <option value="chua_xu_ly" style="color: black" selected>Chưa xử lý</option>
                             <option value="xac_nhan" style="color: black">Đã xác nhận</option>
                             <option value="da_giao" style="color: black">Đã giao</option>
                             <option value="huy" style="color: black">Đã hủy</option>
                         </select>
                     </div>
                     <div style="width: 10%">
                         <a onClick="xemchitiet(this.closest('.table-donhang').children[1])">Xem chi tiết</a>
                     </div>
                 `;
                    break;
               case '2':
                    new_donhang.innerHTML = `
                     <div style="width: 5%">${i + 1}</div>
                     <div style="width: 12%">${objData[i][0]}</div>
                     <div style="width: 12%">${objData[i][1]}</div>
                     <div style="width: 24%">${objData[i][2]}</div>
                     <div style="width: 15%">${objData[i][3]}</div>
                     <div style="width: 12%">${objData[i][4]}</div>
                     <div style="width: 10%">
                         <select style="color: black" onChange="state_donhang(this, this.closest('.table-donhang').children[1])" data-previous-value="xac_nhan">
                             <option value="chua_xu_ly" style="color: black" disabled>Chưa xử lý</option>
                             <option value="xac_nhan" style="color: black" selected>Đã xác nhận</option>
                             <option value="da_giao" style="color: black">Đã giao</option>
                             <option value="huy" style="color: black" disabled>Đã hủy</option>
                         </select>
                     </div>
                     <div style="width: 10%">
                         <a onClick="xemchitiet(this.closest('.table-donhang').children[1])">Xem chi tiết</a>
                     </div>
                 `;
                    break;
               case '3':
                    new_donhang.innerHTML = `
                     <div style="width: 5%">${i + 1}</div>
                     <div style="width: 12%">${objData[i][0]}</div>
                     <div style="width: 12%">${objData[i][1]}</div>
                     <div style="width: 24%">${objData[i][2]}</div>
                     <div style="width: 15%">${objData[i][3]}</div>
                     <div style="width: 12%">${objData[i][4]}</div>
                     <div style="width: 10%">
                         <select style="color: black" onChange="state_donhang(this, this.closest('.table-donhang').children[1])" data-previous-value="da_giao" disabled>
                             <option value="chua_xu_ly" style="color: black" disabled>Chưa xử lý</option>
                             <option value="xac_nhan" style="color: black" disabled>Đã xác nhận</option>
                             <option value="da_giao" style="color: black" selected>Đã giao</option>
                             <option value="huy" style="color: black" disabled>Đã hủy</option>
                         </select>
                     </div>
                     <div style="width: 10%">
                         <a onClick="xemchitiet(this.closest('.table-donhang').children[1])">Xem chi tiết</a>
                     </div>
                 `;
                    break;
               case '4':
                    new_donhang.innerHTML = `
                     <div style="width: 5%">${i + 1}</div>
                     <div style="width: 12%">${objData[i][0]}</div>
                     <div style="width: 12%">${objData[i][1]}</div>
                     <div style="width: 24%">${objData[i][2]}</div>
                     <div style="width: 15%">${objData[i][3]}</div>
                     <div style="width: 12%">${objData[i][4]}</div>
                     <div style="width: 10%">
                         <select style="color: black" disabled>
                             <option value="chua_xu_ly" style="color: black">Chưa xử lý</option>
                             <option value="xac_nhan" style="color: black">Đã xác nhận</option>
                             <option value="da_giao" style="color: black">Đã giao</option>
                             <option value="huy" style="color: black" selected>Đã hủy</option>
                         </select>
                     </div>
                     <div style="width: 10%">
                         <a onClick="xemchitiet(this.closest('.table-donhang').children[1])">Xem chi tiết</a>
                     </div>
                 `;
                    break;
          }
          document.getElementsByClassName('table-content')[2].appendChild(new_donhang);
     }
}

// Chuyển trạng thái đơn hàng
function state_donhang(select, id_donhang) {
     var prevalue = select.getAttribute("data-previous-value");
     if (confirm("Bạn có chắc chắn muốn tiếp tục?")) {
          var index = -1;
          for (let i = 0; i < data.length; i++) {
               if (data[i][0] == id_donhang.innerHTML) {
                    index = i;
                    break;
               }
          }
          switch (select.value) {
               case 'xac_nhan':
                    data[index][5] = '2';
                    updateStateInLocalStorage(id_donhang.innerHTML,'2');
                    break;
               case 'da_giao':
                    data[index][5] = '3';
                    updateStateInLocalStorage(id_donhang.innerHTML,'3');
                    break;
               case 'huy':
                    data[index][5] = '4';
                    updateStateInLocalStorage(id_donhang.innerHTML,'4');
                    break;
          }
          for (let i = 0; i < data_temp.length; i++) {
               if (data_temp[i][0] == id_donhang.innerHTML) {
                    index = i;
                    break;
               }
          }
          switch (select.value) {
               case 'xac_nhan':
                    data_temp[index][5] = '2';
                    break;
               case 'da_giao':
                    data_temp[index][5] = '3';
                    break;
               case 'huy':
                    data_temp[index][5] = '4';
                    break;
          }
          switch (select.value) {
               case 'xac_nhan':
                    alert('Đã xác nhận đơn hàng !');
                    break;
               case 'da_giao':
                    alert('Đã giao đơn hàng !');
                    break;
               case 'huy':
                    alert('Đã hủy đơn hàng !');
                    break;
          }
          update_table_donhang_now();
          updatePaginationButtons();
     } else {
          select.value = prevalue;
     }
}

// Phân trang
function add_page(data_f) {
     var page = document.createElement('div');
     page.id = "phan_trang";
     page.style.display = "grid";
     page.style.placeItems = "center";
     if (data_f.length <= 8) {
          page.innerHTML = `
             <nav>
                 <ul class="pagination">
                     <li><a href="#" id="prev" style="pointer-events: none; color: gray;" onClick="change_page(-1)">&laquo; Trang trước</a></li>
                     <li id="current_page">1</li>
                     <li><a href="#" id="next" style="pointer-events: none; color: gray;" onClick="change_page(1)">Trang sau &raquo;</a></li>
                 </ul>
             </nav>
         `;
     } else {
          page.innerHTML = `
             <nav>
                 <ul class="pagination">
                     <li><a href="#" id="prev" style="pointer-events: none; color: gray;" onClick="change_page(-1)">&laquo; Trang trước</a></li>
                     <li id="current_page">1</li>
                     <li><a href="#" id="next" onClick="change_page(1)">Trang sau &raquo;</a></li>
                 </ul>
             </nav>
         `;
     }
     document.getElementsByClassName('table-content')[2].appendChild(page);
}

// Chuyển trang
function change_page(direction) {
     num_page += direction;
     load_page();
}
function load_page() {
     update_table_donhang_now();
     updatePaginationButtons();
}
function updatePaginationButtons() {
     if (num_page <= 1) {
          let num_page = 1;
          document.getElementById('prev').setAttribute('style', 'pointer-events: none; color: gray;');
     } else {
          document.getElementById('prev').removeAttribute('style');
     }

     if (num_page >= data_temp.length / 8) {
          let num_page = Math.floor(data_temp.length / 8);
          document.getElementById('next').setAttribute('style', 'pointer-events: none; color: gray;');
     } else {
          document.getElementById('next').removeAttribute('style');
     }
     document.getElementById('current_page').textContent = num_page;
}

// Lọc
function loc(date_start, date_end, state, check_sort) {
     var filtered_data = [...data];
     // Sắp xếp theo quận
     if (check_sort.checked) {
          filtered_data = sort_diachi(filtered_data);
     }

     // Lọc ngày bắt đầu
     if (date_start.value != "") {
          filtered_data = filter_date_start(filtered_data, date_start.value);
     }

     // Lọc ngày kết thúc
     if (date_end.value != "") {
          filtered_data = filter_date_end(filtered_data, date_end.value);
     }

     // Lọc theo trạng thái
     if (state != "none") {
          filtered_data = filter_state(filtered_data, state.value);
     }
     data_temp = filtered_data;
     update_table_donhang(1);
}

function sort_diachi(f_data) {
     f_data.sort((a, b) => {
          if (a[2].split(",")[2] < b[2].split(",")[2]) {
               return -1;
          }
          if (a[2].split(",")[2] > b[2].split(",")[2]) {
               return 1;
          }
          return 0;
     });
     return f_data;
}

function filter_date_start(f_data, date_start) {
     var f_date_start = new Date(date_start);
     f_date_start.setDate(f_date_start.getDate());
     return f_data.filter(row => {
          var dateStr = row[4];
          var dateObj = new Date(dateStr);
          return dateObj >= f_date_start;
     });
}

function filter_date_end(f_data, date_end) {
     var f_date_end = new Date(date_end);
     f_date_end.setDate(f_date_end.getDate() + 1);
     return f_data.filter(row => {
          var dateStr = row[4];
          var dateObj = new Date(dateStr);
          return dateObj <= f_date_end;
     });
}

function filter_state(f_data, state) {
     switch (state) {
          case "chua_xu_ly":
               f_data = f_data.filter(item => item[5] === '1');
               break;
          case "xac_nhan":
               f_data = f_data.filter(item => item[5] === '2');
               break;
          case "da_giao":
               f_data = f_data.filter(item => item[5] === '3');
               break;
          case "huy":
               f_data = f_data.filter(item => item[5] === '4');
               break;
     }
     return f_data;
}

// Chi tiết đơn hàng
function xemchitiet(id_donhang) {
     var donhangDetails = [];
     for (let i = 0; i < data_chitiet.length; i++) {
          if (data_chitiet[i][0] == id_donhang.innerHTML) {
               donhangDetails.push(data_chitiet[i]);
          }
     }

     // Header
     var model_ctdh = document.createElement('div');
     model_ctdh.className = 'chitietdonhang';
     model_ctdh.innerHTML = `
         <div class="modal-content">
             <span class="close" onclick="close_ctdh()">×</span>
             <h2>Chi tiết đơn hàng ${id_donhang.innerHTML}</h2>
             <table class="table-chitiet_donhang-header">
                 <tr>
                     <th style="width: 50%" >Sản phẩm</th>
                     <th style="width: 20%" >Đơn giá</th>
                     <th style="width: 10%" >SL</th>
                     <th style="width: 20%" >Thành tiền</th>
                 </tr>
             </table>
         </div>
     `;
     document.getElementsByClassName('table-content')[2].appendChild(model_ctdh);

     // Chi tiết đơn hàng
     for (let i = 0; i < donhangDetails.length; i++) {
          var new_ctdh = document.createElement('div');
          new_ctdh.className = 'table-chitiet_donhang';
          new_ctdh.innerHTML = `
             <div style="width: 50%">${donhangDetails[i][1]}</div>
             <div style="width: 20%">${donhangDetails[i][2]}</div>
             <div style="width: 10%">${donhangDetails[i][3]}</div>
             <div style="width: 20%">${donhangDetails[i][4]}</div>
         `;
          document.getElementsByClassName('modal-content')[0].appendChild(new_ctdh);
     }
}

// Đóng chi tiết đơn hàng
function close_ctdh() {
     var modal = document.querySelector('.chitietdonhang');
     if (modal) {
          modal.remove();
     }
}

// Hàm cập nhật state của một đối tượng trong localStorage
function updateStateInLocalStorage(donhangId, newState) {

     const donhangJSON = localStorage.getItem('donhang');
     // Kiểm tra nếu có dữ liệu trong localStorage
     if (donhangJSON) {
         // Chuyển chuỗi JSON thành mảng đối tượng
         const donhangArray = JSON.parse(donhangJSON);
         // Tìm đối tượng trong mảng dựa trên id_donhang
         const donhang = donhangArray.find(dh => dh.id_donhang === donhangId);
         if (donhang) {
             // Cập nhật giá trị của trạng thái (state) trong đối tượng
             donhang.trang_thai = newState;
             // Lưu lại mảng đối tượng vào localStorage sau khi thay đổi
             localStorage.setItem('donhang', JSON.stringify(donhangArray));
         } else {
             console.log('Không tìm thấy đơn hàng với id:', donhangId);
         }
     } else {
         console.log('Không tìm thấy dữ liệu trong localStorage.');
     }
 }