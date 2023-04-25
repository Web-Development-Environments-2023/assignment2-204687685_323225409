export default class Player {


    rightPressed = false
    leftPressed = false

    upPressed = false
    downPressed = false

    shootPressed = false
    
   

    

    constructor(canvas, velocity, bulletController,keyShoot){
        this.canvas = canvas
        this.velocity = 7 //need to increase the speed
        this.bulletController = bulletController;
        this.lives = 3
        //this.x = this.canvas.width / 2
        this.x = Math.floor(Math.random()*(canvas.width-70))

        this.y = this.canvas.height - 100
        //Math.floor(Math.random()*(canvas.width-70))

        this.width = 75;
        this.height = 100;
        this.image = new Image();
        this.image.src = "media/player1.png"
        this.keyShoot=keyShoot
        console.log(this.keyShoot)
        

        document.addEventListener("keydown", this.keydown)
        document.addEventListener("keyup", this.keyup)
       
        

    }
   


    draw(ctx){
      // console.log(this.keyShoot)
        if (this.shootPressed) {
            this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
        }
        this.move()
        this.collideWithWalls()
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)

    }


    move() {
        if (this.rightPressed) {
          this.x += this.velocity;
        } else if (this.leftPressed) {
          this.x += -this.velocity;
        }
        if (this.downPressed) {
            this.y += this.velocity;
          } else if (this.upPressed) {
            this.y += -this.velocity;
          }
    }



    collideWithWalls() { //here we detemine the player border on screen
        //left
        if (this.x < 0) {
          this.x = 0;
        }
    
        //right
        if (this.x > this.canvas.width - this.width) {
          this.x = this.canvas.width - this.width;
        }

        //up 40% of screen
        if (this.y < (this.canvas.height - this.height)*0.6) {
            this.y = (this.canvas.height - this.height)*0.6;
          }

        //down
        if (this.y > this.canvas.height - this.height) {
            this.y = this.canvas.height - this.height;
          }
      }


      


    keydown = (event) => { //when user actually press on key in keyboard
      
        if (event.code == "ArrowRight") {
          this.rightPressed = true
        }
        if (event.code == "ArrowLeft") {
          this.leftPressed = true
        }
        if (event.code == "ArrowUp") {
            this.upPressed = true
          }
          if (event.code == "ArrowDown") {
            this.downPressed = true
          }
          console.log(this.keyShoot)

        if (event.code == this.keyShoot) {
          this.shootPressed = true
        }
      }
    
      keyup = (event) => {
        if (event.code == "ArrowRight") {
          this.rightPressed = false
        }
        if (event.code == "ArrowLeft") {
          this.leftPressed = false;
        }
        if (event.code == "ArrowUp") {
            this.upPressed = false
          }
          if (event.code == "ArrowDown") {
            this.downPressed = false
          }
        if (event.code == this.keyShoot) {
          this.shootPressed = false
        }
      }



      

}