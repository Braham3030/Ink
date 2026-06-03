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
  let started = false

  let isTyping = false
  let waitingForPlayer = false
  let interruptUsedThisLine = false
  let isPaused = false

  const speakerName = document.getElementById("speaker-name")
  const dialogueText = document.getElementById("dialogue-text")
  const interruptBtn = document.getElementById("interrupt-button")
  const startBtn = document.getElementById("start-button")

  const speakerImage = document.getElementById("speaker-image")

  if (!speakerName || !dialogueText || !interruptBtn || !startBtn || !speakerImage) return

  function setInterruptEnabled(enabled) {
    interruptBtn.disabled = !enabled
    interruptBtn.classList.toggle("disabled", !enabled)
  }

  function setSpeakerActive(active) {
    if (!speakerImage) return

    speakerImage.classList.toggle("grey-filter", !active)
  }

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function typeText(element, text, speed, settings) {
    element.textContent = ""

    for (let i = 0; i < text.length; i++) {

      while (isPaused) {
        await wait(50)
      }

      element.textContent += text[i]

      if (
        settings.pauseChance &&
        Math.random() < settings.pauseChance
      ) {
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

    if (line.speaker === "Evelin") {
      interruptUsedThisLine = false
      setInterruptEnabled(true)
      setSpeakerActive(true)
    } else {
      setInterruptEnabled(false)
      setSpeakerActive(false)
    }

    isTyping = true

    await typeText(
      dialogueText,
      line.text,
      settings.typingSpeed,
      settings
    )

    isTyping = false
    setSpeakerActive(false)
  }

  async function nextLine() {
    if (index >= conversation.length) {
      setInterruptEnabled(false)
      setSpeakerActive(false)
      console.log("Dialogue finished")
      return
    }

    const line = conversation[index]
    index++

    await renderLine(line)

    if (index >= conversation.length) {
      setInterruptEnabled(false)
      setSpeakerActive(false)
      console.log("Dialogue finished")
      return
    }

    if (line.speaker === "Evelin") {
      waitingForPlayer = true
      setInterruptEnabled(true)
      setSpeakerActive(true)
      return
    }

    waitingForPlayer = false
    setInterruptEnabled(false)
    setSpeakerActive(false)

    setTimeout(() => {
      nextLine()
    }, CONFIG.lineDelay)
  }

  function showInterruptPopup() {
    window.popup.show({
      title: "Heb geduld",
      text: "Je kan met iemand met spraakgebrek beter geduld hebben en hem/ haar zin laten maken.",
      buttonText: "Volgende",
    })

    document.addEventListener("click", function handler(e) {
      if (e.target.id === "popupButton") {
        window.popup.hide()

        isPaused = false

        document.removeEventListener("click", handler)
      }
    })
  }

  startBtn.onclick = () => {
    if (started) return

    started = true

    startBtn.classList.add("hidden")
    interruptBtn.classList.remove("hidden")

    nextLine()
  }

  interruptBtn.onclick = () => {
    if (isTyping) {
      if (interruptUsedThisLine) return

      interruptUsedThisLine = true

      setInterruptEnabled(false)

      isPaused = true

      showInterruptPopup()

      return
    }

    if (waitingForPlayer) {
      waitingForPlayer = false
      setInterruptEnabled(false)

      nextLine()
    }
  }

  setInterruptEnabled(false)
}

function run() {
  init()
}

run()

document.addEventListener("astro:page-load", run)