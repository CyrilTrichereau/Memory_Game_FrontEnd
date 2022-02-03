// IMPORTS
// -----------------------------
import * as apiRequests from "./apiRequests.js";
import * as displayScores from "./displayScores.js";
import * as timer from "./timer.js";
import * as utils from "../utils/utils.js";
import * as store from "../utils/store.utils.js";

// FUNCTIONS
// -----------------------------

// FUNCTION Play Victory !!
export const playVictory = async () => {
  try {
    // Stop time remaining
    timer.setUpTimer("stop");

    // Stop the progress bar
    let progressBar = document.getElementById("progressBarBackground");
    progressBar.classList.remove("progressBarPlay");
    progressBar.classList.add("progressBarPause");

    // Open victory message by removing and adding css classes
    // But first verify if target already have the good classes
    if (document.getElementById("victoryMessage").classList == "victoryCard") {
      document.getElementById("victoryMessage").classList.add("revealMessage");
    } else {
      document
        .getElementById("victoryMessage")
        .classList.remove("closeMessage");
      setTimeout(() => {
        document
          .getElementById("victoryMessage")
          .classList.add("revealMessage");
      }, 0);
    }

    // Display your score
    let scoreToDisplay = document.querySelector("#yourFinalScore");
    scoreToDisplay.textContent = utils.transformInMinutesSeconds(
      store.timerDuration - store.timeRemaining
    );
    // Send score
    await apiRequests.sendScore(store.timeRemaining);
    // Fetch Best Scores and display it
    await displayScores.getBestScoresAndDisplay();
  } catch (error) {
    console.log({ messageError: error });
  }
};
