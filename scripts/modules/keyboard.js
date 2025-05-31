export class Keyboard {
    constructor() {
        this.keys = [];
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' && !this.keys.includes('ArrowDown')) {
                
            }
            console.log(e.key);
        });
    }
}