import { Player } from './scripts/modules/player.class.js';
import { Keyboard } from './scripts/modules/keyboard.class.js';
import { Background } from './scripts/modules/background.class.js';
import { RegularChicken, SmallChicken } from './scripts/modules/enemies.class.js';
import { BottleBar, HealthBar, CoinBar, BossBar } from './scripts/modules/statusbar.class.js';
import { AirBottle, GroundBottle } from './scripts/modules/bottle.class.js';
import { ThrowableBottle } from './scripts/modules/throwable-bottle.class.js';
import { Coin } from './scripts/modules/coin.class.js';
import { Boss } from './scripts/modules/boss.class.js';

let game;
let animationFrameId;
const startBtn = document.getElementById('start_btn');
const startMenu = document.querySelector('.start-menu');
const returnToMenuBtn = document.getElementById('return_to_start_page');
const restartBtn = document.getElementById('replay');
const endScreen = document.querySelector('.end-screen');


/**
 * Returns the player to the starting menu after winning or loosing a game
 */
const handleReturnToMenuClick = () => {
    startMenu.classList.remove('d_none');
    endScreen.classList.add('d_none');
    if (animationFrameId) cancelAnimationFrame(animationFrameId);

    if (endScreen.classList.contains('win')) {
        endScreen.classList.remove('win');
    }
    else {
        endScreen.classList.remove('loose');
    };
}

returnToMenuBtn.addEventListener('click', handleReturnToMenuClick);
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);


/**
 * This function initializes the game and all of its instances 
 */
function startGame() {
    if (!endScreen.classList.contains('d_none')) {
        endScreen.classList.add('d_none');
    }
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    endScreen.classList.remove('loose');
    startMenu.classList.add('d_none');
    const canvas = document.getElementById('canvas1');
    canvas.classList.remove('d_none');
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 720;
    const CANVAS_HEIGHT = canvas.height = 480;

    let lastBottleThrown = 0;


    /**
     * The blueprint for the whole game and wich elements will be created
     */
    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 55;
            this.gameSpeed = 0;
            this.bossFight = false;
            this.maxGameSpeed = 3;
            this.player = new Player(this);
            this.keyboard = new Keyboard(this);
            this.background = new Background(this);
            this.boss = new Boss(this);
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 2000;
            this.debug = true;
            this.salsaBottles = 0;
            this.healthPoints = 100;
            this.bossHealthPoints = 100;
            this.coins = 0;
            this.statusBars = [new BottleBar(this), new HealthBar(this), new CoinBar(this)];
            this.statusBossBar = new BossBar(this);
            this.bottles = [new GroundBottle(this, 500), new AirBottle(this, 1000), new GroundBottle(this, 1500), new GroundBottle(this, 2000), new AirBottle(this, 2500), new AirBottle(this, 3000), new AirBottle(this, 3500), new GroundBottle(this, 4000), new GroundBottle(this, 4500), new GroundBottle(this, 5000)];
            this.throwableBottles = [];
            this.collectableCoins = [new Coin(this, 1200, 250), new Coin(this, 1250, 200), new Coin(this, 1300, 150), new Coin(this, 1350, 200), new Coin(this, 1400, 250), new Coin(this, 2000, 250), new Coin(this, 2050, 200), new Coin(this, 2100, 150), new Coin(this, 2150, 200), new Coin(this, 2200, 250), new Coin(this, 5200, 250), new Coin(this, 5250, 200), new Coin(this, 5300, 150), new Coin(this, 5350, 200), new Coin(this, 5400, 250)];
            this.backgroundMusic();
        };


        backgroundMusic() {
            let music = new Audio('./assets/audio/game_music.mp3');
            music.loop = true;
            music.volume = 0.005;
            music.play();
        }


        /**
         * This method will call all the update methods of the created instances wich are getting drawn into the canvas
         * 
         * @param {number} deltaTime - The time that has passed since the last animation frame and the current one 
         */
        update(deltaTime) {
            this.background.update();
            this.player.update(this.keyboard.keys, deltaTime);
            this.boss.update(this.keyboard.keys, deltaTime);

            // Interval to add enemies to the game
            if (this.enemyTimer > this.enemyInterval && this.boss.x > 2000) {
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

            // Coin deletion
            this.collectableCoins.forEach(coin => {
                coin.update();
                if (coin.markedForDeletion) {
                    this.collectableCoins.splice(this.collectableCoins.indexOf(coin), 1);
                };
            });
        };


        /**
         * This method will call the draw methods of the created instances, so that they are drawn into the canvas
         * 
         * @param {context} context - The 2d context, wich allows to use methods of the canvas api 
         */
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.boss.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.statusBars.forEach(statusBar => {
                statusBar.draw(context);
            });
            if (this.boss.x < 700) {
                this.statusBossBar.draw(context);
            }
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


        /**
         * This method will create and add the enemies to the game
         */
        addEnemies() {
            this.enemies.push(new RegularChicken(this));
            if (this.gameSpeed > 0 && Math.random() < 0.5) {
                this.enemies.push(new SmallChicken(this));
            };
        };


        /**
         * This method resets the game after the game is over
         */
        reset() {
            this.gameSpeed = 0;
            this.player = new Player(this);
            this.keyboard = new Keyboard(this);
            this.background = new Background(this);
            this.boss = new Boss(this);
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 2000;
            this.salsaBottles = 0;
            this.healthPoints = 100;
            this.bossHealthPoints = 100;
            this.coins = 0;
            this.statusBars = [
                new BottleBar(this),
                new HealthBar(this),
                new CoinBar(this)
            ];
            this.statusBossBar = new BossBar(this);

            this.bottles = [
                new GroundBottle(this, 500), new AirBottle(this, 1000),
                new GroundBottle(this, 1500), new GroundBottle(this, 2000),
                new AirBottle(this, 2500), new AirBottle(this, 3000),
                new AirBottle(this, 3500), new GroundBottle(this, 4000),
                new GroundBottle(this, 4500), new GroundBottle(this, 5000)
            ];

            this.throwableBottles = [];

            this.collectableCoins = [
                new Coin(this, 1200, 250), new Coin(this, 1250, 200),
                new Coin(this, 1300, 150), new Coin(this, 1350, 200),
                new Coin(this, 1400, 250), new Coin(this, 2000, 250),
                new Coin(this, 2050, 200), new Coin(this, 2100, 150),
                new Coin(this, 2150, 200), new Coin(this, 2200, 250),
                new Coin(this, 5200, 250), new Coin(this, 5250, 200),
                new Coin(this, 5300, 150), new Coin(this, 5350, 200),
                new Coin(this, 5400, 250)
            ];
        }
    };

    game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);
    game.reset();
    console.log(game);
    let lastTime = 0;


    /**
     * This method will create the ongoing animation loop of the game
     * 
     * @param {number} timeStamp - The timestamp of the current animation loop 
     */
    const animate = (timeStamp) => {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        game.update(deltaTime);
        game.draw(ctx);
        animationFrameId = requestAnimationFrame(animate);
    };
    animate(0);
};