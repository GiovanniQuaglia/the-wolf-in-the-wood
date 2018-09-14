const canvasLevels = document.getElementById("canvasLevels");
const canvasBelow = document.getElementById("canvasBelow");
const canvasAbove = document.getElementById("canvasAbove");

var State = class State {
    constructor(level, actors, status) {
        this.level = level;
        this.actors = actors;
        this.status = status;
    }
   
    static start(level) {
        return new State(level, level.startActors, "playing");
    }
   
    get player() {
        return this.actors.find(a => a.type == "player");
    }
};

State.prototype.update = function(time, keys, currentLevel) {
    let actors = this.actors
    .map(actor => actor.update(time, this, keys));
    let newState = new State(this.level, actors, this.status);
   
    if (newState.status != "playing") return newState;
   
    let player = newState.player;

    if (this.level.touches(player.pos, player.size, "next")) {
        switchPlayerPosition(currentLevel, "@", "x", 1);
        return new State(this.level, actors, "levelUp");
    }

    if (this.level.touches(player.pos, player.size, "previous")) {
        switchPlayerPosition(currentLevel, "@", "y", -1);
        return new State(this.level, actors, "levelDown");
    }

    if (this.level.touches(player.pos, player.size, "bird")) {
        eatBird();
    }

    if (this.level.touches(player.pos, player.size, "hill")) {
        playerXSpeed = 5;
        playerYSpeed = 5;
    }

    if (this.level.touches(player.pos, player.size, "empty")) {
        playerXSpeed = 8;
        playerYSpeed = 8;
    }

    for (let actor of actors) {
        if (actor != player && overlap(actor, player)) {
            newState = actor.collide(newState);
        }
    }
    return newState;
};
   
var Vec = class Vec {
    constructor(x, y) {
    this.x = x; this.y = y;
    }
    plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
    }
    times(factor) {
    return new Vec(this.x * factor, this.y * factor);
    }
};



