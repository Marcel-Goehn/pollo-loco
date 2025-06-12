/**
 * This class creates the collectable coins
 */
export class Coin {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.image = document.getElementById('coin');
        this.width = 75;
        this.height = 75;
        this.markedForDeletion = false;
    };


    /**
     * Updates the position of the coins
     */
    update(){
        this.x -= this.game.gameSpeed;

        // Checks if coin is off screen
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        };
    };


    /**
     * Draws the coins into the canvas
     * 
     * @param {context} context - This is the 2d context for the canvas. It allows to use multiple methods on the canvas
     */
    draw(context) {
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height);
        };

        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
}