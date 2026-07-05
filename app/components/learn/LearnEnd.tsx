import { useActivateOnKeys } from "../../lib/utils";

type RecallStats = {
	hits: number;
	total: number;
	perfect: number;
	items: number;
};

type LearnEndProps = {
	totalReviewed: number;
	hadRecipes: boolean;
	recallStats: RecallStats;
	onRestart: () => void;
};

export default function LearnEnd({ totalReviewed, hadRecipes, recallStats, onRestart }: LearnEndProps) {
	const reviewedLine = `Repasaste ${totalReviewed} bebidas.`;

	const recallPct = recallStats.total > 0 ? Math.round((recallStats.hits / recallStats.total) * 100) : 0;
	useActivateOnKeys(true, onRestart);

	return (
		<div className="learn-card end">
			<div className="big">🎓</div>
			<div className="sc" style={{ fontSize: 22, fontWeight: 500, marginBottom: 8 }}>
				¡Sesión completada!
			</div>
			<p style={{ color: "#9a9793", fontSize: 14 }}>
				{reviewedLine}
				{hadRecipes && recallStats.total > 0 ? (
					<>
						<br />
						<br />
						<strong style={{ color: "#e8e6e1" }}>Repaso final</strong>
						<br />
						{recallStats.hits}/{recallStats.total} ingredientes ({recallPct}%) · {recallStats.perfect}/
						{recallStats.items} perfectos
					</>
				) : null}
			</p>
			<div className="nav" style={{ marginTop: "1.5rem", display: "flex" }}>
				<button className="pri" onClick={onRestart}>
					Repetir
				</button>
			</div>
		</div>
	);
}
