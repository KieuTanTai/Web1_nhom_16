// render DOM
// render account.html DOM 
async function accountDOMHandler (request) {
     try {
          const accountDOM = await promiseDOMHandler("../Account/account.html");
          const accountTitle = accountDOM.querySelector("title");
          let loginHTML = accountDOM.getElementById("login");
          let signupHTML = accountDOM.getElementById("sign-up");
          let forgotPassHTML = accountDOM.getElementById("forgot-password");
          const accountContent = accountDOM.getElementById("main-content");
          const elementsObj = getElementsHandler();
          let placeInsert = Array.from(elementsObj.getMainContainer().children).find((element) => element.id === "main-content");
          const webContent = elementsObj.getWebContent();

          if ((placeInsert === undefined) && (request === undefined))
               throw new Error(`your place you wanna insert is ${placeInsert}!`);

          if (request === "login") {
               accountTitle.innerText = "Đăng Nhập";
               query("title").innerText = accountTitle.innerText;
               webContent.scrollIntoView({ behavior: "instant", block: "start", inline: "nearest" });

               // check if login form have active or not
               loginHTML = checkActiveHTML(loginHTML, signupHTML, forgotPassHTML);
               placeInsert.innerHTML = accountContent.innerHTML;
          }
          else if (request === "register") {
               accountTitle.innerText = "Đăng Ký";
               query("title").innerText = accountTitle.innerText;
               webContent.scrollIntoView({ behavior: "instant", block: "start", inline: "nearest" });

               // check if signup form have active or not
               signupHTML = checkActiveHTML(signupHTML, loginHTML, forgotPassHTML);
               placeInsert.innerHTML = accountContent.innerHTML;
          }
     }
     catch (error) {
          alert(`something went wrong! \n${error}`);
     }
}
