import {getAllRods, deleteRod} from "./api.js"
const sortButton = document.querySelector(".aside__switch");
const sortButtonSlider = document.querySelector(".aside__round-slider");
const countButton = document.querySelector(".aside__count-button ");
const searchButton = document.querySelector(".header__search-button");
const clearButton = document.querySelector(".header__clear-button");
const removeButton = document.querySelector(".section__remove-button");
const addButton = document.querySelector(".aside__add-button")
const section = document.querySelector(".section");
export let rodId;

let rodsList = [];
let sortedList = [];
let isSorted = false;
let counter = 0;


const rodSchema = ({ id, name, description, price }) => `<div class="section__rod" id="${id}">
              <div class="section__rod-name">${name}</div>
              <div class="section__rod-description">${description}</div>
              <div class="section__rod-footer">
                  <div class="section__rod-price">
                      <h4>Price:</h4>
                      <span>${price}$</span>
                  </div>
                  <div class="section__rod-buttons">
                      <button id='edit-button-${id}' class="section__edit-button button"><a href="edit_rod.html?id=${id}" class="link">Edit</a></button>
                      <button id='remove-button-${id}' class="section__remove-button button">Remove</button>
                  </div>
              </div>
          </div>`;

const addRod = ({ id, name, description, price }) => {
  section.insertAdjacentHTML("beforeend", rodSchema({ id, name, description, price }));
  document.getElementById("remove-button-"+id).addEventListener('click', async () =>{
    await deleteRod(id);
    refetchAllRods();
  })
};


function updateDOM(items) {
  section.innerHTML = "";
  for (const item of items) {
    addRod(item);
  }
}

sortButton.addEventListener("click", (event) => {
  event.preventDefault();
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
})

countButton.addEventListener('click', (event) => {
  event.preventDefault();
  let totalPrice = rodsList.reduce((counter, rod) => (counter += rod.price), 0);
  document.querySelector(".aside__price").innerText = totalPrice + "$";
})

searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  let text = document.querySelector(".header__search-form").value;
  let pattern = new RegExp(text);
  let filteredRods = rodsList.filter(
    (rod) => pattern.test(rod.name) || pattern.test(rod.text)
  );
  updateDOM(filteredRods);
}) 

clearButton.addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelector(".header__search-form").value = "";
  updateDOM(rodsList);
})


const refetchAllRods = async () => {
  const allRods = await getAllRods();
  rodsList = allRods;    
  updateDOM(rodsList);
};

refetchAllRods(); 
