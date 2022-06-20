//Game Constants and Variables

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 1;
let score = 0;
let lastPaintTime = 0;
let snakeArray = [
    { x: 13, y: 15 }
]
let food = { x: 6, y: 10 };

//Game Function
function main(ctime) {
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if ((ctime - lastPaintTime / 1000) < 1 / speed) // Divided by 1000 as it is in milisecond
    {
        return
    }
    lastPaintTime = ctime;
    gameEngine();
}

//Function if snake will collide : sarr will take snakearray
function iscollide(sarr) {
    return false;
}

function gameEngine() {
    //Part 1 : Updating the snake array

    //If sanke collide
    if (iscollide(snakeArray)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again");
        snakeArray = { x: 13, y: 15 };
        musicSound.play();
        score = 0;
    }

    //If the snake eats the food, we will increment the score and regenrate the food
    if (snakeArray[0].y == food.y && snakeArray[0].x == food.x) {
        snakeArray.unshift({ x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y }); //The unshift() method adds new elements to the beginning of an array.
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()), } //Generate random no. between a & b
    }

    //Moving the snake 
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] }; // To make a new object so that we do not grt refrence prblm, if we do not do this then all the elements will point to one element only //Destructring Concept Used
    }

    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    //Part 2 : Rendering/Displaying the snake array and food

    //Displaying the snake array
    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div'); //Every time it will create a new element for food or snake
        snakeElement.style.gridRowStart = e.y; //To add CSS, it will place the head or food on the grid
        snakeElement.style.gridColumnStart = e.x; //To add CSS, it will place the head or food on the grid
        if (index === 0) {
            snakeElement.classList.add('head'); //Made class to add css in it
        }
        else {
            snakeElement.classList.add('tail');
        }
        board.appendChild(snakeElement); //Places the snake element on the board
    });

    //Displaying the food
    foodElement = document.createElement('div'); //Every time it will create a new element for food or snake
    foodElement.style.gridRowStart = food.y; //To add CSS, it will place the head or food on the grid
    foodElement.style.gridColumnStart = food.x; //To add CSS, it will place the head or food on the grid
    foodElement.classList.add('food'); //Made class to add css in it
    board.appendChild(foodElement); //Places the snake element on the board
}

//Game Logic
window.requestAnimationFrame(main); //Need to study more
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } //Start the game
    moveSound.play();
    switch (e.key) { //e= event that is fired and key is the key that is pressed

        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }

})

//In grid we the origin is taken on top left corner so the valu of y will be neagative when we will move downward