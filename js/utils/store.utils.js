// VARIABLES AND CONSTANTS
// -----------------------------

// Number of card total
export const numberOfBoxes = 28;
// Duration of the game
export let timerDuration = 60 * 5; // 60s x 5min
// Time remaining
export let timeRemaining = timerDuration;
// Toggle for indicate if game is already start or not
export let isInGame = false;
// Target the tag where to inject time
export let targetYourTime = document.getElementById("yourScore");
// Target the container where to inject the cards inside DOM
export let cardContainer = document.querySelector(".sectionGameCardsContainer");

// FUNCTIONS FOR CHANGING STORE
// -----------------------------

export const updateTimeRemaining = (value) => {
  timeRemaining = value;
};
export const updateIsInGame = (value) => {
  isInGame = value;
};
