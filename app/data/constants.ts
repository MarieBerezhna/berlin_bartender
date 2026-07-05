import RAW from "./menu";

export interface MenuPrice {
  label: string;
  p: number;
}

export interface MenuItem {
  cat: string;
  name: string;
  family?: string;
  hasIngr?: boolean;
  ingr?: string[];
  optional?: string[];
  doses?: Record<string, string>;
  method?: string;
  glass?: string;
  prices?: MenuPrice[];
}

const MENU: MenuItem[] = RAW as MenuItem[];

export const ALL_INGRS: string[] = [
  ...new Set(
    MENU.filter((x): x is MenuItem & { ingr: string[] } => Boolean(x.hasIngr && x.ingr)).flatMap(
      (x) => x.ingr,
    ),
  ),
];
// Flat list of all {name, serving_es, serving_en, price} for wrong-answer pool
export const ALL_PRICES_FLAT: number[] = MENU.flatMap((x) => (x.prices || []).map((s) => s.p));
export const UNIQUE_PRICES: number[] = [...new Set(ALL_PRICES_FLAT)];

export const CATS: string[] = ["Todo", ...[...new Set(MENU.map((x) => x.cat))]];
export const AUTOR_CAT    = "Cócteles de autor";
export const CLASICA_CAT  = "Coctelería clásica";
export const DESTILADOS_TAB = "Destilados";
export const DESTILADOS_CATS = ["Ron","Whisky","Gin","Tequila","Vodka"];
export const DESTILADOS_SUBGROUPS = ["Tequila","Gin","Vodka","Ron","Whisky"];
export const CAT_DESCRIPTIONS = {
  "Daiquiri": "<strong>Fórmula común</strong><br><br>• 2 oz (60 ml) de destilado base<br>• 3/4 oz (22,5 ml) de zumo cítrico fresco<br>• 3/4 oz (22,5 ml) de endulzante<br>• Agitar con hielo<br>• Doble colado (opcional)<br>• Servir sin hielo o sobre hielo fresco, según el cóctel",
  "Highball": "<strong>Fórmula común</strong><br><br>• 2 oz de destilado base<br>• Completar con un mezclador (soda, tónica, cola, ginger beer, etc.)<br>• Servir directamente en un vaso alto con hielo<br>• Decorar según la receta",
  "Sidecar": "<strong>Fórmula común</strong><br><br>• <strong>2 oz</strong> de destilado base<br>• <strong>3/4 oz</strong> de zumo de cítrico fresco<br>• <strong>3/4 oz</strong> de licor<br>• Agitar con hielo<br>• Doble colado en una copa coupé previamente enfriada<br>• Decorar con un twist de cítrico (o escarchar el borde con azúcar o sal, según la receta; por ejemplo, en un <strong>Sidecar</strong> o una <strong>Margarita</strong>)",
  "Old Fashioned": "<strong>Fórmula común</strong><br><br>• <strong>2 oz (60 ml)</strong> de destilado base<br>• <strong>1/4 oz (7,5 ml/1.5 cucharaditas)</strong> de endulzante<br>• <strong>2-3 golpes</strong> de bitters<br>• Remover con hielo<br>• Servir sobre un cubo grande de hielo<br>• Una piel de naranja (o de limón, según la receta)",
  "Martini": "<strong>Fórmula común</strong><br><br>• 2 oz (60 ml) de destilado base<br>• 1/2-1 oz (15-30 ml) de vino fortificado (vermut, jerez, Lillet, etc.)<br>• Remover con hielo<br>• Colar en una copa previamente enfriada<br>• Decorar con un twist de limón, una aceituna o una cebollita encurtida (en el caso del Gibson)",
  "Spritz": "Un spritz es un famoso y refrescante cóctel de origen italiano que se sirve principalmente como aperitivo. Su receta clásica combina tres elementos fundamentales: vino blanco espumoso (generalmente Prosecco), un licor amargo (bitter) y un chorrito de agua con gas (soda). La regla de oro del cóctel italiano clásico sigue la proporción 3-2-1: tres partes de prosecco o cava, 2 partes de bitter y 1 de soda.",
  "Licores": "Un licor es una bebida alcohólica elaborada a partir de un destilado al que se le añaden azúcar y aromas o sabores, como frutas, hierbas, especias, café o frutos secos. Suele tener un sabor dulce e intenso y puede consumirse solo o utilizarse como ingrediente para aportar sabor y color a los cócteles.",
  "Vodka": "El vodka es una bebida alcohólica destilada elaborada principalmente a partir de cereales o patatas. Se caracteriza por su sabor limpio y neutro, ya que suele filtrarse varias veces para eliminar impurezas. Gracias a su perfil discreto, es una de las bases más versátiles de la coctelería y se utiliza en cócteles como el Moscow Mule, Bloody Mary, Cosmopolitan y Espresso Martini.",
  "Tequila": "El tequila es una bebida alcohólica destilada elaborada exclusivamente a partir del agave azul. Se produce en determinadas regiones de México y puede ser transparente o envejecida en barricas, según el tipo. Destaca por sus notas herbales, vegetales y ligeramente dulces, y es una base fundamental de cócteles como la Margarita y el Paloma.",
  "Gin": "El gin (ginebra) es una bebida alcohólica destilada elaborada a partir de alcohol neutro y aromatizada principalmente con bayas de enebro, que le aportan su sabor característico. También puede contener otros botánicos, como cilantro, cítricos, raíz de angélica o cardamomo. Se utiliza ampliamente en la coctelería clásica por su perfil fresco, seco y herbal.",
  "Whisky": "El whisky es una bebida alcohólica destilada elaborada a partir de cereales, como cebada, maíz, centeno o trigo. Tras la destilación se envejece en barricas de roble durante varios años, lo que le aporta su color, aroma y sabores característicos, como vainilla, caramelo, especias o madera. Es una de las bases más importantes de la coctelería clásica y también se consume solo o con hielo.",
  "Ron": "El ron es una bebida alcohólica destilada que se elabora principalmente a partir de la caña de azúcar, ya sea del jugo de caña o de la melaza (un subproducto de la producción de azúcar). Su proceso incluye fermentar los azúcares de la caña, destilar el líquido fermentado y, en muchos casos, envejecer el destilado en barricas de madera.<br><br><strong>Tipos de ron:</strong><br>• <em>Ron blanco</em> — ligero y transparente, muy usado en cócteles.<br>• <em>Ron dorado</em> — envejecido por un tiempo moderado, sabor más intenso.<br>• <em>Ron añejo</em> — envejecido varios años, sabores más complejos.<br>• <em>Ron especiado</em> — con especias y otros aromas añadidos.<br><br>Se consume solo, con hielo o en cócteles como el mojito, la piña colada o el daiquiri.",
};
export const AUTOR_FAMILIES: string[] = [
  ...new Set(
    MENU.filter((x) => x.cat === AUTOR_CAT && x.family)
      .map((x) => x.family)
      .filter((family): family is string => Boolean(family)),
  ),
];
const CLASICA_FAMILY_ORDER = ["Inclasificables", "Old Fashioned", "Martini", "Sidecar", "Daiquiri", "Highball", "Flip"];
const CLASICA_FAMILIES_FOUND: string[] = [
  ...new Set(
    MENU.filter((x) => x.cat === CLASICA_CAT && x.family)
      .map((x) => x.family)
      .filter((family): family is string => Boolean(family)),
  ),
];
export const CLASICA_FAMILIES: string[] = [
  ...CLASICA_FAMILY_ORDER,
  ...CLASICA_FAMILIES_FOUND.filter((family) => !CLASICA_FAMILY_ORDER.includes(family)),
];
// badge colors per section type
export const AUTOR_COLOR  = "rgba(240,149,149,0.15)";  // pinkish
export const CLASICA_COLOR = "rgba(138,180,248,0.15)"; // blue-ish
export const AUTOR_TEXT   = "#F09595";
export const CLASICA_TEXT = "#8AB4F8";
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
export const MENU_SPIRIT_HINTS = new Set(['Tequila','Tequila blanco','Tequila reposado','Tequila Don Julio','Gin','Gin Tanqueray','Gin Mare','Vodka','Moskovskaya','Vodka Smirnoff Tamarindo','Ron','Ron blanco','Ron oscuro','Ron jamaicano','Bumbu','Diplomático Planas','Jack Daniels Fire','Jack Daniels Triple Mash','Monkey Shoulder','Whisky','Whiskey','Whisky (o Bourbon)','Bourbon','Fino','Cognac']);
export const INGR_GROUP: Record<string, string> = {
  "Tequila":"spirit","Tequila blanco":"spirit","Tequila reposado":"spirit","Tequila Don Julio":"spirit","Gin":"spirit","Gin Tanqueray":"spirit",
  "Gin Mare":"spirit","Vodka":"spirit","Moskovskaya":"spirit","Vodka Smirnoff Tamarindo":"spirit",
  "Ron":"spirit","Ron blanco":"spirit","Ron oscuro":"spirit","Ron jamaicano":"spirit","Bumbu":"spirit","Diplomático Planas":"spirit",
  "Jack Daniels Fire":"spirit","Jack Daniels Triple Mash":"spirit","Monkey Shoulder":"spirit",
  "Whisky":"spirit","Whiskey":"spirit","Whisky (o Bourbon)":"spirit","Bourbon":"spirit","Fino":"spirit","Tanqueray 0.0":"spirit","Cognac":"spirit",
  "Triple Sec Bols":"liqueur","Triple sec":"liqueur","Licor Bols Blue Curaçao":"liqueur","Licor yuzu":"liqueur",
  "Cerveza":"beer","Guinness":"beer","Paulaner":"beer","Águila":"beer","Heineken":"beer",
  "Licor Midori":"liqueur","Licor de café Bols":"liqueur",
  "Licor de humo":"liqueur","Licor Bols Vainilla":"liqueur","Licor mandarina MB":"liqueur",
  "Licor Bols Chocolate":"liqueur","Licor Bols Butterscotch":"liqueur","Licor Bols Yogurt":"liqueur",
  "Chambord":"liqueur","Bénédictine DOM":"liqueur","Drambuie":"liqueur","Licor de maraschino":"liqueur","Crème de violette":"liqueur",
  "Aperol":"liqueur","Campari":"liqueur","Sarti Rosa":"liqueur","Bols Saúco":"liqueur","Terry":"liqueur",
  "Curaçao":"liqueur",
  "Vino tinto":"wine","Vermut":"wine","Vermut tinto":"wine","Vermut seco":"wine",
  "7UP":"filler","Cava":"filler","Soda":"filler","Soda de pomelo":"filler","Ginger Ale":"filler",
  "Ginger beer":"filler","Refresco de pomelo":"filler","Pepsi":"filler","Schweppes limón":"filler","Zumo de tomate":"filler",
  "Zumo de naranja":"filler","Zumo de piña":"filler","Zumo de arándanos":"filler",
  "Zumo de limón":"filler","Zumo de lima":"filler",
  "Bitter":"bitter","Bitter caffè":"bitter","Bitter de cacao":"bitter","Bitter de naranja":"bitter",
  "Angostura Bitters":"bitter",
  "Bitter habanero":"bitter","Salsa inglesa":"bitter","Tabasco":"bitter",
  "Sirope":"sweet","Sirope amarena":"sweet","Sirope de agave":"sweet","Granadina":"sweet","Sirope de orgeat":"sweet",
  "Azúcar líquido":"sweet","Sirope de vainilla":"sweet","Sirope falernum":"sweet",
  "Sirope pandán":"sweet","Jalea de naranja":"sweet",
  "Arándanos":"fruit","Fresa":"fruit","Piña":"fruit","Fruta de la pasión":"fruit",
  "Puré de fruta de la pasión":"fruit","Lichee":"fruit","Frutos rojos":"fruit",
  "Manzana verde":"fruit","Calabaza asada":"fruit","Maracuyá":"fruit",
  "Frutas tropicales":"fruit","Lima":"fruit","Naranja":"fruit",
};
export const GARNISHMENTS = new Set([
  "Hierbabuena","Albahaca","Menta","Romero","Tomillo","Perejil",
  "Lima","Limón","Naranja","Limón verde","Rodajas de limón","Rodajas de lima",
  "Coco","Café","Nata","Leche","Foam",
  "Arándanos","Fresa","Piña","Fruta de la pasión","Lichee","Frutos rojos","Manzana verde",
  "Calabaza asada","Maracuyá"
]);
export const GROUP_ORDER = ["spirit","liqueur","filler","bitter","sweet","other"];
export const GROUP_LABELS: Record<string, string> = {
  spirit:"Alcohol", liqueur:"Licores", filler:"Mezcladores",
  bitter:"Amargos", sweet:"Endulzantes", other:"Otros"
};