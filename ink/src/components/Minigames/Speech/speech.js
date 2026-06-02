// @ts-nocheck

const CONFIG = {
  speakers: {
    Evelin: {
      typingSpeed: 55,
      pauseChance: 0.11,
      pauseMin: 500,
      pauseMax: 900
    },
    default: {
      typingSpeed: 25,
      pauseChance: 0,
      pauseMin: 0,
      pauseMax: 0
    }
  },
  lineDelay: 1200
}

function init() {
  const conversation = window.speechData?.[0]?.dialogue
  if (!conversation) return

  let index = 0
  let interrupted = false
  let started = false

  const speakerName = document.getElementById("speaker-name")
  const dialogueText = document.getElementById("dialogue-text")
  const interruptBtn = document.getElementById("interrupt-button")
  const startBtn = document.getElementById("start-button")

  if (!speakerName || !dialogueText || !interruptBtn || !startBtn) return

  function setInterruptEnabled(enabled) {
    interruptBtn.disabled = !enabled
    interruptBtn.classList.toggle("disabled", !enabled)
  }

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function typeText(element, text, speed, settings) {
    element.textContent = ""
    let i = 0

    while (i < text.length) {
      if (interrupted) return

      element.textContent += text[i]
      i++

      if (settings.pauseChance && Math.random() < settings.pauseChance) {
        const pause =
          settings.pauseMin +
          Math.random() * (settings.pauseMax - settings.pauseMin)

        await wait(pause)
      }

      await wait(speed)
    }
  }

  async function renderLine(line) {
    const settings =
      CONFIG.speakers[line.speaker] || CONFIG.speakers.default

    speakerName.textContent = line.speaker
    setInterruptEnabled(line.speaker !== "U")

    await typeText(dialogueText, line.text, settings.typingSpeed, settings)
  }

  async function nextLine() {
    if (interrupted) return
    if (index >= conversation.length) {
      setInterruptEnabled(false)
      return
    }

    await renderLine(conversation[index++])

    if (!interrupted) {
      setTimeout(nextLine, CONFIG.lineDelay)
    }
  }

  // START
  startBtn.onclick = () => {
    if (started) return

    started = true
    startBtn.classList.add("hidden")
    interruptBtn.classList.remove("hidden")

    nextLine()
  }

  // INTERRUPT
  interruptBtn.onclick = () => {
    if (interruptBtn.disabled) return

    interrupted = true
    setInterruptEnabled(false)

    window.popup.show({
      title: "Heb geduld",
      text: "Laat iemand zijn zin rustig afmaken.",
      buttonText: "Volgende",
    })

    document.addEventListener("click", function handler(e) {
      if (e.target.id === "popupButton") {
        window.popup.hide()
        document.removeEventListener("click", handler)

        interrupted = false
        nextLine()
      }
    })
  }

  setInterruptEnabled(false)
}

// init helper
function run() {
  init()
}

run()

// Astro client-side navigation fix
document.addEventListener("astro:page-load", run)