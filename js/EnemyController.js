import Enemy from "./Enemy.js"
import MovingDirection from "./MovingDirection.js"

export default class EnemyController{

    enemyMap = [
        [4,4,4,4,4],
        [3,3,3,3,3],
        [2,2,2,2,2],
        [1,1,1,1,1],
    ]

    enemyRows = []

    //controll the movement of invaders
    currentDirection = MovingDirection.right
    xVelocity = 0
    yVelocity = 0
    defaultXVelocity = 3
    defaultYVelocity = 1
    
    fireBulletTimerDefault = 100 //control the time of enemy shooting
    fireBulletTimer = this.fireBulletTimerDefault



    constructor(canvas, enemyBulletController, playerBulletController){
        this.canvas = canvas
        this.enemyBulletController = enemyBulletController
        this.playerBulletController = playerBulletController

        this.enemyDeathSound = new Audio("media/shoot2.mp3");
        this.enemyDeathSound.volume = 0.9;

        this.createEnemies()

        this.canvasHeight = canvas.height
    }

    


    draw(ctx){
        this.updateVelocityAndDirection()
        this.collisionDetection() //collision of bullets
        this.drawEnemies(ctx)
        this.fireBullet()

    }




    collisionDetection() {
        this.enemyRows.forEach((enemyRow) => {
          enemyRow.forEach((enemy, enemyIndex) => {
            if (this.playerBulletController.collideWith(enemy)) {
              this.enemyDeathSound.currentTime = 0;
              this.enemyDeathSound.play();
              enemyRow.splice(enemyIndex, 1);
            }
          });
        });
    
        this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0); //ypdate the list and remove the dead wnwmy from it
      }




    fireBullet() {
        //this.fireBulletTimer = (this.yVelocity) / (this.canvasHeight)*0.6 
        //console.log(this.fireBulletTimer)
        this.fireBulletTimer--
        if (this.fireBulletTimer <= 0) {
          this.fireBulletTimer = this.fireBulletTimerDefault
          const allEnemies = this.enemyRows.flat()
          const enemyIndex = Math.floor(Math.random() * allEnemies.length)
          const enemy = allEnemies[enemyIndex]
          this.enemyBulletController.shoot(enemy.x + enemy.width / 2, enemy.y, -3) //random index for which enemy shoot
        }
      }



    updateVelocityAndDirection(){ //control the direction movement of enemies
        for (const enemyRow of this.enemyRows){
            if (this.currentDirection == MovingDirection.right){
                this.xVelocity = this.defaultXVelocity
                this.yVelocity = 0
                const rightMostEnemy = enemyRow[enemyRow.length - 1] //hold the most right enemy in zv line
                if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width){ //if the most right enemy go over thr right side of canvas so we momve it down
                    this.currentDirection = MovingDirection.left
                    break;
                } 
            } else if (this.currentDirection === MovingDirection.left){
                //this.xVelocity = 0
                this.xVelocity = -this.defaultXVelocity
                const leftMostEnemy = enemyRow[0];
                if (leftMostEnemy.x <= 0) {
                    this.currentDirection = MovingDirection.right; //if the most left enemy go over thr right side of canvas so we momve it down
                    break;
                }
            } 
        }

    }


    drawEnemies(ctx){ 
        this.enemyRows.flat().forEach((enemy) => {
            enemy.move(this.xVelocity, this.yVelocity)
            enemy.draw(ctx)
        })

    }




    createEnemies() {
        this.enemyMap.forEach( (row,rowIndex) => {
            this.enemyRows[rowIndex] = []
            row.forEach((enemyNumber, enemyIndex) =>{
                if(enemyNumber >0){
                    this.enemyRows[rowIndex].push(new Enemy(enemyIndex*65, rowIndex*55, enemyNumber))

                }

            })
        } )
    }


    



}

