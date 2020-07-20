const gameIntro = document.getElementById('intro')
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  gameIntro.classList.add('hide')
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
// Quiz Questions
const questions = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: [
      { text: '<js>', correct: false },
      { text: '<scripting>', correct: false },
      { text: '<script>', correct: true },
      { text: 'javascript>', correct: false }
    ]
  },
  {
    question: 'Using _______ statement is how you test for a specific condition',
    answers: [
      { text: 'Select', correct: false },
      { text: 'If', correct: true },
      { text: 'Switch', correct: false },
      { text: 'For', correct: false }
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Absolutely', correct: true },
      { text: 'OMG YES!!!', correct: true },
      { text: 'A little bit', correct: true},
      { text: 'Not one bit', correct: true }
    ]
  },
  {
    question: 'Is it possible to nest function in JavaScript?',
    answers: [
      { text: 'True', correct: true },
      { text: 'False', correct: false }
    ]
  },
  {
    question: 'What are variables used for in JavaScript Programs?',
    answers: [
      { text: 'Storing, numbers, dates, or other values', correct: true },
      { text: 'Varying randomly', correct: false },
      { text: 'Causing high-school algebra flashbacks', correct: false},
      { text: 'None of the above', correct: false}
    ]
  },
]

//Timer Element
  // var count = 30;
  // var interval = setInterval(function(){
  //  document.getElementById('timer').innerHTML=count;
  //   count--;
  //   if (count === 0){
  //    clearInterval(interval);
  //    document.getElementById('timer').innerHTML='Times';
  //    // or...
  //    alert("You're out of time! Please restart");
  //   }
  // }, 1000);

  //Timer Element 2
  var count = 30;
  var timeIntervalUp;

    function startTimer(){ 
         	 timeIntervalUp = setInterval(function(){countTimer()}, 1000);
   }
   function countTimer() {
            document.getElementById("timer").innerHTML = "Time Remaining: " + count;
            count--;
			
             if (count == 0) {
                clearInterval(timeIntervalUp);
                document.getElementById('timer').innerHTML='Times';
                alert("You're out of time! Please restart");
            }
        }