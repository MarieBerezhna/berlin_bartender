import { useEffect, useState } from "react";

export default function IngredientTooltip({ description }: { description: string }) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!open) return;
		const close = () => setOpen(false);
		document.addEventListener("click", close);
		return () => document.removeEventListener("click", close);
	}, [open]);

	return (
		<span className="ingr-info-wrap" data-open={open ? "true" : undefined}>
			<button
				type="button"
				className="ingr-info-btn"
				onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
				aria-label="Información"
			>
				ⓘ
			</button>
			<span
				className="ingr-info-tooltip"
				dangerouslySetInnerHTML={{ __html: description }}
			/>
		</span>
	);
}