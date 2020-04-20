  
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/sfx_select.wav');
        this.load.audio('sfx_explosion', './assets/sfx_explosion.wav');
        this.load.audio('sfx_rocket', './assets/sfx_rocket.wav');
        this.load.image('bubble', './assets/bubble.png');
    }

    create() {
        this.bubble = this.add.tileSprite(0, 0, 640, 480, 'bubble').setOrigin(0, 0);
        this.bubble2 = this.add.tileSprite(640, 0, 640, 480, 'bubble').setOrigin(0, 0);
        // menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY- textSpacer, 'FISHING MASTER', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Use ←→/AD arrows to move & (F/SHIFT) to Fire', menuConfig).setOrigin(0.5);
        menuConfig.color = '#000';
        this.add.text(centerX, centerY + textSpacer, 'Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);  
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        this.bubble.tilePositionY += 4;
        this.bubble2.tilePositionY += 4;
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                fishSpeed: 5,
                gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                fishSpeed: 6,
                gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
        }
    }
}