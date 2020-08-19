const url = "http://localhost:3000"
const user = {"id":1, "username":"Michael Scott", "password":"password1"}



function main(){
    autoPopup();
}

// background_color: paletteForm.bgColor.value,



function autoPopup(){
    let loginForm = document.getElementById("loginModal")
    let newLogin = {
      username: loginForm.username.value,
      password: loginForm.password.value  
    }
    prompt(loginForm)
}

// var person = prompt("Please enter your name", "Harry Potter");

// if (person == null || person == "") {
//   txt = "User cancelled the prompt.";
// } else {
//   txt = "Hello " + person + "! How are you today?";
// }