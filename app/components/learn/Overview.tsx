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
					padding: 20,
					marginBottom: 16,
					display: "flex",
					alignItems: "stretch",
					gap: 16,
					textAlign: "left",
				}}
			>
				{categoryImage ? (
					<Image
						src={categoryImage}
						alt={categoryLabel}
						width={112}
						height={112}
						unoptimized
						style={{ width: 112, height: 112, objectFit: "cover", borderRadius: 12, flexShrink: 0 }}
					/>
				) : null}
				<div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 10, minHeight: 112 }}>
					<div style={{ fontSize: 22, fontWeight: 700, color: "#e8e6e1", marginBottom: 4 }}>
						{categoryLabel}
						{description ? (
							<span className="tab-info" style={{ marginLeft: 4 }}>
								ⓘ
								<span className="tab-tooltip" dangerouslySetInnerHTML={{ __html: description }} />
							</span>
						) : null}
					</div>
					<div style={{ fontSize: 13, color: "#9a9793" }}>
						{sortedItems.length} {sortedItems.length === 1 ? "ítem" : "ítems"} en esta sección
					</div>
					<button
						className="pri overview-start-btn"
						style={{
							width: "fit-content",
							padding: "12px 16px",
							border: "none",
							borderRadius: 10,
							background: "#e8e6e1",
							color: "#0f0e0c",
							fontSize: 16,
							fontWeight: 700,
							cursor: "pointer",
							alignSelf: "flex-end",
							marginTop: "auto",
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
