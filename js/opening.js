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
        runGame(GAME_LEVELS, CanvasDisplay);
    })

}