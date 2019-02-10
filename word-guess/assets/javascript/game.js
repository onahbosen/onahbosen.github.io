/*
    HANGMAN SOURCE
    Daniel Orlovsky
    UNCC Coding Bootcamp 08/30/2017
*/

'use strict';

var selectableWords =           // Word list
    [
        "COCKATOO",
        "PARAKEET",
        "LOVEBIRD",
        "FINCH",
        "COCKATIEL",
    ];


console.log(selectableWords);

const maxTries = 10;            // Maximum number of tries player has

var guessedLetters = [];        // Stores the letters the user guessed
var currentWordIndex;           // Index of the current word in the array
var guessingWord = [];          // This will be the word we actually build to match the current word
var remainingGuesses = 0;       // How many tries the player has left
var hasFinished = false;        // Flag for 'press any key to try again'
var wins = 0;                   // How many wins has the player racked up


// Reset our game-level variables
function resetGame() {


    remainingGuesses = maxTries;

    // Use Math.floor to round the random number down to the nearest whole.
    currentWordIndex = (Math.floor(Math.random() * (selectableWords.length)));

    // Clear out arrays
    guessedLetters = [];
    guessingWord = [];

    // Make sure the hangman image is cleared
    // document.getElementById("hangmanImage").src = "";

    // Build the guessing word and clear it out
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }

    // Hide game over and win images/text
    document.getElementById("tryAgain").style.cssText= "display: none";
    document.getElementById("bird2").style.cssText = "display: none";
    document.getElementById("bird1").style.cssText = "display: none";

    // Show display
    updateDisplay();
};

//  Updates the display on the HTML Page
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;

    // Display how much of the word we've already guessed on screen.
    // Printing the array would add commas (,) - so we concatenate a string from each value in the array.
    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }

    //
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;

    console.log(currentWordIndex + ', ' + guessedLetters  + ', ' + guessingWord  + ', ' + remainingGuesses  + ', ');
};


// Updates the image depending on how many guesses
// function updateHangmanImage() {
//     document.getElementById("hangmanImage").src = "assets/images/" + (maxTries - remainingGuesses) + ".png";
// };

// This function takes a letter and finds all instances of
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if(selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // if there are no indicies, remove a guess and update the hangman image
    if (positions.length <= 0) {
        remainingGuesses--;
        // updateHangmanImage();
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};
// Checks for a win by seeing if there are any remaining underscores in the guessingword we are building.
function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("bird1").style.cssText = "display: block";
        // document.getElementById("tryAgain").style.cssText= "display: block";
        wins++;
        hasFinished = true;
    }
};


// Checks for a loss
function checkLoss()
{
    if(remainingGuesses <= 0) {
        document.getElementById("bird2").style.cssText = "display: block";
        document.getElementById("tryAgain").style.cssText = "display:block";
        hasFinished = true;
    }
}

// Makes a guess
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        // Make sure we didn't use this letter yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }

};


// Event listener
document.onkeydown = function(event) {
    // If we finished a game, dump one keystroke and reset.
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};





// var words = [
//     "cockatoo",
//     "lovebird",
//     "finch",
//     "parakeet",
//     "cockatiel"
// ];
//
//
// const maxTries = 10;
//
// var guessedLetters = [];
// var currentWordIndex;
// var guessingWord = [];
// var remainingGuesses = 0;
// // var gameStarted = false;
// var gameFinished = false;
// var wins = 0;
//
// function reset() {
//
//     console.log('reset fires')
//     remainingGuesses = maxTries;
//     // gameStarted = false;
//     currentWordIndex = Math.floor(Math.random() * (words.length));
//
//     guessedLetters = [];
//     guessingWord = [];
//
//     document.getElementById("bird-image").src = "";
//
//     for (var i = 0; i < words[currentWordIndex].length; i++){
//         guessingWord.push("_");
//     }
//
//     document.getElementById("tryAgain").style.cssText = "display: none";
//     updateDisplay();
// };
//
// function updateDisplay() {
//
//     document.getElementById("wins").innerText = "wins";
//
//     var = guessingWordText = "";
//     for (var i = 0; i < guessingWord.length; i++){
//         guessingWordText += guessingWord[i];
//     }
//
//     document.getElementById("guessingWord").innerText = "";
//     document.getElementById("remainingGuesses").innerText = "remainingGuesses";
//     document.getElementById("guessedLetters").innerText = "guessedLetters";
//     if (remainingGuesses = 0){
//         document.getElementById("tryAgain").style.cssText = "display: block";
//         gameFinished = true;
//     }
// }
//
// // function updateImage() {
// //     if (wins = 0) {
// //         document.getElementById("bird-images").src = "../images/bird1.JPG";
// //     }
// //     if (wins = 1) {
// //         document.getElementById("bird-images").src = "../images/bird2.JPG";
// //     }
// //     if (wins = 2) {
// //         document.getElementById("bird-images").src = "../images/bird3.JPG";
// //     }
// //     if (wins = 3) {
// //         document.getElementById("bird-images").src = "../images/bird4.JPG";
// //     }
// //     if (wins = 4) {
// //         document.getElementById("bird-images").src = "../images/bird5.JPG";
// //     }
// // }
//
// document.onkeyup = function (event) {
//     if (gameFinished) {
//         reset();
//         gameFinished = false;
//     } else {
//         if(event.keyCode >= 65 && event.keyCode <= 90) {
//             makeGuess(event.key.toLowerCase());
//         }
//     }
// }
//
// function makeGuess(letter) {
//     if (remainingGuesses >= 0) {
//         if (!gameStarted) {
//             gameStarted = true;
//         }
//         if (guessedLetters.indexOf(letter)=== -1) {
//             guessedLetters.push(letter);
//             evaluateGuess(letter);
//         }
//     }
//     updateDisplay();
//     checkWin();
// }
//
// function evaluateGuess(letter) {
//     var positions = [];
//     for (var i = 0; i < words[currentWordIndex].length; i++) {
//         if (words[currentWordIndex][i] === letter) {
//             positions.push(i);
//         }
//     }
//     if (positions.length = 0) {
//         remainingGuesses--;
//     } else {
//         for (var i = 0; i < positions.length; i++)
//             guessingWord[positions[i]] = letter;
//     }
// }
//
// function checkWin() {
//     if (guessingWord.indexOf("_") === -1) {
//         document.getElementById("tryAgain").style.cssText = "display: block";
//         wins++;
//         gameFinished = true;
//     }
// }