const states = {
    WALK: 0,
    ALERT: 1,
    ATTACK: 2,
    HURT: 3,
    DEAD: 4
}


class State {
    constructor(state) {
        this.state = state;
    };
}


export class Walk extends State {
    constructor(boss) {
        super('WALK');
        this.boss = boss;
    };


    enter() {
        this.boss.frameX = 0;
        this.boss.maxFrameX = 3;
        this.boss.frameY = 0;
    };


    handleState() {

    };
}


export class Alert extends State {
    constructor(boss) {
        super('ALERT');
        this.boss = boss;
    };


    enter() {
        this.boss.frameX = 0;
        this.boss.maxFrameX = 7;
        this.boss.frameY = 1;
    };


    handleState() {

    };
}


export class Attack extends State {
    constructor(boss) {
        super('ATTACK');
        this.boss = boss;
    };


    enter() {
        this.boss.frameX = 0;
        this.boss.maxFrameX = 7;
        this.boss.frameY = 2;
    };


    handleState() {

    };
}


export class Hurt extends State {
    constructor(boss) {
        super('HURT');
        this.boss = boss;
    };


    enter() {
        this.boss.frameX = 0;
        this.boss.maxFrameX = 2;
        this.boss.frameY = 3;
    };


    handleState() {
        setTimeout(() => {
            this.boss.setState(0);
        }, 1000);
    };
}


export class Dead extends State {
    constructor(boss) {
        super('DEAD');
        this.boss = boss;
    };


    enter() {
        this.boss.frameX = 0;
        this.boss.maxFrameX = 2;
        this.boss.frameY = 4;
    };



    handleState() {

    };
}