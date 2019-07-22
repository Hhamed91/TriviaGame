//Initial values

var counter = 30;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var timer;


// Start a 30 seconds timer for user to respond or choose an answer to each question
function nextQuestion(){

    var isQuestionOver = (quizQuestions.length - 1 ) === currentQuestion;

    if(isQuestionOver){

        // console.log("Game Over")
        displayResult();

    }else{
        currentQuestion++;
        loadQuestion();
}

};


//When 30 seconds are over, show the loss image and clear the timer to reset to 30 sec
function timeUp(){
    clearInterval(timer);

    lost++;

    prloadImage ("loss");
    setTimeout(nextQuestion, 3000);

}

// This is for the counter to start desending

function countDown(){
    counter--;
    $("#time").html("Timer: " + counter);

    if(counter === 0) {
        timeUp();
    }
};


//Display the question and list of the chioces to the browser


function loadQuestion(){

    counter = 30;
    timer = setInterval(countDown, 1000);

    var question = quizQuestions[currentQuestion].question;
    var choices = quizQuestions[currentQuestion].choices;

    // add the question to the game

    $("#time").html("Timer: " + counter);
    $("#game").html(`
        <h4> ${question} </h4>
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
        `);
    }

    // To show the choices and loop over them
    function loadChoices(choices){
        var result = "";

        for (var i = 0; i < choices.length; i++){
            //while looping over, we are adding a p tag for each choice
        result+= `<p class= "choice" data-answer= "${choices[i]}"> ${choices[i]}</p>`;
        }

        return result;

    };

    // Whenever is clicked on choices, check and see if it is the correct asnwer

    $(document).on("click", ".choice", function(){
        clearInterval(timer);
        var selectedAnswer = $(this).attr("data-answer");
        var correctAnswer = quizQuestions[currentQuestion].correctAnswer;
        
        if(correctAnswer === selectedAnswer){
            score++
            prloadImage ("win")
            setTimeout(nextQuestion, 3000);

            // console.log("win win");


        }else{
            lost--;
            // console.log("lost");
            prloadImage ("loss");
            setTimeout(nextQuestion, 3000);



        }
        // console.log("meh" , selectedAnswer);
    });

    // For the last page to show the status of the total game
    function displayResult(){
        var absLost = Math.abs(lost);
        var result = `
        <p> You got ${score} question(s) right.</p>
        <p> You missed ${absLost} question(s). </p>
        <button class="btn btn-primary" id="reset"> Play Again </button>
        `;

        $("#game").html(result)

    };

    //To reset every part of the game once user clicks on rest btn

    $(document).on("click", "#reset", function(){
         counter = 30;
         currentQuestion = 0;
         score = 0;
         lost = 0;
         timer = null;

         loadQuestion();

    });

    // It shows the progress of the game like 2/10 questions where answered
    function loadRemainingQuestion(){
        var remainingQuesion = quizQuestions.length -(currentQuestion + 1);
        var totalQuestion = quizQuestions.length;

        return `Remaining Questions: ${remainingQuesion}/${totalQuestion}`;
    };


    //Show a giph when correct/false choice

    function randomImage(images){
        var random = Math.floor(Math.random() * lossImages.length);
        var randomImage = images[random];
        return randomImage;


    };

    // To pre load an image based on the answer
    function prloadImage(status){
        var correctAnswer = quizQuestions[currentQuestion].correctAnswer;

        if(status === "win"){
            $("#game").html(`
            <p class="preload-image"> Congrats, you picked the correct answer </p>
            <p class="preload-image"> Woop Woop!! You got it right. <br> The correct answer is <b> ${correctAnswer} </b> </p>
            <img src="${randomImage(winImages)}"/>

                `);

        }else{
            $("#game").html(`
            <p class="preload-image"> The correct answer was ${correctAnswer}</p>
            <p class="preload-image"> You are not a true fan!!</p>
            <img src="${randomImage(lossImages)}"/>
                
                `);

        }
    }

    
$("#start").click(function(){
    $("#start").remove();
    $("#timer").html(counter);
    loadQuestion();

});

