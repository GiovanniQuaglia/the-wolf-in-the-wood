function runTitle(){
    displayTitle();
    displayStartButton()
}

function displayTitle(){
    const titleWrapper = document.createElement('div');
    titleWrapper.setAttribute('id', 'titleWrapper')
    document.body.appendChild(titleWrapper)
    const title = document.createElement('div');
    title.setAttribute('id', 'title');
    title.innerHTML = 'THE WOLF IN THE WOOD';
    document.getElementById('titleWrapper').appendChild(title);
}

function displayStartButton(){
    const startButton = document.createElement('div');
    startButton.setAttribute('id', 'startButton');
    startButton.innerHTML = 'Start';
    document.getElementById('title').appendChild(startButton);
    startButton.addEventListener('click', function(e){
        e.preventDefault;
        titleWrapper.remove()
        displayInstructions();
    })
}

function displayInstructions(){
    const instructions = document.createElement('div');
    instructions.setAttribute('id', 'instructions');
    instructions.innerHTML = 'Explore the forest with the arrow keys';
    document.body.appendChild(instructions);
    setTimeout(fadeout, 3000);
    setTimeout(
        function(){
            instructions.remove();
            runGame(GAME_LEVELS, CanvasDisplay);
        },4500
    )
}

function fadeout() {
    document.getElementById('instructions').style.opacity = '0';
  }