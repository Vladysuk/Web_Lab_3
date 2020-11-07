export const nameInput = document.getElementById("rod-name");
export const descriptionInput = document.getElementById("rod-description");
export const priceInput = document.getElementById("rod-price");
export const modalBox = document.querySelector(".modal-box");
const modalContent = document.querySelector(".modal-content");
const closeSign = document.querySelector(".modal-close");
export const submitButton = document.querySelector(".section__submit-button")

export function clearInputs() {
  nameInput.value = "";
  descriptionInput.value = "";
  priceInput.value = "";
}

closeSign.onclick = function () {
  modalBox.style.display = "none";
}

function showErrorNotEnough() {
  modalBox.style.display = "flex";
  modalContent.innerText = "Please, enter all the fields";
  modalBox.style.color = "red";
}

function showErrorLess(input, min) {
  modalBox.style.display = "flex";
  modalContent.innerText = input + " field is less than " + min + " characters";
  modalBox.style.color = "red";
}

function showErrorMore(input, max) {
  modalBox.style.display = "flex";
  modalContent.innerText = input + " field is more than " + max + " characters";
  modalBox.style.color = "red";
}

export function showSuccess() {
  modalBox.style.display = "flex";
  modalContent.innerText = "That's a success";
  modalBox.style.color = "green";
}

export function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showErrorNotEnough();
      isRequired = true;
    }
  });
  return isRequired;
}

export function checkLength(input, min, max) {
  if (input.value.length < min) {
    showErrorLess(getFieldName(input), min);
    return
  } else if (input.value.length > max) {
    showErrorMore(getFieldName(input), max);
    return
  }
}

function getFieldName(input) {
  return input.id.charAt(4).toUpperCase() + input.id.slice(5);
}

export const getFeildsValue = () => {
  return {
    name: nameInput.value,
    description: descriptionInput.value,
    price: priceInput.value
  };
}

