import { Q_META, type MenuItem } from "../../data/constants";
import type { QuizQuestion } from "../../lib/quiz";
import QuizFeedback from "../quiz/QuizFeedback";
import QuizOptions from "../quiz/QuizOptions";

type LearnQuizProps = {
	item: MenuItem;
	index: number;
	total: number;
	queueIndex: number;
	queueTotal: number;
	question: QuizQuestion;
	selectedOption: string | null;
	answered: boolean;
	onChoose: (option: string) => void;
	onNext: () => void;
	isLastInSession: boolean;
};

export default function LearnQuiz({
	item,
	index,
	total,
	queueIndex,
	queueTotal,
	question,
	selectedOption,
	answered,
	onChoose,
	onNext,
	isLastInSession,
}: LearnQuizProps) {
	const isCorrect = selectedOption === question.answer;
	const nextLabel = isLastInSession ? "Ver resultados / Results →" : "Siguiente / Next →";
	const qTypeLabel = Q_META[question.qtype as keyof typeof Q_META] || question.qtype;

	return (
		<>
			<div className="learn-card">
				<div className="learn-counter">
					Práctica · {index + 1} / {total}
					{queueTotal > 1 ? ` · ${queueIndex + 1}/${queueTotal}` : ""}
				</div>
				<div className="qtype">
					{qTypeLabel}
					<span className="qtag">{item.name}</span>
				</div>
				<div className="qtext">{question.q}</div>

				<QuizOptions
					options={question.opts}
					answer={question.answer}
					selectedOption={selectedOption}
					locked={answered}
					onSelect={onChoose}
				/>

				<QuizFeedback
					visible={answered}
					isCorrect={isCorrect}
					answer={question.answer}
					hint={question.hint}
				/>
			</div>

			<div className="nav" id="nav" style={{ display: answered ? "flex" : "none" }}>
				<button className="pri" onClick={onNext}>
					{nextLabel}
				</button>
			</div>
		</>
	);
}
