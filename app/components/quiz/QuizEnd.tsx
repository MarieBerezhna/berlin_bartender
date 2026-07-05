import { useActivateOnKeys } from "../../lib/utils";

type QuizEndProps = {
	score: number;
	total: number;
	onRestart: () => void;
};

export default function QuizEnd({ score, total, onRestart }: QuizEndProps) {
	const safeTotal = total > 0 ? total : 1;
	const pct = Math.round((score / safeTotal) * 100);
	const emoji = pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚";
	const message =
		pct >= 80
			? "¡Eres un experto de la carta!"
			: pct >= 50
				? "Buen trabajo, sigue practicando."
				: "Hay que estudiar más la carta.";
		useActivateOnKeys(true, onRestart);

	return (
		<div className="qcard end">
			<div className="big">{emoji}</div>
			<div className="sc">
				{score} / {total}
			</div>
			<p>{message}</p>
			<div className="nav" style={{ marginTop: "1.5rem", display: "flex" }}>
				<button className="pri" onClick={onRestart}>
					Jugar de nuevo / Play again
				</button>
			</div>
		</div>
	);
}
