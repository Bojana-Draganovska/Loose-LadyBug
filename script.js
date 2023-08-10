const playBtn = document.getElementById("startBtn");

playBtn.addEventListener('click', function() {
  playBtn.classList.add('hidden');
})

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');


var background = new Image();
background.src = "https://user-images.githubusercontent.com/18351809/46888871-624a3900-ce7f-11e8-808e-99fd90c8a3f4.png";

  background.onload = function(){
    ctx.drawImage(background,0,0);   
  } 


 