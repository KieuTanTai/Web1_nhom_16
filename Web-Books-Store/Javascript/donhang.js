// Lấy chuỗi JSON từ localStorage
const donhang_list = localStorage.getItem('pay');
// Chuyển chuỗi JSON thành mảng đối tượng
const donhangArray = JSON.parse(donhang_list);
// Tạo một mảng mới chỉ chứa các giá trị của đối tượng
var data_temp = donhangArray.map(({ id_khachhang, ...otherProps }) => Object.values(otherProps));
var data = donhangArray.map(({ id_khachhang, ...otherProps }) => Object.values(otherProps));

// Lấy chuỗi JSON từ localStorage
const chitiet_donhang_list = localStorage.getItem('pay');
// Chuyển chuỗi JSON thành mảng đối tượng
const chitiet_donhangArray = JSON.parse(chitiet_donhang_list);
// Tạo một mảng mới chỉ chứa các giá trị của đối tượng
var data_chitiet = chitiet_donhangArray.map(({ id_sanpham, ...otherProps }) => Object.values(otherProps));

var num_page = 1;

function storage_to_array(){
     // Lấy chuỗi JSON từ localStorage
     const donhang_list = localStorage.getItem('pay');
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