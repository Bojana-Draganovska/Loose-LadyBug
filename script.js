// canvas
let canvas = document.getElementById("canvas");
let canvasWidth = 900;
let canvasHeight = 500;
let ctx = canvas.getContext("2d");

//character - ladybug
let ladybugWidth = 34;
let ladybugHeight = 24;
let ladybugX = canvasWidth / 8;
let ladybugY = canvasHeight / 2;
let ladybugImg;

let ladybug = {
  x: ladybugX,
  y: ladybugY,
  width: ladybugWidth,
  height: ladybugHeight,
};

//pipes
let pipeArray = [];

let pipeWidth = 144; // 288/2 = 144
let pipeHeigt = 288; // 576/2 = 288
let pipeX = canvasWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//moving
let movingX = -2; // pipes moving left
let movingY = 0; // ladybug jump
let gravity = 0.2;

let gameStarted = false;
let gameOver = false;
let score = 0;

let getScore = document.getElementById("score-value");
let gameResults = document.getElementById("game-results");
let gameGreeting = document.getElementById("game-greeting");
let restartBtn = document.getElementById("restart");
let startBtn = document.getElementById("start");

window.onload = function () {
  canvas.height = canvasHeight;
  canvas.width = canvasWidth;

  //load ladybug
  ladybugImg = new Image();
  ladybugImg.src = "assets/images/ladybug.png";
  ladybugImg.onload = function () {
    ctx.drawImage(
      ladybugImg,
      ladybug.x,
      ladybug.y,
      ladybug.width,
      ladybug.height
    );
  };

  //pipes
  topPipeImg = new Image();
  topPipeImg.src = "assets/images/topPipe.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "assets/images/bottomPipe.png";

  requestAnimationFrame(update);

  function startGame() {
    if (gameStarted == false) {
      startBtn.addEventListener("click", function () {
        startBtn.style.display = "none";
        gameStarted = true;
        document.addEventListener("keydown", moveLadybug);
        setInterval(placePipes, 1500);
      });
    }
  }
  startGame();
};

//our main loop
function update() {
  requestAnimationFrame(update);

  if (gameOver) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //ladybug
  if (gameStarted) {
    movingY += gravity;
    ladybug.y = Math.max(ladybug.y + movingY, 0);
    ctx.drawImage(
      ladybugImg,
      ladybug.x,
      ladybug.y,
      ladybug.width,
      ladybug.height
    );
  }

  if (ladybug.y > canvas.height) {
    gameOver = true;
  }

  //pipes
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += movingX;
    ctx.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (!pipe.passed && ladybug.x > pipe.x + pipe.width) {
      score += 0.5; // 0.5 because there are 2 pipes!
      getScore.innerHTML = score;
      pipe.passed = true;

      if (score > 3) {
        gameGreeting.style.backgroundColor = "#191e35";
        gameGreeting.style.color = "#8d6641";
        canvas.style.backgroundImage = "url('assets/images/night.png')";
        gameResults.style.backgroundColor = "#191e35";
        gameResults.style.color = "#8d6641";
      }

    }

    if (collisonDetect(ladybug, pipe)) {
      gameOver = true;
    }
  }

  if (gameOver) {
    restartBtn.style.display = "block";
    gameGreeting.textContent = "Game Over!";
    restartBtn.addEventListener("click", function () {
      restartBtn.style.display = "none";
      pipeArray = [];
      gameGreeting.textContent = "Good Luck!";
      ladybug.y = ladybugY;
      getScore.innerHTML = 0;
      score = 0;
      gameOver = false;
      gameGreeting.style.backgroundColor = "#ff356f";
      gameGreeting.style.color = "#60284d";
      canvas.style.backgroundImage = "url('assets/images/day.png')";
      gameResults.style.backgroundColor = "#ff356f";
      gameResults.style.color = "#60284d";
    });
  }
}

function placePipes() {
  if (gameOver) {
    return;
  }

  let randomPipeY = pipeY - pipeHeigt / 4 - Math.random() * (pipeHeigt / 2);
  let opening = canvas.height / 3;

  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeigt,
    passed: false,
  };

  pipeArray.push(topPipe);

  let bottomPipe = {
    img: bottomPipeImg,
    x: pipeX,
    y: randomPipeY + pipeHeigt + opening,
    width: pipeWidth,
    height: pipeHeigt,
    passed: false,
  };

  pipeArray.push(bottomPipe);
}

function moveLadybug(e) {
  if (e.code == "Space" || e.code == "ArrowUp") {
    // jump
    movingY = -6;
  }
}

function collisonDetect(ladybug, pipe) {
  return (
    ladybug.x < pipe.x + pipe.width &&
    ladybug.x + ladybug.width > pipe.x &&
    ladybug.y < pipe.y + pipe.height &&
    ladybug.y + ladybug.height > pipe.y
  );
}
