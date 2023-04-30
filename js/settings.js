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



var chosed = false
var curr
var starship=1

function choosePlayer(el){
    if(!chosed){
        el.style.border="4px solid pink";
        chosed = true;
        curr = el;
        starship = curr.alt;
    }
    else{
        curr.style.border="0px solid blue";
        el.style.border="4px solid pink";
        curr = el;
        starship=curr.alt
    }


}

function shootKey(event){
    let Keyshoot = document.getElementById("shoot");
    if(event.which >= 65 && event.which <= 90 || event.which == 32){
        Keyshoot.value = event.code
        if(event.which ===32){
            Keyshoot.value = "Space"
        }
    }
    else{
        Keyshoot.value = "Space"
    }   
}