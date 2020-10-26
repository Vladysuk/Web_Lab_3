const nameInput = document.getElementById("rod-name");
const descriptionInput = document.getElementById("rod-description");
const priceInput = document.getElementById("rod-price");
const modalBox = document.querySelector(".modal-box");
const modalContent = document.querySelector(".modal-content");
const closeSign = document.querySelector(".modal-close");

function clearInputs() {
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

function showSuccess() {
  modalBox.style.display = "flex";
  modalContent.innerText = "That's a success";
  modalBox.style.color = "green";
}

function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showErrorNotEnough();
      isRequired = true;
    }
  });
  return isRequired;
}

function checkLength(input, min, max) {
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


function submitOnClick() {
  modalBox.style.display = "none";
  if (!checkRequired([nameInput, descriptionInput, priceInput])) {
    checkLength(nameInput, 3, 20);
    checkLength(descriptionInput, 6, 60);
    checkLength(priceInput, 2, 15);
    if(modalBox.style.display == "none"){
      showSuccess();
    } 
  }
  clearInputs();
}