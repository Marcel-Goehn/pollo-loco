/**
 * Creates an instance of the user keyboard. This is important for the control of the character/player
 */
export class Keyboard {
    constructor(game) {
        this.keys = [];
        this.game = game;
        this.leftBtn = document.querySelector('.move-left-btn');
        this.rightBtn = document.querySelector('.move-right-btn');
        this.upBtn = document.querySelector('.move-up-btn');
        this.throwBtn = document.querySelector('.throw-bottle-btn');

        /**
         * Controls for PC user
         */
        window.addEventListener('keydown', (e) => {
            if ((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight') &&
                !this.keys.includes(e.key)) {
                this.keys.push(e.key);
            }
            if (e.key === 'ArrowUp') {
                this.game.player.jumpKeyPressed = true;
            }
            if (e.key === 'b') {
                this.game.debug = !this.game.debug;
            }
        });

        /**
         * Controls for PC user
         */
        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            };
            if (e.key === 'ArrowUp') {
                this.game.player.jumpKeyReleased = true;
                this.game.player.jumpKeyPressed = false;
            }
        });

        /**
         * Controls for Mobile user
         */
        this.leftBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (!this.keys.includes('ArrowLeft')) {
                this.keys.push('ArrowLeft');
            }
        });

        /**
         * Controls for Mobile user
         */
        this.rightBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (!this.keys.includes('ArrowRight')) {
                this.keys.push('ArrowRight');
            }
        });

        /**
         * Controls for Mobile user
         */
        this.upBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (!this.keys.includes('ArrowUp')) {
                this.keys.push('ArrowUp');
                this.game.player.jumpKeyPressed = true;
            }
        });

        /**
         * Controls for Mobile user
         */
        this.leftBtn.addEventListener('touchend', () => {
            this.keys.splice(this.keys.indexOf('ArrowLeft'), 1);
        });

        /**
         * Controls for Mobile user
         */
        this.rightBtn.addEventListener('touchend', () => {
            this.keys.splice(this.keys.indexOf('ArrowRight'), 1);
        });

        /**
         * Controls for Mobile user
         */
        this.upBtn.addEventListener('touchend', () => {
            this.keys.splice(this.keys.indexOf('ArrowUp'), 1);
            this.game.player.jumpKeyReleased = true;
            this.game.player.jumpKeyPressed = false;
        });
    }
}