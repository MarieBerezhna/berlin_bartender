import RAW from "../data/menu";
import {
  ALL_INGRS,
  CLASICA_CAT,
  GARNISHMENTS,
  getIngr,
  GROUP_LABELS,
  GROUP_ORDER,
  INGR_GROUP,
} from "../data/constants";
import IMAGES from "../data/images";

type MenuPrice = {
  label: string;
  p: number;
};

type MenuItem = {
  cat: string;
  name: string;
  family?: string;
  ingr?: Record<string, string | null>;
  optional?: string[];
  garnish?: string[];
  method?: string;
  glass?: string;
  prices?: MenuPrice[];
};

type LearnFilters = {
  activeTab?: string;
  activeFamily?: string;
};

type LearnQuestion = {
  qtype: string;
  question: string;
  options: Array<string | number>;
  answer: string | number;
  hint: string;
};

function shuffleArray<T>(list: T[]): T[] {
  const copy = [...list];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function fmt(value: string | number): string {
  if (typeof value !== "number") return String(value);
  const rounded = Number.isInteger(value) ? value : Number(value.toFixed(2));
  return `${rounded}€`;
}

export function formatPrice(item: MenuItem): string {
  if (!item?.prices?.length) return "";
  if (item.prices.length === 1) return fmt(item.prices[0].p);
  return item.prices.map((entry) => `${fmt(entry.p)} (${entry.label})`).join(" · ");
}

export function getLearnableItems(items: MenuItem[] = RAW as MenuItem[]): MenuItem[] {
  return items.filter((item) => getIngr(item).length > 0 || item?.prices?.length);
}

export function buildLearnQueue(items: MenuItem[] = RAW as MenuItem[], filters: LearnFilters = {}): MenuItem[] {
  let pool = getLearnableItems(items);

  if (filters.activeTab && filters.activeTab !== "Todo") {
    pool = pool.filter((item) => item.cat === filters.activeTab);
  }

  if (filters.activeFamily) {
    pool = pool.filter((item) => item.family === filters.activeFamily);
  }

  return shuffleArray(pool);
}

export function buildStudyViewModel(item: MenuItem) {
  const hasRecipe = getIngr(item).length > 1;
  const groupedIngredients: Record<string, string[]> = {};

  if (hasRecipe) {
    getIngr(item).forEach((ingredient) => {
      const group = INGR_GROUP[ingredient] || "other";
      groupedIngredients[group] = groupedIngredients[group] || [];
      groupedIngredients[group].push(ingredient);
    });
  }

  return {
    id: item.name,
    name: item.name,
    image: IMAGES[item.name] ?? null,
    priceLabel: formatPrice(item),
    family: item.family ?? null,
    method: item.method ?? null,
    doses: Object.entries(item.ingr || {}).filter(([,v]) => v !== null) as [string,string][],
    hasRecipe,
    ingredientsByGroup: groupedIngredients,
  };
}

export function buildRecallViewModel(item: MenuItem) {
  const correctIngredients = getIngr(item);
  const distractors = shuffleArray(
    ALL_INGRS.filter((ingredient) => !correctIngredients.includes(ingredient))
  ).slice(0, Math.min(correctIngredients.length + 2, 8));

  const byGroup: Record<string, string[]> = {};
  [...correctIngredients, ...distractors].forEach((entry) => {
    const group = INGR_GROUP[entry] || "other";
    byGroup[group] = byGroup[group] || [];
    byGroup[group].push(entry);
  });

  const options = GROUP_ORDER.flatMap((group) =>
    byGroup[group] ? shuffleArray(byGroup[group]) : []
  );

  return {
    id: item.name,
    name: item.name,
    image: IMAGES[item.name] ?? null,
    priceLabel: formatPrice(item),
    options,
    byGroup,
  };
}

const ALL_GARNISHES: string[] = [
  ...new Set(
    (RAW as MenuItem[]).flatMap((entry) => entry.garnish || [])
  ),
];

function buildGarnishQuestion(item: MenuItem): LearnQuestion | null {
  if (!item.garnish?.length) return null;

  const correct = item.garnish[Math.floor(Math.random() * item.garnish.length)];
  const wrongs = shuffleArray(
    ALL_GARNISHES.filter((g) => !item.garnish!.includes(g))
  ).slice(0, 3);

  if (wrongs.length < 3) return null;

  return {
    qtype: "garnish",
    question: `¿Cuál es la decoración del ${item.name}?`,
    options: shuffleArray([correct, ...wrongs]),
    answer: correct,
    hint: `${item.name}: ${item.garnish.join(" · ")}`,
  };
}

function buildIngredientQuestion(item: MenuItem): LearnQuestion | null {
  const ingr = getIngr(item);
  const required = ingr.filter(
    (ingredient) => !item.optional || !item.optional.includes(ingredient)
  );

  if (!required.length) return null;

  const correct = required[Math.floor(Math.random() * required.length)];
  const wrongs = shuffleArray(
    ALL_INGRS.filter((ingredient) => !ingr.includes(ingredient))
  ).slice(0, 3);

  if (wrongs.length < 3) return null;

  const ingredientsWithDoses = ingr
    .map((ingredient) => {
      const dose = item.ingr?.[ingredient];
      return dose ? `${ingredient} (${dose})` : ingredient;
    })
    .join(", ");

  return {
    qtype: "ingredients",
    question: `¿Cuál de estos ingredientes lleva el ${item.name}?`,
    options: shuffleArray([correct, ...wrongs]),
    answer: correct,
    hint: `${item.name}: ${ingredientsWithDoses}`,
  };
}

function buildRatioQuestion(item: MenuItem): LearnQuestion | null {
  if (!item.ingr || !Object.values(item.ingr).some(v => v !== null)) return null;

  const allWithDoses = (RAW as MenuItem[]).filter((entry) => entry.ingr && Object.values(entry.ingr).some(v => v !== null));
  const ratioString = (entry: MenuItem): string =>
    getIngr(entry)
      .map((ingredient) => (entry.ingr?.[ingredient] ? `${entry.ingr[ingredient]} ${ingredient}` : ingredient))
      .join(", ");

  const correct = ratioString(item);
  const wrongs = shuffleArray(allWithDoses.filter((entry) => entry.name !== item.name))
    .slice(0, 3)
    .map(ratioString);

  if (!wrongs.length) return null;

  return {
    qtype: "ratio",
    question: `¿Cuál es el ratio del ${item.name}?`,
    options: shuffleArray([correct, ...wrongs.slice(0, 3)]),
    answer: correct,
    hint: `${item.name}: ${correct}`,
  };
}

function buildPriceQuestion(item: MenuItem): LearnQuestion | null {
  if (!item.prices?.length || item.cat === CLASICA_CAT) return null;

  const serving = item.prices[Math.floor(Math.random() * item.prices.length)];
  const wrongPrices = shuffleArray(
    [...new Set((RAW as MenuItem[]).flatMap((entry) => (entry.prices || []).map((price) => price.p)))].filter((price) => price !== serving.p)
  ).slice(0, 3);

  if (wrongPrices.length < 3) return null;

  return {
    qtype: "price",
    question: `¿Cuánto cuesta el ${item.name} (${serving.label})?`,
    options: shuffleArray([serving.p, ...wrongPrices]).map(fmt),
    answer: fmt(serving.p),
    hint: `${item.name} — ${item.prices.map((entry) => `${entry.label}: ${fmt(entry.p)}`).join(" · ")}`,
  };
}

export function createLearnQuizQueue(item: MenuItem): LearnQuestion[] {
  const hasRecipe = getIngr(item).length > 1;
  const questions: LearnQuestion[] = [];

  if (hasRecipe) {
    const ingredientQuestion = buildIngredientQuestion(item);
    if (ingredientQuestion) questions.push(ingredientQuestion);
  }

  const ratioQuestion = buildRatioQuestion(item);
  if (ratioQuestion) questions.push(ratioQuestion);

  const priceQuestion = buildPriceQuestion(item);
  if (priceQuestion) questions.push(priceQuestion);

  const garnishQuestion = buildGarnishQuestion(item);
  if (garnishQuestion) questions.push(garnishQuestion);

  return questions;
}

export function scoreRecallSelection(item: MenuItem, selectedValues: string[] = []) {
  const ingr = getIngr(item);
  const correct = new Set(ingr);
  const optional = new Set(item.optional || []);
  let hits = 0;
  let misses = 0;
  let wrongs = 0;

  selectedValues.forEach((value) => {
    if (correct.has(value)) {
      hits += 1;
    } else {
      wrongs += 1;
    }
  });

  ingr.forEach((ingredient) => {
    const wasSelected = selectedValues.includes(ingredient);
    if (!wasSelected && !optional.has(ingredient)) {
      misses += 1;
    }
  });

  const required = ingr.filter((ingredient) => !optional.has(ingredient)).length;
  const perfect = misses === 0 && wrongs === 0;
  const message = perfect
    ? "✓ ¡Perfecto!"
    : `${hits}/${required} ingredientes — ${misses} olvidados, ${wrongs} incorrectos : ${selectedValues.join(", ")}`;

  return {
    hits,
    misses,
    wrongs,
    required,
    perfect,
    message,
  };
}

export function getIngredientGroupLabel(group: string): string {
  return GROUP_LABELS[group] || "Otros";
}

export function getIngredientGroup(ingredient: string): string {
  return INGR_GROUP[ingredient] || "other";
}

export function isGarnish(ingredient: string): boolean {
  return GARNISHMENTS.has(ingredient);
}

export function sortIngredientsForStudy(item: MenuItem): string[] {
  return [...getIngr(item)].sort((left, right) => {
    const isGarnishLeft = isGarnish(left);
    const isGarnishRight = isGarnish(right);

    if (isGarnishLeft !== isGarnishRight) return isGarnishLeft ? 1 : -1;

    const groupLeft = getIngredientGroup(left);
    const groupRight = getIngredientGroup(right);
    const isAlcoholLeft = groupLeft === "spirit" || groupLeft === "liqueur";
    const isAlcoholRight = groupRight === "spirit" || groupRight === "liqueur";

    if (isAlcoholLeft !== isAlcoholRight) return isAlcoholRight ? 1 : -1;

    const hasDoseLeft = Boolean(item.ingr?.[left]);
    const hasDoseRight = Boolean(item.ingr?.[right]);
    if (hasDoseLeft !== hasDoseRight) return hasDoseRight ? 1 : -1;

    return 0;
  });
}

const learnUtils = {
  buildLearnQueue,
  buildRecallViewModel,
  buildStudyViewModel,
  createLearnQuizQueue,
  formatPrice,
  getLearnableItems,
  scoreRecallSelection,
  sortIngredientsForStudy,
};

export default learnUtils;
