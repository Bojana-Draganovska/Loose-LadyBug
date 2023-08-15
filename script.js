const ladybug = document.getElementById("ladybug");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const greeting = document.getElementById("game-greeting");

var background = new Image();

background.src =
  "https://media.istockphoto.com/id/910093668/vector/pixel-art-seamless-background-with-sky-and-ground.jpg?s=612x612&w=0&k=20&c=3h9KbbrrvGBFLH1Vp7yyc0U9Rh13wzc6aJcV49IbVP4=";
window.addEventListener(
  "click",
  function () {
    greeting.textContent = "Good Luck!";
    startPlaying();
  },
  { once: true }
);

background.onload = function () {
  ctx.canvas.width = background.width;
  ctx.canvas.height = background.height;
  ctx.drawImage(background, 0, 0, background.width, background.height);
};


let ladybugX = ladybug.getBoundingClientRect().left;
let ladybugY = ladybug.style.y;

function startPlaying() {
  setInterval(ladybugFlying, 100);
}

var px = ladybug.getBoundingClientRect().left;
var py = ladybug.getBoundingClientRect().top;

function ladybugFlying() {
  py = py + 10;
  ladybug.style.top = py + "px";
  console.log(ladybug.style.top)
}

window.addEventListener("keyup", function() {
  py = py - 70;
  ladybug.style.top = py + "px";
});

// treba da se reshi bugov skoka bubamarkata sama po sebe i bez da e pocnata igrata

//pipes
let pipeArray = [];
let pipeWitdh = 64;
let pipeHeight = 512;
let pipeX = 50;
let pipeY = 0;
let context;

//fizika
let velocityX = -2;

var topPipeImg;
var bootomPipeImg;

topPipeImg = new Image()
topPipeImg.src = "pipes/toppipe.png"

bottomPipeImg = new Image()
bottomPipeImg.src = "pipes/botpipe.png"


function placePipe(){
  let topPipe = {
    img: topPipeImg,
    x : pipeX,
    y : pipeY,
    witdh: pipeWitdh,
    height : pipeHeight,
    passed : false
  }
  pipeArray.push(topPipe);
}

function placePipes(){
  setInterval(placePipe, 1500);
}
topPipeImg.onload = function(){
  for(let i =0; i<pipeArray.length; i++){
    let pipe = pipeArray[i];
    pipe.x +=velocityX;
    ctx.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    placePipes();
  }
}


