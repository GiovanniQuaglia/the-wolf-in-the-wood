let birdAlive = true
let textBox = document.getElementById("textBox");

let birdString = `You ate the bird.<br />Bad wolf.`

function eatBird(){
    if(birdAlive){
        textBox.innerHTML = birdString;
    }
    birdAlive = false;
}
