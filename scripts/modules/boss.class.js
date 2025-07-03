import { Walk, Alert, Attack, Hurt, Dead } from "../state-management/boss-states.class.js";


/**
 * Creates, updates and draws the boss on the canvas
 */
export class Boss {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 1045;
        this.spriteHeight = 1217;
        this.bossWidth = 150;
        this.bossHeight = 200;
        this.x = 8000;
        this.y = this.game.height - this.bossHeight - this.game.groundMargin + 10;
        this.markedForDeletion = false;
        this.image = document.getElementById('boss');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrameX = 7;
        this.fps = 10;
        this.frameRate = 1000 / this.fps;
        this.frameTimer = 0;
        this.horizontalMovement = 0;
        this.bossFightHorizontalMovement = 1;
        this.maxSpeed = 1;
        this.states = [new Walk(this), new Alert(this), new Attack(this), new Hurt(this), new Dead(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
        this.animationType = 'WALK';
        this.animationDone = false;
        this.lastAttack = 0;
        this.attackLeft = false;
        this.attackRight = false;
        this.right = false;
        this.enterDeadTime = 0;
        this.bossIntroMusic = new Audio('../assets/audio/boss_intro.mp3');
        this.bossIntroMusic.muted = this.game.audioMuted;
        this.bossIntroMusic.volume = 0.05;
        this.bossHurtMusic = new Audio('../assets/audio/boss_hurt.mp3');
        this.bossHurtMusic.muted = this.game.audioMuted;
        this.bossHurtMusic.volume = 0.05;
        this.bossDeadMusic = new Audio('../assets/audio/boss_dead.mp3');
        this.bossDeadMusic.muted = this.game.audioMuted;
        this.bossDeadMusic.volume = 0.05;
    };


    /**
     * This method updates the movement, checks if the bossfight has begun, watches the state of the audio, animates the spritesheet and updates the state
     * 
     * @param {array} inputKeys - Holds the current pressed keys
     * @param {number} deltaTime - The time that has passed since the last animation frame to the current one
     */
    update(inputKeys, deltaTime) {
        this.checkAudioState();
        this.currentState.handleState();
        this.refreshHorizontalMovement(inputKeys);
        this.enterFinalBossFight();
        this.animateBoss(deltaTime);
    }


    /**
     * Draws the Boss on the canvas
     * 
     * @param {context} context - This is the 2d context for the canvas. It allows to use multiple methods on the canvas
     */
    draw(context) {
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.bossWidth, this.bossHeight);
        };

        if (this.right) {
            context.save();
            context.scale(-1, 1);
            context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, -this.x - this.bossWidth, this.y, this.bossWidth, this.bossHeight);
            context.restore();
        } else {
            context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.bossWidth, this.bossHeight);
        }
    };


    /**
     * Updates the state
     * 
     * @param {number} state - The number will tell the state management wich state to use
     */
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    };


    /**
     * Checks the current state of the audio, if it's muted or not
     */
    checkAudioState() {
        this.bossIntroMusic.muted = this.game.audioMuted;
        this.bossHurtMusic.muted = this.game.audioMuted;
        this.bossDeadMusic.muted = this.game.audioMuted;
    }


    /**
     * Moves the boss on the x axis
     * 
     * @param {array} inputKeys - Holds the current pressed keys
     */
    refreshHorizontalMovement(inputKeys) {
        if (this.game.bossHealthPoints !== 0) {
            if (!this.game.bossFight) {
                this.x -= this.horizontalMovement + this.game.gameSpeed;
            }
            else if (this.game.bossFight && !this.attackLeft && !this.attackRight && this.currentState !== this.states[2]) {
                if (this.x > this.game.player.x) {
                    this.right = false;
                    this.x -= this.bossFightHorizontalMovement;
                } else {
                    this.right = true;
                    this.x += this.bossFightHorizontalMovement;
                }
            }

            if (this.game.bossFight && this.attackLeft) {
                this.right = false;
                this.x -= this.bossFightHorizontalMovement;
            }
            if (this.game.bossFight && this.attackRight) {
                this.right = true;
                this.x += this.bossFightHorizontalMovement;
            }

            if (inputKeys.includes('ArrowUp') || inputKeys.includes('ArrowLeft') || inputKeys.includes('ArrowRight')) {
                this.horizontalMovement = this.maxSpeed;
            } else {
                this.horizontalMovement = 0;
            }
        }
    }


    /**
     * Enters the final boss fight and plays the intro music
     */
    enterFinalBossFight() {
        if (this.x < this.game.width - this.bossWidth + 200 && !this.game.bossFight) {
            this.game.bossFight = true;
            this.bossIntroMusic.play();
        };
    }


    /**
     * Animates the spritesheet of the boss
     * 
     * @param {number} deltaTime - The time that has passed since the last animation frame to the current one
     */
    animateBoss(deltaTime) {
        if (!this.animationDone) {
            if (this.frameTimer > this.frameRate) {
                this.frameTimer = 0;
                if (this.frameX < this.maxFrameX) {
                    this.frameX++;
                }
                else {
                    if (this.animationType === 'DEAD') {
                        this.animationDone = true;
                    }
                    else {
                        this.frameX = 0;
                    }
                };
            }
            else {
                this.frameTimer += deltaTime;
            };
        };
    }
}