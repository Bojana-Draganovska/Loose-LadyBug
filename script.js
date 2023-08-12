const ladybug = document.getElementById("box");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const greeting = document.getElementById("game-greeting");

var background = new Image();
background.src =
  "https://user-images.githubusercontent.com/18351809/46888871-624a3900-ce7f-11e8-808e-99fd90c8a3f4.png";

window.addEventListener("keydown", function () {
  greeting.textContent = "Good Luck!";
  startPlaying();
}, {once: true});

background.onload = function () {
  ctx.canvas.width = background.width;
  ctx.canvas.height = background.height;
  ctx.drawImage(background, 0, 0, background.width, background.height);
};

console.log(ladybug.getBoundingClientRect());

console.log(ladybug.getBoundingClientRect().left);

let ladybugX = ladybug.getBoundingClientRect().x;
let ladybugY = ladybug.style.y;

let ladybugDX = 1;
let ladybugDY = 1;

function startPlaying() {
  // document.body.addEventListener("keyup", function (e) {
  //   if (ladybugY > 0) {
  //     y -= 5;
  //     ladybug.style.bottom = ladybugY + "px";
  //   }
    console.log("pressssedd");
    console.log(ladybug.style.bottom);
  // });
}

function ladybugFlying() {

  ladybugY -= ladybugDY;

  console.log(ladybugY);
  console.log('tuka')
}

// setInterval(ladybugFlying, 100);