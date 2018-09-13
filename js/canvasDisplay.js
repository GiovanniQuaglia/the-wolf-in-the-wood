import birdAlive from './eatBird';

var scale = 5;

class CanvasDisplay {
    constructor(parent) {
      this.canvas = document.createElement("canvas");
      this.canvas.width = 420;
      this.canvas.height = 380;
      parent.appendChild(this.canvas);
      this.cx = this.canvas.getContext("2d");

      this.viewport = {
        width: this.canvas.width / scale,
        height: this.canvas.height / scale
      };
    }
    clear() {
      this.canvas.remove();
    }
  }

CanvasDisplay.prototype.syncLevelState = function(state) {
    this.clearDisplay(state.status);
    this.drawLevels(state.level);
    this.drawBackground(state.level);
    // this.drawCollisions(state.level);
};

CanvasDisplay.prototype.syncState = function(state) {
    this.clearDisplay(state.status);
    this.drawBird(state.level)
    this.drawActors(state.actors);
};

CanvasDisplay.prototype.syncOverState = function(state) {
    this.clearDisplay(state.status);
    this.drawTrees(state.level);
};

CanvasDisplay.prototype.clearDisplay = function() {
    this.cx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

CanvasDisplay.prototype.drawActors = function(actors) {
    for (let actor of actors) {
        let width = actor.size.x * scale;
        let height = actor.size.y * scale;
        let x = actor.pos.x * scale;
        let y = actor.pos.y * scale;
        if (actor.type == "player") {
        this.drawPlayer(actor, x, y, width, height);
        }
    }
};

CanvasDisplay.prototype.drawPlayer = function(player, x, y, width, height){
    let wolfYStatic = 0;
    const wolfXOverlap = wolfSprites.playerXOverlap;
    const wolfYOverlap = wolfSprites.playerYOverlap;
    width += wolfXOverlap * 2;
    height += wolfYOverlap;
    x -= wolfXOverlap;
    y -= wolfYOverlap;
    x = Math.floor(x);
    y = Math.floor(y);

    let Line = 57
    let tile = 8;
    if (player.speed.y != 0) {
        tile = Math.floor(Date.now() / 60) % 3;
        if(player.speed.y > 0){Line = 0}
        if(player.speed.y < 0){Line = 21}
        wolfYStatic = Line;
    } else if (player.speed.x != 0) {
        tile = Math.floor(Date.now() / 60) % 3;
        if(player.speed.x > 0){Line = 63}
        if(player.speed.x < 0){Line = 42}
        wolfYStatic = Line;
    }
    // this.cx.save();
    let tileX = tile * width;
    if (player.speed.x == 0 && player.speed.y == 0){
        this.cx.drawImage(wolfImage, 0, wolfYStatic, width, height, x, y, width, height);
        return
    }
    this.cx.drawImage(wolfImage, tileX, Line, width, height, x, y, width, height);
    // this.cx.restore();
}

// FUNZIONE PER DISEGNARE LE COLLISIONI

CanvasDisplay.prototype.drawCollisions = function(level) {
    let {width, height} = this.viewport;
    let xEnd = Math.ceil(width);
    let yEnd = Math.ceil(height);
    for (let y = 0; y < yEnd; y++) {
        for (let x = 0; x < xEnd; x++) {
        let tile = level.rows[y][x];
        let screenX;
        let screenY;
        let tileX;
        if (tile == "wall") {
            screenX = (x - 0) * scale;
            screenY = (y - 0) * scale;
            tileX = 0;
            this.cx.drawImage(collisionSprites, tileX, 0, scale, scale, screenX, screenY, scale, scale);
            }
        }
    }
}

// FUNZIONE PER DISEGNARE ELEMENTI SOLIDI DEL BACKGROUND

CanvasDisplay.prototype.drawBackground = function(level) {
    let {width, height} = this.viewport;
    let xEnd = Math.ceil(width);
    let yEnd = Math.ceil(height);

    for (let y = 0; y < yEnd; y++) {
        for (let x = 0; x < xEnd; x++) {
        let tile = level.rows[y][x];
        let screenX;
        let screenY;
        let tileX;
        let tileY;
        let image;
        let width;
        let height;
        if (tile.charAt(0) == "t" ) {
            let n = tile.charAt(1);
            image = trees[n].treeDown;
            tileX = trees[n].downCoordX;
            tileY = trees[n].downCoordY;
            width = trees[n].downWidth;
            height = trees[n].downHeight;
            adjustment = trees[n].adjust
            screenX = (x * scale) + scale -1;
            screenY = (y * scale) + adjustment;
            this.cx.drawImage(image, tileX, tileY, width, height, screenX, screenY, width, height);
        }
        }
    }
}


// FUNZIONE PER DISEGNARE ALBERO

CanvasDisplay.prototype.drawTrees = function(level) {
    let {width, height} = this.viewport;
    let xEnd = Math.ceil(width);
    let yEnd = Math.ceil(height);

    for (let y = 0; y < yEnd; y++) {
        for (let x = 0; x < xEnd; x++) {
            let tile = level.rows[y][x];
            let screenX;
            let screenY;
            let tileX;
            let tileY;
            let image;
            let width;
            let height;
            if (tile.charAt(0) == "t" ) {
                let n = tile.charAt(1);

                image = trees[n].treeUp;
                tileX = trees[n].upCoordX;
                tileY = trees[n].upCoordY;
                width = trees[n].upWidth;
                height = trees[n].upHeight;
                screenX = (x * scale) - trees[n].upPosX;
                screenY = (y * scale) - trees[n].upPosY;
                this.cx.drawImage(image, tileX, tileY, width, height, screenX, screenY, width, height);
          }
        }
    }
}

// METODO PER DISEGNARE BACKGROUND LIVELLI

CanvasDisplay.prototype.drawLevels = function(level) {
    let {width, height} = this.viewport;
    let xEnd = Math.ceil(width);
    let yEnd = Math.ceil(height);

    for (let y = 0; y < yEnd; y++) {
        for (let x = 0; x < xEnd; x++) {
            let tile = level.rows[y][x];
            let screenX;
            let screenY;
            let tileX;
            let tileY;
            let image;
            let width;
            let height;
            if (tile == "level0") {
                image = level00.level;
                tileX = level00.levelCoordX;
                tileY = level00.levelCoordY;
                width = level00.width;
                height = level00.height;
                screenX = level00.levelPosX;
                screenY = level00.levelPosY;
                    this.cx.drawImage(image, tileX, tileY, width, height, screenX, screenY, width, height);
            }
            if (tile == "level1") {
                image = level01.level;
                tileX = level01.levelCoordX;
                tileY = level01.levelCoordY;
                width = level01.width;
                height = level01.height;
                screenX = level01.levelPosX;
                screenY = level01.levelPosY;
                    this.cx.drawImage(image, tileX, tileY, width, height, screenX, screenY, width, height);
            }
        }
    }
}

// DISEGNA L'UCCELLO

CanvasDisplay.prototype.drawBird = function(level) {
    let {width, height} = this.viewport;
    let xEnd = Math.ceil(width);
    let yEnd = Math.ceil(height);

    for (let y = 0; y < yEnd; y++) {
        for (let x = 0; x < xEnd; x++) {
            let tile = level.rows[y][x];
            let screenX;
            let screenY;
            let tileX;
            let tileY;
            let image;
            let width;
            let height;
            if (tile == "bird") {
                if(!birdAlive){
                image = deadBird.img;
                tileX = deadBird.levelCoordX;
                tileY = deadBird.levelCoordY;
                width = deadBird.width;
                height = deadBird.height;
                screenX = x * scale;
                screenY = y* scale;
                this.cx.clearRect(screenX, screenY, width, height);
                this.cx.drawImage(image, tileX, tileY, width, height, screenX, screenY, width, height);
                return
                }
                let d = Math.floor(Date.now() / 60)
                let c = d % 40 == 0
                if(c){
                    image = eatingBird.img;
                    tileX = eatingBird.levelCoordX;
                    tileY = eatingBird.levelCoordY;
                    width = eatingBird.width;
                    height = eatingBird.height;
                    screenX = x  * scale;
                    screenY = y * scale;
                    this.cx.clearRect(screenX, screenY, width, height);
                    this.cx.drawImage(image, tileX, tileY, width, height, screenX, screenY, width, height);
                    return
                }
                image = bird.img;
                tileX = bird.levelCoordX;
                tileY = bird.levelCoordY;
                width = bird.width;
                height = bird.height;
                screenX = x * scale;
                screenY = y * scale;
                this.cx.drawImage(image, tileX, tileY, width, height, screenX, screenY, width, height);
            }
        }
    }
}
