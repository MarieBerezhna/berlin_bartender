"use client";

import { useMemo, useState } from "react";

import ChatPanel from "./components/chat/ChatPanel";
import InteractiveMenu from "./components/interactive/InteractiveMenu";
import LearnEnd from "./components/learn/LearnEnd";
import Overview from "./components/learn/Overview";
import StudyCard from "./components/learn/StudyCard";
import FilterBar, { FILTER_TYPES, type FilterType } from "./components/layout/FilterBar";
import Header, { type AppMode } from "./components/layout/Header";
import TabBar from "./components/layout/TabBar";
import ProgressBar from "./components/quiz/ProgressBar";
import QuizCard from "./components/quiz/QuizCard";
import QuizEnd from "./components/quiz/QuizEnd";
import RAW from "./data/menu";
import type { MenuItem } from "./data/constants";
import { buildLearnQueue, getLearnableItems } from "./lib/learn";
import { makeQs } from "./lib/quiz";

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

  const activeFiltersKey = useMemo(() => [...activeFilters].sort().join("|"), [activeFilters]);

  function handleTabChange(tab: string): void {
    setActiveTab(tab);
    setActiveFamily(null);
  }

  function handleFamilyChange(family: string | null): void {
    setActiveFamily(family);
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
              onFamilyChange={handleFamilyChange}
            />
            {mode === "test" ? (
              <FilterBar activeFilters={activeFilters} onToggleFilter={handleToggleFilter} />
            ) : null}
          </>
        ) : null}
      </section>

      {mode === "learn" ? (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <LearnModePanel key={`${activeTab}|${activeFamily || ""}`} pool={filteredMenu} activeTab={activeTab} activeFamily={activeFamily} />
        </section>
      ) : null}

      {mode === "test" ? (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <TestModePanel
            key={`${activeTab}|${activeFamily || ""}|${activeFiltersKey}`}
            pool={filteredMenu}
            activeTab={activeTab}
            activeFilters={activeFilters}
          />
        </section>
      ) : null}

      {mode === "interactive" ? <InteractiveMenu /> : null}
      <ChatPanel />
    </main>
  );
}

type LearnModePanelProps = {
  pool: MenuItem[];
  activeTab: string;
  activeFamily: string | null;
};

function LearnModePanel({ pool, activeTab, activeFamily }: LearnModePanelProps) {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);

  const learnableItems = useMemo(() => getLearnableItems(pool), [pool]);
  const queue = useMemo(() => buildLearnQueue(learnableItems), [learnableItems]);

  if (learnableItems.length === 0) {
    return <div className="text-sm text-zinc-600 dark:text-zinc-400">No hay elementos disponibles para este filtro.</div>;
  }

  if (!started) {
    return (
      <Overview
        items={learnableItems}
        categoryLabel={activeFamily || activeTab}
        activeTab={activeTab}
        onStart={() => {
          setStarted(true);
          setIndex(0);
        }}
      />
    );
  }

  if (index < queue.length) {
    return (
      <StudyCard
        item={queue[index]}
        index={index}
        total={queue.length}
        onPrimaryAction={() => setIndex((prev) => prev + 1)}
      />
    );
  }

  return (
    <LearnEnd
      totalReviewed={queue.length}
      hadRecipes={queue.some((item) => Boolean(item.hasIngr && item.ingr && item.ingr.length > 1))}
      recallStats={{ hits: 0, total: 0, perfect: 0, items: 0 }}
      onRestart={() => {
        setStarted(false);
        setIndex(0);
      }}
    />
  );
}

type TestModePanelProps = {
  pool: MenuItem[];
  activeTab: string;
  activeFilters: Set<FilterType>;
};

function TestModePanel({ pool, activeTab, activeFilters }: TestModePanelProps) {
  const [questions, setQuestions] = useState(() =>
    makeQs({
      pool,
      activeFilters: new Set(activeFilters),
      activeTab,
      limit: 15,
    }),
  );
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const isFinished = questions.length > 0 && index >= questions.length;
  const currentQuestion = !isFinished ? questions[index] : undefined;

  if (questions.length === 0) {
    return (
      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        No hay preguntas para la combinación actual de pestaña y filtros.
      </div>
    );
  }

  if (isFinished) {
    return (
      <QuizEnd
        score={score}
        total={questions.length}
        onRestart={() => {
          setQuestions(
            makeQs({
              pool,
              activeFilters: new Set(activeFilters),
              activeTab,
              limit: 15,
            }),
          );
          setIndex(0);
          setScore(0);
          setAnswered(false);
          setSelectedOption(null);
        }}
      />
    );
  }

  if (!currentQuestion) return null;

  return (
    <>
      <ProgressBar currentIndex={index} total={questions.length} correct={score} showMeta />
      <QuizCard
        question={currentQuestion}
        selectedOption={selectedOption}
        answered={answered}
        onChoose={(option) => {
          if (answered) return;
          setSelectedOption(option);
          setAnswered(true);
          if (option === currentQuestion.answer) {
            setScore((prev) => prev + 1);
          }
        }}
        onNext={() => {
          setIndex((prev) => prev + 1);
          setAnswered(false);
          setSelectedOption(null);
        }}
        isLastQuestion={index === questions.length - 1}
      />
    </>
  );
}
