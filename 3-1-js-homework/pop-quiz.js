let quizContents = "";
let correctAnswer = "";
let wrongAnswer1 = "";
let wrongAnswer2 = "";
let wrongAnswer3 = "";
let score = 0;
let correctCount = 0;

let body = document.querySelector("body");
body.style.backgroundColor = "black";
body.style.display = "flex";
body.style.flexDirection = "column";
body.style.alignItems = "center";
body.style.height = "100vh";
body.style.margin = "0";
body.style.padding = "0";

let header = document.createElement("h1");
header.className = "header";
header.innerText = "Samson's Pop Quiz!";
header.style.color = "blue";
header.style.fontSize = "60px";
header.style.textAlign = "center";
body.appendChild(header);

let scoreRow = document.createElement("div");
scoreRow.id = "scoreRow";
scoreRow.style.display = "flex";
scoreRow.style.justifyContent = "space-around";
scoreRow.style.flexWrap = "nowrap";
scoreRow.style.display = "none";
body.appendChild(scoreRow);

let timeDescription = document.createElement("div");
timeDescription.innerText = "Time Remaining:";
timeDescription.style.color = "white";
timeDescription.style.width = "250px";
timeDescription.style.fontSize = "30px";
timeDescription.style.textAlign = "center";
timeDescription.style.justifyContent = "center";
timeDescription.style.alignItems = "center";
timeDescription.style.display = "none";
scoreRow.appendChild(timeDescription);

let timerBorder = document.createElement("div");
timerBorder.id = "timerBorder";
timerBorder.style.border = "1px solid white";
timerBorder.style.height = "50px";
timerBorder.style.marginRight = "20px";
timerBorder.style.width = "125px";
timerBorder.style.display = "none";
scoreRow.appendChild(timerBorder);

let scoreDescription = document.createElement("div");
scoreDescription.innerText = "Score:";
scoreDescription.style.color = "white";
scoreDescription.style.width = "100px";
scoreDescription.style.fontSize = "30px";
scoreDescription.style.textAlign = "center";
scoreDescription.style.display = "flex";
scoreDescription.style.justifyContent = "center";
scoreDescription.style.alignItems = "center";
scoreRow.appendChild(scoreDescription);

let scoreBorder = document.createElement("div");
scoreBorder.id = "scoreBorder";
scoreBorder.style.border = "1px solid white";
scoreBorder.style.width = "125px";
scoreBorder.style.height = "50px";
scoreRow.appendChild(scoreBorder);

let fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = ".txt";
fileInput.onchange = function (event) {
  let quizContents = event.target.files[0];
  let reader = new FileReader();
  reader.onload = function () {
    let quizArray = reader.result.split("\n");
    buildQuestionBank(quizArray);
    scoreRow.style.display = "flex";
    quizSelector.style.display = "none";
    startButton.style.display = "block";
  };
  reader.readAsText(quizContents);
};

let quizDisplay = document.createElement("div");
quizDisplay.id = "quizDisplay";
quizDisplay.style.marginTop = "20px";
quizDisplay.style.display = "none";
body.appendChild(quizDisplay);

let questionDisplay = document.createElement("div");
questionDisplay.id = "questionDisplay";
questionDisplay.style.textDecoration = "underline";
questionDisplay.style.color = "white";
questionDisplay.style.textAlign = "center";
questionDisplay.style.fontSize = "30px";
quizDisplay.appendChild(questionDisplay);

let question = document.createElement("div");
question.id = "question";
questionDisplay.appendChild(question);

let answerDisplay = document.createElement("div");
answerDisplay.id = "answerDisplay";
answerDisplay.style.display = "flex";
answerDisplay.style.width = "90%";
answerDisplay.style.flexDirection = "column";
answerDisplay.style.color = "white";
answerDisplay.style.backgroundColor = "black";
answerDisplay.style.textAlign = "center";
answerDisplay.style.margin = "10px";
answerDisplay.style.fontSize = "20px";
answerDisplay.style.justifyContent = "space-between";
answerDisplay.style.alignItems = "center";
quizDisplay.appendChild(answerDisplay);

let answerSlot1 = document.createElement("button");
answerSlot1.id = "answerSlot1";
answerSlot1.style.backgroundColor = "transparent";
answerSlot1.style.cursor = "pointer";
answerSlot1.style.fontSize = "20px";
answerSlot1.style.margin = "10px";
answerSlot1.style.width = "100%";
answerSlot1.style.color = "white";
answerSlot1.style.textAlign = "left";
answerSlot1.style.outline = "none";
answerDisplay.appendChild(answerSlot1);

let answerSlot2 = document.createElement("button");
answerSlot2.id = "answerSlot2";
answerSlot2.style.backgroundColor = "transparent";
answerSlot2.style.cursor = "pointer";
answerSlot2.style.fontSize = "20px";
answerSlot2.style.margin = "10px";
answerSlot2.style.width = "100%";
answerSlot2.style.color = "white";
answerSlot2.style.textAlign = "left";
answerSlot2.style.outline = "none";
answerDisplay.appendChild(answerSlot2);

let answerSlot3 = document.createElement("button");
answerSlot3.id = "answerSlot3";
answerSlot3.style.backgroundColor = "transparent";
answerSlot3.style.cursor = "pointer";
answerSlot3.style.fontSize = "20px";
answerSlot3.style.margin = "10px";
answerSlot3.style.width = "100%";
answerSlot3.style.color = "white";
answerSlot3.style.textAlign = "left";
answerSlot3.style.outline = "none";
answerDisplay.appendChild(answerSlot3);

let answerSlot4 = document.createElement("button");
answerSlot4.id = "answerSlot4";
answerSlot4.style.backgroundColor = "transparent";
answerSlot4.style.cursor = "pointer";
answerSlot4.style.fontSize = "20px";
answerSlot4.style.margin = "10px";
answerSlot4.style.width = "100%";
answerSlot4.style.color = "white";
answerSlot4.style.textAlign = "left";
answerSlot4.style.outline = "none";
answerDisplay.appendChild(answerSlot4);

let resultsDisplay = document.createElement("div");
resultsDisplay.id = "resultsDisplay";
resultsDisplay.style.display = "none";
resultsDisplay.style.marginTop = "40px";
resultsDisplay.style.color = "white";
resultsDisplay.style.flexDirection = "column";
resultsDisplay.style.fontSize = "30px";
resultsDisplay.style.justifyContent = "center";
resultsDisplay.style.alignItems = "center";
body.appendChild(resultsDisplay);

let totalCorrect = document.createElement("div");
totalCorrect.id = "totalCorrect";
totalCorrect.style.marginBottom = "20px";
resultsDisplay.appendChild(totalCorrect);

let finalScore = document.createElement("div");
finalScore.id = "finalScore";
resultsDisplay.appendChild(finalScore);

const answerSlots = document.querySelectorAll("#answerDisplay button");

answerSlots.forEach((answerSlot) => {
  answerSlot.addEventListener("click", function (event) {
    const childElement = answerSlot.querySelector("div");

    if (childElement.classList.contains("correctAnswer")) {
      clearInterval(timer);
      score += time;
      updateScore();
      answerSlots.forEach((slot) => {
        const slotChildElement = slot.querySelector("div");

        if (slotChildElement.classList.contains("correctAnswer")) {
          slotChildElement.style.color = "green";
        } else {
          slotChildElement.style.color = "red";
        }
      });
      answerSlot1.disabled = true;
      answerSlot2.disabled = true;
      answerSlot3.disabled = true;
      answerSlot4.disabled = true;
      if (quizIndex < questions.length - 1) {
        nextButton.style.display = "block";
      } else {
        resultsButton.style.display = "block";
      }
      correctCount++;
    } else {
      time -= 300;
      if (time < 0) time = 0;
      answerSlot.disabled = true;
      answerSlot.style.opacity = 0.5;
      childElement.style.color = "red";
    }
  });
});

let questions = [];
let correctAnswers = [];
let wrongAnswersArray = [];
let wrongAnswersLine = [];
let wrongAnswers = [];
let quizIndex = 0;

function buildQuestionBank(quizArray) {
  quizArray.forEach((section) => {
    if (section.startsWith("Question")) {
      section = section.replace("Question " + (quizIndex + 1) + ": ", "");
      questions.push(section);
    } else if (section.startsWith("Correct Answer")) {
      section = section.replace("Correct Answer " + (quizIndex + 1) + ": ", "");
      correctAnswers.push(section);
    } else if (section.startsWith("Wrong Answer")) {
      section = section.replace("Wrong Answer " + (quizIndex + 1) + "A: ", "");
      section = section.replace("Wrong Answer " + (quizIndex + 1) + "B: ", "");
      section = section.replace("Wrong Answer " + (quizIndex + 1) + "C: ", "");
      wrongAnswersArray.push(section);
    }
  });
  wrongAnswersArray.forEach((wrongAnswersLine) => {
    wrongAnswersLine = wrongAnswersLine.split(", ");
    wrongAnswers.push(wrongAnswersLine);
  });
  let questionNumber = 1 + quizIndex;
  let questionBody = questionNumber + ": " + questions[quizIndex];
  question.innerText = questionBody;

  let randomizingArray = [1, 2, 3, 4];
  let randomizedArray = randomizeArray(randomizingArray);
  let randomSlot1 = randomizedArray[0];
  let randomSlot2 = randomizedArray[1];
  let randomSlot3 = randomizedArray[2];
  let randomSlot4 = randomizedArray[3];

  let correctAnswerSelection = document.createElement("div");
  correctAnswerSelection.textContent =
    randomSlot1 + ": " + correctAnswers[quizIndex];
  correctAnswerSelection.classList.add("correctAnswer");
  answerSlots[randomSlot1 - 1].appendChild(correctAnswerSelection);

  let wrongAnswerSelection1 = document.createElement("div");
  wrongAnswerSelection1.textContent =
    randomSlot2 + ": " + wrongAnswers[quizIndex][0];
  wrongAnswerSelection1.classList.add("wrongAnswer");
  answerSlots[randomSlot2 - 1].appendChild(wrongAnswerSelection1);

  let wrongAnswerSelection2 = document.createElement("div");
  wrongAnswerSelection2.textContent =
    randomSlot3 + ": " + wrongAnswers[quizIndex][1];
  wrongAnswerSelection2.classList.add("wrongAnswer");
  answerSlots[randomSlot3 - 1].appendChild(wrongAnswerSelection2);

  let wrongAnswerSelection3 = document.createElement("div");
  wrongAnswerSelection3.textContent =
    randomSlot4 + ": " + wrongAnswers[quizIndex][2];
  wrongAnswerSelection3.classList.add("wrongAnswer");
  answerSlots[randomSlot4 - 1].appendChild(wrongAnswerSelection3);
}

function randomizeArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let time = 1000;

let timerDisplay = document.createElement("div");
timerDisplay.id = "time";
timerDisplay.style.color = "white";
timerDisplay.style.textAlign = "center";
timerDisplay.style.fontSize = "40px";
timerDisplay.style.justifyContent = "center";
timerDisplay.style.alignItems = "center";
timerDisplay.innerText = time;
timerDisplay.style.display = "none";
timerBorder.appendChild(timerDisplay);

let timer;
function startTimer() {
  time = 1000;
  timer = setInterval(function () {
    timerDisplay.innerText = time;
    time--;
    if (time <= 0) {
      clearInterval(timer);
      time = 0;
      timerDisplay.innerText = time;
      answerSlots.forEach((slot) => {
        const slotChildElement = slot.querySelector("div");
        if (slotChildElement.classList.contains("correctAnswer")) {
          slotChildElement.style.color = "green";
        } else {
          slotChildElement.style.color = "red";
        }
        slotChildElement.disabled = true;
      });
      if (quizIndex < questions.length - 1) {
        nextButton.style.display = "block";
      } else {
        resultsButton.style.display = "block";
      }
    }
  }, 10);
}

let scoreDisplay = document.createElement("div");
scoreDisplay.id = "score";
scoreDisplay.style.color = "white";
scoreDisplay.style.textAlign = "center";
scoreDisplay.style.fontSize = "40px";
scoreDisplay.style.display = "flex";
scoreDisplay.style.justifyContent = "center";
scoreDisplay.style.alignItems = "center";
scoreDisplay.innerText = score;
scoreBorder.appendChild(scoreDisplay);

function updateScore() {
  scoreDisplay.innerText = score;
}

let buttonRow = document.createElement("div");
buttonRow.style.display = "flex";
buttonRow.style.justifyContent = "center";
buttonRow.style.alignItems = "center";
buttonRow.style.width = "auto";
buttonRow.style.marginTop = "20px";
body.appendChild(buttonRow);

let quizSelector = document.createElement("button");
quizSelector.innerText = "Upload Quiz";
quizSelector.style.color = "black";
quizSelector.style.backgroundColor = "white";
quizSelector.style.fontSize = "20px";
quizSelector.style.padding = "2px";
quizSelector.style.border = "solid 1px black";
quizSelector.style.justifyContent = "center";
buttonRow.appendChild(quizSelector);
quizSelector.onclick = function () {
  fileInput.click();
  body.appendChild(fileInput);
  fileInput.style.display = "none";
};

let startButton = document.createElement("button");
startButton.innerText = "Start Quiz";
startButton.style.color = "black";
startButton.style.backgroundColor = "white";
startButton.style.fontSize = "20px";
startButton.style.padding = "2px";
startButton.style.border = "solid 1px black";
startButton.style.justifyContent = "center";
startButton.style.display = "none";
buttonRow.appendChild(startButton);
startButton.onclick = function () {
  quizDisplay.style.display = "block";
  startButton.style.display = "none";
  timeDescription.style.display = "flex";
  timerBorder.style.display = "block";
  timerDisplay.style.display = "flex";
  startTimer();
};

let nextButton = document.createElement("button");
nextButton.innerText = "Next Question";
nextButton.style.color = "black";
nextButton.style.backgroundColor = "white";
nextButton.style.fontSize = "20px";
nextButton.style.padding = "2px";
nextButton.style.border = "solid 1px black";
nextButton.style.justifyContent = "center";
nextButton.style.display = "none";
buttonRow.appendChild(nextButton);
nextButton.onclick = function () {
  if (quizIndex < questions.length - 1) {
    quizIndex++;
    let questionNumber = 1 + quizIndex;
    let questionBody = questionNumber + ": " + questions[quizIndex];
    question.innerText = questionBody;

    let randomizingArray = [1, 2, 3, 4];
    let randomizedArray = randomizeArray(randomizingArray);
    let randomSlot1 = randomizedArray[0];
    let randomSlot2 = randomizedArray[1];
    let randomSlot3 = randomizedArray[2];
    let randomSlot4 = randomizedArray[3];

    answerSlots.forEach((slot) => (slot.innerHTML = ""));

    let correctAnswerSelection = document.createElement("div");
    correctAnswerSelection.textContent =
      randomSlot1 + ": " + correctAnswers[quizIndex];
    correctAnswerSelection.classList.add("correctAnswer");
    answerSlots[randomSlot1 - 1].appendChild(correctAnswerSelection);

    let wrongAnswerSelection1 = document.createElement("div");
    wrongAnswerSelection1.textContent =
      randomSlot2 + ": " + wrongAnswers[quizIndex][0];
    wrongAnswerSelection1.classList.add("wrongAnswer");
    answerSlots[randomSlot2 - 1].appendChild(wrongAnswerSelection1);

    let wrongAnswerSelection2 = document.createElement("div");
    wrongAnswerSelection2.textContent =
      randomSlot3 + ": " + wrongAnswers[quizIndex][1];
    wrongAnswerSelection2.classList.add("wrongAnswer");
    answerSlots[randomSlot3 - 1].appendChild(wrongAnswerSelection2);

    let wrongAnswerSelection3 = document.createElement("div");
    wrongAnswerSelection3.textContent =
      randomSlot4 + ": " + wrongAnswers[quizIndex][2];
    wrongAnswerSelection3.classList.add("wrongAnswer");
    answerSlots[randomSlot4 - 1].appendChild(wrongAnswerSelection3);
    answerSlot1.disabled = false;
    answerSlot2.disabled = false;
    answerSlot3.disabled = false;
    answerSlot4.disabled = false;
    answerSlot1.style.opacity = 1;
    answerSlot2.style.opacity = 1;
    answerSlot3.style.opacity = 1;
    answerSlot4.style.opacity = 1;
    nextButton.style.display = "none";
    startTimer();
  }
};

let resultsButton = document.createElement("button");
resultsButton.innerText = "Results";
resultsButton.style.color = "black";
resultsButton.style.backgroundColor = "white";
resultsButton.style.fontSize = "20px";
resultsButton.style.padding = "2px";
resultsButton.style.border = "solid 1px black";
resultsButton.style.justifyContent = "center";
resultsButton.style.display = "none";
buttonRow.appendChild(resultsButton);
resultsButton.onclick = function () {
  quizDisplay.style.display = "none";
  finalScore.innerText = "Final Score: " + score;
  totalCorrect.innerText =
    "Total Correct: " + correctCount + " / " + questions.length;
  resultsDisplay.style.display = "flex";
  resultsButton.style.display = "none";
  scoreRow.style.display = "none";
};
