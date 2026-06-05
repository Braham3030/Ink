// @ts-nocheck
import { levels } from "../../../data/motorialData.js";

let currentLevelIndex = 0;
let currentLevel = levels[currentLevelIndex];

let foundObstacles = new Set();
let pendingAdvance = false;

function initMotorial() {
  loadLevel(0);

  const doneButton = document.getElementById("done-button");
  doneButton?.addEventListener("click", handleDone);
}

function loadLevel(index) {
  currentLevelIndex = index;
  currentLevel = levels[currentLevelIndex];

  foundObstacles = new Set();
  pendingAdvance = false;

  renderLevel();
  renderHotspots();
}

function renderLevel() {
  const img = document.getElementById("level-image");
  const list = document.getElementById("found-list");

  if (img) img.src = currentLevel.image;
  if (list) list.innerHTML = "";
}

function renderHotspots() {
  const wrapper = document.querySelector(".image-wrapper");
  if (!wrapper) return;

  wrapper.querySelectorAll(".hotspot").forEach((el) => el.remove());

  currentLevel.obstacles.forEach((o) => {
    const btn = document.createElement("button");
    btn.className = "hotspot";
    btn.dataset.id = o.id;
    btn.dataset.label = o.label;

    btn.style.top = o.top;
    btn.style.left = o.left;
    btn.style.width = o.width;
    btn.style.height = o.height;
    btn.style.transform = `rotate(${o.rotate || 0}deg)`;

    btn.addEventListener("click", () => handleHotspotClick(o, btn));

    wrapper.appendChild(btn);
  });
}

function handleHotspotClick(obstacle, btn) {
  if (foundObstacles.has(obstacle.id)) return;

  foundObstacles.add(obstacle.id);
  btn.classList.add("found");

  const list = document.getElementById("found-list");

  const li = document.createElement("li");
  li.textContent = obstacle.label;
  list.appendChild(li);
}

function handleDone() {
  const total = currentLevel.obstacles.length;

  // ✅ SUCCESS
  if (foundObstacles.size === total) {
    pendingAdvance = true;

    window.popup?.show({
      title: "Goed gedaan!",
      text: "Je hebt alle obstakels gevonden.",
      buttonText: "Volgende level",
    });

    return;
  }

  // ❌ FAIL
  const missed = currentLevel.obstacles.filter(
    (o) => !foundObstacles.has(o.id)
  );

  const priority = Object.keys(currentLevel.categoryHints);

  let category = null;

  for (const p of priority) {
    if (missed.find((m) => currentLevel.obstacleCategories[m.id] === p)) {
      category = p;
      break;
    }
  }

  pendingAdvance = false;

  window.popup?.show({
    title: "Helaas!",
    text:
      "Je hebt nog niet alles gevonden. " +
      (currentLevel.categoryHints[category] ??
        "Let goed op de omgeving."),
    buttonText: "Verder zoeken",
  });
}

// Popup + level flow
document.addEventListener("click", (e) => {
  if (e.target?.id !== "popupButton") return;

  window.popup?.hide();

  // ❌ niet doorgaan als level niet gehaald is
  if (!pendingAdvance) return;

  pendingAdvance = false;

  const next = currentLevelIndex + 1;

  if (next < levels.length) {
    loadLevel(next);
  } else {
    console.log("Game finished!");
  }
});

// Astro navigation support
document.addEventListener("astro:page-load", initMotorial);