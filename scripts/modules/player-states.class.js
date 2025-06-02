const states = {
    WALKING: 0,
    JUMPING: 1,
    HURT: 2,
    DEAD: 3,
    IDLE: 4,
    SLEEPING: 5
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
        this.player.frameX = 0;
        this.player.maxFrameX = 5;
        this.player.frameY = 0;
    };


    handleInput(inputKeys) {
        if (inputKeys.length === 0) {
            this.player.setState(states.IDLE);
        }
        else if (inputKeys.includes('ArrowUp')) {
            this.player.setState(states.JUMPING);
            console.log(this.player.currentState);
        };
    };
};


export class Jumping extends State {
    constructor(player) {
        super('JUMPING');
        this.player = player;
    };


    enter() {
        if (this.player.isOnGround()) {
            this.player.verticalMovement -= this.player.jumpHeight;
        };
        this.player.frameX = 0;
        this.player.maxFrameX = 8; 
        this.player.frameY = 1;
    };


    handleInput(inputKeys) {
        if (inputKeys.length === 0 && this.player.isOnGround()) {
            this.player.setState(states.IDLE);
        }
        else if ((inputKeys.includes('ArrowLeft') || inputKeys.includes('ArrowRight')) && this.player.isOnGround()) {
            this.player.setState(states.WALKING);
        };
    };
};


export class Hurt extends State {
    constructor(player) {
        super('HURT');
        this.player = player;
    };


    enter() {
        this.player.frameX = 0;
        this.player.maxFrameX = 2;
        this.player.frameY = 2;
    };


    handleInput(inputKeys) {

    };
};


export class Dead extends State {
    constructor(player) {
        super('DEAD');
        this.player = player;
    };


    enter() {
        this.player.frameX = 0;
        this.player.maxFrameX = 6;
        this.player.frameY = 3;
    };


    handleInput(inputKeys) {

    };
};


export class Idle extends State {
    constructor(player) {
        super('IDLE');
        this.player = player;
    };


    enter() {
        this.player.frameX = 0;
        this.player.maxFrameX = 9;
        this.player.frameY = 4;
    };


    handleInput(inputKeys) {
        if (inputKeys.includes('ArrowLeft') || inputKeys.includes('ArrowRight')) {
            this.player.setState(states.WALKING);
        }
        else if (inputKeys.includes('ArrowUp')) {
            this.player.setState(states.JUMPING);
        };
    };
};


export class Sleeping extends State {
    constructor(player) {
        super('SLEEPING');
        this.player = player;
    };


    enter() {
        this.player.frameX = 0;
        this.player.maxFrameX = 9;
        this.player.frameY = 5;
    };


    handleInput(inputKeys) {
        
    };
};