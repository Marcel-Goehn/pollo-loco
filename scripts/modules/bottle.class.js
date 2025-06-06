class Bottle {
    constructor(game, x) {
        this.game = game;
        this.x = x;
        this.markedForDeletion = false;
    };


    update() {
        this.x -= this.game.gameSpeed;

        // Check if enemy is off screen
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
    };


    draw(context) {
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height);
        };

        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
}


export class GroundBottle extends Bottle {
    constructor(game, x) {
        super(game, x);
        this.width = 75;
        this.height = 75;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('salsa_bottle_ground');
    };
}


export class AirBottle extends Bottle {
    constructor(game, x) {
        super(game, x);
        this.width = 75;
        this.height = 75;
        this.y = this.game.height - this.height - this.game.groundMargin - 150;
        this.image = document.getElementById('salsa_bottle_air');
    };
}