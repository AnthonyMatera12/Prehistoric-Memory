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
    const closeGameMessageButton = document.getElementById('close-game-message');
    const bonusList = document.getElementById('bonuses');
    const highScoreElement = document.getElementById('high-score');
    const resetHighScoreButton = document.getElementById('reset-high-score');

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let score = 0;
    let moves = 0;
    let timer = 0;
    let interval;
    let gameStarted = false;
    let matches = 0;
    let highScore = localStorage.getItem('highScore') || 0;

    highScoreElement.textContent = highScore;

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
        bonusList.style.display = 'block'; // Show the bonus list

        // Show timer, score, and moves
        timerElement.style.display = 'block';
        scoreElement.style.display = 'block';
        movesElement.style.display = 'block';

        // Remove the centering class from the start button
        startNewGameButton.classList.remove('centered');

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
        let timeBonusMessage = '';
        let movesBonusMessage = '';

        // Calculate time-based bonus
        if (timer <= 30) {
            timeBonus = 20;
            timeBonusMessage = 'You earned a 20 second time bonus for completing within 30 seconds!';
        } else if (timer <= 45) {
            timeBonus = 15;
            timeBonusMessage = 'You earned a 15 second time bonus for completing within 45 seconds!';
        } else if (timer <= 60) {
            timeBonus = 10;
            timeBonusMessage = 'You earned a 10 second time bonus for completing within 60 seconds!';
        } else {
            timeBonusMessage = 'No time-based bonus earned.';
        }

        // Calculate moves-based bonus
        if (moves <= 10) {
            movesBonus = 30;
            movesBonusMessage = 'You earned a 30 move bonus for completing within 10 moves!';
        } else if (moves <= 15) {
            movesBonus = 20;
            movesBonusMessage = 'You earned a 20 move bonus for completing within 15 moves!';
        } else if (moves <= 20) {
            movesBonus = 10;
            movesBonusMessage = 'You earned a 10 move bonus for completing within 20 moves!';
        } else {
            movesBonusMessage = 'No moves-based bonus earned.';
        }

        score += timeBonus + movesBonus;
        scoreElement.textContent = `Score: ${score}`;

        let highScoreMessage = '';

        // Update high score if the current score is higher
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
            highScoreElement.textContent = highScore;
            highScoreMessage = '<p>Congratulations! You got the new high score!</p>';
        }

        gameMessage.innerHTML = `
            <h2>Congratulations!</h2>
            <p>You completed the game.</p>
            <p>Time: ${timer}s</p>
            <p>Score: ${score}</p>
            <p>Moves: ${moves}</p>
            <p>${timeBonusMessage}</p>
            <p>${movesBonusMessage}</p>
            ${highScoreMessage}
            <button id="close-game-message" class="close-button">x</button>
        `;
        gameMessage.style.display = 'block'; // Show the message

        // Add event listener for the close button in the game message
        document.getElementById('close-game-message').addEventListener('click', function() {
            gameMessage.style.display = 'none';
        });
    }

    startNewGameButton.addEventListener('click', startNewGame);

    // Event listener to reset the high score
    resetHighScoreButton.addEventListener('click', () => {
        localStorage.removeItem('highScore');
        highScore = 0;
        highScoreElement.textContent = highScore;
    });

    // Hide timer, score, and moves initially
    timerElement.style.display = 'none';
    scoreElement.style.display = 'none';
    movesElement.style.display = 'none';

    // Center the start button initially
    startNewGameButton.classList.add('centered');
});