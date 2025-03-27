const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const video = document.getElementById("introVideo");
let time = 0;
let gameInitialized = false;

function updateAd() {
  time += 1 / 60;

  if (time <= 10) {
    playIntro();
  } else if (time <= 25) {
    video.style.display = "none";
    canvas.style.display = "block";
    if (!gameInitialized) {
      initGame();
      gameInitialized = true;
    }
    updateGame(ctx);
  } else if (time <= 30) {
    showCTA(ctx);
  }

  requestAnimationFrame(updateAd);
}

updateAd();
const gridSize = 20;
let snake = [{ x: 160, y: 240 }];
let food = { x: 100, y: 100 };
let dx = gridSize;
let dy = 0;
let showInstructions = true;
let instructionTime = 0;
let lastMoveTime = 0;

function initGame() {
  snake = [{ x: 160, y: 240 }];
  food = { x: 100, y: 100 };
  dx = gridSize;
  dy = 0;
  showInstructions = true;
  instructionTime = 0;
  lastMoveTime = performance.now();

  document.removeEventListener("keydown", changeDirection);
  document.addEventListener("keydown", changeDirection);
}

function changeDirection(e) {
  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -gridSize;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = gridSize;
  } else if (e.key === "ArrowLeft" && dx === 0) {
    dx = -gridSize;
    dy = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = gridSize;
    dy = 0;
  }
}

function updateGame(ctx) {
  const currentTime = performance.now();
  const deltaTime = (currentTime - lastMoveTime) / 1000;

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (showInstructions && instructionTime < 2) {
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      "Use Arrow Keys to Move",
      canvas.width / 2,
      canvas.height / 2 - 20
    );
    ctx.fillText("Eat the Red Dot!", canvas.width / 2, canvas.height / 2 + 20);
    instructionTime += 1 / 60;
    return;
  }
  showInstructions = false;

  if (deltaTime >= 0.2) {
    lastMoveTime = currentTime;

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    if (head.x >= canvas.width) head.x = 0;
    if (head.x < 0) head.x = canvas.width - gridSize;
    if (head.y >= canvas.height) head.y = 0;
    if (head.y < 0) head.y = canvas.height - gridSize;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      food = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize,
      };
    } else {
      snake.pop();
    }
  }

  ctx.fillStyle = "#288683";
  snake.forEach((segment) => {
    ctx.beginPath();
    ctx.arc(
      segment.x + gridSize / 2,
      segment.y + gridSize / 2,
      (gridSize - 2) / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  });

  ctx.fillStyle = "#ffebd0";
  ctx.beginPath();
  ctx.arc(
    food.x + gridSize / 2,
    food.y + gridSize / 2,
    (gridSize - 2) / 2,
    0,
    Math.PI * 2
  );
  ctx.fill();
}
