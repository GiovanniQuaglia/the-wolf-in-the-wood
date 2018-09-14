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
  width += wolf.XOverlap * 2;
  height += wolf.YOverlap;
  x = Math.floor(x -= wolf.XOverlap);
  y = Math.floor(y -= wolf.YOverlap);
  let Line = 57;
  let tile = 8;
  if (player.speed.y !== 0) {
    tile = Math.floor(Date.now() / 60) % 3;
    if (player.speed.y > 0) { Line = 0; }
    if (player.speed.y < 0) { Line = 21; }
    wolf.YStatic = Line;
  } else if (player.speed.x !== 0) {
    tile = Math.floor(Date.now() / 60) % 3;
    if (player.speed.x > 0) { Line = 63; }
    if (player.speed.x < 0) { Line = 42; }
    wolf.YStatic = Line;
  }
  const tileX = tile * width;
  if (player.speed.x === 0 && player.speed.y === 0) {
    this.cx.drawImage(wolf.avatar, 0, wolf.YStatic, width, height, x, y, width, height);
    return;
  }
  this.cx.drawImage(wolf.avatar, tileX, Line, width, height, x, y, width, height);
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
      if (tile === 'bird') {
        const alive = birdObject.standard;
        const eating = birdObject.eating;
        const dead = birdObject.dead;
        const clear = true;
        const timeToEat = Math.floor(Date.now() / 60) % 40 === 0;
        const displayThisBird = displayBird.bind(this)
        if (!birdAlive) {
          displayThisBird(dead, x, y, clear);
          return;
        }
        if (timeToEat) {
          displayThisBird(eating, x, y, clear);
          return;
        }
        displayThisBird(alive, x, y);
      }
    }
  }
};

const displayBird = function(bird, x, y, clear) {
  let image = bird.img;
  let tileX = bird.levelCoordX;
  let tileY = bird.levelCoordY;
  let width = bird.width;
  let height = bird.height;
  let screenX = x * scale;
  let screenY = y * scale;
  clear === true ? this.cx.clearRect(screenX, screenY, width, height) : null;
  this.cx.drawImage(image, tileX, tileY, width, height, screenX, screenY, width, height);
}