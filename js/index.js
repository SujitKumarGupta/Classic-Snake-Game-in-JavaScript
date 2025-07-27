console.log('Welcome to the Game!');

// Variables Declaration
let inputdir = { x: 0, y: 0 };
const foodMusic = new Audio('../music/food.mp3');
const gameOverMusic = new Audio('../music/gameover.mp3');
const playMusic = new Audio('../music/music.mp3');
const moveMusic = new Audio('../music/move.mp3')
let speed = 8;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }]
food = { x: 6, y: 7 };
let hiscoreval=0;



// Game functions

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    else {
        lastPaintTime = ctime;
        gameEngine();
    }

    function iscollide(snake) {
        //    if snake bump into itself
        for (let i = 1; i < snakeArr.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
                return true;
        }

        // If snake bump to the wall
        if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
            return true;
        }
    }

    function gameEngine() {

        // part 1: Updating the snake array and food

        if (iscollide(snakeArr)) {
            gameOverMusic.play();
            playMusic.pause();
            inputdir = { x: 0, y: 0 };
            alert("Game Over! Press any key to restart.");
            snakeArr = [
                { x: 13, y: 15 }
            ]
            score = 0;
            document.querySelector('#scoreBox').innerHTML = "Score: " + score;
        }
        

        // if snake has eaten food then increment the score and regenerate the food
        if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
            foodMusic.play();
            score += 1;
           if(score>hiscore){
            hiscoreval=score;
            localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
            document.querySelector('.highScore').innerHTML="High Score: "+hiscoreval;
            document.getElementsByClassName('highScore')[0].style.visibility='visible';
        }
            document.querySelector('#scoreBox').innerHTML = "Score: " + score;
            snakeArr.unshift({ x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y });
            let a = 2;
            let b = 16;
            food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        }

        
       

        // Moving the Snake

        for (let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i + 1] = { ...snakeArr[i] };
        }

        snakeArr[0].x += inputdir.x;
        snakeArr[0].y += inputdir.y;


        // part 2:  Render the snake and food

        // Displaying the snake

        board.innerHTML = "";
        snakeArr.forEach((e, index) => {
            snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColumnStart = e.x;
            if (index === 0) {
                snakeElement.classList.add('head');
            }
            else {
                snakeElement.classList.add('snake')
            }
            document.querySelector('#board').appendChild(snakeElement);
        });

        // Displaying the food

        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
    }

}






// main logic

let hiscore=localStorage.getItem('hiscore');
if(hiscore===null){
     hiscoreval=0;
   localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    document.querySelector('.highScore').innerHTML="High Score: "+hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 };
    moveMusic.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp")
            inputdir.x = 0;
            inputdir.y = -1;
            break;

        case "ArrowDown":
            // console.log("Arrowdown")
            inputdir.x = 0;
            inputdir.y = 1;
            break;

        case "ArrowLeft":
            // console.log("ArrowLeft")
            inputdir.x = -1;
            inputdir.y = 0;
            break;

        case "ArrowRight":
            inputdir.x = 1;
            inputdir.y = 0;
            // console.log("ArrowRight")
            break;

        default:
            break;
    }
})