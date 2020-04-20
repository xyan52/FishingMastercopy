let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);
// define game settings
game.settings = {
    spaceshipSpeed: 3,
    fishSpeed: 5,
    gameTimer: 60000
}
// reserve keyboard vars
let keyF, keyLEFT, keyRIGHT, keyA, keyD, keySHIFT;