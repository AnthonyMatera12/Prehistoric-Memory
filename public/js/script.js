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

    function startNewGame() {
        gameStarted = true;
        startTimer();
        score = 0;
        moves = 0;
        scoreElement.textContent = `Score: ${score}`;
        movesElement.textContent = `Moves: ${moves}`;
        gameBoard.innerHTML = '';

        // Show timer, score, and moves
        timerElement.style.display = 'block';
        scoreElement.style.display = 'block';
        movesElement.style.display = 'block';

        // Shuffle the cards
        const shuffledCards = cardsArray.sort(() => 0.5 - Math.random());

        // Create card elements and add them to the game board
        shuffledCards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.name = card.name;
            cardElement.dataset.img = card.img;
            gameBoard.appendChild(cardElement);
        });

        // Add event listeners to flip the cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', flipCard);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');
        this.style.backgroundImage = `url(${this.dataset.img})`;

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.style.backgroundImage = 'none';
            secondCard.style.backgroundImage = 'none';

            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    startNewGameButton.addEventListener('click', startNewGame);

    // Hide timer, score, and moves initially
    timerElement.style.display = 'none';
    scoreElement.style.display = 'none';
    movesElement.style.display = 'none';
});