var words = [
    "cockatoo",
    "lovebird",
    "finch",
    "parakeet",
    "cockatiel"
];

const maxTries = 8;

var guessedLetters = [];
var currentWordIndex;
var guessingWord = [];
var remainingGuesses = 0;
var gameStarted = false;
var gameFinished = false;
var wins = 0;

function reset() {
    remainingGuesses = maxTries;
    gameStarted = false;
    currentWordIndex = Math.floor(Math.random() * (words.length));
    guessedLetters = [];
    guessingWord = [];
    for (var i = 0; i < words[currentWordIndex].length; i++){
        guessingWord.push("_");
    }
    document.getElementById("tryAgain").style.cssText = "display: none";
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("guessingWord").innerText = "";
        for (var i = 0; i < guessingWord.length; i++){
            document.getElementById("guessingWord").innerText += guessingWord[i];
        }
    document.getElementById("wins").innerText = "wins";
    document.getElementById("remainingGuesses").innerText = "remainingGuesses";
    document.getElementById("guessedLetters").innerText = "guessedLetters";
    if(remainingGuesses = 0){
        document.getElementById("tryAgain").style.cssText = "display: block";
        gameFinished = true;
    }
}

document.onkeyup = function (event) {
    if (gameFinished) {
        reset();
        gameFinished = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
}

function makeGuess(letter) {
    if (remainingGuesses >= 0) {
        if (!gameStarted) {
            gameStarted = true;
        }
        if (guessedLetters.indexOf(letter)=== -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    updateDisplay();
    checkWin();
}

function evaluateGuess(letter) {
    var positions = [];
    for (var i = 0; i < words[currentWordIndex].length; i++) {
        if (words[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }
    if (positions.length = 0) {
        remainingGuesses--;
    } else {
        for (var i = 0; i < positions.length; i++)
            guessingWord[positions[i]] = letter;
    }
}

function checkWin() {
    if (guessingWord.indexOf("_") === -1) {
        document.getElementById("tryAgain").style.cssText = "display: block";
        wins++;
        gameFinished = true;
    }
}