import type { MenuItem } from "../types";
import { Glass, Measure } from "../types";

const ACID_TIMES: MenuItem[] = [
  {
    cat: "Cócteles de autor",
    priority: 1,
    family: "Acid Times",
    name: "Blue Margarita",

    ingredients: [
      {
        name: "Tequila",
        qty: 2,
        measure: Measure.Oz,
      },
      {
        name: "Licor Bols Blue Curaçao",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Sirope de agave",
        qty: 0.5,
        measure: Measure.Oz,
      },
      {
        name: "Zumo de lima",
        qty: 1,
        measure: Measure.Oz,
      },
    ],
    method: "Agitado, Colado",
    glass: Glass.Coupe,
    prices: [{ label: "cóctel", p: 12 }],
  },
  {
    cat: "Cócteles de autor",
    priority: 1,
    family: "Acid Times",
    name: "Brote Primavera",

    ingredients: [
      {
        name: "Gin",
        qty: 2,
        measure: Measure.Oz,
      },
      {
        name: "Licor yuzu",
        qty: 0.5,
        measure: Measure.Oz,
      },
      {
        name: "Azúcar líquido",
        qty: 0.5,
        measure: Measure.Oz,
      },
    ],
    garnish: ["Albahaca", "Rodaja de lima"],
    method: "Agitado, Colado",
    glass: Glass.Lowball,
    prices: [{ label: "cóctel", p: 12 }],
  },
  {
    cat: "Cócteles de autor",
    priority: 1,
    family: "Acid Times",
    name: "Berlin Lemonade",

    ingredients: [
      {
        name: "Jack Daniels Triple Mash",
        qty: 1.5,
        measure: Measure.Oz,
      },
      {
        name: "Triple Sec",
        qty: 0.5,
        measure: Measure.Oz,
      },
      {
        name: "Bitter de naranja",
        qty: 2,
        measure: Measure.Dashes,
      },
      {
        name: "Zumo de limón",
        qty: 1.33,
        measure: Measure.Oz,
      },
      {
        name: "7UP",
        qty: 0,
        measure: Measure.Top,
      },
    ],
    method: "Agitado, Colado",
    glass: Glass.Highball,
    prices: [{ label: "cóctel", p: 12 }],
  },
  {
    cat: "Cócteles de autor",
    priority: 1,
    family: "Acid Times",
    name: "Corazón de Luna",

    ingredients: [
      {
        name: "Tequila",
        qty: 2,
        measure: Measure.Oz,
      },
      {
        name: "Triple Sec",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Zumo de lima",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Lichee",
        qty: 0.5,
        measure: Measure.Oz,
      },
    ],
    method: "Agitado, Colado",
    glass: Glass.Coupe,
    prices: [{ label: "cóctel", p: 12 }],
  },
  {
    cat: "Cócteles de autor",
    priority: 1,
    family: "Acid Times",
    name: "Berlín Green",

    ingredients: [
      {
        name: "Vodka",
        qty: 2,
        measure: Measure.Oz,
      },
      {
        name: "Licor Midori",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Maracuya",
        qty: 0.5,
        measure: Measure.Oz,
      },
      {
        name: "Manzana verde natural triturada",
        qty: 0.75,
        measure: Measure.Uds,
      },
    ],
    garnish: [
      "Albahaca (5-6 hojas dentro del vaso), 0.25 ud. manzana verde natural en el borde del vaso",
    ],
    method: "Agitado, Colado",
    glass: Glass.Highball,
    prices: [{ label: "cóctel", p: 13 }],
  },
];

const SWEET_TIMES: MenuItem[] = [
  {
    cat: "Cócteles de autor",
    priority: 1,
    family: "Sweet Times",
    name: "Porn Star Martini",

    ingredients: [
      {
        name: "Vodka",
        qty: 1.5,
        measure: Measure.Oz,
      },
      {
        name: "Passoa",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Maracuya",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Zumo de lima",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Sirope de vainilla",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Espumita",
        qty: 2,
        measure: Measure.Dashes,
      },
    ],
    garnish: ["Viene con un chupito de Cava o Prosecco"],
    method: "Agitado, Colado",
    glass: Glass.Coupe,
    prices: [{ label: "cóctel", p: 12 }],
  },
  {
    cat: "Cócteles de autor",
    priority: 1,
    family: "Sweet Times",
    name: "Éxodo",

    ingredients: [
      {
        name: "Bumbu",
        qty: 2,
        measure: Measure.Oz,
      },
      {
        name: "Bitter caffè",
        qty: 2,
        measure: Measure.Dashes,
      },
      {
        name: "Sirope pandán",
        qty: 0.66,
        measure: Measure.Oz,
      },
      {
        name: "Leche de coco",
        qty: 0.5,
        measure: Measure.Oz,
      },
      {
        name: "Café",
        qty: 2.66,
        measure: Measure.Oz,
      },
    ],
    method: "Agitado, Colado",
    glass: Glass.Highball,
    prices: [{ label: "cóctel", p: 12 }],
  },
  {
    cat: "Cócteles de autor",
    priority: 1,
    family: "Sweet Times",
    name: "Rubedo",

    ingredients: [
      {
        name: "Gin",
        qty: 2,
        measure: Measure.Oz,
      },
      {
        name: "Vermut",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Zumo de lima",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Sirope de agave",
        qty: 0.5,
        measure: Measure.Oz,
      },
      {
        name: "Zumo de arándanos",
        qty: 0.5,
        measure: Measure.Oz,
      },
      {
        name: "Fresa",
        qty: 0.5,
        measure: Measure.Oz,
      },
    ],
    method: "Agitado, Colado",
    glass: Glass.Highball,
    prices: [{ label: "cóctel", p: 12 }],
  },
  {
    cat: "Cócteles de autor",
    priority: 1,
    family: "Sweet Times",
    name: "Génesis",

    ingredients: [
      {
        name: "Ron",
        qty: 2,
        measure: Measure.Oz,
      },
      {
        name: "Calabaza asada",
        qty: 2,
        measure: Measure.Oz,
      },
      {
        name: "Azúcar líquido",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Zumo de naranja",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Zumo de lima",
        qty: 0.5,
        measure: Measure.Oz,
      },
      {
        name: "Ginger Ale",
        qty: 1,
        measure: Measure.Top,
      },
    ],
    method: "Agitado, Colado",
    glass: Glass.Highball,
    prices: [{ label: "cóctel", p: 12 }],
  },
  {
    cat: "Cócteles de autor",
    priority: 1,
    family: "Sweet Times",
    name: "Ámbar con cacao",

    ingredients: [
      {
        name: "Ron",
        qty: 2,
        measure: Measure.Oz,
      },
      {
        name: "Licor Bols Butterscotch",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Sirope de vainilla",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Licor Bols Chocolate",
        qty: 0.5,
        measure: Measure.Oz,
      },
    ],
    method: "Agitado, Colado",
    glass: Glass.Coupe,
    prices: [{ label: "cóctel", p: 12 }],
  },
  {
    cat: "Cócteles de autor",
    priority: 1,
    family: "Sweet Times",
    name: "Diego",

    ingredients: [
      {
        name: "Jack Daniels Fire",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Licor Bols Yogurt",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Licor Bols Butterscotch",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Zumo de arándanos",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Sirope amarena",
        qty: 0.8,
        measure: Measure.Oz,
      },
    ],
    method: "Removido",
    glass: Glass.Jar,
    prices: [{ label: "cóctel", p: 12 }],
  },
];

const SPICY_TIMES: MenuItem[] = [
  {
    cat: "Cócteles de autor",
    priority: 1,
    family: "Spicy Times",
    name: "Paloma Don Julio",

    ingredients: [
      {
        name: "Tequila Don Julio",
        qty: 2,
        measure: Measure.Oz,
      },
      {
        name: "Sirope de agave",
        qty: 0.5,
        measure: Measure.Oz,
      },
      {
        name: "Zumo de lima",
        qty: 0.5,
        measure: Measure.Oz,
      },
      {
        name: "Soda de pomelo",
        qty: 1,
        measure: Measure.Top,
      },
    ],
    garnish: ["Rodaja de lima", "sal en el borde del vaso"],
    method: "Removido",
    glass: Glass.Highball,
    prices: [{ label: "cóctel", p: 12 }],
  },
  {
    cat: "Cócteles de autor",
    priority: 1,
    family: "Spicy Times",
    name: "Matarreyes",

    ingredients: [
      {
        name: "Vodka Smirnoff Tamarindo",
        qty: 2,
        measure: Measure.Oz,
      },
      {
        name: "Licor de humo",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Triple Sec",
        qty: 1.5,
        measure: Measure.Oz,
      },
      {
        name: "Sirope de agave",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Zumo de lima",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Maracuya",
        qty: 1,
        measure: Measure.Oz,
      },
    ],
    prices: [{ label: "cóctel", p: 12 }],
  },
];

const HARD_TIMES: MenuItem[] = [
  {
    cat: "Cócteles de autor",
    priority: 1,
    family: "Hard Times",
    name: "Hombro al sol",

    ingredients: [
      {
        name: "Monkey Shoulder",
        qty: 2,
        measure: Measure.Oz,
      },
      {
        name: "Fino",
        qty: 2,
        measure: Measure.Oz,
      },
      {
        name: "Bitter de naranja",
        qty: 2,
        measure: Measure.Dashes,
      },
    ],
    glass: Glass.Lowball,
    prices: [{ label: "cóctel", p: 12 }],
  },
  {
    cat: "Cócteles de autor",
    priority: 1,
    family: "Hard Times",
    name: "Polvo de calima",
    glass: Glass.Lowball,

    ingredients: [
      {
        name: "Mezcal",
        qty: 2,
        measure: Measure.Oz,
      },
      {
        name: "Cynar",
        qty: 2,
        measure: Measure.Oz,
      },
      {
        name: "Vino blanco",
        qty: 2,
        measure: Measure.Oz,
      },
    ],
    prices: [{ label: "cóctel", p: 12 }],
  },
  {
    cat: "Cócteles de autor",
    priority: 1,
    family: "Hard Times",
    name: "Berlin Sling",
    glass: Glass.Collins,

    ingredients: [
      {
        name: "Gin Mare",
        qty: 1.5,
        measure: Measure.Oz,
      },
      {
        name: "Chambord",
        qty: 0.5,
        measure: Measure.Oz,
      },
      {
        name: "Bénédictine DOM",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Triple Sec",
        qty: 0.5,
        measure: Measure.Oz,
      },
      {
        name: "Piña",
        qty: 0.5,
        measure: Measure.Oz,
      },
      {
        name: "Zumo de lima",
        qty: 0.5,
        measure: Measure.Oz,
      },
      {
        name: "Sirope de agave",
        qty: 0.5,
        measure: Measure.Oz,
      },
      {
        name: "Bitter de naranja",
        qty: 2,
        measure: Measure.Dashes,
      },
    ],
    prices: [
      { label: "cóctel", p: 12 },
      { label: "cóctel con chupito de vodka", p: 13 },
    ],
  },
];

const LEY_SECA: MenuItem[] = [
  {
    cat: "Cócteles de autor",
    priority: 1,
    family: "Ley Seca",
    name: "Virgin Mai Tai",

    ingredients: [
      {
        name: "Tanqueray 0.0",
        qty: 2,
        measure: Measure.Oz,
      },
      {
        name: "Sirope de orgeat",
        qty: 1.5,
        measure: Measure.Oz,
      },
      {
        name: "Sirope falernum",
        qty: 1.5,
        measure: Measure.Oz,
      },
      {
        name: "Zumo de limón",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Zumo de naranja",
        qty: 0.5,
        measure: Measure.Oz,
      },
    ],
    garnish: ["Granadina", "Rodaja de limón", "Hierbabuena"],
    method: "Removido",
    glass: Glass.Highball,
    prices: [
      { label: "sin alcohol", p: 8 },
      { label: "con alcohol", p: 12 },
    ],
  },
  {
    cat: "Cócteles de autor",
    priority: 1,
    family: "Ley Seca",
    name: "Gin Fizz 0.0",

    ingredients: [
      {
        name: "Tanqueray 0.0",
        qty: 2,
        measure: Measure.Oz,
      },
      {
        name: "Zumo de limón",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Azúcar líquido",
        qty: 0.75,
        measure: Measure.Oz,
      },
      {
        name: "Espumita",
        qty: 2,
        measure: Measure.Dashes,
      },
      {
        name: "Soda",
        qty: 0,
        measure: Measure.Top,
      },
    ],
    method: "Agitado, Colado",
    glass: Glass.Highball,
    prices: [{ label: "cóctel", p: 9 }],
  },
  {
    cat: "Cócteles de autor",
    priority: 1,
    family: "Ley Seca",
    name: "Virgin Lady",

    ingredients: [
      {
        name: "Tanqueray 0.0",
        qty: 2,
        measure: Measure.Oz,
      },
      {
        name: "Zumo de limón",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Azúcar líquido",
        qty: 0.5,
        measure: Measure.Oz,
      },
      {
        name: "Espumita",
        qty: 2,
        measure: Measure.Dashes,
      },
    ],
    method: "Agitado, Colado",
    glass: Glass.Coupe,
    prices: [{ label: "cóctel", p: 9 }],
  },
  {
    cat: "Cócteles de autor",
    priority: 1,
    family: "Ley Seca",
    name: "Virgin Pink Lady",

    ingredients: [
      {
        name: "Tanqueray 0.0",
        qty: 2,
        measure: Measure.Oz,
      },
      {
        name: "Zumo de limón",
        qty: 1,
        measure: Measure.Oz,
      },
      {
        name: "Granadina",
        qty: 0.5,
        measure: Measure.Oz,
      },
      {
        name: "Espumita",
        qty: 2,
        measure: Measure.Dashes,
      },
    ],
    method: "Agitado, Colado",
    glass: Glass.Coupe,
    prices: [{ label: "cóctel", p: 9 }],
  },
];

import { normalizeMenuItems } from "./normalize";

export const AUTOR_COCTAILS: MenuItem[] = normalizeMenuItems([
  ...ACID_TIMES,
  ...SWEET_TIMES,
  ...SPICY_TIMES,
  ...HARD_TIMES,
  ...LEY_SECA,
]);
