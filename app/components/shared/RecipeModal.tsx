"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { GROUP_COLOR, type MenuItem } from "../../data/constants";
import IMAGES from "../../data/images";
import { formatPrice, getIngredientGroup, sortIngredientsForStudy } from "../../lib/learn";
import { formatVolumeOz, getIngredientDose, getVolumeOz, isCarbonatedIngredient, isCitrusIngredient, toMl, toPublicPath } from "@/app/lib/utils";
import { Measure } from "../../data/types";
import RecipeCard from "./RecipeCard";

type RecipeModalProps = {
	item: MenuItem;
	open: boolean;
	onClose: () => void;
};

export default function RecipeModal({ item, open, onClose }: RecipeModalProps) {
	const [activeTab, setActiveTab] = useState<"receta" | "pre-batch">("receta");
	const [bottleVolumeMl, setBottleVolumeMl] = useState(750);
	const [selectedScaleValue, setSelectedScaleValue] = useState(750);
	const bottleVolumeOptions = [750, 1500] as const;
	const scaleOptions = [
		{ label: "x2", value: 2, kind: "portion" as const },
		{ label: "x3", value: 3, kind: "portion" as const },
		{ label: "x4", value: 4, kind: "portion" as const },
		{ label: "x5", value: 5, kind: "portion" as const },
		{ label: "x6", value: 6, kind: "portion" as const },
		...bottleVolumeOptions.map((value) => ({ label: `${value} ml`, value, kind: "bottle" as const })),
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

	const itemImage = toPublicPath(IMAGES[item.name]);
	const volumeOz = getVolumeOz(item);
	const volumeLabel = formatVolumeOz(volumeOz);
	const cocktailVolumeMl = volumeOz != null ? volumeOz * 30 : 0;
	const cocktailsCount = cocktailVolumeMl > 0 ? Math.floor(bottleVolumeMl / cocktailVolumeMl) : 0;
	const remainderMl = cocktailVolumeMl > 0 ? bottleVolumeMl % cocktailVolumeMl : bottleVolumeMl;
	const selectedScaleOption = scaleOptions.find((option) => option.value === selectedScaleValue);
	const multiplier = selectedScaleOption?.kind === "portion"
		? Number(selectedScaleValue)
		: cocktailVolumeMl > 0
			? bottleVolumeMl / cocktailVolumeMl
			: 0;
	const scaledIngredients = (item.ingredients || []).map((ingredient) => {
		const qty = ingredient.qty == null ? null : Number(ingredient.qty) * multiplier;
		return {
			...ingredient,
			qty,
		};
	});
	const longTermIngredients = scaledIngredients.filter((ingredient) => !isCitrusIngredient(ingredient.name) && !isCarbonatedIngredient(ingredient.name, ingredient.measure));
	const citrusIngredients = scaledIngredients.filter((ingredient) => isCitrusIngredient(ingredient.name));
	const carbonatedIngredients = scaledIngredients.filter((ingredient) => isCarbonatedIngredient(ingredient.name, ingredient.measure));
	const hasCitrus = citrusIngredients.length > 0;
	const hasCarbonics = carbonatedIngredients.length > 0;
	const shouldShowPrebatchTab = longTermIngredients.filter((ingredient) => ingredient.measure === Measure.Oz || ingredient.measure == null).length > 1;
	const citrusPerServingMl = (item.ingredients || []).reduce((sum, ingredient) => {
		if (!isCitrusIngredient(ingredient.name)) return sum;
		const converted = toMl(ingredient.qty, ingredient.measure);
		return converted == null ? sum : sum + converted;
	}, 0);
	const prebatchPerServingMl = (item.ingredients || []).reduce((sum, ingredient) => {
		if (isCitrusIngredient(ingredient.name)) return sum;
		const converted = toMl(ingredient.qty, ingredient.measure);
		return converted == null ? sum : sum + converted;
	}, 0);
	const sortedIngr = sortIngredientsForStudy(item);
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
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 12 }}>
					<div style={{ fontSize: 16, fontWeight: 700, color: "#e8e6e1" }}>Receta · {item.name}</div>
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

				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
					<div style={{ display: "flex", gap: 8 }}>
						<button
							type="button"
							onClick={() => setActiveTab("receta")}
							style={{
								border: "none",
								borderRadius: 999,
								padding: "8px 12px",
								background: activeTab === "receta" ? "#e8e6e1" : "rgba(232,230,225,0.12)",
								color: activeTab === "receta" ? "#11110f" : "#e8e6e1",
								fontWeight: 700,
								cursor: "pointer",
							}}
						>
							Receta
						</button>
						{shouldShowPrebatchTab ? (
							<button
								type="button"
								onClick={() => setActiveTab("pre-batch")}
								style={{
									border: "none",
									borderRadius: 999,
									padding: "8px 12px",
									background: activeTab === "pre-batch" ? "#e8e6e1" : "rgba(232,230,225,0.12)",
									color: activeTab === "pre-batch" ? "#11110f" : "#e8e6e1",
									fontWeight: 700,
									cursor: "pointer",
								}}
							>
								Pre-batch
							</button>
						) : null}
					</div>
					{activeTab === "pre-batch" ? (
						<label style={{ display: "flex", alignItems: "center", gap: 8, color: "#e8e6e1", fontSize: 13, fontWeight: 600 }}>
							<span style={{ color: "#8FC1E0" }}>Botella</span>
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
									<option key={`${option.kind}-${option.value}`} value={option.value} style={{ color: "#11110f", backgroundColor: "#f2eee6" }}>
										{option.label}
									</option>
								))}
							</select>
						</label>
					) : null}
				</div>

				{activeTab === "receta" ? (
					<RecipeCard item={item} disableModal />
				) : (
					<div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 4 }}>
						<div style={{ fontSize: 14, color: "#e8e6e1" }}>
							Volumen del cóctel: <span style={{ fontWeight: 700 }}>{volumeLabel ?? "—"}</span>
						</div>
						<div style={{ fontSize: 14, color: "#8FC1E0", fontWeight: 700 }}>
							Caben <span style={{ color: "#e8e6e1" }}>{cocktailsCount}</span> cócteles en una botella de {bottleVolumeMl} ml
						</div>
						{remainderMl > 0 ? (
							<div style={{ fontSize: 12, color: "#9a9793" }}>
								Resto: {remainderMl} ml
							</div>
						) : null}
						<div style={{ border: "0.5px solid rgba(232,230,225,0.15)", borderRadius: 12, background: "#161614", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
							<div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
								<div style={{ fontSize: 14, fontWeight: 700, color: "#e8e6e1" }}>{item.name}</div>
								{priceLabel ? (
									<div style={{ fontSize: 13, color: "#E0AE6B", fontWeight: 500, flexShrink: 0 }}>{priceLabel}</div>
								) : null}
							</div>
							<div style={{ fontSize: 12, color: "#8FC1E0", fontWeight: 600 }}>Volumen necesario {bottleVolumeMl} ml</div>
							{hasCitrus ? (
								<div style={{ border: "0.5px solid rgba(224,174,107,0.3)", borderRadius: 10, padding: "8px 10px", background: "rgba(224,174,107,0.08)", color: "#E0AE6B", fontSize: 12, fontWeight: 700 }}>
									Same day use
								</div>
							) : null}
							{hasCarbonics ? (
								<div style={{ border: "0.5px solid rgba(143,193,224,0.3)", borderRadius: 10, padding: "8px 10px", background: "rgba(143,193,224,0.08)", color: "#8FC1E0", fontSize: 12, fontWeight: 700 }}>
									Add at serving time
								</div>
							) : null}
							{sortedIngr.length ? (
								<div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 13, lineHeight: 1.5 }}>
									{scaledIngredients.map((ingredient) => {
										const color = GROUP_COLOR[getIngredientGroup(ingredient.name)] ?? GROUP_COLOR.other;
										const dose = formatDoseInOz(ingredient.qty, ingredient.measure);
										return (
											<div key={`${ingredient.name}-${ingredient.qty}`} style={{ color }}>
												{dose ? <span style={{ opacity: 0.65 }}>{dose} </span> : null}
												{ingredient.name}
											</div>
										);
									})}
								</div>
							) : null}
							{hasCitrus || hasCarbonics ? (
								<div style={{ borderTop: "0.5px solid rgba(232,230,225,0.12)", paddingTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
									<div style={{ fontSize: 13, fontWeight: 700, color: "#8FC1E0" }}>Long-term prebatch</div>
									<div style={{ fontSize: 12, color: "#d9e8ca", lineHeight: 1.45 }}>
										Usa <span style={{ color: "#e8e6e1", fontWeight: 700 }}>{formatDoseInOz(prebatchPerServingMl / 30, Measure.Oz) ?? "—"}</span> de prebatch por porción{hasCitrus ? <> y añade <span style={{ color: "#e8e6e1", fontWeight: 700 }}>{formatDoseInOz(citrusPerServingMl / 30, Measure.Oz) ?? "—"}</span> de cítrico al momento del pedido.</> : null}{hasCarbonics ? <> y añade los ingredientes carbonatados al servir.</> : null}
									</div>
									{longTermIngredients.length ? (
										<div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 13, lineHeight: 1.5 }}>
											{longTermIngredients.map((ingredient) => {
												const color = GROUP_COLOR[getIngredientGroup(ingredient.name)] ?? GROUP_COLOR.other;
												const dose = formatDoseInOz(ingredient.qty, ingredient.measure);
												return (
													<div key={`${ingredient.name}-${ingredient.qty}`} style={{ color }}>
														{dose ? <span style={{ opacity: 0.65 }}>{dose} </span> : null}
														{ingredient.name}
													</div>
												);
											})}
										</div>
									) : null}
								</div>
							) : null}
							{hasCarbonics ? (
								<div style={{ borderTop: "0.5px solid rgba(232,230,225,0.12)", paddingTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
									<div style={{ fontSize: 13, fontWeight: 700, color: "#8FC1E0" }}>Carbonated additions</div>
									<div style={{ fontSize: 12, color: "#d9e8ca", lineHeight: 1.45 }}>
										No se prebatchan; añádelos al servir.
									</div>
									<div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 13, lineHeight: 1.5 }}>
										{carbonatedIngredients.map((ingredient) => {
											const color = GROUP_COLOR[getIngredientGroup(ingredient.name)] ?? GROUP_COLOR.other;
											const dose = formatDoseInOz(ingredient.qty, ingredient.measure);
											return (
												<div key={`${ingredient.name}-${ingredient.qty}`} style={{ color }}>
													{dose ? <span style={{ opacity: 0.65 }}>{dose} </span> : null}
													{ingredient.name}
												</div>
											);
										})}
									</div>
								</div>
							) : null}
							{garnishes.length ? (
								<div style={{ fontSize: 12, color: "#9ECB7A", lineHeight: 1.4 }}>
									Guarnición <span style={{ color: "#d9e8ca" }}>{garnishes.join(" · ")}</span>
								</div>
							) : null}
							{item.method || glassName ? (
								<div style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									gap: 8,
									fontSize: 12,
									borderTop: "0.5px solid rgba(232,230,225,0.1)",
									paddingTop: 6,
									marginTop: 2,
								}}>
									{item.method ? (
										<span>Método <span style={{ color: "#8FC1E0", fontWeight: 600 }}>{item.method}</span></span>
									) : <span />}
									{glassName ? (
										<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
											{glassImage ? (
												<Image src={glassImage} alt={glassName} width={24} height={32} style={{ objectFit: "contain" }} />
											) : null}
											<span style={{ fontSize: 11, color: "#7a7875" }}>{glassName}</span>
										</div>
									) : null}
								</div>
							) : null}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
