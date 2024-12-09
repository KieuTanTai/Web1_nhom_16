document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector("#register-layout form");

  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const firstName = document
      .getElementById("customer-first-name")
      .value.trim();
    const lastName = document.getElementById("customer-last-name").value.trim();
    const email = document
      .getElementById("customer-email-register")
      .value.trim();
    const password = document.getElementById(
      "customer-password-register"
    ).value;
    const confirmPassword = document.getElementById(
      "customer-confirm-password-register"
    ).value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
      alert("Email này đã tồn tại!");
      return;
    }

    const passwordRegex = /^[a-zA-Z0-9]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Mật khẩu phải từ 8 ký tự trở lên, chỉ gồm chữ và số.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    const newUser = { firstName, lastName, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công!");
    registerForm.reset();
  });
});
