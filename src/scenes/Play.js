class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame:9});
        this.load.image('border', './assets/border.png');
        this.load.image('score', './assets/score.png');
        this.load.image('goldfish', './assets/goldfish.png');
        this.load.image('spaceship2', './assets/spaceship2.png');
      }
    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.starfield2 = this.add.tileSprite(640, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // border
        this.border = this.add.tileSprite(0, 0, 640, 480, 'border').setOrigin(0, 0);
        this.border2 = this.add.tileSprite(640, 0, 640, 480, 'border').setOrigin(0, 0);
        // score UI 
        this.Score = this.add.tileSprite(0, -20, 640, 480, 'score').setOrigin(0, 0);
        this.Score2 = this.add.tileSprite(640, -20, 640, 480, 'score').setOrigin(0, 0);

        // add rocket
        this.p1Rocket = new Rocket(this, game.config.width/4 - 8, 431, 'rocket').setScale(0.5, 0.5).setOrigin(0, 0);
        this.p2Rocket = new Rocket2(this, game.config.width*3/4 - 8, 431, 'rocket').setScale(0.5, 0.5).setOrigin(0, 0);

        // add spaceships
        this.ship01 = new Spaceship(this, game.config.width + 192, 150, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 200, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, 250, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship05 = new Spaceship2(this, -192, 150, 'spaceship2', 0, 30).setOrigin(0,0);
        this.ship06 = new Spaceship2(this, -96, 200, 'spaceship2', 0, 20).setOrigin(0,0);
        this.ship07 = new Spaceship2(this, 0, 250, 'spaceship2', 0, 10).setOrigin(0,0);
        this.ship04 = new Goldfish(this, game.config.width - 96, 100, 'goldfish', 0, 50 ).setOrigin(0,0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // animation config 
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        // score
        this.p1Score = 0;
        this.p2Score = 0;
        // score display
        let scoreConfig = {
            fontFamily: 'Oswald',
            fontSize: '28px',
            color: '#e5faff',   
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(90, 30, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(730, 30, this.p2Score, scoreConfig);
        // game over flag
        this.gameOver = false;
        // 60- second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            scoreConfig.backgroundColor = '#6878a0';
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }
    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
            this.scene.restart(this.p2Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        if(!this.gameOver){
            this.p1Rocket.update();
            this.p2Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
            this.ship05.update();
            this.ship06.update();
            this.ship07.update();
        }

        // check collision
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        if (this.checkCollision(this.p1Rocket, this.ship05)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship05);
        }
        if(this.checkCollision(this.p1Rocket, this.ship06)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship06);
        }
        if(this.checkCollision(this.p1Rocket, this.ship07)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship07);
        }

        // check collision p2
        if (this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship03);
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship02);
        }
        if(this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship01);
        }
        if(this.checkCollision(this.p2Rocket, this.ship04)) {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship04);
        }
        if (this.checkCollision(this.p2Rocket, this.ship05)) {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship05);
        }
        if(this.checkCollision(this.p2Rocket, this.ship06)) {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship06);
        }
        if(this.checkCollision(this.p2Rocket, this.ship07)) {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship07);
        }
    }
    checkCollision(rocket, ship) {
        //simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }
    }
    shipExplode(ship) {
        ship.alpha = 0; // temprarily hide ship
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode'); // play explode animation
        boom.on('animationcomplete', () => {
            // callback after animation completes
            ship.reset();   // reset ship position
            ship.alpha = 1; // make ship visible again
            boom.destroy(); // remove explosion sprite
        })
        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
    shipExplode2(ship) {
        ship.alpha = 0; // temprarily hide ship
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode'); // play explode animation
        boom.on('animationcomplete', () => {
            // callback after animation completes
            ship.reset();   // reset ship position
            ship.alpha = 1; // make ship visible again
            boom.destroy(); // remove explosion sprite
        })
        // score increment and repaint
        this.p2Score += ship.points;
        this.scoreRight.text = this.p2Score;
        this.sound.play('sfx_explosion');
    }
}
