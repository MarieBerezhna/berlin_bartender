export enum Glass {
  Coupe = "Coupe / Martini",
  Highball = "Vaso largo",
  Lowball = "Vaso bajo",
  Collins = "Collins (tubo)",
  CopperMug = "Copa de cobre",
  Jar = "Vaso largo o jarrita de bayas (preferiblemente)",
}

export enum Measure {
  Oz = "oz",
  Cl = "cl",
  Dashes = "golpes",
  Uds = "uds.",
}

export type Ingredient = {
  name: string;
  qty?: number;
  measure?: Measure;
};

export interface MenuPrice {
  label: string;
  p: number;
}

export interface MenuItem {
  cat: string;
  name: string;
  family?: string;
  ingr?: Record<string, string | null>;
  garnish?: string[];
  method?: string;
  glass?: Glass;
  prices?: MenuPrice[];
  hint?: string;
  comment?: string;
  funFact?: string;
}

export function getIngr(item: MenuItem): string[] {
  return Object.keys(item.ingr || {});
}
