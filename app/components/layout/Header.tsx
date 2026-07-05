export type AppMode = "test" | "learn" | "interactive";

type HeaderProps = {
	mode: AppMode;
	onModeChange: (mode: AppMode) => void;
};

export default function Header({ mode, onModeChange }: HeaderProps) {
	return (
		<div className="header-top">
			<div className="header-main">
				<h1>🍸 Café Berlín</h1>
				<div className="mode-switch" id="modeSwitch">
					<button
						className={`mode-btn${mode === "test" ? " active" : ""}`}
						id="btnTest"
						onClick={() => onModeChange("test")}
					>
						🎯 Test
					</button>
					<button
						className={`mode-btn${mode === "learn" ? " active" : ""}`}
						id="btnLearn"
						onClick={() => onModeChange("learn")}
					>
						📖 Aprender
					</button>
					<button
						className={`mode-btn${mode === "interactive" ? " active" : ""}`}
						id="btnMenu"
						onClick={() => onModeChange("interactive")}
					>
						🧭 Interactive Menú
					</button>
				</div>
			</div>
		</div>
	);
}
