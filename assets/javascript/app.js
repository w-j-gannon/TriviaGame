// Riddle jokes Trivia Games - TIMEOUTS


$(document).ready(function(){
    
    // hide the question form onload
    $("#wrapper").hide();
    
    // Start button hides start, shows question
    // call display function
    $("#start-button").click(function() {
        $("#start-button").hide();
        $("#wrapper").show();
        displayQuestion(onQuestion);
        
    });

    // 8 Question objects
    // riddle, choices, correctAnswer, gif

    var q1 = {
        riddle: "Voiceless it cries, wingless flutters, toothless bites, mouthless mutters. What is it?",
        choices: ["A Mute", "Wind", "A River", "The Ring"],
        correctAnswer: "Wind", 
        gif: "https://media.giphy.com/media/14ozJbpK9ZAxsA/giphy.gif",
        stinger: "Asked of Bilbo by Gollum in The Hobbit."
    };

    var q2 = {
        riddle: "It walks on four legs in the morning, two legs at noon, and three legs in the evening. What is it?",
        choices: ["A Table", "A Silly Dog", "A Spider", "Man"],
        correctAnswer: "Man",
        gif: "https://media.giphy.com/media/RTOhXRue3ylKE/giphy.gif",
        stinger: "The Sphinx's riddle to Oedipus."
    };

    var q3 = {
        riddle: "This thing all things devours: Birds, beasts, trees, flowers; gnaws iron, bites steel; Grinds hard stones to meal; slays king, ruins town, and beats high mountain down.",
        choices: ["The Devil", "Capitalism", "Time", "Black Holes"],
        correctAnswer: "Time",
        gif: "https://media.giphy.com/media/5gw3SefkDDr8I/giphy.gif",
        stinger: "Another classic from Golllum"
    };
    
    var q4 = {
        riddle: "Poke your fingers in my eyes and I will open wide my jaws. Linen cloth, quills, or paper, I will devour them all. What am I?",
        choices: ["A Skull", "Scissors", "A Shark", "Curly from the 3 Stooges"],
        correctAnswer: "Scissors",
        gif: "https://media.giphy.com/media/8a0Gjt3TmUFGM/giphy.gif",
        stinger: "Unattributed"
    };
    
    var q5 = {
        riddle: "What can run but never walks, has a mouth but never talks, has a head but never weeps, has a bed but never sleeps?",
        choices: ["A Car", "Flowers", "A River", "A Coin"],
        correctAnswer: "a River",
        gif: "https://media.giphy.com/media/3HoB7BmMnKMdq/giphy.gif",
        stinger: "Unattributed"
    };
    
    var q6 = {
        riddle: "Many have heard me, but no one has seen me, and I will not speak back until spoken to. What am I?",
        choices: ["A Teenager", "An Echo", "The Invisible Man", "The Wizard of Oz"],
        correctAnswer: "an Echo",
        gif: "https://media.giphy.com/media/GLjbMKJdoob60/giphy.gif",
        stinger: "Unattributed"
    };

    var q7 = {
        riddle: "What can make one man blind and another man see, makes one building strong and tears another one down?",
        choices: ["Light", "Darkness", "Sand", "An Explosion"],
        correctAnswer: "Sand",
        gif: "https://media.giphy.com/media/MFTvSzSu3ceE8/giphy.gif",
        stinger: "Almost done!"
    };

    var q8 = {
        riddle: "Tall I am young, short I am old. Air is my friend, yet wind is my foe. What am I?",
        choices: ["A Candle", "A Pencil", "Benjamin Button", "An Umbrella"],
        correctAnswer: "a Candle",
        gif: "https://media.giphy.com/media/C5HdlUByZFTj2/giphy.gif",
        stinger: "Last one!"
    };
    
    // Array for all question objects
    // create one big object with all questions and properties? 
    var questionArray = [q1, q2, q3, q4, q5, q6, q7, q8];

    var checkButton;

    var choiceLabel;

    var answerChoice;

    // scorekeeping variables
    var correctTotal = 0;

    var wrongTotal = 0;

    var unansweredTotal = 0;
    
    // counter for question incrementing
    var onQuestion = 0;
    
    // Timer
    var time = 15;
    
    var intervalId;

    intervalId = setInterval(count, 1000);
    
    // Count Function
    // 15 seconds per qustion
    function count(){
        time--;
        var timeRem = "Time Remaining: " + time + " seconds";
        $("#time-remain").text(timeRem);
    
        if (time == 0) {
            answerChoice = $("input:checked").val();
            if (typeof answerChoice === "undefined") {
                unansweredTotal++
                onQuestion++;
                time = 15;
                outOfTime(onQuestion);
            } else {
                checkAnswer();
            }
        }
    };
    
    // Out of Time - show with timer = 0, no answer
    // display question gif
    function outOfTime(n){
    
        $("#title").text("TIME IS UP");
        $("#question").html("<img src='https://media.giphy.com/media/l0MYOUI5XfRk4LLWM/giphy.gif' height='200px'>");
        $("#answer-choices").text("The answer is: " + questionArray[n-1].correctAnswer);
        $("#submit").hide();
        $("#time-remain").hide()
    
        setTimeout(function(){
            displayQuestion(onQuestion);}, 5000);

        if (onQuestion === 8) {
            displayEndScreen();    
        }
    };
    
    // function that generates question and answer choices for each question
    function displayQuestion(n) {
        
        // display question on screen
        time = 15;
        $("#title").text("Question: " + (onQuestion + 1) + "/8");
        $("#title").attr("class", "alert alert-light");
        $("#question").text(questionArray[n].riddle);
        $("#answer-choices").text('');
        $("#submit").show();
        $("#time-remain").show();
        $("#try-again").hide();
    
        // for loop for dropping in the choices
        for ( var a = 0; a < questionArray[n].choices.length; a++) {
    
            //creates a new radio button and choiceLabel
            checkButton = $("<input type='radio'>");
            choiceLabel = $("<choiceLabel>");
    
            //marks which choice is correct
            if (questionArray[n].choices[a] == questionArray[n].correctAnswer){
                checkButton.attr('value', 'correct');
            } else {
                checkButton.attr('value', 'incorrect');
            }
    
            //adds proper attributes to the buttons and labels
            $("#voltaic_holder").css({"position":"relative", "top":"-75px"});
    
            checkButton.attr('id', questionArray[n].choices[a]);
            checkButton.attr('name', 'questionArray[n]');
            checkButton.css({"margin-left":"25px"});
            choiceLabel.attr('for', questionArray[n].choices[a]);
            choiceLabel.text(questionArray[n].choices[a]);
            choiceLabel.css({"margin-right":"25px"});
    
            // appends each choice to the answer choices div
            $("#answer-choices").append(checkButton, choiceLabel);
    
        }
    };

    // displayQuestion(onQuestion);
    
    //check answer function
    function checkAnswer() {
        onQuestion++;
        
            answerChoice = $("input:checked").val();
    
            if (answerChoice == "correct"){
                correctTotal++;
                correctAnsDisplay(onQuestion-1);
            } else {
                wrongTotal++;
                incorrectAnsDisplay(onQuestion-1);
            }
    };
    
    
    // Answer Screens
    // correct || incorrect, gif plus stinger
    // Correct Answer
    function correctAnsDisplay(n){
    
        $("#title").text("Correct");
        $("#title").attr("class", "alert alert-success");
        $("#question").html("<img src='"+questionArray[n].gif+"' height='200px'>");
        $("#answer-choices").text(questionArray[n].stinger);
    
        $("#submit").hide();
        $("#time-remain").hide()
    
        if (onQuestion < questionArray.length){
            setTimeout(function(){
                displayQuestion(onQuestion);}, 
                5000);
        } else {
            clearInterval(intervalId);
            setTimeout(displayEndScreen, 5000);
        }  
    };

    // Incorrect - show answer 
    function incorrectAnsDisplay(n) {

        $("#title").text("Incorrect");
        $("#title").attr("class", "alert alert-danger");
        $("#question").html("<img src='" + questionArray[n].gif + "' height='200px'>");
        $("#answer-choices").text("The answer is: "+ questionArray[n].correctAnswer);
        $("#submit").hide();
        $("#time-remain").hide()
    
        if (onQuestion < questionArray.length){
            setTimeout(function(){
                displayQuestion(onQuestion);}, 
                5000);
        } else {
            clearInterval(intervalId);
            setTimeout(displayEndScreen, 5000)
        }  
    };
    
    // End Screen -------??????????????????????????????????????????????????????
    function displayEndScreen() {
        // if (onQuestion === 8) {
            $("#title").text("Game over!!");
            $("#title").attr("class", "alert alert-secondary");
            $("#question").html("<p>Correct: "+ correctTotal +
                                "</p><p>Incorrect: " + wrongTotal +
                                "</p><p>Unanswered: " + unansweredTotal);
            $("#answer-choices").text("");
            $("#try-again").show();
            $("#submit").hide();
            $("#time-remain").hide()
    
            // onQuestion = 0;
        // }
        
    };

    // Reset Game - drop tallies to 0
    function resetGame(){
        correctTotal = wrongTotal = unansweredTotal = onQuestion = 0;
        time = 15;
        intervalId = setInterval(count, 1000);
    
        displayQuestion(onQuestion);
    };

    //click function for the submit button
    $("#submit").on("click", checkAnswer);
    
    //click function for reset button
    $("#try-again").on("click", resetGame);
    
    });
    
    