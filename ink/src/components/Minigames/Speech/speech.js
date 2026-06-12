// @ts-nocheck

// Help popup content
window.helpContext = {
  text: "Mensen met een spraakgebrek vinden het vaak fijner als ze u ze uit laat praten en ze niet onderbreekt door hun zinnen voor hen af te maken.",
};

// Closing popup
document.addEventListener("click", (e) => {
  if (e.target?.id === "popupButton") {
    e.target.blur();
    window.popup.hide();
  }
});

const CONFIG = {
  // Per-speaker typing behavior configuration
  speakers: {
    Evelin: {
      typingSpeed: 55, // base delay between characters
      pauseChance: 0.11, // chance of random thinking pause
      pauseMin: 500, // minimum pause duration
      pauseMax: 900, // maximum pause duration
    },
    default: {
      typingSpeed: 35,
      pauseChance: 0,
      pauseMin: 0,
      pauseMax: 0,
    },
  },

  // Delay between automated lines (used for player → Evelin transitions)
  lineDelay: 1500,
};

function init() {
  // Load dialogue data injected from Astro
  const scenario = window.speechData?.[0]

  const conversation = scenario?.dialogue
  const checklist = scenario?.checklist || []

  if (!conversation) return

  // Current position in dialogue array
  let index = 0;

  // Prevent multiple starts
  let started = false;

  // True while text is actively being typed
  let isTyping = false;

  // True when waiting for user interaction after Evelin finishes
  let waitingForPlayer = false;

  // Prevent multiple interrupts within the same Evelin line
  let interruptUsedThisLine = false;

  // DOM elements
  const speakerName = document.getElementById("speaker-name")
  const dialogueText = document.getElementById("dialogue-text")
  const interruptBtn = document.getElementById("interrupt-button")
  const startBtn = document.getElementById("start-button")
  const speakerImage = document.getElementById("speaker-image")

  const checklistContainer =
    document.getElementById("checklist-items")

  const checklistWrapper =
    document.getElementById("checklist")

  if (!speakerName || !dialogueText || !interruptBtn || !startBtn || !speakerImage) return
  const checklistElements = {}

  // Enables or disables the talk/interrupt button
  function setInterruptEnabled(enabled) {
    interruptBtn.disabled = !enabled;
    interruptBtn.classList.toggle("disabled", !enabled);
  }

  // Toggles visual state of speaker image
  // Active = speaking (no grey filter)
  // Inactive = not speaking (grey filter applied)
  function setSpeakerActive(active) {
    if (!speakerImage) return;
    speakerImage.classList.toggle("grey-filter", !active);
  }

  // Utility delay function
  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Types text character-by-character with optional pauses
  async function typeText(element, text, speed, settings) {
    element.textContent = "";

    for (let i = 0; i < text.length; i++) {
      // Freeze typing while popup is active
      while (window.isPopupOpen) {
        await wait(50);
      }

      element.textContent += text[i];

      // Random "thinking pauses" for realism
      if (settings.pauseChance && Math.random() < settings.pauseChance) {
        const pause =
          settings.pauseMin +
          Math.random() * (settings.pauseMax - settings.pauseMin);

        await wait(pause);
      }

      await wait(speed);
    }
  }

  // Renders a single dialogue line (speaker + text)
  async function renderLine(line) {
    const settings = CONFIG.speakers[line.speaker] || CONFIG.speakers.default;

    speakerName.textContent = line.speaker;

    // Evelin is the only interactive speaker
    if (line.speaker === "Evelin") {
      interruptUsedThisLine = false;
      setInterruptEnabled(true);
      setSpeakerActive(true);
      interruptBtn.textContent = "Help zin afmaken";
    } else {
      setInterruptEnabled(false);
      setSpeakerActive(false);
    }

    isTyping = true;

    await typeText(dialogueText, line.text, settings.typingSpeed, settings);

    isTyping = false;
    setSpeakerActive(false);
  }

  // Advances the conversation to the next line
  async function nextLine() {
    // End of conversation guard
    if (index >= conversation.length) {
      setInterruptEnabled(false);
      setSpeakerActive(false);
      console.log("Dialogue finished");
      return;
    }

    const line = conversation[index];
    index++;

    await renderLine(line);

    if (line.checklistItem) {
      completeChecklistItem(line.checklistItem)
    }

    // Final line check
    if (index >= conversation.length) {
      setInterruptEnabled(false);
      setSpeakerActive(false);

      setTimeout(() => {
        window.location.href = "/speech-end-screen";
      }, 400);
      console.log("Dialogue finished");
      return;
    }

    // If Evelin just finished speaking,
    // wait for player input instead of auto-advancing
    if (line.speaker === "Evelin") {
      waitingForPlayer = true;
      setInterruptEnabled(true);
      setSpeakerActive(true);
      interruptBtn.textContent = "Reageer";

      return;
    }

    // If player line finished, continue automatically
    waitingForPlayer = false;
    setInterruptEnabled(false);
    setSpeakerActive(false);

    setTimeout(() => {
      nextLine();
    }, CONFIG.lineDelay);
  }

  // Shows popup when player interrupts Evelin mid-sentence
  function showInterruptPopup() {
    window.popup.show({
      title: "Heb geduld",
      text: "Neem de tijd voor iemand met een spraakgebrek en laat diegene rustig zijn zin afmaken.",
      buttonText: "Volgende",
    });

    document.addEventListener("click", function handler(e) {
      if (e.target.id === "popupButton") {
        window.popup.hide();

        document.removeEventListener("click", handler);
      }
    });
  }

  // Start button begins dialogue playback
  startBtn.onclick = () => {
    if (started) return;

    started = true;

    createChecklist()
    checklistWrapper?.classList.remove("hidden")

    const dialogueContainer = document.getElementById("dialogue")
    dialogueContainer.classList.remove("hidden")
    startBtn.classList.add("hidden")
    interruptBtn.classList.remove("hidden")

    nextLine();
  };

  // Main interaction button:
  // - During Evelin speech: acts as interrupt
  // - During waiting state: acts as "continue"
  interruptBtn.onclick = () => {
    // Interrupt during Evelin typing
    if (isTyping) {
      if (interruptUsedThisLine) return;

      interruptUsedThisLine = true;

      setInterruptEnabled(false);

      showInterruptPopup();

      return;
    }

    // Continue after Evelin finished speaking
    if (waitingForPlayer) {
      waitingForPlayer = false;
      setInterruptEnabled(false);

      nextLine();
    }
  };

  function createChecklist() {
    if (!checklistContainer) return

    checklistContainer.innerHTML = ""

    checklist.forEach(item => {
      const li = document.createElement("li")

      // item is already the text string
      li.textContent = item
      li.classList.add("checklist-item")

      checklistContainer.appendChild(li)

      // Use the checklist text itself as the key
      checklistElements[item] = li
    })
  }

  function completeChecklistItem(itemName) {
    const item = checklistElements[itemName]

    if (!item) return

    item.classList.add("completed")
  }

  // Initial state: button disabled
  setInterruptEnabled(false);
}


// Re-initialize on Astro page navigation
document.addEventListener("astro:page-load", init)
