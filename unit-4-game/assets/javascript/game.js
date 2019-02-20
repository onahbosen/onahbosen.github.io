$(document).ready(function() {

//crystal number variable
    var $crystals = $('.crystal-list');
    var crystalsLength = $crystals.find('.crystal-click').length;
    var crystalNumbersArr = [];

//random number equation/function
    function numberRandomizer(min, max) {
        var randomNumber = Math.floor(Math.random() * (max - min) + min);
        return randomNumber;
    }

//initial user total
    var userTotal = 0;

//tallies for wins/losses and print to page
    var wins = 0;
    var losses = 0;
    $('#wins').text(wins);
    $('#losses').text(losses);

//number randomizer function
    function numberRandomizer(min, max) {
        var randomNumber = Math.floor(Math.random() * (max - min) + min);
        return randomNumber;
    }

//reset game
    function reset() {

        //clear crystalNumbersArr
        crystalNumbersArr.length = 0;

        //set random target number and print to page
        targetNumber = numberRandomizer(19, 120);
        $('#targetNumber').text(targetNumber);

        //set random numbers for each crystal image and push into crystalNumbersArr
        for (i = 0; i < crystalsLength; i++) {
            var crystalNumbers = numberRandomizer(1, 12);
            crystalNumbersArr.push(crystalNumbers);
            console.log(crystalNumbersArr);
        }

        // reset userTotal
        userTotal = 0;
        $('#currentNumber').text(userTotal);
    }

//invoke reset on page load
    reset();

//add wins to userTotal variable and reset game
    function winner() {
        alert("u won :~)");
        wins++;
        $('#wins').text(wins);
        reset();
    }

//add losses to userTotal and reset game
    function loser() {
        alert("you lost :~(");
        losses++;
        $('#losses').text(losses);
        reset();
    }

//make crystal images into functional buttons
    var $crystalToggle = $crystals.find('.crystal-click');

    $crystalToggle.on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        var thisIndexOf = $this.index();

        //new user total (add each crystal click)
        userTotal = userTotal + crystalNumbersArr[thisIndexOf];
        $('#currentNumber').text(userTotal);

        //determine win/loss and run appropriate function
        if (userTotal == targetNumber) {
            winner();
        } else if (userTotal > targetNumber) {
            loser();
        }
        ;
    });
});