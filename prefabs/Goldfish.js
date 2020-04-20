// Spaceship prefab
class Goldfish extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene, displayList, updateList
        // stare pointValue
        this.points = pointValue;
    }

    update() {
        //move spaceship left
        this.x -= game.settings.fishSpeed;
        //wraparound from left to right edge
        if (this.x <= 0-this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }
}