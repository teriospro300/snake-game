// Configuración inicial del juego
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 20;  // Tamaño de cada "bloque" de la serpiente
const canvasSize = 400;  // Tamaño del canvas
let snake = [{x: 100, y: 100}];  // Serpiente inicial con un solo bloque
let food = {x: 200, y: 200};  // Comida inicial
let direction = 'RIGHT';  // Dirección inicial
let score = 0;
let gameOver = false;
let gameInterval;

// Función para dibujar el escenario
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar la cuadrícula
    ctx.strokeStyle = "#ecf0f1";  // Color de las líneas de la cuadrícula
    for (let x = 0; x < canvas.width; x += tileSize) {
        for (let y = 0; y < canvas.height; y += tileSize) {
            ctx.strokeRect(x, y, tileSize, tileSize);
        }
    }

    // Dibujar la serpiente
    ctx.fillStyle = "#2ecc71";  // Color verde para la serpiente
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, tileSize, tileSize);
    }

    // Dibujar la comida
    ctx.fillStyle = "#e74c3c";  // Color rojo para la comida
    ctx.fillRect(food.x, food.y, tileSize, tileSize);

    // Dibujar el puntaje
    document.getElementById("score").innerText = `Puntaje: ${score}`;
}

// Función para mover la serpiente
function moveSnake() {
    let head = {x: snake[0].x, y: snake[0].y};

    // Mover la serpiente según la dirección
    if (direction === 'UP') head.y -= tileSize;
    if (direction === 'DOWN') head.y += tileSize;
    if (direction === 'LEFT') head.x -= tileSize;
    if (direction === 'RIGHT') head.x += tileSize;

    // Añadir la nueva cabeza
    snake.unshift(head);

    // Verificar si la serpiente come la comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();  // Eliminar la última parte de la serpiente si no ha comido
    }
}

// Función para verificar colisiones
function checkCollisions() {
    const head = snake[0];

    // Colisión con los bordes del lienzo
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        endGame();
    }

    // Colisión con el cuerpo de la serpiente
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}

// Función para generar comida aleatoria
function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / tileSize)) * tileSize;
    food.y = Math.floor(Math.random() * (canvas.height / tileSize)) * tileSize;
}

// Función para finalizar el juego
function endGame() {
    clearInterval(gameInterval);
    gameOver = true;
    document.getElementById("gameOver").style.display = "block";
}

// Función para reiniciar el juego
function restartGame() {
    snake = [{x: 100, y: 100}];
    food = {x: 200, y: 200};
    direction = 'RIGHT';
    score = 0;
    gameOver = false;
    document.getElementById("gameOver").style.display = "none";
    gameInterval = setInterval(gameLoop, 100);
}

// Función principal del juego
function gameLoop() {
    if (!gameOver) {
        moveSnake();
        checkCollisions();
        draw();
    }
}

// Función para manejar las teclas
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.key === 'ArrowDown' && direction !== 'UP') {
        direction = 'DOWN';
    } else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.key === 'ArrowRight' && direction !== 'LEFT') {
        direction = 'RIGHT';
    }
});

// Iniciar el juego
gameInterval = setInterval(gameLoop, 100);
