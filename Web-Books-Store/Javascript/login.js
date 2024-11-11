document.addEventListener("DOMContentLoaded", () => {
  window.handleLogin = (event) => {
    event.preventDefault();
    const email = document.getElementById("customer-email-login").value.trim();
    const password = document.getElementById("customer-password-login").value;
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((errorMessage) => {
      errorMessage.textContent = "";
    });
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      alert(
        `Chào mừng ${user.firstName} ${user.lastName}! Đăng nhập thành công.`
      );
      window.location.href = "/Web-Books-Store/HTML/index.html";
    } else {
      document.querySelector(".js-pass-login .error-message").textContent =
        "Email hoặc mật khẩu không chính xác.";
    }
  };
  const loginForm = document.querySelector("#login-layout form");
  loginForm.onsubmit = handleLogin;
});
