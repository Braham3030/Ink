// Source https://shopify.github.io/draggable/examples/unique-dropzone.html

import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"

gsap.registerPlugin(Draggable)

function initGame() {
  const draggables = document.querySelectorAll(".draggable")
  const dropzones = document.querySelectorAll(".dropzone")

  if (!draggables.length || !dropzones.length) return

  Draggable.create(draggables, {
    type: "x,y",
    bounds: document.querySelector(".game-wrapper"),
    edgeResistance: 0.65,

    onDragEnd: function () {
      const draggedEl = this.target
      const draggedText = draggedEl.dataset.text

      let matchedZone = null

      dropzones.forEach((zone) => {
        const r1 = draggedEl.getBoundingClientRect()
        const r2 = zone.getBoundingClientRect()

        const isOverlapping = !(
          r1.right < r2.left ||
          r1.left > r2.right ||
          r1.bottom < r2.top ||
          r1.top > r2.bottom
        )

        if (isOverlapping) {
          matchedZone = zone
        }
      })

      if (matchedZone) {
        const correct = matchedZone.dataset.answer === draggedText

        matchedZone.style.background = correct ? "#b6fcb6" : "#ffb3b3"
        matchedZone.innerText = draggedText

        if (correct) {
          gsap.to(draggedEl, {
            opacity: 0.4,
            pointerEvents: "none",
          })
        } else {
          gsap.to(draggedEl, {
            x: 0,
            y: 0,
            duration: 0.3,
          })
        }
      } else {
        // snap back if not dropped anywhere
        gsap.to(draggedEl, { x: 0, y: 0, duration: 0.3 })
      }
    },
  })
}

document.addEventListener("astro:page-load", initGame)