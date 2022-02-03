// FUNCTIONS
// -----------------------------

// FUNCTION Get an array of random numbers between two numbers
export const getArrayOfUniqueRandomInt = (numberMax) => {
  // Init Counter
  let counter = 0;
  // Init array who will receive the numbers
  let arrayOfRandomNumbers = [];

  // Loop for adding new random number in array
  // until the counter is egal to boxes number asked
  while (counter < numberMax) {
    // Create a random number
    const randomNumber = Math.floor(Math.random() * numberMax) + 1;
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

// FUNCTION Transform time in seconds in minutes and seconds
export const transformInMinutesSeconds = (timeToTransform) => {
  // Divide timer in seconds and minute
  let minutes = parseInt(timeToTransform / 60, 10);
  let seconds = parseInt(timeToTransform % 60, 10);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return minutes + ":" + seconds;
};
