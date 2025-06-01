export class Player {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 610;
        this.spriteHeight = 1200;
        this.playerWidth = 100;
        this.playerHeight = 200;
        this.x = 0;
        this.y = this.game.height - this.playerHeight;
        this.image = document.getElementById('player');
        this.speed = 0;
        this.maxSpeed = 5;
    };


    update(inputKeys) {
        // Horizontal Movement
        this.x += this.speed;

        if (inputKeys.includes('ArrowRight')) {
            this.speed = this.maxSpeed;
        }
        else if (inputKeys.includes('ArrowLeft')) {
            this.speed = -this.maxSpeed;
        }
        else {
            this.speed = 0;
        };

        if (this.x < 0) {
            this.x = 0;
        };
        if (this.x > (this.game.width - 100)) {
            this.x = this.game.width - 100;
        };
    };


    draw(context) {
        context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.playerWidth, this.playerHeight);
    };
};