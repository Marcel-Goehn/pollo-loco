const states = {
    WALKING : 0,
    JUMPING : 1,
    HURT : 2,
    DEAD : 3,
    IDLE : 4,
    SLEEPING : 5
};


class State {
    constructor(state) {
        this.state = state;
    };
};


export class Walking extends State {
    constructor(player) {
        super('WALKING');
        this.player = player;
    };


    enter() {
        this.player.frameY = 0;
    };


    handleInput() {

    };
};