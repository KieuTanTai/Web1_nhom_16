import * as Bridge from "./Bridge.js"

function validateAccount () {
  const loginForm = Bridge.$("#login-layout form");
  if (!loginForm) return;
  const email = Bridge.$("#customer-email-login");
  const password = Bridge.$("#customer-password-login");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.email === email.value.trim());
  const errorMessages = loginForm.querySelectorAll(".error-message");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    for (let key in errorMessages) {
      if (!user) {
        errorMessages[key].innerHTML = "Tài khoản không tồn tại!";
        email.addEventListener("focus", () => errorMessages[key].innerHTML = "");
        return;
      }
  
      if (user.password !== password.value) {
        errorMessages[key].innerHTML = "Mật khẩu không đúng!";
        password.addEventListener("focus", () => errorMessages[key].innerHTML = "");
        return;
      }
    }
 
    alert(`Đăng nhập thành công! Chào mừng ${user.firstName} ${user.lastName}`);
    loginForm.reset();
  });
}

export { validateAccount }