const audioElement = document.getElementById("audio");
const button = document.getElementById("button");

const voiceOverJoke = (joke) => {
  VoiceRSS.speech({
    key: "dcd5815f30554e2e86f78ad4bf7cb9c5",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

const getJoke = async () => {
  let joke = "";
  const url =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    voiceOverJoke(joke);
    toggleButton();
  } catch (error) {
    console.log(error);
  }
};

const toggleButton = () => {
  button.disabled = !button.disabled;
};

button.addEventListener("click", getJoke);
audioElement.addEventListener("ended", toggleButton);
