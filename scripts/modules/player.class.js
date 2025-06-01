import { Walking } from "./player-states.class.js";

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
        this.frameX = 0;
        this.frameY = 0;
        this.horizontalMovement = 0;
        this.maxSpeed = 5;
        this.verticalMovement = 0;
        this.jumpSpeed = 20;
        this.gravity = 1;
        this.states = [new Walking(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    };


    update(inputKeys) {
        // Horizontal Movement
        this.x += this.horizontalMovement;

        if (inputKeys.includes('ArrowRight')) {
            this.horizontalMovement = this.maxSpeed;
        }
        else if (inputKeys.includes('ArrowLeft')) {
            this.horizontalMovement = -this.maxSpeed;
        }
        else {
            this.horizontalMovement = 0;
        };

        if (this.x < 0) {
            this.x = 0;
        };
        if (this.x > (this.game.width - 100)) {
            this.x = this.game.width - 100;
        };

        // Vertical Movement
        if (inputKeys.includes('ArrowUp') && this.isOnGround()) {
            this.verticalMovement -= this.jumpSpeed;
        };

        this.y += this.verticalMovement;

        if (!this.isOnGround()) {
            this.verticalMovement += this.gravity;
        }
        else {
            this.verticalMovement = 0;
        };
    };


    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.playerWidth, this.playerHeight);
    };


    isOnGround() {
        return this.y >= this.game.height - this.playerHeight;
    }
};