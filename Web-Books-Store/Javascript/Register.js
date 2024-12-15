import { showLogin } from "./Actions.js";
import * as Bridge from "./Bridge.js";

function validateRegister() {
  const registerForm = document.querySelector("#register-layout form");
  if (!registerForm) return;
  let nodeFirstName = Bridge.$("#customer-first-name");
  let nodeLastName = Bridge.$("#customer-last-name");
  let nodeEmail = Bridge.$("#customer-email-register");
  let nodePassword = Bridge.$("#customer-password-register");
  let confirmPassword = Bridge.$("#customer-confirm-password-register");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const emailExists = users.some((user) => user.email === nodeEmail.value.trim());
  const errorMessages = registerForm.querySelectorAll(".error-message");

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    for (let key in errorMessages) {
      if (emailExists) {
        errorMessages[key].innerHTML = "Email này đã tồn tại!";
        email.addEventListner("focus", () => (errorMessages[key].innerHTML = ""));
        return;
      }

      const passwordRegex = /^[a-zA-Z0-9 !@#$&*%]{8,20}$/;
      if (!passwordRegex.test(nodePassword.value)) {
        errorMessages[key].innerHTML = "Mật khẩu phải từ 8 ký tự trở lên";
        nodePassword.addEventListner("focus", () => (errorMessages[key].innerHTML = ""));
        return;
      }

      if (nodePassword.value !== confirmPassword.value) {
        errorMessages[key].innerHTML = "Mật khẩu không khớp!";
        errorMessages[++key].innerHTML = "Mật khẩu không khớp!";
        nodePassword.addEventListner("focus", () => (errorMessages[key].innerHTML = ""));
        confirmPassword.addEventListner("focus", () => (errorMessages[key].innerHTML = ""));
        return;
      }
    }

    const userID = generateId(users);
    let firstName = nodeFirstName.value;
    let lastName = nodeLastName.value;
    let email = nodeEmail.value;
    let password = nodePassword.value;
    const phone = "";
    const address = "";

    const newUser = {userID, firstName, lastName, email, password, phone, address};
    console.log(newUser);
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

function generateId(users) {
  const prefix = "KH";
  const existingIds = users.map((user) => {
    if (user.userID && typeof user.userID === "string" && user.userID.length > 2) {
      return parseInt(user.userID.slice(2)); 
    } else {
      return 0;
    }
  });
  const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0; 
  const newIdNumber = maxId + 1; 
  return prefix + newIdNumber.toString().padStart(3, "0"); 
}


export { validateRegister };
