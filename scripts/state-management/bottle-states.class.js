const states = {
    THROWING: 0,
    EXPLODING: 1
};


class State {
    constructor(state) {
        this.state = state;
    };
}


class Throwing extends State {
    constructor(bottle) {
        super('THROWING');
        this.bottle = bottle;
    };


    enter() {

    };


    handleState() {

    };
}


class Exploding extends State {
    constructor(bottle) {
        super('EXPLODING');
        this.bottle = bottle;
    };


    enter() {

    };


    handleState() {

    };
}