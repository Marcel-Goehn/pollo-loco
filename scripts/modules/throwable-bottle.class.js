import { Exploding, Throwing } from "../state-management/bottle-states.class.js";

export class ThrowableBottle {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.width = 75;
        this.height = 75;
        this.x = this.game.player.x;
        this.y = this.game.player.y;
        this.image = document.getElementById('bottle_spritesheet');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrameX = 5;
        this.markedForDeletion = false;
        this.fps = 20;
        this.frameRate = 1000 / this.fps;
        this.frameTimer = 0;
        this.speedX = 7;
        this.verticalMovement = 0;
        this.throwHeight = 20;
        this.gravity = 1;
        this.states = [new Throwing(this), new Exploding(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    };


    update(deltaTime) {
        // Watches the current state and changes it
        this.currentState.handleState();

        this.checkCollision();

        // Horizontal movement
        this.x += this.speedX;

        //Vertical Movement
        this.y += this.verticalMovement;
        this.verticalMovement += this.gravity;

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
    };


    draw(context) {
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height);
        };
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }


    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }


    checkCollision() {
        // this.collisionWithEnemies();
        this.collisionWithGround();
    };


    collisionWithGround() {
        if (this.y < this.game.height - this.game.groundMargin) {
            this.setState(1);
        };
    }
}