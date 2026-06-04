// @ts-nocheck
import { levels } from "../../../data/blindData.js"

let canvas
let ctx

const tileSize = 50
const gridSize = 9
const canvasSize = tileSize * gridSize

/* =========================
   STATE
========================= */

let currentLevelIndex = 0
let currentLevel

let player = { x: 0, y: 0 }

let locked = false
let showQuestionMark = false

/* =========================
   INIT
========================= */

function init() {
    canvas = document.getElementById("game")
    if (!canvas) return

    canvas.width = canvasSize
    canvas.height = canvasSize

    ctx = canvas.getContext("2d")

    loadLevel(0)
}

document.addEventListener("astro:page-load", init)

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init)
} else {
    init()
}

/* =========================
   BUTTONS
========================= */

function renderButtons() {
    const container = document.getElementById("buttons")
    if (!container) return

    container.innerHTML = ""

    currentLevel.options.forEach((option, index) => {
        const btn = document.createElement("button")

        btn.textContent = option.text

        btn.addEventListener("click", () => {
            if (!locked) runPath(index + 1)
        })

        container.appendChild(btn)
    })
}

/* =========================
   LEVEL LOADING
========================= */

function loadLevel(index) {
    currentLevelIndex = index
    currentLevel = levels[index]

    player = {
        x: currentLevel.startPosition.x,
        y: currentLevel.startPosition.y,
    }

    const titleElement = document.getElementById("levelTitle")
    if (titleElement) {
        titleElement.textContent = currentLevel.title
    }

    showQuestionMark = false
    locked = false

    window.popup?.hide?.()

    render()
    renderButtons()
}

/* =========================
   DRAW
========================= */

function drawGrid() {
    ctx.clearRect(0, 0, canvasSize, canvasSize)

    ctx.strokeStyle = "#000"
    ctx.lineWidth = 1

    for (let x = 0; x <= gridSize; x++) {
        ctx.beginPath()
        ctx.moveTo(x * tileSize, 0)
        ctx.lineTo(x * tileSize, canvasSize)
        ctx.stroke()
    }

    for (let y = 0; y <= gridSize; y++) {
        ctx.beginPath()
        ctx.moveTo(0, y * tileSize)
        ctx.lineTo(canvasSize, y * tileSize)
        ctx.stroke()
    }
}

function drawObstacles() {
    currentLevel.obstacles.forEach((o) => {
        ctx.fillStyle = currentLevel.theme?.obstacleColor || "#444"

        ctx.fillRect(
            o.x * tileSize,
            o.y * tileSize,
            o.w * tileSize,
            o.h * tileSize
        )

        ctx.strokeStyle = "#000"
        ctx.strokeRect(
            o.x * tileSize,
            o.y * tileSize,
            o.w * tileSize,
            o.h * tileSize
        )

        ctx.fillStyle = "white"
        ctx.font = "12px sans-serif"
        ctx.fillText(o.name, o.x * tileSize + 4, o.y * tileSize + 16)
    })
}

function drawMarkers() {
    if (!currentLevel.markers) return

    currentLevel.markers.forEach((marker) => {
        ctx.fillStyle = "#d3d3d3"

        ctx.fillRect(
            marker.x * tileSize,
            marker.y * tileSize,
            marker.w * tileSize,
            marker.h * tileSize
        )

        ctx.strokeStyle = "#000"

        ctx.strokeRect(
            marker.x * tileSize,
            marker.y * tileSize,
            marker.w * tileSize,
            marker.h * tileSize
        )

        ctx.fillStyle = "#000"
        ctx.font = "12px sans-serif"

        ctx.fillText(
            marker.name,
            marker.x * tileSize + 4,
            marker.y * tileSize + 16
        )
    })
}

function drawGoal() {
    const goal = currentLevel.goal

    ctx.fillStyle = currentLevel.theme?.goalColor || "#2ecc71"

    ctx.fillRect(
        goal.x * tileSize,
        goal.y * tileSize,
        goal.w * tileSize,
        goal.h * tileSize
    )

    ctx.strokeStyle = "#000"
    ctx.lineWidth = 3

    ctx.strokeRect(
        goal.x * tileSize,
        goal.y * tileSize,
        goal.w * tileSize,
        goal.h * tileSize
    )
}

function drawPlayer() {
    const px = player.x * tileSize
    const py = player.y * tileSize

    ctx.fillStyle = "blue"

    ctx.fillRect(px, py, tileSize, tileSize)

    ctx.strokeStyle = "#000"
    ctx.lineWidth = 3
    ctx.strokeRect(px, py, tileSize, tileSize)

    if (showQuestionMark) {
        ctx.fillStyle = "red"
        ctx.font = "28px sans-serif"
        ctx.fillText("?", px + 15, py + 32)
    }
}

function render() {
    drawGrid()
    drawObstacles()
    drawMarkers()
    drawGoal()
    drawPlayer()
}

/* =========================
   MOVEMENT
========================= */

function moveTo(path, showQ, correct, feedback, i = 0) {
    if (i === 0) locked = true

    if (i >= path.length) {
        showQuestionMark = showQ
        render()

        setTimeout(() => {
            window.popup?.show?.({
                title: correct ? "Inderdaad!" : "Helaas",
                text: feedback,
                buttonText: correct ? "Volgende" : "Opnieuw",
            })

            // 🔥 ROBUUST FIX: DOM fallback (ALTIJD WERKEND)
            setTimeout(() => {
                const btn = document.getElementById("popupButton")

                if (btn) {
                    btn.onclick = () => {
                        window.popup?.hide?.()

                        if (correct) {
                            nextLevel()
                        } else {
                            resetGame()
                        }
                    }
                }
            }, 50)

            locked = false
        }, 600)

        return
    }

    player.x = path[i].x
    player.y = path[i].y

    render()

    setTimeout(() => {
        moveTo(path, showQ, correct, feedback, i + 1)
    }, 200)
}

/* =========================
   ROUTES
========================= */

function runPath(type) {
    if (locked) return

    showQuestionMark = false
    window.popup?.hide?.()

    const option = currentLevel.options[type - 1]

    moveTo(option.path, !option.correct, option.correct, option.feedback)
}

/* =========================
   LEVEL FLOW
========================= */

function nextLevel() {
    if (currentLevelIndex + 1 < levels.length) {
        loadLevel(currentLevelIndex + 1)
    } else {
        window.popup?.show?.({
            title: "Klaar!",
            text: "Je hebt alle levels voltooid.",
            buttonText: "Restart",
        })

        setTimeout(() => {
            const btn = document.getElementById("popupButton")

            if (btn) {
                btn.onclick = () => {
                    window.popup?.hide?.()
                    loadLevel(0)
                }
            }
        }, 50)
    }
}

/* =========================
   RESET
========================= */

function resetGame() {
    player.x = currentLevel.startPosition.x
    player.y = currentLevel.startPosition.y

    showQuestionMark = false
    locked = false

    window.popup?.hide?.()
    render()
}