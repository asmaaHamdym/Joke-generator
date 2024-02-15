import OpenAI from "openai";

const APIKey = import.meta.env.VITE_MyKey;

let leftDoor = document.querySelector(".left-door");
let rightDoor = document.querySelector(".right-door");
let jokeDisplaysSection = document.querySelector(".joke-display");
let jokeDisplayHeader = document.querySelector("#joke-display");
const imageDisplayDiv = document.querySelector(".joke-image-display");
let jokesArray;

const openai = new OpenAI({
  apiKey: APIKey,
  dangerouslyAllowBrowser: true,
});

async function generateImage(description) {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: description,
    n: 1,
    size: "1024x1024",
  });
  image_url = response.data.data[0].url;
  imageDisplayDiv.innerHTML = `<img src="${image_url}">`;
}
async function generateJokes() {
  let message = "give me 50 unique one-line dad jokes";

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: message }],
    model: "gpt-3.5-turbo",
  });
  let response = completion.choices[0].message.content;

  cleanupGeneratedArr(response);
  displayRandomJoke(jokesArray);
}
function cleanupGeneratedArr(arr) {
  jokesArray = arr.split("\n");
  // remove non needed lines
  jokesArray.pop();
  jokesArray = jokesArray.filter((element) => Boolean(element));
}
function displayRandomJoke(arr) {
  if (arr) {
    const index = Math.floor(Math.random() * arr.length);

    if (arr[index]) {
      // remove the leading numbering from the joke
      const joke = arr[index].replace(/\d+\./, "");
      console.log(joke);
      jokeDisplayHeader.textContent = joke;
      generateImage(joke);
    } else {
      const joke = arr[index + 1].replace(/\d+\./, "");
      jokeDisplayHeader.textContent = joke;
    }
  }
}

function openDoor() {
  leftDoor.style.animation = "left-open 0.3s forwards";
  rightDoor.style.animation = "right-open 0.3s forwards";
  jokeDisplaysSection.style.animation = "display-joke 0.3s forwards";
  displayRandomJoke(jokesArray);
}

function closeDoor() {
  leftDoor.style.animation = "left-close 0.3s forwards";
  rightDoor.style.animation = "right-close 0.3s forwards";
  jokeDisplaysSection.style.animation = "hide-joke 0.3s forwards";
}

function toggleJokeDisplay() {
  if (leftDoor.style.animationName === "left-open") {
    closeDoor();
  } else {
    openDoor();
  }
}

generateJokes();

document
  .querySelector("#window-container")
  .addEventListener("click", toggleJokeDisplay);
