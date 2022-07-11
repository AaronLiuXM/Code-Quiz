var startbtnEl = document.querySelector(".startbtn");
var highScorebtnEl = document.querySelector(".highScorebtn");
var startPageEl = document.querySelector(".startPage");
var questionEl = document.querySelector("#questions");
var quizbtn = document.querySelector("#quiz");
var btnAEl = document.querySelector(".btnA");
var btnBEl = document.querySelector(".btnB");
var btnCEl = document.querySelector(".btnC");
var scorebtnEl = document.querySelector(".scorebtn");
var playerIDInfo = document.querySelector("#playerID");
var resultPage = document.querySelector(".result");
var yourScoreEl = document.querySelector(".yourScore");
var timerEl = document.querySelector(".timer");
var highScoreDisplayID = document.querySelector(".ranking-board-playerID");
var highScoreDisplayScore = document.querySelector(".ranking-board-score");

var scoreBoardEl = document.querySelector(".score-board");
var goBackbtnEl= document.querySelector(".goBackbtn");
var clearScorebtnEl= document.querySelector(".clearScorebtn");



var quizQuestions = [{
    question: "What does HTML stand for?",
    choiceA: "Hyperlinks and Text MarkupLanguage",
    choiceB: "Home Tool Markup Language",
    choiceC: "Hyper Text Markup Language",
    answer: "C"},
{   question:"What is used primarily to add styling to a web page?",
    choiceA: "HTML",
    choiceB: "CSS",
    choiceC: "Javascript",
    answer: "B"},
{   question: "The first index of an array is ____.",
    choiceA: "0",
    choiceB: "1",
    choiceC: "any",
    answer: "A"},
{   question: "Commonly used data types DO NOT include:",
    choiceA: "strings",
    choiceB: "booleans",
    choiceC: "alerts",
    answer: "C"},
{   question: "To see if two variables are equal in an if / else statement you would use ____.",
    choiceA: "=",
    choiceB: "==",
    choiceC: "!==",
    answer: "B"},

];

var currentQuestionIndex = 0;
var lastQuestionIndex = quizQuestions.length;
var score = 0;
var timeRemaining = 100;




function startQuiz(){
    quizgenerator();
    startPageEl.style.display="none";
    scoreBoardEl.style.display="none";
    quizbtn.style.display="block";


    //timer
    timerInterval = setInterval(function(){
        timeRemaining--;
        timerEl.textContent = "Time remaining: "+timeRemaining;

        if (timeRemaining === 0) {
            finalScore();
        }
    }, 1000)
};

function quizgenerator() {
    var currentQuestion = quizQuestions[currentQuestionIndex]
    questionEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    btnAEl.innerHTML = currentQuestion.choiceA;
    btnBEl.innerHTML = currentQuestion.choiceB;
    btnCEl.innerHTML = currentQuestion.choiceC;
};


function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].answer;
            if ( answer === correct){
                score++;
                alert("This is correct!");
                currentQuestionIndex++;
            }else{
                alert("This is incorrect!");
                timeRemaining-=10;
                timerEl.textContent = "Time remaining: "+timeRemaining;
                currentQuestionIndex++;
            }if (currentQuestionIndex < lastQuestionIndex){
                quizgenerator();
            }else{
                finalScore();
            }
};


function finalScore(){
    quizbtn.style.display = "none";
    resultPage.style.display = "block";
    yourScoreEl.innerHTML = "Your score is: "+score;
};

function scoreRecord(){
    var taskIDInput = document.querySelector("input[name='playerID']").value;
    
    var highScoreRecord = JSON.parse(localStorage.getItem("highScoreRecord")) || [];
    var currentPlayerScoreRecord ={
        name: taskIDInput,
        score: score,
    };

    highScoreRecord.push(currentPlayerScoreRecord);
    localStorage.setItem("highScoreRecord", JSON.stringify(highScoreRecord));

    generateHighScores();
}

function generateHighScores(){
    scoreBoardEl.style.display="block";
    resultPage.style.display = "none";

    highScoreDisplayID.innerHTML="";
    highScoreDisplayScore.innerHTML="";
    var saveScores = JSON.parse(localStorage.getItem("highScoreRecord")) || [];

    for(i=0; i<saveScores.length; i++){
        var newIDspan = document.createElement("h3");
        var newScorespan = document.createElement("h3");

        newIDspan.textContent = saveScores[i].name;
        newScorespan.textContent = saveScores[i].score;

        highScoreDisplayID.appendChild(newIDspan);
        highScoreDisplayScore.appendChild(newScorespan);
    };
};

highScorebtnEl.addEventListener("click", function(){  
    startPageEl.style.display="none";
    scoreBoardEl.style.display="block";
    quizbtn.style.display="none";

});

goBackbtnEl.addEventListener("click", function(){
    startPageEl.style.display="block";
    scoreBoardEl.style.display="none";
    quizbtn.style.display="none";
})

clearScorebtnEl.addEventListener("click",function(){
    window.localStorage.clear();
    highScoreDisplayID.innerHTML="";
    highScoreDisplayScore.innerHTML="";
})

startbtnEl.addEventListener("click", startQuiz);
scorebtnEl.addEventListener("click", scoreRecord);
