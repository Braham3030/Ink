// @ts-nocheck
import { levels } from "../../../data/blindData.js";

let canvas;
let ctx;

const tileSize = 50;
const gridSize = 9;
const canvasSize = tileSize * gridSize;

/* =========================
   STATE
========================= */

let currentLevelIndex = 0;
let currentLevel;

let player = { x: 0, y: 0 };

let locked = false;
let showQuestionMark = false;

const POPUP_OWNER = "blind-game";

let lastAnswerCorrect = false;
let lastFeedback = "";

/* =========================
   GLOBAL POPUP CLOSE + LOGIC HANDLER
========================= */

document.addEventListener("click", (e) => {
  const btn = e.target?.closest?.("#popupButton");
  if (!btn) return;

  const overlay = document.getElementById("popupOverlay");

  btn.blur();
  window.popup?.hide?.();

  if (overlay) {
    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden", "true");
  }

  if (!overlay || overlay.dataset.owner !== POPUP_OWNER) return;

  if (lastAnswerCorrect) {
    nextLevel();
  } else {
    resetGame();
  }
});

/* =========================
   INIT
========================= */

function init() {
  canvas = document.getElementById("game");
  if (!canvas) return;

  canvas.width = canvasSize;
  canvas.height = canvasSize;

  ctx = canvas.getContext("2d");

  loadLevel(0);
}

document.addEventListener("astro:page-load", init);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

/* =========================
   SHUFFLE
========================= */

function shuffleOptions(options) {
  return options
    .map((option, index) => ({ option, index }))
    .sort(() => Math.random() - 0.5);
}

/* =========================
   BUTTONS
========================= */

function renderButtons() {
  const container = document.getElementById("buttons");
  if (!container) return;

  container.innerHTML = "";

  const shuffled = shuffleOptions(currentLevel.options);

  shuffled.forEach(({ option, index }) => {
    const btn = document.createElement("button");

    btn.textContent = option.text;
    btn.className = "choice-button";

    btn.addEventListener("click", () => {
      if (!locked) runPath(index + 1);
    });

    container.appendChild(btn);
  });
}

/* =========================
   LEVEL LOADING
========================= */

function loadLevel(index) {
  currentLevelIndex = index;
  currentLevel = levels[index];

  player = {
    x: currentLevel.startPosition.x,
    y: currentLevel.startPosition.y,
  };

  const titleElement = document.getElementById("levelTitle");
  if (titleElement) {
    titleElement.textContent = currentLevel.title;
  }

  showQuestionMark = false;
  locked = false;

  const overlay = document.getElementById("popupOverlay");
  if (overlay) overlay.dataset.owner = "";

  window.popup?.hide?.();

  render();
  renderButtons();
}

/* =========================
   DRAW
========================= */

function drawGrid() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;

  for (let x = 0; x <= gridSize; x++) {
    ctx.beginPath();
    ctx.moveTo(x * tileSize, 0);
    ctx.lineTo(x * tileSize, canvasSize);
    ctx.stroke();
  }

  for (let y = 0; y <= gridSize; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * tileSize);
    ctx.lineTo(canvasSize, y * tileSize);
    ctx.stroke();
  }
}

function drawObstacles() {
  currentLevel.obstacles.forEach((o) => {
    ctx.fillStyle = currentLevel.theme?.obstacleColor || "#444";

    ctx.fillRect(
      o.x * tileSize,
      o.y * tileSize,
      o.w * tileSize,
      o.h * tileSize
    );

    ctx.strokeStyle = "#000";
    ctx.strokeRect(
      o.x * tileSize,
      o.y * tileSize,
      o.w * tileSize,
      o.h * tileSize
    );

    ctx.fillStyle = "white";
    ctx.font = "12px sans-serif";
    ctx.fillText(o.name, o.x * tileSize + 4, o.y * tileSize + 16);
  });
}

function drawMarkers() {
  if (!currentLevel.markers) return;

  currentLevel.markers.forEach((marker) => {
    ctx.fillStyle = "#d3d3d3";

    ctx.fillRect(
      marker.x * tileSize,
      marker.y * tileSize,
      marker.w * tileSize,
      marker.h * tileSize
    );

    ctx.strokeStyle = "#000";
    ctx.strokeRect(
      marker.x * tileSize,
      marker.y * tileSize,
      marker.w * tileSize,
      marker.h * tileSize
    );

    ctx.fillStyle = "#000";
    ctx.font = "12px sans-serif";

    ctx.fillText(
      marker.name,
      marker.x * tileSize + 4,
      marker.y * tileSize + 16
    );
  });
}

/* =========================
   GOAL
========================= */

function drawGoal() {
  const goal = currentLevel.goal;

  ctx.fillStyle = currentLevel.theme?.goalColor || "#2ecc71";

  ctx.fillRect(
    goal.x * tileSize,
    goal.y * tileSize,
    goal.w * tileSize,
    goal.h * tileSize
  );

  ctx.strokeStyle = "#000";
  ctx.lineWidth = 3;

  ctx.strokeRect(
    goal.x * tileSize,
    goal.y * tileSize,
    goal.w * tileSize,
    goal.h * tileSize
  );

  ctx.fillStyle = "white";
  ctx.font = "12px sans-serif";

  ctx.fillText(
    goal.name,
    goal.x * tileSize + 4,
    goal.y * tileSize + 16
  );
}

function drawPlayer() {
  const px = player.x * tileSize;
  const py = player.y * tileSize;

  ctx.fillStyle = "blue";

  ctx.fillRect(px, py, tileSize, tileSize);

  ctx.strokeStyle = "#000";
  ctx.lineWidth = 3;
  ctx.strokeRect(px, py, tileSize, tileSize);

  if (showQuestionMark) {
    ctx.fillStyle = "red";
    ctx.font = "28px sans-serif";
    ctx.fillText("?", px + 15, py + 32);
  }
}

function render() {
  drawGrid();
  drawObstacles();
  drawMarkers();
  drawGoal();
  drawPlayer();
}

/* =========================
   MOVEMENT
========================= */

function moveTo(path, showQ, correct, feedback, i = 0) {
  if (i === 0) {
    locked = true;
  }

  if (i >= path.length) {
    showQuestionMark = showQ;
    render();

    setTimeout(() => {
      lastAnswerCorrect = correct;
      lastFeedback = feedback;

      window.popup?.show?.({
        title: correct ? "Inderdaad!" : "Helaas",
        text: feedback,
        buttonText: correct ? "Volgende" : "Opnieuw",
      });

      const overlay = document.getElementById("popupOverlay");
      if (overlay) overlay.dataset.owner = POPUP_OWNER;

      locked = false;
    }, 600);

    return;
  }

  player.x = path[i].x;
  player.y = path[i].y;

  render();

  setTimeout(() => {
    moveTo(path, showQ, correct, feedback, i + 1);
  }, 200);
}

/* =========================
   ROUTES
========================= */

function runPath(type) {
  if (locked) return;

  showQuestionMark = false;

  const overlay = document.getElementById("popupOverlay");
  if (overlay) overlay.dataset.owner = "";

  window.popup?.hide?.();

  const option = currentLevel.options[type - 1];

  moveTo(option.path, !option.correct, option.correct, option.feedback);
}

/* =========================
   LEVEL FLOW
========================= */

function nextLevel() {
  if (currentLevelIndex + 1 < levels.length) {
    loadLevel(currentLevelIndex + 1);
    return;
  }

  window.popup?.hide?.();
  window.location.href = "/blind-end-screen";
}

/* =========================
   RESET
========================= */

function resetGame() {
  player.x = currentLevel.startPosition.x;
  player.y = currentLevel.startPosition.y;

  showQuestionMark = false;
  locked = false;

  const overlay = document.getElementById("popupOverlay");
  if (overlay) overlay.dataset.owner = "";

  window.popup?.hide?.();
  render();
}

/* =========================
   HINT
========================= */

window.helpContext = {
  text: "Alleen wanneer je een persoon specifieke aanwijzingen geeft, kan hij/zij goed een locatie vinden",
};