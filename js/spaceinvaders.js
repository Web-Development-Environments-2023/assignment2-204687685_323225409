//const canvas2 = document.querySelector('gameCanvas');
const canvas = document.getElementById('gameCanvas')
const c = canvas.getContext("2d")


canvas.width = 1000
canvas.height = 560

//canvas.style.width='100%'


//---------------------------------------------------------------------
class GameObject {
    constructor(x, y, height, width, color, speed) {
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.color = color
        this.speed = speed
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    collidesWith(obj) {
        return (this.x < obj.x + obj.width
                && this.x + this.width > obj.x
                && this.y < obj.y + obj.height 
                && this.y + this.height > obj.y);
    }
}