document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
        { name: 't-rex', img: 'images/t-rex.png' },
        { name: 'stegosaurus', img: 'images/stegosaurus.png' },
        { name: 'triceratops', img: 'images/triceratops.png' },
        { name: 'pterodactyl', img: 'images/pterodactyl.png' },
        { name: 'brachiosaurus', img: 'images/brachiosaurus.png' },
        { name: 'velociraptor', img: 'images/velociraptor.png' },
        { name: 'ankylosaurus', img: 'images/ankylosaurus.png' },
        { name: 'spinosaurus', img: 'images/spinosaurus.png' },
        { name: 't-rex', img: 'images/t-rex.png' },
        { name: 'stegosaurus', img: 'images/stegosaurus.png' },
        { name: 'triceratops', img: 'images/triceratops.png' },
        { name: 'pterodactyl', img: 'images/pterodactyl.png' },
        { name: 'brachiosaurus', img: 'images/brachiosaurus.png' },
        { name: 'velociraptor', img: 'images/velociraptor.png' },
        { name: 'ankylosaurus', img: 'images/ankylosaurus.png' },
        { name: 'spinosaurus', img: 'images/spinosaurus.png' }
    ];

    const gameBoard = document.getElementById('game-board');
    const timerElement = document.getElementById('timer');
    const scoreElement = document.getElementById('score');
    const movesElement = document.getElementById('moves');
    const startNewGameButton = document.getElementById('start-new-game');

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let score = 0;
    let moves = 0;
    let timer = 0;
    let interval;
    let gameStarted = false;

    function startTimer() {
        clearInterval(interval);
        timer = 0;
        interval = setInterval(() => {
            timer++;
            timerElement.textContent = `Time: ${timer}s`;
        }, 1000);
    }

    startNewGameButton.addEventListener('click', () => {
        startNewGame();
    });

    function startNewGame() {
        // Reset game state
        clearInterval(interval);
        firstCard = null;
        secondCard = null;
        lockBoard = false;
        score = 0;
        moves = 0;
        timer = 0;
        gameStarted = true;

        // Clear the game board
        gameBoard.innerHTML = '';

        // Reset and show UI elements
        timerElement.textContent = 'Time: 0s';
        scoreElement.textContent = 'Score: 0';
        movesElement.textContent = 'Moves: 0';
        timerElement.style.display = 'block';
        scoreElement.style.display = 'block';
        movesElement.style.display = 'block';

        // Create a new board
        createBoard();

        console.log('New game started!');
    }

    function createBoard() {
        cardsArray.sort(() => 0.5 - Math.random());

        cardsArray.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.name = card.name;
            cardElement.innerHTML = `<img src="${card.img}" alt="${card.name}">`;
            cardElement.addEventListener('click', flipCard);
            gameBoard.appendChild(cardElement);
        });

        startTimer();
    }

    function flipCard() {
        if (!gameStarted || lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        moves++;
        movesElement.textContent = `Moves: ${moves}`;

        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        score += 10;
        scoreElement.textContent = `Score: ${score}`;
        resetBoard();

        if (document.querySelectorAll('.card.flipped').length === cardsArray.length) {
            clearInterval(interval);
            alert(`Game Over! Your score is ${score} and you completed the game in ${timer} seconds with ${moves} moves.`);
            gameStarted = false;
        }
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    // Hide timer, score, and moves initially
    timerElement.style.display = 'none';
    scoreElement.style.display = 'none';
    movesElement.style.display = 'none';
});

