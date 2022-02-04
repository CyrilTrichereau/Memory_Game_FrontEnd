// IMPORTS
// -----------------------------
import * as createCards from "./createCards.js";
import * as playVictory from "./playVictory.js";
import * as timer from "./timer.js";
import * as store from "../utils/store.utils.js";

// VARIABLES AND CONSTANTS
// -----------------------------

// Set variable for saving the picture who's clicked, before compare
let firstClic = null;
// Set variable for saving the picture who's clicked, before compare
let secondClic = null;
// Set variable for counting the number of fruits pairs discovers
let gameScore = 0;

// FUNCTIONS
// -----------------------------

// FUNCTION Reaction function on click
export const onClickFunction = (newBackCard) => {
  // If less than two cards are open
  if (!firstClic || !secondClic) {
    // Add class to animate
    newBackCard.classList.add("cardGameBackCardAnimate");

    // Save the ID of the HTML tag and compare it
    // If firstClic is empty
    if (!firstClic) {
      firstClic = newBackCard;
      secondClic = null;
      // Else if secondClic is empty
    } else if (!secondClic) {
      secondClic = newBackCard;

      // Now first and second Clic are full, so compare them
      if (secondClic.id === firstClic.id) {
        // If they match,
        // First reset classes and add a new one
        setTimeout(() => {
          // First click
          firstClic.classList.remove("cardGameBackCardAnimate");
          firstClic.classList.add("cardGameBackCardOpened");
          // Second click
          secondClic.classList.remove("cardGameBackCardAnimate");
          secondClic.classList.add("cardGameBackCardOpened");
          // Reset variables
          firstClic = null;
          secondClic = null;
        }, 500);

        // Increment Game Score
        gameScore += 2;
        // If gamescore is egal to number of boxes number, use the victory function !
        if (gameScore === store.numberOfBoxes) {
          playVictory.playVictory();
        }
      } else {
        // Else, they are not matching, so clear Clic variables and reset classes
        setTimeout(() => {
          firstClic.classList.remove("cardGameBackCardAnimate");
          secondClic.classList.remove("cardGameBackCardAnimate");
          firstClic = null;
          secondClic = null;
        }, 1000);
      }
    } else {
      return;
    }
    // Else, if firstClic and secondClic are full, nothing happened, retry to click when cards will be closed
  }
};

// FUNCTION Listen restart button and action if clicked
export const listenRestartButton = (elementToTarget) => {
  document.getElementById(elementToTarget).addEventListener("click", () => {
    //Reset Game Section Container
    document.querySelector(".sectionGameCardsContainer").textContent = "";

    // Reset progress bar
    let progressBar = document.getElementById("progressBarBackground");
    progressBar.classList.remove(
      "progressBarPlay",
      "progressBarPause",
      "progressBarAnimate"
    );

    // Reset variables
    firstClic = null;
    secondClic = null;
    gameScore = 0;
    store.updateTimeRemaining(null);
    store.updateIsInGame(false);
    // Close Victory message if opened :
    if (document.getElementById("victoryMessage").classList.length > 1) {
      document
        .getElementById("victoryMessage")
        .classList.remove("revealMessage");
      setTimeout(() => {
        document.getElementById("victoryMessage").classList.add("closeMessage");
      }, 0);
    }
    // Close Loser message if opened :
    if (document.getElementById("loserMessage").classList.length > 1) {
      document.getElementById("loserMessage").classList.remove("revealMessage");
      setTimeout(() => {
        document.getElementById("loserMessage").classList.add("closeMessage");
      }, 0);
    }
    // Inject new random cards
    createCards.injectRandomCards();
    // Reset Timer
    timer.setUpTimer("clear");
    // Start Timer
    timer.startTimer();
  });
};
