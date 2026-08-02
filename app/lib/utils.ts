import { useEffect } from "react";
import { Ingredient, Measure, MenuItem } from "../data/types";

function isInteractiveElement(target: EventTarget | null): boolean {
	if (!(target instanceof HTMLElement)) return false;
	if (target.isContentEditable) return true;
	return ["BUTTON", "INPUT", "TEXTAREA", "SELECT", "A"].includes(target.tagName);
}

export function useActivateOnKeys(enabled: boolean, action: () => void): void {
	useEffect(() => {
		if (!enabled) return;

		function handleKeyDown(event: KeyboardEvent): void {
			if (event.defaultPrevented) return;
			if (event.metaKey || event.ctrlKey || event.altKey) return;
			if (event.key !== "Enter" && event.key !== " ") return;
			if (isInteractiveElement(event.target)) return;

			event.preventDefault();
			action();
		}

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [action, enabled]);
}

function formatIngredientDose(qty?: number, measure?: Measure): string | null {
	if (qty == null) return null;
	const numeric = Number(qty);
	if (Number.isNaN(numeric)) return null;
	return measure ? `${numeric} ${measure}` : `${numeric}`;
}

export function getIngr(item: MenuItem): string[] {
	return getIngredients(item).map((ingredient) => ingredient.name);
}

export function getIngredients(item: MenuItem): Ingredient[] {
	return item.ingredients || [];
}

export function getIngredientEntries(item: MenuItem): Array<{ name: string; dose: string | null }> {
	return (item.ingredients || []).map((ingredient) => ({
		name: ingredient.name,
		dose: formatIngredientDose(ingredient.qty, ingredient.measure),
	}));
}

export function getIngredientDose(item: MenuItem, ingredientName: string): string | null {
	return getIngredientEntries(item).find((entry) => entry.name === ingredientName)?.dose ?? null;
}

export function getVolumeOz(item: MenuItem): number | null {
	const total = (item.ingredients || []).reduce((sum, ingredient) => {
		if (ingredient.measure !== Measure.Oz || ingredient.qty == null) return sum;
		const numeric = Number(ingredient.qty);
		return Number.isNaN(numeric) ? sum : sum + numeric;
	}, 0);

	return total > 0 ? total : null;
}

export function formatVolumeOz(value: number | null): string | null {
	if (value == null) return null;
	const rounded = Number(value.toFixed(2));
	const normalized = rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(2).replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
	return `${normalized} oz`;
}

export function isCitrusIngredient(name: string): boolean {
	const normalized = name.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
	return /(limon|lima|naranja|orange|citric|citrico)/.test(normalized);
}

export function isCarbonatedIngredient(name: string, measure?: Measure): boolean {
	if (measure === Measure.Top) return true;
	const normalized = name.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
	return /(soda|7up|ginger beer|ginger ale|tonica|tónica|cola|pepsi|spritz|sparkling|carbonat|gaseosa|pomelo|limonada|cava|cerveza|beer|champagne)/.test(normalized);
}

export function toMl(qty: number | null | undefined, measure?: Measure): number | null {
	if (qty == null) return null;
	const numeric = Number(qty);
	if (Number.isNaN(numeric)) return null;

	switch (measure) {
		case Measure.Oz:
			return numeric * 30;
		case Measure.Cl:
			return numeric * 10;
		case Measure.Ml:
			return numeric;
		default:
			return null;
	}
}

export function formatMl(value: number | null): string | null {
	if (value == null) return null;
	const rounded = Number(value.toFixed(2));
	const normalized = rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(2).replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
	return `${normalized} ml`;
}

export function toPublicPath(path: string): string {
	if (!path) return "";
	return path.startsWith("./") ? path.replace("./", "/") : path;
}