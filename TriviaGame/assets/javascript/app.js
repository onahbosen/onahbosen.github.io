$(document).ready(function() {

    var qAndA = {
        "questions": [
            {
                "questionTitle": "question 1",
                "question": "how many different species of sea slugs are there?",
                "answers": [
                    "less than 1500",
                    "2000",
                    //correct:
                    "more than 3000"
                ],
                "correctAnswer": 2
            },

            {
                "questionTitle": "question 2",
                "question": "can u eat sea slugs?",
                "answers": [
                    //correct:
                    "hard no",
                    "maybe??",
                    "yes"
                ],
                "correctAnswer": 0
            },

            {
                "questionTitle": "question 3",
                "question": "how do sea slugs navigate?",
                "answers": [
                    "sight",
                    //correct:
                    "smell",
                    "sound"
                ],
                "correctAnswer": 1
            },

            {
                "questionTitle": "question 4",
                "question": "how are some species of sea slugs similar to plants?",
                "answers": [
                    //correct:
                    "they can photosynthesize",
                    "they are green",
                    "they produce oxygen"
                ],
                "correctAnswer": 0
            },

            {
                "questionTitle": "question 5",
                "question": "how long do sea slugs live?",
                "answers": [
                    "forever",
                    "5 years",
                    //correct:
                    "less than 1 year"
                ],
                "correctAnswer": 2
            }
        ]
    }

    var correctAnswerArr = [];

//build question list
    function buildQuestionList(data){
        for (var i = 0; i < data.questions.length; i++){
            var getCurrentIndex = i;
            var getQuestion = data.questions[i].question;
            var getAnswers = data.questions[i].answers;
            var correctAnswerKey = data.questions[i].correctAnswer;

            correctAnswerArr.push(correctAnswerKey);

            var $allPanels = $('.game-panels .container');

            $allPanels.append(

            '<div class="row game-round" id="round-' + getCurrentIndex + '">'
               + '<div class="col-sm-12 l-game-round shadow-pop-tr">'
                + '<h2 class="question" id="question-' + getCurrentIndex + '">' + getQuestion + '</h2>'
                + '<ul class="list-group list-group-flush" id="answers">'
                + '<li><button type="button" class="answer-btn list-group-item list-group-item-action rounded" id="answer1">'+ getAnswers[0]  +'</button></li>'
                + '<li><button type="button" class="answer-btn list-group-item list-group-item-action rounded" id="answer2">'+ getAnswers[1]  +'</button></li>'
                + '<li><button type="button" class="answer-btn list-group-item list-group-item-action rounded" id="answer3">'+ getAnswers[2]  +'</button></li>'
                + '</ul>'
                + '</div>'
            + '</div>');

        }
    }

    buildQuestionList(qAndA);

//set up question timer
    var questionTimer = 30;
    var timerInterval;

    function setTimer(){
        timerInterval = setInterval(decrement, 1000);
    }

    function decrement(){
        questionTimer--;
        $('.timer').text(questionTimer);
        if(questionTimer === 0){
            stop();
        //    call time up function here
        }
    }

//answer button click (determine if right or wrong and display appropriate msg panel)
    $('.answer-btn').on('click', function(e){
        e.preventDefault();
        var $this = $(this);
        var $thisIndex = $this.closest('li').index();
        var $thisPanel = $this.closest('.game-round').index();
        var correctAnswerIndex = correctAnswerArr[$thisPanel];

        var displayCorrectAnswer = qAndA.questions[$thisPanel].answers[correctAnswerIndex];

        if ($thisIndex === correctAnswerIndex){
            clearTimeout(timerInterval);
            $('.game-round').hide();
            $('.win-or-lose h3:first-child').show();
            setTimeout(showNextPanel, 5000);
        //    hide game panel and display msg panel saying u won!
        } else {
            clearTimeout(timerInterval);
            //hide game panel and display msg panel saying u lose! and correct answer
            $('.game-round').hide();
            $('.win-or-lose h3:last-child').show();
            $('.correct-answer').text(displayCorrectAnswer);
            setTimeout(showNextPanel, 5000);
        }
    });

//press start button to show first game panel
    $('.start').on('click', function(e){
        $('.start').hide();
        $('#round-0').show();
        setTimer();
    });

//show second game panel
    function showNextPanel(){
        $('.win-or-lose').hide();
        // $('round-1').show();
        // setTimer();
    };

});