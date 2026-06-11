export const levels = [
    // Level 1
    {
        title: "Begeleid Tim naar het toilet",
        startPosition: { x: 4, y: 8 },
        goal: { x: 7, y: 0, w: 2, h: 2, name: "Toilet"},
        obstacles: [
            { x: 1, y: 0, w: 2, h: 1, name: "Bank" },
            { x: 0, y: 1, w: 1, h: 2, name: "Bank" },
            { x: 2, y: 2, w: 1, h: 1, name: "Tafel" },

            { x: 2, y: 5, w: 1, h: 1, name: "Stoel" },
            { x: 2, y: 6, w: 1, h: 1, name: "Stoel" },
            { x: 1, y: 7, w: 1, h: 1, name: "Stoel" },

            { x: 0, y: 5, w: 1, h: 2, name: "TV" },

            { x: 5, y: 5, w: 1, h: 1, name: "Kruk" },
            { x: 5, y: 6, w: 1, h: 1, name: "Kruk" },
            { x: 5, y: 7, w: 1, h: 1, name: "Kruk" },

            { x: 6, y: 0, w: 1, h: 2, name: "Muur" },
            { x: 6, y: 4, w: 3, h: 1, name: "Muur" },
            { x: 6, y: 5, w: 1, h: 3, name: "Bar" },
        ],
        markers: [],
        options: [
            {
                text: "Loop rechtdoor tot voorbij de bar en ga daarna naar rechts.",
                correct: false,
                feedback:
                    "Nadat Tim voorbij de bar naar rechts is gegaan, wist hij verder niet waar hij naar toe moest...",
                path: [
                    { x: 4, y: 7 },
                    { x: 4, y: 6 },
                    { x: 4, y: 5 },
                    { x: 4, y: 4 },
                    { x: 4, y: 3 },
                    { x: 5, y: 3 },
                    { x: 6, y: 3 },
                    { x: 7, y: 3 },
                    { x: 8, y: 3 },
                ],
            },

            {
                text: "Voorbij de bar naar rechts en dan aan uw linkerhand.",
                correct: true,
                feedback: "U heeft duidelijke en nauwkeurige instructies gegeven. Tim heeft het toilet gevonden.",
                path: [
                    { x: 4, y: 7 },
                    { x: 4, y: 6 },
                    { x: 4, y: 5 },
                    { x: 4, y: 4 },
                    { x: 4, y: 3 },
                    { x: 5, y: 3 },
                    { x: 6, y: 3 },
                    { x: 7, y: 3 },
                    { x: 7, y: 2 },
                    { x: 7, y: 1 },
                    { x: 7, y: 0 },
                ],
            },

            {
                text: "De toiletten bevinden zich rechtsachter in de kamer.",
                correct: false,
                feedback:
                    "Tim is voorbij het toilet helemaal naar het einde van de kamer gelopen.",
                path: [
                    { x: 4, y: 7 },
                    { x: 4, y: 6 },
                    { x: 4, y: 5 },
                    { x: 4, y: 4 },
                    { x: 4, y: 3 },
                    { x: 4, y: 2 },
                    { x: 4, y: 1 },
                    { x: 4, y: 0 },
                    { x: 5, y: 0 },
                ],
            },

            {
                text: "De toiletten zijn daar.",
                correct: false,
                feedback: "Tim weet niet welke kant hij op moet lopen.",
                path: [{ x: 4, y: 8 }],
            },
        ],
    },

    // Level 2
    {
        title: "Begeleid Tim naar de bushalte",
        startPosition: { x: 4, y: 8 },
        goal: { x: 2, y: 0, w: 2, h: 1, name: "Bushalte" },
        obstacles: [
            { x: 0, y: 0, w: 1, h: 1, name: "Boom" },
            { x: 5, y: 0, w: 1, h: 1, name: "Boom" },
            { x: 7, y: 0, w: 1, h: 1, name: "Boom" },

            { x: 5, y: 3, w: 1, h: 1, name: "Stoplicht" },
            { x: 8, y: 8, w: 1, h: 1, name: "Stoplicht" },

            { x: 0, y: 7, w: 2, h: 1, name: "Auto" },
            { x: 3, y: 7, w: 2, h: 1, name: "Auto" },
        ],
        markers: [
            { x: 0, y: 1, w: 9, h: 2, name: "Stoep met ribbels" },
            { x: 0, y: 8, w: 9, h: 1, name: "Stoep met ribbels" },
            { x: 6, y: 3, w: 2, h: 5, name: "Zebrapad" },
        ],
        options: [
            {
                text: "De bushalte bevindt zich aan de overkant van de straat, aan de andere kant van de weg.",
                correct: false,
                feedback: "Tim wist wel dat hij moest oversteken, maar niet waar hij daarna heen moest lopen. Daarnaast had hij in een gevaarlijke situatie kunnen belanden.",
                path: [
                    { x: 4, y: 8 },
                    { x: 5, y: 8 },
                    { x: 5, y: 7 },
                    { x: 5, y: 6 },
                    { x: 5, y: 5 },
                    { x: 5, y: 4 },
                    { x: 6, y: 4 },
                    { x: 6, y: 3 },
                    { x: 6, y: 2 },
                    { x: 6, y: 1 },
                    { x: 6, y: 0 },

                ],
            },
            {
                text: "Volg rechts het zebrapad, aan de overkant links af en dan aan uw rechterhand.",
                correct: true,
                feedback: "U heeft duidelijke oriëntatiepunten gebruikt en stap voor stap uitgelegd waar Tim heen moest. Hij heeft de bushalte weten te vinden.",
                path: [
                    { x: 4, y: 8 },
                    { x: 5, y: 8 },
                    { x: 6, y: 8 },
                    { x: 6, y: 7 },
                    { x: 6, y: 6 },
                    { x: 6, y: 5 },
                    { x: 6, y: 4 },
                    { x: 6, y: 3 },
                    { x: 6, y: 2 },
                    { x: 6, y: 1 },
                    { x: 5, y: 1 },
                    { x: 4, y: 1 },
                    { x: 3, y: 1 },
                    { x: 3, y: 0 },
                ],
            },
            {
                text: "Gebruik het zebrapad om veilig aan de overkant van de weg te komen.",
                correct: false,
                feedback: "Tim kwam veilig aan de overkant, maar wist daarna niet hoe hij de bushalte kon vinden.",
                path: [
                    { x: 4, y: 8 },
                    { x: 5, y: 8 },
                    { x: 6, y: 8 },
                    { x: 6, y: 7 },
                    { x: 6, y: 6 },
                    { x: 6, y: 5 },
                    { x: 6, y: 4 },
                    { x: 6, y: 3 },
                    { x: 6, y: 2 },
                    { x: 6, y: 1 },
                    { x: 6, y: 0 },
                ],
            },
            {
                text: "De bushalte staat daar.",
                correct: false,
                feedback: "Tim kan niet zien waar u naartoe wijst en weet daarom niet welke kant hij op moet.",
                path: [{ x: 4, y: 8 }],
            },
        ],
    },

    // Level 3
    {
        title: "Verwijs Tim naar de ingang van het gebouw",
        startPosition: { x: 1, y: 8 },
        goal: { x: 3, y: 0, w: 3, h: 2, name: "Ingang" },
        obstacles: [
            { x: 0, y: 0, w: 3, h: 2, name: "Muur" },
            { x: 6, y: 0, w: 3, h: 2, name: "Muur" },
            
            { x: 1, y: 3, w: 1, h: 2, name: "Bank" },
            { x: 3, y: 6, w: 1, h: 2, name: "Bank" },
            { x: 7, y: 4, w: 1, h: 2, name: "Bank" },
            { x: 8, y: 7, w: 1, h: 2, name: "Bank" },
        ],
        markers: [
            { x: 0, y: 8, w: 8, h: 2, name: "Stoep met ribbels" },
            { x: 3, y: 2, w: 3, h: 3, name: "Pad" },
            { x: 4, y: 5, w: 3, h: 3, name: "Pad" },
            { x: 7, y: 7, w: 1, h: 1, name: "Pad" },

        ],
        options: [
            {
                text: "Loop rechtdoor totdat je bij een bank komt. Ga langs die bank en dan kom je vanzelf bij de ingang uit.",
                correct: false,
                feedback: "Tim kwam wel een bank tegen, en wist dat hij daar langs moest, maar wanneer hij bij de muur was aangekomen kon hij de ingang niet vinden.",
                path: [
                    { x: 1, y: 8 },
                    { x: 1, y: 7 },
                    { x: 1, y: 6 },
                    { x: 1, y: 5 },
                    { x: 0, y: 5 },
                    { x: 0, y: 4 },
                    { x: 0, y: 3 },
                    { x: 0, y: 2 },
                ],
            },
            {
                text: "Loop naar rechts op de stoep, over 2 meter staat een bank aan je linkerhand, vanaf daar direct naar links.",
                correct: true,
                feedback: "U gebruikte duidelijke afstanden en herkenningspunten. Daardoor kon Tim de juiste route naar de ingang volgen.",
                path: [
                    { x: 1, y: 8 },
                    { x: 2, y: 8 },
                    { x: 3, y: 8 },
                    { x: 4, y: 8 },
                    { x: 4, y: 7 },
                    { x: 4, y: 6 },
                    { x: 4, y: 5 },
                    { x: 4, y: 4 },
                    { x: 4, y: 3 },
                    { x: 4, y: 2 },
                    { x: 4, y: 1 },
                    { x: 4, y: 0 },
                ],
            },
            {
                text: "Loop naar rechts totdat je een bank tegenkomt en sla vanaf daar linksaf.",
                correct: false,
                feedback: "Tim had de eerste bank gemist aangezien hij recht liep. Hierdoor was hij te laat naar links gegaan en kwam hij bij de muur uit.",
                path: [
                    { x: 1, y: 8 },
                    { x: 2, y: 8 },
                    { x: 3, y: 8 },
                    { x: 4, y: 8 },
                    { x: 5, y: 8 },
                    { x: 6, y: 8 },
                    { x: 7, y: 8 },
                    { x: 7, y: 7 },
                    { x: 7, y: 6 },
                    { x: 8, y: 6 },
                    { x: 8, y: 5 },
                    { x: 8, y: 4 },
                    { x: 8, y: 3 },
                    { x: 8, y: 2 },
                ],
            },
            {
                text: "Volg het pad naar de ingang",
                correct: false,
                feedback: "Tim weet niet waar het pad is en kan daarom niet de juiste route volgen.",
                path: [
                    { x: 1, y: 8 }
                ],
            },
        ],
    },
]