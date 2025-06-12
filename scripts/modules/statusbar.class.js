/**
 * This class shows how many bottles have been collected already
 */
export class BottleBar{
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('salsa_statusbar');
    };


    /**
     * Draws the statusbar for the collected bottles
     * 
     * @param {context} context - This is the 2d context for the canvas. It allows to use multiple methods on the canvas 
     */
    draw(context) {
        context.font = '50px Boogaloo';
        context.fillStyle = 'black';

        context.fillText(this.game.salsaBottles, 70, 65);
        context.drawImage(this.image, 20, 10, 75, 75);
    };
};


/**
 * This class is showing the current healthpoints of the player
 */
export class HealthBar{
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('health_statusbar');
    };


    /**
     * Draws the statusbar for the healthpoints of the player
     * 
     * @param {context} context - This is the 2d context for the canvas. It allows to use multiple methods on the canvas
     */
    draw(context) {
        context.font = '50px Boogaloo';
        context.fillStyle = 'black';

        context.fillText(this.game.healthPoints, 185, 65);
        context.drawImage(this.image, 120, 10, 75, 75);
    };
};


/**
 * This class shows how many coins have been collected
 */
export class CoinBar{
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('coin_statusbar');
    };


    /**
     * Draws the statusbar for the collected coins
     * 
     * @param {context} context - This is the 2d context for the canvas. It allows to use multiple methods on the canvas
     */
    draw(context) {
        context.font = '50px Boogaloo';
        context.fillStyle = 'black';

        context.fillText(this.game.coins, 345, 65);
        context.drawImage(this.image, 280, 10, 75, 75);
    };
};


/**
 * This class is showing the current healthpoints of the boss
 */
export class BossBar {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('boss_statusbar');
    };


    /**
     * Draws the statusbar for the healthpoints of the boss
     * 
     * @param {context} context - This is the 2d context for the canvas. It allows to use multiple methods on the canvas
     */
    draw(context) {
        context.font = '50px Boogaloo';
        context.fillStyle = 'black'

        context.fillText(this.game.bossHealthPoints, 600, 65);
        context.drawImage(this.image, 530, 10, 75, 75);
    }
}