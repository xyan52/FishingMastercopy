// Rocket prefab
class Rocket2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        // track firing status
        this.isFiring = false; 
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >=687 ) {
                this.x -= 2;
            } else if (keyRIGHT.isDown && this.x <= 1218) {
                this.x += 2;
            }
        }
        // fire button
        if(Phaser.Input.Keyboard.JustDown(keySHIFT) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play(); // play sfx
        }
        // if fired, move ip
        if(this.isFiring && this.y >= 108) {
            this.y -= 2;
        }
        // reset on miss
        if(this.y <= 108) {
            this.reset();
        }
    }
    reset() {
        this.isFiring = false;
        this.y = 431;
    }
}