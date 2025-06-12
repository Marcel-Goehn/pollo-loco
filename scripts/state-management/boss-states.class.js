const states = {
    WALK: 0,
    ALERT: 1,
    ATTACK: 2,
    HURT: 3,
    DEAD: 4
}


// For debug purposes
class State {
    constructor(state) {
        this.state = state;
    };
}


/**
 * A blueprint for the walking state of the boss
 */
export class Walk extends State {
    constructor(boss) {
        super('WALK');
        this.boss = boss;
    };


    /**
     * This method sets the x and y coordinates to the right positions to get the fitting animation for that state
     */
    enter() {
        this.boss.frameX = 0;
        this.boss.maxFrameX = 3;
        this.boss.frameY = 0;
    };


    /**
     * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
     */
    handleState() {

    };
}

/**
 * A blueprint for the alert state of the boss
 */
export class Alert extends State {
    constructor(boss) {
        super('ALERT');
        this.boss = boss;
    };


    /**
     * This method sets the x and y coordinates to the right positions to get the fitting animation for that state
     */
    enter() {
        this.boss.frameX = 0;
        this.boss.maxFrameX = 7;
        this.boss.frameY = 1;
    };


    /**
     * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
     */
    handleState() {

    };
}


/**
 * A blueprint for the attack state of the boss
 */
export class Attack extends State {
    constructor(boss) {
        super('ATTACK');
        this.boss = boss;
    };


    /**
     * This method sets the x and y coordinates to the right positions to get the fitting animation for that state
     */
    enter() {
        this.boss.frameX = 0;
        this.boss.maxFrameX = 7;
        this.boss.frameY = 2;
    };


    /**
     * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
     */
    handleState() {

    };
}


/**
 * A blueprint for the hurt state of the boss
 */
export class Hurt extends State {
    constructor(boss) {
        super('HURT');
        this.boss = boss;
    };


    /**
     * This method sets the x and y coordinates to the right positions to get the fitting animation for that state
     */
    enter() {
        this.boss.frameX = 0;
        this.boss.maxFrameX = 2;
        this.boss.frameY = 3;
    };


    /**
    * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
    */
    handleState() {
        setTimeout(() => {
            this.boss.setState(0);
        }, 1000);
    };
}


/**
 * A blueprint for the dead state of the boss
 */
export class Dead extends State {
    constructor(boss) {
        super('DEAD');
        this.boss = boss;
    };


    /**
     * This method sets the x and y coordinates to the right positions to get the fitting animation for that state
     */
    enter() {
        this.boss.frameX = 0;
        this.boss.maxFrameX = 2;
        this.boss.frameY = 4;
    };


    /**
    * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
    */
    handleState() {

    };
}