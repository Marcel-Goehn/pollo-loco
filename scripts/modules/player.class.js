import { Walking, Jumping, Hurt, Dead, Idle, Sleeping, Falling } from "../state-management/player-states.class.js";


/**
 * This class is the blueprint for the player wich is getting created when starting the game
 */
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
        this.killBounce = -7;
        this.gravity = 1;
        this.states = [new Walking(this), new Jumping(this), new Hurt(this), new Dead(this), new Idle(this), new Sleeping(this), new Falling(this)];
        this.currentState = this.states[4];
        this.currentState.enter();
        this.hitboxOffsetX = 20;
        this.hitboxOffsetY = 75;
        this.hitboxWidth = this.playerWidth - 45;
        this.hitboxHeight = this.playerHeight - 85;
        this.doubleJump = false;
        this.left = false;
        this.loopAnimation = true;
        this.lastHit = 0;
        this.timeOfDeath = 0;
        this.hurtMusic = new Audio('./assets/audio/player_hurt.mp3');
        this.hurtMusic.muted = this.game.audioMuted;
        this.hurtMusic.volume = 0.05;
        this.collectedCoinMusic = new Audio('./assets/audio/coin_collected.mp3');
        this.collectedCoinMusic.muted = this.game.audioMuted;
        this.collectedCoinMusic.volume = 0.05;
        this.collectedBottleMusic = new Audio('./assets/audio/bottle_collected.mp3');
        this.collectedBottleMusic.muted = this.game.audioMuted;
        this.collectedBottleMusic.volume = 0.5;
        this.jumpKeyReleased = false;
        this.jumpKeyPressed = false;
    };


    /**
     * This method updates the movement, checks the collision and animates the spritesheet
     * 
     * @param {array} inputKeys - Holds the current pressed keys to navigate the player 
     * @param {*} deltaTime - The time that has passed since the last animation frame to the current one
     */
    update(inputKeys, deltaTime) {
        this.checkAudioState();
        this.resetDoubleJumpAbility();
        this.checkCollision();
        this.currentState.handleInput(inputKeys);
        this.horizontalPlayerMovement(inputKeys);
        this.lockPlayerIntoCanvasScreen();
        this.verticalPlayerMovement();
        this.playerSpriteAnimation(deltaTime);
        this.isPlayerUnderneathTheGround();
    };


    /**
     * Draws the player on the canvas
     * 
     * @param {context} context - This is the 2d context for the canvas. It allows to use multiple methods on the canvas
     */
    draw(context) {
        if (this.left) {
            context.save();
            context.scale(-1, 1);
            context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, -this.x - this.playerWidth, this.y, this.playerWidth, this.playerHeight);
            context.restore();
        } else {
            context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.playerWidth, this.playerHeight);
        }
    };


    /**
     * This method checks on every animation frame if the player is on the ground or is in the air
     * 
     * @returns - returns true or false
     */
    isOnGround() {
        return this.y >= this.game.height - this.playerHeight - this.game.groundMargin;
    };


    /**
     * This method changes the current state of the player if a condition is changing
     * 
     * @param {number} state - The number will tell the state management wich state to use 
     * @param {number} gameSpeed - This will dictate how fast the game is running
     */
    setState(state, gameSpeed) {
        this.currentState = this.states[state];
        this.game.gameSpeed = gameSpeed * this.game.maxGameSpeed;
        this.currentState.enter();
    };


    /**
     * Checks if the audio is muted or unmuted
     */
    checkAudioState() {
        this.hurtMusic.muted = this.game.audioMuted;
        this.collectedCoinMusic.muted = this.game.audioMuted;
        this.collectedBottleMusic.muted = this.game.audioMuted;
    }


    /**
     * Resets the ability to double jump
     */
    resetDoubleJumpAbility() {
        if (this.isOnGround()) {
            this.doubleJump = false;
            this.jumpKeyReleased = false;
            this.jumpKeyPressed = false;
        }
    }


    /**
     * Horizontal Movement of the player
     * 
     * @param {array} inputKeys - Holds the current pressed keys to navigate the player 
     */
    horizontalPlayerMovement(inputKeys) {
        if (this.game.healthPoints !== 0) {
            this.x += this.horizontalMovement;
        }

        if (inputKeys.includes('ArrowRight') && this.doubleJump) {
            this.horizontalMovement = this.maxSpeed * 2;
            this.left = false;
        }
        else if (inputKeys.includes('ArrowLeft') && this.doubleJump) {
            this.horizontalMovement = -this.maxSpeed * 2;
            this.left = true;
        }
        else if (inputKeys.includes('ArrowRight') && !this.doubleJump) {
            this.horizontalMovement = this.maxSpeed;
            this.left = false;
        }
        else if (inputKeys.includes('ArrowLeft') && !this.doubleJump) {
            this.horizontalMovement = -this.maxSpeed;
            this.left = true;
        }
        else {
            this.horizontalMovement = 0;
        };
    }


    /**
     * Prevents that the Player can walk out of the canvas
     */
    lockPlayerIntoCanvasScreen() {
        if (this.x < 0) {
            this.x = 0;
        };
        if (this.x > (this.game.width - this.playerWidth)) {
            this.x = this.game.width - this.playerWidth;
        };
    }


    /**
     * Vertical Movement of the player
     */
    verticalPlayerMovement() {
        this.y += this.verticalMovement;

        if (!this.isOnGround()) {
            this.verticalMovement += this.gravity;
        }
        else {
            this.verticalMovement = 0;
        };
    }


    /**
     * Animates the sprite sheet of the player
     * 
     * @param {number} deltaTime - The time that has passed since the last animation frame to the current one
     */
    playerSpriteAnimation(deltaTime) {
        if (this.frameTimer > this.frameRate) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrameX) {
                this.frameX++;
            }
            else {
                if (!this.loopAnimation) {
                    this.frameX = this.maxFrameX;
                } else {
                    this.frameX = 0;
                }
            };
        }
        else {
            this.frameTimer += deltaTime;
        };
    }


    /**
     * Checks if the player is falling below the ground. If that is the case the player will get reset to ist usual position
     */
    isPlayerUnderneathTheGround() {
        const maxY = this.game.height - this.playerHeight - this.game.groundMargin;

        if (this.y > maxY) {
            this.y = maxY;
            this.verticalMovement = 0;
        };
    }


    /**
     * This method calls all the collision check methods, where the player could potentially collide with
     */
    checkCollision() {
        this.collisionWithEnemies();
        this.collisionWithBottle();
        this.collisionWithCoin();
        this.collisionWithBoss();
    };


    /**
     * This method checks if there is a collision between the player and an enemy
     */
    collisionWithEnemies() {
        this.game.enemies.forEach(enemy => {
            if (
                (enemy.x + enemy.offsetLeft < this.x + this.hitboxOffsetX + this.hitboxWidth &&
                    enemy.x + enemy.enemyWidth - enemy.offsetRight > this.x + this.hitboxOffsetX &&
                    enemy.y + enemy.offsetTop < this.y + this.hitboxOffsetY + this.hitboxHeight &&
                    enemy.y + enemy.enemyHeight - enemy.offsetBottom > this.y + this.hitboxOffsetY) &&
                this.verticalMovement > 0
            ) {
                if (!enemy.willBeDeleted) {
                    this.verticalMovement = this.killBounce;
                }
                enemy.willBeDeleted = true;
                enemy.setState(1);
            }
            else if (
                (enemy.x + enemy.offsetLeft < this.x + this.hitboxOffsetX + this.hitboxWidth &&
                    enemy.x + enemy.enemyWidth - enemy.offsetRight > this.x + this.hitboxOffsetX &&
                    enemy.y + enemy.offsetTop < this.y + this.hitboxOffsetY + this.hitboxHeight &&
                    enemy.y + enemy.enemyHeight - enemy.offsetBottom > this.y + this.hitboxOffsetY) &&
                this.isOnGround() &&
                enemy.willBeDeleted === false
            ) {
                if (this.game.healthPoints > 0 && ((new Date().getTime() - enemy.lastPlayerHit) > 1500 || enemy.lastPlayerHit === null)) {
                    this.game.healthPoints -= 10;
                    enemy.lastPlayerHit = new Date().getTime();
                    this.lastHit = new Date().getTime();
                    this.setState(2, 0);
                }
            };
        });
    };


    /**
     * This method checks if there is a collision between the player and a collectable bottle
     */
    collisionWithBottle() {
        this.game.bottles.forEach(bottle => {
            if (
                bottle.x + bottle.offsetLeft < this.x + this.hitboxOffsetX + this.hitboxWidth &&
                bottle.x + bottle.width - bottle.offsetRight > this.x + this.hitboxOffsetX &&
                bottle.y + bottle.offsetTop < this.y + this.hitboxOffsetY + this.hitboxHeight &&
                bottle.y + bottle.height - bottle.offsetBottom > this.y + this.hitboxOffsetY
            ) {
                bottle.markedForDeletion = true;
                this.collectedBottleMusic.play();
                this.game.salsaBottles++;
            }
        });
    };


    /**
     * This method checks if there is a collision between the player and a collectable coin
     */
    collisionWithCoin() {
        this.game.collectableCoins.forEach(coin => {
            if (
                coin.x + coin.offsetLeft < this.x + this.hitboxOffsetX + this.hitboxWidth &&
                coin.x + coin.width - coin.offsetRight > this.x + this.hitboxOffsetX &&
                coin.y + coin.offsetTop < this.y + this.hitboxOffsetY + this.hitboxHeight &&
                coin.y + coin.height - coin.offsetBottom > this.y + this.hitboxOffsetY
            ) {
                coin.markedForDeletion = true;
                this.collectedCoinMusic.play();
                this.game.coins++;
            };
        });
    };


    /**
     * This method checks if there is a collision between the player and the boss enemy
     */
    collisionWithBoss() {
        if (
            this.game.boss.x + this.game.boss.offsetLeft < this.x + this.hitboxOffsetX + this.hitboxWidth &&
            this.game.boss.x + this.game.boss.bossWidth - this.game.boss.offsetRight > this.x + this.hitboxOffsetX &&
            this.game.boss.y + this.game.boss.offsetTop < this.y + this.hitboxOffsetY + this.hitboxHeight &&
            this.game.boss.y + this.game.boss.bossHeight - this.game.boss.offsetBottom > this.y + this.hitboxOffsetY
        ) {
            let currentHit = new Date().getTime();
            if (this.game.healthPoints > 0 && currentHit - this.lastHit >= 1500 && this.game.bossHealthPoints > 0) {
                if (this.game.healthPoints <= 10) {
                    this.game.healthPoints = 0;
                }
                else {
                    this.game.healthPoints -= 20;
                }
                this.lastHit = new Date().getTime();
                this.setState(2, 0);
            }
        };
    };
};