import Image from "next/image";

import type { MenuItem } from "../../data/constants";
import IMAGES from "../../data/images";
import { formatPrice, getIngredientGroup } from "../../lib/learn";

type RecallOptionState = "idle" | "selected" | "correct" | "missed" | "wrong";

type RecallCardProps = {
	item: MenuItem;
	index: number;
	total: number;
	stage: "main" | "recall";
	options: string[];
	selected: Set<string>;
	statusByOption?: Record<string, RecallOptionState>;
	checked: boolean;
	feedbackMessage?: string;
	feedbackPerfect?: boolean;
	onToggle: (option: string) => void;
	onCheck: () => void;
	onNext?: () => void;
	nextLabel?: string;
};

function toPublicPath(path: string | null | undefined): string | null {
	if (!path) return null;
	return path.startsWith("./") ? path.replace("./", "/") : path;
}

export default function RecallCard({
	item,
	index,
	total,
	stage,
	options,
	selected,
	statusByOption,
	checked,
	feedbackMessage,
	feedbackPerfect,
	onToggle,
	onCheck,
	onNext,
	nextLabel,
}: RecallCardProps) {
	const itemImage = toPublicPath(IMAGES[item.name]);

	return (
		<>
			<div className="learn-card">
				<div className="learn-counter">
					{stage === "main" ? "Recordar" : "Repaso final"} · {index + 1} / {total}
				</div>
				{itemImage ? (
					<Image className="qimg" src={itemImage} alt={item.name} width={150} height={150} unoptimized />
				) : null}
				<div className="learn-name">
					{item.name} <span className="learn-price">{formatPrice(item)}</span>
				</div>
				<div className="learn-hint">Selecciona todos los ingredientes / Select all ingredients</div>

				<div className="learn-ingr-grid" id="recallGrid">
					{options.map((option) => {
						const image = toPublicPath(IMAGES[option]);
						const group = getIngredientGroup(option);
						const status = statusByOption?.[option] || "idle";
						const isSelected = !checked && selected.has(option);
						const classes = [
							"recall-opt",
							`grp-${group}`,
							isSelected ? "selected" : "",
							status !== "idle" && !isSelected ? status : "",
						]
							.filter(Boolean)
							.join(" ");

						return (
							<button
								key={`${item.name}-${option}`}
								className={classes}
								data-opt={option}
								data-locked={checked ? "1" : undefined}
								onClick={() => onToggle(option)}
								disabled={checked}
							>
								{image ? (
									<Image
										src={image}
										alt={option}
										width={150}
										height={150}
										unoptimized
										style={{ width: 150, height: 150, objectFit: "cover", borderRadius: 6 }}
									/>
								) : null}
								<span>{option}</span>
							</button>
						);
					})}
				</div>
			</div>

			<div className="nav" id="nav" data-checked={checked ? "1" : undefined}>
				{!checked ? (
					<button className="pri" onClick={onCheck}>
						Comprobar / Check ✓
					</button>
				) : (
					<div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
						<div
							style={{
								textAlign: "center",
								padding: "8px 0",
								fontSize: 14,
								color: feedbackPerfect ? "#97C459" : "#c87020",
							}}
						>
							{feedbackMessage}
						</div>
						{onNext ? (
							<button className="pri" style={{ width: "100%" }} onClick={onNext}>
								{nextLabel || "Siguiente / Next →"}
							</button>
						) : null}
					</div>
				)}
			</div>
		</>
	);
}
