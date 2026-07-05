type QuizFeedbackProps = {
	visible: boolean;
	isCorrect: boolean;
	answer: string;
	hint: string;
};

export default function QuizFeedback({ visible, isCorrect, answer, hint }: QuizFeedbackProps) {
	return (
		<div className="fb" id="fb" style={{ display: visible ? "block" : "none" }}>
			{isCorrect ? (
				<>
					<strong>✓ Correcto!</strong>
					<br />
					<span>{hint}</span>
				</>
			) : (
				<>
					<strong>✗ Incorrecto</strong> - respuesta: <strong>{answer}</strong>
					<br />
					<span>{hint}</span>
				</>
			)}
		</div>
	);
}
