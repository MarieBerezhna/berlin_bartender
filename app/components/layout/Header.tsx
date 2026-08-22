"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { GROUP_COLOR } from "../../data/constants";
import RAW from "../../data/menu";
import type { MenuItem } from "../../data/types";
import { getIngredientGroup } from "../../lib/learn";
import RecipeModal from "../shared/RecipeModal";

export type AppMode = "test" | "learn" | "interactive";

type HeaderProps = {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
};

export default function Header({ mode, onModeChange }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isSearchOpen) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(timer);
  }, [isSearchOpen]);

  const searchableItems = useMemo(() => (RAW as MenuItem[]) ?? [], []);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (normalizedQuery.length < 3) {
      return [];
    }

    const matchedItems = searchableItems.filter((item) => {
      const haystack = [
        item.name,
        item.cat,
        item.family ?? "",
        ...(item.ingredients?.map((ingredient) => ingredient.name) ?? []),
        ...(item.prices?.map((price) => `${price.label} ${price.p}`) ?? []),
        item.comment ?? "",
        item.funFact ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });

    return matchedItems.slice(0, 12);
  }, [query, searchableItems]);

  function openSearch(): void {
    setQuery("");
    setIsSearchOpen(true);
  }

  function closeSearch(): void {
    setIsSearchOpen(false);
    setQuery("");
  }

  function handleSelectItem(item: MenuItem): void {
    if (!Array.isArray(item.ingredients) || item.ingredients.length === 0) {
      closeSearch();
      return;
    }

    setSelectedItem(item);
    closeSearch();
  }

  return (
    <>
      <div className="header-top">
        <div className="header-main">
          <h1>🍸 Café Berlín</h1>
          <div className="header-actions">
            <div className="mode-switch" id="modeSwitch">
              <button
                className={`mode-btn${mode === "test" ? " active" : ""}`}
                id="btnTest"
                onClick={() => onModeChange("test")}
              >
                🎯 Test
              </button>
              <button
                className={`mode-btn${mode === "learn" ? " active" : ""}`}
                id="btnLearn"
                onClick={() => onModeChange("learn")}
              >
                📖 Aprender
              </button>
              <button
                className={`mode-btn${mode === "interactive" ? " active" : ""}`}
                id="btnMenu"
                onClick={() => onModeChange("interactive")}
              >
                🧭 Explorar
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="search-fab"
        aria-label="Buscar cócteles"
        onClick={openSearch}
      >
        🔍
      </button>

      {isSearchOpen ? (
        <div
          className="search-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Buscar bebidas"
          onClick={closeSearch}
        >
          <div className="search-modal" onClick={(event) => event.stopPropagation()}>
            <div className="search-modal-header">
              <h2>Buscar bebidas</h2>
              <button
                type="button"
                className="search-modal-close"
                aria-label="Cerrar búsqueda"
                onClick={closeSearch}
              >
                ✕
              </button>
            </div>
            <input
              ref={inputRef}
              type="search"
              placeholder="Busca por nombre, categoría o ingrediente"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <div className="search-results">
              {results.length > 0 ? (
                results.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    className="search-result-item"
                    onClick={() => handleSelectItem(item)}
                  >
                    <div className="search-result-main">
                      <div className="search-result-heading">
                        <span className="search-result-name">{item.name}</span>
                        {item.prices?.length ? (
                          <span
                            className="search-result-price"
                            style={{ color: "#E0AE6B", fontWeight: 700 }}
                          >
                            {item.prices.map((price) => `${price.label}: ${price.p}€`).join(" • ")}
                          </span>
                        ) : null}
                      </div>
                      <span className="search-result-cat">{item.cat}</span>
                    </div>
                    <div className="search-result-ingredients">
                      {(item.ingredients ?? []).map((ingredient) => {
                        const group = getIngredientGroup(ingredient.name);
                        const color = GROUP_COLOR[group] ?? GROUP_COLOR.other;
                        return (
                          <span
                            key={`${item.name}-${ingredient.name}`}
                            className="search-result-ingredient"
                            style={{ color, borderColor: `${color}55` }}
                          >
                            {ingredient.name}
                          </span>
                        );
                      })}
                    </div>
                  </button>
                ))
              ) : query.trim().length >= 3 ? (
                <div className="search-empty">No hay resultados para esta búsqueda.</div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {selectedItem ? (
        <RecipeModal
          item={selectedItem}
          open={Boolean(selectedItem)}
          onClose={() => setSelectedItem(null)}
        />
      ) : null}
    </>
  );
}
