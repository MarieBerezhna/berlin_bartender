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
  Ml = "ml",
  Dashes = "golpes",
  Uds = "uds.",
  Top = "Top",
  Cdta = "cdta",
}

export type LiquidMeasure = Measure.Oz | Measure.Cl | Measure.Ml;

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
  ingredients?: Ingredient[];
  garnish?: string[];
  method?: string;
  glass?: Glass;
  prices?: MenuPrice[];
  hint?: string;
  comment?: string;
  funFact?: string;
}

