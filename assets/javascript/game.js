var wordList =   // *Words I have chosen*
[
"fumble", "kick", "pigskin", "touchdown", "interception", "redskins", "panthers", "receiver", "quarterback", 
"safety", "tackle", "penalty", "chiefs", "broncos", "eagles", "cowboys", "giants", "packers", "bears", "vikings", 
"coach", "falcons", "buccaneers", "lions", "niners", "seahawks", "cardinals", "rams", "raiders", "chargers", 
"steelers", "referee", "browns", "bengals", "ravens", "titans", "texans", "colts", "jaguars", "patriots", "jets", 
"bills", "dolphins", "champions", "spike", "victory", "defeat", "stadium", "field", "fans", "tickets", "flag", 
"center", "defense", "offense", "endzone", "touchback", "kickoff", "league", "madden", "tecmo", "saints", 
];

const maxGuesses = 10;      //Maximum number of guesses allowed

var lettersGuessed = [];    //Letters the player has guessed
var currentWordIndex;       //Index of the current word in the array
var actionWord = [];        //Current word being "built"
var guessesRemaining = 0;   //Number of guesses left
var gameStarted = false;    //Indicates that the game has begun
var gameEnded = false;      //Activates "press any key to play"
var wins = 0;               //Number of victories
var losses = 0;             //Number of losses

function resetGame() {
    guessesRemaining = maxGuesses;
    gameStarted = false;

    // Math.floor rounds random number down to nearest whole number
    currentWordIndex = Math.floor(Math.random() * (wordList.length));

    // Clear out arrays
    lettersGuessed = [];
    actionWord = [];

    // Build the action word and clear it out
    for (var i = 0; i < wordList[currentWordIndex].length; i++) {
        actionWord.push("_");
    }

    // Hide any images from previous game
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("losing-image").style.cssText= "display: none";
    document.getElementById("winning-image").style.cssText= "display: none";

    // This actually shows the display
    updateDisplay();
};

    // To update the display, we need a function
    function updateDisplay() {
        document.getElementById("totalWins").innerText = wins;

    // Show how much of the word has been guessed (Showing array would add commas)
    var actionWordText = "";
    for (var i = 0; i < actionWord.length; i++) {
        actionWordText += actionWord[i];
    }

    document.getElementById("currentWord").innerText = actionWordText;
    document.getElementById("guessesRemaining").innerText = guessesRemaining;
    document.getElementById("lettersGuessed").innerText = lettersGuessed;

    };

    //  Evaluates the letter guessed

    function evaluateGuess(letter) {
        // This array stores position of letters in string
        var positions = [];

        // This for loop finds all the guessed letters
        for (var i = 0; i < wordList[currentWordIndex].length; i++) {
            if(wordList[currentWordIndex][i] === letter) {
                positions.push(i);
            }
        }
    
        // remove a guess
        if (positions.length <= 0) {
            guessesRemaining--;
        } else {
            // Loop through and replace all underscores with a letter
            for(var i = 0; i < positions.length; i++) {
                actionWord[positions[i]] = letter;
            }
        }
    };

    // Checking for a win by checking remaining underscores
    function checkWin() {
        if(actionWord.indexOf("_") === -1) { 
            document.getElementById("winning-image").style.cssText = "display: block";
            document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
            wins++;
            hasFinished = true;
        }
    };

    function checkLoss() {
        if(guessesRemaining <= 0) {
            document.getElementById("losing-image").style.cssText = "display: block";
            document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
            losses++;
            hasFinished = true;

        }
    }

    // Makes a guess
    function makeGuess(letter) {
        if (guessesRemaining > 0) {
            // Doublechecking to make sure letters haven't been used yet
            if (lettersGuessed.indexOf(letter) === -1) {
                lettersGuessed.push(letter);
                evaluateGuess(letter);
            }
        }
    };

    // Event Listener
    document.onkeydown = function(event) {
        if(hasFinished) {
            resetGame();
            hasFinished = false;
        } else {
            // Checking letters a-z
            if(event.keyCode >= 65 && event.keyCode <= 90) {
                makeGuess(event.key.toLowerCase());
            }
        }
    };

