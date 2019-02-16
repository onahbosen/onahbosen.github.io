$(document).ready(function() {

//    variables
    var hasFinished = false;
    var crystalValues = [];

    //where we place our ouput from number generation or whatever
    var $printTargetNumber = $('.target-number');
    var $printCurrentNumber = $('.current-number');

    //set initial target number
    function initLoad() {
        var newNumberTarget = numberRandomizer(19, 120);
        $printTargetNumber.append(newNumberTarget);

        var $html = $('.crystal-list');
        var toggleLength = $html.find('a').length;

        for ( var i = 0; i < toggleLength; i++ ) {
            var randomToTwelve = numberRandomizer(1, 12);
            crystalValues.push(randomToTwelve);
        }
         // console.log(crystalValues);

    };

    //call intitial load function
    initLoad();

    $('.crystal-click').on("click", function(e) {
        e.preventDefault();
        var $this = $(this);
        var whichOneAmI = $this.index();

        var assignment = crystalValues[whichOneAmI];

        //get number value
        var oldAssignment = parseInt( $('.current-number').text() );
        var currentTotal = assignment + oldAssignment;

        $('.current-number').text(currentTotal);

    })

//    reset/update game
//     function resetGame() {
//         if(currentTotal === $printTargetNumber) {
//             var hasFinished = true;
//             alert("u win!");
//         }
//         if (currentTotal > $printTargetNumber) {
//             var hasFinished = true;
//             alert("u lose!");
//         }
//     }
//     resetGame();


//    get random numbers
    function numberRandomizer(min, max) {

       var targetNumber = Math.floor((Math.random() * (max - min)) + min);

       return targetNumber;
    }

});