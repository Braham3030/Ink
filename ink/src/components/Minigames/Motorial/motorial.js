// @ts-nocheck
import {
  obstacles,
  obstacleCategories,
  categoryHints,
} from "../../../data/motorialData.js";


const hotspots = document.querySelectorAll(".hotspot");
const foundList = document.getElementById("found-list");
const doneButton = document.getElementById("done-button");

const foundObstacles = new Set();

hotspots.forEach((hotspot) => {
  hotspot.addEventListener("click", () => {
    const id = hotspot.dataset.id;
    const label = hotspot.dataset.label;

    if (foundObstacles.has(id)) return;

    foundObstacles.add(id);
    hotspot.classList.add("found");

    const li = document.createElement("li");
    li.textContent = label;
    foundList.appendChild(li);
  });
});

doneButton.addEventListener("click", () => {
  if (foundObstacles.size === hotspots.length) {
    window.popup.show({
      title: "Goed gedaan!",
      text: "Je hebt alle obstakels gevonden.",
      buttonText: "Volgende",
    });
    return;
  }

  const missedIds = obstacles
    .filter((o) => !foundObstacles.has(o.id))
    .map((o) => o.id);

  const priorityOrder = Object.keys(categoryHints);

  let chosenCategory = null;

  for (const category of priorityOrder) {
    const found = missedIds.find(
      (id) => obstacleCategories[id] === category
    );

    if (found) {
      chosenCategory = category;
      break;
    }
  }

  window.popup.show({
    title: "Helaas!",
    text:
      "Je hebt nog niet alles gevonden. " +
      categoryHints[chosenCategory],
    buttonText: "Verder zoeken",
  });
});

document.addEventListener("click", (e) => {
  if (e.target.id === "popupButton") {
    (e.target).blur();
    window.popup.hide();
  }
});