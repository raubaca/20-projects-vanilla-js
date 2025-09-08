const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

const brickRowCount = 5;
const brickColumnCount = 9;

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

const bricks = [];

for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = j * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = i * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, true);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
};

const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
};

const drawScore = () => {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
};

const drawBricks = () =>
  bricks.forEach((col) =>
    col.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    })
  );

const showAllBricks = () =>
  bricks.forEach((col) => col.forEach((brick) => (brick.visible = true)));

const increaseScore = () => {
  score++;

  if (score % (brickRowCount * brickColumnCount) === 0) {
    showAllBricks();
  }
};

const resetGame = () => {
  score = 0;
  showAllBricks();
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  paddle.x = canvas.width / 2 - 40;
  paddle.y = canvas.height - 20;
};

const movePaddle = () => {
  paddle.x += paddle.dx;

  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
};

const moveBall = () => {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall Collision
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }

  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  // Paddle Collision
  if (
    ball.x - ball.size / 2 > paddle.x &&
    ball.x + ball.size / 2 < paddle.x + paddle.w &&
    ball.y + ball.size / 2 > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  // Brick Collision
  bricks.forEach((col) => {
    col.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left brick side
          ball.x + ball.size < brick.x + brick.w && // right brick side
          ball.y + ball.size > brick.y && // top brick side
          ball.y - ball.size < brick.y + brick.h // bottom brick side
        ) {
          ball.dy *= -1;
          brick.visible = false;

          increaseScore();
        }
      }
    });
  });

  if (ball.y + ball.size > canvas.height) {
    resetGame();
  }
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
};

const update = () => {
  movePaddle();
  moveBall();
  draw();

  requestAnimationFrame(update);
};

update();

rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));

const keyDown = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  }

  if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
};

const keyUp = (e) => {
  if (
    e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft'
  ) {
    paddle.dx = 0;
  }
};

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
