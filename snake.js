const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const BLOCK_SIZE = 20;  
const MAP_SIZE = canvas.width / BLOCK_SIZE;
let score = 0;

let snake = { 
    body: [ { x: MAP_SIZE / 2, y: MAP_SIZE / 2 } ],  
    size: 5, 
    direction: { x: 0, y: -1 },

    drawSnake: function () {
        this.moveSnake();
        ctx.fillStyle = 'lime';
        for (let i = 0; i < this.body.length; i++) {      
            ctx.fillRect(
                this.body[i].x * BLOCK_SIZE,
                this.body[i].y * BLOCK_SIZE,
                BLOCK_SIZE,
                BLOCK_SIZE
            );
        }
    },

    moveSnake: function () {
        let newBlock = {
            x: this.body[0].x + this.direction.x,
            y: this.body[0].y + this.direction.y
        };
        this.body.unshift(newBlock);
        while (this.body.length > this.size) {
            this.body.pop();
        }
    }
};

let apple = {
    x: 5,
    y: 5,

    drawApple: function () {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x * BLOCK_SIZE, this.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    },

    putApple: function () {
        let valid = false;
        while (!valid) {
            this.x = Math.floor(Math.random() * MAP_SIZE);
            this.y = Math.floor(Math.random() * MAP_SIZE);
            valid = !snake.body.some(block => block.x === this.x && block.y === this.y);
        }
    }
};

function drawMap() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function checkDeath() {
    const head = snake.body[0];
    if (head.x < 0 || head.x >= MAP_SIZE || head.y < 0 || head.y >= MAP_SIZE) {
        clearInterval(gameInterval);
        alert("遊戲結束！你的分數是：" + score);
    }
    for (let i = 1; i < snake.body.length; i++) {
        if (head.x === snake.body[i].x && head.y === snake.body[i].y) {
            clearInterval(gameInterval);
            alert("遊戲結束！你的分數是：" + score);
        }
    }
}

function eatApple() {
    if (snake.body[0].x === apple.x && snake.body[0].y === apple.y) {
        snake.size++;
        score++;
        apple.putApple();
    }
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "14px Verdana";
    ctx.fillText("Score: " + score, 10, 20);    
}

function keyDown(event) {
    if (event.keyCode == 38 || event.keyCode == 87){ // up / W
        if (snake.direction.y == 1) return;
        snake.direction = { x: 0, y: -1 };
    }
    else if (event.keyCode == 40 || event.keyCode == 83){ // down / S
        if (snake.direction.y == -1) return;
        snake.direction = { x: 0, y: 1 };
    }
    else if (event.keyCode == 37 || event.keyCode == 65){ // left / A
        if (snake.direction.x == 1) return;
        snake.direction = { x: -1, y: 0 };
    }
    else if (event.keyCode == 39 || event.keyCode == 68){ // right / D
        if (snake.direction.x == -1) return;
        snake.direction = { x: 1, y: 0 };
    }
}

function drawGame() {
    drawMap();
    apple.drawApple();
    snake.drawSnake();
    eatApple(); 
    drawScore();
    checkDeath();    
}

function gameStart() {
    apple.putApple();
    gameInterval = setInterval(drawGame, 100);
}

window.addEventListener('keydown', keyDown);
gameStart();

