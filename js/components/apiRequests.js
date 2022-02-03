// VARIABLES AND CONSTANTS
// -----------------------------

// Set api endpoint
let apiEndPoint = "https://oclock-memory-game-api.herokuapp.com/api";

// FUNCTIONS
// -----------------------------

// FUNCTION Send Score to API
export const sendScore = async (score) => {
  const newPost = {
    newScore: score,
  };
  let response = null;
  try {
    response = await fetch(apiEndPoint + "/postSCore", {
      method: "POST",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
  } catch (error) {
    console.log("Cannot send your score to the API");
  }
  if (response.status == 200) {
    return response;
  }
};

// FUNCTION Get bests score from API
export const getBestScores = async () => {
  let response = null;
  try {
    let responseRaw = await fetch(apiEndPoint + "/bestsScores/");
    response = await responseRaw.json();
  } catch (error) {
    console.log("Cannot get bests scores from the API" + error);
  }
  if (response) {
    return response;
  }
};
