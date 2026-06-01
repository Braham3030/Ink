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

window.addEventListener("DOMContentLoaded", () => {
    const conversation = window.speechData?.[0]?.dialogue
    if (!conversation) return

    let index = 0
    let interrupted = false
    let typingInterval = null

    const speakerName = document.getElementById("speaker-name")
    const dialogueText = document.getElementById("dialogue-text")
    const interruptBtn = document.getElementById("interruptBtn")

    function setInterruptEnabled(enabled) {
        interruptBtn.disabled = !enabled
        interruptBtn.classList.toggle("disabled", !enabled)
    }

    function typeText(element, text, speed = 20, speaker = "", settings = {}) {
        return new Promise(async (resolve) => {
            element.textContent = ""
            let i = 0

            while (i < text.length) {
                if (interrupted) return resolve()

                element.textContent += text[i]
                i++

                // 🧠 Evelin hesitation system (config-driven)
                if (settings.pauseChance && Math.random() < settings.pauseChance) {
                    const pause =
                        settings.pauseMin +
                        Math.random() * (settings.pauseMax - settings.pauseMin)

                    await wait(pause)
                }

                await wait(speed)
            }

            resolve()
        })
    }

    async function renderLine(line) {
        const isNpcSpeaking = line.speaker !== "U"

        setInterruptEnabled(isNpcSpeaking)

        speakerName.textContent = line.speaker

        const settings = CONFIG.speakers[line.speaker] || CONFIG.speakers.default

        await typeText(
            dialogueText,
            line.text,
            settings.typingSpeed,
            line.speaker,
            settings
        )
    }

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async function nextLine() {
        if (interrupted) return
        if (index >= conversation.length) {
            setInterruptEnabled(false)
            return
        }

        await renderLine(conversation[index])

        index++

        if (interrupted) return

        setTimeout(nextLine, CONFIG.lineDelay)
    }

    interruptBtn.addEventListener("click", () => {
        if (interruptBtn.disabled) return

        interrupted = true

        clearInterval(typingInterval)
        typingInterval = null

        setInterruptEnabled(false)

        window.popup.show({
            title: "Heb geduld",
            text: "Je kan met iemand met spraakgebrek beter geduld hebben en hem/ haar zin laten maken.",
            buttonText: "Volgende",
        })

        function handlePopupClick(e) {
            if (e.target.id === "popupButton") {
                window.popup.hide()

                document.removeEventListener("click", handlePopupClick)
                interrupted = false
                nextLine()
            }
        }

        document.addEventListener("click", handlePopupClick)
    })

    setInterruptEnabled(false)
    nextLine()
})