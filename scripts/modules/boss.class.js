import { Walk, Alert, Attack, Hurt, Dead } from "../state-management/boss-states.class.js";

export class Boss {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 1045;
        this.spriteHeight = 1217;
        this.bossWidth = 150;
        this.bossHeight = 200;
        this.x = 2500;
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
    };


    update(inputKeys, deltaTime) {
        // Watches the current state and changes it
        this.currentState.handleState();

        // Horizontal Movement
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

        // Enters the final boss fight
        if (this.x < this.game.width - this.bossWidth) {
            this.game.bossFight = true;
        };

        // sprite animation
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


    isOnGround() {
        return this.y >= this.game.height - this.bossHeight - this.game.groundMargin + 10;
    };


    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    };
}