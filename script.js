'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const startGame = function () {
  // Setting scores and game
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Starting values
  score0.textContent = 0;
  score1.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Display
  dice.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

startGame();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // Display Dice
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNumber}.png`;

    // Check for rolled 1. If true, switch to next player
    if (diceNumber !== 1) {
      // Add dice to current score
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch next player
      switchPlayer();
    }
  }
  // Generate random dice number
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check score is 100 >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;

      // Hide dice
      dice.classList.add('hidden');

      // Active player is given winner background
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', startGame);
