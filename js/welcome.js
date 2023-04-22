



//navigation bar objects



//welcome page objects
const welcomePage = document.getElementById("welcomePage");
const signUpButton = document.getElementById("signUpButton");
const LoginButton = document.getElementById("LoginButton");


//sign up form page object
const signUpForm = document.getElementById("signUpForm");
const loginForm = document.getElementById("loginForm");


/*--------------sign up popUp menu----------------------
document.querySelector("#signUpButton").addEventListener("click", function(){
    document.querySelector(".popup").classList.add("active");
});


document.querySelector(".popup .close-btn").addEventListener("click",function(){
    document.querySelector(".popup").classList.remove("active");
});*/
//---------------------------------------------------------------------


//todo = > do a list for all divs with document. and use it in this function
function swhichToDiv(divToSwitch) { //this is the main function that control the divs switching
    dictOfAllDivs = ["welcomePage", "signUpForm", "settingsDiv", "loginForm"] //ADD more dives!!
    for(let i=0; i<dictOfAllDivs.length; i++) {
        document.getElementById(dictOfAllDivs[i]).style.display = "none"
    }
    document.getElementById(divToSwitch).style.display="block"
    //divToSwitch.style.display="block"
  }



  //-------------------------------------------------------------welcome page events & buttons-------------------------------------------------------------------------------------------------
  signUpButton.addEventListener("click", function() {swhichToDiv('signUpForm')}, false);
  loginForm.addEventListener("click", function() {swhichToDiv('loginForm')}, false);





 








// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------