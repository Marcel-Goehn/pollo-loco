export class Coin {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.image = document.getElementById('coin');
        this.width = 50;
        this.height = 50;
        this.markedForDeletion = false;
    };


    update(){
        this.x -= this.game.gameSpeed;

        // Checks if coin is off screen
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        };
    };


    draw(context) {
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height);
        };

        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
}