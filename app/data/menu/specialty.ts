import type { MenuItem } from "../constants";


const ACID_TIMES: MenuItem[] = [
  {cat:"Cócteles de autor",family:"Acid Times",name:"Blue Margarita",
    ingr:{"Tequila":"2 oz","Licor Bols Blue Curaçao":"1 oz","Sirope de agave":"0.5 oz","Zumo de lima":"1 oz"},
    method:"Agitado, Colado",
    glass:"Coupe / Martini",
    prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Acid Times",name:"Brote Primavera",
  ingr:{"Gin Tanqueray":"2 oz","Licor yuzu":"0.5 oz","Azúcar líquido":'0.5 oz'},
  garnish:["Albahaca", "lima"],
  method:"Agitado, Colado",
  glass:"Vaso bajo",
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Acid Times",name:"Berlin Lemonade",
    ingr:{"Jack Daniels Triple Mash":"1.5 oz","Triple Sec Bols":"0.5 oz","Bitter de naranja":"2 golpes","Zumo de limón":"1.33 oz","7UP":"top"},
       method:"Agitado, Colado",
    glass:"Vaso largo",
    prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Acid Times",name:"Corazón de Luna",
    ingr:{"Tequila":"2 oz","Triple Sec Bols":"1 oz","Zumo de lima":"1 oz","Lichee":"0.5 oz"},
    method:"Agitado, Colado",
    glass:"Coupe / Martini",
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Acid Times",name:"Berlín Green",
    ingr:{"Vodka":"2 oz","Licor Midori":"1 oz","Manzana verde":"0.5 oz","Maracuya":"0.5 oz", "Manzana verde natural triturada":"0.75 oz"},
    garnish:["Albahaca (5-6 hojas dentro del vaso), 0.25 manzana verde natural en el borde del vaso"],
    method:"Agitado, Colado",
    glass:"Vaso largo",
   prices:[{label:"cóctel",p:13}]},
];

const SWEET_TIMES: MenuItem[] = [
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Porn Star Martini",
    ingr:{"Vodka":"2 oz","Licor Bols Vainilla":"0.5 oz","Maracuya":"1 oz","Zumo de lima":"0.5 oz","sirope de vainilla":"1 golpe","Espumita":"2 golpes"},
    garnish:["Viene con un chupito de Cava o Prosecco"],
    method:"Agitado, Colado",
    glass:"Coupe / Martini",
    prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Éxodo",
    ingr:{"Bumbu":"2 oz","Bitter caffè":"2 golpes","Sirope pandán":"0.66 oz","Leche de coco":"0.5 oz","Café":"2.66 oz"},
    method:"Agitado, Colado",
    glass:"Vaso largo",
    prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Rubedo",
    ingr:{"Gin":"2 oz","Vermut":"1 oz","Zumo de lima":"1 oz","Sirope de agave":"0.5 oz","Arándanos":"0.5 oz","Fresa":"0.5 oz"},
    method:"Agitado, Colado",
    glass:"Vaso largo",
    prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Génesis", // TODO
    ingr:{"Ron":null,"Ginger Ale":null,"Azúcar líquido":null,"Lima":null,"Calabaza asada":null,"Naranja":null},
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Ámbar con cacao",
    ingr:{"Ron":"2 oz","Licor Bols Butterscotch":"1 oz","Sirope de vainilla":"1 oz", "Licor Bols Chocolate":"0.5 oz"},
    method:"Agitado, Colado",
    glass:"Vaso largo",
    prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Diego",
    ingr:{"Jack Daniels Fire":"1 oz","Licor Bols Yogurt":"1 oz","Licor Bols Butterscotch":"1 oz", "Zumo de arándanos":"1 oz", "Sirope amarena":"~0.8 oz"},
    method:"Removido",
    glass:"Vaso largo o jarrita de bayas (preferiblemente)",
    prices:[{label:"cóctel",p:12}]},
];

const SPICY_TIMES: MenuItem[] = [
  {cat:"Cócteles de autor",family:"Spicy Times",name:"Paloma Don Julio",
    ingr:{"Tequila Don Julio":"2 oz","Sirope de agave":"0.5 oz","Zumo de lima":"0.5 oz","Soda de pomelo":"top"},
    garnish:["Rodaja de lima", "sal en el borde del vaso"],
    method:"Removido",
    glass:"Vaso largo",
    prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Spicy Times",name:"Matarreyes", // TODO
    ingr:{"Vodka Smirnoff Tamarindo":null,"Licor de humo":null,"Triple Sec Bols":null,"Sirope de agave":null,"Lima":null,"Maracuya":null},
   prices:[{label:"cóctel",p:12}]},

];

const HARD_TIMES: MenuItem[] = [
  {cat:"Cócteles de autor",family:"Hard Times",name:"Hombro al sol", // TODO
    ingr:{"Monkey Shoulder":null,"Fino":null,"Bitter de naranja":null},
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Hard Times",name:"Polvo de calima", // TODO
    ingr:{"Diplomático Planas":null,"Ron jamaicano":null,"Chambord":null,"Zumo de naranja":null,"Zumo de piña":null,"Sirope falernum":null,"Zumo de lima":null},
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Hard Times",name:"Berlin Sling", // TODO
    ingr:{"Gin Mare":null,"Chambord":null,"Bénédictine DOM":null,"Triple Sec Bols":null,"Piña":null,"Lima":null},
   prices:[{label:"cóctel",p:12},{label:"cóctel con chupito de vodka",p:13}]},
];

export const AUTOR_COCTAILS: MenuItem[] = [
  ...ACID_TIMES,
  ...SWEET_TIMES,
  ...SPICY_TIMES,
  ...HARD_TIMES,
];