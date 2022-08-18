'use strict';

let plyer0El = document.querySelector('.player--0');
let plyer1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

//buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores , playing, activePlayer, currentScore;

const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  plyer0El.classList.remove('player--winner');
  plyer1El.classList.remove('player--winner');
  plyer0El.classList.add('player--active');
  plyer1El.classList.remove('player--active');
};

init();

const swichPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //chanign user
  plyer0El.classList.toggle('player--active');
  plyer1El.classList.toggle('player--active');
};
btnRoll.addEventListener('click', function () {
  if (playing) {
    // random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display the dice
    diceEl.classList.add('hidden');
    diceEl.src = `images/dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      swichPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //winig the game

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //swich player
      swichPlayer();
    }
  }
});

btnNew.addEventListener('click',init);
