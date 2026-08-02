"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { GROUP_COLOR, type MenuItem } from "../../data/constants";
import IMAGES from "../../data/images";
import { formatPrice, getIngredientGroup, sortIngredientsForStudy } from "../../lib/learn";
import { formatVolumeOz, getIngredientDose, getVolumeOz, toPublicPath } from "@/app/lib/utils";
import RecipeCard from "./RecipeCard";

type RecipeModalProps = {
	item: MenuItem;
	open: boolean;
	onClose: () => void;
};

export default function RecipeModal({ item, open, onClose }: RecipeModalProps) {
	const [activeTab, setActiveTab] = useState<"receta" | "pre-batch">("receta");
	const [bottleVolumeMl, setBottleVolumeMl] = useState(750);
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
	const multiplier = cocktailVolumeMl > 0 ? bottleVolumeMl / cocktailVolumeMl : 0;
	const scaledIngredients = (item.ingredients || []).map((ingredient) => {
		const qty = ingredient.qty == null ? null : Number(ingredient.qty) * multiplier;
		return {
			...ingredient,
			qty,
		};
	});
	const sortedIngr = sortIngredientsForStudy(item);
	const garnishes = item.garnish ?? [];
	const priceLabel = formatPrice(item);
	const glassName = item.glass ?? null;
	const glassImage = glassName ? toPublicPath(IMAGES[`glass:${glassName}`]) : null;

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

				<div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
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
				</div>

				{itemImage ? (
					<div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 12 }}>
						<Image src={itemImage} alt={item.name} width={760} height={220} style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
					</div>
				) : null}

				{activeTab === "receta" ? (
					<RecipeCard item={item} disableModal />
				) : (
					<div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 4 }}>
						<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
							{[750, 1500].map((value) => (
								<button
									type="button"
									key={value}
									onClick={() => setBottleVolumeMl(value)}
									style={{
										border: "none",
										borderRadius: 999,
										padding: "8px 12px",
										background: bottleVolumeMl === value ? "#e8e6e1" : "rgba(232,230,225,0.12)",
										color: bottleVolumeMl === value ? "#11110f" : "#e8e6e1",
										fontWeight: 700,
										cursor: "pointer",
									}}
								>
									{value} ml
								</button>
							))}
						</div>
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
						<div style={{ border: "0.5px solid rgba(232,230,225,0.15)", borderRadius: 12, background: "#161614", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
							<div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
								<div style={{ fontSize: 14, fontWeight: 700, color: "#e8e6e1" }}>{item.name}</div>
								{priceLabel ? (
									<div style={{ fontSize: 13, color: "#E0AE6B", fontWeight: 500, flexShrink: 0 }}>{priceLabel}</div>
								) : null}
							</div>
							<div style={{ fontSize: 12, color: "#8FC1E0", fontWeight: 600 }}>Volumen necesario {bottleVolumeMl} ml</div>
							{sortedIngr.length ? (
								<div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 13, lineHeight: 1.5 }}>
									{scaledIngredients.map((ingredient) => {
										const color = GROUP_COLOR[getIngredientGroup(ingredient.name)] ?? GROUP_COLOR.other;
										const dose = ingredient.qty == null ? null : `${Number(ingredient.qty.toFixed(2))} ${ingredient.measure ?? ""}`.trim();
										return (
											<div key={`${ingredient.name}-${ingredient.qty}`} style={{ color }}>
												{dose ? <span style={{ opacity: 0.65 }}>{dose} </span> : null}
												{ingredient.name}
											</div>
										);
									})}
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
