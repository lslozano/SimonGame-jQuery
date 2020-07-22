// ailin was here
const buttonsID = ["green", "red", "yellow", "blue"];
const gameOverSound = new Audio();
gameOverSound.src = "sounds/wrong.mp3";
let gameSequence = [];
let gameStart = false;
let isGameOver = false;
let level = 1;
let counter = 0;

function sequence() {
  const randomID = Math.round(Math.random() * 3);
  $(`#${buttonsID[randomID]}`).fadeOut(100).fadeIn(100);
  gameSequence.push(buttonsID[randomID]);
  const buttonName = buttonsID[randomID];
  playSound(buttonName);
}

$("body").keydown(function(event) {
  if (event.key == "a" && gameStart == false && isGameOver == false) {
    $("h1").text(`Level ${level}`);
    sequence();
    gameStart = true;
  }
})

$("body").keydown(function() {
  if (isGameOver) {
    $("h1").text(`Level ${level}`);
    sequence();
    gameStart = true;
    isGameOver = false;
  }
})

function gameProgress() {
  const buttonName = gameSequence[counter];
  playSound(buttonName);
  animatePress(buttonName);
  counter += 1;
  if (counter == gameSequence.length) {
    level += 1
    setTimeout(function() {
      sequence();
      $("h1").text(`Level ${level}`);
      counter = 0;
    }, 1500)
  }
}

function playSound(name) {
  const buttonSound = new Audio();
  buttonSound.src = `sounds/${name}.mp3`;
  buttonSound.play();
}

function animatePress(currentColor) {
  $(`.${currentColor}`).addClass("pressed");
  setTimeout(function() {
    $(`.${currentColor}`).removeClass("pressed");
  }, 100);
}

function gameOver() {
  gameSequence = [];
  gameStart = false;
  isGameOver = true;
  level = 1;
  $("h1").text("Game Over, Press Any Key to Restart.");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 100);
}

$(".btn").click(function(event) {
  if (event.currentTarget.classList[1] == gameSequence[counter]) {
    gameProgress()
  } else {
    gameOver();
    const buttonName = event.currentTarget.classList[1];
    playSound(buttonName);
    animatePress(buttonName)
    gameOverSound.currentTime = 0;
    gameOverSound.play();
  }
})