import * as Bridge from "./Bridge.js"
import { headerUserInfo, hiddenException } from "./Interface.js";

function validateAccount () {
  const loginForm = Bridge.$("#login-layout form");
  if (!loginForm) return;
  const email = Bridge.$("#customer-email-login");
  const password = Bridge.$("#customer-password-login");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const errorMessages = loginForm.querySelectorAll(".error-message");
  
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const user = users.find((user) => user.email.trim() === email.value.trim());
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
    sessionStorage.setItem("hasLogin", true);
    sessionStorage.setItem("hasLoginAccount", JSON.stringify(user));
    headerUserInfo(Bridge.default());
    hiddenException();
    loginForm.reset();
  });
}

export { validateAccount }