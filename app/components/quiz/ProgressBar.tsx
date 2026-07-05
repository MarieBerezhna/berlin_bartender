type ProgressBarProps = {
	currentIndex: number;
	total: number;
	correct: number;
	showMeta?: boolean;
};

function toPercent(value: number): string {
	return `${Math.max(0, Math.min(100, Math.round(value)))}%`;
}

export default function ProgressBar({
	currentIndex,
	total,
	correct,
	showMeta = true,
}: ProgressBarProps) {
	const safeTotal = total > 0 ? total : 0;
	const progress = safeTotal ? (currentIndex / safeTotal) * 100 : 0;
	const scorePct = currentIndex === 0 ? 0 : Math.round((correct / currentIndex) * 100);

	return (
		<>
			<div className="pbar">
				<div className="pfill" id="prog" style={{ width: toPercent(progress) }} />
			</div>
			{showMeta ? (
				<div className="meta" id="metaBar">
					<div className="mc">
						<div className="ml">Question</div>
						<div className="mv" id="qnum">
							{safeTotal ? `${Math.min(currentIndex + 1, safeTotal)}/${safeTotal}` : "-"}
						</div>
					</div>
					<div className="mc">
						<div className="ml">Correct</div>
						<div className="mv" id="qok">
							{correct}
						</div>
					</div>
					<div className="mc">
						<div className="ml">Score</div>
						<div className="mv" id="qpct">
							{safeTotal ? `${scorePct}%` : "-"}
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}
