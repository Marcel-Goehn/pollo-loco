export class BottleBar{
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('salsa_statusbar');
    };


    draw(context) {
        context.font = '50px Boogaloo';
        context.fillStyle = 'black';

        context.fillText(this.game.salsaBottles, 70, 65);
        context.drawImage(this.image, 20, 10, 75, 75);
    };
};


export class HealthBar{
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('health_statusbar');
    };


    draw(context) {
        context.font = '50px Boogaloo';
        context.fillStyle = 'black';

        context.fillText(this.game.healthPoints, 185, 65);
        context.drawImage(this.image, 120, 10, 75, 75);
    };
};


export class CoinBar{
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('coin_statusbar');
    };


    draw(context) {
        context.font = '50px Boogaloo';
        context.fillStyle = 'black';

        context.fillText(this.game.coins, 345, 65);
        context.drawImage(this.image, 280, 10, 75, 75);
    };
};


export class BossBar {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('boss_statusbar');
    };


    draw(context) {
        context.font = '50px Boogaloo';
        context.fillStyle = 'black'

        context.fillText(this.game.bossHealthPoints, 600, 65);
        context.drawImage(this.image, 530, 10, 75, 75);
    }
}