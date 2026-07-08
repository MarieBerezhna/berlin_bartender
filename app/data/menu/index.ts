import type { MenuItem } from "../constants";
import { CLASSICS } from "./classics";
import { AUTOR_COCTAILS } from "./specialty";

const LEY_SECA: MenuItem[] = [
  {cat:"Sin Alcohol",name:"Virgin Mai Tai",
    ingr:{"Tanqueray 0.0":"2 oz","Sirope de orgeat":"1.5 oz","Sirope falernum":"1.5 oz","Zumo de limón":"1 oz","Zumo de naranja":"0.5 oz","Granadina":"vestir vaso"},
    optional:["Granadina","Rodaja de limón","Hierbabuena"],
  method:"Removido",
   prices:[{label:"sin alcohol",p:8},{label:"con alcohol",p:12}]},
    {cat:"Sin Alcohol",name:"Gin Fizz 0.0",
    ingr:{"Tanqueray 0.0":"2 oz","Zumo de limón":"1 oz","Azúcar líquido":"0.75 oz","Foam":null,"Soda":"top"},
    method:"Agitado, Colado",
   prices:[{label:"cóctel",p:9}]},
    {cat:"Sin Alcohol",name:"Virgin Lady",
    ingr:{"Tanqueray 0.0":"2 oz","Zumo de limón":"1 oz","Azúcar líquido":"0.5 oz","Foam":null},
    method:"Agitado, Colado",
    prices:[{label:"cóctel",p:9}]},
    {cat:"Sin Alcohol",name:"Virgin Pink Lady",
    ingr:{"Tanqueray 0.0":"2 oz","Zumo de limón":"1 oz","Granadina":"0.5 oz","Foam":null},
    method:"Agitado, Colado",
   prices:[{label:"cóctel",p:9}]},
];

const SPRITZ: MenuItem[] = [
  {cat:"Spritz",name:"Hugo Spritz",ingr:{"Bols Saúco":"2 oz","Cava":"3 oz","Soda":"1 oz","Hierbabuena":null},
   prices:[{label:"copa",p:10}]},
  {cat:"Spritz",name:"Aperol Spritz",ingr:{"Aperol":"2 oz","Cava":"3 oz","Soda":"1 oz"},
   prices:[{label:"copa",p:8}]},
  {cat:"Spritz",name:"Yuzu Spritz",ingr:{"Licor yuzu":"2 oz","Cava":"3 oz","Soda":"1 oz"},
   prices:[{label:"copa",p:8}]},
  {cat:"Spritz",name:"Chambord Spritz",ingr:{"Chambord":"2 oz","Cava":"3 oz","Soda":"1 oz"},
   prices:[{label:"copa",p:8}]},
  {cat:"Spritz",name:"Campari Spritz",ingr:{"Campari":"2 oz","Cava":"3 oz","Soda":"1 oz"},
   prices:[{label:"copa",p:8}]},
  {cat:"Spritz",name:"Sarti Rosa Spritz",ingr:{"Sarti Rosa":"2 oz","Cava":"3 oz","Soda":"1 oz"},
   prices:[{label:"copa",p:8}]},
];

const JARRAS: MenuItem[] = [
  {cat:"Jarras",name:"Agua de Valencia",ingr:{"Vodka":"1 oz","Gin Tanqueray":"1 oz","Zumo de naranja":"2 oz","Cava":"2 oz","Triple Sec Bols":null,"Licor mandarina MB":null,"Azúcar líquido":null},
    prices:[{label:"copa",p:7},{label:"jarra",p:25}]},
  {cat:"Jarras",name:"Sangría",ingr:{"Diplomático Planas":null,"Vino tinto":null,"Triple Sec Bols":null,"Terry":null,"Vermut tinto":null,"Zumo de naranja":null,"Azúcar líquido":null},
    prices:[{label:"copa",p:7},{label:"jarra",p:25}]},
  {cat:"Jarras",name:"Tinto de verano",ingr:{"Vino tinto":null,"Schweppes limón":null,"Zumo de limón":null},
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
   prices:[{label:"solo",p:9.5}]},
  {cat:"Gin",name:"Tanqueray Nº Ten",
   prices:[{label:"solo",p:14}]},
  {cat:"Gin",name:"Tanqueray 0.0",
   prices:[{label:"solo",p:10}]},
  {cat:"Gin",name:"Gin Mare",
   prices:[{label:"solo",p:12}]},
  {cat:"Gin",name:"Fords",
   prices:[{label:"solo",p:12}]},
  {cat:"Gin",name:"Larios 12",
   prices:[{label:"solo",p:12}]},
  {cat:"Gin",name:"Larios Rose",
   prices:[{label:"solo",p:10}]},
  {cat:"Gin",name:"Roku",
   prices:[{label:"solo",p:12}]},
  {cat:"Gin",name:"Hendrick's",
   prices:[{label:"solo",p:13}]},
  {cat:"Gin",name:"Macaronesia",
   prices:[{label:"solo",p:9.5}]},
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
  {cat:"Micheladas",name:"Michelada Berlín",ingr:{"Cerveza":"top","Zumo de limón":"1 oz","Sal":null,"Salsa inglesa":"1/2 tbsp","Tabasco":"6-8 dashes"},
   prices:[{label:"500 ml",p:8}]},
  {cat:"Micheladas",name:"Michelada de Tequila",ingr:{"Cerveza":"top","Tequila":"1.5 oz","Bitter habanero":"4-6 dashes","Zumo de limón":"1 oz","Sal":null},
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
];

const RAW: MenuItem[] = [
  ...CLASSICS,
  ...AUTOR_COCTAILS,
  ...LEY_SECA,
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