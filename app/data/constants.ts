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
export const CLASICA_FAMILIES: string[] = [
  ...new Set(
    MENU.filter((x) => x.cat === CLASICA_CAT && x.family)
      .map((x) => x.family)
      .filter((family): family is string => Boolean(family)),
  ),
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
export const MENU_SPIRIT_HINTS = new Set(['Tequila','Tequila Don Julio','Gin','Gin Tanqueray','Gin Mare','Vodka','Moskovskaya','Vodka Smirnoff Tamarindo','Ron','Ron blanco','Ron jamaicano','Bumbu','Diplomático Planas','Jack Daniels Fire','Jack Daniels Triple Mash','Monkey Shoulder','Whisky','Whiskey','Fino']);
export const INGR_GROUP: Record<string, string> = {
  "Tequila":"spirit","Tequila Don Julio":"spirit","Gin":"spirit","Gin Tanqueray":"spirit",
  "Gin Mare":"spirit","Vodka":"spirit","Moskovskaya":"spirit","Vodka Smirnoff Tamarindo":"spirit",
  "Ron":"spirit","Ron blanco":"spirit","Ron jamaicano":"spirit","Bumbu":"spirit","Diplomático Planas":"spirit",
  "Jack Daniels Fire":"spirit","Jack Daniels Triple Mash":"spirit","Monkey Shoulder":"spirit",
  "Whisky":"spirit","Whiskey":"spirit","Fino":"spirit","Tanqueray 0.0":"spirit",
  "Triple Sec Bols":"liqueur","Licor Bols Blue Curaçao":"liqueur","Licor yuzu":"liqueur",
  "Cerveza":"beer","Guinness":"beer","Paulaner":"beer","Águila":"beer","Heineken":"beer",
  "Licor Midori":"liqueur","Licor de café Bols":"liqueur",
  "Licor de humo":"liqueur","Licor Bols Vainilla":"liqueur","Licor mandarina MB":"liqueur",
  "Licor Bols Chocolate":"liqueur","Licor Bols Butterscotch":"liqueur","Licor Bols Yogurt":"liqueur",
  "Chambord":"liqueur","Bénédictine DOM":"liqueur",
  "Aperol":"liqueur","Campari":"liqueur","Sarti Rosa":"liqueur","Bols Saúco":"liqueur","Terry":"liqueur",
  "Vino tinto":"wine","Vermut":"wine","Vermut tinto":"wine",
  "7UP":"filler","Cava":"filler","Soda":"filler","Soda de pomelo":"filler","Ginger Ale":"filler",
  "Ginger beer":"filler","Schweppes limón":"filler","Zumo de tomate":"filler",
  "Zumo de naranja":"filler","Zumo de piña":"filler","Zumo de arándanos":"filler",
  "Zumo de limón":"filler","Zumo de lima":"filler",
  "Bitter":"bitter","Bitter caffè":"bitter","Bitter de cacao":"bitter","Bitter de naranja":"bitter",
  "Bitter habanero":"bitter","Salsa inglesa":"bitter","Tabasco":"bitter",
  "Sirope":"sweet","Sirope amarena":"sweet","Sirope de agave":"sweet",
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
  spirit:"Alcohol / Spirit", liqueur:"Licores / Liqueurs", filler:"Mixers / Sodas",
  bitter:"Bitters", sweet:"Endulzantes / Sweeteners", other:"Otros / Other"
};