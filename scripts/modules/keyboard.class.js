export class Keyboard {
    constructor(game) {
        this.keys = [];
        this.game = game;
        window.addEventListener('keydown', (e) => {
            if ((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'd'
            ) && !this.keys.includes(e.key)) {
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
                e.key === 'ArrowRight' ||
                e.key === 'd') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            };
        });
    }
}