// IMPORTS
// -----------------------------
import * as onClick from "./components/actionsOnClick.js";
import * as createCards from "./components/createCards.js";
import * as displayScores from "./components/displayScores.js";
import * as timer from "./components/timer.js";
import * as store from "./utils/store.utils.js";

// RUN SCRIPT
// -----------------------------

// Update Result Ban with bests scores
displayScores.getBestScoresAndDisplay();

// Create and inject cards in random order
// They already contains listener for click on card
createCards.injectRandomCards(store.cardContainer, store.numberOfBoxes);

// Start timer when user click for the first time on card
timer.startTimer();

// Listen if restart button on Victory page is click
onClick.listenRestartButton("restartButtonVictory");

// Listen if restart button on bottom of the game is click
onClick.listenRestartButton("restartButtonOnGame");

// Listen if restart button on loser page is click
onClick.listenRestartButton("restartButtonLoser");
