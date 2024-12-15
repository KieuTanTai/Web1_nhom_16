import * as Bridge from "./Bridge.js"
import { headerUserInfo, hiddenException } from "./Interface.js";

function validateAccount () {
  const loginForm = Bridge.$("#login-layout form");
  if (!loginForm) return;
  const email = Bridge.$("#customer-email-login");
  const password = Bridge.$("#customer-password-login");
  const errorMessages = loginForm.querySelectorAll(".error-message");
  
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email.trim() === email.value.trim());
      if (!user) {
        errorMessages[0].innerHTML = "Tài khoản không tồn tại!";
        email.addEventListener("focus", () => errorMessages[key].innerHTML = "");
        return;
      }
  
      if (user.password !== password.value) {
        errorMessages[1].innerHTML = "Mật khẩu không đúng!";
        password.addEventListener("focus", () => errorMessages[key].innerHTML = "");
        return;
      }
 
    alert(`Đăng nhập thành công! Chào mừng ${user.lastName} ${user.firstName}`);
    sessionStorage.setItem("hasLogin", true);
    sessionStorage.setItem("hasLoginAccount", JSON.stringify(user));
    headerUserInfo(Bridge.default());
    hiddenException();
    loginForm.reset();
  });
}

export { validateAccount }