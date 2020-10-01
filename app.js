/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his 
  ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's 
  turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score.
  After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
var lastDice;

init();

// Roll-dice function
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. We need a Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    document.getElementById("rolling").style.display = "block";
    document.getElementById("rolling-2").style.display = "block";
    document.querySelector("#rolling").src = "dice-" + dice1 + ".png";
    document.querySelector("#rolling-2").src = "dice-" + dice2 + ".png";

    // 3. Update the round score IF the dice doesnt show 1

    if (dice1 !== 1 && dice2 !== 1) {
      // Add score
      roundScore += dice1 + dice2;
      currentScoreAdder = document.querySelector("#current-" + activePlayer);
      currentScoreAdder.textContent = roundScore;
    } else {
      // Next player Turn
      nextPlayer();
    }

    /*
    if (dice === 6 && lastDice === 6) {
      // player loses scores
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dice !== 1) {
      // Add score
      roundScore += dice;
      currentScoreAdder = document.querySelector("#current-" + activePlayer);
      currentScoreAdder.textContent = roundScore;
    } else {
      // Next player Turn
      nextPlayer();
    }
    lastDice = dice;
    */
  }
});

// Hold funtion
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    //Add Current score to the global score
    scores[activePlayer] += roundScore;

    // update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // Check if player won the game

    var input = document.querySelector(".final-score").value;
    var winningScore;

    // Undefined, Null, 0 or "" are COERCED to false
    // AND anything else is COERCED to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    if (scores[activePlayer] >= winningScore) {
      document.getElementById("name-" + activePlayer).textContent = "Winner";
      document.getElementById("rolling").style.display = "none";
      document.getElementById("rolling-2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // Next player Turn
      nextPlayer();
    }
  }
});

// Next Player function
function nextPlayer() {
  // Next player Turn
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // document.querySelector(".player-0-panel").classList.remove("active");
  // document.querySelector(".player-1-panel").classList.add("active");

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.getElementById("rolling").style.display = "none";
  document.getElementById("rolling-2").style.display = "none";
}

// New Game starting function
document.querySelector(".btn-new").addEventListener("click", init);

// INIT Function

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.getElementById("rolling").style.display = "none";
  document.getElementById("rolling-2").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

//document.querySelector("#current-" + activePlayer).textContent = dice;
//document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";

//var y = document.querySelector("#score-0").textContent;
//console.log(y);
