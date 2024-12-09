import * as Bridge from "./Bridge.js";

function validateRegister () {
  const registerForm = document.querySelector("#register-layout form");
  const firstName = Bridge.$("#customer-first-name");
  const lastName = Bridge.$("#customer-last-name");
  const email = Bridge.$("#customer-email-register");
  const password = Bridge.$("#customer-password-register");
  const confirmPassword = Bridge.$("#customer-confirm-password-register");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const emailExists = users.some((user) => user.email === email.value.trim());
  const errorMessages = registerForm.querySelectorAll(".error-message")

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();;
    for (let key in errorMessages) {
      if (emailExists) {
        errorMessages[key].innerHTML = "Email này đã tồn tại!";
        email.addEventListner("focus", () => errorMessages[key].innerHTML = "");
        return;
      }
  
      const passwordRegex = /^[a-zA-Z0-9 !@#$&*%]{8,20}$/;
      if (!passwordRegex.test(password.value)) {
        errorMessages[key].innerHTML = "Mật khẩu phải từ 8 ký tự trở lên";
        password.addEventListner("focus", () => errorMessages[key].innerHTML = "");
        return;
      }
  
      if (password.value !== confirmPassword.value) {
        errorMessages[key].innerHTML = "Mật khẩu không khớp!";
        errorMessages[++key].innerHTML = "Mật khẩu không khớp!";
        password.addEventListner("focus", () => errorMessages[key].innerHTML = "");
        confirmPassword.addEventListner("focus", () => errorMessages[key].innerHTML = "");
        return;
      }
    }

    firstName = firstName.value;
    lastName = lastName.value;
    email = email.value;
    password = password.value;
    const newUser = { firstName, lastName, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    registerForm.reset();
  });
}

export { validateRegister }