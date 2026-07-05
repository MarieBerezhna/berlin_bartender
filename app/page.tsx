"use client";

import { useMemo, useState } from "react";

import ChatPanel from "./components/chat/ChatPanel";
import InteractiveMenu from "./components/interactive/InteractiveMenu";
import FilterBar, { FILTER_TYPES, type FilterType } from "./components/layout/FilterBar";
import Header, { type AppMode } from "./components/layout/Header";
import TabBar from "./components/layout/TabBar";
import RAW from "./data/menu";
import { buildLearnQueue, getLearnableItems } from "./lib/learn";

export default function Home() {
  const [mode, setMode] = useState<AppMode>("learn");
  const [activeTab, setActiveTab] = useState<string>("Todo");
  const [activeFamily, setActiveFamily] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<FilterType>>(new Set(FILTER_TYPES));

  const filteredMenu = useMemo(() => {
    let pool = [...RAW];
    if (activeTab !== "Todo") {
      pool = pool.filter((item) => item.cat === activeTab);
    }
    if (activeFamily) {
      pool = pool.filter((item) => item.family === activeFamily);
    }
    return pool;
  }, [activeFamily, activeTab]);

  const learnableItems = getLearnableItems(RAW);
  const previewQueue = buildLearnQueue(RAW, { activeTab, activeFamily: activeFamily || undefined });

  function handleTabChange(tab: string): void {
    setActiveTab(tab);
    setActiveFamily(null);
  }

  function handleToggleFilter(filter: FilterType): void {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(filter) && next.size === 1) return next;
      if (next.has(filter)) next.delete(filter);
      else next.add(filter);
      return next;
    });
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-12 text-zinc-900 dark:text-zinc-100">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <Header mode={mode} onModeChange={setMode} />
        {mode !== "interactive" ? (
          <>
            <TabBar
              activeTab={activeTab}
              activeFamily={activeFamily}
              onTabChange={handleTabChange}
              onFamilyChange={setActiveFamily}
            />
            {mode === "test" ? (
              <FilterBar activeFilters={activeFilters} onToggleFilter={handleToggleFilter} />
            ) : null}
          </>
        ) : null}
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">TypeScript enabled</p>
        <h1 className="mt-2 text-3xl font-semibold">Café Berlín is now running on a typed Next.js app</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
          The menu data and learn helpers are now wired through a TypeScript module, so the app can grow without losing structure.
        </p>
      </section>

      {mode === "interactive" ? <InteractiveMenu /> : null}

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold">Learn module</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {learnableItems.length} learnable items are available from the current menu.
          </p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Current view: {activeFamily ? `${activeTab} / ${activeFamily}` : activeTab} ({filteredMenu.length} items)
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold">Preview queue</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            The first preview item is {previewQueue[0]?.name ?? "not available"}.
          </p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Mode: {mode}. Filters: {[...activeFilters].join(", ")}
          </p>
        </div>
      </section>
      <ChatPanel />
    </main>
  );
}
