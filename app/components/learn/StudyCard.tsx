import Image from "next/image";

import type { MenuItem } from "../../data/constants";
import IMAGES from "../../data/images";
import { formatPrice, getIngredientGroup, getIngredientGroupLabel } from "../../lib/learn";
import { getIngr } from "../../data/constants";
import { useActivateOnKeys } from "../../lib/utils";

type StudyCardProps = {
	item: MenuItem;
	index: number;
	total: number;
	onPrimaryAction: () => void;
};

const ROW_GROUPS = [
	["spirit", "liqueur", "beer", "wine", "bitter"],
	["filler", "sweet", "other"],
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
			<div className="learn-card">
				<div className="learn-counter">
					Estudio · {index + 1} / {total}
				</div>

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
												const isOptional = Boolean(item.optional?.includes(ingredient));
												const dose = item.ingr?.[ingredient];
												return (
													<div
														className={`learn-ingr-item${ingredientImage ? "" : " no-img"}`}
														style={isOptional ? { opacity: 0.6 } : undefined}
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
															{isOptional ? (
																<span style={{ fontSize: 9, opacity: 0.6, fontStyle: "italic" }}> (opt)</span>
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
					<br />
					<small style={{ opacity: 0.6 }}>o pulsa Espacio</small>
				</button>
			</div>
		</>
	);
}
