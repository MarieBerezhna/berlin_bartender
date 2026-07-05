"use client";

import { useMemo, useState } from "react";

import {
	AUTOR_CAT,
	AUTOR_FAMILIES,
	CLASICA_CAT,
	CLASICA_FAMILIES,
	DESTILADOS_CATS,
	DESTILADOS_SUBGROUPS,
	INGR_GROUP,
	MENU_SPIRIT_HINTS,
	type MenuItem,
} from "../../data/constants";
import RAW from "../../data/menu";

type InteractiveFilterKey =
	| "spirits"
	| "licores"
	| "cervezas"
	| "vinosVermuts"
	| "bitters"
	| "zumosRefrescos"
	| "frutas"
	| "siropes"
	| "otros";

type InteractiveState = Record<InteractiveFilterKey, string[]>;
type AccordionState = Record<InteractiveFilterKey, boolean>;

type InteractiveItem = {
	name: string;
	price: number;
	priceLabel: string;
	section: string;
	spiritBrand: string;
	spirits: string[];
	licores: string[];
	cervezas: string[];
	vinosVermuts: string[];
	bitters: string[];
	zumosRefrescos: string[];
	frutas: string[];
	siropes: string[];
	otros: string[];
};

const SPIRIT_FAMILY_PATTERNS: Array<[RegExp, string]> = [
	[/vodka|moskovskaya|smirnoff/i, "Vodka"],
	[/tequila|don julio/i, "Tequila"],
	[/ron|bumbu|diplom[aá]tico|zacapa|barcel[oó]/i, "Ron"],
	[/whisky|whiskey|jack daniels|tullamore|bulleit|monkey shoulder|macallan|bushmills|toki/i, "Whisky"],
	[/gin|tanqueray|hendrick/i, "Gin"],
];

const EMPTY_STATE: InteractiveState = {
	spirits: [],
	licores: [],
	cervezas: [],
	vinosVermuts: [],
	bitters: [],
	zumosRefrescos: [],
	frutas: [],
	siropes: [],
	otros: [],
};

const DEFAULT_ACCORDION: AccordionState = {
	spirits: true,
	licores: false,
	cervezas: false,
	vinosVermuts: false,
	bitters: false,
	zumosRefrescos: false,
	frutas: false,
	siropes: false,
	otros: false,
};

const COMBINADOS_TAB = "Combinados";
const interactiveCats = ["Todo", COMBINADOS_TAB, "Cócteles de autor", "Coctelería clásica", "Micheladas", "Spritz"];

function fmt(price: number): string {
	return `${price.toFixed(2).replace(".", ",")} €`;
}

function ingrGroup(name: string): string {
	return INGR_GROUP[name] || "other";
}

function getSpiritFamily(label: string): string {
	const normalized = String(label || "").trim();
	if (!normalized) return "Otros";
	if (DESTILADOS_CATS.includes(normalized)) return normalized;
	if (normalized === "Whiskey") return "Whisky";

	for (const [pattern, family] of SPIRIT_FAMILY_PATTERNS) {
		if (pattern.test(normalized)) return family;
	}

	return normalized;
}

function getMainSpirit(item: MenuItem): string {
	const cat = String(item?.cat || "").trim();
	if (DESTILADOS_CATS.includes(cat)) return getSpiritFamily(cat);

	const ingr = Array.isArray(item?.ingr) ? item.ingr : [];
	if (!ingr.length) return "Otros";

	const ordered = ["Tequila", "Gin", "Vodka", "Ron", "Whisky", "Whiskey", "Fino"];
	for (const known of ordered) {
		if (ingr.includes(known)) return known;
	}

	const excludedSpirits = new Set(["Cerveza", "Vino tinto"]);
	const spiritCandidates = ingr.filter((ing) => {
		const group = ingrGroup(ing);
		return group === "spirit" && !excludedSpirits.has(ing) && (MENU_SPIRIT_HINTS.has(ing) || ordered.includes(ing));
	});

	if (spiritCandidates.length) return getSpiritFamily(spiritCandidates[0]);
	return "Otros";
}

function getInteractiveSpiritGroup(item: MenuItem): string {
	const cat = String(item?.cat || "").trim();
	if (DESTILADOS_CATS.includes(cat)) return getSpiritFamily(cat);

	const ingr = Array.isArray(item?.ingr) ? item.ingr : [];
	for (const ingredient of ingr) {
		if (ingrGroup(ingredient) === "spirit") {
			const family = getSpiritFamily(ingredient);
			if (family !== "Otros") return family;
		}
	}

	return "Otros";
}

function getInteractivePool(activeTab: string, activeFamily: string | null, includeAll = false): MenuItem[] {
	let pool: MenuItem[];

	if (activeTab === COMBINADOS_TAB) {
		pool = (RAW as MenuItem[]).filter((item) => DESTILADOS_CATS.includes(item.cat));
	} else {
		const allowedCats = new Set(["Cócteles de autor", "Coctelería clásica", "Micheladas", "Spritz"]);
		pool = (RAW as MenuItem[]).filter(
			(item) => allowedCats.has(item.cat) && item.hasIngr && Array.isArray(item.ingr) && item.ingr.length,
		);
	}

	if (activeTab !== "Todo") {
		if (activeTab === COMBINADOS_TAB) {
			pool = pool.filter((item) => item.cat === activeFamily || !activeFamily);
		} else {
			pool = pool.filter((item) => item.cat === activeTab);
			if (activeFamily) pool = pool.filter((item) => item.family === activeFamily);
		}
	}

	return pool;
}

function buildInteractiveMenuData(items: MenuItem[], preferCombinedPrice: boolean): InteractiveItem[] {
	return items.map((item) => {
		const ingr = Array.isArray(item?.ingr) ? item.ingr : [];
		const section = item?.family || item?.cat || "Otros";
		const spiritGroup = getInteractiveSpiritGroup(item);
		const spirit = spiritGroup === "Otros" ? getMainSpirit(item) : spiritGroup;
		const excludedSpirits = new Set(["Cerveza", "Vino tinto", "Vermut", "Vermut tinto", "Cava"]);
		const spirits = uniqueSorted(
			DESTILADOS_CATS.includes(item.cat)
				? [getSpiritFamily(item.cat)]
				: ingr
					.filter((ing) => ingrGroup(ing) === "spirit" && !excludedSpirits.has(ing))
					.map((ing) => getSpiritFamily(ing))
					.filter((ing) => ing !== "Otros"),
		);
		const licores = ingr.filter((ing) => ingrGroup(ing) === "liqueur");
		const cervezas = ingr.filter((ing) => ingrGroup(ing) === "beer");
		const vinosVermuts = ingr.filter((ing) => ingrGroup(ing) === "wine");
		const bitters = ingr.filter((ing) => ingrGroup(ing) === "bitter");
		const zumosRefrescos = ingr.filter((ing) => {
			const group = ingrGroup(ing);
			return group === "juice" || group === "filler";
		});
		const frutas = ingr.filter((ing) => ingrGroup(ing) === "fruit");
		const siropes = ingr.filter((ing) => ingrGroup(ing) === "sweet");
		const otros = ingr.filter(
			(ing) =>
				!spirits.includes(ing) &&
				!licores.includes(ing) &&
				!cervezas.includes(ing) &&
				!vinosVermuts.includes(ing) &&
				!bitters.includes(ing) &&
				!zumosRefrescos.includes(ing) &&
				!frutas.includes(ing) &&
				!siropes.includes(ing),
		);
		const displayPrice = getDisplayPrice(item, preferCombinedPrice);

		return {
			name: item.name,
			price: displayPrice.price,
			priceLabel: displayPrice.priceLabel,
			section,
			spiritBrand: spirit,
			spirits,
			licores,
			cervezas,
			vinosVermuts,
			bitters,
			zumosRefrescos,
			frutas,
			siropes,
			otros,
		};
	});
}

function matchesInteractiveFilters(item: InteractiveItem, state: InteractiveState): boolean {
	if (state.spirits.length && !state.spirits.some((v) => item.spirits.includes(v))) return false;
	if (state.licores.length && !state.licores.some((v) => item.licores.includes(v))) return false;
	if (state.cervezas.length && !state.cervezas.some((v) => item.cervezas.includes(v))) return false;
	if (state.vinosVermuts.length && !state.vinosVermuts.some((v) => item.vinosVermuts.includes(v))) return false;
	if (state.bitters.length && !state.bitters.some((v) => item.bitters.includes(v))) return false;
	if (state.zumosRefrescos.length && !state.zumosRefrescos.some((v) => item.zumosRefrescos.includes(v))) return false;
	if (state.frutas.length && !state.frutas.some((v) => item.frutas.includes(v))) return false;
	if (state.siropes.length && !state.siropes.some((v) => item.siropes.includes(v))) return false;
	if (state.otros.length && !state.otros.some((v) => item.otros.includes(v))) return false;
	return true;
}

function uniqueSorted(values: string[]): string[] {
	return [...new Set(values)].sort();
}

function countMatches(source: InteractiveItem[], key: InteractiveFilterKey, value: string): number {
	return source.filter((item) => item[key].includes(value)).length;
}

function getDisplayPrice(item: MenuItem, preferCombined: boolean): { price: number; priceLabel: string } {
	const prices = Array.isArray(item.prices) ? item.prices : [];
	if (!prices.length) return { price: 0, priceLabel: "" };

	if (preferCombined) {
		const preferred = prices.find((entry) => entry.label === "combinado") || prices.find((entry) => entry.label === "copa") || prices[0];
		return { price: preferred.p, priceLabel: preferred.label };
	}

	const cheapest = prices.reduce((lowest, entry) => (entry.p < lowest.p ? entry : lowest), prices[0]);
	return { price: cheapest.p, priceLabel: cheapest.label };
}

export default function InteractiveMenu() {
	const [activeTab, setActiveTab] = useState<string>("Todo");
	const [activeFamily, setActiveFamily] = useState<string | null>(null);
	const [interactiveState, setInteractiveState] = useState<InteractiveState>(EMPTY_STATE);
	const [accordionState, setAccordionState] = useState<AccordionState>(DEFAULT_ACCORDION);

	const preferCombinedPrice = activeTab === COMBINADOS_TAB;

	const data = useMemo(
		() => buildInteractiveMenuData(getInteractivePool(activeTab, activeFamily, false), preferCombinedPrice),
		[activeFamily, activeTab, preferCombinedPrice],
	);

	const source = useMemo(
		() => buildInteractiveMenuData(getInteractivePool(activeTab, activeFamily, true), preferCombinedPrice),
		[activeFamily, activeTab, preferCombinedPrice],
	);

	const list = useMemo(() => data.filter((item) => matchesInteractiveFilters(item, interactiveState)), [data, interactiveState]);

	const hasSubtabs = activeTab === AUTOR_CAT || activeTab === CLASICA_CAT || activeTab === COMBINADOS_TAB;
	const subtabFamilies =
		activeTab === COMBINADOS_TAB
			? DESTILADOS_SUBGROUPS
			: activeTab === AUTOR_CAT
				? AUTOR_FAMILIES
				: activeTab === CLASICA_CAT
					? CLASICA_FAMILIES
					: [];

	const available = {
		spirits: uniqueSorted(source.flatMap((item) => item.spirits)),
		licores: uniqueSorted(source.flatMap((item) => item.licores)),
		cervezas: uniqueSorted(source.flatMap((item) => item.cervezas)),
		vinosVermuts: uniqueSorted(source.flatMap((item) => item.vinosVermuts)),
		bitters: uniqueSorted(source.flatMap((item) => item.bitters)),
		zumosRefrescos: uniqueSorted(source.flatMap((item) => item.zumosRefrescos)),
		frutas: uniqueSorted(source.flatMap((item) => item.frutas)),
		siropes: uniqueSorted(source.flatMap((item) => item.siropes)),
		otros: uniqueSorted(source.flatMap((item) => item.otros)),
	} satisfies Record<InteractiveFilterKey, string[]>;

	function resetInteractiveState(): void {
		setInteractiveState(EMPTY_STATE);
	}

	function handleTab(tab: string): void {
		setActiveTab(tab);
		setActiveFamily(null);
		resetInteractiveState();
	}

	function handleFamily(family: string | null): void {
		setActiveFamily(family);
		resetInteractiveState();
	}

	function toggleFilter(key: InteractiveFilterKey, value: string): void {
		setInteractiveState((prev) => {
			const next = { ...prev, [key]: [...prev[key]] };
			const idx = next[key].indexOf(value);
			if (idx === -1) next[key].push(value);
			else next[key].splice(idx, 1);
			return next;
		});
	}

	function clearFilter(key: InteractiveFilterKey): void {
		setInteractiveState((prev) => ({ ...prev, [key]: [] }));
	}

	function toggleAccordion(key: InteractiveFilterKey): void {
		setAccordionState((prev) => ({ ...prev, [key]: !prev[key] }));
	}

	function renderGroup(
		label: string,
		values: string[],
		key: InteractiveFilterKey,
		showCounts: boolean,
	) {
		if (!values.length) return null;
		const selected = interactiveState[key];
		const open = accordionState[key] ?? (selected.length > 0 || key === "spirits");

		return (
			<div className={`interactive-filter-section${open ? " open" : ""}`} data-key={key} key={key}>
				<button className="interactive-filter-toggle" onClick={() => toggleAccordion(key)}>
					<span>{label}</span>
					<span>{open ? "-" : "+"}</span>
				</button>
				<div className="interactive-filter-body">
					{values.map((value) => {
						const active = selected.includes(value);
						const count = showCounts ? countMatches(source, key, value) : null;
						return (
							<button
								key={`${key}-${value}`}
								className={`interactive-filter-btn${active ? " active" : ""}`}
								onClick={() => toggleFilter(key, value)}
							>
								<span>
									{active ? "✓ " : ""}
									{value}
								</span>
								{count !== null ? <span className="count">({count})</span> : null}
							</button>
						);
					})}
					{selected.length ? (
						<button className="interactive-clear" onClick={() => clearFilter(key)}>
							limpiar
						</button>
					) : null}
				</div>
			</div>
		);
	}

	return (
		<div className="interactive-shell">
			<div className="interactive-header">
				<div className="interactive-wordmark">Café Berlín · Menú interactivo</div>
				<div className="interactive-tabs">
					{interactiveCats.map((tab) => (
						<button
							key={tab}
							className={`interactive-tab${activeTab === tab ? " active" : ""}`}
							onClick={() => handleTab(tab)}
						>
							{tab}
						</button>
					))}
				</div>
				{hasSubtabs ? (
					<div className="interactive-tabs" style={{ marginTop: 4 }}>
						<button
							className={`interactive-tab${activeFamily === null ? " active" : ""}`}
							onClick={() => handleFamily(null)}
						>
							Todos
						</button>
						{subtabFamilies.map((family) => (
							<button
								key={family}
								className={`interactive-tab${activeFamily === family ? " active" : ""}`}
								onClick={() => handleFamily(family)}
							>
								{family}
							</button>
						))}
					</div>
				) : null}
			</div>

			<div className="interactive-count">
				{list.length} {list.length === 1 ? "cóctel" : "cócteles"}
			</div>

			<div className="interactive-layout">
				<div className="interactive-filters">
					{renderGroup("Destilados", available.spirits, "spirits", true)}
					{renderGroup("Licores", available.licores, "licores", false)}
					{renderGroup("Cervezas", available.cervezas, "cervezas", false)}
					{renderGroup("Vino & Vermuts", available.vinosVermuts, "vinosVermuts", false)}
					{available.bitters.length ? renderGroup("Bitters", available.bitters, "bitters", false) : null}
					{renderGroup("Zumos & refrescos", available.zumosRefrescos, "zumosRefrescos", false)}
					{renderGroup("Frutas", available.frutas, "frutas", false)}
					{renderGroup("Sirope", available.siropes, "siropes", false)}
					{renderGroup("Otros ingredientes", available.otros, "otros", false)}
				</div>

				<div className="interactive-cards">
					{list.length ? (
						list.map((item) => (
							<div className="interactive-card" key={`${item.section}-${item.name}`}>
								<div className="interactive-card-top">
									<div className="interactive-card-name">{item.name}</div>
									<div className="interactive-card-price">
										{item.priceLabel ? <span style={{ textTransform: "capitalize" }}>{item.priceLabel} </span> : null}
										{fmt(item.price)}
									</div>
								</div>
								<div className="interactive-card-badges">
									<span className="interactive-badge interactive-badge-section">{item.section}</span>
									<span className="interactive-badge interactive-badge-spirit">{item.spiritBrand}</span>
								</div>
								<div className="interactive-card-desc">
									{[
										...item.licores,
										...item.cervezas,
										...item.vinosVermuts,
										...item.bitters,
										...item.zumosRefrescos,
										...item.frutas,
										...item.siropes,
										...item.otros,
									].join(" · ")}
								</div>
							</div>
						))
					) : (
						<div className="interactive-empty">Ningún cóctel coincide con los filtros seleccionados.</div>
					)}
				</div>
			</div>
		</div>
	);
}

