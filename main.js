import { Player } from './scripts/modules/player.class.js';
import { Keyboard } from './scripts/modules/keyboard.class.js';
import { Background } from './scripts/modules/background.class.js';

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 720;
    const CANVAS_HEIGHT = canvas.height = 480;


    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 55;
            this.gameSpeed = 3;
            this.player = new Player(this);
            this.keyboard = new Keyboard();
            this.background = new Background(this);
        };
        

        update(deltaTime) {
            this.background.update();
            this.player.update(this.keyboard.keys, deltaTime);
        };


        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
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