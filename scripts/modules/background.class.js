class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    };


    update() {
        if (this.x < -this.width) {
            this.x = 0;
        }
        else {
            this.x -= this.game.gameSpeed * this.speedModifier;
        }
    };


    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    };
};


export class Background {
    constructor(game) {
        this.game = game;
        this.width = 1080;
        this.height = 480;
        this.airImage = document.getElementById('air');
        this.cloudsImage = document.getElementById('clouds');
        this.thirdLayerImage = document.getElementById('layer_three');
        this.secondLayerImage = document.getElementById('layer_two');
        this.firstLayerImage = document.getElementById('layer_one');
        this.airLayer = new Layer(this.game, this.width, this.height, 0, this.airImage);
        this.cloudLayer = new Layer(this.game, this.width, this.height, 0.2, this.cloudsImage);
        this.thirdLayer = new Layer(this.game, this.width, this.height, 0.4, this.thirdLayerImage);
        this.secondLayer = new Layer(this.game, this.width, this.height, 0.6, this.secondLayerImage);
        this.firstLayer = new Layer(this.game, this.width, this.height, 0.8, this.firstLayerImage);
        this.backgroundLayers = [this.airLayer, this.cloudLayer, this.thirdLayer, this.secondLayer, this.firstLayer];
    };


    update() {
        this.backgroundLayers.forEach(layer => {
            layer.update();
        });
    };


    draw(context) {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        });
    };
};