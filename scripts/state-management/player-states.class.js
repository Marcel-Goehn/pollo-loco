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
            this.player.setState(states.IDLE, 0);
        }
        else if (inputKeys.includes('ArrowUp')) {
            this.player.setState(states.JUMPING, 1);
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
        if (this.player.verticalMovement > this.player.gravity) {
            this.player.setState(states.FALLING, 1);
        }
        // else if (inputKeys.length === 0 && this.player.isOnGround()) {
        //     this.player.setState(states.IDLE, 0);
        // }
        // else if ((inputKeys.includes('ArrowLeft') || inputKeys.includes('ArrowRight')) && this.player.isOnGround()) {
        //     this.player.setState(states.WALKING, 1);
        // };
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
        if (this.player.frameX >= this.player.maxFrameX && this.player.isOnGround()) {
            this.player.setState(states.IDLE, 0);
        }
        else if (this.player.frameX >= this.player.maxFrameX && !this.player.isOnGround()) {
            this.player.setState(states.FALLING, 1);
        };
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
        if (this.player.frameX >= this.player.maxFrameX && !document.querySelector('.end-screen').classList.contains('loose')) {
            let endingScreen = document.querySelector('.end-screen');
            endingScreen.classList.add('loose');
            endingScreen.classList.remove('d_none');
            document.getElementById('canvas1').classList.add('d_none');
        };
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
        enterIdleStateTime = new Date().getTime();
    };


    handleInput(inputKeys) {
        let idleTime = new Date().getTime();

        if (idleTime - enterIdleStateTime >= 5000) {
            this.player.setState(states.SLEEPING, 0);
        }
        else if (inputKeys.includes('ArrowLeft') || inputKeys.includes('ArrowRight')) {
            this.player.setState(states.WALKING, 1);
        }
        else if (inputKeys.includes('ArrowUp')) {
            this.player.setState(states.JUMPING, 1);
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
        if (inputKeys.includes('ArrowLeft') || inputKeys.includes('ArrowRight')) {
            this.player.setState(states.WALKING, 1);
        }
        else if (inputKeys.includes('ArrowUp')) {
            this.player.setState(states.JUMPING, 1);
        };
    };
};


export class Falling extends State {
    constructor(player) {
        super('FALLING');
        this.player = player;
    };


    enter() {
        this.player.frameX = 0;
        this.player.maxFrameX = 8;
        this.player.frameY = 1;
    };


    handleInput(inputKeys) {
        if (inputKeys.length === 0 && this.player.isOnGround()) {
            this.player.setState(states.IDLE, 0);
        }
        else if (inputKeys.includes('ArrowLeft') || inputKeys.includes('ArrowRight') && this.player.isOnGround()) {
            this.player.setState(states.WALKING, 1);
        };
    };
};