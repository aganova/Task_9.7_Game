// Set event listeners on game buttons 
var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { 
    playerPick('rock'); 
});

pickPaper.addEventListener('click', function() { 
    playerPick('paper'); 
});

pickScissors.addEventListener('click', function() { 
    playerPick('scissors'); 
});

// Set initial values
var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

// Assign variables to game sections
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

// Set conditions for game states
function setGameElements() {
    switch(gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
        break;
        case 'ended':
            newGameBtn.innerText = 'Play again';
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
  }
}
setGameElements();

// Set variables for result table
var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

//Start a new game
function newGame() {
    player.name = prompt('Please enter your name', "Player's name");
    
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();

        playerNameElem.innerHTML = player.name;
        setGamePoints();
    }
}

// Game logic & points assignment
function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }  
    setGamePoints();
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
    setTimeout(checkGameWinner, 100);
}

function checkGameWinner() {
    if (player.score === 10) {
        alert('Congratulations! You are the winner!');
        gameState = 'ended';
        resetGame(); 
    } else if (computer.score === 10) {
        alert("You've lost! Game Over!");
        gameState = 'ended';
        resetGame(); 
    }     
    setGameElements();
}

function resetGame() {
    playerPickElem.innerHTML = "Player selection";
    computerPickElem.innerHTML = "Computer selection";
    playerResultElem.innerHTML = "Player Score";
    computerResultElem.innerHTML = "Computer Score";
}