const states = {
    WALKING : 0,
    DEAD : 1
};


class State {
    constructor(state) {
        this.state = state;
    };
};


export class Walking extends State{
    constructor(enemy) {
        super('WALKING');
        this.enemy = enemy;
    };


    enter() {
       this.enemy.frameX = 0;
       this.enemy.maxFrameX =  2;
       this.enemy.frameY = 0; 
    };


    handleState() {

    };
};


export class Dead extends State{
    constructor(enemy) {
        super('DEAD');
        this.enemy = enemy;
    };


    enter() {
       this.enemy.frameX = 0;
       this.enemy.maxFrameX = 0;
       this.enemy.frameY = 1;
    };


    handleState() {
        
    };
};