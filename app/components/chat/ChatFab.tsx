type ChatFabProps = {
	onClick: () => void;
};

export default function ChatFab({ onClick }: ChatFabProps) {
	return (
		<button id="chat-fab" onClick={onClick} title="Asistente de barra" aria-label="Abrir asistente de barra">
			🍸
		</button>
	);
}
