import Image from "next/image";

import IMAGES from "../../data/images";

type QuizOptionsProps = {
	options: string[];
	answer: string;
	selectedOption: string | null;
	locked: boolean;
	onSelect: (option: string) => void;
};

export default function QuizOptions({
	options,
	answer,
	selectedOption,
	locked,
	onSelect,
}: QuizOptionsProps) {
	const hasImageOptions = options.some((option) => Boolean(IMAGES[option]));

	return (
		<div className={hasImageOptions ? "opts-img" : "opts"} id="optsdiv">
			{options.map((option) => {
				const image = IMAGES[option];
				const isCorrect = locked && option === answer;
				const isWrongSelected = locked && selectedOption === option && selectedOption !== answer;
				const statusClass = isCorrect ? " ok" : isWrongSelected ? " bad" : "";

				if (image) {
					const src = image.startsWith("./") ? image.replace("./", "/") : image;
					return (
						<button
							key={option}
							className={`ob-img${statusClass}`}
							onClick={() => onSelect(option)}
							disabled={locked}
						>
							<Image src={src} alt={option} width={150} height={150} unoptimized />
							<span>{option}</span>
						</button>
					);
				}

				return (
					<button
						key={option}
						className={`ob${statusClass}`}
						onClick={() => onSelect(option)}
						disabled={locked}
					>
						{option}
					</button>
				);
			})}
		</div>
	);
}
