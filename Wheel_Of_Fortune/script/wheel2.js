function rotate() {
  const wheel = document.querySelector(".wheel");
  const startButton = document.querySelector(".button");
  const display = document.querySelector(".display");
  const scoreDisplay = document.querySelector(".score");
  const guess = document.querySelector("#userGuess");

  // setting degree on the wheel
  let deg = 0;
  let sectionSize = 45; //deg of the partitions
  let score = 0;
  let gamesPlayed = 0;

  const sectionItems = {
    1: "Frog",
    2: "Snail",
    3: "Dolphin",
    4: "Ladybug",
    5: "Koala",
    6: "Unicorn",
    7: "Dragon",
    8: "Snowman",
  };
  const handleWin = (actualDeg, guess) => {
    const winningFigureNum = Math.ceil(actualDeg / sectionSize);
    const winningFigure = sectionItems[winningFigureNum];

    display.innerHTML = winningFigure;
    if (winningFigure.toLowerCase() === guess.toLowerCase()) {
      // increment score if guess matches
      score++;
    } else {
      // decrement score if not
      score--;
    }

    // track number of games and update score
    gamesPlayed++;
    scoreDisplay.innerHTML = `Score: ${score}`;

    const oneGame = 10;
    const rewardNum = 5;
    if (gamesPlayed === oneGame) {
      // action after 10 games
      if (score >= rewardNum) {
        // reward for winning
        document.body.style.backgroundImage = 'url("./images/winner.jpg")';
        document.body.style.opacity = "0.7";
        restartButton.style.display = "block";
        startButton.style.pointerEvents = "none";
        console.log("winner");
      } else {
        // no reward
        console.log("losser");

        document.body.style.backgroundImage = 'url("./images/loser.png")';
        document.body.style.opacity = "0.7";
        restartButton.style.display = "block";
        startButton.style.pointerEvents = "none";
      }

      gamesPlayed = 0;
      score = 0;
    }
  };

  startButton.addEventListener("click", () => {
    //Reset the display
    display.innerHTML = "--";
    //to deactivate the pointer event while the pointer is spinning
    startButton.style.pointerEvents = "none";

    //calculate the rotation
    deg = Math.floor(5000 + Math.random() * 5000);
    // transition to make the wheel slow down at the end
    wheel.style.transition = "all 10s ease-out";
    wheel.style.transform = `rotate(${deg}deg)`;

    // blur effect activation

    wheel.classList.add("blur");
  });

  //event for doing things after the spinning ends
  wheel.addEventListener("transitionend", () => {
    wheel.classList.remove("blur");
    startButton.style.pointerEvents = "auto";
    restartButton.style.pointerEvents = "auto";
    restartButton.textContent = "Restart the Game";
    wheel.style.transition = "none";

    // instantly change the degree in between 0-360
    //meaning making the deg in the scale of a circle(360)
    const actualDeg = deg % 360;
    wheel.style.transform = `rotate(${actualDeg}deg)`;

    //calculate the winning figure

    handleWin(actualDeg, guess.value);
  });
}

const restartButton = document.querySelector(".restart");
restartButton.style.display = ""; // Initially hide the button
restartButton.style.pointerEvents = "none";

// Function to restart the game by reloading the page
const restartGame = () => {
  restartButton.textContent = "Restart Game";
  location.reload();
};

// Append the restart button to the body

// Event listener for the restart button
restartButton.addEventListener("click", restartGame);

rotate();
