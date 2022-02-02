// VARIABLES AND CONSTANTS
// -----------------------------

// Set general variables needed for the game
const numberOfBoxes = 28;
let firstClic = null;
let secondClic = null;
let gameScore = 0;
let timeRemaining = null;
let isInGame = false;
let timerInterval = null;
let targetYourTime = document.getElementById("yourScore");
let apiEndPoint = "https://";
let timerDuration = 60 * 5; // 60s x 5min

// Target the container where to inject the cards inside DOM
let cardContainer = document.querySelector(".sectionGameCardsContainer");

// FUNCTIONS
// -----------------------------

// FUNCTION Create back of card
const createBackCard = (numberOfCard) => {
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
    onClickFunction(newBackCard);
  });
  // Return the new back card
  return newBackCard;
};

// FUNCTION Create front of card with fruit
const createFruitCard = (numberOfCard) => {
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
const createCardAssembly = (numberOfCard, randomNumber) => {
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

// FUNCTION Get an array of random numbers between two numbers
const getArrayOfUniqueRandomInt = (numberOfBoxes) => {
  // Init Counter
  let counter = 0;
  // Init array who will receive the numbers
  let arrayOfRandomNumbers = [];

  // Loop for adding new random number in array
  // until the counter is egal to boxes number asked
  while (counter < numberOfBoxes) {
    // Create a random number
    const randomNumber = Math.floor(Math.random() * numberOfBoxes) + 1;
    // Check if number already exist in array
    const numberTimesFound = arrayOfRandomNumbers.filter(
      (value) => value === randomNumber
    ).length;
    // If found less than two times, push the number in the array
    if (numberTimesFound == 0) {
      arrayOfRandomNumbers.push(randomNumber);
      // Increment counter
      counter++;
    }
    // Else loop again to find and try with an another random number
  }
  return arrayOfRandomNumbers;
};

// FUNCTION Loop for create all boxes card and inject in DOM
const injectRandomCards = (cardContainer, numberOfBoxes) => {
  // Init the number of the fruit
  let fruitNumber = 1;
  //Init the array of random numbers
  const arrayOfRandomInt = getArrayOfUniqueRandomInt(numberOfBoxes);
  // Loop for create all cards
  for (let index = 0; index < numberOfBoxes; index++) {
    // Inject the card to the DOM container
    cardContainer.appendChild(
      createCardAssembly(fruitNumber, arrayOfRandomInt[index])
    );
    // Increment fruit number at every loop, but stop at half and restart to get 2 similar images
    if (fruitNumber < numberOfBoxes / 2) {
      fruitNumber++;
    } else {
      fruitNumber = 1;
    }
  }
};

// FUNCTION Reaction function on click
const onClickFunction = (newBackCard) => {
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
        // TODO:
        // if (gameScore === numberOfBoxes) {
        if (gameScore === 2) {
          playVictory();
          // TODO:
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

// FUNCTION Set timer and start it
setUpTimer = (duration, display, action) => {
  // Set timer variable
  let timer = duration;

  // If clear interval is false, start the timer
  if (action === "start") {
    // Set interval of one second (1000ms)
    timerInterval = setInterval(() => {
      // Decrement timer every second
      timer--;
      // Display the time generated by the timer
      display.textContent = transformInMinutesSeconds(timer);
      timeRemaining = timer;
    }, 1000);

    // Else, if clear the interval is true, reset the timer
  } else if (action === "clear") {
    // Stop looping for timer
    clearInterval(timerInterval);
    // Display the timer as reset
    display.textContent = transformInMinutesSeconds(timer);
    timeRemaining = timer;
  } else if (action === "stop") {
    // Stop looping for timer
    clearInterval(timerInterval);
  }
};

// FUNCTION Transform time in seconds in minutes and seconds
const transformInMinutesSeconds = (timeToTransform) => {
  // Divide timer in seconds and minute
  minutes = parseInt(timeToTransform / 60, 10);
  seconds = parseInt(timeToTransform % 60, 10);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return minutes + ":" + seconds;
};

// FUNCTION Start timer when first click on image
const startTimer = () => {
  // Listen the whole container of images
  document
    .querySelector(".sectionGameCardsContainer")
    .addEventListener("click", () => {
      // If game is not already current
      if (!isInGame) {
        // Start Timer
        setUpTimer(timerDuration, targetYourTime, "start");
        // And switch isInGame to true
        isInGame = true;
      }
      // Else if already in Game, do nothing
    });
};

// FUNCTION Play Victory !!
const playVictory = async () => {
  // Stop time remaining
  setUpTimer(timerDuration, targetYourTime, "stop");

  // Open victory message
  document.getElementById("victoryMessage").classList.add("revealMessage");

  // Display your score
  let scoreToDisplay = document.querySelector("#yourFinalScore");
  scoreToDisplay.textContent = transformInMinutesSeconds(timeRemaining);

  // Fetch Best Score and display it
  // TODO:
  await sendScore(timeRemaining);
};

// FUNCTION Listen restart button and action if clicked
const listenRestartButton = (cardContainer, numberOfBoxes, elementToTarget) => {
  document.getElementById(elementToTarget).addEventListener("click", () => {
    //Reset Game Section Container
    document.querySelector(".sectionGameCardsContainer").textContent = "";
    // Reset variables
    firstClic = null;
    secondClic = null;
    gameScore = 0;
    timeRemaining = null;
    isInGame = false;
    // Close Victory message if opened
    document.getElementById("victoryMessage").classList.remove("revealMessage");
    // Inject new random cards
    injectRandomCards(cardContainer, numberOfBoxes);
    // Reset Timer
    setUpTimer(timerDuration, targetYourTime, "clear");
    // Start Timer
    startTimer();
  });
};

// FUNCTION Send Score to API
const sendScore = async (score) => {
  let response = null;
  try {
    response = await fetch(apiEndPoint + "/postSCore/", {
      method: "POST",
      body: score,
    });
  } catch (error) {
    console.log("Cannot send your score to the API");
  }
  if (response) {
    return response;
  }
};

// FUNCTION Get bests score from API
const getBestsScores = async () => {
  let response = null;
  try {
    let responseRaw = await fetch(apiEndPoint + "/bestsScores/");
    response = responseRaw.json();
  } catch (error) {
    console.log("Cannot get bests scores from the API");
  }
  if (response) {
    return response;
  }
};

// RUN SCRIPT
// -----------------------------

// Create and inject cards in random order
injectRandomCards(cardContainer, numberOfBoxes);

// Start timer when user click for the first time on card
startTimer();

// Listen if restart button on Victory page is click
listenRestartButton(cardContainer, numberOfBoxes, "restartButtonVictory");

// Listen if restart button on bottom of the game is click
listenRestartButton(cardContainer, numberOfBoxes, "restartButtonOnGame");
