"use client";

import { useRef } from "react";

import type { MenuItem } from "../../data/constants";
import RecipeCard from "../learn/RecipeCard";

type QuizFeedbackProps = {
	visible: boolean;
	isCorrect: boolean;
	answer: string;
	hint: string;
	item?: MenuItem;
	onNext: () => void;
	nextLabel?: string;
};

export default function QuizFeedback({ visible, isCorrect, answer, hint, item, onNext, nextLabel = "Siguiente →" }: QuizFeedbackProps) {
	// Freeze content when visible so the fade-out shows the same result, not the next question's state
	const snap = useRef({ isCorrect, answer, hint, item });
	if (visible) snap.current = { isCorrect, answer, hint, item };
	const { isCorrect: fc, answer: fa, hint: fh, item: fi } = snap.current;

	return (
		<div className={`q-overlay${visible ? " in" : ""}`} aria-live="polite">
			<div style={{ textAlign: "center", fontSize: 44, lineHeight: 1, color: fc ? "#97C459" : "#e07070" }}>
				{fc ? "✓" : "✗"}
			</div>
			<div style={{ textAlign: "center", fontSize: 18, fontWeight: 700, color: fc ? "#97C459" : "#e07070" }}>
				{fc ? "¡Correcto!" : "Incorrecto"}
			</div>
			{!fc ? (
				<div style={{ textAlign: "center", fontSize: 13, color: "#c8c5bf" }}>
					Respuesta: <strong style={{ color: "#e8e6e1" }}>{fa}</strong>
				</div>
			) : null}

			{fi ? (
				<RecipeCard item={fi} />
			) : (
				<div style={{
					fontSize: 12,
					color: "#9a9793",
					lineHeight: 1.65,
					textAlign: "center",
					borderTop: "0.5px solid rgba(232,230,225,0.1)",
					paddingTop: 10,
				}}>
					{fh}
				</div>
			)}

			<button
				className="pri"
				style={{ width: "100%", marginTop: 4, padding: "11px", border: "none", borderRadius: 8, background: "#e8e6e1", color: "#0f0e0c", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
				onClick={onNext}
			>
				{nextLabel}
			</button>
		</div>
	);
}


