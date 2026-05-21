const scenarios = [
    {
        question: "Waar is de wc?",
        answers: [
            {
                text: "De wc's zijn die kant op.",
                feedback: "Te vaag. Een blinde persoon heeft geen visuele aanwijzing.",
                score: 2
            },
            {
                text: "Voor de wc's gaat u rechtdoor tot het einde van de bar en rechtsaf. De deuren bevinden zich aan uw linkerhand.",
                feedback: "Goed. Je geeft duidelijke en concrete richting.",
                score: 3
            },
            {
                text: "Geen idee, vraag maar aan iemand anders.",
                feedback: "Niet helpend. Je laat de persoon zonder bruikbare informatie achter.",
                score: 1
            }
        ]
    }
];

let i = 0;
let score = 0;

const message = document.getElementById("message");
const choices = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progressText");

function render() {
    const s = scenarios[i];

    message.textContent = s.question;
    feedback.textContent = "";
    nextBtn.classList.add("hidden");
    choices.innerHTML = "";
    progress.textContent = `${i + 1} / ${scenarios.length}`;

    s.answers.forEach(a => {
        const b = document.createElement("button");
        b.textContent = a.text;

        b.onclick = () => {
            feedback.textContent = a.feedback;
            score += a.score;

            choices.querySelectorAll("button").forEach(btn => btn.disabled = true);
            nextBtn.classList.remove("hidden");
        };

        choices.appendChild(b);
    });
}

nextBtn.onclick = () => {
    i++;
    if (i < scenarios.length) render();
    else end();
};

function end() {
    message.textContent = "Training voltooid";
    choices.innerHTML = "";
    feedback.textContent = `Eindscore: ${score}`;
    nextBtn.classList.add("hidden");
}

render();