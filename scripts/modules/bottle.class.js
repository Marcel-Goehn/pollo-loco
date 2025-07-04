/**
 * The super class for the GroundBottle and AirBottle
 */
class Bottle {
    constructor(game, x) {
        this.game = game;
        this.x = x;
        this.markedForDeletion = false;
    };


    /**
     * Updates the position of the bottles 
     */
    update() {
        this.x -= this.game.gameSpeed;

        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
    };


    /**
     * Draws the bottles into the canvas
     * 
     * @param {context} context - This is the 2d context for the canvas. It allows to use multiple methods on the canvas
     */
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
}


/**
 * This child class creates the collectable bottles that are positioned on the ground
 */
export class GroundBottle extends Bottle {
    constructor(game, x) {
        super(game, x);
        this.width = 75;
        this.height = 75;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('salsa_bottle_ground');
    };
}


/**
 * This child class creates the collectable bottles that are positioned in the air
 */
export class AirBottle extends Bottle {
    constructor(game, x) {
        super(game, x);
        this.width = 75;
        this.height = 75;
        this.y = this.game.height - this.height - this.game.groundMargin - 150;
        this.image = document.getElementById('salsa_bottle_air');
    };
}