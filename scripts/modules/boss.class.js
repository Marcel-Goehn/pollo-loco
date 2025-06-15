import { Walk, Alert, Attack, Hurt, Dead } from "../state-management/boss-states.class.js";

export class Boss {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 1045;
        this.spriteHeight = 1217;
        this.bossWidth = 200;
        this.bossHeight = 300;
        this.x = 1500;
        this.y = this.game.height - this.bossHeight - this.game.groundMargin +10;
        this.markedForDeletion = false;
        this.image = document.getElementById('boss');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrameX = 7;
        this.fps = 10;
        this.frameRate = 1000 / this.fps;
        this.frameTimer = 0;
        this.horizontalMovement = 0;
        this.maxSpeed = 1;
        this.states = [new Walk(this), new Alert(this), new Attack(this), new Hurt(this), new Dead(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    };


    update(deltaTime) {
        // Watches the current state and changes it
        this.currentState.handleState();

        // Horizontal Movement
        this.x -= this.maxSpeed + this.game.gameSpeed;

        // Enters the final boss fight
        if (this.x < this.game.width - this.bossWidth) {
            this.game.bossFight = true;
        };

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
            context.strokeRect(this.x, this.y, this.bossWidth, this.bossHeight);
        };
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.bossWidth, this.bossHeight);
    };


    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    };
}