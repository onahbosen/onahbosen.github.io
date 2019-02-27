$(document).ready(function(){

    // event listeners
    $(".timer").hide();
    $(".start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);

})

var trivia = {

    // trivia info
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentPanel: 0,
    timer: 30,
    timerOn: false,
    timerId : '',

    // q&a
    questions: {
        question1: "how many different species of sea slugs are there?",
        question2: "can u eat sea slugs?",
        question3: "how do sea slugs navigate?",
        question4: "how are some species of sea slugs similar to plants?",
        question5: "how long do sea slugs live?"
    },
    options: {
        question1: ["less than 1500", "2000", "more than 3000"],
        question2: ["hard no", "maybe??", "yes"],
        question3: ["sight", "smell", "sound"],
        question4: ["they can photosynthesize", "they are green", "they produce oxygen"],
        question5: ["forever", "5 years", "less than 1 year"]
    },
    answers: {
        question1: "more than 3000",
        question2: "hard no",
        question3: "smell",
        question4: "they can photosynthesize",
        question5: "less than 1 year"
    },

    // trivia methods

    // init game method
    startGame: function(){
        // restarting game results
        trivia.currentPanel = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        //show game panel
        $('.game').show();

        //clear last results
        $('#results').html('');

        //fill timer
        $('.timer').text(trivia.timer);

        //hide start button
        $('.start').hide();

        //show timer
        $('.timer').show();

        //ask first question
        trivia.nextQuestion();

    },
    //method to loop through q&a and display
    nextQuestion : function(){

        //clear results
        $('#results').html('');

        //set timer
        trivia.timer = 30;
        $('.timer').text(trivia.timer);

        //set interval to 1 sec
        if(!trivia.timerOn){
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        //gathers and indexes all questions
        var questionContent = Object.values(trivia.questions)[trivia.currentPanel];
        $('#question').text(questionContent);

        //current question options
        var questionOptions = Object.values(trivia.options)[trivia.currentPanel];

        //creates all the button options in the html
        $.each(questionOptions, function(index, key){
            $('#options').append($('<li class="btn-group"><button class="option btn btn-light btn-lg">'+key+'</button></li>'));
        })

    },
    //decrement method
    timerRunning : function(){
        // if timer hasn't run out and there are still questions left to answer
        if(trivia.timer > -1 && trivia.currentPanel < Object.keys(trivia.questions).length){
            $('.timer').text(trivia.timer);
            trivia.timer--;
        }
        //if timer has run out (hit 0), increment unanswered, run result
        else if(trivia.timer === -1){
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 5000);
            $('#results').html('<h3>oh no! ur out of time!<br>the correct answer was: '+ Object.values(trivia.answers)[trivia.currentPanel] +'</h3>');
        }
        //if all the questions have been shown end the game, show results
        else if(trivia.currentPanel === Object.keys(trivia.questions).length){

            // adds results of game (correct, incorrect, unanswered) to the page
            $('.game-play')
                .html(
                    '<h3>all done!<br>correct: '+ trivia.correct +
                    '<br>incorrect: '+ trivia.incorrect +
                    '<br>unaswered: '+ trivia.unanswered +
                    '</h3>'
                );

            // //hide game sction
            // $('.game').hide();
        }

    },
    // method to evaluate the option clicked
    guessChecker : function() {

        //timer ID for gameResult setTimeout
        var resultId;

        //the answer to the current question being asked
        var currentAnswer = Object.values(trivia.answers)[trivia.currentPanel];

        //if text on button matches correct answer
        if($(this).text() === currentAnswer){
            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 5000);
            $('#results').html('<h3>sweet dude u were right!</h3>');
        }
        //if it doesn't
        else{
            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 5000);
            $('#results').html('<h3>aw u were wrong! correct answer was: '+ currentAnswer +'</h3>');
        }

    },
    //method to remove previous question attributes
    guessResult : function(){

        //increment to next question
        trivia.currentPanel++;

        //remove the options and results
        $('.option').remove();

        //begin next question
        trivia.nextQuestion();
    }

};