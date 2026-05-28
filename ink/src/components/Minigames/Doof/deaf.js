// @ts-nocheck

const placeholders = new Map()

const draggables = document.querySelectorAll('.draggable')
const dropzones = document.querySelectorAll('.dropzone')

const doneButton = document.querySelector('.button-wide')
const textColumn = document.querySelector('.text-column')

let draggedEl = null
let offsetX = 0
let offsetY = 0

function getDropzoneAt(x, y) {
    for (const zone of dropzones) {
        const rect = zone.getBoundingClientRect()

        if (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
        ) {
            return zone
        }
    }
    return null
}

function resetDrag(el) {
    el.style.position = ''
    el.style.left = ''
    el.style.top = ''
    el.style.zIndex = ''
    el.style.transform = ''
    el.style.width = ''
    el.style.opacity = ''
}

function handleDrop(el, dropzone) {
    if (!dropzone) return false

    const text = el.dataset.text

    dropzone.dataset.dropped = text
    dropzone.textContent = text

    dropzone.classList.remove('wrong-final')
    dropzone.classList.add('filled')

    // fully remove original draggable
    el.remove()

    return true
}

// ----------------------------
// DRAG SETUP (shared)
// ----------------------------
function addDragHandlers(el) {
    el.style.touchAction = 'none'

    // ---------------- MOBILE ----------------
    el.addEventListener('pointerdown', (e) => {
        draggedEl = el

        const rect = el.getBoundingClientRect()

        offsetX = e.clientX - rect.left
        offsetY = e.clientY - rect.top

        // CREATE PLACEHOLDER ONLY ONCE
        if (!placeholders.has(el.dataset.text)) {
            const placeholder = document.createElement('div')

            placeholder.className = 'drag-placeholder'

            placeholder.style.width = `${rect.width}px`
            placeholder.style.height = `${rect.height}px`

            el.parentNode.insertBefore(placeholder, el)

            placeholders.set(el.dataset.text, placeholder)
        }

        el.setPointerCapture(e.pointerId)

        el.classList.add('dragging')

        el.style.position = 'fixed'
        el.style.left = `${rect.left}px`
        el.style.top = `${rect.top}px`
        el.style.width = `${rect.width}px`
        el.style.zIndex = '1000'
    })

    el.addEventListener('pointermove', (e) => {
        if (!draggedEl) return

        draggedEl.style.left = `${e.clientX - offsetX}px`
        draggedEl.style.top = `${e.clientY - offsetY}px`
    })

    el.addEventListener('pointerup', (e) => {
        if (!draggedEl) return

        const dropzone = getDropzoneAt(e.clientX, e.clientY)

        const handled = handleDrop(draggedEl, dropzone)

        if (!handled) {
            resetDrag(draggedEl)
        }

        draggedEl.classList.remove('dragging')
        draggedEl = null
    })

    el.addEventListener('pointercancel', () => {
        if (!draggedEl) return
        resetDrag(draggedEl)
        draggedEl.classList.remove('dragging')
        draggedEl = null
    })

    // ---------------- DESKTOP ----------------
    el.setAttribute('draggable', 'true')

    el.addEventListener('dragstart', (e) => {
        draggedEl = el
        e.dataTransfer.setData('text/plain', el.dataset.text)
    })
}

draggables.forEach(addDragHandlers)

dropzones.forEach((zone) => {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault()
    })

    zone.addEventListener('drop', (e) => {
        e.preventDefault()

        const text = e.dataTransfer.getData('text/plain')

        const el = [...document.querySelectorAll('.draggable')].find(
            (d) => d.dataset.text === text
        )

        if (!el) return

        handleDrop(el, zone)
    })
})

function checkAnswers() {
    dropzones.forEach((zone) => {
        const dropped = zone.dataset.dropped
        const correct = zone.dataset.answer

        if (!dropped) return

        if (dropped === correct) {
            zone.classList.add('correct-final')
        } else {
            zone.classList.add('wrong-final')

            // REMOVE PLACEHOLDER
            const placeholder = placeholders.get(dropped)

            if (placeholder) {
                placeholder.remove()
                placeholders.delete(dropped)
            }

            // RETURN WRONG ANSWER BACK TO LEFT
            const el = document.createElement('div')

            el.className = 'draggable'
            el.dataset.text = dropped
            el.textContent = dropped

            addDragHandlers(el)

            textColumn.appendChild(el)

            // CLEAR DROPZONE
            zone.textContent = ''
            delete zone.dataset.dropped

            zone.classList.remove('filled')
        }
    })
}
doneButton.addEventListener('click', checkAnswers)