import Image from "next/image";

import { type MenuItem, GROUP_COLOR } from "../../data/constants";
import IMAGES from "../../data/images";
import { formatPrice, getIngredientGroup, sortIngredientsForStudy } from "../../lib/learn";
import { toPublicPath } from "@/app/lib/utils";

type RecipeCardProps = {
	item: MenuItem;
};

export default function RecipeCard({ item }: RecipeCardProps) {
	const itemImage = toPublicPath(IMAGES[item.name]);
	const glassName = item.glass ?? null;
	const glassImage = glassName && toPublicPath(IMAGES[`glass:${glassName}`]);
	const sortedIngr = sortIngredientsForStudy(item);
	const garnishes = item.garnish ?? [];
	const priceLabel = formatPrice(item);

	return (
		<div style={{
			borderRadius: 10,
			overflow: "hidden",
			border: "0.5px solid rgba(232,230,225,0.15)",
			background: "#161614",
		}}>
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
					<div style={{ fontSize: 13, lineHeight: 1.9 }}>
						{sortedIngr.map((ing, idx) => {
							const color = GROUP_COLOR[getIngredientGroup(ing)] ?? GROUP_COLOR.other;
						const dose = item.ingr?.[ing];
						return (
							<span key={ing}>
								{idx > 0 ? <span style={{ color: "#3a3835" }}> · </span> : null}
								<span style={{ color }}>
									{ing}
									{dose ? <span style={{ opacity: 0.65 }}> {dose}</span> : null}
									</span>
								</span>
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
	);
}
