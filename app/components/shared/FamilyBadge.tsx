import {
	AUTOR_COLOR,
	AUTOR_TEXT,
	CLASICA_CAT,
	CLASICA_COLOR,
	CLASICA_TEXT,
} from "@/app/data/constants";

export default function FamilyBadge({ itemfamily, showCategoryLabel, cat }: { itemfamily: string | undefined; showCategoryLabel?: boolean; cat?: string }) {
	if (!itemfamily) return null;

	const bg = itemfamily === CLASICA_CAT ? CLASICA_COLOR : AUTOR_COLOR;
	const color = itemfamily === CLASICA_CAT ? CLASICA_TEXT : AUTOR_TEXT;

	return (
		<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
			<span
			style={{
				display: "inline-block",
				fontSize: "10px",
				fontWeight: 600,
				padding: "2px 7px",
				borderRadius: "20px",
				background: bg,
				color,
				letterSpacing: ".04em",
				textTransform: "uppercase",
			}}
		>
			{itemfamily}
			</span>
            {showCategoryLabel && cat && (<span style={{ fontSize: 11, color: "#9a9793", textTransform: "uppercase", letterSpacing: ".04em" }}>
					{cat}
			</span>)}
        </div>
	);
}