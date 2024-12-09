document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login-layout form");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("customer-email-login").value.trim();
    const password = document.getElementById("customer-password-login").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((user) => user.email === email);

    if (!user) {
      alert("Tài khoản không tồn tại!");
      return;
    }

    if (user.password !== password) {
      alert("Mật khẩu không đúng!");
      return;
    }

    alert(`Đăng nhập thành công! Chào mừng ${user.firstName} ${user.lastName}`);
    loginForm.reset();
  });
});
