"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
	GROUP_COLOR,
	ITEM_DESCRIPTIONS,
	ITEM_ORIGINS,
	type MenuItem,
} from "../../data/constants";
import IMAGES from "../../data/images";
import { formatPrice, getIngredientGroup, sortIngredientsForStudy } from "../../lib/learn";
import OriginFlag from "../shared/OriginFlag";
import { toPublicPath } from "@/app/lib/utils";
import FamilyBadge from "../shared/FamilyBadge";

type OverviewCardProps = {
	item: MenuItem;
	showCategoryLabel: boolean;
	priority?: boolean;
};

export default function OverviewCard({ item, showCategoryLabel, priority = false }: OverviewCardProps) {
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
		<div className="overview-card">
			{image ? (
				<div style={{ overflow: "hidden", borderRadius: "12px 12px 0 0" }}>
					<Image
						className="overview-card-img"
						src={image}
						alt={item.name}
						width={160}
						height={160}
						priority={priority}
					/>
				</div>
			) : null}

			<div className="overview-card-body" style={{ padding: 14, display: "flex", flexDirection: "column", gap: 6 }}>
				<FamilyBadge itemfamily={item.family} showCategoryLabel={showCategoryLabel} cat={item.cat} />
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
						const dose = item.ingr?.[ing];

						return (
							<span key={`${item.name}-${ing}`}>
								{idx > 0 ? <span style={{ color: "#3a3835" }}> · </span> : null}
								<span style={{ color }}>
									{ing}
									{dose ? <span style={{ opacity: 0.7 }}> {dose}</span> : null}
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

				{item.comment ? (
					<div style={{ fontSize: 12, color: "#9a9793", fontStyle: "italic", lineHeight: 1.4 }}>
						{item.comment}
					</div>
				) : null}

				{item.funFact ? (
					<div style={{ fontSize: 12, color: "#c8a84b", background: "rgba(200,168,75,0.08)", border: "0.5px solid rgba(200,168,75,0.25)", borderRadius: 6, padding: "6px 10px", lineHeight: 1.5, whiteSpace: "pre-line" }}>
						<span style={{ fontWeight: 700 }}>💡 </span>{item.funFact}
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
			{ITEM_ORIGINS[item.name] ? <OriginFlag country={ITEM_ORIGINS[item.name]} /> : null}
		</div>
	);
}
