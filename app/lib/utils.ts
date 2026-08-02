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
	if (item.ingredients?.length) {
		return item.ingredients;
	}

	return Object.keys(item.ingr || {}).map((name) => ({ name }));
}

export function getIngredientEntries(item: MenuItem): Array<{ name: string; dose: string | null }> {
	const structuredIngredients = item.ingredients?.length
		? item.ingredients.map((ingredient) => ({
			name: ingredient.name,
			dose: formatIngredientDose(ingredient.qty, ingredient.measure),
		}))
		: [];

	if (structuredIngredients.length) {
		return structuredIngredients;
	}

	return Object.entries(item.ingr || {})
		.filter(([, dose]) => dose != null)
		.map(([name, dose]) => ({ name, dose: String(dose) }));
}

export function getIngredientDose(item: MenuItem, ingredientName: string): string | null {
	return getIngredientEntries(item).find((entry) => entry.name === ingredientName)?.dose ?? null;
}

export function toPublicPath(path: string): string {
	if (!path) return "";
	return path.startsWith("./") ? path.replace("./", "/") : path;
}