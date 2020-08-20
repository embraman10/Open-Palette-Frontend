function main(){
    popLogin()

}

const loginForm = `
    <div class="modal fade" role="dialog" id="loginModal">
    <div class="modal-dialog">
        <div class="modal-header">
        <h3 class="modal-title">Open Palette Login</h3>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
        <form id="login" class="form-group">
            <input type="text" name="name" class="form-control" placeholder="Name" value="">
            <input type="text" name="username" class="form-control" placeholder="Username" value="">
            <input type="password" name="password" class="form-control" placeholder="Password" value="">
            <button id="login" type="submit" value="submit" class="btn btn-success">Sign In</button>
        </form>
        </div>
        <div class="modal-footer">
        </div>
    </div>
    </div>
`

function popLogin(){
    prompt(loginForm)
}

var person = prompt("Please enter your name", "Harry Potter");

if (person == null || person == "") {
  txt = "User cancelled the prompt.";
} else {
  txt = "Hello " + person + "! How are you today?";
}