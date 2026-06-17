export const levels = [
  // LEVEL 1
  {
    // Bron: ChatGPT 
    // Er waren meerdere prompts gebruikt voor dit resultaat, maar dit was de startprompt (met context over de minigame):
    // Maak een foto van een kantoor ingang waar je dingen als trap, draaiende deur en andere soorten obstakels zitten
    image: "/images/motorial-obstacles/Entrance_Building.png",

    obstacles: [
      {
        id: "inconvenient-door",
        label: "Onhandige deur",
        top: "30%",
        left: "32%",
        width: "18%",
        height: "30%",
        rotate: 0,
      },
      {
        id: "rotating-door",
        label: "Roterende deur",
        top: "26%",
        left: "52%",
        width: "23%",
        height: "35%",
      },
      {
        id: "small-door",
        label: "Smalle deur",
        top: "25%",
        left: "78%",
        width: "9%",
        height: "36%",
      },
      {
        id: "stairs",
        label: "Trap",
        top: "63%",
        left: "10%",
        width: "63%",
        height: "14%",
        rotate: 3,
      },
      {
        id: "threshold",
        label: "Hoge drempel",
        top: "64%",
        left: "75%",
        width: "23%",
        height: "20%",
      },
      {
        id: "curb",
        label: "Stoeprand",
        top: "91%",
        left: "0%",
        width: "90%",
        height: "7%",
        rotate: 6,
      },
    ],

    obstacleCategories: {
      "inconvenient-door": "door",
      "rotating-door": "door",
      "small-door": "space",
      stairs: "height",
      threshold: "height",
      curb: "height",
    },

    categoryHints: {
      height:
        "Let op hoogteverschillen. Hoe kan iemand in een rolstoel hier overheen komen?",

      space:
        "Houd er rekening mee dat een rolstoel meer ruimte nodig heeft dan een lopend persoon.",

      door:
        "Denk na over hoe iemand in een rolstoel een deur opent en gebruikt.",
    },
  },

  // LEVEL 2 
  {
    // Bron: https://gemini.google.com/
    // Er waren meerdere prompts gebruikt voor dit resultaat, maar dit was de startprompt:
    // Realistic wide-angle photograph of a modern European train station (Netherlands style). The viewpoint is from the upper concourse looking down towards the platform, showing a staircase that descends from the station entrance area down to the train platform. At the bottom of the stairs is a train stopped at the platform with open doors visible.
    // The composition clearly shows the vertical transition from upper level to platform level via the staircase, including railings, steps, and landing. The platform is busy but realistic, with typical station elements such as signage, benches, tactile paving, and platform edge markings. Natural daylight, documentary photography style, realistic colors, no stylization, no diagrams or labels.
    // The focus is on the spatial relationship between the descending stairs and the train boarding area below, showing both in one coherent frame. 

    image: "/images/motorial-obstacles/Train_Station.jpg",

    obstacles: [
      {
        id: "stairs",
        label: "Trap",
        top: "50%",
        left: "60%",
        width: "20%",
        height: "15%",
      },
      {
        id: "elevator-door",
        label: "Smalle liftdeur",
        top: "40%",
        left: "85%",
        width: "13%",
        height: "35%",
      },
      {
        id: "train-door",
        label: "Treindeur + Ruimte tussen trein en perron",
        top: "30%",
        left: "10%",
        width: "13%",
        height: "65%",
      },
    ],

    obstacleCategories: {
      "stairs": "height",
      "elevator-door": "space",
      "train-door": "train",
    },

    categoryHints: {
      height: "Let op hoogteverschillen. Hoe kan iemand in een rolstoel hier overheen komen?",
      space: "Houd er rekening mee dat een rolstoel meer ruimte nodig heeft dan een lopend persoon.",
      train: "Denk na over hoe iemand in een rolstoel in en uit de trein stapt.",
    },
  },



];

