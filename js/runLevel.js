function runAnimation(frameFunc) {
  let lastTime = null;
  function frame(time) {
  if (lastTime != null) {
  let timeStep = Math.min(time - lastTime, 100) / 500;
  if (frameFunc(timeStep) === false) return;
  }
  lastTime = time;
  requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function runLevel(level, Display) {
  let displayLevels = new Display(canvasLevels, level);
  let display = new Display(canvasBelow, level);
  let displayOver = new Display(canvasAbove, level)
  let state = State.start(level);
  let ending = 1;
  let currentLevel = Number(level.plan.charAt(1));

  displayLevels.syncLevelState(state);
  displayOver.syncOverState(state);
  
  return new Promise(resolve => {
    runAnimation(time => {
      state = state.update(time, arrowKeys, currentLevel);
      display.syncState(state);
      if (state.status == "playing") {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clear();
        displayLevels.clear();
        displayOver.clear();
        resolve(state.status);
        return false;
      }
    });
  });
}

async function runGame(plans, Display) {
  for (let level = 0; level < plans.length;) {
  currentLevel = level;
  let status = await runLevel(new Level(plans[level]),
  Display);
  
  if (status == "levelUp"){
    level++;
  }
  if (status == "levelDown") level--;
  }
}

window.onload = function() {
  runTitle()
  // runGame(GAME_LEVELS, CanvasDisplay);
};

