import { Player } from './scripts/modules/player.class.js';
import { Keyboard } from './scripts/modules/keyboard.class.js';
import { Background } from './scripts/modules/background.class.js';
import { RegularChicken, SmallChicken } from './scripts/modules/enemies.class.js';
import { BottleBar, HealthBar, CoinBar } from './scripts/modules/statusbar.class.js';
import { AirBottle, GroundBottle } from './scripts/modules/bottle.class.js';
import { ThrowableBottle } from './scripts/modules/throwable-bottle.class.js';
import { Coin } from './scripts/modules/coin.class.js';

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 720;
    const CANVAS_HEIGHT = canvas.height = 480;

    let lastBottleThrown = 0;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 55;
            this.gameSpeed = 0;
            this.maxGameSpeed = 3;
            this.player = new Player(this);
            this.keyboard = new Keyboard(this);
            this.background = new Background(this);
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 2000;
            this.debug = true;
            this.salsaBottles = 0;
            this.healthPoints = 100;
            this.coins = 0;
            this.statusBars = [new BottleBar(this), new HealthBar(this), new CoinBar(this)];
            this.bottles = [new GroundBottle(this, 500), new AirBottle(this, 1000), new GroundBottle(this, 1500), new GroundBottle(this, 2000), new AirBottle(this, 2500), new AirBottle(this, 3000), new AirBottle(this, 3500), new GroundBottle(this, 4000), new GroundBottle(this, 4500), new GroundBottle(this, 5000)];
            this.throwableBottles = [];
            this.collectableCoins = [new Coin(this, 200, 200)];
        };


        update(deltaTime) {
            this.background.update();
            this.player.update(this.keyboard.keys, deltaTime);

            // Interval to add enemies to the game
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemies();
                this.enemyTimer = 0;
            }
            else {
                this.enemyTimer += deltaTime;
            }
            //

            // Enemy deletion
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if (enemy.markedForDeletion) {
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
                };
            });

            // Bottle deletion
            this.bottles.forEach(bottle => {
                bottle.update();
                if (bottle.markedForDeletion) {
                    this.bottles.splice(this.bottles.indexOf(bottle), 1);
                };
            });

            // Initialize throwing bottle
            this.throwableBottles.forEach(bottle => {
                bottle.update(deltaTime);
            });

            window.addEventListener('keyup', (event) => {
                let timePassedBy = new Date().getTime();
                if (event.key === 'd' && this.salsaBottles > 0 && timePassedBy - lastBottleThrown > 50) {
                    this.throwableBottles.push(new ThrowableBottle(this));
                    this.salsaBottles--;
                    lastBottleThrown = new Date().getTime();
                };
            });

            // Throwable Bottle deletion
            this.throwableBottles.forEach(bottle => {
                if (bottle.markedForDeletion) {
                    this.throwableBottles.splice(this.throwableBottles.indexOf(bottle), 1);
                };
            });

            // Enemy deletion
            this.collectableCoins.forEach(coin => {
                coin.update();
                if (coin.markedForDeletion) {
                    this.collectableCoins.splice(this.collectableCoins.indexOf(coin), 1);
                };
            });
        };


        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.statusBars.forEach(statusBar => {
                statusBar.draw(context);
            });
            this.bottles.forEach(bottle => {
                bottle.draw(context);
            });
            this.throwableBottles.forEach(bottle => {
                bottle.draw(context);
            });
            this.collectableCoins.forEach(coin => {
                coin.draw(context);
            });
        };


        addEnemies() {
            this.enemies.push(new RegularChicken(this));
            if (this.gameSpeed > 0 && Math.random() < 0.5) {
                this.enemies.push(new SmallChicken(this));
            };
        };
    };

    const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);
    console.log(game);
    let lastTime = 0;

    const animate = (timeStamp) => {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    };
    animate(0);
});