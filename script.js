let countdown;
let timeLeft = 45;
let buzzerTime = 5;
let playerATime = 15;
let playerBTime = 15;
let playerAUsed = false;
let playerBUsed = false;
let player1Score = 0;
let player2Score = 0;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const playerAButton = document.getElementById('playerA');
const playerBButton = document.getElementById('playerB');
const player1ScoreDisplay = document.getElementById('player1Score');
const player2ScoreDisplay = document.getElementById('player2Score');
const player1PlusButton = document.getElementById('player1Plus');
const player1MinusButton = document.getElementById('player1Minus');
const player2PlusButton = document.getElementById('player2Plus');
const player2MinusButton = document.getElementById('player2Minus');
const resetButton = document.getElementById('reset');

// Set up event listeners
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
playerAButton.addEventListener('click', extendPlayerA);
playerBButton.addEventListener('click', extendPlayerB);
player1PlusButton.addEventListener('click', () => updateScore('player1', 1));
player1MinusButton.addEventListener('click', () => updateScore('player1', -1));
player2PlusButton.addEventListener('click', () => updateScore('player2', 1));
player2MinusButton.addEventListener('click', () => updateScore('player2', -1));
resetButton.addEventListener('click', resetScores);

function startTimer() {
  if (countdown) return; // Don't start if already running
  countdown = setInterval(() => {
    timeLeft--;
    if(timeLeft == 5){
      timerDisplay.innerHTML = '5 Sec Remaining';
      timerDisplay.classList.add('times-up');
      playBuzzer();
      return;
    }
    if (timeLeft == 0) {
      clearInterval(countdown);
      countdown = null;
      timeLeft = 0;
      timerDisplay.innerHTML = 'Time\'s Up!';
      timerDisplay.classList.add('times-up');
      // playBuzzer();
      return;
    }
    timerDisplay.innerHTML = timeLeft;
    if (timeLeft <= buzzerTime) {
      timerDisplay.classList.add('buzzer');
    }
  }, 1000);
}

function stopTimer() {
  if (!countdown) return; // Don't stop if not running
  clearInterval(countdown);
  countdown = null;
  timerDisplay.classList.remove('buzzer');
}

function extendPlayerA() {
  if (playerAUsed) return; // Only use once
  timeLeft += playerATime;
  playerAUsed = true;
  playerAButton.classList.add('used');
  playerAButton.style.backgroundColor = 'red';

}

function extendPlayerB() {
  if (playerBUsed) return; // Only use once
  timeLeft += playerBTime;
  playerBUsed = true;
  playerBButton.classList.add('used');
  playerBButton.style.backgroundColor = 'red';
}

function playBuzzer() {
  const audio = new Audio('./audio/beep.wav');
  audio.play();
}

function updateScore(player, delta) {
  if (player === 'player1') {
    player1Score += delta;
    player1ScoreDisplay.innerHTML = player1Score;
  } else if (player === 'player2') {
    player2Score += delta;
    player2ScoreDisplay.innerHTML = player2Score;
  }
}

function resetScores() {
  player1Score = 0;
  player2Score = 0;
  player1ScoreDisplay.innerHTML = 0;
  player2ScoreDisplay.innerHTML = 0;
  document.getElementById('player1Name').value = '';
  document.getElementById('player2Name').value = '';
}

// Reset the timer and
