
// Generate Keyboard Buttons
const keyboardDiv = document.querySelector(".keyboard");
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  button.classList.add("letter");
  keyboardDiv.appendChild(button);
}


// Display Random Keyword And Hint
// Select Random
let { word: w, hint: h } = wordList[Math.floor(Math.random() * wordList.length)];

var randomKeyword = w;

console.log(randomKeyword);

// Put The Random Hint Inside The Hint
document.querySelector(".hint b").innerText = h;

// Match The Word Letters With Dashes
let dashesContainer = document.querySelector(".letters");

// Splite The Word Letters
let lettersNumber = randomKeyword.split("");

for (let i = 0; i < lettersNumber.length; i++) {
  const dashes = document.createElement("li");
  dashesContainer.appendChild(dashes);
}
// Handling The Click

let lossCounter = 0;
const maxCounter = 6;

document.addEventListener("click", (e) => {

  if (e.target.className === 'letter') {
    // e.target.disabled = true;

    // Disable The Clicked Button
    e.target.classList.add("disabled");

    let clickedLetter = e.target.innerText.toLowerCase();

    // Checking If The Clicked Letter Is Present In The Word
    if (randomKeyword.includes(clickedLetter)) {
      // Put The Letter Inside The Dashes
      [...randomKeyword].forEach((letter, index) => {
        if (letter === clickedLetter) {
          dashesContainer.querySelectorAll("li")[index].innerText = letter;
          dashesContainer.querySelectorAll("li")[index].classList.add("done");
        }
        // Play Win Sound
        document.getElementById("win").play();
      })
    } else {
      // If The Letter Isn't Present In The Word
      lossCounter++;
      // Play Loss Sound
      document.getElementById("loss").play();
    }
    // Update The Counter On Screen
    document.querySelector(".guesses b").innerText = `${lossCounter} / ${maxCounter}`;

    // Update Hangman
    document.querySelector(".image-part img").src = `images/hangman-${lossCounter}.svg`;

    // Check For GameOver OR Victory
    if (lossCounter === maxCounter) {
      document.querySelector(".game-status").classList.add("show");
      document.querySelector(".content b").innerText = `${randomKeyword}`;
      document.querySelector(".content img").src = "images/lost.gif";
      document.querySelector(".content h4").innerText = `Game Over`;
      document.querySelector(".content p").style = "display: block;"
      console.log(`Looose`);
    }
    else if (Array.from(dashesContainer.innerText).filter(el => el !== '\n').join("").toLowerCase() === randomKeyword) {
      document.querySelector(".game-status").classList.add("show");
      document.querySelector(".content h4").innerText = `Victory`;
      document.querySelector(".content img").src = "images/victory.gif";
      document.querySelector(".content p").style = "display: none;"
      console.log(`Win`);
    }
  }
})

// Play Again Button
const playAgainBtn = document.querySelector("content button");

document.addEventListener("click", (e) => {
  if (e.target.className === 'playAgain') {

    document.querySelector(".game-status").classList.remove("show");

    // Reset Buttons
    keyboardButtons = document.querySelector(".keyboard");
    keyboardButtons.querySelectorAll("button").forEach((button) => {
      button.classList.remove("disabled");
    })

    // Remove Dashes
    tempDashesHolder = document.querySelector(".letters");
    tempDashesHolder.querySelectorAll("li").forEach((li) => {
      li.remove();
    })

    // Generate Random 
    let { word: w, hint: h } = wordList[Math.floor(Math.random() * wordList.length)];

    randomKeyword = w;

    console.log(randomKeyword);

    // Put The Random Hint Inside The Hint
    document.querySelector(".hint b").innerText = h;

    // Match The Word Letters With Dashes
    dashesContainer = document.querySelector(".letters");

    // Splite The Word Letters
    lettersNumber = randomKeyword.split("");

    for (let i = 0; i < lettersNumber.length; i++) {
      const dashes = document.createElement("li");
      dashesContainer.appendChild(dashes);
    }

    // Reset The Loss Counter
    lossCounter = 0;

    // Update Counter
    document.querySelector(".guesses b").innerText = `${lossCounter} / ${maxCounter}`;

    // Update Hangman
    document.querySelector(".image-part img").src = `images/hangman-${lossCounter}.svg`;
  }
})

