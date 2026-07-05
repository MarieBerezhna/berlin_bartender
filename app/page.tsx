import RAW from "./data/menu";
import ChatPanel from "./components/chat/ChatPanel";
import { buildLearnQueue, getLearnableItems } from "./lib/learn";

export default function Home() {
  const learnableItems = getLearnableItems(RAW);
  const previewQueue = buildLearnQueue(RAW, { activeTab: "Todo" });

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-12 text-zinc-900 dark:text-zinc-100">
      <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">TypeScript enabled</p>
        <h1 className="mt-2 text-3xl font-semibold">Café Berlín is now running on a typed Next.js app</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
          The menu data and learn helpers are now wired through a TypeScript module, so the app can grow without losing structure.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold">Learn module</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {learnableItems.length} learnable items are available from the current menu.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold">Preview queue</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            The first preview item is {previewQueue[0]?.name ?? "not available"}.
          </p>
        </div>
      </section>
      <ChatPanel />
    </main>
  );
}
