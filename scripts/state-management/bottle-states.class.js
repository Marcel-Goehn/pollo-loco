const states = {
    THROWING: 0,
    EXPLODING: 1
};


class State {
    constructor(state) {
        this.state = state;
    };
}


export class Throwing extends State {
    constructor(bottle) {
        super('THROWING');
        this.bottle = bottle;
    };


    enter() {
        this.bottle.frameX = 0;
        this.bottle.maxFrameX = 3;
        this.bottle.frameY = 0;

        this.bottle.verticalMovement -= this.bottle.throwHeight;
    };


    handleState() {

    };
}


export class Exploding extends State {
    constructor(bottle) {
        super('EXPLODING');
        this.bottle = bottle;
    };


    enter() {
        this.bottle.frameX = 0;
        this.bottle.maxFrameX = 5;
        this.bottle.frameY = 1;
    };


    handleState() {
        if (this.bottle.frameX >= this.bottle.maxFrameX) {
            this.bottle.markedForDeletion = true;
        };
    };
}