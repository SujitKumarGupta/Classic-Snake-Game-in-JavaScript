// VARIABLES DECLARATION

let inputdir = { x: 0, y: 0 };
const playSound = new Audio('../music/music.mp3');
const moveSound = new Audio('../music/move.mp3');
const foodSound = new Audio('../music/food.mp3');
const gameoverSound = new Audio('../music/gameover.mp3');
let snakeBody = [{ x: 6, y: 8 }]
let food = { x: 4, y: 10 };
lastPaintTime = 0;
speed = 8;
let score=0;

// GAME FUNCTIONS
// check collision
// gameEngine
// Generate food
// move the snake 


function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    else {
        lastPaintTime = ctime;
        gameEngine();
    }

    function isCollide(snakeBody){
        for(let i=1;i<snakeBody.length;i++){
            if(snakeBody[0].x===snakeBody[i].x && snakeBody[0].y===snakeBody[i].y){
                return true;
            }
        }
        if(snakeBody[0].x>=18 || snakeBody[0].x<=0 ||snakeBody[0].y>=18 || snakeBody[0].y<=0){
            return true;
        }
        
        // score=0;
        // scoreBox.innerHTML="Score: "+score;
    }


    function gameEngine() {
        
        if(isCollide(snakeBody)){
            gameoverSound.play()
            inputdir={x:0 , y:0}
            alert("Game Over! Press any key to restart ")
            snakeBody = [{ x: 6, y: 8 }]
            score=0;
            document.querySelector('#scoreBox').innerHTML="Score: "+score;
        }

        if(snakeBody[0].x===food.x && snakeBody[0].y===food.y){
            foodSound.play();
            score+=1;
            if(score>highscore){
                // hivalue=JSON.parse(score);
                highscore=score;
                localStorage.setItem("highscore", JSON.stringify(score));
                document.querySelector('.highScore').innerHTML="HighScore: "+ score;

            }
            document.querySelector('#scoreBox').innerHTML="Score: "+score;
            snakeBody.unshift({x:snakeBody[0].x+inputdir.x , y:snakeBody[0].y+ inputdir.y})
            // GENERATING FOOD AT RANDOM IN BOARD
            let a=2;
            let b=16;
            food=({x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())});
        }
        // MOVING THE SNAKE
        for (let i = snakeBody.length-2; i >=0; i--) {
            snakeBody[i+1]={...snakeBody[i]};
        }

        snakeBody[0].x+=inputdir.x;
        snakeBody[0].y+=inputdir.y;

        // DISPLAYING SNAKE ELEMENT ON THE BOARD
        board.innerHTML = "";
        snakeBody.forEach((e, index) => {
            snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColumnStart = e.x;
            if (index === 0) {
                snakeElement.classList.add('head');
            }
            else {
                snakeElement.classList.add('snake')
            }
            board.appendChild(snakeElement);
        });
        
        // DISPLAYING FOOD ON THE BOARD
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

    }    
    
}    


// GAME LOGIC AND LOOP FUNCTION
let highscore=localStorage.getItem('highscore');
if(highscore===null){
   let highscore=0;
   localStorage.setItem("highscore", JSON.stringify(highscore));
}
else{
    highscore=JSON.parse(highscore);
    document.querySelector('.highScore').innerHTML="HighScore: "+ highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)=>{
    inputdir = { x: 0, y: 1 };
    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp")
            inputdir.x=0;
            inputdir.y=-1;
            break;
        case "ArrowDown":
            // console.log("ArrowDown")
            inputdir.x=0;
            inputdir.y=1;
            break;
        case "ArrowLeft":
            // console.log("ArrowLeft")
            inputdir.x=-1;
            inputdir.y=0;
            break;
        case "ArrowRight":
            // console.log("ArrowRight")
            inputdir.x=1;
            inputdir.y=0;
            break;
    
        default:
            break;
    }
})

