import { CheckCircle2, RotateCcw } from "lucide-react";
import type { MistakeRecord, ProgressState } from "../types";
import { questions } from "../data/questions";
import { getQuestionsByFilters } from "../utils/questionGenerator";

type ReviewMistakesProps = {
  progress: ProgressState;
  markMistakeMastered: (mistakeId: string) => void;
  onStartQuiz: (title: string, selectedQuestions: typeof questions) => void;
};

const groupBy = (mistakes: MistakeRecord[], key: keyof MistakeRecord) =>
  mistakes.reduce<Record<string, MistakeRecord[]>>((groups, mistake) => {
    const value = String(mistake[key] ?? "Unknown");
    groups[value] ??= [];
    groups[value].push(mistake);
    return groups;
  }, {});

const ReviewMistakes = ({ progress, markMistakeMastered, onStartQuiz }: ReviewMistakesProps) => {
  const active = progress.mistakes.filter((mistake) => !mistake.mastered);
  const byCountry = groupBy(active, "country");
  const byCategory = groupBy(active, "categoryId");
  const byDiscipline = groupBy(active, "disciplineId");
  const topTags = Object.entries(
    active.flatMap((mistake) => mistake.tags).reduce<Record<string, number>>((counts, tag) => {
      counts[tag] = (counts[tag] ?? 0) + 1;
      return counts;
    }, {})
  ).sort((a, b) => b[1] - a[1]);

  const retestMistakes = () => {
    const ids = active.map((mistake) => mistake.questionId);
    onStartQuiz("Mistake Review Exam", getQuestionsByFilters({ count: Math.min(15, ids.length || 5), mistakeQuestionIds: ids }));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-signal">Adaptive review</div>
          <h1 className="font-display text-5xl font-black">Review Mistakes</h1>
        </div>
        <button type="button" onClick={retestMistakes} className="inline-flex items-center gap-2 rounded bg-signal px-4 py-2 font-bold text-night">
          <RotateCcw size={16} /> Retest mistakes
        </button>
      </div>
      <section className="grid gap-4 md:grid-cols-4">
        <div className="glass rounded-lg p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Open mistakes</div>
          <div className="font-display text-4xl font-bold">{active.length}</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Countries</div>
          <div className="font-display text-4xl font-bold">{Object.keys(byCountry).length}</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Categories</div>
          <div className="font-display text-4xl font-bold">{Object.keys(byCategory).length}</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Disciplines</div>
          <div className="font-display text-4xl font-bold">{Object.keys(byDiscipline).length}</div>
        </div>
      </section>
      <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="glass rounded-lg p-5">
          <h2 className="font-display text-3xl font-bold">You keep missing these</h2>
          <div className="mt-4 space-y-3">
            {active.length ? (
              active.map((mistake) => (
                <div key={mistake.id} className="rounded border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold">{mistake.prompt}</div>
                      <div className="mt-1 text-sm text-slate-400">
                        Chose {mistake.selectedAnswer}; answer was {mistake.correctAnswer}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {mistake.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="rounded bg-white/10 px-2 py-1 text-xs text-slate-300">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <button type="button" onClick={() => markMistakeMastered(mistake.id)} className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-sm">
                      <CheckCircle2 size={16} /> Mastered
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400">No active mistakes yet. Missed questions will appear here automatically.</p>
            )}
          </div>
        </div>
        <aside className="space-y-4">
          <div className="glass rounded-lg p-5">
            <h2 className="font-display text-2xl font-bold">Most common clue tags</h2>
            <div className="mt-3 space-y-2">
              {topTags.slice(0, 8).map(([tag, count]) => (
                <div key={tag} className="flex items-center justify-between rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                  <span>{tag}</span>
                  <span className="text-slate-400">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-lg p-5">
            <h2 className="font-display text-2xl font-bold">Study these next</h2>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              {(topTags.length ? topTags : [["road-lines", 1], ["language", 1], ["duels", 1]]).slice(0, 4).map(([tag]) => (
                <div key={tag} className="rounded border border-white/10 bg-white/[0.04] p-3">
                  {tag} focused mini-test
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default ReviewMistakes;
