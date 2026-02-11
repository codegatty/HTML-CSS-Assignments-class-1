function main() {
  const selectedTypeEle = document.getElementById("selected-type");
  const submitBtnEle = document.getElementById("submit");
  const selectedTypeLabelTextEle = document.getElementById(
    "selected-type-label-text",
  );
  const formPreviewEle = document.getElementById("form-preview");

  submitBtnEle.addEventListener("click", (event) => {
    event.preventDefault();
    const selectedType = selectedTypeEle.value;
    const labelText = selectedTypeLabelTextEle.value;

    const formElement = createDynamicFormComponent(selectedType, labelText);
    formPreviewEle.appendChild(formElement);
  });
}

function createDynamicFormComponent(inputType, labelText) {
  const containerDivEle = document.createElement("div");
  const inputEle = document.createElement("input");
  const labelEle = document.createElement("label");

  inputEle.setAttribute("type", inputType);

  labelEle.innerText = labelText;

  if (inputType !== "button") {
    containerDivEle.appendChild(labelEle);
    containerDivEle.appendChild(inputEle);
  }
  if (inputType === "button") {
    inputEle.setAttribute("value", labelText);
    containerDivEle.appendChild(inputEle);
  }

  return containerDivEle;
}

main();
