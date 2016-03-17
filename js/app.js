/* -when the page loads the user can click to look at the instructions or click +newgame
- when player chooses new game, the counter defaults to 0, guessList empties and
the computer generates a secret number between 1 and 100
-the user enters a guess (Can't tell if the user is prompted to make a guess)
-the user's number is checked
-the user wins if he picks the right number, otherwise, the user receives feedback about how close
he is, the counter increasees by one and the user's number is added to the list of guesses*/


//FIRST - Set the global variables:

var secretNumber = computerPick(1, 100);
var counter = 0;
var prevGuess = 0;


//SECOND - declare the functions:
//function to cause clicking "New Game" to trigger JavaScript function that starts a new game
function startNewGame() {
    $(".new").click(function () {
        $('#count').text(0);
        counter = 0;
        $('#guessList').empty();
        $('#comparative-feedback').empty();
        $('#feedback').text("Make your Guess!");
    });
}
//function for computer to generate secret number between 1 and 100 (Math.random)
function computerPick(min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}
//function to supply user with list of nos. guessed; append as <li> to <ul -id = "guessList">
function userGuessList(userGuess) {
    $('#guessList').append("<li>" + userGuess + "</li>");
}

//functon to count number of guesses and give feedback in <span id="count">
function guessCounter(counter) {
    $('#count').text(counter);
}

//function to give userfeedback in <div id="feedback">
function userFeedback(userGuess, secretNumber) {
    var difference = Math.abs(userGuess - secretNumber);
    if (difference >= 50) {
        $('#feedback').text("You are freezing! Try again!");
    } else if (difference > 30) {
        $('#feedback').text("You are cold! Try again!");
    } else if (difference > 20) {
        $('#feedback').text("You are warm! Try again!");
    } else if (difference > 10) {
        $('#feedback').text("You are hot! Try again!");
    } else if (difference > 0) {
        $('#feedback').text("You're smokin'! Try again!");
    } else {
        $('#feedback').text("You win!!!");
    }
}

//function to validate user's guess
function validate(userGuess) {
    var userGuessCorrectFlag = true;

    while (userGuess.length < 1) {
        userGuess = confirm("Please enter 1 digit or more.");
        userGuessCorrectFlag = false;
    }
    while (userGuess <= 0) {
        userGuess = confirm("Please enter a number between 1 and 100.");
        userGuessCorrectFlag = false;
    }

    while (userGuess > 100) {
        userGuess = confirm("Please enter a number no larger than 100.")
        userGuessCorrectFlag = false;
    }

    while (Math.floor(userGuess) != userGuess) {
        userGuess = confirm("Your guess was not a number. Set it again.");
        userGuessCorrectFlag = false;
    }
    if (userGuessCorrectFlag == true) {
        userFeedback(userGuess, secretNumber);
        counter++;
        guessCounter(counter);
        userGuessList(userGuess);
        $('#userGuess').val('');
    }
}
// Function to provide relative feedback to the user
function comparativeFeedback(secretNumber, prevGuess, nextGuess) {
    var oldDiff = Math.abs(parseInt(secretNumber) - parseInt(prevGuess));
    var newDiff = Math.abs(parseInt(secretNumber) - parseInt(nextGuess));
    if (newDiff > oldDiff) {
        $('#comparative-feedback').text('Getting colder!');
    } else if (newDiff === oldDiff) {
        $('#comparative-feedback').text('Same temperature as last time!');
    } else {
        $('#comparative-feedback').text('Getting warmer!'); {}
    }
    if (nextGuess == secretNumber) {
        $('#comparative-feedback').text('You are on fire!');
    }
}

//THIRD Use the functions
$(document).ready(function () {
    $('.new').on('click', startNewGame);
    $('#guessButton').on('click', function () {
        //first get the value that user added in the input box
        var userGuess = $('#userGuess').val();
        var nextGuess = userGuess;
        validate(userGuess);
        if ((prevGuess !== 0) && (userGuess >= 1) && (userGuess <= 100)) {
            comparativeFeedback(secretNumber, prevGuess, nextGuess);
        }
        prevGuess = nextGuess;
    });
});

$(document).on('keypress', function (event) {
    //on enter
    if (event.which === 13) {
        event.preventDefault();
        var userGuess = $('#userGuess').val();
        var nextGuess = userGuess;
        validate(userGuess);
        if ((prevGuess !== 0) && (userGuess >= 1) && (userGuess <= 100)) {
            comparativeFeedback(secretNumber, prevGuess, nextGuess);
        }
        prevGuess = nextGuess;
    }
});

/*--- Display information modal box ---*/
$(".what").click(function () {
    $(".overlay").fadeIn(1000);

});
/*--- Hide information modal box ---*/
$("a.close").click(function () {
    $(".overlay").fadeOut(1000);
});
