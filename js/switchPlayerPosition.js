const switchPlayerPosition = function(currentLevel, player, targetPosition, nextLevelndex){
    let nextLevel = currentLevel + nextLevelndex
    let nextPosition = GAME_LEVELS[nextLevel].replace(targetPosition, player);
    let restoreCurrentLevel;
    let isXThere = GAME_LEVELS[currentLevel].indexOf('x') == -1;
    if (isXThere){
        restoreCurrentLevel = GAME_LEVELS[currentLevel].replace(player, "x")
    }
    if (!isXThere){
        restoreCurrentLevel = GAME_LEVELS[currentLevel].replace(player, "y")
    }
    GAME_LEVELS[currentLevel] = restoreCurrentLevel;
    GAME_LEVELS[nextLevel] = nextPosition;
}
