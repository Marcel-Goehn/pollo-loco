import { Walking, Jumping, Hurt, Dead, Idle, Sleeping, Falling } from "../state-management/player-states.class.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 610;
        this.spriteHeight = 1200;
        this.playerWidth = 100;
        this.playerHeight = 200;
        this.x = 0;
        this.y = this.game.height - this.playerHeight - this.game.groundMargin;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrameX = 9;
        this.fps = 20;
        this.frameRate = 1000 / this.fps;
        this.frameTimer = 0;
        this.horizontalMovement = 0;
        this.maxSpeed = 5;
        this.verticalMovement = 0;
        this.jumpHeight = 15;
        this.gravity = 1;
        this.states = [new Walking(this), new Jumping(this), new Hurt(this), new Dead(this), new Idle(this), new Sleeping(this), new Falling(this)];
        this.currentState = this.states[4];
        this.currentState.enter();
        this.hitboxOffsetX = 10;
        this.hitboxOffsetY = 75;
        this.hitboxWidth = this.playerWidth - 20;
        this.hitboxHeight = this.playerHeight - 80;
    };


    update(inputKeys, deltaTime) {
        // Checks if a collision is happening
        this.checkCollision();

        // Watches the current state and changes it if the user presses a key (example ArrowLeft will change the state if the current state would be IDLE)
        this.currentState.handleInput(inputKeys);

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

        // Prevents that the Player can walk out of the canvas
        if (this.x < 0) {
            this.x = 0;
        };
        if (this.x > (this.game.width - this.playerWidth)) {
            this.x = this.game.width - this.playerWidth;
        };

        // Vertical Movement
        this.y += this.verticalMovement;

        if (!this.isOnGround()) {
            this.verticalMovement += this.gravity;
        }
        else {
            this.verticalMovement = 0;
        };

        // Sprite Animation
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
        // if (this.game.debug) {
        //     context.strokeRect(this.x, this.y, this.playerWidth, this.playerHeight);
        // };
        if (this.game.debug) {
            const hitbox = this.getHitbox();
            context.strokeRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
        };
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.playerWidth, this.playerHeight);
    };


    isOnGround() {
        return this.y >= this.game.height - this.playerHeight - this.game.groundMargin;
    };


    setState(state, gameSpeed) {
        this.currentState = this.states[state];
        this.game.gameSpeed = gameSpeed * this.game.maxGameSpeed;
        this.currentState.enter();
    };


    // Can get deleted later, for hitbox adjusting purposes only
    getHitbox() {
        return {
            x: this.x + this.hitboxOffsetX,
            y: this.y + this.hitboxOffsetY,
            width: this.hitboxWidth,
            height: this.hitboxHeight
        };
    };


    checkCollision() {
        this.collisionWithEnemies();
        this.collisionWithBottle();
    };


    collisionWithEnemies() {
        this.game.enemies.forEach(enemy => {
            if (
                (enemy.x < this.x + this.hitboxOffsetX + this.hitboxWidth &&
                    enemy.x + enemy.enemyWidth > this.x + this.hitboxOffsetX &&
                    enemy.y < this.y + this.hitboxOffsetY + this.hitboxHeight &&
                    enemy.y + enemy.enemyHeight > this.y + this.hitboxOffsetY) &&
                this.verticalMovement > 0
            ) {
                enemy.willBeDeleted = true;
                enemy.setState(1);
            }
            else if (
                (enemy.x < this.x + this.hitboxOffsetX + this.hitboxWidth &&
                    enemy.x + enemy.enemyWidth > this.x + this.hitboxOffsetX &&
                    enemy.y < this.y + this.hitboxOffsetY + this.hitboxHeight &&
                    enemy.y + enemy.enemyHeight > this.y + this.hitboxOffsetY) &&
                this.isOnGround() &&
                enemy.willBeDeleted === false
            ) {
                if (this.game.healthPoints > 0) {
                    this.game.healthPoints--;
                    this.setState(2, 0);
                }
                else {
                    this.game.healthPoints = 0;
                    this.setState(3, 0);
                };
            };
        });
    };


    collisionWithBottle() {
        this.game.bottles.forEach(bottle => {
            if(
                bottle.x < this.x + this.hitboxOffsetX + this.hitboxWidth &&
                bottle.x + bottle.width > this.x + this.hitboxOffsetX &&
                bottle.y < this.y + this.hitboxOffsetY + this.hitboxHeight &&
                bottle.y + bottle.height > this.y + this.hitboxOffsetY
            ) {
                bottle.markedForDeletion = true;
                this.game.salsaBottles++;
            }
        });
    };
};