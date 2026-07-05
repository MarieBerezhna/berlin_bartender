import * as RAW from "./menu.js";

export const ALL_INGRS = [...new Set(RAW.filter(x=>x.hasIngr&&x.ingr).flatMap(x=>x.ingr))];
// Flat list of all {name, serving_es, serving_en, price} for wrong-answer pool
export const ALL_PRICES_FLAT = RAW.flatMap(x=>(x.prices||[]).map(s=>s.p));
export const UNIQUE_PRICES = [...new Set(ALL_PRICES_FLAT)];

export const CATS = ["Todo",...[...new Set(RAW.map(x=>x.cat))]];
export const AUTOR_CAT    = "Cócteles de autor";
export const CLASICA_CAT  = "Coctelería clásica";
export const DESTILADOS_TAB = "Destilados";
export const DESTILADOS_CATS = ["Ron","Whisky","Gin","Tequila","Vodka"];
export const DESTILADOS_SUBGROUPS = ["Tequila","Gin","Vodka","Ron","Whisky"];
export const CAT_DESCRIPTIONS = {
  "Spritz": "Un spritz es un famoso y refrescante cóctel de origen italiano que se sirve principalmente como aperitivo. Su receta clásica combina tres elementos fundamentales: vino blanco espumoso (generalmente Prosecco), un licor amargo (bitter) y un chorrito de agua con gas (soda). La regla de oro del cóctel italiano clásico sigue la proporción 3-2-1: tres partes de prosecco o cava, 2 partes de bitter y 1 de soda.",
  "Licores": "Un licor es una bebida alcohólica elaborada a partir de un destilado al que se le añaden azúcar y aromas o sabores, como frutas, hierbas, especias, café o frutos secos. Suele tener un sabor dulce e intenso y puede consumirse solo o utilizarse como ingrediente para aportar sabor y color a los cócteles.",
  "Vodka": "El vodka es una bebida alcohólica destilada elaborada principalmente a partir de cereales o patatas. Se caracteriza por su sabor limpio y neutro, ya que suele filtrarse varias veces para eliminar impurezas. Gracias a su perfil discreto, es una de las bases más versátiles de la coctelería y se utiliza en cócteles como el Moscow Mule, Bloody Mary, Cosmopolitan y Espresso Martini.",
  "Tequila": "El tequila es una bebida alcohólica destilada elaborada exclusivamente a partir del agave azul. Se produce en determinadas regiones de México y puede ser transparente o envejecida en barricas, según el tipo. Destaca por sus notas herbales, vegetales y ligeramente dulces, y es una base fundamental de cócteles como la Margarita y el Paloma.",
  "Gin": "El gin (ginebra) es una bebida alcohólica destilada elaborada a partir de alcohol neutro y aromatizada principalmente con bayas de enebro, que le aportan su sabor característico. También puede contener otros botánicos, como cilantro, cítricos, raíz de angélica o cardamomo. Se utiliza ampliamente en la coctelería clásica por su perfil fresco, seco y herbal.",
  "Whisky": "El whisky es una bebida alcohólica destilada elaborada a partir de cereales, como cebada, maíz, centeno o trigo. Tras la destilación se envejece en barricas de roble durante varios años, lo que le aporta su color, aroma y sabores característicos, como vainilla, caramelo, especias o madera. Es una de las bases más importantes de la coctelería clásica y también se consume solo o con hielo.",
  "Ron": "El ron es una bebida alcohólica destilada que se elabora principalmente a partir de la caña de azúcar, ya sea del jugo de caña o de la melaza (un subproducto de la producción de azúcar). Su proceso incluye fermentar los azúcares de la caña, destilar el líquido fermentado y, en muchos casos, envejecer el destilado en barricas de madera.<br><br><strong>Tipos de ron:</strong><br>• <em>Ron blanco</em> — ligero y transparente, muy usado en cócteles.<br>• <em>Ron dorado</em> — envejecido por un tiempo moderado, sabor más intenso.<br>• <em>Ron añejo</em> — envejecido varios años, sabores más complejos.<br>• <em>Ron especiado</em> — con especias y otros aromas añadidos.<br><br>Se consume solo, con hielo o en cócteles como el mojito, la piña colada o el daiquiri.",
};
export const AUTOR_FAMILIES  = [...new Set(RAW.filter(x=>x.cat===AUTOR_CAT  && x.family).map(x=>x.family))];
export const CLASICA_FAMILIES = [...new Set(RAW.filter(x=>x.cat===CLASICA_CAT && x.family).map(x=>x.family))];
// badge colors per section type
export const AUTOR_COLOR  = "rgba(240,149,149,0.15)";  // pinkish
export const CLASICA_COLOR = "rgba(138,180,248,0.15)"; // blue-ish
export const AUTOR_TEXT   = "#F09595";
export const CLASICA_TEXT = "#8AB4F8";
let activeFamily = null; // null = all families
export const FILTER_TYPES = ["ingredients","price","category","name"];
export const FILTER_LABELS    = {ingredients:"Ingredientes",price:"Precio",category:"Categoría",name:"Nombre"};
export const Q_META = {
  ingredients:  "¿Qué lleva?",
  ingredients2: "¿Cuál más?",
  ingredients3: "¿Cuál NO lleva?",
  price:        "Precio exacto",
  ratio:        "Ratio",
  category:     "Categoría",
  name:         "Nombre",
};
export const MENU_SPIRIT_HINTS = new Set(['Tequila','Tequila Don Julio','Gin','Gin Tanqueray','Gin Mare','Vodka','Moskovskaya','Vodka Smirnoff Tamarindo','Ron','Ron blanco','Ron jamaicano','Bumbu','Diplomático Planas','Jack Daniels Fire','Jack Daniels Triple Mash','Monkey Shoulder','Whisky','Whiskey','Fino']);
