import { Measure, type MenuItem } from "../types";
import { CLASSICS } from "./classics";
import { AUTOR_COCTAILS } from "./specialty";
import { normalizeMenuItems } from "./normalize";

const SPRITZ: MenuItem[] = [
  {cat:"Spritz",name:"Hugo Spritz",
    ingredients:[
      {
        name:"Bols Saúco",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Cava",
        qty:3,
        measure: Measure.Oz
      },{
        name:"Soda",
        qty:1,
        measure: Measure.Oz
      }],
   prices:[{label:"copa",p:10}]},
  {cat:"Spritz",name:"Aperol Spritz",
  ingredients:[
      {
        name:"Aperol",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Cava",
        qty:3,
        measure: Measure.Oz
      },{
        name:"Soda",
        qty:1,
        measure: Measure.Oz
      }
    ],
  prices:[{label:"copa",p:8}]},
  {cat:"Spritz",name:"Yuzu Spritz",
  ingredients:[
      {
        name:"Licor yuzu",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Cava",
        qty:3,
        measure: Measure.Oz
      },{
        name:"Soda",
        qty:1,
        measure: Measure.Oz
      }
    ],
   prices:[{label:"copa",p:8}]},
  {cat:"Spritz",name:"Chambord Spritz",
  ingredients:[
      {
        name:"Chambord",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Cava",
        qty:3,
        measure: Measure.Oz
      },{
        name:"Soda",
        qty:1,
        measure: Measure.Oz
      }
    ],
   prices:[{label:"copa",p:8}]},
  {cat:"Spritz",name:"Campari Spritz",
  ingredients:[
      {
        name:"Campari",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Cava",
        qty:3,
        measure: Measure.Oz
      },{
        name:"Soda",
        qty:1,
        measure: Measure.Oz
      }
    ],
   prices:[{label:"copa",p:8}]},
  {cat:"Spritz",name:"Sarti Rosa Spritz",
  ingredients:[
      {
        name:"Sarti Rosa",
        qty:2,
        measure: Measure.Oz
      },{
        name:"Cava",
        qty:3,
        measure: Measure.Oz
      },{
        name:"Soda",
        qty:1,
        measure: Measure.Oz
      }
    ],
   prices:[{label:"copa",p:8}]}
];

const JARRAS: MenuItem[] = [
  {cat:"Jarras",name:"Agua de Valencia",
    ingredients:[
      {
        name:"Cava",
        measure: Measure.Top
      },{
        name:"Zumo de naranja",
        qty:4,
        measure: Measure.Oz
      },{
        name:"Vodka",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Gin",
        qty:1,
        measure: Measure.Oz
      },{
        name:"Azúcar líquido",
        qty:0.5,
        measure: Measure.Oz
      }],

    prices:[{label:"copa",p:7},{label:"jarra",p:25}]},
  {cat:"Jarras",name:"Sangría",
  ingredients:[
    {
      name:"Ron blanco",
      qty:0.5,
      measure: Measure.Oz
    },{
      name:"Vino tinto",
      qty:0.5,
      measure: Measure.Oz
    },{
      name:"Triple Sec",
      qty:0.5,
      measure: Measure.Oz
    },{
      name:"Terry",
      qty:0.5,
      measure: Measure.Oz
    },{
      name:"Vermut tinto",
      qty:0.5,
      measure: Measure.Oz
    },{
      name:"Zumo de naranja",
      qty:0.5,
      measure: Measure.Oz
    },{
      name:"Azúcar líquido",
      qty:0.5,
      measure: Measure.Oz
    }],
    prices:[{label:"copa",p:7},{label:"jarra",p:25}]},
  {cat:"Jarras",name:"Tinto de verano",
    prices:[{label:"copa",p:5},{label:"jarra",p:20}]},
];

const RON: MenuItem[] = [
    {cat:"Ron",name:"Barceló Añejo",
   prices:[{label:"combinado",p:9.5},{label:"chupito",p:3}]},
  {cat:"Ron",name:"Barceló Imperial",
   prices:[{label:"combinado",p:12},{label:"chupito",p:6}]},
  {cat:"Ron",name:"Diplomático Planas",
   prices:[{label:"combinado",p:10},{label:"chupito",p:6}]},
  {cat:"Ron",name:"Zacapa Centenario 23",
   prices:[{label:"combinado",p:16},{label:"chupito",p:8}]},
];

const WHISKY: MenuItem[] = [
  {cat:"Whisky",name:"Johnnie Walker Red Label",
   prices:[{label:"combinado",p:9.5},{label:"doble",p:12},{label:"chupito",p:3}]},
  {cat:"Whisky",name:"Johnnie Walker Black Label 12Y",
   prices:[{label:"combinado",p:12},{label:"doble",p:16},{label:"chupito",p:6}]},
  {cat:"Whisky",name:"Tullamore Dew",
   prices:[{label:"combinado",p:9},{label:"doble",p:12},{label:"chupito",p:4}]},
  {cat:"Whisky",name:"Jack Daniels Old Nº7",
   prices:[{label:"combinado",p:9},{label:"doble",p:14},{label:"chupito",p:5}]},
  {cat:"Whisky",name:"Bulleit Frontier Bourbon",
   prices:[{label:"combinado",p:12},{label:"doble",p:16},{label:"chupito",p:6}]},
  {cat:"Whisky",name:"Monkey Shoulder",
   prices:[{label:"combinado",p:12},{label:"doble",p:16},{label:"chupito",p:6}]},
  {cat:"Whisky",name:"Toki",
   prices:[{label:"combinado",p:10},{label:"doble",p:18},{label:"chupito",p:5}]},
  {cat:"Whisky",name:"Bushmills",
   prices:[{label:"combinado",p:10},{label:"doble",p:18},{label:"chupito",p:5}]},
  {cat:"Whisky",name:"Tomatin",
   prices:[{label:"solo",p:12},{label:"doble",p:20},{label:"chupito",p:6}]},
  {cat:"Whisky",name:"Macallan",
   prices:[{label:"copa",p:16}]},
  ];

const GIN: MenuItem[] = [
  {cat:"Gin",name:"Tanqueray London Dry",
   prices:[{label:"combinado",p:9.5}]},
  {cat:"Gin",name:"Tanqueray Nº Ten",
   prices:[{label:"combinado",p:14}]},
  {cat:"Gin",name:"Tanqueray 0.0",
   prices:[{label:"combinado",p:10}]},
  {cat:"Gin",name:"Gin Mare",
   prices:[{label:"combinado",p:12}]},
  {cat:"Gin",name:"Fords",
   prices:[{label:"combinado",p:12}]},
  {cat:"Gin",name:"Larios 12",
   prices:[{label:"combinado",p:12}]},
  {cat:"Gin",name:"Larios Rose",
   prices:[{label:"combinado",p:10}]},
  {cat:"Gin",name:"Roku",
   prices:[{label:"combinado",p:12}]},
  {cat:"Gin",name:"Hendrick's",
   prices:[{label:"combinado",p:13}]},
  {cat:"Gin",name:"Macaronesia",
   prices:[{label:"combinado",p:9.5}]},
  ];

const TEQUILA: MenuItem[] = [
  {cat:"Tequila",name:"Rooster Rojo White",
   prices:[{label:"combinado",p:10},{label:"chupito",p:4}]},
  {cat:"Tequila",name:"Mezcal Union",
   prices:[{label:"combinado",p:12},{label:"chupito",p:5}]},
  {cat:"Tequila",name:"Don Julio Silver",
   prices:[{label:"combinado",p:18},{label:"chupito",p:10}]},
  {cat:"Tequila",name:"Don Julio Reposado",
   prices:[{label:"combinado",p:18},{label:"chupito",p:10}]},
  ];

const VODKA: MenuItem[] = [
  {cat:"Vodka",name:"Moskovskaya",
   prices:[{label:"combinado",p:9.5},{label:"chupito",p:3}]},
  {cat:"Vodka",name:"Cîroc",
   prices:[{label:"combinado",p:14},{label:"chupito",p:7}]},
  {cat:"Vodka",name:"Beluga",
   prices:[{label:"combinado",p:16},{label:"chupito",p:9}]},
];

const LICORES: MenuItem[] = [
  {cat:"Licores",name:"Jack Fire",
   prices:[{label:"copa",p:9},{label:"chupito",p:5}]},
  {cat:"Licores",name:"Jägermeister",
   prices:[{label:"combinado",p:10},{label:"copa",p:8},{label:"chupito",p:3}]},
  {cat:"Licores",name:"Licor de arroz",
   prices:[{label:"copa",p:6},{label:"chupito",p:3}]},
  {cat:"Licores",name:"Limoncello",
   prices:[{label:"copa",p:6},{label:"chupito",p:3}]},
  {cat:"Licores",name:"Cazalla",
   prices:[{label:"copa",p:6},{label:"chupito",p:3}]},
  {cat:"Licores",name:"Amaretto",
   prices:[{label:"combinado",p:10},{label:"copa",p:8},{label:"chupito",p:3}]},
  {cat:"Licores",name:"Baileys",
   prices:[{label:"copa",p:6},{label:"chupito",p:3}]},
];

const VERMUT: MenuItem[] = [
  {cat:"Vermut",name:"Vittore Rojo",
   prices:[{label:"copa",p:4}]},
  {cat:"Vermut",name:"Vittore Blanco",
   prices:[{label:"copa",p:4}]},
  {cat:"Vermut",name:"Martini Reserva Ambrato",
   prices:[{label:"copa",p:5}]},
  {cat:"Vermut",name:"Martini Reserva Rubino",
   prices:[{label:"copa",p:5}]},
  {cat:"Vermut",name:"Noilly Prat Blanco Seco",
   prices:[{label:"copa",p:5}]},
];

const VINOS: MenuItem[] = [
  {cat:"Vino",name:"Ovejita verde Verdejo",
   prices:[{label:"copa",p:4},{label:"botella",p:20}]},
  {cat:"Vino",name:"Ladrón de Lunas Blanco",
   prices:[{label:"copa",p:4},{label:"botella",p:20}]},
  {cat:"Vino",name:"Ovejita Tinto",
   prices:[{label:"copa",p:4},{label:"botella",p:20}]},
  {cat:"Vino",name:"Brut Cava",
   prices:[{label:"copa",p:5},{label:"botella",p:25}]},
  {cat:"Vino",name:"Bollinger Spécial Cuvée",
   prices:[{label:"botella",p:100}]},
  {cat:"Vino",name:"Ramón Bilbao Rioja",
   prices:[{label:"copa",p:5},{label:"botella",p:25}]},
  {cat:"Vino",name:"Vento n°1",
   prices:[{label:"copa",p:4.5},{label:"botella",p:25}]},
];
const CERVEZAS: MenuItem[] = [
  {cat:"Cerveza",name:"Águila",
   prices:[{label:"pinta",p:5.3},{label:"doble",p:3.7}]},
  {cat:"Cerveza",name:"Águila Sin Filtrar",
   prices:[{label:"pinta",p:5.5},{label:"doble",p:4}]},
  {cat:"Cerveza",name:"18/70",
   prices:[{label:"tercio",p:3.7}]},
  {cat:"Cerveza",name:"Amstel 0.0",
   prices:[{label:"tercio",p:3.5}]},
  {cat:"Cerveza",name:"Amstel Radler",
   prices:[{label:"tercio",p:3.5}]},
  {cat:"Cerveza",name:"Cruzcampo Sin Gluten",
   prices:[{label:"tercio",p:4}]},
  {cat:"Cerveza",name:"Paulaner",
   prices:[{label:"pinta",p:5.5},{label:"doble",p:4}]},
  {cat:"Cerveza",name:"IPA Lagunitas",
   prices:[{label:"botella",p:5.5}]},
  {cat:"Cerveza",name:"Guinness",
    prices:[{label:"tercio",p:5.5}]},
  {cat:"Cerveza",name:"Heineken",
   prices:[{label:"tercio",p:3.5}]},
];

const MICHELADAS: MenuItem[] = [
  {cat:"Micheladas",name:"Michelada Berlín",
    garnish:["Sal","Pimienta","Rodaja de limón"],
    ingredients:[{name:"Cerveza",qty:1,measure:Measure.Top  },{name:"Salsa inglesa",qty:2,measure:Measure.Dashes},{name:"Salsa Tabasco",qty:2,measure:Measure.Dashes},{name:"Zumo de limón",qty:1,measure:Measure.Oz}],

   prices:[{label:"500 ml",p:8}]},
  {cat:"Micheladas",name:"Michelada de Tequila",
    ingredients:[{name:"Cerveza",qty:1,measure:Measure.Top  },{name:"Bitter Habanero",qty:2,measure:Measure.Dashes},{name:"Zumo de limón",qty:1,measure:Measure.Oz},{name:"Tequila",qty:1,measure:Measure.Oz}],
  garnish:["Sal","Pimienta","Rodaja de limón"],
   prices:[{label:"500 ml",p:9}]},
];

const COMIDA: MenuItem[] = [
  {cat:"Comida",name:"Patatas bolsa",
   prices:[{label:"ración",p:1.5}]},
  {cat:"Comida",name:"Aceitunas",
   prices:[{label:"ración",p:2}]},
  {cat:"Comida",name:"Tabla de jamón Gargallo",
   prices:[{label:"tabla",p:12}]},
];

const REFRESCOS: MenuItem[] = [
  {cat:"Refrescos",name:"Pepsi",
   prices:[{label:"lata/botella",p:3}]},
  {cat:"Refrescos",name:"Pepsi Zero",
   prices:[{label:"lata/botella",p:3}]},
  {cat:"Refrescos",name:"Schweppes Limón",
   prices:[{label:"lata/botella",p:3}]},
  {cat:"Refrescos",name:"Tónica Schweppes",
   prices:[{label:"lata/botella",p:3}]},
  {cat:"Refrescos",name:"Ginger Beer",
   prices:[{label:"botella",p:3.5}]},
  {cat:"Refrescos",name:"Red Bull",
   prices:[{label:"lata",p:3.5}]},
  {cat:"Refrescos",name:"Agua Lanjarón",
   prices:[{label:"botella",p:2.5}]},
  {cat:"Refrescos",name:"Agua con gas Perrier",
   prices:[{label:"botella",p:3}]},
  {cat:"Refrescos",name:"Zumos embotellados",
   prices:[{label:"botella",p:3.5}]},
];

const RAW: MenuItem[] = [
  ...CLASSICS,
  ...AUTOR_COCTAILS,
  ...SPRITZ,
  ...JARRAS,
  ...RON,
  ...WHISKY,
  ...GIN,
  ...TEQUILA,
  ...VODKA,
  ...LICORES,
  ...VERMUT,
  ...VINOS,
  ...CERVEZAS,
  ...MICHELADAS,
  ...COMIDA,
  ...REFRESCOS,
];

export default RAW;