export const obstacles = [
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
    rotate: 0,
  },
  {
    id: "small-door",
    label: "Smalle deur",
    top: "25%",
    left: "78%",
    width: "9%",
    height: "36%",
    rotate: 0,
  },
  {
    id: "stairs",
    label: "Trap",
    top: "62%",
    left: "10%",
    width: "63%",
    height: "17%",
    rotate: 0,
  },
  {
    id: "threshold",
    label: "Hoge drempel",
    top: "64%",
    left: "75%",
    width: "23%",
    height: "20%",
    rotate: 0,
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
];

export const obstacleCategories = {
  "inconvenient-door": "door",
  "rotating-door": "door",
  "small-door": "space",
  stairs: "height",
  threshold: "height",
  curb: "height",
};

export const categoryHints = {
  height:
    "Let op hoogteverschillen. Hoe kan iemand in een rolstoel hier overheen komen?",

  space:
    "Houd er rekening mee dat een rolstoel meer ruimte nodig heeft dan een lopend persoon.",

  door:
    "Denk na over hoe iemand in een rolstoel een deur opent en gebruikt.",
};