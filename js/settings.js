const accordion = document.querySelectorAll(".contentBx")



for (i=0; i<accordion.length; i++){
    accordion[i].addEventListener('click', function() {
        this.classList.toggle("active")

    })
}


function showGameFromSettings(){
    $("#settingsDiv").hide()
    $("#signUpForm").hide()
    $("#welcomePage").hide()
    $("#settingsDiv").hide()
    $("#EndGame").hide()
    $("#loginForm").hide()
    $("#footer").hide()

    $("#gameDiv").show()
}
