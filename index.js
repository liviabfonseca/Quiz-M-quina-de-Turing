const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Jogar novamente";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "O que ?? uma M??quina de Turing?",
    answers: [
      { text: "Um computador f??sico que realiza contas", correct: false },
      {
        text: "Um modelo te??rico matem??tico de computabilidade",
        correct: true
      }
    ]
  },
  {
    question: "Uma M??quina de Turing ?? composta por quais elementos?",
    answers: [
      {
        text:
          "?? composta por 5 elementos: alfabeto de sa??da, conjunto finito de estados, o estado inicial, conjunto de estados finais e fun????o de transi????o",
        correct: false
      },
      {
        text:
          "?? composta por 5 elementos: alfabeto da entrada, conjunto finito de estados, o estado inicial, conjunto de estados finais e fun????o de transi????o",
        correct: false
      },
      {
        text:
          "?? composta por 6 elementos: alfabeto da entrada, alfabeto da fita, conjunto finito de estados, o estado inicial, conjunto de estados de parada e fun????o de transi????o",
        correct: true
      },
      {
        text:
          "?? composta por 6 elementos:  alfabeto da entrada, alfabeto de sa??da, conjunto finito de estados, o estado inicial, conjunto de estados de parada e fun????o de transi????o",
        correct: false
      }
    ]
  },
  {
    question:
      "Dizemos que determinada linguagem L ?? uma linguagem recursivamente enumer??vel ou uma linguagem semi-decid??vel quando?",
    answers: [
      { text: "Podemos contar o alfabeto da linguagem L", correct: false },
      { text: "N??o podemos contar o alfabeto da linguagem L", correct: false },
      {
        text: "N??o existe uma M??quina de Turing M que aceita a linguagem L",
        correct: false
      },
      {
        text: "Existe alguma M??quina de Turing M que aceita a linguagem L",
        correct: true
      }
    ]
  },
  {
    question: "Numa M??quina de Turing, seu cabe??ote, pode:",
    answers: [
      {
        text:
          "Realizar tanto opera????es de leitura quanto de escrita na fita e ?? capaz de se mover somente para esquerda",
        correct: false
      },
      {
        text:
          "Realizar tanto opera????es de leitura quanto de escrita na fita e ?? capaz de se mover tanto para a esquerda quanto para a direita",
        correct: true
      }
    ]
  }
];
