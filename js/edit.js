import {
    nameInput, descriptionInput, priceInput, modalBox, submitButton,
    clearInputs, checkLength, showSuccess, checkRequired, getFeildsValue
} from "./create_edit_rod.js";
import { updateRod, getRod } from "./api.js"

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
};

const id = getUrlVars()["id"];
console.log(id);

(async () => {
    if (!submitButton)
        return
    const rod = await getRod(id);
    console.log(rod)
    nameInput.value = rod.name;
    descriptionInput.value = rod.description;
    priceInput.value = rod.price;
})()


submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    modalBox.style.display = "none";
    if (!checkRequired([nameInput, descriptionInput, priceInput])) {
        checkLength(nameInput, 3, 40);
        checkLength(descriptionInput, 6, 300);
        checkLength(priceInput, 2, 20);
        if (modalBox.style.display == "none") {
            showSuccess(); 
            updateRod(id,getFeildsValue());
        }
    }
    clearInputs();
})
