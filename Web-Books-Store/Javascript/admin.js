//
window.onload = function () {
  if (window.localStorage.getItem("admin")) {
    //lấy dữ liệu từ localStorage hoặc từ bookList
    bookList = getbookList() || bookList;
    //them tab cho admin
    eventab();
    //tạo bảng
    addTableProducts();
    addTableDonHang();
    addTableKhachHang();
    addTableThongKe();

  } else {
    (document.querySelector(".message")).classList.remove("disable");
  }
};
function setbookList(newList) {
  window.localStorage.setItem("bookList", JSON.stringify(newList));
}

function getbookList() {
  return JSON.parse(window.localStorage.getItem("bookList"));
}
//hàm chuyển kiểu dữ liệu
function stringToNum(str, char) {
  return Number(str.split(char || ".").join(""));
}
function numToString(num, char) {
  return num
    .toLocaleString()
    .split(",")
    .join(char || ".");
}

function eventab() {
  const opensanpham = document.querySelector(".opensanpham");
  const khungsanpham = document.querySelector(".js-sanpham");

  const openkhachhang = document.querySelector(".openkhachhang");
  const khungkhachhang = document.querySelector(".js-khachhang");

  const opendonhang = document.querySelector(".opendonhang");
  const khungdonhang = document.querySelector(".js-donhang");

  function showsanpham() {
    khungsanpham.classList.add("open");
    khungdonhang.classList.remove("open");
    khungkhachhang.classList.remove("open");
    khungtrangchu.classList.remove("open");
    opensanpham.classList.add("action");
    opentrangchu.classList.remove("action");
    openkhachhang.classList.remove("action");
    opendonhang.classList.remove("action");
  }

  opensanpham.addEventListener("click", showsanpham);
  openkhachhang.addEventListener("click", showkhachhang);
}

//SANPHAM++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Tạo bảng sản Phẩm
function addTableProducts() {
  var tc = document
    .getElementsByClassName("sanpham")[0]
    .getElementsByClassName("table-content")[0];
  var xuat = `<table>`;
  for (var i = 0; i < bookList.length; i++) {
    var a = bookList[i];
    xuat +=
      `
            <tr>
              <td style="width: 5%">` + (i + 1) + `</td>
              <td style="width: 5%">` + a.masp + `</td>
              <td style="width: 40%">` + a.tensp;
    if (a.hinh != null) xuat += `<img src="` + a.hinh + `"></img>`;
    xuat += `        
            </td>
              <td style="width: 10%">` + a.loaisach + `</td>
              <td style="width: 10%">` + a.gia + `</td>
              <td style="width: 15%">
                  <div class="tooltip">
                      <i class="ti-pencil-alt" onclick="addKhungSuaSanPham('` + a.masp + `')"></i>
                  </div>
                  <div class="tooltip" >
                      <i class="ti-trash" onclick="xoaSanPham('` + a.masp + `','` + a.tensp + `')"></i>
                  </div>
              </td>
          </tr>
          `;
  }
  xuat += `</table>`;
  tc.innerHTML = xuat;
}
//Mở khung sửa sản phẩm
function addKhungSuaSanPham(masp) {
  var sp;
  for (var a of bookList) {
    if (a.masp == masp) {
      sp = a;
    }
  }
  var xuat =
    `<span class="close" onclick="this.parentElement.style.transform = 'scale(0)';"><i class="ti-close"></i></span>
        <table class="overlayTable table-content table-header">
            <tr>
                <th colspan="2">Sửa Sản Phẩm: ` +sp.tensp +
    `</th>
            </tr>
            <tr>
                <td>Mã sản phẩm:</td>
                <td><input type="text" value="` + sp.masp +
    `"></td>
            </tr>
            <tr>
                <td>Tên sản phẩm:</td>
                <td><input type="text" value="` + sp.tensp +
    `"></td>
            </tr>
            <tr>
                <td>Thương Hiệu:</td>
                <td>
                    <select >`;
  var danhsachthuonghieu = ["Whisky", "Rum", "Vodka"];
  for (var c of danhsachthuonghieu) {
    if (sp.thuonghieu == c)
      xuat += `<option value="` + c + `"selected>` + c + `</option>`;
    else xuat += `<option value="` + c + `">` + c + `</option>`;
  }
  xuat += `
        </select>
                </td>
            </tr>
            
            <tr>
                <td>Hình:</td>
                <td>`;
  if (sp.hinh != null) {
    xuat +=
      `<img class="hinhDaiDien" id="anhDaiDienSanPhamThem" src="` +
      sp.hinh +
      `">
            <a onclick="xoaAnhSanPham('` +
      sp.masp +
      `')">Xóa hình</a>`;
  }

  xuat +=
    `
                    <input type="file" accept="image/*" onchange="capNhatAnhSanPham(this.files, 'anhDaiDienSanPhamThem')">
                </td>
            </tr>
            <tr>
                <td>Giá tiền (₫):</td>
                <td><input type="text" value="` +
    stringToNum(sp.gia) + `"></td>
            </tr>
            <tr>
                <td>Số sao (số nguyên 0->5):</td>
                <td><input type="text" value="` + sp.sosao + `"></td>
            </tr>
            <tr>
                <td>Nồng độ:</td>
                <td><input type="text" value="` + sp.nongdo + `"></td>
            </tr>
            <tr>
                <td>Dung tích:</td>
                <td><input type="text" value="` + sp.dungtich + `"></td>
            </tr>
            <tr>
                <td colspan="2" class="table-footer"><button>LƯU THAY ĐỔI</button> </td>
            </tr>
        </table>`;
  var khung = document.getElementById("khungSuaSanPham");
  khung.innerHTML = xuat;
  khung.style.transform = "scale(1)";
}

function suaSanPham(masp) {
  // Tìm đối tượng sản phẩm cần sửa
  let spIndex = bookList.findIndex((sp) => sp.masp === masp);
  if (spIndex === -1) {
    alert("Không tìm thấy sản phẩm cần sửa!");
    return;
  }

  // Lấy thông tin từ các ô input trong khung sửa
  const inputs = document.querySelectorAll("#khungSuaSanPham input, #khungSuaSanPham select");
  const newSP = {
    masp: inputs[0].value.trim(),
    tensp: inputs[1].value.trim(),
    thuonghieu: inputs[2].value.trim(),
    hinh: previewSrc || bookList[spIndex].hinh, // Ảnh mới hoặc giữ ảnh cũ
    gia: numToString(stringToNum(inputs[3].value.trim())), // Chuyển đổi giá tiền
    sosao: parseInt(inputs[4].value.trim()) || 0,
    nongdo: inputs[5].value.trim(),
    dungtich: inputs[6].value.trim(),
  };

  // Kiểm tra hợp lệ
  if (!newSP.masp || !newSP.tensp || !newSP.gia) {
    alert("Mã sản phẩm, tên sản phẩm và giá tiền không được để trống!");
    return;
  }

  // Cập nhật thông tin vào bookList
  bookList[spIndex] = newSP;

  // Lưu vào localStorage
  setbookList(bookList);

  // Cập nhật lại bảng sản phẩm
  addTableProducts();

  // Đóng khung sửa
  document.getElementById("khungSuaSanPham").style.transform = "scale(0)";
  alert("Cập nhật sản phẩm thành công!");
}

export { suaSanPham };

//biến lưu ảnh sản phẩm
let previewSrc;
