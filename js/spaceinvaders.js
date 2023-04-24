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
let isLivesOver = false
let isTimeOver = false
let option1=false//ani
let option2=false//ani
let option3=false//ani


//timer vars
var timeLimit =8
var start_time
var time_elapsed
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




function displayGameOver() {
    if (isGameOver) {
        mySound.pause()
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

    // if(isLivesOver && isGameOver ){
    //     let text = "You Lost"
    //     // let textOffset =  3.5 : 5
    
    //     ctx.fillStyle = "white"
    //     ctx.font = "70px Arial"
    //     ctx.fillText(text, canvas.width , canvas.height / 2)

    // }
}


// function displayGameOver() {
//     if (isGameOver) {
//       let text = didWin ? "You Win" : "Game Over" 
//       let textOffset = didWin ? 3.5 : 5
  
//       ctx.fillStyle = "white"
//       ctx.font = "70px Arial"
//       ctx.fillText(text, canvas.width / textOffset, canvas.height / 2)
//     }
// }


  


//control the intervals per second of the game
setInterval(game, 1000/60)















/* thid code is thr video----------------------------------------------------------------------------------

//const canvas2 = document.querySelector('gameCanvas');
const canvas = document.getElementById('gameCanvas')
const c = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight
//canvas.width = 1000
//canvas.height = 560

//canvas.style.width='100%'


//--------------player class- all settings about the player------------------------------------------------------

class Player{
    constructor(){ //player constractor
        
        this.velocity={ //speed of what?
            x:0,
            y:0
        }

        const image= new Image() // we add image as a player 
        image.src = './media/player.png'
       
        image.onload = () => { //this section control the start posion of player and appearance
            const scale = 0.15

            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale

            this.position={ //random
                x: Math.floor(Math.random()*(canvas.width-70)),
                y:canvas.height-100.9
            }
        }
        
    }

    drawPlayer() { //thsi func draws the player on screen
        //c.fillStyle = 'red'
       // c.fillRect(this.position.x, this.position.y, this.width, this.height)
       if(this.image){
            c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
       }

    }
    update () {
        if(this.image){
            this.drawPlayer()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
        
    }
}
//------------------------------------------------------
const player = new Player()
const keys = {
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    }
}
//player.drawPlayer()

function animate() { //animate the player on screen
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update()

    if(keys.ArrowLeft.pressed) {
        player.velocity.x = -8
    } else {
        player.velocity.x=0
    }
}

animate()

addEventListener('keydown', ({ key }) => {
    switch(key) {
        case 'ArrowLeft':
            console.log('left')
            player.velocity.x = -8
            keys.ArrowLeft.pressed = true
            break
        case 'ArrowRight':
            console.log('right')
            player.velocity.x = 8
            keys.ArrowRight.pressed = true
            break
        case 'ArrowUp':
            console.log('up')
            player.velocity.y = -8
            keys.ArrowUp.pressed = true
            break
        case 'ArrowDown':
            console.log('down')
            player.velocity.y = 8
            keys.ArrowDown.pressed = true
            break

        case ' ': 
            console.log('space')
                break


    }
})


//---------------------------------------------------------------------------------------
*/