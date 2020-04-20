/* 
    xyan52
    Sunny Yan
    points breakdown:
    Implement an alternating two-player mode (25)
    Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (25)
    Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (50)
    Create your own mod and justify its score：worked hard (🤷🏻‍♂️)
*/
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