import type { MenuItem } from "../constants";


const ACID_TIMES: MenuItem[] = [
  {cat:"Cócteles de autor",family:"Acid Times",name:"Blue Margarita",hasIngr:true,ingr:["Tequila","Licor Bols Blue Curaçao","Sirope de agave","Zumo de lima"],
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Acid Times",name:"Brote Primera",hasIngr:true,ingr:["Gin Tanqueray","Licor yuzu","Azúcar líquido","Lima","Albahaca"],
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Acid Times",name:"Berlin Lemonade",hasIngr:true,ingr:["Jack Daniels Triple Mash","Triple Sec Bols","7UP","Jalea de naranja","Lima"],
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Acid Times",name:"Corazón de Luna",hasIngr:true,ingr:["Tequila","Triple Sec Bols","Lima","Lichee"],
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Acid Times",name:"Berlín Green",hasIngr:true,ingr:["Vodka","Licor Midori","Albahaca","Manzana verde","Maracuya"],
   prices:[{label:"cóctel",p:13}]},
];

const SWEET_TIMES: MenuItem[] = [
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Porn Star Martini",hasIngr:true,ingr:["Moskovskaya","Licor Bols Vainilla","Maracuya","Zumo de lima","Foam"],
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Éxodo",hasIngr:true,ingr:["Bumbu","Bitter caffè","Sirope pandán","Leche de coco","Café"],
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Rubedo",hasIngr:true,ingr:["Gin","Vermut","Sirope de agave","Lima","Arándanos","Fresa"],
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Génesis",hasIngr:true,ingr:["Ron","Ginger Ale","Azúcar líquido","Lima","Calabaza asada","Naranja"],
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Ámbar con cacao",hasIngr:true,ingr:["Ron","Licor Bols Chocolate","Licor Bols Butterscotch","Sirope de vainilla"],
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Diego",hasIngr:true,ingr:["Jack Daniels Fire","Licor Bols Yogurt","Licor Bols Butterscotch","Sirope amarena","Zumo de arándanos"],
   prices:[{label:"cóctel",p:12}]},
];

const SPICY_TIMES: MenuItem[] = [

  {cat:"Cócteles de autor",family:"Spicy Times",name:"Paloma Don Julio",hasIngr:true,ingr:["Tequila Don Julio","Soda de pomelo","Sirope de agave","Lima"],
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Spicy Times",name:"Matarreyes",hasIngr:true,ingr:["Vodka Smirnoff Tamarindo","Licor de humo","Triple Sec Bols","Sirope de agave","Lima","Maracuya"],
   prices:[{label:"cóctel",p:12}]},

];

const HARD_TIMES: MenuItem[] = [
  {cat:"Cócteles de autor",family:"Hard Times",name:"Hombro al sol",hasIngr:true,ingr:["Monkey Shoulder","Fino","Bitter de naranja"],
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Hard Times",name:"Polvo de calima",hasIngr:true,ingr:["Diplomático Planas","Ron jamaicano","Chambord","Zumo de naranja","Zumo de piña","Sirope falernum","Zumo de lima"],
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Hard Times",name:"Berlin Sling",hasIngr:true,ingr:["Gin Mare","Chambord","Bénédictine DOM","Triple Sec Bols","Piña","Lima"],
   prices:[{label:"cóctel",p:12},{label:"cóctel con chupito de vodka",p:13}]},
];

export const AUTOR_COCTAILS: MenuItem[] = [
  ...ACID_TIMES,
  ...SWEET_TIMES,
  ...SPICY_TIMES,
  ...HARD_TIMES,
];
