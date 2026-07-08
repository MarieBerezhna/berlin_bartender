"use client";

import { useMemo, useRef, useState } from "react";

import RAW from "../../data/menu";
import type { MenuItem } from "../../data/constants";
import ChatFab from "./ChatFab";

type ChatRole = "user" | "assistant";

type ChatMessage = {
	role: ChatRole;
	content: string;
};

function buildSystemPrompt(menu: MenuItem[]): string {
	const aiCats = new Set([
		"Cócteles de autor",
		"Spritz",
		"Jarras",
		"Micheladas",
		"Coctelería clásica",
	]);

	const menuSummary = menu
		.filter((item) => aiCats.has(item.cat))
		.map((item) => {
			const price = item.prices?.[0] ? `${item.prices[0].p}€` : "";
			const recipe = item.ingr
				? Object.entries(item.ingr)
						.slice(0, 4)
						.map(([ing, amt]) => amt ? `${ing} ${amt}` : ing)
						.join(", ")
				: "";
			return `${item.name}|${item.cat}|${price}${recipe ? ` — ${recipe}` : ""}`;
		})
		.join("\n");

	return `Eres el asistente de barra del Café Berlín (Valencia). Recomienda bebidas del menú o cócteles clásicos preparables con nuestros ingredientes. Sé breve y directo. Usa **negrita** para nombres. Responde en español. Máximo 3-4 opciones.

MENÚ (nombre|categoría|precio — ingredientes principales):
${menuSummary}`;
}

function formatAiMessage(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
		.replace(/\*(.+?)\*/g, "<em>$1</em>")
		.replace(
			/^#{1,3} (.+)$/gm,
			"<div style=\"font-weight:700;color:#e8e6e1;margin-top:8px;margin-bottom:2px\">$1</div>",
		)
		.replace(/^[-•] (.+)$/gm, "<div style=\"padding-left:10px;margin:2px 0\">• $1</div>")
		.replace(/\n\n/g, "<br><br>")
		.replace(/\n/g, "<br>");
}

export default function ChatPanel() {
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState("");
	const [isSending, setIsSending] = useState(false);
	const [messages, setMessages] = useState<ChatMessage[]>([
		{
			role: "assistant",
			content:
				"Hola! Dime qué tipo de bebida buscas y te recomiendo algo del menú o te sugiero un clásico con lo que tenemos en barra.",
		},
	]);

	const inputRef = useRef<HTMLTextAreaElement | null>(null);
	const systemPrompt = useMemo(() => buildSystemPrompt(RAW as MenuItem[]), []);

	function toggleChat(): void {
		setOpen((prev) => {
			const next = !prev;
			if (next) {
				setTimeout(() => inputRef.current?.focus(), 0);
			}
			return next;
		});
	}

	async function sendChat(): Promise<void> {
		const msg = input.trim();
		if (!msg || isSending) return;

		const nextHistory: ChatMessage[] = [...messages, { role: "user", content: msg }];
		setInput("");
		setIsSending(true);
		setMessages(nextHistory);

		try {
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					system: systemPrompt,
					messages: nextHistory,
				}),
			});

			const data = await res.json().catch(() => ({}));
			const reply =
				data?.choices?.[0]?.message?.content ||
				data?.error?.message ||
				data?.error ||
				"No he podido obtener respuesta.";

			setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
		} catch {
			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: "Error al conectar con el asistente. Inténtalo de nuevo." },
			]);
		} finally {
			setIsSending(false);
			inputRef.current?.focus();
		}
	}

	function handleInputKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>): void {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			void sendChat();
		}
	}

	return (
		<>
			<ChatFab onClick={toggleChat} />
			<div id="chat-panel" className={open ? "open" : ""}>
				<div id="chat-header">
					<span>🍸 Asistente de barra</span>
					<button id="chat-close" onClick={toggleChat}>
						✕
					</button>
				</div>
				<div id="chat-messages">
					{messages.map((message, index) => {
						const isAi = message.role === "assistant";
						return (
							<div
								key={`${message.role}-${index}`}
								className={`chat-msg ${isAi ? "ai" : "user"}`}
								{...(isAi
									? { dangerouslySetInnerHTML: { __html: formatAiMessage(message.content) } }
									: { children: message.content })}
							/>
						);
					})}
					{isSending ? <div className="chat-msg ai thinking">...</div> : null}
				</div>
				<div id="chat-input-row">
					<textarea
						id="chat-input"
						ref={inputRef}
						rows={1}
						placeholder="Algo dulce, sin alcohol, con ron..."
						value={input}
						onChange={(event) => setInput(event.target.value)}
						onKeyDown={handleInputKeyDown}
					/>
					<button id="chat-send" onClick={() => void sendChat()} disabled={isSending}>
						➤
					</button>
				</div>
			</div>
		</>
	);
}
