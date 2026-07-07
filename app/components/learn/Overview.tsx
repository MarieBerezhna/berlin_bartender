import Image from "next/image";

import { CAT_DESCRIPTIONS, type MenuItem } from "../../data/constants";
import IMAGES from "../../data/images";
import OverviewCard from "./OverviewCard";

type OverviewProps = {
	items: MenuItem[];
	categoryLabel: string;
	activeTab: string;
	onStart: () => void;
};

function toPublicPath(path: string | null | undefined): string | null {
	if (!path) return null;
	return path.startsWith("./") ? path.replace("./", "/") : path;
}

export default function Overview({ items, categoryLabel, activeTab, onStart }: OverviewProps) {
	const sortedItems = [...items].sort((left, right) => {
		const leftMin = left.prices?.length ? Math.min(...left.prices.map((price) => price.p)) : 9999;
		const rightMin = right.prices?.length ? Math.min(...right.prices.map((price) => price.p)) : 9999;
		if (leftMin !== rightMin) return leftMin - rightMin;
		return left.name.localeCompare(right.name, "es");
	});

	const categoryImage = toPublicPath(IMAGES[categoryLabel]);
	const description = CAT_DESCRIPTIONS[categoryLabel as keyof typeof CAT_DESCRIPTIONS] || "";

	return (
		<>
			<div
				style={{
					background: "#1a1917",
					border: "1px solid rgba(224,174,107,0.3)",
					borderRadius: 16,
					overflow: "hidden",
					marginBottom: 16,
					display: "flex",
					flexDirection: "column",
					textAlign: "left",
				}}
			>
				{categoryImage ? (
					<Image
						src={categoryImage}
						alt={categoryLabel}
						width={600}
						height={200}
						unoptimized
						style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
					/>
				) : null}
				<div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
					<div style={{ fontSize: 22, fontWeight: 700, color: "#e8e6e1" }}>
						{categoryLabel}
					</div>
					<div style={{ fontSize: 13, color: "#9a9793" }}>
						{sortedItems.length} {sortedItems.length === 1 ? "ítem" : "ítems"} en esta sección
					</div>
					{description ? (
						<div
							style={{ fontSize: 13, color: "#c8c5bf", lineHeight: 1.55 }}
							dangerouslySetInnerHTML={{ __html: description }}
						/>
					) : null}
					<button
						className="pri overview-start-btn"
						style={{
							width: "100%",
							padding: "12px 16px",
							border: "none",
							borderRadius: 10,
							background: "#e8e6e1",
							color: "#0f0e0c",
							fontSize: 16,
							fontWeight: 700,
							cursor: "pointer",
							marginTop: 4,
						}}
						onClick={onStart}
					>
						¡Empezar repaso! →
					</button>
				</div>
			</div>

			<div
				style={{
					fontSize: 12,
					color: "#9a9793",
					textTransform: "uppercase",
					letterSpacing: ".08em",
					marginBottom: 10,
					paddingLeft: 2,
				}}
			>
				📋 Repasa antes de empezar
			</div>

			<div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
				{sortedItems.map((item) => (
					<OverviewCard key={`${item.cat}-${item.name}`} item={item} showCategoryLabel={activeTab === "Todo"} />
				))}
			</div>
		</>
	);
}
