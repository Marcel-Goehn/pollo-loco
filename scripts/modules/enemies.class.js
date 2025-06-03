class Enemy {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameRate = 1000 / this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    };


    update(deltaTime) {
        // movement
        this.x -= this.speedX + this.game.gameSpeed;

        // sprite animation
        if (this.frameTimer > this.frameRate) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrameX) {
                this.frameX++;
            }
            else {
                this.frameX = 0;
            };
        }
        else {
            this.frameTimer += deltaTime;
        };

        // Check if enemy is off screen
        if (this.x + this.enemyWidth < 0) {
            this.markedForDeletion = true;
        }
    };


    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.enemyWidth, this.enemyHeight);
    };
};


export class RegularChicken extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.spriteWidth = 248;
        this.spriteHeight = 243;
        this.enemyWidth = 50;
        this.enemyHeight = 50;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = this.game.height - this.enemyHeight - this.game.groundMargin;
        this.image = document.getElementById('regular_chicken');
        this.speedX = Math.random() + 1;
        this.maxFrameX = 2;
    };
};


export class SmallChicken extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.spriteWidth = 236;
        this.spriteHeight = 210;
        this.enemyWidth = 40;
        this.enemyHeight = 40;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = this.game.height - this.enemyHeight - this.game.groundMargin;
        this.image = document.getElementById('small_chicken');
        this.speedX = Math.random() + 1;
        this.maxFrameX = 2;
    };
};