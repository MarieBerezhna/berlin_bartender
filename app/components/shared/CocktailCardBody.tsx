"use client";

import Image from "next/image";

type IngredientRow = {
  label: string;
  dose?: string | null;
  color?: string;
};

type CocktailCardBodyProps = {
  title: string;
  priceLabel?: string | null;
  ingredientRows: IngredientRow[];
  garnishes?: string[];
  volumeLabel?: string | null;
  method?: string | null;
  glassName?: string | null;
  glassImage?: string | null;
};

export default function CocktailCardBody({
  title,
  priceLabel,
  ingredientRows,
  garnishes = [],
  volumeLabel,
  method,
  glassName,
  glassImage,
}: CocktailCardBodyProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700, color: "#e8e6e1" }}>{title}</div>
        {priceLabel ? (
          <div style={{ fontSize: 13, color: "#E0AE6B", fontWeight: 500, flexShrink: 0 }}>
            {priceLabel}
          </div>
        ) : null}
      </div>

      {ingredientRows.length ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          {ingredientRows.map((ingredient) => (
            <div key={ingredient.label} style={{ color: ingredient.color }}>
              {ingredient.dose ? <span style={{ opacity: 0.65 }}>{ingredient.dose} </span> : null}
              {ingredient.label}
            </div>
          ))}
        </div>
      ) : null}

      {garnishes.length ? (
        <div style={{ fontSize: 12, color: "#9ECB7A", lineHeight: 1.4 }}>
          Guarnición <span style={{ color: "#d9e8ca" }}>{garnishes.join(" · ")}</span>
        </div>
      ) : null}

      {volumeLabel ? (
        <div style={{ fontSize: 12, color: "#8FC1E0", fontWeight: 600, marginTop: 2 }}>
          Volumen {volumeLabel}
        </div>
      ) : null}

      {method || glassName ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            fontSize: 12,
            borderTop: "0.5px solid rgba(232,230,225,0.1)",
            paddingTop: 6,
            marginTop: 2,
          }}
        >
          {method ? (
            <span>
              Método <span style={{ color: "#8FC1E0", fontWeight: 600 }}>{method}</span>
            </span>
          ) : (
            <span />
          )}
          {glassName ? (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {glassImage ? (
                <Image
                  src={glassImage}
                  alt={glassName}
                  width={24}
                  height={32}
                  style={{ objectFit: "contain" }}
                />
              ) : null}
              <span style={{ fontSize: 11, color: "#7a7875" }}>{glassName}</span>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
