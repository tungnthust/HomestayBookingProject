function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });


    document.getElementById("submitLogin").addEventListener("click", async (e) => {
        e.preventDefault();
        var username = document.getElementById('signinUsername').value;
        var password = document.getElementById('signinPassword').value;
     
        let jsonData = {
        "username": username,
        "password": password
          }
          console.log(JSON.stringify(jsonData));
      let data = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(jsonData),
        credentials: 'include',
      }).then((res) => {
          if(res.status == 403) {
            alert("Wrong password");
          }
          else {
            history.back();
        }
      })
    });

    document.getElementById("submitRegister").addEventListener("click", async(e) => {
        e.preventDefault();
        var username = document.getElementById('signupUsername').value;
        var email = document.getElementById('signupEmail').value;
        var phone = document.getElementById('signupPhone').value;
        var Fname = document.getElementById('signupFirstname').value;
        var Lname = document.getElementById('signupLastname').value;
        var pass = document.getElementById('signupPass').value;
        let jsonData = {
            "username": username,
            "email": email,
            "phone": phone,
            "first_name": Fname,
            "last_name": Lname,
            "password": pass
        }
        let data = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(jsonData),
        credentials: 'include',
      }).then((res) => {
          if(res.status == 403) {
              alert("Wrong password");
          }
          else {
            console.log("success");
            window.location.reload();
        }
      })
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
            if((document.getElementById('signupPassconfirm').value !== document.getElementById('signupPass').value) && document.getElementById('signupPassconfirm').value != ''){
                setInputError(inputElement, "Password does not match");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });


document.getElementById("login").addEventListener("click", async (e) => {
	
  
}
);

});