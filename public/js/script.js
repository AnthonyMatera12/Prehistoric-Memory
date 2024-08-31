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
    const gameMessage = document.getElementById('game-message');

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let score = 0;
    let moves = 0;
    let timer = 0;
    let interval;
    let gameStarted = false;
    let matches = 0;

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
        matches = 0;
        scoreElement.textContent = `Score: ${score}`;
        movesElement.textContent = `Moves: ${moves}`;
        gameBoard.innerHTML = '';
        gameMessage.style.display = 'none'; // Hide the message

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
        matches++;

        if (matches === cardsArray.length / 2) {
            endGame();
        }

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

    function endGame() {
        clearInterval(interval);

        let timeBonus = 0;
        let movesBonus = 0;
        let bonusMessage = '';

        // Calculate time-based bonus
        if (timer <= 30) {
            timeBonus = 20;
            bonusMessage += 'You earned a 20 point bonus for completing within 30 seconds!<br>';
        } else if (timer <= 45) {
            timeBonus = 15;
            bonusMessage += 'You earned a 15 point bonus for completing within 45 seconds!<br>';
        } else if (timer <= 60) {
            timeBonus = 10;
            bonusMessage += 'You earned a 10 point bonus for completing within 60 seconds!<br>';
        } else {
            bonusMessage += 'No time-based bonus earned.<br>';
        }

        // Calculate moves-based bonus
        if (moves <= 10) {
            movesBonus = 30;
            bonusMessage += 'You earned a 30 point bonus for completing within 10 moves!';
        } else if (moves <= 15) {
            movesBonus = 20;
            bonusMessage += 'You earned a 20 point bonus for completing within 15 moves!';
        } else if (moves <= 20) {
            movesBonus = 10;
            bonusMessage += 'You earned a 10 point bonus for completing within 20 moves!';
        } else {
            bonusMessage += 'No moves-based bonus earned.';
        }

        score += timeBonus + movesBonus;
        scoreElement.textContent = `Score: ${score}`;

        gameMessage.innerHTML = `
            <h2>Congratulations!</h2>
            <p>You completed the game.</p>
            <p>Time: ${timer}s</p>
            <p>Score: ${score}</p>
            <p>Moves: ${moves}</p>
            <p>${bonusMessage}</p>
        `;
        gameMessage.style.display = 'block'; // Show the message
    }

    startNewGameButton.addEventListener('click', startNewGame);

    // Hide timer, score, and moves initially
    timerElement.style.display = 'none';
    scoreElement.style.display = 'none';
    movesElement.style.display = 'none';
});