const scale = 5;

class CanvasDisplay {
  constructor(parent) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 420;
    this.canvas.height = 380;
    parent.appendChild(this.canvas);
    this.cx = this.canvas.getContext('2d');

    this.viewport = {
      width: this.canvas.width / scale,
      height: this.canvas.height / scale,
    };
  }

  clear() {
    this.canvas.remove();
  }
}

CanvasDisplay.prototype.clearDisplay = function() {
  this.cx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

CanvasDisplay.prototype.syncLevelState = function(state) {
  this.clearDisplay(state.status);
  this.drawLevels(state.level);
  this.drawBackground(state.level);
  // this.drawCollisions(state.level);
};

CanvasDisplay.prototype.syncState = function(state) {
  this.clearDisplay(state.status);
  this.drawBird(state.level);
  this.drawActors(state.actors);
};

CanvasDisplay.prototype.syncOverState = function(state) {
  this.clearDisplay(state.status);
  this.drawTrees(state.level);
};


CanvasDisplay.prototype.drawActors = function(actors) {
  for (const actor of actors) {
    const width = actor.size.x * scale;
    const height = actor.size.y * scale;
    const x = actor.pos.x * scale;
    const y = actor.pos.y * scale;
    if (actor.type == 'player') {
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

  let Line = 57;
  let tile = 8;
  if (player.speed.y !== 0) {
    tile = Math.floor(Date.now() / 60) % 3;
    if (player.speed.y > 0) { Line = 0; }
    if (player.speed.y < 0) { Line = 21; }
    wolfYStatic = Line;
  } else if (player.speed.x !== 0) {
    tile = Math.floor(Date.now() / 60) % 3;
    if (player.speed.x > 0) { Line = 63; }
    if (player.speed.x < 0) { Line = 42; }
    wolfYStatic = Line;
  }
  // this.cx.save();
  const tileX = tile * width;
  if (player.speed.x === 0 && player.speed.y === 0) {
    this.cx.drawImage(wolfImage, 0, wolfYStatic, width, height, x, y, width, height);
    return;
  }
  this.cx.drawImage(wolfImage, tileX, Line, width, height, x, y, width, height);
  // this.cx.restore();
};

// FUNZIONE PER DISEGNARE LE COLLISIONI

CanvasDisplay.prototype.drawCollisions = function(level) {
  const { width, height } = this.viewport;
  const xEnd = Math.ceil(width);
  const yEnd = Math.ceil(height);
  for (let y = 0; y < yEnd; y += 1) {
    for (let x = 0; x < xEnd; x += 1) {
      const tile = level.rows[y][x];
      let screenX;
      let screenY;
      let tileX;
      if (tile === 'wall') {
        screenX = (x - 0) * scale;
        screenY = (y - 0) * scale;
        tileX = 0;
        this.cx.drawImage(collisionSprites, tileX, 0, scale, scale, screenX, screenY, scale, scale);
      }
    }
  }
};

// FUNZIONE PER DISEGNARE ELEMENTI SOLIDI DEL BACKGROUND

CanvasDisplay.prototype.drawBackground = function(level) {
  let { width, height } = this.viewport;
  const xEnd = Math.ceil(width);
  const yEnd = Math.ceil(height);

  for (let y = 0; y < yEnd; y += 1) {
    for (let x = 0; x < xEnd; x += 1) {
      const tile = level.rows[y][x];
      let screenX;
      let screenY;
      let tileX;
      let tileY;
      let image;
      if (tile.charAt(0) === 't') {
        const n = tile.charAt(1);
        image = trees[n].treeDown;
        tileX = trees[n].downCoordX;
        tileY = trees[n].downCoordY;
        width = trees[n].downWidth;
        height = trees[n].downHeight;
        const adjustment = trees[n].adjust;
        screenX = (x * scale) + scale - 1;
        screenY = (y * scale) + adjustment;
        this.cx.drawImage(image, tileX, tileY, width, height, screenX, screenY, width, height);
      }
    }
  }
};


// FUNZIONE PER DISEGNARE ALBERO

CanvasDisplay.prototype.drawTrees = function(level) {
  let { width, height } = this.viewport;
  const xEnd = Math.ceil(width);
  const yEnd = Math.ceil(height);

  for (let y = 0; y < yEnd; y += 1) {
    for (let x = 0; x < xEnd; x += 1) {
      const tile = level.rows[y][x];
      let screenX;
      let screenY;
      let tileX;
      let tileY;
      let image;
      if (tile.charAt(0) === 't') {
        const n = tile.charAt(1);
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
};

// METODO PER DISEGNARE BACKGROUND LIVELLI

CanvasDisplay.prototype.drawLevels = function(level) {
  let { width, height } = this.viewport;
  const xEnd = Math.ceil(width);
  const yEnd = Math.ceil(height);

  for (let y = 0; y < yEnd; y += 1) {
    for (let x = 0; x < xEnd; x += 1) {
      const tile = level.rows[y][x];
      let screenX;
      let screenY;
      let tileX;
      let tileY;
      let image;
      if(tile.match(/level/g)){
        const platform = levels['level' + tile.match(/[0-9]+/g)];
        image = platform.level;
        tileX = platform.levelCoordX;
        tileY = platform.levelCoordY;
        width = platform.width;
        height = platform.height;
        screenX = platform.levelPosX;
        screenY = platform.levelPosY;
        this.cx.drawImage(image, tileX, tileY, width, height, screenX, screenY, width, height);
      }
    }
  }
};

// DISEGNA L'UCCELLO

CanvasDisplay.prototype.drawBird = function(level) {
  let { width, height } = this.viewport;
  const xEnd = Math.ceil(width);
  const yEnd = Math.ceil(height);

  for (let y = 0; y < yEnd; y += 1) {
    for (let x = 0; x < xEnd; x += 1) {
      const tile = level.rows[y][x];
      let screenX;
      let screenY;
      let tileX;
      let tileY;
      let image;
      if (tile === 'bird') {
        if (!birdAlive) {
          image = deadBird.img;
          tileX = deadBird.levelCoordX;
          tileY = deadBird.levelCoordY;
          width = deadBird.width;
          height = deadBird.height;
          screenX = x * scale;
          screenY = y * scale;
          this.cx.clearRect(screenX, screenY, width, height);
          this.cx.drawImage(image, tileX, tileY, width, height, screenX, screenY, width, height);
          return;
        }
        const d = Math.floor(Date.now() / 60);
        const c = d % 40 === 0;
        if (c) {
          image = eatingBird.img;
          tileX = eatingBird.levelCoordX;
          tileY = eatingBird.levelCoordY;
          width = eatingBird.width;
          height = eatingBird.height;
          screenX = x * scale;
          screenY = y * scale;
          this.cx.clearRect(screenX, screenY, width, height);
          this.cx.drawImage(image, tileX, tileY, width, height, screenX, screenY, width, height);
          return;
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
};