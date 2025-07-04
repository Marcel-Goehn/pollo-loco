/**
 * Creates, updates and draws the different layers of the background
 */
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


    /**
     * Updates the different layers with a different speed modifier to get a parallax effect
     */
    update() {
        if (this.game.bossFight) return;
        
        if (this.x < -this.width) {
            this.x = 0;
        }
        else {
            this.x -= this.game.gameSpeed * this.speedModifier;
        }
    };


    /**
     * It draws the different layers of the background
     * 
     * @param {context} context - This is the 2d context for the canvas. It allows to use multiple methods on the canvas 
     */
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x - 1 + this.width, this.y, this.width, this.height);
    };
};


/**
 * This class creates the background of the game
 */
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


    /**
     * It calls the update method of the specific layer
     */
    update() {
        this.backgroundLayers.forEach(layer => {
            layer.update();
        });
    };


    /**
     * It calls the draw method of the specific layer
     * 
     * @param {context} context - This is the 2d context for the canvas. It allows to use multiple methods on the canvas 
     */
    draw(context) {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context);
        });
    };
};