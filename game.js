const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

//Set questions in array 
let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "script",
    choice2: "javascript",
    choice3: "js",
    choice4: "scripting",
    answer: 1
  },
  {
    question: "Using ______ statement is how you test for a specific condition",
    choice1: "Select",
    choice2: "If",
    choice3: "Switch",
    choice4: "For",
    answer: 2
  },
  {
    question: "Is web development fun?",
    choice1: "Absolutely",
    choice2: "OMG Yes!!",
    choice3: "A little bit",
    choice4: "NO WAY!",
    answer: 2
  },
  {
    question: "Is it possible to nest function in JavaScript?",
    choice1: "Yes",
    choice2: "No",
    choice3: "Sometimes",
    choice4: "Never",
    answer: 1
  },
  {
    question: "What are variables used for in JavaScript Programs?",
    choice1: "Storing, numbers, dates, or other values",
    choice2: "Varying randomly",
    choice3: "Causing high-school algebra flashbacks",
    choice4: "None of the above",
    answer: 1
  }
];

//CONSTANTS to start game and set ask questions order
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
};

//randomly cycle through questions and check answers
getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('end.html');
    }
    questionCounter++;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

//If answer is correct, user gets 10 points.
incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

//Timer Element
var timeLeft = 30;
    var elem = document.getElementById('timer');

    var timerId = setInterval(countdown, 1000);

    function countdown() {
      if (timeLeft == -1) {
        clearTimeout(timerId);
        elem.innerHTML = "Time's Up!";
      } else {
        elem.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
      }
    }

startGame();
