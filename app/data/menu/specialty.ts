import type { MenuItem } from "../constants";


const ACID_TIMES: MenuItem[] = [
  {cat:"Cócteles de autor",family:"Acid Times",name:"Blue Margarita",ingr:{"Tequila":null,"Licor Bols Blue Curaçao":null,"Sirope de agave":null,"Zumo de lima":null},
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Acid Times",name:"Brote Primera",ingr:{"Gin Tanqueray":null,"Licor yuzu":null,"Azúcar líquido":null,"Lima":null,"Albahaca":null},
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Acid Times",name:"Berlin Lemonade",ingr:{"Jack Daniels Triple Mash":null,"Triple Sec Bols":null,"7UP":null,"Jalea de naranja":null,"Lima":null},
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Acid Times",name:"Corazón de Luna",ingr:{"Tequila":null,"Triple Sec Bols":null,"Lima":null,"Lichee":null},
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Acid Times",name:"Berlín Green",ingr:{"Vodka":null,"Licor Midori":null,"Albahaca":null,"Manzana verde":null,"Maracuya":null},
   prices:[{label:"cóctel",p:13}]},
];

const SWEET_TIMES: MenuItem[] = [
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Porn Star Martini",ingr:{"Moskovskaya":null,"Licor Bols Vainilla":null,"Maracuya":null,"Zumo de lima":null,"Foam":null},
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Éxodo",ingr:{"Bumbu":null,"Bitter caffè":null,"Sirope pandán":null,"Leche de coco":null,"Café":null},
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Rubedo",ingr:{"Gin":null,"Vermut":null,"Sirope de agave":null,"Lima":null,"Arándanos":null,"Fresa":null},
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Génesis",ingr:{"Ron":null,"Ginger Ale":null,"Azúcar líquido":null,"Lima":null,"Calabaza asada":null,"Naranja":null},
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Ámbar con cacao",ingr:{"Ron":null,"Licor Bols Chocolate":null,"Licor Bols Butterscotch":null,"Sirope de vainilla":null},
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Sweet Times",name:"Diego",ingr:{"Jack Daniels Fire":null,"Licor Bols Yogurt":null,"Licor Bols Butterscotch":null,"Sirope amarena":null,"Zumo de arándanos":null},
   prices:[{label:"cóctel",p:12}]},
];

const SPICY_TIMES: MenuItem[] = [
  {cat:"Cócteles de autor",family:"Spicy Times",name:"Paloma Don Julio",ingr:{"Tequila Don Julio":null,"Soda de pomelo":null,"Sirope de agave":null,"Lima":null},
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Spicy Times",name:"Matarreyes",ingr:{"Vodka Smirnoff Tamarindo":null,"Licor de humo":null,"Triple Sec Bols":null,"Sirope de agave":null,"Lima":null,"Maracuya":null},
   prices:[{label:"cóctel",p:12}]},

];

const HARD_TIMES: MenuItem[] = [
  {cat:"Cócteles de autor",family:"Hard Times",name:"Hombro al sol",ingr:{"Monkey Shoulder":null,"Fino":null,"Bitter de naranja":null},
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Hard Times",name:"Polvo de calima",ingr:{"Diplomático Planas":null,"Ron jamaicano":null,"Chambord":null,"Zumo de naranja":null,"Zumo de piña":null,"Sirope falernum":null,"Zumo de lima":null},
   prices:[{label:"cóctel",p:12}]},
  {cat:"Cócteles de autor",family:"Hard Times",name:"Berlin Sling",ingr:{"Gin Mare":null,"Chambord":null,"Bénédictine DOM":null,"Triple Sec Bols":null,"Piña":null,"Lima":null},
   prices:[{label:"cóctel",p:12},{label:"cóctel con chupito de vodka",p:13}]},
];

export const AUTOR_COCTAILS: MenuItem[] = [
  ...ACID_TIMES,
  ...SWEET_TIMES,
  ...SPICY_TIMES,
  ...HARD_TIMES,
];