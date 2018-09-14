// WOLF SPRITE

const wolfImage = new Image();
wolfImage.src = 'sprites/wolf/wolfNew_68x84.png';

const wolf = {
    avatar: wolfImage,
    XOverlap: 6,
    YOverlap: 16,
    YStatic: 0
};

// COLLISIONS SPRITES

let collisionSprites = document.createElement("img");
collisionSprites.src = "sprites/collision.png";

// TREES SPRITES

let treeSpritesUp01 = document.createElement("img");
treeSpritesUp01.src = "sprites/albero01/albero01_up.png";
let treeSpritesDown01 = document.createElement("img");
treeSpritesDown01.src = "sprites/albero01/albero01_down.png";

let treeSpritesUp02 = document.createElement("img");
treeSpritesUp02.src = "sprites/albero02/albero02_up.png";
let treeSpritesDown02 = document.createElement("img");
treeSpritesDown02.src = "sprites/albero02/albero02_down.png";

let treeSpritesUp04 = document.createElement("img");
treeSpritesUp04.src = "sprites/albero04/albero04_up.png";
let treeSpritesDown04 = document.createElement("img");
treeSpritesDown04.src = "sprites/albero04/albero04_down.png";

const trees = {
  0: {
    treeUp: treeSpritesUp01,
    upWidth: 45,
    upHeight: 62,
    upCoordX: 0,
    upCoordY: 0,
    upPosX: 4,
    upPosY: 62,
    treeDown: treeSpritesDown01,
    downWidth: 35,
    downHeight: 15,
    downCoordX: 0,
    downCoordY: 0,
    adjust: -1,
  },
  1: {
    treeUp: treeSpritesUp02,
    upWidth: 46,
    upHeight: 67,
    upCoordX: 0,
    upCoordY: 0,
    upPosX: 8,
    upPosY: 66,
    treeDown: treeSpritesDown02,
    downWidth: 29,
    downHeight: 16,
    downCoordX: 0,
    downCoordY: 0,
    adjust: 0,
  },
  2: {
    treeUp: treeSpritesUp04,
    upWidth: 42,
    upHeight: 70,
    upCoordX: 0,
    upCoordY: 0,
    upPosX: 5,
    upPosY: 67,
    treeDown: treeSpritesDown04,
    downWidth: 23,
    downHeight: 17,
    downCoordX: 0,
    downCoordY: 0,
    adjust: 2,
  }
}



// LEVELS SPRITES

let levelImg00 = document.createElement("img");
levelImg00.src = "sprites/levels/Level00.png";

let levelImg01 = document.createElement("img");
levelImg01.src = "sprites/levels/Level01.png";

let levelImg02 = document.createElement("img");
levelImg02.src = "sprites/levels/Level02.png";

const levels = {
  level00: {
    level: levelImg00,
    width: 420,
    height: 420,
    levelCoordX: 0,
    levelCoordY: 0,
    levelPosX: 0,
    levelPosY: 0,
  },
  level01: {
    level: levelImg01,
    width: 420,
    height: 420,
    levelCoordX: 0,
    levelCoordY: 0,
    levelPosX: 0,
    levelPosY: 0,
  },
  level02: {
    level: levelImg02,
    width: 420,
    height: 420,
    levelCoordX: 0,
    levelCoordY: 0,
    levelPosX: 0,
    levelPosY: 0,
  }
}

// THE BIRD

let theBird = document.createElement("img");
theBird.src = "sprites/bird/bird.png";

let theEatDeadBird = document.createElement("img");
theEatDeadBird.src = "sprites/bird/birdEat.png";

let theDeadBird = document.createElement("img");
theDeadBird.src = "sprites/bird/deadBird.png";

const birdObject = {
  standard: {
    img: theBird,
    width: 12,
    height: 12,
    levelCoordX: 0,
    levelCoordY: 0,
    levelPosX: 6,
    levelPosY: 6,
  },
  eating: {
    img: theEatDeadBird,
    width: 12,
    height: 12,
    levelCoordX: 0,
    levelCoordY: 0,
    levelPosX: 6,
    levelPosY: 6,
  },
  dead: {
    img: theDeadBird,
    width: 12,
    height: 12,
    levelCoordX: 0,
    levelCoordY: 0,
    levelPosX: 6,
    levelPosY: 6,
  },
}
