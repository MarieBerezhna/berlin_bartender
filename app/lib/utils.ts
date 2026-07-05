import { useEffect } from "react";

function isInteractiveElement(target: EventTarget | null): boolean {
	if (!(target instanceof HTMLElement)) return false;
	if (target.isContentEditable) return true;
	return ["BUTTON", "INPUT", "TEXTAREA", "SELECT", "A"].includes(target.tagName);
}

export function useActivateOnKeys(enabled: boolean, action: () => void): void {
	useEffect(() => {
		if (!enabled) return;

		function handleKeyDown(event: KeyboardEvent): void {
			if (event.defaultPrevented) return;
			if (event.metaKey || event.ctrlKey || event.altKey) return;
			if (event.key !== "Enter" && event.key !== " ") return;
			if (isInteractiveElement(event.target)) return;

			event.preventDefault();
			action();
		}

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [action, enabled]);
}
