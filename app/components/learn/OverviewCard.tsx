"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
	AUTOR_COLOR,
	AUTOR_TEXT,
	CLASICA_CAT,
	CLASICA_COLOR,
	CLASICA_TEXT,
	ITEM_DESCRIPTIONS,
	type MenuItem,
} from "../../data/constants";
import IMAGES from "../../data/images";
import { formatPrice, getIngredientGroup, sortIngredientsForStudy } from "../../lib/learn";

type OverviewCardProps = {
	item: MenuItem;
	showCategoryLabel: boolean;
};

const GROUP_COLOR: Record<string, string> = {
	spirit: "#F09595",
	liqueur: "#E0AE6B",
	filler: "#8FC1E0",
	bitter: "#C9A0DC",
	sweet: "#9ECB7A",
	other: "#9a9793",
};

function toPublicPath(path: string | null | undefined): string | null {
	if (!path) return null;
	return path.startsWith("./") ? path.replace("./", "/") : path;
}

function FamilyBadge({ item }: { item: MenuItem }) {
	if (!item.family) return null;

	const bg = item.cat === CLASICA_CAT ? CLASICA_COLOR : AUTOR_COLOR;
	const color = item.cat === CLASICA_CAT ? CLASICA_TEXT : AUTOR_TEXT;

	return (
		<span
			style={{
				display: "inline-block",
				fontSize: "10px",
				fontWeight: 600,
				padding: "2px 7px",
				borderRadius: "20px",
				background: bg,
				color,
				letterSpacing: ".04em",
				textTransform: "uppercase",
			}}
		>
			{item.family}
		</span>
	);
}

export default function OverviewCard({ item, showCategoryLabel }: OverviewCardProps) {
	const [showDescription, setShowDescription] = useState(false);
	const infoWrapRef = useRef<HTMLDivElement | null>(null);
	const image = toPublicPath(IMAGES[item.name]);
	const glassName = item.glass || null;
	const glassImage = toPublicPath(glassName ? IMAGES[`glass:${glassName}`] : null);
	const sortedIngr = item.ingr ? sortIngredientsForStudy(item) : [];
	const garnishes = item.garnish || [];
	const description = ITEM_DESCRIPTIONS[item.name as keyof typeof ITEM_DESCRIPTIONS] || "";

	useEffect(() => {
		if (!showDescription) return;

		const handlePointerDown = (event: PointerEvent) => {
			if (!infoWrapRef.current?.contains(event.target as Node)) {
				setShowDescription(false);
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setShowDescription(false);
			}
		};

		document.addEventListener("pointerdown", handlePointerDown);
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("pointerdown", handlePointerDown);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [showDescription]);

	return (
		<div
			style={{
				background: "#1f1e1b",
				border: "0.5px solid rgba(232,230,225,0.15)",
				borderRadius: 12,
				padding: 14,
				display: "flex",
				alignItems: "flex-start",
				gap: 14,
			}}
		>
			{image ? (
				<Image
					src={image}
					alt={item.name}
					width={64}
					height={64}
					unoptimized
					style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 10, flexShrink: 0 }}
				/>
			) : (
				<div
					style={{
						width: 64,
						height: 64,
						borderRadius: 10,
						background: "#2a2926",
						flexShrink: 0,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: 22,
					}}
				>
					🍹
				</div>
			)}

			<div style={{ flex: 1, minWidth: 0 }}>
				{showCategoryLabel ? (
					<div style={{ marginBottom: 3 }}>
						<FamilyBadge item={item} />
						<span
							style={{
								fontSize: 11,
								color: "#9a9793",
								textTransform: "uppercase",
								letterSpacing: ".04em",
								marginLeft: item.family ? 6 : 0,
							}}
						>
							{item.family ? "" : item.cat}
						</span>
					</div>
				) : item.family ? (
					<div style={{ marginBottom: 4 }}>
						<FamilyBadge item={item} />
					</div>
				) : null}

				<div style={{ display: "flex", alignItems: "flex-start", gap: 8, justifyContent: "space-between" }}>
					<div style={{ minWidth: 0 }}>
						<div style={{ fontSize: 16, fontWeight: 700, color: "#e8e6e1", lineHeight: 1.3 }}>{item.name}</div>
						<div style={{ fontSize: 14, color: "#E0AE6B", marginTop: 4, fontWeight: 500 }}>{formatPrice(item)}</div>
					</div>
					{description ? (
						<div
							ref={infoWrapRef}
							className={`item-info${showDescription ? " open" : ""}`}
							onMouseEnter={() => setShowDescription(true)}
							onMouseLeave={() => setShowDescription(false)}
						>
							<button
								type="button"
								onClick={() => setShowDescription((current) => !current)}
								aria-label={showDescription ? "Ocultar descripción" : "Mostrar descripción"}
								aria-expanded={showDescription}
								className="item-info-btn"
							>
								i
							</button>
							<div className="item-tooltip" role="tooltip" aria-hidden={!showDescription}>
								<div className="item-tooltip-head">
									<span>Descripción</span>
									<button type="button" className="item-tooltip-close" onClick={() => setShowDescription(false)} aria-label="Cerrar descripción">
										×
									</button>
								</div>
								<div className="item-tooltip-body">{description}</div>
							</div>
						</div>
					) : null}
				</div>

				{sortedIngr.length ? (
					<div style={{ fontSize: 14, marginTop: 5, lineHeight: 1.8 }}>
						{sortedIngr.map((ing, idx) => {
							const color = GROUP_COLOR[getIngredientGroup(ing)] || GROUP_COLOR.other;
							const isOptional = Boolean(item.optional?.includes(ing));
							const dose = item.doses?.[ing];

							return (
								<span key={`${item.name}-${ing}`}>
									{idx > 0 ? <span style={{ color: "#3a3835" }}> · </span> : null}
									<span style={{ color, opacity: isOptional ? 0.55 : 1, fontStyle: isOptional ? "italic" : "normal" }}>
										{ing}
										{dose ? <span style={{ opacity: 0.7 }}> {dose}</span> : null}
										{isOptional ? (
											<span style={{ fontSize: 9, opacity: 0.7, fontStyle: "normal", verticalAlign: "middle" }}>
												{" "}(opt)
											</span>
										) : null}
									</span>
								</span>
							);
						})}
					</div>
				) : null}

				{garnishes.length ? (
					<div
						style={{
							fontSize: 12,
							marginTop: 6,
							color: "#9ECB7A",
							lineHeight: 1.4,
						}}
					>
						Guarnición <span style={{ color: "#d9e8ca" }}>{garnishes.join(" · ")}</span>
					</div>
				) : null}

				{item.method ? (
					<div
						style={{
							fontSize: 12,
							marginTop: 6,
							borderTop: "0.5px solid rgba(232,230,225,0.1)",
							paddingTop: 6,
						}}
					>
						Método <span style={{ color: "#8FC1E0", fontWeight: 600 }}>{item.method}</span>
					</div>
				) : null}
			</div>

			{glassName ? (
				<div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0, minWidth: 52 }}>
					{glassImage ? (
						<Image src={glassImage} alt={glassName} width={44} height={60} unoptimized style={{ objectFit: "contain" }} />
					) : (
						<div style={{ width: 44, height: 60, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
							🥛
						</div>
					)}
					<span style={{ fontSize: 10, color: "#7a7875", textAlign: "center", lineHeight: 1.2 }}>{glassName}</span>
				</div>
			) : null}
		</div>
	);
}
