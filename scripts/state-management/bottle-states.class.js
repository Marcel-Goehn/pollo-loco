const states = {
    THROWING: 0,
    EXPLODING: 1
};


// For debug purposes
class State {
    constructor(state) {
        this.state = state;
    };
}


/**
 * A blueprint for the throwing state of the throwing bottle
 */
export class Throwing extends State {
    constructor(bottle) {
        super('THROWING');
        this.bottle = bottle;
    };


    /**
     * This method sets the x and y coordinates to the right positions to get the fitting animation for that state
     */
    enter() {
        if (this.bottle.game.player.left) {
            this.bottle.speedX = -this.bottle.speedX;
        }
        this.bottle.fps = 30;
        this.bottle.frameRate = 1000 / this.bottle.fps;
        this.bottle.frameX = 0;
        this.bottle.maxFrameX = 3;
        this.bottle.frameY = 0;
        this.bottle.throwBottleMusic.play();

        this.bottle.verticalMovement -= this.bottle.throwHeight;
    };


    /**
     * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
     */
    handleState() {

    };
}


/**
 * A blueprint for the exploding state of the throwing bottle
 */
export class Exploding extends State {
    constructor(bottle) {
        super('EXPLODING');
        this.bottle = bottle;
    };


    /**
     * This method sets the x and y coordinates to the right positions to get the fitting animation for that state
     */
    enter() {
        this.bottle.fps = 30;
        this.bottle.frameRate = 1000 / this.bottle.fps;
        this.bottle.frameX = 0;
        this.bottle.maxFrameX = 5;
        this.bottle.frameY = 1;
        this.bottle.bottleBreaksMusic.play();
    };


    /**
     * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
     */
    handleState() {
        if (this.bottle.frameX >= this.bottle.maxFrameX) {
            this.bottle.markedForDeletion = true;
        };
    };
}