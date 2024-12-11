const getItemFromLocalStorage = (key) => localStorage.getItem(key) && JSON.parse(localStorage.getItem(key));
const setItemFromLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const loginComponent = document.querySelector(".login-component");
const body = document.querySelector(".body");
const adminAccount = {username: "admin", password: "123"};
const BookModel = class {
    constructor(
      productID,
      img,
      name,
      author,
      sale,
      price,
      quantity,
      release,
      format,
      type,
      genre,
      packagingSize,
      category,
      description
    ) {
      this.productID = productID;
      this.img = img;
      this.name = name;
      this.author = author;
      this.sale = sale;
      this.price = price;
      this.quantity = quantity;
      this.release = release;
      this.format = format;
      this.type = type;
      this.genre = genre;
      this.packagingSize = packagingSize;
      this.category = category;
      this.description = description;
    }
  };
  
// Check login
(() => {
        const isAdminLoggedIn = JSON.parse(localStorage.getItem("isAdminLoggedIn"));
        if (!isAdminLoggedIn)
            body.style.display = "none";
        else
            loginComponent.style.display = "block"; 
})();

// Seed products
(async ()=> {
    if (!getItemFromLocalStorage("products"))
        await storeProducts();
})()

// Login
const login = () => {
    const handleValidation = () => {
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        const usernameError = document.querySelector(".username-error");
        const passwordError = document.querySelector(".password-error")
        
        if (username !== adminAccount.username) {
            usernameError.textContent = "Username not found.";
            usernameError.style.color = "red";
            return false;
        }
        usernameError.textContent = "";
        usernameError.style.color = "";

        if (password !== adminAccount.password) {
            passwordError.textContent = "Password is incorrect.";
            passwordError.style.color = "red";
            return false;
        }
        passwordError.textContent = "";
        passwordError.style.color = "";

        return true;
    }

    if (handleValidation()) {
        localStorage.setItem("isAdminLoggedIn", true);
        window.location.reload();
    }
}
document.querySelector(".login-btn").addEventListener("click", login);

// Logout
const logout = () => {
    localStorage.setItem("isAdminLoggedIn", false);
    window.location="index.html";
}
document.querySelector(".logout-btn").addEventListener("click", logout);

// Store products
async function storeProducts () {
    try {
        const storage = await fetch("../Javascript/Storage.js");
        const jsonArray = await storage.json();
        const productsList = Array.from(jsonArray);
        localStorage.setItem("products", JSON.stringify(productsList));
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Add
const handleAddBook = () => {
}
handleAddBook();

// Update

// Delete

// Search

// Show products table
const productNavItem = document.querySelector(".opensanpham");
const productConponent = document.querySelector(".sanpham");
const showProductTable = () => {
    if (productConponent) {
        productConponent.style.display="block";
        showProductContent();
    }

    function showProductContent () {
        const tableContent =  productConponent.querySelector("tbody");
        const products = getItemFromLocalStorage("products");
        console.log(products)
        const content = products.map(product =>{
            return `
                <tr>
                    <td title="Sắp xếp" >${product.productID}</td>
                    <td title="Sắp xếp" >${product.name}</td>
                    <td title="Sắp xếp" >${product.author}</td>
                    <td title="Sắp xếp" >${product.sale}</td>
                    <td title="Sắp xếp" >${product.price}</td>
                    <td title="Sắp xếp" >${product.quantity}</td>
                    <td title="Sắp xếp" >${product.release}</td>
                    <td title="Sắp xếp" >${product.type}</td>
                    <td title="Sắp xếp" >${product.genre}</td>
                </tr>`
        });
        content.unshift('<table>');
        content.push('</table>');
        tableContent.innerHTML = content;
    }
}

productNavItem.addEventListener("click", showProductTable)

