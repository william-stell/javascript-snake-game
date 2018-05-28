

// Key codes
var LEFT_ARROW_KEY = 37;
var UP_ARROW_KEY = 38;
var RIGHT_ARROW_KEY = 39;
var DOWN_ARROW_KEY = 40;

// Direction
var DIRECTION_LEFT = 0;
var DIRECTION_UP = 1;
var DIRECTION_DOWN = 2;
var DIRECTION_RIGHT = 3;

var GAME_WIDTH = 800 / 2;
var GAME_HEIGHT = 600 / 2;
var GRID_SIZE = 20;

var GAME_SPEED = 200;

var lastDirection = DIRECTION_RIGHT;
var newDirection = DIRECTION_RIGHT;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var score = 0;

var xFoodPosition = 0;
var yFoodPosition = 0;

var snake = [];

for (var i = 0; i < 8; i++) {
    snake.push(i);
    snake.push(0);
}

xSnakePosition = 7 * GRID_SIZE;
ySnakePosition = 0;

var gameLoop = startGame();

function drawSquare(x, y, length) {
    context.fillStyle = 'green';
    context.fillRect(x, y, length, length);
}

function clearSquare(x, y, length) {
    context.clearRect(x, y, length, length);
}

function startGame() {
    drawSnake();
    drawFood();

    return setInterval(updateGame, GAME_SPEED);
}

function drawSnake() {

    for (var i = 0; i < snake.length; i += 2) {
        var xPos = snake[i];
        var yPos = snake[i + 1];

        drawSquare(xPos * GRID_SIZE, yPos * GRID_SIZE, GRID_SIZE);
    }
}

function drawSnakeHead() {
    drawSquare(xSnakePosition, ySnakePosition, GRID_SIZE);

    snake.push(xSnakePosition / GRID_SIZE);
    snake.push(ySnakePosition / GRID_SIZE);
}

function clearSnakeTail() {

    var xPos = snake.shift();
    var yPos = snake.shift();

    clearSquare(xPos * GRID_SIZE, yPos * GRID_SIZE, GRID_SIZE);
}

function drawFood() {
    xFoodPosition = Math.floor(Math.random() * GAME_WIDTH / GRID_SIZE);
    yFoodPosition = Math.floor(Math.random() * GAME_HEIGHT / GRID_SIZE);

    context.fillStyle = 'orange';
    context.fillRect(xFoodPosition * GRID_SIZE, yFoodPosition * GRID_SIZE, GRID_SIZE, GRID_SIZE);
}

function updateGame() {     

    switch (newDirection) {
        case DIRECTION_LEFT:
            moveLeft();
            break;

        case DIRECTION_UP:
            moveUp();
            break;

        case DIRECTION_RIGHT:
            moveRight();
            break;
        
        case DIRECTION_DOWN:
            moveDown();
            break;
    }

    lastDirection = newDirection;

    if (isGameOver()) {
        console.log("GAME OVER");

        gameOver();
        return;
    }    

     
    drawSnakeHead();    

    if (isFoodCollision()) {
        
        drawFood();
        addScore(10);
        updateScore();

    } else {
        clearSnakeTail();  
    }
}

function moveLeft() {    
    xSnakePosition += -GRID_SIZE;    
}

function moveRight() {
    xSnakePosition += GRID_SIZE;
}

function moveUp() {
    ySnakePosition += -GRID_SIZE;
}

function moveDown() {   
    ySnakePosition += GRID_SIZE;
}


function isOutside() {
    return (xSnakePosition > GAME_WIDTH || ySnakePosition > GAME_HEIGHT || xSnakePosition < 0 || ySnakePosition < 0);
}

function isSnakeCollision(x, y) {
    
    var xPos = x / GRID_SIZE;
    var yPos = y / GRID_SIZE;

    for (var i = 0; i < snake.length; i += 2) {

        if (xPos == snake[i] && yPos == snake[i + 1]) {
            return true;
        }
    }

    return false;
}

function isFoodCollision() {
    return isSnakeCollision(xFoodPosition * GRID_SIZE, yFoodPosition * GRID_SIZE);
}

function isGameOver() {
    return isOutside() || isSnakeCollision(xSnakePosition, ySnakePosition);
}

function gameOver() {
    clearInterval(gameLoop);
}

function addScore(amount) {
    score += amount;
}

function updateScore() {
    console.log("Score: " + score);
}


document.addEventListener("keydown", function() {
    keyCode = window.event.keyCode;
    keyCode = event.keyCode;

    switch (keyCode) {

        case LEFT_ARROW_KEY:
            if (lastDirection != DIRECTION_RIGHT) {
                newDirection = DIRECTION_LEFT;
                console.log('left');
            }
            
            break;

        case RIGHT_ARROW_KEY:
            if (lastDirection != DIRECTION_LEFT) {
                newDirection = DIRECTION_RIGHT;
                console.log('right');
            }

            break;

        case UP_ARROW_KEY:
            if (lastDirection != DIRECTION_DOWN) {
                newDirection = DIRECTION_UP;
                console.log('up');
            }

            break;

        case DOWN_ARROW_KEY:
            if (lastDirection != DIRECTION_UP) {
                newDirection = DIRECTION_DOWN;
                console.log('down');
            }

            break;
    }

});