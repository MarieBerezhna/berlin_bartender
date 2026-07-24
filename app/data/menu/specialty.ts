import type { MenuItem } from "../types";
import { Glass, Measure } from "../types";

const ACID_TIMES: MenuItem[] = [
  {cat:"Cócteles de autor",family:"Acid Times",name:"Blue Margarita",
    ingr:{"Tequila":"2 oz","Licor Bols Blue Curaçao":"1 oz","Sirope de agave":"0.5 oz","Zumo de lima":"1 oz"},
    ingredients:[
      {
        name:"Tequila",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Licor Bols Blue Curaçao",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Sirope de agave",
        qty:0.5,
        measure: Measure.Oz
      },{
        name:"Zumo de lima",
        qty:1,
        measure: Measure.Oz
      }
    ],
    method:"Agitado, Colado",
    glass: Glass.Coupe,
    prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Acid Times",name:"Brote Primavera",
  ingr:{"Gin":"2 oz","Licor yuzu":"0.5 oz","Azúcar líquido":'0.5 oz'},
  ingredients:[
    {
      name:"Gin",
      qty:2,
      measure: Measure.Oz
    },{
      name:"Licor yuzu",
      qty:0.5,
      measure: Measure.Oz
    },{
      name:"Azúcar líquido",
      qty:0.5,
      measure: Measure.Oz
    }
  ],
  garnish:["Albahaca", "Rodaja de lima"],
  method:"Agitado, Colado",
    glass: Glass.Lowball,
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Acid Times",name:"Berlin Lemonade",
    ingr:{"Jack Daniels Triple Mash":"1.5 oz","Triple Sec":"0.5 oz","Bitter de naranja":"2 golpes","Zumo de limón":"1.33 oz","7UP":"top"},
    ingredients:[
      {
        name:"Jack Daniels Triple Mash",
        qty:1.5,
        measure: Measure.Oz
      },{
        name:"Triple Sec",
        qty:0.5,
        measure: Measure.Oz
      },{
        name:"Bitter de naranja",
        qty:2,
        measure: Measure.Dashes
      },{
        name:"Zumo de limón",
        qty:1.33,
        measure: Measure.Oz
      },{
        name:"7UP",
        qty:0,
        measure: Measure.Top
      }
    ],
    method:"Agitado, Colado",
    glass: Glass.Highball,
    prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Acid Times",name:"Corazón de Luna",
    ingr:{"Tequila":"2 oz","Triple Sec":"1 oz","Zumo de lima":"1 oz","Lichee":"0.5 oz"},
    ingredients:[
      {
        name:"Tequila",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Triple Sec",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Zumo de lima",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Lichee",
        qty:0.5,
        measure: Measure.Oz
      }
    ],
    method:"Agitado, Colado",
    glass: Glass.Coupe,
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Acid Times",name:"Berlín Green",
    ingr:{"Vodka":"2 oz","Licor Midori":"1 oz","Maracuya":"0.5 oz", "Manzana verde natural triturada":"0.75 ud."},
    ingredients:[
      {
        name:"Vodka",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Licor Midori",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Maracuya",
        qty:0.5,
        measure: Measure.Oz
      },{
        name:"Manzana verde natural triturada",
        qty:0.75,
        measure: Measure.Uds
      }
    ],
    garnish:["Albahaca (5-6 hojas dentro del vaso), 0.25 ud. manzana verde natural en el borde del vaso"],
    method:"Agitado, Colado",
    glass: Glass.Highball,
   prices:[{label:"cóctel",p:13}]},
];

const SWEET_TIMES: MenuItem[] = [
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Porn Star Martini",
    ingr:{"Vodka":"2 oz","Licor Bols Vainilla":"0.5 oz","Maracuya":"1 oz","Zumo de lima":"0.5 oz","Sirope de vainilla":"1 golpe","Espumita":"2 golpes"},
    ingredients:[
      {
        name:"Vodka",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Licor Bols Vainilla",
        qty:0.5,
        measure: Measure.Oz
      },{
        name:"Maracuya",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Zumo de lima",
        qty:0.5,
        measure: Measure.Oz
      },{
        name:"Sirope de vainilla",
        qty:1,
        measure: Measure.Dashes
      },{
        name:"Espumita",
        qty:2,
        measure: Measure.Dashes
      }
    ],
    garnish:["Viene con un chupito de Cava o Prosecco"],
    method:"Agitado, Colado",
    glass: Glass.Coupe,
    prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Éxodo",
    ingr:{"Bumbu":"2 oz","Bitter caffè":"2 golpes","Sirope pandán":"0.66 oz","Leche de coco":"0.5 oz","Café":"2.66 oz"},
    ingredients:[
      {
        name:"Bumbu",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Bitter caffè",
        qty:2,
        measure: Measure.Dashes
      },{
        name:"Sirope pandán",
        qty:0.66,
        measure: Measure.Oz
      },{
        name:"Leche de coco",
        qty:0.5,
        measure: Measure.Oz
      },{
        name:"Café",
        qty:2.66,
        measure: Measure.Oz
      }
    ],
    method:"Agitado, Colado",
    glass: Glass.Highball,
    prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Rubedo",
    ingr:{"Gin":"2 oz","Vermut":"1 oz","Zumo de lima":"1 oz","Sirope de agave":"0.5 oz","Zumo de arándanos":"0.5 oz","Fresa":"0.5 oz"},
    ingredients:[
      {
        name:"Gin",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Vermut",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Zumo de lima",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Sirope de agave",
        qty:0.5,
        measure: Measure.Oz
      },{
        name:"Zumo de arándanos",
        qty:0.5,
        measure: Measure.Oz
      },{
        name:"Fresa",
        qty:0.5,
        measure: Measure.Oz
      }
    ],
    method:"Agitado, Colado",
    glass: Glass.Highball,
    prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Génesis",
  ingr:{"Ron":"2 oz","Calabaza asada":"2 oz","Azúcar líquido":"1 oz","Zumo de naranja":"1 oz", "Zumo de lima":"0.5 oz", "Ginger Ale":"top"},
    ingredients:[
      {
        name:"Ron",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Calabaza asada",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Azúcar líquido",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Zumo de naranja",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Zumo de lima",
        qty:0.5,
        measure: Measure.Oz
      },{
        name:"Ginger Ale",
        qty:1,
        measure: Measure.Top
      }
    ],
    method:"Agitado, Colado",
    glass: Glass.Highball,
    prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Ámbar con cacao",
    ingr:{"Ron":"2 oz","Licor Bols Butterscotch":"1 oz","Sirope de vainilla":"1 oz", "Licor Bols Chocolate":"0.5 oz"},
    ingredients:[
      {
        name:"Ron",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Licor Bols Butterscotch",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Sirope de vainilla",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Licor Bols Chocolate",
        qty:0.5,
        measure: Measure.Oz
      }
    ],
    method:"Agitado, Colado",
    glass: Glass.Coupe,
    prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Diego",
    ingr:{"Jack Daniels Fire":"1 oz","Licor Bols Yogurt":"1 oz","Licor Bols Butterscotch":"1 oz", "Zumo de arándanos":"1 oz", "Sirope amarena":"~0.8 oz"},
    ingredients:[
      {
        name:"Jack Daniels Fire",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Licor Bols Yogurt",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Licor Bols Butterscotch",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Zumo de arándanos",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Sirope amarena",
        qty:0.8,
        measure: Measure.Oz
      }
    ],
    method:"Removido",
    glass: Glass.Jar,
    prices:[{label:"cóctel",p:12}]},
];

const SPICY_TIMES: MenuItem[] = [
  {cat:"Cócteles de autor",family:"Spicy Times",name:"Paloma Don Julio",
    ingr:{"Tequila Don Julio":"2 oz","Sirope de agave":"0.5 oz","Zumo de lima":"0.5 oz","Soda de pomelo":"top"},
    ingredients:[
      {
        name:"Tequila Don Julio",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Sirope de agave",
        qty:0.5,
        measure: Measure.Oz
      },{
        name:"Zumo de lima",
        qty:0.5,
        measure: Measure.Oz
      },{
        name:"Soda de pomelo",
        qty:1,
        measure: Measure.Top
      }
    ],
    garnish:["Rodaja de lima", "sal en el borde del vaso"],
    method:"Removido",
    glass: Glass.Highball,
    prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Spicy Times",name:"Matarreyes",
    ingr:{"Vodka Smirnoff Tamarindo":"2 oz","Licor de humo":"1 oz","Triple Sec":"1.5 oz","Sirope de agave":"1 oz","Zumo de lima":"1 oz","Maracuya":"1 oz"},
    ingredients:[
      {
        name:"Vodka Smirnoff Tamarindo",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Licor de humo",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Triple Sec",
        qty:1.5,
        measure: Measure.Oz
      },{
        name:"Sirope de agave",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Zumo de lima",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Maracuya",
        qty:1,
        measure: Measure.Oz
      }
    ],
   prices:[{label:"cóctel",p:12}]},

];

const HARD_TIMES: MenuItem[] = [
  {cat:"Cócteles de autor",family:"Hard Times",name:"Hombro al sol",
    ingr:{"Monkey Shoulder":"2 oz","Fino":"2 oz","Bitter de naranja":"2 golpes"},
    ingredients:[
      {
        name:"Monkey Shoulder",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Fino",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Bitter de naranja",
        qty:2,
        measure: Measure.Dashes
      }
    ],
    glass: Glass.Lowball,
    prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Hard Times",name:"Polvo de calima",
    glass: Glass.Lowball,
    ingr:{"Mezcal":"2 oz","Cynar":"2 oz","Vino blanco":"2 oz"},
    ingredients:[
      {
        name:"Mezcal",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Cynar",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Vino blanco",
        qty:2,
        measure: Measure.Oz
      }
    ],
    prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Hard Times",name:"Berlin Sling",
    glass: Glass.Collins,
    ingr:{"Gin Mare":"1,5 oz","Chambord":"0.5 oz","Bénédictine DOM":"1 oz","Triple Sec":"0.5 oz","Piña":"0.5 oz","Zumo de lima":"0.5 oz","Sirope de agave":"0.5 oz","Bitter de naranja":"2 golpes"},
    ingredients:[
      {
        name:"Gin Mare",
        qty:1.5,
        measure: Measure.Oz
      },{
        name:"Chambord",
        qty:0.5,
        measure: Measure.Oz
      },{
        name:"Bénédictine DOM",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Triple Sec",
        qty:0.5,
        measure: Measure.Oz
      },{
        name:"Piña",
        qty:0.5,
        measure: Measure.Oz
      },{
        name:"Zumo de lima",
        qty:0.5,
        measure: Measure.Oz
      },{
        name:"Sirope de agave",
        qty:0.5,
        measure: Measure.Oz
      },{
        name:"Bitter de naranja",
        qty:2,
        measure: Measure.Dashes
      }
    ],
    prices:[{label:"cóctel",p:12},{label:"cóctel con chupito de vodka",p:13}]},
];

const LEY_SECA: MenuItem[] = [
  {cat:"Cócteles de autor",family:"Ley Seca",name:"Virgin Mai Tai",
    ingr:{"Tanqueray 0.0":"2 oz","Sirope de orgeat":"1.5 oz","Sirope falernum":"1.5 oz","Zumo de limón":"1 oz","Zumo de naranja":"0.5 oz"},
    ingredients:[
      {
        name:"Tanqueray 0.0",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Sirope de orgeat",
        qty:1.5,
        measure: Measure.Oz
      },{
        name:"Sirope falernum",
        qty:1.5,
        measure: Measure.Oz
      },{
        name:"Zumo de limón",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Zumo de naranja",
        qty:0.5,
        measure: Measure.Oz
      }
    ],
    garnish:["Granadina","Rodaja de limón","Hierbabuena"],
    method:"Removido",
    glass: Glass.Highball,
   prices:[{label:"sin alcohol",p:8},{label:"con alcohol",p:12}]},
  {cat:"Cócteles de autor",family:"Ley Seca",name:"Gin Fizz 0.0",
    ingr:{"Tanqueray 0.0":"2 oz","Zumo de limón":"1 oz","Azúcar líquido":"0.75 oz","Espumita": "2 golpes","Soda":"top"},
    ingredients:[
      {
        name:"Tanqueray 0.0",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Zumo de limón",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Azúcar líquido",
        qty:0.75,
        measure: Measure.Oz
      },{
        name:"Espumita",
        qty:2,
        measure: Measure.Dashes,
      },{
        name:"Soda",
        qty:0,
        measure: Measure.Top
      }
    ],
    method:"Agitado, Colado",
    glass: Glass.Highball,
   prices:[{label:"cóctel",p:9}]},
  {cat:"Cócteles de autor",family:"Ley Seca",name:"Virgin Lady",
    ingr:{"Tanqueray 0.0":"2 oz","Zumo de limón":"1 oz","Azúcar líquido":"0.5 oz","Espumita": "2 golpes"},
    ingredients:[
      {
        name:"Tanqueray 0.0",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Zumo de limón",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Azúcar líquido",
        qty:0.5,
        measure: Measure.Oz
      },{
        name:"Espumita",
        qty:2,
        measure: Measure.Dashes,
      }
    ],
    method:"Agitado, Colado",
    glass: Glass.Coupe,
    prices:[{label:"cóctel",p:9}]},
  {cat:"Cócteles de autor",family:"Ley Seca",name:"Virgin Pink Lady",
    ingr:{"Tanqueray 0.0":"2 oz","Zumo de limón":"1 oz","Granadina":"0.5 oz","Espumita": "2 golpes"},
    ingredients:[
      {
        name:"Tanqueray 0.0",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Zumo de limón",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Granadina",
        qty:0.5,
        measure: Measure.Oz
      },{
        name:"Espumita",
        qty:2,
        measure: Measure.Dashes,
      }
    ],
    method:"Agitado, Colado",
    glass: Glass.Coupe,
    prices:[{label:"cóctel",p:9}]},
];

export const AUTOR_COCTAILS: MenuItem[] = [
  ...ACID_TIMES,
  ...SWEET_TIMES,
  ...SPICY_TIMES,
  ...HARD_TIMES,
  ...LEY_SECA,
];