import EnemyController from "./EnemyController.js"
import Player from "./Player.js"
import BulletController from "./BulletController.js"

const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext("2d")
//const lblScore = document.getElementById('lblScore')
// const lblLife = document.getElementById('lblLife')


canvas.width = innerWidth 
canvas.height = innerHeight



const background = new Image() 
// background.src = "media/space.png"

background.style.color = 'transparent'

let mySound = new Audio('/media/music2.mp3')
mySound.volume=0.3
const countdown = document.createElement('div');



//control the bullets of player - color and amount. truc\false=sound
const playerBulletController = new BulletController(canvas, 20, "yellow", true)
//control the bullets of invaders - color and amount. truc\false=sound
const enemyBulletController = new BulletController(canvas, 1, "red", false)


//instance of enemy
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController)
const player = new Player(canvas, 3, playerBulletController)
let newPlayerPositionX = player.x


let isGameOver = false
let didWin = false

let option1=false//ani
let option2=false//ani
let option3=false//ani


//timer vars
var timeLimit =8
var start_time
var time_elapsed

var intervalTimer
start_time = new Date()


//draw the  whole game
function game() {
    
    checkTimeLimit()
    checkGameOver()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    displayGameOver()
    

    if (!isGameOver){
        drawAllGame()
    }
}


function drawAllGame(){ // till game is on we continue draw it all
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height) 
    enemyController.draw(ctx)
        player.draw(ctx)
        playerBulletController.draw(ctx)
        enemyBulletController.draw(ctx)
        mySound.play()

        lblScore.value = enemyController.score
        lblLife.value = player.lives

        lblTime.value = (timeLimit - time_elapsed).toPrecision(3) 
        if (lblTime.value <= 0){
            lblTime.value = 0.000
            timeLimit=0
        }
}


//coundown the game time
function checkTimeLimit(){
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (time_elapsed >= timeLimit){
        isGameOver = true
	}
}







function checkGameOver() { //this function checks if bullets hit the player - if so ->game is over
    if (isGameOver) {

        return
    }
  
    if (enemyBulletController.collideWith(player)) { //update lives and game over
        player.lives--
    
        if(player.lives <=0){//hosafti ifim
            isLivesOver = true
            isGameOver = true
            option1=true//ani
        }
        player.x = newPlayerPositionX
    }
    

    if ((timeLimit-time_elapsed)<=0.02){
        if (enemyController.score>=100){
            isGameOver=true
            option2=true
            
            
        }
        else{
            isGameOver=true
            option3=true
        }
    }
    
    if (enemyController.enemyRows.length === 0) {
      didWin = true
      isGameOver = true
      timeLimit=0
    }

  
}

function stopAudio() {
    mySound.pause(); // Pause the audio
    mySound.currentTime = 0; // Reset the audio to the beginning
  }


function displayGameOver() {
    if (isGameOver) {
        mySound.stopAudio
        if (option1){
            timeLimit=0

            let text = "You Lost" 
            let textOffset = 5
        
            ctx.fillStyle = "#ff68c3"
            ctx.font = "70px Arial"
            ctx.fillText(text, canvas.width / textOffset, canvas.height / 2)

        }
        if(option2){
            let text = "Winner" 
            let textOffset = 5
        
            ctx.fillStyle = "#ff68c3"
            ctx.font = "70px Arial"
            ctx.fillText(text, canvas.width / textOffset, canvas.height / 2)
            
        }
        if(option3){
            let text = "You can do better" 
            let textOffset = 5
        
            ctx.fillStyle = "#ff68c3"
            ctx.font = "70px Arial"
            ctx.fillText(text, canvas.width / textOffset, canvas.height / 2)
        }
        if(didWin){
            let text = "Champion" 
            let textOffset = 5
        
            ctx.fillStyle = "#ff68c3"
            ctx.font = "70px Arial"
            ctx.fillText(text, canvas.width / textOffset, canvas.height / 2)
        }
      
    }
}



//control the intervals per second of the game
intervalTimer = setInterval(game, 1000/60)





// function endGame() {
//     console.log("WTF?????????????????????????????????????????")
//     $("#gameDiv").hide();
// 	$("#signUpPage").show();


// }
  


