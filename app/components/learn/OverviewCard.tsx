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
	const sortedIngr = sortIngredientsForStudy(item);
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
			className="overview-card"
			style={{
				background: "#1f1e1b",
				border: "0.5px solid rgba(232,230,225,0.15)",
				borderRadius: 12,
				display: "flex",
				flexDirection: "column",
			}}
		>
			{image ? (
				<div style={{ overflow: "hidden", borderRadius: "12px 12px 0 0" }}>
					<Image
						className="overview-card-img"
						src={image}
						alt={item.name}
						width={160}
						height={160}
						style={{ width: "auto", height: "auto", maxHeight: 160, maxWidth: 160, margin: "0 auto", objectFit: "cover", display: "block" }}
					/>
				</div>
			) : null}

			<div className="overview-card-body" style={{ padding: 14, display: "flex", flexDirection: "column", gap: 6 }}>
				{showCategoryLabel ? (
					<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
						<FamilyBadge item={item} />
						{!item.family ? (
							<span style={{ fontSize: 11, color: "#9a9793", textTransform: "uppercase", letterSpacing: ".04em" }}>
								{item.cat}
							</span>
						) : null}
					</div>
				) : item.family ? (
					<div>
						<FamilyBadge item={item} />
					</div>
				) : null}

				<div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
					<div style={{ fontSize: 16, fontWeight: 700, color: "#e8e6e1", lineHeight: 1.3 }}>{item.name}</div>
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

				<div style={{ fontSize: 14, color: "#E0AE6B", fontWeight: 500 }}>{formatPrice(item)}</div>

				{sortedIngr.length ? (
					<div style={{ fontSize: 13, lineHeight: 1.8 }}>
						{sortedIngr.map((ing, idx) => {
							const color = GROUP_COLOR[getIngredientGroup(ing)] || GROUP_COLOR.other;
							const isOptional = Boolean(item.optional?.includes(ing));
							const dose = item.ingr?.[ing];

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
					<div style={{ fontSize: 12, color: "#9ECB7A", lineHeight: 1.4 }}>
						Guarnición <span style={{ color: "#d9e8ca" }}>{garnishes.join(" · ")}</span>
					</div>
				) : null}

				{item.method || glassName ? (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							gap: 8,
							fontSize: 12,
							borderTop: "0.5px solid rgba(232,230,225,0.1)",
							paddingTop: 8,
							marginTop: 2,
						}}
					>
						{item.method ? (
							<span>Método <span style={{ color: "#8FC1E0", fontWeight: 600 }}>{item.method}</span></span>
						) : <span />}
						{glassName ? (
							<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
								{glassImage ? (
									<Image src={glassImage} alt={glassName} width={24} height={32} unoptimized style={{ objectFit: "contain" }} />
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
