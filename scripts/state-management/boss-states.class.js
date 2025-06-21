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
        this.boss.fps = 10;
        this.boss.frameRate = 1000 / this.boss.fps;
        this.boss.frameX = 0;
        this.boss.maxFrameX = 3;
        this.boss.frameY = 0;
        this.boss.animationType = this.state;
        this.boss.lastAttack = new Date().getTime();
        this.boss.bossFightHorizontalMovement = 1;
    };


    /**
     * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
     */
    handleState() {
        let currentTime = new Date().getTime();
        if (currentTime - this.boss.lastAttack > 2000 && (this.boss.x - this.boss.game.player.x < 200 || this.boss.game.player.x - this.boss.x > 200)) {
            this.boss.setState(states.ALERT);
        }
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
        this.boss.fps = 10;
        this.boss.frameRate = 1000 / this.boss.fps;
        this.boss.frameX = 0;
        this.boss.maxFrameX = 7;
        this.boss.frameY = 1;
        this.boss.animationType = this.state;
        this.boss.bossFightHorizontalMovement = 0;
    };


    /**
     * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
     */
    handleState() {
        if (this.boss.frameX >= this.boss.maxFrameX) {
            this.boss.setState(states.ATTACK);
        }
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
        this.boss.fps = 10;
        this.boss.frameRate = 1000 / this.boss.fps;
        this.boss.frameX = 0;
        this.boss.maxFrameX = 7;
        this.boss.frameY = 2;
        this.boss.animationType = this.state;
        this.boss.bossFightHorizontalMovement = 2;

        if (this.boss.x < this.boss.game.player.x) {
            this.boss.attackRight = true;
            this.boss.attackLeft = false;
        } else {
            this.boss.attackLeft = true;
            this.boss.attackRight = false;
        }
    };


    /**
     * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
     */
    handleState() {
        if (this.boss.x < 0 || this.boss.x > (this.boss.game.width - this.boss.bossWidth)) {
            this.boss.attackLeft = false;
            this.boss.attackRight = false;
            this.boss.setState(states.WALK);
        }
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
        this.boss.fps = 30;
        this.boss.frameRate = 1000 / this.boss.fps;
        this.boss.frameX = 0;
        this.boss.maxFrameX = 2;
        this.boss.frameY = 3;
        if (this.boss.game.bossHealthPoints !== 0) {
            this.boss.bossHurtMusic.play();
        }
        this.boss.animationType = this.state;
    };


    /**
    * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
    */
    handleState() {
        if (this.boss.game.bossHealthPoints === 0 && this.boss.frameX >= this.boss.maxFrameX) {
            this.boss.setState(states.DEAD);
        };
        if (this.boss.frameX >= this.boss.maxFrameX) {
            this.boss.setState(states.WALK);
        };
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
        this.boss.fps = 30;
        this.boss.frameRate = 1000 / this.boss.fps;
        this.boss.frameX = 0;
        this.boss.maxFrameX = 2;
        this.boss.frameY = 4;
        this.boss.bossDeadMusic.play();
        this.boss.animationType = this.state;
        this.boss.enterDeadTime = new Date().getTime();
    };


    /**
    * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
    */
    handleState() {
        let currentTime = new Date().getTime();
        if (this.boss.frameX >= this.boss.maxFrameX && !document.querySelector('.end-screen').classList.contains('win') && currentTime - this.boss.enterDeadTime >= 1500) {
            this.boss.game.backgroundMusic.pause();
            this.boss.game.youWinMusic.play();
            let endingScreen = document.querySelector('.end-screen');
            endingScreen.classList.add('win');
            endingScreen.classList.remove('d_none');
            document.getElementById('canvas1').classList.add('d_none');
        };
    };
}