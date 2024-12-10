"use strict";

import * as Bridge from "./Bridge.js";

function updateHeaderOnLogin() {
  const noSignIn = document.querySelector("#no-sign-in");
  const headerUserInfo = document.querySelector(".header-user-info");
  const userNameElement = headerUserInfo.querySelector(".user-name");
  const navAccount = document.querySelector(".nav-account");
  const signOutBtn = navAccount.querySelector(".js-signout");
  const loginBtn = navAccount.querySelector(".js-login");
  const registerBtn = navAccount.querySelector(".js-register");

  // Lấy trạng thái đăng nhập từ localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    // Cập nhật giao diện khi đăng nhập
    noSignIn.classList.add("disable");
    headerUserInfo.classList.remove("disable");
    userNameElement.textContent = `${loggedInUser.firstName} ${loggedInUser.lastName}`;

    loginBtn.classList.add("disable");
    registerBtn.classList.add("disable");
    signOutBtn.classList.remove("disable");
  } else {
    // Cập nhật giao diện khi đăng xuất
    noSignIn.classList.remove("disable");
    headerUserInfo.classList.add("disable");
    userNameElement.textContent = "";

    loginBtn.classList.remove("disable");
    registerBtn.classList.remove("disable");
    signOutBtn.classList.add("disable");
  }
}

function handleRegisterEvent() {
  const registerForm = document.getElementById("register-layout");
  const registerButton = document.getElementById("register-btn");

  if (!registerForm || !registerButton) {
    console.error("Register form or button not found in DOM.");
    return;
  }

  registerButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form from submitting normally

    // Collect input values
    const lastName = document.getElementById("customer-last-name").value.trim();
    const firstName = document
      .getElementById("customer-first-name")
      .value.trim();
    const email = document
      .getElementById("customer-email-register")
      .value.trim();
    const password = document.getElementById(
      "customer-password-register"
    ).value;
    const confirmPassword = document.getElementById(
      "customer-confirm-password-register"
    ).value;

    // Validate inputs
    if (!lastName || !firstName || !email || !password || !confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    if (password.length < 8) {
      alert("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    // Mock API call or local storage save
    const newUser = { lastName, firstName, email, password };

    // Save to localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.email === email)) {
      alert("Email này đã được sử dụng.");
      return;
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");

    // Reset form
    registerForm.reset();
  });
}

function handleLoginEvent() {
  const loginForm = document.getElementById("login-layout");
  const loginButton = document.getElementById("login-btn");

  if (!loginForm || !loginButton) {
    console.error("Login form or button not found in DOM.");
    return;
  }

  loginButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form from submitting normally
    // Collect input values
    const email = document.getElementById("customer-email-login").value.trim();
    const password = document.getElementById("customer-password-login").value;

    // Validate inputs
    if (!email || !password) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Check credentials
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      alert("Email hoặc mật khẩu không đúng.");
      return;
    }

    // Save logged-in user to localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Đăng nhập thành công!");

    // Cập nhật header
    updateHeaderOnLogin();
  });
}

function handleLogoutEvent(elementsObj) {
  const signOutButtons = elementsObj.getJsSignoutBtn();

  signOutButtons?.forEach((btn) => {
    btn.addEventListener(
      "click",
      Bridge.throttle(
        () => {
          localStorage.removeItem("loggedInUser");
          alert("Bạn đã đăng xuất.");
          updateHeaderOnLogin();
        },
        200,
        "logout"
      )
    );
  });
}

export {
  handleRegisterEvent,
  handleLoginEvent,
  handleLogoutEvent,
  updateHeaderOnLogin,
};
