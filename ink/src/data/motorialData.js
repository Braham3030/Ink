export const levels = [
  {
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
    image: "/images/motorial-obstacles/Train_Station.jpg",

    obstacles: [
      {
        id: "example-1",
        label: "Voorbeeld obstakel",
        top: "40%",
        left: "40%",
        width: "10%",
        height: "10%",
      },
    ],

    obstacleCategories: {
      "example-1": "space",
    },

    categoryHints: {
      space: "Tweede level hint voor ruimte.",
    },
  },
];