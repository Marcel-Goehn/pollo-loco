import { Walking, Dead } from '../state-management/enemy-states.class.js';


/**
 * Superclass for the enemies. 
 */
class Enemy {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameRate = 1000 / this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
        this.willBeDeleted = false;
        this.states = [new Walking(this), new Dead(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    };


    /**
     * Updates the position, the state and the sprite animation
     * 
     * @param {number} deltaTime - The time passed from the last to the current animationframe. It adjusts the fps for the sprite sheet 
     */
    update(deltaTime) {
         // Watches the current state and changes it
        this.currentState.handleState();

        // movement
        if (!this.willBeDeleted) {
            this.x -= this.speedX + this.game.gameSpeed;
        }
        else {
            this.x -= this.game.gameSpeed;
        }

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


    /**
     * Draws the enemies into the canvas
     * 
     * @param {context} context - This is the 2d context for the canvas. It allows to use multiple methods on the canvas
     */
    draw(context) {
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.enemyWidth, this.enemyHeight);
        };
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.enemyWidth, this.enemyHeight);
    };


    /**
     * Changes the current state to the new state wich is getting passed as an parameter
     * 
     * @param {number} state - The number represents the state wich the enemie will enter 
     */
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    };
};


/**
 * This child class creates an instance of one regular chicken
 */
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


/**
 * This child class created an instance of one small chicken
 */
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