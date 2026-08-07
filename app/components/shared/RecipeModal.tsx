"use client";

import { useEffect, useState, type ReactNode } from "react";
import { GROUP_COLOR, type MenuItem } from "../../data/constants";
import IMAGES from "../../data/images";
import { formatPrice, getIngredientGroup } from "../../lib/learn";
import {
  formatVolumeOz,
  getVolumeOz,
  isCarbonatedIngredient,
  isCitrusIngredient,
  toMl,
  toPublicPath,
} from "@/app/lib/utils";
import { Measure } from "../../data/types";
import RecipeCard from "./RecipeCard";
import CocktailCardBody from "./CocktailCardBody";

type RecipeModalProps = {
  item: MenuItem;
  open: boolean;
  onClose: () => void;
};

type TabMode = "receta" | "pre-batch";

type BadgeProps = {
  children: ReactNode;
  color: string;
  borderColor: string;
  background: string;
};

function getTabButtonStyle(active: boolean) {
  return {
    border: "none",
    borderRadius: 999,
    padding: "8px 12px",
    background: active ? "#e8e6e1" : "rgba(232,230,225,0.12)",
    color: active ? "#11110f" : "#e8e6e1",
    fontWeight: 700,
    cursor: "pointer",
  } as const;
}

function getBadgeStyle(color: string, borderColor: string, background: string) {
  return {
    display: "inline-flex",
    alignItems: "center",
    alignSelf: "flex-start",
    border: `0.5px solid ${borderColor}`,
    borderRadius: 999,
    padding: "6px 10px",
    background,
    color,
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 1.2,
  } as const;
}

function Badge({ children, color, borderColor, background }: BadgeProps) {
  return <div style={getBadgeStyle(color, borderColor, background)}>{children}</div>;
}

export default function RecipeModal({ item, open, onClose }: RecipeModalProps) {
  const [activeTab, setActiveTab] = useState<TabMode>("receta");
  const [bottleVolumeMl, setBottleVolumeMl] = useState(750);
  const [selectedScaleValue, setSelectedScaleValue] = useState(750);
  const bottleVolumeOptions = [750, 1500] as const;
  const scaleOptions = [
    { label: "x2", value: 2, kind: "portion" as const },
    { label: "x3", value: 3, kind: "portion" as const },
    { label: "x4", value: 4, kind: "portion" as const },
    { label: "x5", value: 5, kind: "portion" as const },
    { label: "x6", value: 6, kind: "portion" as const },
    ...bottleVolumeOptions.map((value) => ({
      label: `${value} ml`,
      value,
      kind: "bottle" as const,
    })),
  ];
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  const volumeOz = getVolumeOz(item);
  const volumeLabel = formatVolumeOz(volumeOz);
  const cocktailVolumeMl = volumeOz != null ? volumeOz * 30 : 0;
  const cocktailsCount = cocktailVolumeMl > 0 ? Math.floor(bottleVolumeMl / cocktailVolumeMl) : 0;
  const remainderMl = cocktailVolumeMl > 0 ? bottleVolumeMl % cocktailVolumeMl : bottleVolumeMl;
  const selectedScaleOption = scaleOptions.find((option) => option.value === selectedScaleValue);
  const bottleMultiplier = cocktailVolumeMl > 0 ? Math.floor(bottleVolumeMl / cocktailVolumeMl) : 0;
  const multiplier =
    selectedScaleOption?.kind === "portion" ? Number(selectedScaleValue) : bottleMultiplier;
  const scaledIngredients = (item.ingredients || []).map((ingredient) => {
    const qty = ingredient.qty == null ? null : Number(ingredient.qty) * multiplier;
    return {
      ...ingredient,
      qty,
    };
  });
  const longTermIngredients = scaledIngredients.filter(
    (ingredient) =>
      !isCitrusIngredient(ingredient.name) &&
      !isCarbonatedIngredient(ingredient.name, ingredient.measure),
  );
  const citrusIngredients = scaledIngredients.filter((ingredient) =>
    isCitrusIngredient(ingredient.name),
  );
  const carbonatedIngredients = scaledIngredients.filter((ingredient) =>
    isCarbonatedIngredient(ingredient.name, ingredient.measure),
  );
  const hasCitrus = citrusIngredients.length > 0;
  const hasCarbonics = carbonatedIngredients.length > 0;
  const shouldShowPrebatchTab =
    longTermIngredients.filter(
      (ingredient) => ingredient.measure === Measure.Oz || ingredient.measure == null,
    ).length > 1;
  const prebatchPerServingMl = (item.ingredients || []).reduce((sum, ingredient) => {
    if (isCitrusIngredient(ingredient.name)) return sum;
    const converted = toMl(ingredient.qty, ingredient.measure);
    return converted == null ? sum : sum + converted;
  }, 0);
  const baseIngredients = item.ingredients ?? [];
  const garnishes = item.garnish ?? [];
  const priceLabel = formatPrice(item);
  const glassName = item.glass ?? null;
  const glassImage = glassName ? toPublicPath(IMAGES[`glass:${glassName}`]) : null;
  const formatDoseInOz = (qty: number | null | undefined, measure?: Measure) => {
    if (qty == null) return null;
    const numeric = Number(qty);
    if (Number.isNaN(numeric)) return null;
    if (measure === Measure.Oz || measure == null) {
      return `${Number(numeric.toFixed(2))} oz`;
    }
    const mlValue = toMl(numeric, measure);
    if (mlValue == null) return `${Number(numeric.toFixed(2))} ${measure}`;
    return `${Number((mlValue / 30).toFixed(2))} oz`;
  };
  const formatServingTimeInstruction = (
    ingredients: Array<{ name: string; measure?: Measure }>,
  ) => {
    const names = ingredients.map((ingredient) => ingredient.name).join(" · ");
    if (!names) return null;
    const hasTopMeasure = ingredients.some((ingredient) => ingredient.measure === Measure.Top);
    return hasTopMeasure ? `Añade ${names} al servir, en la copa.` : `Añade ${names} al servir.`;
  };
  const ingredientRows = scaledIngredients.map((ingredient) => ({
    label: ingredient.name,
    dose: formatDoseInOz(ingredient.qty, ingredient.measure),
    color: GROUP_COLOR[getIngredientGroup(ingredient.name)] ?? GROUP_COLOR.other,
  }));
  const longTermRows = longTermIngredients.map((ingredient) => ({
    label: ingredient.name,
    dose: formatDoseInOz(ingredient.qty, ingredient.measure),
    color: GROUP_COLOR[getIngredientGroup(ingredient.name)] ?? GROUP_COLOR.other,
  }));
  const citrusAdditions = baseIngredients.filter((ingredient) =>
    isCitrusIngredient(ingredient.name),
  );
  const servingTimeInstruction = formatServingTimeInstruction(carbonatedIngredients);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.78)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 760,
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: 20,
          border: "0.5px solid rgba(232,230,225,0.16)",
          background: "#11110f",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          padding: 16,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 700, color: "#e8e6e1" }}>
            Receta · {item.name}
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: "none",
              background: "rgba(232,230,225,0.1)",
              color: "#e8e6e1",
              padding: "8px 12px",
              borderRadius: 999,
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Cerrar
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
            marginBottom: 12,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={() => setActiveTab("receta")}
              style={getTabButtonStyle(activeTab === "receta")}
            >
              Receta
            </button>
            {shouldShowPrebatchTab ? (
              <button
                type="button"
                onClick={() => setActiveTab("pre-batch")}
                style={getTabButtonStyle(activeTab === "pre-batch")}
              >
                Pre-batch
              </button>
            ) : null}
          </div>
          {activeTab === "pre-batch" ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <select
                value={selectedScaleValue}
                onChange={(event) => {
                  const nextValue = Number(event.target.value);
                  setSelectedScaleValue(nextValue);
                  if (nextValue === 750 || nextValue === 1500) {
                    setBottleVolumeMl(nextValue);
                  }
                }}
                style={{
                  border: "1px solid rgba(232,230,225,0.16)",
                  borderRadius: 999,
                  background: "#f2eee6",
                  color: "#11110f",
                  padding: "7px 12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                {scaleOptions.map((option) => (
                  <option
                    key={`${option.kind}-${option.value}`}
                    value={option.value}
                    style={{ color: "#11110f", backgroundColor: "#f2eee6" }}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>

        {activeTab === "receta" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <RecipeCard item={item} disableModal showVolumeLabel={false} />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ fontSize: 12, color: "#8FC1E0", fontWeight: 600 }}>
                Volumen {volumeLabel}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 4 }}>
            <div style={{ fontSize: 14, color: "#8FC1E0", fontWeight: 700 }}>
              {selectedScaleOption?.kind === "bottle" ? (
                <>
                  Caben <span style={{ color: "#e8e6e1" }}>{cocktailsCount}</span> cócteles en una
                  botella de {bottleVolumeMl} ml
                </>
              ) : (
                <>
                  Escala seleccionada:{" "}
                  <span style={{ color: "#e8e6e1" }}>{selectedScaleOption?.label ?? "—"}</span>
                </>
              )}
            </div>
            {selectedScaleOption?.kind === "bottle" && remainderMl > 0 ? (
              <div style={{ fontSize: 12, color: "#9a9793" }}>Resto: {remainderMl} ml</div>
            ) : null}
            <div
              style={{
                border: "0.5px solid rgba(232,230,225,0.15)",
                borderRadius: 12,
                background: "#161614",
                padding: 12,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {hasCitrus || hasCarbonics ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div
                    style={{
                      border: "0.5px solid rgba(232,230,225,0.12)",
                      borderRadius: 12,
                      background: "#161614",
                      padding: 12,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {hasCitrus ? (
                      <Badge
                        color="#E0AE6B"
                        borderColor="rgba(224,174,107,0.3)"
                        background="rgba(224,174,107,0.08)"
                      >
                        Same day use
                      </Badge>
                    ) : null}
                    {hasCarbonics ? (
                      <Badge
                        color="#8FC1E0"
                        borderColor="rgba(143,193,224,0.3)"
                        background="rgba(143,193,224,0.08)"
                      >
                        Add at serving time
                      </Badge>
                    ) : null}
                    <CocktailCardBody
                      title={item.name}
                      priceLabel={priceLabel}
                      ingredientRows={ingredientRows}
                      garnishes={garnishes}
                      volumeLabel={null}
                      method={item.method}
                      glassName={glassName}
                      glassImage={glassImage}
                    />
                  </div>

                  <div
                    style={{
                      border: "0.5px solid rgba(232,230,225,0.12)",
                      borderRadius: 12,
                      background: "#161614",
                      padding: 12,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <Badge
                      color="#8FC1E0"
                      borderColor="rgba(143,193,224,0.3)"
                      background="rgba(143,193,224,0.08)"
                    >
                      Long-term prebatch
                    </Badge>
                    <CocktailCardBody
                      title={item.name}
                      priceLabel={priceLabel}
                      ingredientRows={longTermRows}
                      garnishes={garnishes}
                      volumeLabel={null}
                      method={item.method}
                      glassName={glassName}
                      glassImage={glassImage}
                    />
                    <div
                      style={{
                        fontSize: 12,
                        color: "#d9e8ca",
                        lineHeight: 1.45,
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      <div>
                        Por porción usa{" "}
                        <span style={{ color: "#e8e6e1", fontWeight: 700 }}>
                          {formatDoseInOz(prebatchPerServingMl / 30, Measure.Oz) ?? "—"}
                        </span>{" "}
                        de prebatch.
                      </div>
                      {hasCitrus ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          {citrusAdditions.map((ingredient) => (
                            <div key={`${ingredient.name}-${ingredient.qty}`}>
                              Añade{" "}
                              <span style={{ color: "#e8e6e1", fontWeight: 700 }}>
                                {formatDoseInOz(ingredient.qty, ingredient.measure) ?? "—"}
                              </span>{" "}
                              de{" "}
                              <span style={{ color: "#e8e6e1", fontWeight: 700 }}>
                                {ingredient.name}
                              </span>{" "}
                              al momento del pedido.
                            </div>
                          ))}
                        </div>
                      ) : null}
                      {hasCarbonics ? (
                        <div>
                          {servingTimeInstruction ? (
                            <span style={{ color: "#e8e6e1", fontWeight: 700 }}>
                              {servingTimeInstruction}
                            </span>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
              <div style={{ fontSize: 12, color: "#8FC1E0", fontWeight: 600 }}>
                Volumen {volumeLabel}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
