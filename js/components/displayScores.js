// IMPORTS
// -----------------------------
import * as apiRequests from "./apiRequests.js";
import * as utils from "../utils/utils.js";
import * as store from "../utils/store.utils.js";

// FUNCTIONS
// -----------------------------

// FUNCTION Get Bests Scores and display it
export const getBestScoresAndDisplay = async () => {
  // Async function to get results with fetch API
  const bestsResults = await apiRequests.getBestScores();
  // Give results to function who will inject in results ban
  displayResultsBan(bestsResults, store.timerDuration);
  // Give results to function who will display in victory card
  displayVictoryCard(bestsResults, store.timerDuration);
};

// FUNCTION Display Bests Scores in results ban
export const displayResultsBan = (resultsObject, timerDuration) => {
  // Target the id tag for injecting later in DOM
  let resultsBan = document.getElementById("resultsBan");
  //Reset Container before create and inject
  resultsBan.textContent = "";

  // Loop for displaying the results
  resultsObject.forEach((score) => {
    // Create a new div for containing informations of one score
    let resultBlock = document.createElement("div");
    // Add class
    resultBlock.classList.add("resultsBanBlock");

    // Create a new p tag for ranking
    let blockRank = document.createElement("p");
    // Add class
    blockRank.classList.add("resultsBanBlockRank");
    // Add ranking value from score
    blockRank.textContent = score.ranking;

    // Create a new p tag for score
    let blockScore = document.createElement("p");
    // Add class
    blockScore.classList.add("resultsBanBlockScore");
    // Add score value from score
    blockScore.textContent = utils.transformInMinutesSeconds(
      timerDuration - score.score
    );

    // Create a new p tag for date
    let blockDate = document.createElement("p");
    // Add class
    blockDate.classList.add("resultsBanBlockDate");
    // Add date value from score
    blockDate.textContent = score.createdDate;

    // Add to results ban block
    resultBlock.append(blockRank, blockScore, blockDate);
    // Then push results ban in DOM
    resultsBan.appendChild(resultBlock);
  });
};

// FUNCTION Display Bests Scores in results ban
export const displayVictoryCard = (resultsObject, timerDuration) => {
  // Target the id tag for injecting later in DOM
  let bestTimesContainer = document.getElementById("bestTimesContainer");
  //Reset Container before create and inject
  bestTimesContainer.textContent = "";

  // Loop for displaying the results
  resultsObject.forEach((score) => {
    // Create a new div for containing informations of one score
    let resultBlock = document.createElement("div");
    // Add class
    resultBlock.classList.add("victoryCardBlockScoresBestTimesContainerLine");

    // Create a new p tag for ranking
    let blockRank = document.createElement("p");
    // Add class
    blockRank.classList.add(
      "victoryCardBlockScoresBestTimesContainerLineRanking"
    );
    // Add ranking value from score
    blockRank.textContent = score.ranking;

    // Create a new p tag for score
    let blockScore = document.createElement("p");
    // Add class
    blockScore.classList.add(
      "victoryCardBlockScoresBestTimesContainerLineScore"
    );
    // Add score value from score
    blockScore.textContent = utils.transformInMinutesSeconds(
      timerDuration - score.score
    );

    // Create a new p tag for date
    let blockDate = document.createElement("p");
    // Add class
    blockDate.classList.add("victoryCardBlockScoresBestTimesContainerLineTime");
    // Add date value from score
    blockDate.textContent = score.createdDate;

    // Add to results ban block
    resultBlock.append(blockRank, blockScore, blockDate);
    // Then push results ban in DOM
    bestTimesContainer.appendChild(resultBlock);
  });
};
