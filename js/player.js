var Player = class Player {
    constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
    }
   
    get type() { return "player" }
   
    static create(pos) {
    return new Player(pos.plus(new Vec(0, 0)), new Vec(0, 0));
    }
}
   
Player.prototype.size = new Vec(1, 1);

let playerXSpeed = 8;
let playerYSpeed = 8;

Player.prototype.update = function(time, state, keys) {
    let xSpeed = 0;
    let ySpeed = 0;
    let pos = this.pos;
    if (keys.ArrowLeft || keys.ArrowRight) {
    if (keys.ArrowLeft) xSpeed -= playerXSpeed;
    if (keys.ArrowRight) xSpeed += playerXSpeed;
    let movedX = pos.plus(new Vec(xSpeed * time, 0));
    if (!state.level.touches(movedX, this.size, "wall")) {
    pos = movedX;
    }
    }
    else if (keys.ArrowUp || keys.ArrowDown) {
    if (keys.ArrowUp) ySpeed -= playerYSpeed;
    if (keys.ArrowDown) ySpeed += playerYSpeed;
    let movedY = pos.plus(new Vec(0, ySpeed * time));
    if (!state.level.touches(movedY, this.size, "wall")) {
    pos = movedY;
    }
    }
    return new Player(pos, new Vec(xSpeed, ySpeed));
};
