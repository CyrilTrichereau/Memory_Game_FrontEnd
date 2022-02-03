// IMPORTS
// -----------------------------
import * as onClick from "./actionsOnClick.js";
import * as utils from "../utils/utils.js";
import * as store from "../utils/store.utils.js";

// FUNCTIONS
// -----------------------------

// FUNCTION Create back of card
export const createBackCard = (numberOfCard) => {
  // Create a new img tag
  let newBackCard = document.createElement("img");
  // Add source for img
  newBackCard.src =
    "https://oclock.io/images/common/logo-short-cream.svg?v=66184eb7";
  // Add an ID created
  newBackCard.id = "cardNumber" + numberOfCard;
  // Add Class to img tag
  newBackCard.classList.add("cardGameBackCard");
  // Add Alt description
  newBackCard.setAttribute("alt", "Logo O'Clock");
  // Add an event listener for executing a function on click
  newBackCard.addEventListener("click", (event) => {
    onClick.onClickFunction(newBackCard);
  });
  // Return the new back card
  return newBackCard;
};

// FUNCTION Create front of card with fruit
export const createFruitCard = (numberOfCard) => {
  // Create a new img tag
  let newFruitCard = document.createElement("img");
  // Add source for img
  newFruitCard.src =
    "https://static.oclock.io/challenges/tests-techniques/cards.png";
  // Add Class to img tag
  newFruitCard.classList.add("cardGameImage");
  // Add Alt description
  newFruitCard.setAttribute("alt", "Image de fruit");
  // Display the picture of fruit
  // Every 80px there is a new fruit on image band
  const distanceTop = -80 * numberOfCard + "px";
  newFruitCard.style.top = distanceTop;
  // Return the new fruit card
  return newFruitCard;
};

// FUNCTION Assembly front and back of card
export const createCardAssembly = (numberOfCard, randomNumber) => {
  // Create a new div for containing the cards elements
  let newCardAssembly = document.createElement("div");
  // Add class to img tag
  newCardAssembly.classList.add("cardGame");
  // Add Front card (fruit)
  newCardAssembly.appendChild(createFruitCard(numberOfCard));
  // Add back card
  newCardAssembly.appendChild(createBackCard(numberOfCard));
  // Add order number
  newCardAssembly.style.order = randomNumber;
  // Return the new fruit card
  return newCardAssembly;
};

// FUNCTION Loop for create all boxes card and inject in DOM
export const injectRandomCards = () => {
  // Init the number of the fruit
  let fruitNumber = 1;
  //Init the array of random numbers
  const arrayOfRandomInt = utils.getArrayOfUniqueRandomInt(store.numberOfBoxes);
  // Loop for create all cards
  for (let index = 0; index < store.numberOfBoxes; index++) {
    // Inject the card to the DOM container
    store.cardContainer.appendChild(
      createCardAssembly(fruitNumber, arrayOfRandomInt[index])
    );
    // Increment fruit number at every loop, but stop at half and restart to get 2 similar images
    if (fruitNumber < store.numberOfBoxes / 2) {
      fruitNumber++;
    } else {
      fruitNumber = 1;
    }
  }
};
