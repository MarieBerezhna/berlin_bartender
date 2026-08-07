"use client";

import Image from "next/image";
import { useState } from "react";

import { GROUP_COLOR, type MenuItem } from "../../data/constants";
import IMAGES from "../../data/images";
import { formatPrice, getIngredientGroup, sortIngredientsForStudy } from "../../lib/learn";
import { formatVolumeOz, getVolumeOz, toPublicPath } from "@/app/lib/utils";
import CocktailCardBody from "./CocktailCardBody";
import RecipeModal from "./RecipeModal";

type RecipeCardProps = {
  item: MenuItem;
  disableModal?: boolean;
  showVolumeLabel?: boolean;
  volumeLabel?: string | null;
};

export default function RecipeCard({
  item,
  disableModal = false,
  showVolumeLabel = true,
  volumeLabel: providedVolumeLabel,
}: RecipeCardProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const itemImage = toPublicPath(IMAGES[item.name]);
  const glassName = item.glass ?? null;
  const glassImage = glassName && toPublicPath(IMAGES[`glass:${glassName}`]);
  const sortedIngr = sortIngredientsForStudy(item);
  const garnishes = item.garnish ?? [];
  const priceLabel = formatPrice(item);
  const volumeLabel = providedVolumeLabel ?? formatVolumeOz(getVolumeOz(item));

  return (
    <>
      <div
        style={{
          borderRadius: 10,
          overflow: "hidden",
          border: "0.5px solid rgba(232,230,225,0.15)",
          background: "#161614",
          cursor: disableModal ? "default" : "pointer",
        }}
        onClick={() => {
          if (!disableModal) {
            setSelectedItem(item);
          }
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (disableModal) return;
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setSelectedItem(item);
          }
        }}
      >
        {itemImage ? (
          <Image
            src={itemImage}
            alt={item.name}
            width={600}
            height={120}
            style={{ width: "100%", height: 120, objectFit: "cover", display: "block" }}
          />
        ) : null}
        <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
          <CocktailCardBody
            title={item.name}
            priceLabel={priceLabel}
            ingredientRows={sortedIngr.map((ing) => ({
              label: ing,
              color: GROUP_COLOR[getIngredientGroup(ing)] ?? GROUP_COLOR.other,
            }))}
            garnishes={garnishes}
            volumeLabel={showVolumeLabel ? volumeLabel : null}
            method={item.method}
            glassName={glassName}
            glassImage={glassImage}
          />
        </div>
      </div>
      {!disableModal ? (
        <RecipeModal
          item={item}
          open={selectedItem?.name === item.name}
          onClose={() => setSelectedItem(null)}
        />
      ) : null}
    </>
  );
}
