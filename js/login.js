

const loginSubmmition = document.getElementById("loginSubmmition");

//   ---------------------------------------------------------------funcions for login----------------------------------------------------------------------------------------

function submitLogin(){ 
    let userName = $("#loginUserName").val();
    let password = $("#loginPassword").val();
    currLogged = userName;
    if (userName in registeredUsers){
        if(registeredUsers[userName] == password){
            loginSubmmition.addEventListener("click", function() {swhichToDiv('settingsDiv')}, false)
            // submitHandler:{
            //     $('#loginForm').fadeOut();
            //     $('#settingsDiv').delay(550).show(0);
            // }
            
        }
        else{
            alert("wrong password")
        }
    }
    else{
        alert("user name not found")
    }
    return false;
}