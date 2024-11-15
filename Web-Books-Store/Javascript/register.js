document.addEventListener("DOMContentLoaded", () => {
  window.handleRegister = (event) => {
    event.preventDefault();
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
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((errorMessage) => {
      errorMessage.textContent = "";
    });
    if (password !== confirmPassword) {
      document.querySelector(
        ".js-confirm-pass-register .error-message"
      ).textContent = "Mật khẩu xác nhận không khớp.";
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      document.querySelector(".js-email-register .error-message").textContent =
        "Email không hợp lệ.";
      return;
    }
    const userData = {
      lastName,
      firstName,
      email,
      password,
    };
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công!");
    window.location.href = "/Web-Books-Store/HTML/account/login.html";
  };
});
