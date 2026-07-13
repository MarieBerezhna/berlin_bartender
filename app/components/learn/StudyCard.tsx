import Image from "next/image";
import { useEffect, useState } from "react";

import { COUNTRY_FLAGS, ITEM_ORIGINS, type MenuItem } from "../../data/constants";
import IMAGES from "../../data/images";
import { formatPrice, getIngredientGroup, getIngredientGroupLabel } from "../../lib/learn";
import { getIngr, ITEM_DESCRIPTIONS } from "../../data/constants";
import { useActivateOnKeys } from "../../lib/utils";

type StudyCardProps = {
	item: MenuItem;
	index: number;
	total: number;
	onPrimaryAction: () => void;
};

function IngredientTooltip({ description }: { description: string }) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!open) return;
		const close = () => setOpen(false);
		document.addEventListener("click", close);
		return () => document.removeEventListener("click", close);
	}, [open]);

	return (
		<span className="ingr-info-wrap" data-open={open ? "true" : undefined}>
			<button
				type="button"
				className="ingr-info-btn"
				onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
				aria-label="Información"
			>
				ⓘ
			</button>
			<span
				className="ingr-info-tooltip"
				dangerouslySetInnerHTML={{ __html: description }}
			/>
		</span>
	);
}

const ROW_GROUPS = [
	["spirit", "liqueur","wine", "beer", ],
	["bitter", "filler", "sweet", "fruit", "other"],
];

function toPublicPath(path: string | null | undefined): string | null {
	if (!path) return null;
	return path.startsWith("./") ? path.replace("./", "/") : path;
}

export default function StudyCard({ item, index, total, onPrimaryAction }: StudyCardProps) {
	const image = toPublicPath(IMAGES[item.name]);
	const hasRecipe = getIngr(item).length > 1;
	useActivateOnKeys(true, onPrimaryAction);

	const byGroup: Record<string, string[]> = {};
	getIngr(item).forEach((ingredient) => {
		const group = getIngredientGroup(ingredient);
		byGroup[group] = byGroup[group] || [];
		byGroup[group].push(ingredient);
	});

	const buttonLabel = hasRecipe
		? "Memorizado — a recordar →"
		: "Memorizado — a practicar →";

	return (
		<>
			<div className="learn-card" style={{ position: "relative" }}>
				<div className="learn-counter">
					Estudio · {index + 1} / {total}
				</div>
				{ITEM_ORIGINS[item.name] ? (
					<div
						title={ITEM_ORIGINS[item.name]}
						style={{ position: "absolute", top: 12, right: 12, lineHeight: 1, userSelect: "none" }}
					>
						{COUNTRY_FLAGS[ITEM_ORIGINS[item.name]]
							? <img src={`https://flagcdn.com/24x18/${COUNTRY_FLAGS[ITEM_ORIGINS[item.name]]}.png`} alt={ITEM_ORIGINS[item.name]} width={24} height={18} style={{ display: "block", borderRadius: 2 }} />
							: <span style={{ fontSize: 11, color: "#9a9793" }}>{ITEM_ORIGINS[item.name]}</span>
						}
					</div>
				) : null}

				<div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
					{image ? (
						<Image
							src={image}
							alt={item.name}
							width={100}
							height={100}
							unoptimized
							style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8, flexShrink: 0 }}
						/>
					) : (
						<div
							style={{
								width: 100,
								height: 100,
								background: "#2a2926",
								borderRadius: 8,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontSize: 32,
								flexShrink: 0,
							}}
						>
							🍹
						</div>
					)}

					<div style={{ flex: 1, minWidth: 0 }}>
						<div className="learn-name" style={{ margin: 0, fontSize: 20 }}>
							{item.name} <span className="learn-price">{formatPrice(item)}</span>
						</div>

					{item.ingr && Object.values(item.ingr).some(v => v !== null) ? (
						<div style={{ fontSize: 12, color: "#E0AE6B", marginTop: 6, lineHeight: 1.5 }}>
							{(Object.entries(item.ingr).filter(([,v]) => v !== null) as [string,string][]).map(([ingredient, dose]) => (
									<div key={`${item.name}-${ingredient}`} style={{ display: "flex", gap: 4 }}>
										<span>{ingredient}</span>
										<span style={{ opacity: 0.7 }}>{dose}</span>
									</div>
								))}
							</div>
						) : null}

						{item.method ? <div style={{ fontSize: 12, color: "#8FC1E0", marginTop: 6 }}>{item.method}</div> : null}
						{item.garnish?.length ? (
							<div style={{ fontSize: 12, color: "#9ED89E", marginTop: 6 }}>
								🌿 {item.garnish.join(" · ")}
							</div>
						) : null}
					{item.comment ? (
						<div style={{ fontSize: 12, color: "#9a9793", marginTop: 6, fontStyle: "italic" }}>
							{item.comment}
						</div>
					) : null}
					{item.funFact ? (
						<div style={{ fontSize: 12, color: "#c8a84b", background: "rgba(200,168,75,0.08)", border: "0.5px solid rgba(200,168,75,0.25)", borderRadius: 6, padding: "6px 10px", marginTop: 6, lineHeight: 1.5, whiteSpace: "pre-line" }}>
							<span style={{ fontWeight: 700 }}>💡 </span>{item.funFact}
						</div>
					) : null}
					</div>
				</div>

				{hasRecipe ? (
					ROW_GROUPS.map((row, rowIndex) => {
						const presentGroups = row.filter((group) => byGroup[group]?.length);
						if (!presentGroups.length) return null;

						return (
							<div className="ingr-row" key={`${item.name}-row-${rowIndex}`}>
								{presentGroups.map((group) => (
									<div className={`ingr-group grp-${group}`} key={`${item.name}-${group}`}>
										<div className="ingr-group-label">{getIngredientGroupLabel(group)}</div>
										<div className="ingr-group-grid">
											{byGroup[group].map((ingredient) => {
												const ingredientImage = toPublicPath(IMAGES[ingredient]);
												const dose = item.ingr?.[ingredient];
												return (
													<div
														className={`learn-ingr-item${ingredientImage ? "" : " no-img"}`}
														key={`${item.name}-${ingredient}`}
													>
														{ingredientImage ? (
															<Image
																src={ingredientImage}
																alt={ingredient}
																width={150}
																height={150}
																unoptimized
																style={{ width: 150, height: 150, objectFit: "cover", borderRadius: 6 }}
															/>
														) : null}
														<span>
															{ingredient}
															{ITEM_DESCRIPTIONS[ingredient] ? (
																<IngredientTooltip description={ITEM_DESCRIPTIONS[ingredient]} />
															) : null}
														</span>
														{dose ? <span className="learn-ingr-dose">{dose}</span> : null}
													</div>
												);
											})}
										</div>
									</div>
								))}
							</div>
						);
					})
				) : (
					<div className="learn-hint">Sin receta — solo precio</div>
				)}
			</div>

			<div className="nav">
				<button className="pri" onClick={onPrimaryAction}>
					{buttonLabel}
				</button>
			</div>
		</>
	);
}
