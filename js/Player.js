export default class Player {

    constructor(canvas, velocity){
        this.canvas = canvas;
        this.velocity = velocity;

        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 100;
        //Math.floor(Math.random()*(canvas.width-70))

        this.width = 75;
        this.height = 100;
        this.image = new Image();
        this.image.src = "media/player1.png";

    }


    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)

    }

}