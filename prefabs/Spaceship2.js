// Spaceship prefab
class Spaceship2 extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // add to existing scene, displayList, updateList
        // stare pointValue
        this.points = pointValue;
    }

    update() {
        //move spaceship left
        this.x += game.settings.spaceshipSpeed;
        //wraparound from left to right edge
        if (this.x >= 1280+this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = 0;
    }
}