import EnemyController from "./EnemyController.js"
import Player from "./Player.js"
import BulletController from "./BulletController.js"




var intervalTimer= setInterval(game, 1000/60)



hideAll()
function hideAll(){
    // $("#settingsDiv").hide()
    // $("#gameDiv").show()
    // $("#footer").hide()
    // $("#logo").hide()

}




const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext("2d")


const mute = document.querySelector('.speaker')//mute button
const keyboard= document.querySelector(".kbrd")//key shoot


canvas.width = innerWidth 
canvas.height = innerHeight



const background = new Image() 
background.style.color = 'transparent'


let mySound = new Audio('/media/music2.mp3')
mySound.volume=0.1

let playerDead=new Audio("/media/deadSound.mp3")
playerDead.volume=0.9


var keyShoot="Space"

document.querySelector(".kbrd").addEventListener('input', (e) => {
    
    keyShoot=e.currentTarget.value
    player.setVal(keyShoot)
    
 });

 


//control the bullets of player - color and amount. truc\false=sound
const playerBulletController = new BulletController(canvas, 20, "yellow", true)
//control the bullets of invaders - color and amount. truc\false=sound
const enemyBulletController = new BulletController(canvas, 1, "red", false)


//instance of enemy
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController)
const player = new Player(canvas, 3, playerBulletController,keyShoot)
let newPlayerPositionX = player.x


let isGameOver = false
let didWin = false

let option1=false//ani
let option2=false//ani
let option3=false//ani



//timer vars
var timeLimit =120
var start_time
var time_elapsed

start_time = new Date()


// controling the sound in the game
mute.addEventListener('click', function() {
  if(mySound.muted==true){
    mySound.muted=false
    playerDead.muted=false
    playerBulletController.shootSound.muted=false
    enemyController.enemyDeathSound.muted=false
  }
  else{
    mySound.muted=true
    playerDead.muted=true
    playerBulletController.shootSound.muted=true
    enemyController.enemyDeathSound.muted=true 
  }
  
  })

  var inputFieldTime = document.querySelector(".timeSettings");//take the time from the input and set the time limit 
  
  inputFieldTime.addEventListener("input", function() {
      if(inputFieldTime.value>2 && inputFieldTime.value<=9){
          timeLimit = inputFieldTime.value*60;
              
      }      
  });



  var inputFieldAudio = document.querySelector(".soundSlider");//take the volume from the input and set the volume 

    inputFieldAudio.addEventListener("input", function() {
    mySound.volume=inputFieldAudio.value/100
    
  
    });



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
        //mySound.play()

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


let every5limit=0
// make the enemies move faster every 5 seconds
function fasterIn5Seconds() {
    // Code to be executed every 5 seconds
    if (every5limit>=4){
        clearTimeout(timeout5sec)
        return
    }
    enemyController.moveFaster()
    every5limit+=1
    setTimeout(fasterIn5Seconds, 5000)
    
  }
  
  let timeout5sec=setTimeout(fasterIn5Seconds, 5000);
  


function checkGameOver() { //this function checks if bullets hit the player - if so ->game is over
    if (isGameOver) {
        lblTime.value=0

        return
    }
  
    if (enemyBulletController.collideWith(player)) { //update lives and game over
        player.lives--
        playerDead.play()//player dead sound

    
        if(player.lives <=0){//hosafti ifim
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




function displayGameOver() {
    if (isGameOver) {
        mySound.pause();
        if (option1){
            timeLimit=0

            // let text = "You Lost" 
            // let textOffset = 5
        
            // ctx.fillStyle = "#ff68c3"
            // ctx.font = "70px Arial"
            // ctx.fillText(text, canvas.width / textOffset, canvas.height / 2)
            document.getElementById("WinloseTxt").innerHTML = "You Lost"
            moveDivEnd()

        }
        if(option2){
            // let text = "Winner" 
            // let textOffset = 5
        
            // ctx.fillStyle = "#ff68c3"
            // ctx.font = "70px Arial"
            // ctx.fillText(text, canvas.width / textOffset, canvas.height / 2)
            document.getElementById("WinloseTxt").innerHTML = "Winner!";
            moveDivEnd()
        }
        if(option3){
            // let text = "You can do better" 
            // let textOffset = 5
        
            // ctx.fillStyle = "#ff68c3"
            // ctx.font = "70px Arial"
            // ctx.fillText(text, canvas.width / textOffset, canvas.height / 2)

            document.getElementById("WinloseTxt").innerHTML = "You can do better";
            moveDivEnd()
        }
        if(didWin){
            // let text = "Champion" 
            // let textOffset = 5
        
            // ctx.fillStyle = "#ff68c3"
            // ctx.font = "70px Arial"
            // ctx.fillText(text, canvas.width / textOffset, canvas.height / 2)

            document.getElementById("WinloseTxt").innerHTML = "Champion!";
            moveDivEnd()
        }
        insertTable()
        window.clearInterval(intervalTimer)
      
    }
}

var i = 0

function insertTable(){


    var table = document.querySelector('.fl-table')

    // var table = document.getElementById('.fl-table');

    var date = new Date().toLocaleString()
    console.log('date:' + date)
    
    var playerName = lblUser.value
    console.log('name:' + playerName)

    var scoress = enemyController.score
    console.log('score from label:' + scoress)

    
    const newRow = table.insertRow();
    const rankCell = newRow.insertCell();
    const nameCell = newRow.insertCell();
    const scoreCell = newRow.insertCell();
    const dateCell = newRow.insertCell();

    rankCell.innerText = i + 1;
    nameCell.innerText = playerName
    scoreCell.innerText =scoress;
    dateCell.innerText = date;
    
}






function moveDivEnd(){
    //stop game function
    $("#gameDiv").hide()
    $("#EndGame").show()

}


