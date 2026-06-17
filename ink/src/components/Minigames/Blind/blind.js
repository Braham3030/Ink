// @ts-nocheck
import { levels } from "../../../data/blindData.js";

let canvas;
let ctx;

const tileSize = 50;
const gridSize = 9;
const canvasSize = tileSize * gridSize;

/* =========================
   IMAGE SYSTEM
========================= */

const imageCache = {};

function getImage(src) {
  if (!src) return null;

  if (!imageCache[src]) {
    const img = new Image();
    img.src = src;
    imageCache[src] = img;
  }

  return imageCache[src];
}

function isImageReady(img) {
  return img && img.complete && img.naturalWidth > 0;
}

function preloadImages(levels) {
  const allSources = new Set();

  levels.forEach((level) => {
    level.obstacles?.forEach((o) => o.img && allSources.add(o.img));
    if (level.goal?.img) allSources.add(level.goal.img);

    const sprites = level.playerSprites;
    if (sprites) {
      Object.values(sprites).forEach((s) => s && allSources.add(s));
    }
  });

  allSources.forEach((src) => {
    const img = new Image();

    img.onload = () => {
      if (currentLevel) render();
    };

    img.src = src;
    imageCache[src] = img;
  });
}

/* =========================
   STATE
========================= */

let currentLevelIndex = 0;
let currentLevel;

let player = { x: 0, y: 0 };
let playerDirection = "front";

let locked = false;
let showQuestionMark = false;

const POPUP_OWNER = "blind-game";

let lastAnswerCorrect = false;
let lastFeedback = "";

/* =========================
   POPUP HANDLER
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

let imagesPreloaded = false;

function init() {
  canvas = document.getElementById("game");
  if (!canvas) return;

  canvas.width = canvasSize;
  canvas.height = canvasSize;

  ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  if (!imagesPreloaded) {
    preloadImages(levels);
    imagesPreloaded = true;
  }

  loadLevel(currentLevelIndex);
}

document.addEventListener("astro:page-load", () => {
  init();
});

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
   LEVEL LOAD
========================= */

function loadLevel(index) {
  currentLevelIndex = index;
  currentLevel = levels[index];

  player = {
    x: currentLevel.startPosition.x,
    y: currentLevel.startPosition.y,
  };

  playerDirection = "front";

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
   GRID
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

/* =========================
   OBSTACLES
========================= */

function drawObstacles() {
  currentLevel.obstacles.forEach((o) => {
    const img = getImage(o.img);

    const x = o.x * tileSize;
    const y = o.y * tileSize;
    const w = o.w * tileSize;
    const h = o.h * tileSize;

    if (o.img && isImageReady(img)) {
      ctx.drawImage(img, x, y, w, h);
    } else {
      ctx.fillStyle = currentLevel.theme?.obstacleColor || "#444";
      ctx.fillRect(x, y, w, h);

      ctx.strokeStyle = "#000";
      ctx.strokeRect(x, y, w, h);

      ctx.fillStyle = "white";
      ctx.font = "12px sans-serif";
      ctx.fillText(o.name, x + 4, y + 16);
    }
  });
}

/* =========================
   MARKERS
========================= */

function drawMarkers() {
  if (!currentLevel.markers) return;

  currentLevel.markers.forEach((marker) => {
    ctx.fillStyle = "#d3d3d3";

    ctx.fillRect(
      marker.x * tileSize,
      marker.y * tileSize,
      marker.w * tileSize,
      marker.h * tileSize,
    );

    ctx.strokeStyle = "#000";
    ctx.strokeRect(
      marker.x * tileSize,
      marker.y * tileSize,
      marker.w * tileSize,
      marker.h * tileSize,
    );

    ctx.fillStyle = "#000";
    ctx.font = "12px sans-serif";

    ctx.fillText(
      marker.name,
      marker.x * tileSize + 4,
      marker.y * tileSize + 16,
    );
  });
}

/* =========================
   GOAL
========================= */

function drawGoal() {
  const goal = currentLevel.goal;
  const img = getImage(goal.img);

  const x = goal.x * tileSize;
  const y = goal.y * tileSize;
  const w = goal.w * tileSize;
  const h = goal.h * tileSize;

  if (goal.img && isImageReady(img)) {
    ctx.drawImage(img, x, y, w, h);
  } else {
    ctx.fillStyle = currentLevel.theme?.goalColor || "#2ecc71";

    ctx.fillRect(x, y, w, h);

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = "white";
    ctx.font = "12px sans-serif";
    ctx.fillText(goal.name, x + 4, y + 16);
  }
}

/* =========================
   PLAYER (DIRECTION SPRITES)
========================= */

function drawPlayer() {
  const px = player.x * tileSize;
  const py = player.y * tileSize;

  const sprite = currentLevel.playerSprites?.[playerDirection];
  const img = getImage(sprite);

  if (sprite && isImageReady(img)) {
    ctx.drawImage(img, px, py, tileSize, tileSize);
  } else {
    ctx.fillStyle = "blue";
    ctx.fillRect(px, py, tileSize, tileSize);

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 3;
    ctx.strokeRect(px, py, tileSize, tileSize);
  }

  if (showQuestionMark) {
    const qx = px + tileSize / 2;
    const qy = py + 20;

    ctx.font = "28px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Black stroke
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.strokeText("?", qx, qy);

    // White fill
    ctx.fillStyle = "white";
    ctx.fillText("?", qx, qy);
  }
}

/* =========================
   RENDER
========================= */

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
  if (i === 0) locked = true;

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

  const next = path[i];

  const dx = next.x - player.x;
  const dy = next.y - player.y;

  if (Math.abs(dx) > Math.abs(dy)) {
    playerDirection = dx > 0 ? "right" : "left";
  } else {
    playerDirection = dy > 0 ? "back" : "front";
  }

  player.x = next.x;
  player.y = next.y;

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
  setTimeout(() => {
    window.location.href = "/blind-end-screen";
  }, 400);
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
   HELP
========================= */

window.helpContext = {
  text: "Om een locatie goed te kunnen vinden, heeft een persoon duidelijke en specifieke aanwijzingen nodig.",
};
