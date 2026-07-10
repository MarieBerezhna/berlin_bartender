import RAW from "./menu";

export interface MenuPrice {
  label: string;
  p: number;
}

export interface MenuItem {
  cat: string;
  name: string;
  family?: string;
  ingr?: Record<string, string | null>;
  optional?: string[];
  garnish?: string[];
  method?: string;
  glass?: string;
  prices?: MenuPrice[];
}

export function getIngr(item: MenuItem): string[] {
  return Object.keys(item.ingr || {});
}

const MENU: MenuItem[] = RAW as MenuItem[];

export const ALL_INGRS: string[] = [
  ...new Set(
    MENU.filter((x) => getIngr(x).length > 0).flatMap((x) => getIngr(x)),
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
  "Flip": `A flip is a class of mixed drink. According to the Oxford English Dictionary, the term was first used in 1695 to describe a mixture of beer, rum, and sugar, heated with a red-hot iron. The drink has evolved, egg was added, the sugar proportion increased, beer was removed, and it ceased to be served hot.
The first bar guide to feature a flip was Jerry Thomas' 1862 How to Mix Drinks; or, The Bon-Vivant's Companion. In this work, Thomas declared that "the essential in flips of all sorts is to produce the smoothness by repeated pouring back and forward between two vessels and beating up the eggs well in the first instance the sweetening and spices according to taste."
Over time, U.S. bar guides clarified the difference between eggnog and a flip. Eggnog contains a spirit, egg, cream, sugar, and spice, while a flip contains the same ingredients, but without cream.`,
  "Spritz": "Un spritz es un famoso y refrescante cóctel de origen italiano que se sirve principalmente como aperitivo. Su receta clásica combina tres elementos fundamentales: vino blanco espumoso (generalmente Prosecco), un licor amargo (bitter) y un chorrito de agua con gas (soda). La regla de oro del cóctel italiano clásico sigue la proporción 3-2-1: tres partes de prosecco o cava, 2 partes de bitter y 1 de soda.",
  "Licores": "Un licor es una bebida alcohólica elaborada a partir de un destilado al que se le añaden azúcar y aromas o sabores, como frutas, hierbas, especias, café o frutos secos. Suele tener un sabor dulce e intenso y puede consumirse solo o utilizarse como ingrediente para aportar sabor y color a los cócteles.",
  "Vodka": "El vodka es una bebida alcohólica destilada elaborada principalmente a partir de cereales o patatas. Se caracteriza por su sabor limpio y neutro, ya que suele filtrarse varias veces para eliminar impurezas. Gracias a su perfil discreto, es una de las bases más versátiles de la coctelería y se utiliza en cócteles como el Moscow Mule, Bloody Mary, Cosmopolitan y Espresso Martini.",
  "Tequila": "El tequila es una bebida alcohólica destilada elaborada exclusivamente a partir del agave azul. Se produce en determinadas regiones de México y puede ser transparente o envejecida en barricas, según el tipo. Destaca por sus notas herbales, vegetales y ligeramente dulces, y es una base fundamental de cócteles como la Margarita y el Paloma.",
  "Gin": "El gin (ginebra) es una bebida alcohólica destilada elaborada a partir de alcohol neutro y aromatizada principalmente con bayas de enebro, que le aportan su sabor característico. También puede contener otros botánicos, como cilantro, cítricos, raíz de angélica o cardamomo. Se utiliza ampliamente en la coctelería clásica por su perfil fresco, seco y herbal.",
  "Whisky": "El whisky es una bebida alcohólica destilada elaborada a partir de cereales, como cebada, maíz, centeno o trigo. Tras la destilación se envejece en barricas de roble durante varios años, lo que le aporta su color, aroma y sabores característicos, como vainilla, caramelo, especias o madera. Es una de las bases más importantes de la coctelería clásica y también se consume solo o con hielo.",
  "Ron": "El ron es una bebida alcohólica destilada que se elabora principalmente a partir de la caña de azúcar, ya sea del jugo de caña o de la melaza (un subproducto de la producción de azúcar). Su proceso incluye fermentar los azúcares de la caña, destilar el líquido fermentado y, en muchos casos, envejecer el destilado en barricas de madera.<br><br><strong>Tipos de ron:</strong><br>• <em>Ron blanco</em> — ligero y transparente, muy usado en cócteles.<br>• <em>Ron dorado</em> — envejecido por un tiempo moderado, sabor más intenso.<br>• <em>Ron añejo</em> — envejecido varios años, sabores más complejos.<br>• <em>Ron especiado</em> — con especias y otros aromas añadidos.<br><br>Se consume solo, con hielo o en cócteles como el mojito, la piña colada o el daiquiri.",
  "Cerveza": "La cerveza es una bebida alcohólica elaborada a partir de la fermentación de cereales, principalmente cebada, y aromatizada con lúpulo. Su proceso de elaboración incluye la malteación, la cocción del mosto, la fermentación y el envasado. Existen numerosos estilos de cerveza, que varían en sabor, color, aroma y contenido alcohólico. Se consume sola o como acompañamiento de comidas y también se utiliza en cócteles como la michelada o el shandy. Es la bebida alcohólica más consumida del mundo, y una de las bebidas más consumidas en general, solo por detrás del agua, el té y el café.",
  "Vino": "El vino es una bebida alcohólica obtenida de la fermentación del jugo de uvas. Existen diferentes tipos de vino, como tinto, blanco, rosado y espumoso, cada uno con características únicas de sabor, aroma y color. Se consume solo, acompañado de comidas o como ingrediente en cócteles.",
  "Vermut": "El vermut es un vino aromatizado y fortificado, elaborado a partir de vino base al que se le añaden hierbas, especias y otros botánicos. Se utiliza como aperitivo o digestivo y también es un ingrediente clave en cócteles clásicos como el Martini, el Negroni y el Manhattan.",
  "Destilados": "Los destilados son bebidas alcohólicas obtenidas mediante el proceso de destilación, que consiste en separar los componentes de una mezcla líquida a través de la evaporación y condensación. Este proceso permite concentrar el alcohol y los sabores, dando lugar a bebidas con mayor graduación alcohólica y características organolépticas únicas. Algunos ejemplos de destilados son el whisky, el ron, la ginebra, el tequila y el vodka.",
  "Bourbon": "El bourbon es un tipo de whisky estadounidense, elaborado principalmente a partir de maíz y envejecido en barricas de roble carbonizado. Se caracteriza por su sabor dulce y suave, con notas de vainilla, caramelo y especias. Es la base de cócteles populares como el Mint Julep, el Old Fashioned y el Boulevardier.",
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
export const ITEM_DESCRIPTIONS: Record<string, string> = {
  // Jarras
  "Tinto de verano": "Bebida fría muy popular en España, preparada con 1 parte de vino tinto y 1 parte de soda (normalmente de limón). Se sirve con hielo y suele llevar una rodaja de limón o naranja.",
  "Agua de Valencia": "Cóctel español creado en 1959 por el pintor gallego Constante Gil en la Cervecería Madrid de Valencia. Combina cava, zumo de naranja, vodka y ginebra. Por lo general se sirve en jarras de varias raciones y se bebe en copa de champán tipo seno de María Antonieta.",
  "Sangría": "Bebida alcohólica originaria de España y Portugal. Aunque existen multitud de recetas, generalmente consiste en vino, trozos de fruta, gaseosa, algún licor y azúcar. Es una de las bebidas más populares de la gastronomía española y se sirve habitualmente en bares, restaurantes, chiringuitos y festivales.",
  // Cerveza
  "Águila": "Cerveza El Águila es una marca de cerveza española, fundada en Madrid, España en 1904, que en 2019 ha vuelto a ser comercializada. Actualmente, es propiedad del grupo cervecero neerlandés Heineken International. La cerveza Águila es de tipo lager, de color dorado y sabor suave, con un contenido alcohólico de 4,8%.",
  "Águila Sin Filtrar": "Cerveza Águila Sin Filtrar es una marca de cerveza española, fundada en 1904 en Madrid, España. Es una cerveza lager de color dorado y sabor suave, con un contenido alcohólico de 4,8%.",
  "Heineken": "Cerveza Heineken es una marca de cerveza neerlandesa, fundada en 1864 en Ámsterdam, Países Bajos. Es una cerveza lager de color dorado y sabor suave, con un contenido alcohólico de 5%.",
  "Paulaner": "Cerveza Paulaner es una marca de cerveza alemana, fundada en 1634 en Múnich, Alemania. Es una cerveza lager de color dorado y sabor suave, con un contenido alcohólico de 5,5%.",
  "Guinness": "Cerveza Guinness es una marca de cerveza irlandesa, fundada en 1759 en Dublín, Irlanda. Es una cerveza stout de color negro y sabor intenso, con un contenido alcohólico de 4,2%.",
  "18/70": "Cerveza 18/70 es una marca de cerveza española, fundada en 1870 en Madrid, España. Es una cerveza lager de color dorado y sabor suave, con un contenido alcohólico de 5%.",
  "Amstel 0.0": "Cerveza Amstel 0.0 es una marca de cerveza neerlandesa sin alcohol, fundada en 1870 en Ámsterdam, Países Bajos. Es una cerveza lager de color dorado y sabor suave.",
  "Amstel Radler": "Cerveza Amstel Radler es una mezcla de cerveza Amstel y limonada, con un contenido alcohólico de 2,5%.",
  "Cruzcampo Sin Gluten": "Cerveza Cruzcampo Sin Gluten es una marca de cerveza española sin gluten, fundada en 1904 en Sevilla, España. Es una cerveza lager de color dorado y sabor suave.",
  "IPA Lagunitas": "Cerveza IPA Lagunitas es una marca de cerveza estadounidense, fundada en 1993 en Petaluma, California. Es una cerveza IPA de color ámbar y sabor intenso, con un contenido alcohólico de 6,2%.",
  // VINO
  "Ladrón de Lunas Blanco": "Vino blanco español, conocido por su sabor fresco y afrutado.",
  "Ovejita Tinto": "Vino tinto español, caracterizado por su sabor suave y equilibrado.",
  "Ovejita verde Verdejo": "Vino blanco español, elaborado con la variedad de uva Verdejo, conocido por su frescura y notas frutales.",
  "Vento n°1": "Vino realizado por Café Berlin, de forma artesanal en el celler de la Ibola",
  "Brut Cava": "Vino espumoso español, elaborado mediante el método tradicional, con un sabor seco y burbujeante.",
  "Ramón Bilbao Rioja": "Vino tinto español, proveniente de la región de Rioja, conocido por su sabor intenso y afrutado.",
  "Bollinger Spécial Cuvée": "Vino espumoso francés, elaborado por la casa Bollinger, conocido por su sabor complejo y elegante.",
  // Vermut
  "Vittore Blanco": "Vermut blanco español, elaborado con una mezcla de vinos y aromatizado con hierbas y especias.",
  "Vittore Rojo": "Vermut rojo español, elaborado con una mezcla de vinos y aromatizado con hierbas y especias.",
  "Martini Reserva Ambrato": "Vermut italiano, elaborado con una mezcla de vinos y aromatizado con hierbas y especias, conocido por su sabor suave y equilibrado.",
  "Martini Reserva Rubino": "Vermut italiano, elaborado con una mezcla de vinos y aromatizado con hierbas y especias, conocido por su sabor intenso y afrutado.",
  "Noilly Prat Blanco Seco": "Vermut francés, elaborado con una mezcla de vinos y aromatizado con hierbas y especias, conocido por su sabor seco y elegante.",
  // DESTILADOS
  // Tequila
  "Rooster Rojo White": "Tequila blanco 100% de agave azul, fresco y equilibrado, con notas cítricas, pimienta y agave cocido. Ideal para Margaritas, Palomas y otros cócteles donde el tequila es el protagonista.",
  "Mezcal Unión": "Mezcal artesanal de agave Espadín y Cirial, con un ahumado suave y notas cítricas, herbales y ligeramente dulces. Perfecto para tomar solo o en cócteles.",
  "Don Julio Reposado": "Tequila reposado 100% de agave azul, suave y equilibrado, con notas de vainilla, caramelo, cítricos y especias. Ideal solo o en cócteles premium.",
  "Don Julio Silver":"Tequila 100% de agave azul, sin añejamiento, que destaca por su perfil fresco y limpio. Presenta notas de agave cocido, cítricos y un ligero toque de pimienta, con un final suave.",
  "Mezcal": "Mezcal Santo Gusano es un mezcal artesanal mexicano elaborado principalmente con agave Espadín. Presenta un perfil equilibrado, con un ahumado suave, notas de agave cocido, cítricos, hierbas y un toque mineral.",
  // Whisky
  "Johny Walker Red Label": "un whisky escocés blended de carácter intenso y versátil. Combina notas de frutas frescas, vainilla, especias y un ligero toque ahumado, ideal para tomar con refrescos o en cócteles.",
  "Monkey Shoulder": "un whisky escocés blended de malta, suave y cremoso, con notas de vainilla, miel, frutas y un toque de especias. Perfecto para tomar solo, con hielo o en cócteles.",
  "Jack Daniels Fire": "un whisky estadounidense Tennessee con sabor a canela y especias. Combina el característico sabor del Jack Daniel's con un toque picante y dulce, ideal para tomar solo, con hielo o en cócteles.",
  "Jack Daniels Triple Mash": "un whisky estadounidense Tennessee elaborado a partir de una mezcla de tres tipos de grano (maíz, cebada y centeno). Suave y equilibrado, con notas de vainilla, caramelo y especias. Ideal para tomar solo o en cócteles.",
  "Tullamore Dew": "Whisky irlandés triple destilado, suave y equilibrado, con notas de vainilla, miel, fruta madura y especias. Ideal solo, con hielo o en cócteles clásicos.",
  "Bushmills": "Whisky irlandés triple destilado, suave y ligero, con notas de vainilla, miel, fruta fresca y un sutil toque floral. Ideal solo, con hielo o en cócteles.",
  "Jack Daniels Old Nº7": "Tennessee whiskey elaborado con el proceso de filtrado en carbón de arce (Lincoln County Process), que le aporta un perfil suave y equilibrado. Destaca por sus notas de vainilla, caramelo, roble tostado y un toque de plátano maduro.",
  "Toki": "Suntory Toki es un whisky japonés blended de estilo ligero y elegante. Destaca por sus notas de manzana verde, miel, vainilla y un sutil toque especiado, con un final fresco y delicado.",
  "Johnnie Walker Black Label 12Y": "Blended Scotch whisky de 12 años, suave y complejo, con notas de vainilla, frutas maduras, roble, especias y un sutil ahumado. Ideal solo o con hielo.",
   "Tomatin": "Single malt de las Highlands, suave y afrutado, con notas de vainilla, miel, cítricos y manzana. Ideal solo o con unas gotas de agua.",
   "Macallan": "single malt escocés envejecido en barricas de roble americano y europeo previamente envinadas con jerez. Presenta un perfil rico y elegante, con notas de vainilla, caramelo, frutas secas, cítricos y especias dulces. Perfecto para disfrutar solo o con hielo.",
  // Bourbon
 "Bulleit Frontier Bourbon": "Bourbon de carácter intenso y especiado, con notas de vainilla, caramelo, roble tostado y pimienta. Ideal solo, con hielo o en cócteles clásicos.",
  // Gin
  "Macaronesia": "Ginebra premium de las Islas Canarias, fresca y aromática, con notas de enebro, cítricos y botánicos herbales. Ideal para un Gin & Tonic o cócteles clásicos.",
  "Tanqueray London Dry": "Ginebra clásica de estilo London Dry, elaborada con una selección de cuatro botánicos: enebro, cilantro, angélica y regaliz. Destaca por su perfil seco, limpio y equilibrado, con un marcado carácter de enebro y notas cítricas. Perfecta para un Gin & Tonic o cócteles clásicos.",
  "Tanqueray 0.0": "Destilado sin alcohol con notas de enebro, cítricos y botánicos herbales. Ideal para un Gin & Tonic 0.0% o cócteles sin alcohol.",
  "Fords": "Fords Gin es una ginebra London Dry creada específicamente para coctelería, elaborada con una mezcla de nueve botánicos. Presenta un perfil equilibrado, con predominio de enebro, notas cítricas, florales y especiadas, lo que la hace especialmente versátil.",
  "Gin Mare": "Gin Mare es una ginebra mediterránea elaborada con botánicos como aceituna arbequina, romero, albahaca y tomillo, además de enebro y cítricos. Su perfil es fresco, aromático y herbáceo, con un marcado carácter mediterráneo.",
  "Larios 12": "Ginebra premium española destilada con una selección de doce botánicos, entre ellos cítricos mediterráneos, enebro y flor de azahar. Ofrece un perfil fresco, suave y muy aromático, con un marcado carácter cítrico.",
  "Roku": "Ginebra japonesa elaborada con seis botánicos tradicionales de Japón, como flor y hoja de sakura, té sencha, té gyokuro, pimienta sansho y yuzu, además de botánicos clásicos. Presenta un perfil equilibrado, fresco y delicadamente floral.",
  "Hendrick's": "Ginebra escocesa con notas de pepino, pétalos de rosa, enebro y cítricos. Suave, floral y refrescante, ideal para Gin & Tonic y cócteles clásicos.",
  "Tanqueray Nº Ten": "Ginebra super premium elaborada con cítricos frescos y botánicos seleccionados, destilados en pequeños lotes. Destaca por su perfil suave, fresco y muy aromático, con notas de pomelo, lima, naranja, enebro y manzanilla.",
  // Vodka
  "Moskovskaya": "Vodka de estilo clásico europeo, elaborado a partir de alcohol de grano y agua purificada. Presenta un perfil limpio, seco y suave, con un final fresco y un ligero toque de cereal.",
  "Cîroc":"Vodka premium francés elaborado a partir de uvas, en lugar de cereales, y destilado cinco veces. Destaca por su textura sedosa y un perfil suave, con delicadas notas cítricas y frutales.",
  "Beluga":"Vodka premium suave y elegante, con notas de cereal, miel y vainilla. Ideal para disfrutar solo, con hielo o en cócteles de alta gama.",
  // Ron
  "Barceló Añejo": "",
  "Barceló Imperial": "",
  "Zacapa Centenario 23": "",
  "Diplomático Planas": "un ron venezolano blanco premium, suave y cremoso, con notas de vainilla, coco, frutas tropicales y un toque de especias. Perfecto para tomar solo, con hielo o en cócteles.",
  // LICORES
  "Amaretto": "Licor italiano dulce con notas de almendra, caramelo y vainilla. Ideal solo, con hielo o en cócteles y postres.",
  "Baileys": "Licor de crema irlandesa, suave y cremoso, con notas de chocolate, vainilla y caramelo. Ideal solo, con hielo o en cócteles y cafés.",
  "Cazalla": "Cazalla es un aguardiente tradicional español elaborado mediante la destilación de anís. De sabor intenso y seco, destaca por sus marcadas notas anisadas y su final cálido y persistente.",
  "Jägermeister": "Licor alemán elaborado con una maceración de 56 hierbas, raíces, frutas y especias. Presenta un perfil intenso y equilibrado, con notas herbales, cítricas, especiadas y un ligero toque amargo.",
  "Licor de arroz": "Licor suave y dulce con notas de arroz, vainilla y un toque cremoso. Ideal como digestivo o para acompañar postres.",
  "Limoncello": "Licor italiano elaborado mediante la maceración de pieles de limón en alcohol. Destaca por su intenso aroma cítrico, su sabor dulce y fresco, y un final vibrante.",
  "Jack Fire": "Jack Daniel's Tennessee Fire es un licor elaborado a partir de Jack Daniel's Old No. 7 y licor de canela. Combina el carácter suave del Tennessee whiskey con un intenso sabor a canela y un final cálido y especiado.",
  "Cynar": "licor amargo italiano elaborado con alcachofa y una mezcla de 13 hierbas y plantas aromáticas. Su perfil es herbáceo, ligeramente dulce y amargo, con notas de caramelo y especias",
};
export const Q_META = {
  ingredients:  "¿Qué lleva?",
  ingredients2: "¿Cuál más?",
  ingredients3: "¿Cuál NO lleva?",
  recall:       "Todos los ingredientes",
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
  "Triple sec":"liqueur","Licor Bols Blue Curaçao":"liqueur","Licor yuzu":"liqueur",
  "Cerveza":"beer","Guinness":"beer","Paulaner":"beer","Águila":"beer","Heineken":"beer",
  "Licor Midori":"liqueur","Licor de café Bols":"liqueur",
  "Licor de humo":"liqueur","Licor Bols Vainilla":"liqueur","Licor mandarina MB":"liqueur",
  "Licor Bols Chocolate":"liqueur","Licor Bols Butterscotch":"liqueur","Licor Bols Yogurt":"liqueur",
  "Chambord":"liqueur","Bénédictine DOM":"liqueur","Drambuie":"liqueur","Licor de maraschino":"liqueur",
  "Crème de violette":"liqueur", "Aperol":"liqueur","Campari":"liqueur","Sarti Rosa":"liqueur","Bols Saúco":"liqueur",
  "Terry":"liqueur", "Cynar":"liqueur", "Vino tinto":"wine","Vermut":"wine","Vermut tinto":"wine","Vermut seco":"wine",
  "Cava":"wine", "7UP":"filler","Soda":"filler","Soda de pomelo":"filler","Ginger Ale":"filler",
  "Ginger beer":"filler","Refresco de pomelo":"filler","Pepsi":"filler","Schweppes limón":"filler","Zumo de tomate":"filler",
  "Zumo de naranja":"filler","Zumo de piña":"filler","Zumo de arándanos":"filler",
  "Zumo de limón":"filler","Zumo de lima":"filler",
  "Bitter":"bitter","Bitter caffè":"bitter","Bitter de cacao":"bitter","Bitter de naranja":"bitter",
  "Angostura Bitters":"bitter",
  "Bitter habanero":"bitter","Salsa inglesa":"bitter","Tabasco":"bitter",
  "Sirope amarena":"sweet","Sirope de agave":"sweet","Granadina":"sweet","Sirope de orgeat":"sweet",
  "Azúcar líquido":"sweet","Sirope de vainilla":"sweet","Sirope falernum":"sweet","Leche de coco":"sweet",
  "Sirope pandán":"sweet","Jalea de naranja":"sweet",
  "Arándanos":"fruit","Fresa":"fruit","Piña":"fruit","Maracuya":"fruit",
  "Lichee":"fruit","Frutos rojos":"fruit","Manzana verde natural triturada":"fruit","Calabaza asada":"fruit",
  "Frutas tropicales":"fruit","Lima":"fruit","Naranja":"fruit", "Nata": "other", "Leche": "other", "Café": "other", 
  "Mezcal": "spirit", " Vino blanco": "wine",
};
export const GARNISHMENTS = new Set([
  "Hierbabuena","Albahaca", "Rodaja de limón","Rodaja de lima", "Manzana verde", "Cereza"
 ]);
export const GROUP_ORDER = ["spirit","liqueur","filler","bitter","sweet","fruit","other"];
export const GROUP_LABELS: Record<string, string> = {
  spirit:"Alcohol", liqueur:"Licores", filler:"Mezcladores",
  bitter:"Amargos", sweet:"Endulzantes", fruit:"Frutas", other:"Otros"
};