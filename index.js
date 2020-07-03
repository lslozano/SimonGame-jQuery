const buttonsID = ["green", "red", "yellow", "blue"];
const randomID = Math.round(Math.random() * 3);

$("body").keydown(function(event) {
  if (event.key == "a") {
    $("h1").text("Level 1");
    $(`#${buttonsID[randomID]}`).fadeOut(100).fadeIn(100);
    const buttonSound = new Audio();
    buttonSound.src = `sounds/${buttonsID[randomID]}.mp3`;
    buttonSound.play();
  }
})


