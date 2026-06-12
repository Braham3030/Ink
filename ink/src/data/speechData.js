export const speechData = [
    {
        id: "passport_extension",
        title: "Paspoort verlengen",

        checklist: [
            "Huidig paspoort controleren",
            "Persoonlijke gegevens controleren",
            "Pasfoto controleren",
            "Afhaaldatum vermelden",
            "Aanvraag afronden"
        ],

        dialogue: [
            {
                speaker: "Evelin",
                text: "Goedemorgen. Ik heb een afspraak voor het verlengen van mijn paspoort."
            },
            {
                speaker: "U",
                text: "Goedemorgen. Natuurlijk. Mag ik uw huidige paspoort even zien?"
            },
            {
                speaker: "Evelin",
                text: "Ja hoor. Hier is het. Ik wilde het graag op tijd regelen omdat ik later dit jaar naar het buitenland reis."
            },
            {
                speaker: "U",
                text: "Dat is verstandig. Ik ga uw gegevens even controleren. Zijn er sinds uw vorige aanvraag nog persoonlijke gegevens gewijzigd?",
                checklistItem: "Huidig paspoort controleren"
            },
            {
                speaker: "Evelin",
                text: "Nee, alles is nog hetzelfde als de vorige keer."
            },
            {
                speaker: "U",
                text: "Prima. Heeft u ook een recente pasfoto meegenomen?",
                checklistItem: "Persoonlijke gegevens controleren"
            },
            {
                speaker: "Evelin",
                text: "Ja, die heb ik gisteren laten maken omdat ik zeker wilde weten dat deze aan alle eisen voldoet."
            },
            {
                speaker: "U",
                text: "Deze ziet er goed uit. Dan hoeven we alleen nog uw vingerafdrukken af te nemen.",
                checklistItem: "Pasfoto controleren"
            },
            {
                speaker: "Evelin",
                text: "Dat is prima. Kunt u aangeven wanneer het nieuwe paspoort ongeveer klaar zal zijn?"
            },
            {
                speaker: "U",
                text: "Meestal duurt dat ongeveer vijf werkdagen. U krijgt bericht zodra het document kan worden opgehaald.",
                checklistItem: "Afhaaldatum vermelden"
            },
            {
                speaker: "Evelin",
                text: "Perfect. Bedankt voor de hulp."
            },
            {
                speaker: "U",
                text: "Graag gedaan. Fijne dag verder.",
                checklistItem: "Aanvraag afronden"
            }
        ]
    }
];
