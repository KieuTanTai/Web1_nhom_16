# Web1_nhom_16 : BÁN SÁCH ( light novel, manga, văn học, ngoại ngữ, giáo dục....). Về mặt giao diện sẽ thiên về tính thực dụng và đơn giản hóa dễ nhìn sao cho user nhìn vào là thấy liền các chức năng cần thiết. (mọi người có ý kiến khác có thể hú trên discord nha).

1: web layout : grid system 1200px ( có sẵn file css Grid.css) 
* LƯU Ý : grid system KHÔNG PHẢI display: grid!!!

2: file CSS : file base.css có ghi sẵn các var (padding, margin, border-radius, font-size, font-family, main-color, ... sẽ được bàn bạc lại và chỉnh sửa sau).

3: tách từng chức năng js thành 1 module riêng ( học xong js tính sau :3 ).

4: index.html : main page và hiện đang có 1 số item là sách ngoại ngữ, light novel, manga, sách văn học (sẽ được chia loại và thêm vào sau).

5: responsive : file index.html đã được responsive 1 phần ( học grid system xong dễ responsive lắm mọi người).

6: folder Assets: 
     + folder CSS: file Style.css là chứa đa phần css của index.html, các chức năng nhỏ khác sẽ để 1 file css khác nhau (vấn đề này sẽ bàn lại sau). File Grid.css là file config grid system (source: F8), Base.css là file chứa các css cho class hoặc id độc lập (giông giống lúc dùng tailwinds hay bootstrap ấy).

     + folder Font: chứa các icon free của fontAwesome.
     
     + folder Images: chứa các file image của banner, tin tức, sách.... 

* LƯU Ý: tạm thời đừng đọc file JS vì các file này được viết lúc đang học nên không dùng cho đồ án (sẽ được sửa lại khi bắt đầu làm đồ án).

# QUAN TRỌNG : phần dùng github mình nghĩ mỗi người sẽ làm trên 1 branch riêng (nào test thấy không lỗi thì push vào branch main sau) + khi commit chí ít ghi commit file nào để còn dễ mò nha (tui chưa quen github lắm). 
------------------------------------------------------------------------------------------------------------------------------------------------
 * các thành viên trong nhóm sẽ phân chia nhau từng phần 1 để làm, tui chỉ làm phần khung để đỡ phần nào việc cho nhóm thôi (đống khung này mốt mọi người phân chia nhau cũng sửa lại à).

 * Trước mắt thì cứ vậy thôi mọi người học html css js nhớ học cả phần Grid System bên css nha (tin tui đi học được thì áp dụng nó sẽ dễ thở hơn là tự canh layout từng thành phần với responsive web cũng dễ thở hơn nữa).