var data_dh = [
    ['DH001','KH001','No data','1.499.000','11/3/2025 8:11 PM','1'],
    ['DH002','KH001','No data','11,499,000','11/4/2025 7:36 PM','2'],
    ['DH003','KH002','No data','20,499,000','11/5/2024 7:38 PM','3'],
    ['DH004','KH002','No data','20,499,000','11/4/2024 7:38 PM','1'],
    ['DH005','KH002','No data','20,499,000','11/4/2024 7:38 PM','1'],
    ['DH006','KH003','No data','20,499,000','11/4/2024 7:38 PM','1'],
    ['DH007','KH004','No data','20,499,000','11/4/2024 7:38 PM','1'],
    ['DH008','KH005','No data','20,499,000','11/4/2024 7:38 PM','3'],
    ['DH009','KH001','No data','1,499,000','11/3/2024 8:11 PM','1']
];
var data_dh_chitiet = [
    ['DH001','San pham A','300,000','10','400,000'],
    ['DH001','San pham B','500,000','1','500,000'],
    ['DH001','San pham C','100,000','4','400,000'],
    ['DH002','San pham C','100,000','4','400,000'],
    ['DH001','San pham D','100,000','5','400,000'],
    ['DH009','San pham E','100,000','2','400,000']
];
var data_kh = [
    ['DH001','KH001','Nguyễn Văn A','1,499,000','11/3/2025 8:11 PM'],
    ['DH002','KH001','Nguyễn Văn A','11,499,000','11/4/2025 7:36 PM'],
    ['DH003','KH002','Trần Văn B','20,499,000','11/5/2024 7:38 PM'],
    ['DH004','KH002','Trần Văn B','20,499,000','11/4/2024 7:38 PM'],
    ['DH005','KH002','Trần Văn B','20,499,000','11/4/2024 7:38 PM'],
    ['DH006','KH003','Nguyễn Văn C','20,499,000','11/4/2024 7:38 PM'],
    ['DH007','KH004','Trần Văn D','20,499,000','11/4/2024 7:38 PM'],
    ['DH008','KH005','Nguyễn Văn E','20,499,000','11/4/2024 7:38 PM'],
    ['DH009','KH001','Nguyễn Văn A','1,499,000','11/3/2024 8:11 PM']
];
var data_kh_temp = [];

var data_dh_temp = [];

var num_page = 1;

// Cập nhật table (số trang về 1)
function update_thongke(type,f){
    var parent = document.getElementsByClassName("table-content")[3];
    var children = parent.children;
    if (type=='kh'){
        Array.from(children).forEach(child => {
            if (child.id != "filter") {
                parent.removeChild(child);
            }
        });
    } else{
        Array.from(children).forEach(child => {
            parent.removeChild(child);
        });
    }
    num_page = 1
    thongke(type,f);
}

// Loại thống kê (mặt hàng, khách hàng)
function thongke(type,f){
    var btn_tkmh = document.getElementById('mh');
    var btn_tkkh = document.getElementById('kh');
    switch (type){
        case 'mh':
            btn_tkmh.setAttribute('style',"pointer-events: none; background-color: gray");
            btn_tkkh.removeAttribute('style');
            thongke_mh();
            break;
        case 'kh':
            btn_tkkh.setAttribute('style',"pointer-events: none; background-color: gray");
            btn_tkmh.removeAttribute('style');
            thongke_kh(f);
            break;
    }
}

// Thống kê mặt hàng
function thongke_mh(){
    var header_thongkemh = document.createElement('div');
    header_thongkemh.innerHTML = `
        <div class="header_thongkemh">
            <h1 style="color: black;">Thống kê mặt hàng</h1>
        </div>
        `;
    document.getElementsByClassName('table-content')[3].appendChild(header_thongkemh);

    var info_thongke = document.createElement('div');
    info_thongke.className = 'info_thongke';
    info_thongke.innerHTML = `
        <div style="display: flex; width: 100%; height: 100%; background-color: rgb(220, 220, 220);">
            <div style="display: flex; justify-content: center; align-items: center; width: 70%; height: 100%; border-right: 1px solid black;">
                <div style="width: 50%; height: 100%;">
                    <div style="width: 100%; height: 50px; display: flex; justify-content: center; align-items: center;">
                        <h2 style="color: black;">Sản phẩm bán chạy</h2>
                    </div>
                    <div style="width: 100%; border: 1px solid black;">
                        <table id="thongke_mh1" style="width: 100%; border-bottom: 1px solid black;">
                            <thead>
                                <tr>
                                    <th style="width: 12%; color: black">STT</th>
                                    <th style="width: 42%; color: black">Sản phẩm</th>
                                    <th style="width: 20%; color: black">Số lượng</th>
                                    <th style="width: 30%; color: black">Thu</th>
                                    <th style="width: 10%; color: black"></th>
                                </tr>
                            </thead>
                            <tbody>
                            
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div style="display: flex; justify-content: center; align-items: center; width: 70%; height: 100%; border-left: 1px solid black;">
                <div style="width: 50%; height: 100%;">
                    <div style="width: 100%; height: 50px; display: flex; justify-content: center; align-items: center;">
                        <h2 style="color: black;">Sản phẩm bán chậm</h2>
                    </div>
                    <div style="width: 100%; border: 1px solid black;">
                        <table id="thongke_mh2" style="width: 100%; border-bottom: 1px solid black;">
                            <thead>
                                <tr>
                                    <th style="width: 12%; color: black">STT</th>
                                    <th style="width: 42%; color: black">Sản phẩm</th>
                                    <th style="width: 20%; color: black">Số lượng</th>
                                    <th style="width: 30%; color: black">Thu</th>
                                    <th style="width: 10%; color: black"></th>
                                </tr>
                            </thead>
                            <tbody>
                            
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementsByClassName('table-content')[3].appendChild(info_thongke);
    add_thongke_mh1();
    add_thongke_mh2();
    add_tongthu();
}

// Thống kê khách hàng
function thongke_kh(f){
    if (!f){
        var loc_date = document.createElement('div');
        loc_date.id = "filter";
        loc_date.innerHTML = `
            <form>
                Ngày:
                <input id="date_start" type="date" class="locdon">
                -
                <input id="date_end" type="date" class="locdon" style="margin-right: 20px;margin-left: 10px;">
                <input type="button" value=" Thống kê " style="color: black" onClick="loc_thongkekh(date_start,date_end)">
                <input type="reset" value="Reset" style="width: 40px; color: black">
            </form>
        `;
        document.getElementsByClassName('table-content')[3].appendChild(loc_date);
    }

    var header_thongkekh = document.createElement('div');
    header_thongkekh.innerHTML = `
        <div class="header_thongkekh">
            <h1 style="color: black;">Thống kê khách hàng</h1>
        </div>
        `;
    document.getElementsByClassName('table-content')[3].appendChild(header_thongkekh);

    var info_thongke = document.createElement('div');
    info_thongke.className = 'info_thongke';
    info_thongke.innerHTML = `
    <div style="display: flex; width: 100%; height: 100%; background-color: rgb(220, 220, 220);">
        <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; border-right: 1px solid black;">
            <div style="width: 50%; height: 100%;">
                <div style="width: 100%; height: 50px; display: flex; justify-content: center; align-items: center;">
                    <h2 style="color: black;">Danh sách khách hàng phát sinh doanh thu nhiều nhất</h2>
                </div>
                <div style="width: 100%; border: 1px solid black;">
                    <table id="thongke_kh" style="width: 100%; border-bottom: 1px solid black;">
                        <thead>
                            <tr>
                                <th style="width: 12%; color: black">STT</th>
                                <th style="width: 20%; color: black">Mã khách hàng</th>
                                <th style="width: 42%; color: black">Tên khách hàng</th>
                                <th style="width: 30%; color: black">Tổng doanh thu</th>
                                <th style="width: 10%; color: black"></th>
                            </tr>
                        </thead>
                        <tbody>
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `;
    document.getElementsByClassName('table-content')[3].appendChild(info_thongke);
    if (!f){
        add_thongke_kh(get_thongke_kh(),false);
    } else{
        add_thongke_kh(get_thongke_kh_f(),true);
    }
}

// Tổng thu
function add_tongthu(){
    var tongthu = document.createElement('div');
    var sum = 0;
    for (let i=0; i<data_dh_chitiet.length; i++){
        sum = sum + parseInt(data_dh_chitiet[i][4].replace(/,/g, ''));
    }
    tongthu.className = 'tongthu';
    tongthu.innerHTML = `<h1 style="color: black">Tổng thu: ${sum.toLocaleString()} VND</h1>`;
    document.getElementsByClassName('table-content')[3].appendChild(tongthu);
}

// Lâp danh sách thống kê
function get_thongke_mh(){
    var rank = [];
    for (let i=0; i<data_dh_chitiet.length; i++){
        var f=0;
        for (let j=0; j<rank.length; j++){
            if (data_dh_chitiet[i][1]==rank[j][0]){
                rank[j][1] = rank[j][1] + parseInt(data_dh_chitiet[i][3]);
                rank[j][2] = (parseInt(rank[j][2].replace(/,/g, '')) + parseInt(data_dh_chitiet[i][4].replace(/,/g, ''))).toLocaleString('en-US');
                f=1;
                break;
            }
        }
        if (f==0){
            rank.push([data_dh_chitiet[i][1],parseInt(data_dh_chitiet[i][3]),data_dh_chitiet[i][4]]);
        }
    }
    return rank;
}

function get_thongke_kh(){
    var rank = [];
    for (let i=0; i<data_kh.length; i++){
        var f=0;
        for (let j=0; j<rank.length; j++){
            if (data_kh[i][1]==rank[j][0]){
                rank[j][2] = (parseInt(rank[j][2].replace(/,/g, '')) + parseInt(data_kh[i][3].replace(/,/g, ''))).toLocaleString('en-US');
                f=1;
                break;
            }
        }
        if (f==0){
            rank.push([data_kh[i][1],data_kh[i][2],data_kh[i][3]]);
        }
    }
    return rank;
}

function get_thongke_kh_f(){
    var rank = [];
    for (let i=0; i<data_kh_temp.length; i++){
        var f=0;
        for (let j=0; j<rank.length; j++){
            if (data_kh_temp[i][1]==rank[j][0]){
                rank[j][2] = (parseInt(rank[j][2].replace(/,/g, '')) + parseInt(data_kh_temp[i][3].replace(/,/g, ''))).toLocaleString('en-US');
                f=1;
                break;
            }
        }
        if (f==0){
            rank.push([data_kh_temp[i][1],data_kh_temp[i][2],data_kh_temp[i][3]]);
        }
    }
    return rank;
}

// Thống kê bán chạy
function add_thongke_mh1(){
    var body = document.querySelector('#thongke_mh1 tbody');
    var thongke = get_thongke_mh();
    var top=0;
    thongke.sort((a, b) => b[1] - a[1]);
    for (let i = 0; i < thongke.length && top<5; i++) {
        var row = document.createElement('tr');
        for (let j = 0; j < thongke[i].length+2; j++) {
            var cell = document.createElement('td');
            cell.style.color = 'black';
            if (j==0){
                cell.textContent = i+1;
                row.appendChild(cell);
                continue;
            }
            if (j==thongke[i].length+1){
                cell.innerHTML = `<a style="text-decoration: underline; color: blue; cursor: default;" onClick="xemhoadon_mh('${thongke[i][0]}')">Xem</a>`;
                row.appendChild(cell);
                break;
            }
            cell.textContent = thongke[i][j-1];
            row.appendChild(cell);
        }
        body.appendChild(row);
        top++;
    }
}

// Thống kê bán chậm
function add_thongke_mh2(){
    var body = document.querySelector('#thongke_mh2 tbody');
    var thongke = get_thongke_mh();
    var top=0;
    thongke.sort((a, b) => a[1] - b[1]);
    for (let i = 0; i < thongke.length && top<5; i++) {
        var row = document.createElement('tr');
        for (let j = 0; j < thongke[i].length+2; j++) {
            var cell = document.createElement('td');
            cell.style.color = 'black';
            if (j==0){
                cell.textContent = i+1;
                row.appendChild(cell);
                continue;
            }
            if (j==thongke[i].length+1){
                cell.innerHTML = `<a style="text-decoration: underline; color: blue; cursor: default;"onClick="xemhoadon_mh('${thongke[i][0]}')">Xem</a>`;
                row.appendChild(cell);
                break;
            }
            cell.textContent = thongke[i][j-1];
            row.appendChild(cell);
        }
        body.appendChild(row);
        top++;
    }
}

// Thống kê khách hàng
function add_thongke_kh(thongke,f){
    var body = document.querySelector('#thongke_kh tbody');
    var top=0;
    thongke.sort((a, b) => parseInt(b[2]) - parseInt(a[2]));
    for (let i = 0; i < thongke.length && top<5; i++) {
        var row = document.createElement('tr');
        for (let j = 0; j < thongke[i].length+2; j++) {
            var cell = document.createElement('td');
            cell.style.color = 'black';
            if (j==0){
                cell.textContent = i+1;
                row.appendChild(cell);
                continue;
            }
            if (j==thongke[i].length+1){
                cell.innerHTML = `<a style="text-decoration: underline; color: blue; cursor: default;"onClick="xemhoadon_kh('${thongke[i][0]}',${f})">Xem</a>`;
                row.appendChild(cell);
                break;
            }
            cell.textContent = thongke[i][j-1];
            row.appendChild(cell);
        }
        body.appendChild(row);
        top++;
    }
}

// Làm mới bảng xem hóa đơn
function refresh_xemhd(){
    var parent = document.getElementById("frame_xemhd");
    if (parent != null){
        var children = parent.children;
        Array.from(children).forEach(child => {
            parent.removeChild(child);
        });
    }
}

// Xem danh sách hóa đơn
function xemhoadon_mh(obj){
    // Lấy danh sách hóa đơn theo sản phẩm
    var list_hd = [];
    for (let i=0; i<data_dh_chitiet.length; i++){
        if (obj==data_dh_chitiet[i][1]){
            list_hd.push(data_dh_chitiet[i][0]);
        }
    }
    refresh_xemhd();
    var frame_xemhd = document.createElement('div');
    frame_xemhd.style.width = "100%";
    frame_xemhd.id = "frame_xemhd";
    document.getElementsByClassName('table-content')[3].appendChild(frame_xemhd);

    add_header_hd();
    add_list_hd(list_hd);
    add_page_hd(list_hd);
}

function xemhoadon_kh(obj,f){
    // Lấy danh sách hóa đơn theo khách hàng
    var list_hd = [];
    for (let i=0; i<data_kh.length; i++){
        if (obj==data_kh[i][1]){
            list_hd.push(data_kh[i][0]);
        }
    }
    refresh_xemhd();
    var frame_xemhd = document.createElement('div');
    frame_xemhd.style.width = "100%";
    frame_xemhd.id = "frame_xemhd";
    document.getElementsByClassName('table-content')[3].appendChild(frame_xemhd);

    add_header_hd();
    add_list_hd(list_hd,f);
    add_page_hd(list_hd);
}

// Header bảng hóa đơn
function add_header_hd(){
    var header_xemhd = document.createElement('h2');
    header_xemhd.style = "display: grid; place-items:center; margin-top: 20px";
    header_xemhd.textContent = "Xem hoá đơn";
    document.getElementById('frame_xemhd').appendChild(header_xemhd);

    var table_xemhd = document.createElement('div');
    table_xemhd.innerHTML = `
        <table class="table-header" style="margin-top: 5px">
            <tr>
                <!-- Theo độ rộng của table content -->
                <th title="Sắp xếp" style="width: 5%" >STT</th>
                <th title="Sắp xếp" style="width: 12%" >Mã đơn</th>
                <th title="Sắp xếp" style="width: 12%" >Khách hàng</th>
                <th title="Sắp xếp" style="width: 34%" >Địa chỉ</th>
                <th title="Sắp xếp" style="width: 15%" >Tổng tiền</th>
                <th title="Sắp xếp" style="width: 12%" >Ngày giờ</th>
                <th style="width: 10%">Hành động</th>
            </tr>
        </table>
    `;
    document.getElementById('frame_xemhd').appendChild(table_xemhd);
}

// Lập danh sách hóa đơn
function add_list_hd(list_hd,f){
    if(!f){
        for (let i=(num_page-1)*5; i<(num_page-1)*5+5 && i<list_hd.length; i++){
            for (let j=0; j<data_dh.length; j++){
                if (list_hd[i]==data_dh[j][0]){
                    var new_hoadon = document.createElement('div');
                    new_hoadon.className = "table-donhang";
                    new_hoadon.innerHTML = `
                        <div style="width: 5%">${j+1}</div>
                        <div style="width: 12%">${data_dh[j][0]}</div>
                        <div style="width: 12%">${data_dh[j][1]}</div>
                        <div style="width: 34%">${data_dh[j][2]}</div>
                        <div style="width: 15%">${data_dh[j][3]}</div>
                        <div style="width: 12%">${data_dh[j][4]}</div>
                        <div style="width: 10%">
                            <a onClick="xemchitiet_dh(this.closest('.table-donhang').children[1])">Xem chi tiết</a>
                        </div>
                    `;
                    document.getElementById('frame_xemhd').appendChild(new_hoadon);
                    break;
                }
            }
        }
    } else{
        for (let i=(num_page-1)*5; i<(num_page-1)*5+5 && i<list_hd.length; i++){
            for (let j=0; j<data_dh_temp.length; j++){
                if (list_hd[i]==data_dh_temp[j][0]){
                    var new_hoadon = document.createElement('div');
                    new_hoadon.className = "table-donhang";
                    new_hoadon.innerHTML = `
                        <div style="width: 5%">${j+1}</div>
                        <div style="width: 12%">${data_dh_temp[j][0]}</div>
                        <div style="width: 12%">${data_dh_temp[j][1]}</div>
                        <div style="width: 34%">${data_dh_temp[j][2]}</div>
                        <div style="width: 15%">${data_dh_temp[j][3]}</div>
                        <div style="width: 12%">${data_dh_temp[j][4]}</div>
                        <div style="width: 10%">
                            <a onClick="xemchitiet_dh(this.closest('.table-donhang').children[1])">Xem chi tiết</a>
                        </div>
                    `;
                    document.getElementById('frame_xemhd').appendChild(new_hoadon);
                    break;
                }
            }
        }
    }
}

// Phân trang
function add_page_hd(data){
    var page = document.createElement('div');
    page.id = "phan_trang";
    page.style.display = "grid";
    page.style.placeItems = "center";
    if (data.length <= 8) {
        page.innerHTML = `
            <nav>
                <ul class="pagination">
                    <li><a href="#" id="prev" style="pointer-events: none; color: gray;" onClick="change_page(-1)">&laquo; Trang trước</a></li>
                    <li id="current_page">1</li>
                    <li><a href="#" id="next" style="pointer-events: none; color: gray;" onClick="change_page(1)">Trang sau &raquo;</a></li>
                </ul>
            </nav>
        `;
    } else{
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
    document.getElementById('frame_xemhd').appendChild(page);
}

function xemchitiet_dh(id_donhang){
    // Lấy chi tiết đơn hàng
    var donhangDetails = [];
    for (let i=0; i<data_dh_chitiet.length; i++){
        if (data_dh_chitiet[i][0]==id_donhang.innerHTML){
            donhangDetails.push(data_dh_chitiet[i]);
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
    document.getElementsByClassName('table-content')[3].appendChild(model_ctdh);

    // Chi tiết đơn hàng
    for (let i=0; i<donhangDetails.length; i++){
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

function loc_thongkekh(date_start,date_end){
    var filtered_data_kh = [...data_kh];
    data_kh_temp = [];
    var filtered_data_dh = [...data_dh];
    data_dh_temp = [];
    // Lọc ngày bắt đầu
    if (date_start.value != ""){
        filtered_data_kh = filter_date_start(filtered_data_kh,date_start.value);
        filtered_data_dh = filter_date_start(filtered_data_dh,date_start.value);
    } 
    // Lọc ngày kết thúc
    if (date_end.value != ""){
        filtered_data_kh = filter_date_end(filtered_data_kh,date_end.value);
        filtered_data_dh = filter_date_end(filtered_data_kh,date_end.value);
    } 
    data_kh_temp = filtered_data_kh;
    data_dh_temp = filtered_data_dh;
    console.log(data_kh_temp);
    console.log(data_dh_temp);
    update_thongke('kh',true);
}

function filter_date_start(f_data,date_start){
    var f_date_start = new Date(date_start);
    f_date_start.setDate(f_date_start.getDate());
    return f_data.filter(row => {
        var dateStr = row[4]; 
        var dateObj = new Date(dateStr);
        return dateObj >= f_date_start;
    });
}

function filter_date_end(f_data,date_end){
    var f_date_end = new Date(date_end);
    f_date_end.setDate(f_date_end.getDate()+1);
    return f_data.filter(row => {
        var dateStr = row[4]; 
        var dateObj = new Date(dateStr);
        return dateObj <= f_date_end;
    });
}

