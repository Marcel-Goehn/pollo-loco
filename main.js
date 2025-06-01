import { Player } from './scripts/modules/player.class.js';
import { Keyboard } from './scripts/modules/keyboard.js';

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 720;
    const CANVAS_HEIGHT = canvas.height = 480;


    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.keyboard = new Keyboard();
        }
        

        update() {
            this.player.update(this.keyboard.keys);
        }


        draw(context) {
            this.player.draw(context);
        }
    }

    const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);
    console.log(game);


    const animate = () => {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});