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
    question: "O que é uma Máquina de Turing?",
    answers: [
      { text: "Um computador físico que realiza contas", correct: false },
      {
        text: "Um modelo teórico matemático de computabilidade",
        correct: true
      }
    ]
  },
  {
    question: "Uma Máquina de Turing é composta por quais elementos?",
    answers: [
      {
        text:
          "É composta por 5 elementos: alfabeto de saída, conjunto finito de estados, o estado inicial, conjunto de estados finais e função de transição",
        correct: false
      },
      {
        text:
          "É composta por 5 elementos: alfabeto da entrada, conjunto finito de estados, o estado inicial, conjunto de estados finais e função de transição",
        correct: false
      },
      {
        text:
          "É composta por 6 elementos: alfabeto da entrada, alfabeto da fita, conjunto finito de estados, o estado inicial, conjunto de estados de parada e função de transição",
        correct: true
      },
      {
        text:
          "É composta por 6 elementos:  alfabeto da entrada, alfabeto de saída, conjunto finito de estados, o estado inicial, conjunto de estados de parada e função de transição",
        correct: false
      }
    ]
  },
  {
    question:
      "Dizemos que determinada linguagem L é uma linguagem recursivamente enumerável ou uma linguagem semi-decidível quando?",
    answers: [
      { text: "Podemos contar o alfabeto da linguagem L", correct: false },
      { text: "Não podemos contar o alfabeto da linguagem L", correct: false },
      {
        text: "Não existe uma Máquina de Turing M que aceita a linguagem L",
        correct: false
      },
      {
        text: "Existe alguma Máquina de Turing M que aceita a linguagem L",
        correct: true
      }
    ]
  },
  {
    question: "Numa Máquina de Turing, seu cabeçote, pode:",
    answers: [
      {
        text:
          "Realizar tanto operações de leitura quanto de escrita na fita e é capaz de se mover somente para esquerda",
        correct: false
      },
      {
        text:
          "Realizar tanto operações de leitura quanto de escrita na fita e é capaz de se mover tanto para a esquerda quanto para a direita",
        correct: true
      }
    ]
  }
];
