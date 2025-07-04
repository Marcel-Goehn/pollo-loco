import { Exploding, Throwing } from "../state-management/bottle-states.class.js";


/**
 * This is the blueprint wich creates a new bottle if the d key is pressed and the user has at least collected one bottle
 */
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
        this.fps = 30;
        this.frameRate = 1000 / this.fps;
        this.frameTimer = 0;
        this.speedX = 7;
        this.verticalMovement = 0;
        this.throwHeight = 20;
        this.gravity = 1;
        this.throwBottleMusic = new Audio('./assets/audio/bottle_throw.mp3');
        this.throwBottleMusic.muted = this.game.audioMuted;
        this.throwBottleMusic.volume = 0.05;
        this.bottleBreaksMusic = new Audio('./assets/audio/bottle_breaks.mp3');
        this.bottleBreaksMusic.muted = this.game.audioMuted;
        this.bottleBreaksMusic.volume = 0.05;
        this.states = [new Throwing(this), new Exploding(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    };


    /**
     * This method updates the movement, collision and the sprite animation
     * 
     * @param {number} deltaTime - The time that has passed between the last animation frame and the current one 
     */
    update(deltaTime) {
        this.checkAudioState();
        this.currentState.handleState();
        this.checkCollision();
        this.refreshHorizontalMovement();
        this.checkVerticalMovement();
        this.spriteAnimation(deltaTime);
    };


    /**
     * This method draws the throwable bottle on the canvas
     * 
     * @param {context} context - This is the 2d context for the canvas. It allows to use multiple methods on the canvas
     */
    draw(context) {
        if (this.game.player.left) {
            context.save();
            context.scale(-1, 1);
            context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, -this.x - this.width, this.y, this.width, this.height);
            context.restore();
        } else {
            context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }


    /**
     * This method will change the current state of the throwing bottle if the condition is changing
     * 
     * @param {number} state - This number will dictate wich state of the sprite sheet will be chosen
     */
    setState(state) {
        if (this.currentState === this.states[state]) return;
        this.currentState = this.states[state];
        this.currentState.enter();
    }


    /**
     * Checks the current state of the audio
     */
    checkAudioState() {
        this.throwBottleMusic.muted = this.game.audioMuted;
        this.bottleBreaksMusic.muted = this.game.audioMuted;
    }


    /**
     * Updates the horizontal movement
     */
    refreshHorizontalMovement() {
        this.x += this.speedX;
    }


    /**
     * Updates the vertical movement
     */
    checkVerticalMovement() {
        this.y += this.verticalMovement;
        this.verticalMovement += this.gravity;
    }


    /**
     * Animates the sprite sheet
     */
    spriteAnimation(deltaTime) {
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
    }


    /**
     * Calls the collision methods
     */
    checkCollision() {
        this.collisionWithEnemies();
        this.collisionWithGround();
        this.collisionWithBoss();
    };


    /**
     * This method checks if there is a collision between an enemy and the throwing bottle
     */
    collisionWithEnemies() {
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.enemyWidth > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.enemyHeight > this.y
            ) {
                this.setState(1);
                enemy.setState(1);
            };
        });
    }


    /**
     * This method checks if there is a collision between the throwing bottle and the ground
     */
    collisionWithGround() {
        if (this.y > this.game.height - this.height - this.game.groundMargin) {
            this.setState(1);
        };
    }


    /**
     * This method checks if there is a collision between the enemy boss and the throwing bottle
     */
    collisionWithBoss() {
        if (
            this.game.boss.x < this.x + this.width &&
            this.game.boss.x + this.game.boss.bossWidth > this.x &&
            this.game.boss.y < this.x + this.width &&
            this.game.boss.y + this.game.boss.bossHeight > this.y
        ) {
            if (this.currentState !== this.states[1] && this.game.bossHealthPoints === 20) {
                this.game.bossHealthPoints -= 20;
                this.game.boss.setState(3);
                this.setState(1);
            }
            else if (this.currentState !== this.states[1] && this.game.bossHealthPoints > 0 && (this.game.boss.currentState === this.game.boss.states[1] || this.game.boss.currentState === this.game.boss.states[2])) {
                this.game.bossHealthPoints -= 20;
                this.setState(1);
            }
            else if (this.currentState !== this.states[1] && this.game.bossHealthPoints > 0) {
                this.game.bossHealthPoints -= 20;
                this.game.boss.setState(3);
                this.setState(1);
            };
        };
    }
}