import RAW from "../data/menu.js";
import {
  ALL_INGRS,
  CLASICA_CAT,
  GARNISHMENTS,
  GROUP_LABELS,
  GROUP_ORDER,
  INGR_GROUP,
} from "../data/constants.js";
import IMAGES from "../data/images.js";

function shuffleArray(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function fmt(value) {
  if (typeof value !== "number") return value;
  const rounded = Number.isInteger(value) ? value : Number(value.toFixed(2));
  return `${rounded}€`;
}

export function formatPrice(item) {
  if (!item?.prices?.length) return "";
  if (item.prices.length === 1) return fmt(item.prices[0].p);
  return item.prices.map((entry) => `${fmt(entry.p)} (${entry.label})`).join(" · ");
}

export function getLearnableItems(items = RAW) {
  return items.filter((item) => item?.hasIngr || item?.ingr?.length || item?.prices?.length);
}

export function buildLearnQueue(items = RAW, filters = {}) {
  let pool = getLearnableItems(items);

  if (filters.activeTab && filters.activeTab !== "Todo") {
    pool = pool.filter((item) => item.cat === filters.activeTab);
  }

  if (filters.activeFamily) {
    pool = pool.filter((item) => item.family === filters.activeFamily);
  }

  return shuffleArray(pool);
}

export function buildStudyViewModel(item) {
  const hasRecipe = Boolean(item?.hasIngr && item.ingr?.length > 1);
  const groupedIngredients = {};

  if (hasRecipe) {
    item.ingr.forEach((ingredient) => {
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
    doses: item.doses ? Object.entries(item.doses) : [],
    hasRecipe,
    ingredientsByGroup: groupedIngredients,
  };
}

export function buildRecallViewModel(item) {
  const correctIngredients = item.ingr || [];
  const distractors = shuffleArray(
    ALL_INGRS.filter((ingredient) => !correctIngredients.includes(ingredient))
  ).slice(0, Math.min(correctIngredients.length + 2, 8));

  const byGroup = {};
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

function buildIngredientQuestion(item) {
  const required = (item.ingr || []).filter(
    (ingredient) => !item.optional || !item.optional.includes(ingredient)
  );

  if (!required.length) return null;

  const correct = required[Math.floor(Math.random() * required.length)];
  const wrongs = shuffleArray(
    ALL_INGRS.filter((ingredient) => !item.ingr.includes(ingredient))
  ).slice(0, 3);

  if (wrongs.length < 3) return null;

  return {
    qtype: "ingredients",
    question: `¿Cuál de estos ingredientes lleva el ${item.name}?`,
    options: shuffleArray([correct, ...wrongs]),
    answer: correct,
    hint: `${item.name}: ${item.ingr.join(", ")}`,
  };
}

function buildRatioQuestion(item) {
  if (!item.doses || Object.keys(item.doses).length === 0) return null;

  const allWithDoses = RAW.filter((entry) => entry.doses && Object.keys(entry.doses).length > 0);
  const ratioString = (entry) =>
    entry.ingr
      .map((ingredient) => (entry.doses && entry.doses[ingredient] ? `${entry.doses[ingredient]} ${ingredient}` : ingredient))
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

function buildPriceQuestion(item) {
  if (!item.prices?.length || item.cat === CLASICA_CAT) return null;

  const serving = item.prices[Math.floor(Math.random() * item.prices.length)];
  const wrongPrices = shuffleArray(
    [...new Set(RAW.flatMap((entry) => (entry.prices || []).map((price) => price.p)))].filter((price) => price !== serving.p)
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

export function createLearnQuizQueue(item) {
  const hasRecipe = Boolean(item?.hasIngr && item.ingr?.length > 1);
  const questions = [];

  if (hasRecipe) {
    const ingredientQuestion = buildIngredientQuestion(item);
    if (ingredientQuestion) questions.push(ingredientQuestion);
  }

  const ratioQuestion = buildRatioQuestion(item);
  if (ratioQuestion) questions.push(ratioQuestion);

  const priceQuestion = buildPriceQuestion(item);
  if (priceQuestion) questions.push(priceQuestion);

  return questions;
}

export function scoreRecallSelection(item, selectedValues = []) {
  const correct = new Set(item.ingr || []);
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

  (item.ingr || []).forEach((ingredient) => {
    const wasSelected = selectedValues.includes(ingredient);
    if (!wasSelected && !optional.has(ingredient)) {
      misses += 1;
    }
  });

  const required = (item.ingr || []).filter((ingredient) => !optional.has(ingredient)).length;
  const perfect = misses === 0 && wrongs === 0;
  const message = perfect
    ? "✓ ¡Perfecto! / Perfect!"
    : `${hits}/${required} ingredientes — ${misses} olvidados, ${wrongs} incorrectos`;

  return {
    hits,
    misses,
    wrongs,
    required,
    perfect,
    message,
  };
}

export function getIngredientGroupLabel(group) {
  return GROUP_LABELS[group] || "Otros / Other";
}

export function getIngredientGroup(ingredient) {
  return INGR_GROUP[ingredient] || "other";
}

export function isGarnish(ingredient) {
  return GARNISHMENTS.has(ingredient);
}

export function sortIngredientsForStudy(item) {
  return [...(item.ingr || [])].sort((left, right) => {
    const isGarnishLeft = isGarnish(left);
    const isGarnishRight = isGarnish(right);

    if (isGarnishLeft !== isGarnishRight) return isGarnishLeft ? 1 : -1;

    const groupLeft = getIngredientGroup(left);
    const groupRight = getIngredientGroup(right);
    const isAlcoholLeft = groupLeft === "spirit" || groupLeft === "liqueur";
    const isAlcoholRight = groupRight === "spirit" || groupRight === "liqueur";

    if (isAlcoholLeft !== isAlcoholRight) return isAlcoholRight ? 1 : -1;

    const hasDoseLeft = Boolean(item.doses && item.doses[left]);
    const hasDoseRight = Boolean(item.doses && item.doses[right]);
    if (hasDoseLeft !== hasDoseRight) return hasDoseRight ? 1 : -1;

    return 0;
  });
}

export default {
  buildLearnQueue,
  buildRecallViewModel,
  buildStudyViewModel,
  createLearnQuizQueue,
  formatPrice,
  getLearnableItems,
  scoreRecallSelection,
  sortIngredientsForStudy,
};
