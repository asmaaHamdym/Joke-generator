import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OpenAI,
  dangerouslyAllowBrowser: true,
});
async function generateJokes() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "tell me a Christmas joke." }],
    model: "gpt-3.5-turbo",
  });
  let response = completion.choices[0].message.content;
  let joke = document.querySelector("h1");
  if (response.includes(":")) {
    response = response.split(":")[1];
  }
  joke.innerHTML = response;
}
function toggleJokeDisplay() {
  const leftDoor = document.querySelector(".left-door");
  const rightDoor = document.querySelector(".right-door");
  const jokeDisplay = document.querySelector(".joke-display");

  if (leftDoor.style.animationName === "left-open") {
    leftDoor.style.animation = "left-close 0.3s forwards";
    rightDoor.style.animation = "right-close 0.3s forwards";
    jokeDisplay.style.animation = "hide-joke 0.3s forwards";
  } else {
    leftDoor.style.animation = "left-open 0.3s forwards";
    rightDoor.style.animation = "right-open 0.3s forwards";
    jokeDisplay.style.animation = "display-joke 0.3s forwards";
  }
}

document
  .getElementById("window-container")
  .addEventListener("click", toggleJokeDisplay);
