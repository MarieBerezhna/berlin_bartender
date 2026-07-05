import { FILTER_LABELS } from "../../data/constants";

export const FILTER_TYPES = ["ingredients", "price", "category", "name"] as const;
export type FilterType = (typeof FILTER_TYPES)[number];

type FilterBarProps = {
	activeFilters: Set<FilterType>;
	onToggleFilter: (filter: FilterType) => void;
};

export default function FilterBar({ activeFilters, onToggleFilter }: FilterBarProps) {
	return (
		<div className="filters" id="filters">
			{FILTER_TYPES.map((filter) => (
				<button
					key={filter}
					className={`filt${activeFilters.has(filter) ? " on" : ""}`}
					onClick={() => onToggleFilter(filter)}
				>
					{FILTER_LABELS[filter as keyof typeof FILTER_LABELS]}
				</button>
			))}
		</div>
	);
}
