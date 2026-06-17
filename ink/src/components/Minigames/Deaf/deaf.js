// @ts-nocheck

// Bron voor GSAP Draggable: https://gsap.com/docs/v3/Plugins/Draggable/

// Help popup content
window.helpContext = {
  text: "Het is handig om de basiskennis van gebarentaal te hebben als u moet communiceren met iemand die doof is. Hierbij moet u gebruikmaken van uw handen, en minder uitgaan van wat u zegt.",
};

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

function initGame() {
  const draggables = document.querySelectorAll(".draggable");
  const dropzones = document.querySelectorAll(".dropzone");
  const textColumn = document.querySelector(".text-column");
  const doneButton = document.getElementById("check-button");

  if (!draggables.length || !dropzones.length) return;

  // Stores placed answers
  // key = dropzone answer
  // value = dragged text
  const placements = {};

  const draggablesArray = Draggable.create(draggables, {
    type: "x,y",
    bounds: document.querySelector(".game-wrapper"),
    edgeResistance: 0.65,

    onDragEnd: function () {
      const draggedEl = this.target;
      const draggedText = draggedEl.dataset.text;

      let matchedZone = null;

      dropzones.forEach((zone) => {
        const r1 = draggedEl.getBoundingClientRect();
        const r2 = zone.getBoundingClientRect();

        const isOverlapping = !(
          r1.right < r2.left ||
          r1.left > r2.right ||
          r1.bottom < r2.top ||
          r1.top > r2.bottom
        );

        if (isOverlapping) {
          matchedZone = zone;
        }
      });

      if (matchedZone) {
        // Clear previous zone this draggable was in
        dropzones.forEach((zone) => {
          if (zone.contains(draggedEl)) {
            zone.innerHTML = "";
          }
        });

        // If another draggable already exists in this zone,
        // move it back to the start
        const existing = matchedZone.querySelector(".draggable");

        // BLOCK replacing locked (correct) items
        if (existing && existing.classList.contains("correct")) {
          gsap.to(draggedEl, {
            x: 0,
            y: 0,
            duration: 0.2,
          });
          return;
        }

        // normal swap behavior (only for non-locked items)
        if (existing && existing !== draggedEl) {
          document.querySelector(".text-column").appendChild(existing);

          gsap.set(existing, {
            x: 0,
            y: 0,
          });
        }

        if (existing && existing !== draggedEl) {
          document.querySelector(".text-column").appendChild(existing);

          gsap.set(existing, {
            x: 0,
            y: 0,
          });
        }

        // Save placement
        placements[matchedZone.dataset.answer] = {
          text: draggedText,
          element: draggedEl,
        };

        // Move draggable INTO the dropzone
        matchedZone.innerHTML = "";
        matchedZone.appendChild(draggedEl);
        draggedEl.classList.add("filled");

        // Reset transforms after append
        gsap.set(draggedEl, {
          x: 0,
          y: 0,
        });
      } else {
        const dragRect = draggedEl.getBoundingClientRect();
        const textRect = textColumn.getBoundingClientRect();

        const overTextColumn = !(
          dragRect.right < textRect.left ||
          dragRect.left > textRect.right ||
          dragRect.bottom < textRect.top ||
          dragRect.top > textRect.bottom
        );

        // If dragged back to left column
        if (overTextColumn) {
          // Remove placement data
          Object.keys(placements).forEach((key) => {
            if (placements[key]?.element === draggedEl) {
              delete placements[key];
            }
          });

          // Remove from current dropzone
          dropzones.forEach((zone) => {
            if (zone.contains(draggedEl)) {
              zone.innerHTML = "";
            }
          });

          // Move back to left column
          textColumn.appendChild(draggedEl);
          draggedEl.classList.remove("filled", "correct", "incorrect");

          gsap.set(draggedEl, {
            x: 0,
            y: 0,
          });
        } else {
          // Snap back
          gsap.to(draggedEl, {
            x: 0,
            y: 0,
            duration: 0.3,
          });
        }
      }
    },
  });

  doneButton.addEventListener("click", () => {
    let correctCount = 0;

    draggables.forEach((el) => {
      el.classList.remove("correct", "incorrect");
    });

    dropzones.forEach((zone) => {
      const correctAnswer = zone.dataset.answer;
      const placed = placements[correctAnswer];

      if (!placed) return;

      const isCorrect = placed.text === correctAnswer;

      if (isCorrect) {
        correctCount++;
      }

      placed.element.classList.add(isCorrect ? "correct" : "incorrect");

      if (isCorrect) {
        const draggableInstance = draggablesArray.find(
          (d) => d.target === placed.element,
        );

        if (draggableInstance) {
          draggableInstance.disable();
        }
      }
    });

    if (correctCount === dropzones.length) {
      window.popup.show({
        title: "Goed gedaan!",
        text: "U hebt nu een basiskennis van gebaren, hiermee kunt u al een heel eind komen in het communiceren met iemand die doof is!",
        buttonText: "Volgende",
      });

      setTimeout(() => {
        const popupBtn = document.getElementById("popupButton");
        if (popupBtn) {
          popupBtn.onclick = () => {
            window.location.href = "/deaf-end-screen";
          };
        }
      }, 400);
    }
  });
}

document.addEventListener("astro:page-load", initGame);
