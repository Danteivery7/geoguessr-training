import { Play } from "lucide-react";
import { useMemo, useState } from "react";
import type { ProgressState, Question } from "../types";
import { categories } from "../data/categories";
import { countries } from "../data/countries";
import { disciplines } from "../data/disciplines";
import { questions } from "../data/questions";
import { getQuestionsByFilters } from "../utils/questionGenerator";

type CustomTestBuilderProps = {
  progress: ProgressState;
  onStartQuiz: (title: string, selectedQuestions: Question[]) => void;
};

const CustomTestBuilder = ({ progress, onStartQuiz }: CustomTestBuilderProps) => {
  const [disciplineId, setDisciplineId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [country, setCountry] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [count, setCount] = useState(20);
  const [timed, setTimed] = useState(false);
  const [visualOnly, setVisualOnly] = useState(false);
  const [closeMode, setCloseMode] = useState(true);
  const [mistakesOnly, setMistakesOnly] = useState(false);

  const availableCategories = useMemo(
    () => categories.filter((category) => !disciplineId || category.disciplineId === disciplineId),
    [disciplineId]
  );

  const start = () => {
    const mistakeQuestionIds = mistakesOnly ? progress.mistakes.filter((mistake) => !mistake.mastered).map((mistake) => mistake.questionId) : undefined;
    const selected = getQuestionsByFilters(
      {
        disciplineId: disciplineId || undefined,
        categoryId: categoryId || undefined,
        countries: country ? [country] : undefined,
        difficulty: difficulty ? Number(difficulty) : undefined,
        count,
        visualOnly,
        closeCountryMode: closeMode,
        mistakeQuestionIds,
      },
      [...questions, ...progress.customQuestions]
    ).map((question) => (timed ? { ...question, timeLimitSeconds: question.timeLimitSeconds ?? 45 } : question));

    onStartQuiz("Custom Training Test", selected);
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs uppercase tracking-[0.22em] text-signal">Local question generator</div>
        <h1 className="font-display text-5xl font-black">Custom Tests</h1>
      </div>
      <section className="glass rounded-lg p-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="text-sm text-slate-300">
            Discipline
            <select value={disciplineId} onChange={(event) => setDisciplineId(event.target.value)} className="mt-1 w-full rounded border border-white/10 bg-night px-3 py-2">
              <option value="">All disciplines</option>
              {disciplines.map((discipline) => (
                <option key={discipline.id} value={discipline.id}>{discipline.title}</option>
              ))}
            </select>
          </label>
          <label className="text-sm text-slate-300">
            Category
            <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)} className="mt-1 w-full rounded border border-white/10 bg-night px-3 py-2">
              <option value="">All categories</option>
              {availableCategories.map((category) => (
                <option key={category.id} value={category.id}>{category.title}</option>
              ))}
            </select>
          </label>
          <label className="text-sm text-slate-300">
            Country
            <select value={country} onChange={(event) => setCountry(event.target.value)} className="mt-1 w-full rounded border border-white/10 bg-night px-3 py-2">
              <option value="">All countries</option>
              {countries.map((item) => (
                <option key={item.id} value={item.name}>{item.name}</option>
              ))}
            </select>
          </label>
          <label className="text-sm text-slate-300">
            Difficulty
            <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)} className="mt-1 w-full rounded border border-white/10 bg-night px-3 py-2">
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map((level) => (
                <option key={level} value={level}>D{level}</option>
              ))}
            </select>
          </label>
          <label className="text-sm text-slate-300">
            Number of questions
            <input type="number" min={5} max={100} value={count} onChange={(event) => setCount(Number(event.target.value))} className="mt-1 w-full rounded border border-white/10 bg-night px-3 py-2" />
          </label>
          {[
            ["Timed", timed, setTimed],
            ["Visual only", visualOnly, setVisualOnly],
            ["Close-country mode", closeMode, setCloseMode],
            ["Mistake review only", mistakesOnly, setMistakesOnly],
          ].map(([label, value, setter]) => (
            <label key={String(label)} className="flex items-center gap-3 rounded border border-white/10 bg-white/[0.04] p-3 text-sm text-slate-300">
              <input type="checkbox" checked={Boolean(value)} onChange={(event) => (setter as (next: boolean) => void)(event.target.checked)} />
              {String(label)}
            </label>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={start} className="inline-flex items-center gap-2 rounded bg-signal px-4 py-2 font-bold text-night">
            <Play size={16} /> Create test
          </button>
          <button type="button" onClick={() => {
            setDisciplineId("country-duels");
            setCountry("Spain");
            setCount(20);
            setCloseMode(true);
          }} className="rounded border border-white/10 px-3 py-2 text-sm">
            Spain vs Portugal signs and roads
          </button>
          <button type="button" onClick={() => {
            setDisciplineId("language");
            setCategoryId("language-slavic-language-comparison");
            setCount(15);
            setCloseMode(true);
          }} className="rounded border border-white/10 px-3 py-2 text-sm">
            Slavic language test
          </button>
          <button type="button" onClick={() => {
            setDisciplineId("roads");
            setCategoryId("roads-road-lines");
            setCountry("Colombia");
            setCount(10);
          }} className="rounded border border-white/10 px-3 py-2 text-sm">
            South America road lines
          </button>
        </div>
      </section>
    </div>
  );
};

export default CustomTestBuilder;
