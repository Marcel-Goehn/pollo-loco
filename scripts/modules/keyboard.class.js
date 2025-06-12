/**
 * Creates an instance of the user keyboard. This is important for the control of the character/player
 */
export class Keyboard {
    constructor(game) {
        this.keys = [];
        this.game = game;
        window.addEventListener('keydown', (e) => {
            if ((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight') && 
                !this.keys.includes(e.key)) {
                this.keys.push(e.key);
            }
            else if (e.key === 'b') {
                this.game.debug = !this.game.debug;
            }
        });
        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            };
        });
    }
}