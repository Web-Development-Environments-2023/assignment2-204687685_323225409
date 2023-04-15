import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

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
    defaultXVelocity = 4
    defaultYVelocity = 1

    constructor(canvas){
        this.canvas = canvas
        this.createEnemies();
    }

    draw(ctx){
        this.updateVelocityAndDirection()
        this.drawEnemies(ctx)
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

