export const levels = [
  {
    speaker: "Eduard",
    dialogue:
      "Hey! Jij bent vast mijn nieuwe collega, leuk om je te ontmoeten!",
    options: [
      {
        text: "1: Hey Eduard, mag ik vragen wat er met je gezicht is gebeurd?",
        correct: false,
        feedback: {
          title: "Niet handig!",
          text: "Het is onbeleefd om direct naar iemands uiterlijk te vragen.",
          buttonText: "Probeer opnieuw",
        },
      },
      {
        text: "2: Hoi Eduard, leuk om je te ontmoeten.",
        correct: true,
        feedback: {
          title: "Goed gedaan!",
          text: "Dit is een respectvolle manier om iemand te begroeten.",
          buttonText: "Volgende",
        },
      },
      {
        text: "3: Alleen in zijn ogen kijken om geen aandacht te vestigen",
        correct: false,
        feedback: {
          title: "Helaas!",
          text: "Hoewel je het goed bedoelt, kan dit ongemakkelijk zijn.",
          buttonText: "Probeer opnieuw",
        },
      },
    ],
  },
  {
    speaker: "Eduard",
    dialogue:
      "Zou jij me een rondleiding willen geven door het kantoor? Ik weet de weg nog niet zo goed.",
    options: [
      {
        text: "1: Natuurlijk! Kom maar mee, ik laat je alles zien.",
        correct: true,
        feedback: {
          title: "Goed gedaan!",
          text: "Je behandelt Eduard zoals je elke andere collega zou behandelen. Dat is precies de bedoeling.",
          buttonText: "Volgende",
        },
      },
      {
        text: "2: Eh, vraag maar aan iemand anders, ik heb het druk.",
        correct: false,
        feedback: {
          title: "Niet handig!",
          text: "Het is belangrijk om nieuwe collega's te verwelkomen, ongeacht hun uiterlijk.",
          buttonText: "Probeer opnieuw",
        },
      },
      {
        text: "3: Doe alsof je hem niet hoort.",
        correct: false,
        feedback: {
          title: "Helaas!",
          text: "Ook als je de weg niet perfect weet, kun je Eduard begeleiden. Het gaat om de bereidheid om te helpen.",
          buttonText: "Probeer opnieuw",
        },
      },
    ],
  },
  {
    speaker: "Eduard",
    dialogue:
      "Trouwens, ik merk dat sommige collega's me een beetje anders behandelen. Jij doet dat niet, dat waardeer ik echt.",
    options: [
      {
        text: "1: Ja, ik let er gewoon niet op.",
        correct: false,
        feedback: {
          title: "Niet handig!",
          text: "Dit benoemt juist het uiterlijk indirect en kan ongemakkelijk voelen voor Eduard.",
          buttonText: "Probeer opnieuw",
        },
      },
      {
        text: "2: Oh, valt het zo op dan?",
        correct: false,
        feedback: {
          title: "Helaas!",
          text: "Dit zet Eduard in een lastige positie om zijn situatie te verklaren. Beter om het gewoon te accepteren.",
          buttonText: "Probeer opnieuw",
        },
      },
      {
        text: "3: Dat is fijn om te horen! Iedereen verdient gewoon respect.",
        correct: true,
        feedback: {
          title: "Goed gedaan!",
          text: "Je reageert empathisch en normaal. Precies de juiste toon.",
          buttonText: "Volgende",
        },
      },
    ],
  },
];
