"use client";

import Image from "next/image";
import { useState } from "react";

import { GROUP_COLOR, type MenuItem } from "../../data/constants";
import IMAGES from "../../data/images";
import { formatPrice, getIngredientGroup, sortIngredientsForStudy } from "../../lib/learn";
import { formatVolumeOz, getIngredientDose, getVolumeOz, toPublicPath } from "@/app/lib/utils";
import RecipeModal from "./RecipeModal";

type RecipeCardProps = {
	item: MenuItem;
	disableModal?: boolean;
};

export default function RecipeCard({ item, disableModal = false }: RecipeCardProps) {
	const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
	const itemImage = toPublicPath(IMAGES[item.name]);
	const glassName = item.glass ?? null;
	const glassImage = glassName && toPublicPath(IMAGES[`glass:${glassName}`]);
	const sortedIngr = sortIngredientsForStudy(item);
	const garnishes = item.garnish ?? [];
	const priceLabel = formatPrice(item);
	const volumeLabel = formatVolumeOz(getVolumeOz(item));

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
				<div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
					<div style={{ fontSize: 14, fontWeight: 700, color: "#e8e6e1" }}>{item.name}</div>
					{priceLabel ? (
						<div style={{ fontSize: 13, color: "#E0AE6B", fontWeight: 500, flexShrink: 0 }}>{priceLabel}</div>
					) : null}
				</div>
				{sortedIngr.length ? (
					<div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 13, lineHeight: 1.5 }}>
						{sortedIngr.map((ing) => {
							const color = GROUP_COLOR[getIngredientGroup(ing)] ?? GROUP_COLOR.other;
							const dose = getIngredientDose(item, ing);
							return (
								<div key={ing} style={{ color }}>
									{dose ? <span style={{ opacity: 0.65 }}>{dose} </span> : null}
									{ing}
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
				{volumeLabel ? (
					<div style={{ fontSize: 12, color: "#8FC1E0", fontWeight: 600, marginTop: 4 }}>Volumen {volumeLabel}</div>
				) : null}
			</div>
		</div>
		{!disableModal ? (
			<RecipeModal item={item} open={selectedItem?.name === item.name} onClose={() => setSelectedItem(null)} />
		) : null}
		</>
	);
}
