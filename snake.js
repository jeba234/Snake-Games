//board
var blockSize = 25;
var row = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX; 
var foodY;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = row * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10);
}

function update() {
    if(gameOver) {
        return;
    }

    // clear board
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // draw food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // check if snake eats food
    if(snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    // move snake body
    for(let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if(snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // move snake head
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    // draw snake head
    context.fillStyle = "lime";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    // draw snake body
    for(let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // check game over condition (collision with walls)
    if(snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= row * blockSize) {
        gameOver = true;
        alert("Game over");
    }

    // check if snake collides with itself
    for(let i = 0; i < snakeBody.length; i++) {
        if(snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
            alert("Game over");
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    }
    if (e.code == "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    }
    if (e.code == "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    }
    if (e.code == "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    // Random food placement
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * row) * blockSize;
}
