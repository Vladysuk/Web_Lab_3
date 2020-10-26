const sortButton = document.querySelector(".aside__switch");
const sortButtonSlider = document.querySelector(".aside__round-slider");
const removeButton = document.querySelector(".section__remove-button");
const section = document.querySelector(".section");
const rodsList = [];
let sortedList = [];
let isSorted = false;
let counter = 0;


class FishingRod {
  constructor(id, name, description, price) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
  }
}

const rodSchema = ({ id, name, description, price }) => `<div class="section__rod" id="${id}">
              <div class="section__rod-name">${name}</div>
              <div class="section__rod-description">${description}</div>
              <div class="section__rod-footer">
                  <div class="section__rod-price">
                      <h4>Price:</h4>
                      <span>${price}$</span>
                  </div>
                  <div class="section__rod-buttons">
                      <button class="section__edit-button button"><a href="edit_rod.html" class="link">Edit</a></button>
                      <button class="section__remove-button button">Remove</button>
                  </div>
              </div>
          </div>`;

const addRod = ({ id, name, description, price }) => {
  section.insertAdjacentHTML(
    "beforeend",
    rodSchema({ id, name, description, price })
  );
};

function addOnClick() {
  let id = counter;
  counter += 1;
  let name = `Rod ${id}`;
  let description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nesciunt inventore laudantium nulla, cupiditate fugit.";
  let price = Math.floor(Math.random() * 1000);
  let rod = new FishingRod(id, name, description, price);
  rodsList.push(rod);
  addRod({ id, name, description, price });
  sortButton.classList.remove("active");
  sortButtonSlider.classList.remove("active");
}

function updateDOM(items) {
  section.innerHTML = "";
  for (const item of items) {
    addRod(item);
  }
}

function sortOnClick() {
  sortButton.classList.toggle("active");
  sortButtonSlider.classList.toggle("active");
  if (isSorted) {
    updateDOM(rodsList);
    isSorted = false;
    return
  }
  sortedList = [...rodsList];
  sortedList.sort((a, b) => b.price - a.price);
  updateDOM(sortedList);
  isSorted = true;
}

function countOnClick() {
  let totalPrice = rodsList.reduce((counter, rod) => (counter += rod.price), 0);
  document.querySelector(".aside__price").innerText = totalPrice + "$";
}

function searchOnClick() {
  let text = document.querySelector(".header__search-form").value;
  let pattern = new RegExp(text);
  let filteredRods = rodsList.filter(
    (rod) => pattern.test(rod.name) || pattern.test(rod.text)
  );
  updateDOM(filteredRods);
}

function clearOnClick() {
  document.querySelector(".header__search-form").value = "";
  updateDOM(rodsList);
}

