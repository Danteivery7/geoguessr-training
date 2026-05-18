import { Clock, Crown, Play } from "lucide-react";
import { useState } from "react";
import type { Question } from "../types";
import { countryDuels } from "../data/countryDuels";
import { questions } from "../data/questions";
import ImageWithAttribution from "./ImageWithAttribution";
import ProgressRing from "./ProgressRing";

type CountryDuelProps = {
  masteryByCountry: Record<string, number>;
  onStartQuiz: (title: string, selectedQuestions: Question[]) => void;
};

const collectQuestions = (ids: string[]) => {
  const found = ids.map((id) => questions.find((question) => question.id === id)).filter(Boolean) as Question[];
  return found.length ? found : questions.filter((question) => question.disciplineId === "country-duels").slice(0, 6);
};

const CountryDuel = ({ masteryByCountry, onStartQuiz }: CountryDuelProps) => {
  const [selectedId, setSelectedId] = useState(countryDuels[0].id);
  const selected = countryDuels.find((duel) => duel.id === selectedId) ?? countryDuels[0];
  const mastery = Math.round(
    ((masteryByCountry[selected.countries[0]] ?? 0) + (masteryByCountry[selected.countries[1]] ?? 0)) / 2
  );

  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs uppercase tracking-[0.22em] text-signal">Head-to-head modules</div>
        <h1 className="font-display text-5xl font-black">Country Duels</h1>
      </div>
      <div className="grid gap-5 xl:grid-cols-[340px_1fr]">
        <aside className="glass rounded-lg p-4">
          <h2 className="font-display text-2xl font-bold">Duel ladder</h2>
          <div className="mt-4 max-h-[690px] space-y-2 overflow-auto pr-1">
            {countryDuels.map((duel) => (
              <button
                key={duel.id}
                type="button"
                onClick={() => setSelectedId(duel.id)}
                className={`w-full rounded border p-3 text-left ${
                  selected.id === duel.id ? "border-signal/60 bg-signal/10" : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <div className="font-semibold">{duel.title}</div>
                <div className="text-xs text-slate-400">{duel.clueCards.length} clue cards / boss test</div>
              </button>
            ))}
          </div>
        </aside>
        <main className="space-y-5">
          <section className="glass rounded-lg p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-4xl font-bold">{selected.title}</h2>
                <p className="mt-2 max-w-2xl text-slate-400">{selected.description}</p>
              </div>
              <ProgressRing value={mastery} label="duel" color="#ff9f43" />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onStartQuiz(`${selected.title} Quick Quiz`, collectQuestions(selected.quickQuizQuestionIds))}
                className="inline-flex items-center gap-2 rounded bg-signal px-4 py-2 font-bold text-night"
              >
                <Play size={16} /> Quick quiz
              </button>
              <button
                type="button"
                onClick={() => onStartQuiz(`${selected.title} Timed Test`, collectQuestions(selected.timedTestQuestionIds))}
                className="inline-flex items-center gap-2 rounded border border-white/10 px-4 py-2 font-semibold text-slate-100"
              >
                <Clock size={16} /> Timed test
              </button>
              <button
                type="button"
                onClick={() => onStartQuiz(`${selected.title} Final Boss`, collectQuestions(selected.finalBossQuestionIds))}
                className="inline-flex items-center gap-2 rounded border border-amber/40 bg-amber/10 px-4 py-2 font-semibold text-amber"
              >
                <Crown size={16} /> Final boss
              </button>
            </div>
          </section>
          <section className="grid gap-4 lg:grid-cols-2">
            {selected.clueCards.map((card) => (
              <article key={card.id} className="glass rounded-lg">
                <ImageWithAttribution source={card.imageSource} title={card.title} />
                <div className="space-y-3 p-4">
                  <h3 className="font-display text-2xl font-bold">{card.title}</h3>
                  <p className="text-sm text-slate-300">{card.giveaway}</p>
                  <div className="rounded border border-coral/20 bg-coral/10 p-3 text-sm text-slate-300">
                    {card.commonMistake}
                  </div>
                </div>
              </article>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default CountryDuel;
