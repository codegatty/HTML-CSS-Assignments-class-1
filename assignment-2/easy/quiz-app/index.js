import { quizData } from "./data.js";

function initialSetup(index) {
  const { question, correct, ...options } = getQuestionData(index);
  createOptions(options, optionWrapper);
  questionText.innerText = question;
}
function main() {
  const submitBtn = document.getElementById("submit-button");

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (index === -1) {
      location.reload();
    }

    if (index == questionSetSize - 1) {
      getResult(score);

      submitBtn.innerText = "Reset";
      index = -1;
    } else {
      const correctAns = getQuestionData(index).correct;
      index++;
      if (index < questionSetSize) {
        const { question, correct, ...options } = getQuestionData(index);
        const radioButtons = document.querySelectorAll("input[name='options']");
        radioButtons.forEach((item) => {
          if (item.checked && item.value === correctAns) {
            score++;
          }
        });

        optionWrapper.replaceChildren();
        createOptions(options, optionWrapper);
        questionText.innerText = question;
      }
    }
  });
}

function createOptionsElement(option, value) {
  const radioButtonContainer = document.createElement("div");
  const radioButtonElement = document.createElement("input");
  const radioButtonLabel = document.createElement("label");

  radioButtonContainer.setAttribute("class", "radio-label-container");

  radioButtonElement.setAttribute("type", "radio");
  radioButtonElement.setAttribute("value", value);
  radioButtonElement.setAttribute("name", "options");
  radioButtonElement.setAttribute("class", "radio");

  radioButtonLabel.innerText = option;
  radioButtonLabel.setAttribute("class", "label");

  radioButtonContainer.appendChild(radioButtonElement);
  radioButtonContainer.appendChild(radioButtonLabel);

  return radioButtonContainer;
}

function createOptions(options, wrapper) {
  const optionsInArray = Object.entries(options);

  const items = optionsInArray.map((i) => createOptionsElement(i[1], i[0]));
  items.map((i) => wrapper.appendChild(i));
}

function getQuestionData(index) {
  return quizData[index];
}

function getResult(score) {
  const questionWrapper = document.querySelector(".question-wrapper");

  questionWrapper.replaceChildren();
  optionWrapper.replaceChildren();

  questionWrapper.innerHTML = `<p>you answered ${score}/${questionSetSize} correctly</p>`;
}
let index = 0;
let score = 0;
const optionWrapper = document.querySelector(".options-wrapper");
const questionText = document.querySelector(".question-text");
const questionSetSize = quizData.length;

window.onload = initialSetup(index);
main();
