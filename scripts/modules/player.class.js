export class Player {
    constructor(game) {
        this.game = game;
        this.spriteWidth = 610;
        this.spriteHeight = 1200;
        this.x = 0;
        this.y = this.game.height - this.spriteHeight;
        this.image = document.getElementById('player');
    };


    update() {
        // this.x++;
    };


    draw(context) {
        context.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y + 620, 300, 600);
    };
};