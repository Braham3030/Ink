export const levels = [
    // Level 1
    {
        title: "Begeleid Tim naar het toilet",
        startPosition: { x: 4, y: 8 },
        playerSprites: {
            front: "/images/minigames/blind/player-front.png",
            back: "/images/minigames/blind/player-back.png",
            left: "/images/minigames/blind/player-left.png",
            right: "/images/minigames/blind/player-right.png",
        },
        goal: { x: 7, y: 0, w: 2, h: 2, name: "Toilet", img:'/images/minigames/blind/toilets.png' },
        obstacles: [
            { x: 0, y: 0, w: 9, h: 9, name: "Floor", img:'/images/minigames/blind/floor-bar.png' },

            { x: 1, y: 0, w: 2, h: 1, name: "Bank", img:'/images/minigames/blind/couch-front.png' },
            { x: 0, y: 1, w: 1, h: 2, name: "Bank", img:'/images/minigames/blind/couch-side.png' },
            { x: 2, y: 2, w: 1, h: 1, name: "Tafel", img:'/images/minigames/blind/table.png'},

            { x: 2, y: 5, w: 1, h: 1, name: "Stoel", img:'/images/minigames/blind/chair.png' },
            { x: 2, y: 6, w: 1, h: 1, name: "Stoel", img:'/images/minigames/blind/chair.png' },
            { x: 1, y: 7, w: 1, h: 1, name: "Stoel", img:'/images/minigames/blind/chair-top.png' },

            { x: 0, y: 5, w: 1, h: 2, name: "TV", img:'/images/minigames/blind/tv.png' },

            { x: 5, y: 5, w: 1, h: 1, name: "Kruk", img:'/images/minigames/blind/stool.png' },
            { x: 5, y: 6, w: 1, h: 1, name: "Kruk", img:'/images/minigames/blind/stool.png' },
            { x: 5, y: 7, w: 1, h: 1, name: "Kruk", img:'/images/minigames/blind/stool.png' },

            { x: 6, y: 0, w: 1, h: 2, name: "Muur", img:'/images/minigames/blind/wall-long.png' },
            { x: 6, y: 4, w: 3, h: 1, name: "Muur", img:'/images/minigames/blind/wall-wide.png' },
            { x: 6, y: 5, w: 1, h: 3, name: "Bar", img:'/images/minigames/blind/bar.png' },
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
        playerSprites: {
            front: "/images/minigames/blind/player-front.png",
            back: "/images/minigames/blind/player-back.png",
            left: "/images/minigames/blind/player-left.png",
            right: "/images/minigames/blind/player-right.png",
        },
        goal: { x: 2, y: 0, w: 2, h: 1, name: "Bushalte", img:'/images/minigames/blind/busstop.png' },
        obstacles: [
            { x: 0, y: 0, w: 9, h: 9, name: "Floor", img:'/images/minigames/blind/floor-busstop.png' },

            { x: 0, y: 0, w: 1, h: 1, name: "Boom", img:'/images/minigames/blind/tree.png' },
            { x: 5, y: 0, w: 1, h: 1, name: "Boom", img:'/images/minigames/blind/tree.png' },
            { x: 7, y: 0, w: 1, h: 1, name: "Boom", img:'/images/minigames/blind/tree.png' },

            { x: 5, y: 3, w: 1, h: 1, name: "Stoplicht", img:'/images/minigames/blind/trafficlight.png' },
            { x: 8, y: 7, w: 1, h: 1, name: "Stoplicht", img:'/images/minigames/blind/trafficlight-rotated.png' },

            { x: 0, y: 7, w: 2, h: 1, name: "Auto", img:'/images/minigames/blind/car.png' },
            { x: 3, y: 7, w: 2, h: 1, name: "Auto", img:'/images/minigames/blind/car.png' },

            { x: 0, y: 1, w: 9, h: 2, name: "Stoep met ribbels" , img:'/images/minigames/blind/sidewalk-wide.png'},
            { x: 0, y: 8, w: 9, h: 1, name: "Stoep met ribbels" , img:'/images/minigames/blind/sidewalk-thin.png'},
            { x: 6, y: 3, w: 2, h: 5, name: "Zebrapad" , img:'/images/minigames/blind/crosswalk.png'},
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
                    { x: 5, y: 2 },
                    { x: 4, y: 2 },
                    { x: 3, y: 2 },
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
        goal: { x: 3, y: 0, w: 3, h: 2, name: "Ingang", img:'/images/minigames/blind/entrance.png'},
        playerSprites: {
            front: "/images/minigames/blind/player-front.png",
            back: "/images/minigames/blind/player-back.png",
            left: "/images/minigames/blind/player-left.png",
            right: "/images/minigames/blind/player-right.png",
        },
        obstacles: [
            { x: 0, y: 0, w: 9, h: 9, name: "Floor", img:'/images/minigames/blind/floor-entrance.png' },
            { x: 0, y: 0, w: 3, h: 2, name: "Muur", img:'/images/minigames/blind/wall-building.png' },
            { x: 6, y: 0, w: 3, h: 2, name: "Muur", img:'/images/minigames/blind/wall-building.png' },
            

            { x: 1, y: 3, w: 1, h: 2, name: "Bank", img:'/images/minigames/blind/bench.png' },
            { x: 3, y: 6, w: 1, h: 2, name: "Bank", img:'/images/minigames/blind/bench.png' },
            { x: 7, y: 4, w: 1, h: 2, name: "Bank", img:'/images/minigames/blind/bench-mirror.png' },
            { x: 8, y: 7, w: 1, h: 2, name: "Bank", img:'/images/minigames/blind/bench-mirror.png' },
            { x: 0, y: 8, w: 8, h: 1, name: "Stoep met ribbels", img:'/images/minigames/blind/sidewalk-custom.png' },
            { x: 3, y: 2, w: 3, h: 6, name: "Pad", img:'/images/minigames/blind/path.png' },


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
                text: "Volg het pad naar de ingang.",
                correct: false,
                feedback: "Tim weet niet waar het pad is en kan daarom niet de juiste route volgen.",
                path: [
                    { x: 1, y: 8 }
                ],
            },
        ],
    },
]