const states = {
    WALKING : 0,
    DEAD : 1
};


// For debugging purposes
class State {
    constructor(state) {
        this.state = state;
    };
};


/**
 * A blueprint for the walking state of the enemies
 */
export class Walking extends State{
    constructor(enemy) {
        super('WALKING');
        this.enemy = enemy;
    };


    /**
     * This method sets the x and y coordinates to the right positions to get the fitting animation for that state
     */
    enter() {
       this.enemy.frameX = 0;
       this.enemy.maxFrameX =  2;
       this.enemy.frameY = 0; 
    };


    /**
     * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
     */
    handleState() {

    };
};


/**
 * A blueprint for the dead state if the enemies
 */
export class Dead extends State{
    constructor(enemy) {
        super('DEAD');
        this.enemy = enemy;
    };


    /**
     * This method sets the x and y coordinates to the right positions to get the fitting animation for that state
     */
    enter() {
       this.enemy.frameX = 0;
       this.enemy.maxFrameX = 0;
       this.enemy.frameY = 1;
       setTimeout(() => {
        this.enemy.markedForDeletion = true;
       }, 500);
    };


    /**
     * This method checks for each animation frame if there is a condition that is true so that the state will be changed again
     */
    handleState() {
        
    };
};