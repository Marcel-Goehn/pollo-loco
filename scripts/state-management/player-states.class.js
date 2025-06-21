const states = {
    WALKING: 0,
    JUMPING: 1,
    HURT: 2,
    DEAD: 3,
    IDLE: 4,
    SLEEPING: 5,
    FALLING: 6
};

let enterIdleStateTime = 0;


// For debugging purposes
class State {
    constructor(state) {
        this.state = state;
    };
};


/**
 * A blueprint for the walking state of the player
 */
export class Walking extends State {
    constructor(player) {
        super('WALKING');
        this.player = player;
    };


    /**
     * This method sets the x and y coordinates to the right positions to get the fitting animation for that state
     */
    enter() {
        this.player.frameX = 0;
        this.player.maxFrameX = 5;
        this.player.frameY = 0;
        this.player.loopAnimation = true;
    };


    /**
     * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
     */
    handleInput(inputKeys) {
        if (inputKeys.length === 0) {
            this.player.setState(states.IDLE, 0);
        }
        else if ((inputKeys.includes('ArrowLeft') || inputKeys.includes('ArrowRight')) && this.player.game.bossFight) {
            this.player.setState(states.WALKING, 0);
        }
        else if (inputKeys.includes('ArrowUp') && this.player.game.bossFight) {
            this.player.setState(states.JUMPING, 0);
        }
        else if (inputKeys.includes('ArrowUp')) {
            this.player.setState(states.JUMPING, 1);
        };
    };
};


/**
 * A blueprint for the jumping state of the player
 */
export class Jumping extends State {
    constructor(player) {
        super('JUMPING');
        this.player = player;
    };


    /**
     * This method sets the x and y coordinates to the right positions to get the fitting animation for that state
     */
    enter() {
        if (this.player.isOnGround()) {
            this.player.verticalMovement -= this.player.jumpHeight;
        };
        this.player.frameX = 0;
        this.player.maxFrameX = 8;
        this.player.frameY = 1;
        this.player.loopAnimation = false;
    };


    /**
     * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
     */
    handleInput(inputKeys) {
        if (inputKeys.includes(' ') && !this.player.doubleJump && this.player.game.bossFight && this.player.game.coins > 0) {
            this.player.verticalMovement -= this.player.jumpHeight * 1.25;
            this.player.game.coins--;
            this.player.doubleJump = true;
        }
        else if (this.player.verticalMovement > this.player.gravity && this.player.game.bossFight) {
            this.player.setState(states.FALLING, 0);
        }
        else if (this.player.verticalMovement > this.player.gravity) {
            this.player.setState(states.FALLING, 1);
        }
    };
};


/**
 * A blueprint for the hurting state of the player
 */
export class Hurt extends State {
    constructor(player) {
        super('HURT');
        this.player = player;
    };


    /**
     * This method sets the x and y coordinates to the right positions to get the fitting animation for that state
     */
    enter() {
        this.player.frameX = 0;
        this.player.maxFrameX = 2;
        this.player.frameY = 2;
        this.player.loopAnimation = false;
    };


    /**
     * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
     */
    handleInput(inputKeys) {
        let currentTime = new Date().getTime();

        if (currentTime - this.player.lastHit >= 1500) {
            if (this.player.frameX >= this.player.maxFrameX && this.player.isOnGround()) {
                this.player.setState(states.IDLE, 0);
            }
            else if (this.player.frameX >= this.player.maxFrameX && !this.player.isOnGround() && this.player.game.bossFight) {
                this.player.setState(states.FALLING, 0);
            }
            else if (this.player.frameX >= this.player.maxFrameX && !this.player.isOnGround()) {
                this.player.setState(states.FALLING, 1);
            };
        }
    };
};


/**
 * A blueprint for the dead state of the player
 */
export class Dead extends State {
    constructor(player) {
        super('DEAD');
        this.player = player;
    };


    /**
     * This method sets the x and y coordinates to the right positions to get the fitting animation for that state
     */
    enter() {
        this.player.frameX = 0;
        this.player.maxFrameX = 6;
        this.player.frameY = 3;
        this.player.loopAnimation = false;
    };


    /**
     * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
     */
    handleInput(inputKeys) {
        if (this.player.frameX >= this.player.maxFrameX && !document.querySelector('.end-screen').classList.contains('loose')) {
            let endingScreen = document.querySelector('.end-screen');
            endingScreen.classList.add('loose');
            endingScreen.classList.remove('d_none');
            document.getElementById('canvas1').classList.add('d_none');
        };
    };
};


/**
 * A blueprint for the idle state of the player
 */
export class Idle extends State {
    constructor(player) {
        super('IDLE');
        this.player = player;
    };


    /**
     * This method sets the x and y coordinates to the right positions to get the fitting animation for that state
     */
    enter() {
        this.player.frameX = 0;
        this.player.maxFrameX = 9;
        this.player.frameY = 4;
        this.player.loopAnimation = true;
        enterIdleStateTime = new Date().getTime();
    };


    /**
     * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
     */
    handleInput(inputKeys) {
        let idleTime = new Date().getTime();

        if (idleTime - enterIdleStateTime >= 5000) {
            this.player.setState(states.SLEEPING, 0);
        }
        else if ((inputKeys.includes('ArrowLeft') || inputKeys.includes('ArrowRight')) && this.player.game.bossFight) {
            this.player.setState(states.WALKING, 0);
        }
        else if (inputKeys.includes('ArrowLeft') || inputKeys.includes('ArrowRight')) {
            this.player.setState(states.WALKING, 1);
        }
        else if (inputKeys.includes('ArrowUp') && this.player.game.bossFight) {
            this.player.setState(states.JUMPING, 0);
        }
        else if (inputKeys.includes('ArrowUp')) {
            this.player.setState(states.JUMPING, 1);
        };
    };
};


/**
 * A blueprint for the sleeping state of the player
 */
export class Sleeping extends State {
    constructor(player) {
        super('SLEEPING');
        this.player = player;
    };


    /**
     * This method sets the x and y coordinates to the right positions to get the fitting animation for that state
     */
    enter() {
        this.player.frameX = 0;
        this.player.maxFrameX = 9;
        this.player.frameY = 5;
        this.player.loopAnimation = true;
    };


    /**
     * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
     */
    handleInput(inputKeys) {
        if ((inputKeys.includes('ArrowLeft') || inputKeys.includes('ArrowRight')) && this.player.game.bossFight) {
            this.player.setState(states.WALKING, 0);
        }
        else if (inputKeys.includes('ArrowLeft') || inputKeys.includes('ArrowRight')) {
            this.player.setState(states.WALKING, 1);
        }
        else if (inputKeys.includes('ArrowUp') && this.player.game.bossFight) {
            this.player.setState(states.JUMPING, 0);
        }
        else if (inputKeys.includes('ArrowUp')) {
            this.player.setState(states.JUMPING, 1);
        };
    };
};


/**
 * A blueprint for the falling state of the player
 */
export class Falling extends State {
    constructor(player) {
        super('FALLING');
        this.player = player;
    };


    /**
     * This method sets the x and y coordinates to the right positions to get the fitting animation for that state
     */
    enter() {
        this.player.frameX = 0;
        this.player.maxFrameX = 8;
        this.player.frameY = 1;
        this.player.loopAnimation = false;
    };


    /**
     * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
     */
    handleInput(inputKeys) {
        if (inputKeys.includes(' ') && !this.player.doubleJump && this.player.game.bossFight && this.player.game.coins > 0) {
            this.player.verticalMovement -= this.player.jumpHeight * 1.25;
            this.player.game.coins--;
            this.player.doubleJump = true;
            this.player.setState(states.JUMPING, 0);
        }
        else if (inputKeys.length === 0 && this.player.isOnGround()) {
            this.player.setState(states.IDLE, 0);
            this.player.doubleJump = false;
        }
        else if ((inputKeys.includes('ArrowLeft') || inputKeys.includes('ArrowRight')) && this.player.isOnGround() && this.player.game.bossFight) {
            this.player.setState(states.WALKING, 0);
            this.player.doubleJump = false;
        }
        else if (inputKeys.includes('ArrowLeft') || inputKeys.includes('ArrowRight') && this.player.isOnGround()) {
            this.player.setState(states.WALKING, 1);
            this.player.doubleJump = false;
        };
    };
};