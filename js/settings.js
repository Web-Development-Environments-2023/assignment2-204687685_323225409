const accordion = document.querySelectorAll(".contentBx")

// accordion.forEach((question) => {
//     accordion.addEventListener("click", () => {
//         accordion.classList.toggle("active")
//     })
// })

for (i=0; i<accordion.length; i++){
    accordion[i].addEventListener('click', function() {
        this.classList.toggle("active")

    })
}


function showGameFromSettings(){
    $("#settingsDiv").hide()
    $("#gameDiv").show()
}
// document.querySelector(".kbrd").addEventListener('change', (e) => {
    
//     console.log(e.currentTarget.value)
   
//  });