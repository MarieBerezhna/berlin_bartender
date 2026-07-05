"use client";

import { useState } from "react";

import {
	AUTOR_CAT,
	AUTOR_FAMILIES,
	CATS,
	CAT_DESCRIPTIONS,
	CLASICA_CAT,
	CLASICA_FAMILIES,
	DESTILADOS_SUBGROUPS,
	DESTILADOS_TAB,
} from "../../data/constants";

type TabBarProps = {
	activeTab: string;
	activeFamily: string | null;
	onTabChange: (tab: string) => void;
	onFamilyChange: (family: string | null) => void;
};

const hiddenCats = new Set([
	"Todo",
	CLASICA_CAT,
	AUTOR_CAT,
	"Spritz",
	"Sin Alcohol",
	DESTILADOS_TAB,
	"Ron",
	"Whisky",
	"Gin",
	"Tequila",
	"Vodka",
]);

const orderedTabs = [
	"Todo",
	CLASICA_CAT,
	AUTOR_CAT,
	"Micheladas",
	"Spritz",
	"Sin Alcohol",
	DESTILADOS_TAB,
	...CATS.filter((cat) => !hiddenCats.has(cat)),
].filter((tab, index, list) => list.indexOf(tab) === index);

export default function TabBar({
	activeTab,
	activeFamily,
	onTabChange,
	onFamilyChange,
}: TabBarProps) {
	const [openTooltipFor, setOpenTooltipFor] = useState<string | null>(null);
	const hasSubtabs =
		activeTab === AUTOR_CAT || activeTab === CLASICA_CAT || activeTab === DESTILADOS_TAB;
	const subtabFamilies =
		activeTab === DESTILADOS_TAB
			? DESTILADOS_SUBGROUPS
			: activeTab === AUTOR_CAT
				? AUTOR_FAMILIES
				: activeTab === CLASICA_CAT
					? CLASICA_FAMILIES
					: [];

	return (
		<>
			<div className="tabs-scroll">
				<div className="tabs" id="tabs">
					{orderedTabs.map((tab) => (
						<button
							key={tab}
							className={`tab${tab === activeTab ? " active" : ""}`}
							onClick={() => onTabChange(tab)}
						>
							{tab}
							{CAT_DESCRIPTIONS[tab as keyof typeof CAT_DESCRIPTIONS] ? (
								<span
									className={`tab-info${openTooltipFor === tab ? " open" : ""}`}
									onClick={(event) => {
										event.stopPropagation();
										setOpenTooltipFor((prev) => (prev === tab ? null : tab));
									}}
								>
									ⓘ
									<span className="tab-tooltip">{CAT_DESCRIPTIONS[tab as keyof typeof CAT_DESCRIPTIONS]}</span>
								</span>
							) : null}
						</button>
					))}
				</div>
			</div>
			<div className="tabs-scroll" id="subtabsWrap" style={{ display: hasSubtabs ? "" : "none" }}>
				<div className="tabs" id="subtabs">
					<button className={`tab${activeFamily === null ? " active" : ""}`} onClick={() => onFamilyChange(null)}>
						Todo
					</button>
					{subtabFamilies.map((family) => (
						<button
							key={family}
							className={`tab${activeFamily === family ? " active" : ""}`}
							onClick={() => onFamilyChange(family)}
						>
							{family}
						</button>
					))}
				</div>
			</div>
		</>
	);
}
