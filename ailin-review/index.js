const buttonsID = ["green", "red", "yellow", "blue"];
const gameOverSound = new Audio();
let gameSequence = [];
let gameStart = false;
let isGameOver = false;
let level = 1;
let counter = 0;

gameOverSound.src = "sounds/wrong.mp3";

// Esta es la forma de escribir funciones en ES6 .. "fancy"
const sequence = () => {
  // puse las const hasta arriba
  const randomID = Math.round(Math.random() * 3);
  const buttonName = buttonsID[randomID];

  $(`#${buttonsID[randomID]}`).fadeOut(100).fadeIn(100);
  gameSequence.push(buttonsID[randomID]);
  playSound(buttonName);
}

$("body").keydown(function(event) {
  if (event.key == "a" && !gameStart && !isGameOver) { // simplificando la lectura
    $("h1").text(`Level ${level}`);
    sequence();
    gameStart = true;
  }

  // veo que repetiste el evento keydown en body, asi que podemos unirlos aqui!
  if (isGameOver) {
    $("h1").text(`Level ${level}`);
    sequence();
    gameStart = true;
    isGameOver = false;
  }
});

const gameProgress = () => {
  const buttonName = gameSequence[counter];

  playSound(buttonName);
  animatePress(buttonName);
  counter += 1;

  // siempre utiliza tripe = para las comparaciones, hay una razon muy buena para eso:
  // The triple equals operator ( === ) returns true if both operands
  // are of the same type and contain the same value. If comparing different
  // types for equality, the result is false. This definition of equality is enough for
  // most use cases. When comparing the string "0" and the number 0 the result is false as expected.
  if (counter === gameSequence.length) {
    level += 1;
    
    setTimeout(function() {
      sequence();
      $("h1").text(`Level ${level}`);
      counter = 0;
    }, 1500)
  }
}

const playSound = (name) => {
  const buttonSound = new Audio();
  buttonSound.src = `sounds/${name}.mp3`;
  buttonSound.play();
}

const animatePress = (currentColor) => {
  $(`.${currentColor}`).addClass("pressed");
  setTimeout(function() {
    $(`.${currentColor}`).removeClass("pressed");
  }, 100);
}

const gameOver = () => {
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
  if (event.currentTarget.classList[1] === gameSequence[counter]) {
    gameProgress();
  } else {
    gameOver();
    
    const buttonName = event.currentTarget.classList[1];

    playSound(buttonName);
    animatePress(buttonName)
    
    gameOverSound.currentTime = 0;
    gameOverSound.play();
  }
})