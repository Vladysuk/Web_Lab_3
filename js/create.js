import { nameInput, descriptionInput, priceInput, modalBox, submitButton, clearInputs, checkLength, showSuccess, checkRequired, getFeildsValue} 
from "./create_edit_rod.js";
import { postRod } from "./api.js"

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    modalBox.style.display = "none";
    if (!checkRequired([nameInput, descriptionInput, priceInput])) {
        checkLength(nameInput, 3, 40);
        checkLength(descriptionInput, 6, 300);
        checkLength(priceInput, 2, 20);
        if (modalBox.style.display == "none") {
            showSuccess();
            postRod(getFeildsValue());
        }
    }
    clearInputs();
})
