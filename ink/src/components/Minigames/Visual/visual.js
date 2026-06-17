// @ts-nocheck
// Help popup content
window.helpContext = {
  text: "Zorg ervoor dat je zo weinig mogelijk aandacht brengt aan het uiterlijk. Mensen willen zich ondanks hun uiterlijk niet voelen alsof ze anders zijn dan de rest.",
};

// Claude voor gebruik optional chaining (?.) bij popup, voorkomt script error als hij niet inlaad.

import { levels } from "../../../data/visualData.js";

/* =========================
   STATE
========================= */

let currentLevelIndex = 0;
let currentLevel;

/* =========================
   LEVEL LOADING
========================= */

function loadLevel(index) {
  currentLevelIndex = index;
  currentLevel = levels[index];

  document.querySelector(".dialogue-text").textContent =
    `${currentLevel.dialogue}`;

  window.popup?.hide?.();
  renderButtons();
}

/* =========================
   BUTTONS
========================= */

function renderButtons() {
  const container = document.querySelector(".choices");
  container.innerHTML = "";

  currentLevel.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.textContent = option.text;
    btn.className = "choice-button";

    btn.addEventListener("click", () => {
      window.popup?.show?.({
        title: option.feedback.title,
        text: option.feedback.text,
        buttonText: option.feedback.buttonText,
      });

      setTimeout(() => {
        const popupBtn = document.getElementById("popupButton");
        if (popupBtn) {
          popupBtn.onclick = () => {
            window.popup?.hide?.();
            if (option.correct) nextLevel();
          };
        }
      }, 50);
    });

    container.appendChild(btn);
  });
}

/* =========================
   LEVEL FLOW
========================= */

function nextLevel() {
  if (currentLevelIndex + 1 < levels.length) {
    loadLevel(currentLevelIndex + 1);
  } else {
    setTimeout(() => {
      window.location.href = "/visual-end-screen";
    }, 400);
  }
}

/* =========================
   RENDER LEVEL
========================= */

document.addEventListener("astro:page-load", () => loadLevel(0));
if (document.readyState !== "loading") {
  loadLevel(0);
} else {
  document.addEventListener("DOMContentLoaded", () => loadLevel(0));
}
