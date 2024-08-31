let gameBoard = document.getElementById('game-board');
let startButton = document.getElementById('start-button');
let movesDisplay = document.getElementById('moves');
let timerDisplay = document.getElementById('timer');
let scoreDisplay = document.getElementById('score');

let cards = [];
let flippedCards = [];
let moves = 0;
let score = 0;
let timer;
let seconds = 0;

startButton.addEventListener('click', startNewGame);

async function startNewGame() {
    clearInterval(timer);
    gameBoard.innerHTML = '';
    cards = [];
    flippedCards = [];
    moves = 0;
    score = 0;
    seconds = 0;
    movesDisplay.textContent = moves;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = '00:00';

    try {
        const response = await fetch('/api/game-data');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let dinosaurs = await response.json();
        dinosaurs = dinosaurs.sort(() => 0.5 - Math.random()).slice(0, 18);
        dinosaurs = [...dinosaurs, ...dinosaurs].sort(() => 0.5 - Math.random());

        dinosaurs.forEach((dino, index) => {
            let card = document.createElement('div');
            card.classList.add('card');
            card.dataset.index = index;
            card.dataset.name = dino.name;
            card.dataset.diet = dino.diet;
            card.dataset.period = dino.period;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
            cards.push(card);
        });

        timer = setInterval(updateTimer, 1000);
    } catch (error) {
        console.error('Error fetching game data:', error);
        gameBoard.innerHTML = '<p>Error loading game. Please try again.</p>';
    }
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.textContent = this.dataset.name;
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.textContent = moves;
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    let [card1, card2] = flippedCards;
    let isMatch = card1.dataset.name === card2.dataset.name ||
                  card1.dataset.diet === card2.dataset.diet ||
                  card1.dataset.period === card2.dataset.period;

    if (isMatch) {
        score += 10;
        scoreDisplay.textContent = score;
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
    } else {
        card1.textContent = '';
        card2.textContent = '';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];

    if (document.querySelectorAll('.flipped').length === cards.length) {
        clearInterval(timer);
        alert(`Congratulations! You've completed the game in ${moves} moves and ${formatTime(seconds)}!`);
    }
}

function updateTimer() {
    seconds++;
    timerDisplay.textContent = formatTime(seconds);
}

function formatTime(totalSeconds) {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}