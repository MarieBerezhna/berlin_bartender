import RAW from "../data/menu";
import IMAGES from "../data/images";
import {
  ALL_INGRS,
  CLASICA_CAT,
  type MenuItem,
  UNIQUE_PRICES,
} from "../data/constants";

type QuestionType =
  | "ingredients"
  | "ingredients2"
  | "ingredients3"
  | "price"
  | "category"
  | "ratio"
  | "name";

export type QuizQuestion = {
  qtype: QuestionType;
  img: string | null;
  q: string;
  opts: string[];
  answer: string;
  cat: string;
  hint: string;
};

type MakeQsOptions = {
  pool: MenuItem[];
  activeFilters: Set<string>;
  activeTab?: string;
  limit?: number;
};

function sh<T>(values: T[]): T[] {
  const copy = [...values];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pick<T>(values: T[], count: number): T[] {
  return sh(values).slice(0, count);
}

function fmt(value: number): string {
  return Number.isInteger(value) ? `${value}€` : `${value.toFixed(2)}€`;
}

function hasRecipe(item: MenuItem): item is MenuItem & { ingr: string[] } {
  return Boolean(item.hasIngr && item.ingr && item.ingr.length > 1);
}

function ratioStr(item: MenuItem): string {
  return (item.ingr || [])
    .map((ing) => {
      const dose = item.doses && item.doses[ing];
      return dose ? `${dose} ${ing}` : ing;
    })
    .join(", ");
}

function ingredientsHint(item: MenuItem): string {
  return (item.ingr || [])
    .map((ingredient) => {
      const dose = item.doses && item.doses[ingredient];
      return dose ? `${ingredient} (${dose})` : ingredient;
    })
    .join(", ");
}

export function makeQs({
  pool,
  activeFilters,
  activeTab = "Todo",
  limit = 15,
}: MakeQsOptions): QuizQuestion[] {
  const cocktails = pool.filter(hasRecipe);
  const allCats = [...new Set(RAW.map((item) => item.cat))];
  const res: QuizQuestion[] = [];

  if (activeFilters.has("ingredients")) {
    cocktails.forEach((item) => {
      const c1 = item.ingr[Math.floor(Math.random() * item.ingr.length)];
      const w1 = sh(ALL_INGRS.filter((i) => !item.ingr.includes(i))).slice(0, 3);
      if (w1.length >= 3) {
        res.push({
          qtype: "ingredients",
          img: IMAGES[item.name] || null,
          q: `¿Cuál de estos ingredientes lleva el ${item.name}?`,
          opts: sh([c1, ...w1]),
          answer: c1,
          cat: item.cat,
          hint: `${item.name}: ${ingredientsHint(item)}`,
        });
      }

      if (item.ingr.length >= 3) {
        const shuffledIngr = sh(item.ingr);
        const shown = shuffledIngr.slice(0, 2);
        const c2 = shuffledIngr[2];
        const w2 = sh(ALL_INGRS.filter((i) => !item.ingr.includes(i))).slice(0, 3);
        if (w2.length >= 3) {
          res.push({
            qtype: "ingredients2",
            img: IMAGES[item.name] || null,
            q: `El ${item.name} lleva ${shown.join(" y ")}… ¿cuál más?`,
            opts: sh([c2, ...w2]),
            answer: c2,
            cat: item.cat,
            hint: `${item.name}: ${ingredientsHint(item)}`,
          });
        }
      }

      if (item.ingr.length >= 3) {
        const intruder = sh(ALL_INGRS.filter((i) => !item.ingr.includes(i)))[0];
        const decoys = sh(item.ingr).slice(0, 3);
        if (intruder && decoys.length >= 3) {
          res.push({
            qtype: "ingredients3",
            img: IMAGES[item.name] || null,
            q: `¿Cuál de estos NO lleva el ${item.name}?`,
            opts: sh([intruder, ...decoys]),
            answer: intruder,
            cat: item.cat,
            hint: `${item.name} lleva: ${ingredientsHint(item)}`,
          });
        }
      }
    });
  }

  if (activeFilters.has("price")) {
    pool
      .filter((item) => item.prices && item.prices.length && item.cat !== CLASICA_CAT)
      .forEach((item) => {
        (item.prices || []).forEach((serving) => {
          const wrongPs = sh(UNIQUE_PRICES.filter((p) => p !== serving.p)).slice(0, 3);
          const allOpts = sh([serving.p, ...wrongPs]).map(fmt);
          const hintParts = (item.prices || [])
            .map((s) => `${s.label}: ${fmt(s.p)}`)
            .join(" · ");
          res.push({
            qtype: "price",
            img: IMAGES[item.name] || null,
            q: `¿Cuánto cuesta el ${item.name} (${serving.label})?`,
            opts: allOpts,
            answer: fmt(serving.p),
            cat: item.cat,
            hint: `${item.name} — ${hintParts}`,
          });
        });
      });
  }

  if (activeFilters.has("category") && activeTab === "Todo") {
    pool.forEach((item) => {
      const wrongCats = sh(allCats.filter((c) => c !== item.cat)).slice(0, 3);
      res.push({
        qtype: "category",
        img: IMAGES[item.name] || null,
        q: `¿En qué sección está el ${item.name}?`,
        opts: sh([item.cat, ...wrongCats]),
        answer: item.cat,
        cat: item.cat,
        hint: `${item.name} está en "${item.cat}"`,
      });
    });
  }

  if (activeFilters.has("ingredients")) {
    const itemsWithDoses = pool.filter(
      (item) => item.doses && Object.keys(item.doses).length > 0,
    );
    const allItemsWithDoses = RAW.filter(
      (item) => item.doses && Object.keys(item.doses).length > 0,
    );

    itemsWithDoses.forEach((item) => {
      const correct = ratioStr(item);
      const otherRatios = sh(
        allItemsWithDoses.filter((entry) => entry.name !== item.name),
      )
        .slice(0, 3)
        .map(ratioStr);

      while (otherRatios.length < 3) {
        const shuffledDoses = sh(Object.entries(item.doses || {}));
        const fake = (item.ingr || [])
          .map((ing) => {
            const dose = shuffledDoses.find(([k]) => k !== ing)?.[1];
            return dose ? `${dose} ${ing}` : ing;
          })
          .join(", ");
        if (fake !== correct) {
          otherRatios.push(fake);
        } else {
          break;
        }
      }

      if (otherRatios.length >= 1) {
        res.push({
          qtype: "ratio",
          img: IMAGES[item.name] || null,
          q: `¿Cuál es el ratio del ${item.name}?`,
          opts: sh([correct, ...otherRatios.slice(0, 3)]),
          answer: correct,
          cat: item.cat,
          hint: `${item.name}: ${correct}`,
        });
      }
    });
  }

  if (activeFilters.has("name")) {
    const cocktailItems = pool.filter(
      (item): item is MenuItem & { ingr: string[] } => Boolean(item.hasIngr && item.ingr),
    );

    cocktailItems.forEach((item) => {
      let clue: string[] | null = null;
      const maxTries = 8;

      for (let attempt = 0; attempt < maxTries; attempt += 1) {
        const size =
          item.ingr.length >= 3
            ? Math.random() < 0.5
              ? 2
              : 3
            : Math.min(2, item.ingr.length);
        const candidate = pick(item.ingr, size);
        const ambiguous = cocktailItems.some(
          (other) =>
            other.name !== item.name &&
            candidate.every((ingredient) => (other.ingr || []).includes(ingredient)),
        );
        if (!ambiguous) {
          clue = candidate;
          break;
        }
      }

      if (!clue) return;

      const wrongNames = sh(
        cocktailItems.filter((entry) => entry.name !== item.name),
      )
        .slice(0, 3)
        .map((entry) => entry.name);

      if (wrongNames.length >= 3) {
        res.push({
          qtype: "name",
          img: IMAGES[item.name] || null,
          q: `¿Qué cóctel lleva ${clue.join(" y ")}?`,
          opts: sh([item.name, ...wrongNames]),
          answer: item.name,
          cat: item.cat,
          hint: `${item.name}: ${item.ingr.join(", ")}`,
        });
      }
    });
  }

  return sh(res).slice(0, limit);
}

export function genIngrQ(item: MenuItem): QuizQuestion | null {
  if (!item.ingr || item.ingr.length < 2) return null;

  const types: QuestionType[] = ["ingredients", "ingredients2", "ingredients3"];
  const shuffledTypes = sh(types);

  for (const type of shuffledTypes) {
    if (type === "ingredients") {
      const required = item.ingr.filter(
        (ingredient) => !item.optional || !item.optional.includes(ingredient),
      );
      if (required.length === 0) continue;

      const correct = required[Math.floor(Math.random() * required.length)];
      const wrongs = sh(ALL_INGRS.filter((ingredient) => !item.ingr?.includes(ingredient))).slice(
        0,
        3,
      );
      if (wrongs.length >= 3) {
        return {
          qtype: type,
          img: IMAGES[item.name] || null,
          q: `¿Cuál de estos ingredientes lleva el ${item.name}?`,
          opts: sh([correct, ...wrongs]),
          answer: correct,
          cat: item.cat,
          hint: `${item.name}: ${ingredientsHint(item)}`,
        };
      }
    }

    if (type === "ingredients2" && item.ingr.length >= 3) {
      const required = item.ingr.filter(
        (ingredient) => !item.optional || !item.optional.includes(ingredient),
      );
      if (required.length < 3) continue;

      const shuffledIngr = sh(required);
      const shown = shuffledIngr.slice(0, 2);
      const c2 = shuffledIngr[2];
      const wrongs = sh(ALL_INGRS.filter((ingredient) => !item.ingr?.includes(ingredient))).slice(
        0,
        3,
      );

      if (wrongs.length >= 3) {
        return {
          qtype: type,
          img: IMAGES[item.name] || null,
          q: `El ${item.name} lleva ${shown.join(" y ")}… ¿cuál más?`,
          opts: sh([c2, ...wrongs]),
          answer: c2,
          cat: item.cat,
          hint: `${item.name}: ${ingredientsHint(item)}`,
        };
      }
    }

    if (type === "ingredients3" && item.ingr.length >= 3) {
      const intruder = sh(ALL_INGRS.filter((ingredient) => !item.ingr?.includes(ingredient)))[0];
      const decoys = sh(item.ingr).slice(0, 3);
      if (intruder && decoys.length >= 3) {
        return {
          qtype: type,
          img: IMAGES[item.name] || null,
          q: `¿Cuál de estos NO lleva el ${item.name}?`,
          opts: sh([intruder, ...decoys]),
          answer: intruder,
          cat: item.cat,
          hint: `${item.name} lleva: ${ingredientsHint(item)}`,
        };
      }
    }
  }

  return null;
}

export function genPriceQ(item: MenuItem): QuizQuestion | null {
  if (!item.prices || !item.prices.length) return null;
  const serving = item.prices[Math.floor(Math.random() * item.prices.length)];
  const wrongPs = sh(UNIQUE_PRICES.filter((price) => price !== serving.p)).slice(0, 3);
  if (wrongPs.length < 3) return null;

  const hintParts = item.prices.map((entry) => `${entry.label}: ${fmt(entry.p)}`).join(" · ");
  return {
    qtype: "price",
    img: IMAGES[item.name] || null,
    q: `¿Cuánto cuesta el ${item.name} (${serving.label})?`,
    opts: sh([serving.p, ...wrongPs]).map(fmt),
    answer: fmt(serving.p),
    cat: item.cat,
    hint: `${item.name} — ${hintParts}`,
  };
}

export function genRatioQ(item: MenuItem): QuizQuestion | null {
  if (!item.doses || Object.keys(item.doses).length === 0) return null;
  const allWithDoses = RAW.filter((entry) => entry.doses && Object.keys(entry.doses).length > 0);
  const correct = ratioStr(item);
  const wrongs = sh(allWithDoses.filter((entry) => entry.name !== item.name))
    .slice(0, 3)
    .map(ratioStr);
  if (wrongs.length < 1) return null;

  return {
    qtype: "ratio",
    img: IMAGES[item.name] || null,
    q: `¿Cuál es el ratio del ${item.name}?`,
    opts: sh([correct, ...wrongs.slice(0, 3)]),
    answer: correct,
    cat: item.cat,
    hint: `${item.name}: ${correct}`,
  };
}
