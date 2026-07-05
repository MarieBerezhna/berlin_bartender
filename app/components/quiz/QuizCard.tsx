import Image from "next/image";

import { Q_META } from "../../data/constants";
import type { QuizQuestion } from "../../lib/quiz";
import { useActivateOnKeys } from "../../lib/utils";
import QuizFeedback from "./QuizFeedback";
import QuizOptions from "./QuizOptions";

type QuizCardProps = {
	question: QuizQuestion;
	selectedOption: string | null;
	answered: boolean;
	onChoose: (option: string) => void;
	onNext: () => void;
	isLastQuestion: boolean;
};

export default function QuizCard({
	question,
	selectedOption,
	answered,
	onChoose,
	onNext,
	isLastQuestion,
}: QuizCardProps) {
	const isCorrect = selectedOption === question.answer;
	const nextLabel = isLastQuestion ? "Resultados / Results →" : "Siguiente / Next →";
	const qTypeLabel = Q_META[question.qtype as keyof typeof Q_META] || question.qtype;
	const questionImageSrc =
		question.img && question.img.startsWith("./") ? question.img.replace("./", "/") : question.img;
	useActivateOnKeys(answered, onNext);

	return (
		<>
			<div className="qcard">
				<div className="qtype">
					{qTypeLabel}
					<span className="qtag">{question.cat}</span>
				</div>
				{questionImageSrc ? (
					<Image className="qimg" src={questionImageSrc} alt={question.cat} width={150} height={150} unoptimized />
				) : null}
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
