"use client";

import { useMemo, useState } from "react";

import ChatPanel from "./components/chat/ChatPanel";
import InteractiveMenu from "./components/interactive/InteractiveMenu";
import LearnEnd from "./components/learn/LearnEnd";
import Overview from "./components/learn/Overview";
import RecallCard, { type RecallOptionState } from "./components/learn/RecallCard";
import StudyCard from "./components/learn/StudyCard";
import FilterBar, { FILTER_TYPES, type FilterType } from "./components/layout/FilterBar";
import Header, { type AppMode } from "./components/layout/Header";
import TabBar from "./components/layout/TabBar";
import ProgressBar from "./components/quiz/ProgressBar";
import QuizCard from "./components/quiz/QuizCard";
import QuizEnd from "./components/quiz/QuizEnd";
import RAW from "./data/menu";
import type { MenuItem } from "./data/constants";
import { buildLearnQueue, buildRecallViewModel, createLearnQuizQueue, getLearnableItems, scoreRecallSelection } from "./lib/learn";
import { makeQs } from "./lib/quiz";
import LearnQuiz from "./components/learn/LearnQuiz";

const DESTILADOS_CATS = new Set(["Ron", "Whisky", "Gin", "Tequila", "Vodka"]);

export default function Home() {
  const [mode, setMode] = useState<AppMode>("learn");
  const [activeTab, setActiveTab] = useState<string>("Coctelería clásica");
  const [activeFamily, setActiveFamily] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<FilterType>>(new Set(FILTER_TYPES));

  const filteredMenu = useMemo(() => {
    let pool = [...RAW];
    if (activeTab === "Destilados") {
      pool = pool.filter((item) => DESTILADOS_CATS.has(item.cat));
      if (activeFamily) {
        pool = pool.filter((item) => item.cat === activeFamily);
      }
    } else if (activeTab !== "Todo") {
      pool = pool.filter((item) => item.cat === activeTab);
      if (activeFamily) {
        pool = pool.filter((item) => item.family === activeFamily);
      }
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
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-3 px-2 py-3 text-zinc-900 sm:gap-6 sm:px-4 sm:py-6 lg:px-6 lg:py-12 dark:text-zinc-100">
      <section className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm sm:p-5 lg:p-6 dark:border-zinc-800 dark:bg-zinc-950">
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
        <section className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm sm:p-5 lg:p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <LearnModePanel key={`${activeTab}|${activeFamily || ""}`} pool={filteredMenu} activeTab={activeTab} activeFamily={activeFamily} />
        </section>
      ) : null}

      {mode === "test" ? (
        <section className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm sm:p-5 lg:p-6 dark:border-zinc-800 dark:bg-zinc-950">
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
  const [itemIndex, setItemIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [recallMode, setRecallMode] = useState(false);
  const [recallSelected, setRecallSelected] = useState<Set<string>>(new Set());
  const [recallChecked, setRecallChecked] = useState(false);
  const [recallStatusByOption, setRecallStatusByOption] = useState<Record<string, RecallOptionState>>({});
  const [recallFeedback, setRecallFeedback] = useState<{ message: string; perfect: boolean } | null>(null);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const learnableItems = useMemo(() => getLearnableItems(pool), [pool]);
  const queue = useMemo(() => buildLearnQueue(learnableItems), [learnableItems]);
  const quizQueues = useMemo(
    () =>
      queue.map((item) =>
        createLearnQuizQueue(item).map((question) => ({
          qtype: question.qtype,
          q: question.question,
          opts: question.options.map((option) => String(option)),
          answer: String(question.answer),
          hint: question.hint,
        })),
      ),
    [queue],
  );

  const currentItem = queue[itemIndex];
  const currentQuestions = quizQueues[itemIndex] || [];
  const currentQuestion = currentQuestions[questionIndex];
  const currentRecallVM = useMemo(
    () => (currentItem ? buildRecallViewModel(currentItem) : null),
    [currentItem],
  );

  function advanceToQuizOrNext() {
    setRecallMode(false);
    if (currentQuestions.length > 0) {
      setQuizMode(true);
      setQuestionIndex(0);
      setAnswered(false);
      setSelectedOption(null);
    } else {
      setItemIndex((prev) => prev + 1);
    }
  }

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
          setItemIndex(0);
          setQuestionIndex(0);
          setQuizMode(false);
          setRecallMode(false);
          setRecallSelected(new Set());
          setRecallChecked(false);
          setRecallStatusByOption({});
          setRecallFeedback(null);
          setAnswered(false);
          setSelectedOption(null);
        }}
      />
    );
  }

  if (itemIndex >= queue.length) {
    return (
      <LearnEnd
        totalReviewed={queue.length}
        hadRecipes={queue.some((item) => Boolean(item.hasIngr && item.ingr && item.ingr.length > 1))}
        recallStats={{ hits: 0, total: 0, perfect: 0, items: 0 }}
        onRestart={() => {
          setStarted(false);
          setItemIndex(0);
          setQuestionIndex(0);
          setQuizMode(false);
          setRecallMode(false);
          setRecallSelected(new Set());
          setRecallChecked(false);
          setRecallStatusByOption({});
          setRecallFeedback(null);
          setAnswered(false);
          setSelectedOption(null);
        }}
      />
    );
  }

  if (recallMode && currentItem && currentRecallVM) {
    const hasRecipe = Boolean(currentItem.hasIngr && currentItem.ingr && currentItem.ingr.length > 1);
    if (hasRecipe) {
      return (
        <RecallCard
          item={currentItem}
          index={itemIndex}
          total={queue.length}
          stage="main"
          options={currentRecallVM.options}
          selected={recallSelected}
          statusByOption={recallStatusByOption}
          checked={recallChecked}
          feedbackMessage={recallFeedback?.message}
          feedbackPerfect={recallFeedback?.perfect}
          onToggle={(opt) => {
            if (recallChecked) return;
            setRecallSelected((prev) => {
              const next = new Set(prev);
              if (next.has(opt)) next.delete(opt);
              else next.add(opt);
              return next;
            });
          }}
          onCheck={() => {
            const result = scoreRecallSelection(currentItem, [...recallSelected]);
            const correct = new Set(currentItem.ingr || []);
            const status: Record<string, RecallOptionState> = {};
            for (const opt of currentRecallVM.options) {
              if (correct.has(opt) && recallSelected.has(opt)) status[opt] = "correct";
              else if (correct.has(opt)) status[opt] = "missed";
              else if (recallSelected.has(opt)) status[opt] = "wrong";
              else status[opt] = "idle";
            }
            setRecallStatusByOption(status);
            setRecallFeedback({ message: result.message, perfect: result.perfect });
            setRecallChecked(true);
          }}
          onNext={advanceToQuizOrNext}
          nextLabel={
            currentQuestions.length > 0
              ? "A practicar →"
              : itemIndex === queue.length - 1
                ? "Ver resultados →"
                : "Siguiente →"
          }
        />
      );
    }
  }

  if (quizMode && currentItem && currentQuestion) {
    return (
      <LearnQuiz
        item={currentItem}
        index={itemIndex}
        total={queue.length}
        queueIndex={questionIndex}
        queueTotal={currentQuestions.length}
        question={currentQuestion}
        selectedOption={selectedOption}
        answered={answered}
        onChoose={(option) => {
          if (answered) return;
          setSelectedOption(option);
          setAnswered(true);
        }}
        onNext={() => {
          if (questionIndex < currentQuestions.length - 1) {
            setQuestionIndex((prev) => prev + 1);
            setAnswered(false);
            setSelectedOption(null);
            return;
          }

          setQuizMode(false);
          setItemIndex((prev) => prev + 1);
          setQuestionIndex(0);
          setAnswered(false);
          setSelectedOption(null);
        }}
        isLastInSession={itemIndex === queue.length - 1 && questionIndex === currentQuestions.length - 1}
      />
    );
  }

  if (currentItem) {
    return (
      <StudyCard
        item={currentItem}
        index={itemIndex}
        total={queue.length}
        onPrimaryAction={() => {
          const hasRecipe = Boolean(currentItem.hasIngr && currentItem.ingr && currentItem.ingr.length > 1);
          if (hasRecipe) {
            setRecallMode(true);
            setRecallSelected(new Set());
            setRecallChecked(false);
            setRecallStatusByOption({});
            setRecallFeedback(null);
            return;
          }

          if (currentQuestions.length > 0) {
            setQuizMode(true);
            setQuestionIndex(0);
            setAnswered(false);
            setSelectedOption(null);
            return;
          }

          setItemIndex((prev) => prev + 1);
        }}
      />
    );
  }

  return null;
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
  const [recallSelected, setRecallSelected] = useState<Set<string>>(new Set());
  const [recallChecked, setRecallChecked] = useState(false);
  const [recallStatusByOption, setRecallStatusByOption] = useState<Record<string, RecallOptionState>>({});
  const [recallFeedback, setRecallFeedback] = useState<{ message: string; perfect: boolean } | null>(null);

  function resetRecall() {
    setRecallSelected(new Set());
    setRecallChecked(false);
    setRecallStatusByOption({});
    setRecallFeedback(null);
  }

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
          resetRecall();
        }}
      />
    );
  }

  if (!currentQuestion) return null;

  if (currentQuestion.qtype === "recall" && currentQuestion.item) {
    const recallItem = currentQuestion.item;
    return (
      <>
        <ProgressBar currentIndex={index} total={questions.length} correct={score} showMeta />
        <RecallCard
          item={recallItem}
          index={index}
          total={questions.length}
          stage="main"
          options={currentQuestion.opts}
          selected={recallSelected}
          statusByOption={recallStatusByOption}
          checked={recallChecked}
          feedbackMessage={recallFeedback?.message}
          feedbackPerfect={recallFeedback?.perfect}
          onToggle={(opt) => {
            if (recallChecked) return;
            setRecallSelected((prev) => {
              const next = new Set(prev);
              if (next.has(opt)) next.delete(opt);
              else next.add(opt);
              return next;
            });
          }}
          onCheck={() => {
            const result = scoreRecallSelection(recallItem, [...recallSelected]);
            const correct = new Set(currentQuestion.recallAnswers || []);
            const status: Record<string, RecallOptionState> = {};
            for (const opt of currentQuestion.opts) {
              if (correct.has(opt) && recallSelected.has(opt)) status[opt] = "correct";
              else if (correct.has(opt)) status[opt] = "missed";
              else if (recallSelected.has(opt)) status[opt] = "wrong";
              else status[opt] = "idle";
            }
            setRecallStatusByOption(status);
            setRecallFeedback({ message: result.message, perfect: result.perfect });
            setRecallChecked(true);
            if (result.perfect) setScore((prev) => prev + 1);
          }}
          onNext={() => {
            setIndex((prev) => prev + 1);
            setAnswered(false);
            setSelectedOption(null);
            resetRecall();
          }}
          nextLabel={index === questions.length - 1 ? "Resultados →" : "Siguiente →"}
        />
      </>
    );
  }

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
