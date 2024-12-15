import { showLogin } from "./Actions.js";
import * as Bridge from "./Bridge.js";

function validateRegister() {
  const registerForm = document.querySelector("#register-layout form");
  if (!registerForm) return;
  let firstName = Bridge.$("#customer-first-name");
  let lastName = Bridge.$("#customer-last-name");
  let email = Bridge.$("#customer-email-register");
  let password = Bridge.$("#customer-password-register");
  let confirmPassword = Bridge.$("#customer-confirm-password-register");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const emailExists = users.some((user) => user.email === email.value.trim());
  const errorMessages = registerForm.querySelectorAll(".error-message");

  function generateId() {
    const prefix = "U";
    const existingIds = users.map((user) => parseInt(user.id.slice(1))); // Lấy tất cả số ID hiện có
    const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0; // Lấy ID lớn nhất hoặc 0 nếu chưa có
    const newIdNumber = maxId + 1; // Tăng ID lên 1
    return prefix + newIdNumber.toString().padStart(3, "0"); // Format ID mới
  }

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    for (let key in errorMessages) {
      if (emailExists) {
        errorMessages[key].innerHTML = "Email này đã tồn tại!";
        email.addEventListner(
          "focus",
          () => (errorMessages[key].innerHTML = "")
        );
        return;
      }

      const passwordRegex = /^[a-zA-Z0-9 !@#$&*%]{8,20}$/;
      if (!passwordRegex.test(password.value)) {
        errorMessages[key].innerHTML = "Mật khẩu phải từ 8 ký tự trở lên";
        password.addEventListner(
          "focus",
          () => (errorMessages[key].innerHTML = "")
        );
        return;
      }

      if (password.value !== confirmPassword.value) {
        errorMessages[key].innerHTML = "Mật khẩu không khớp!";
        errorMessages[++key].innerHTML = "Mật khẩu không khớp!";
        password.addEventListner(
          "focus",
          () => (errorMessages[key].innerHTML = "")
        );
        confirmPassword.addEventListner(
          "focus",
          () => (errorMessages[key].innerHTML = "")
        );
        return;
      }
    }

    const id = generateId();
    firstName = firstName.value;
    lastName = lastName.value;
    email = email.value;
    password = password.value;
    const phone = "";
    const address = "";

    const newUser = {
      id,
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    registerForm.reset();

    let loginForm = Bridge.$("#login");
    let registForm = Bridge.$("#register");
    let forgotForm = Bridge.$("#forgot-password");
    showLogin(loginForm, registForm, forgotForm);
  });
}

export { validateRegister };
