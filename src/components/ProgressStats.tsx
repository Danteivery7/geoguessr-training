import type { ProgressState } from "../types";
import { badges } from "../data/badges";
import {
  bestWorstClueTypes,
  bestWorstCountries,
  calculateOverallCompletion,
  categorySummaries,
  disciplineSummaries,
  masteryRank,
} from "../utils/progressCalculations";
import BadgeDisplay from "./BadgeDisplay";
import ProgressRing from "./ProgressRing";

type ProgressStatsProps = {
  progress: ProgressState;
};

const ProgressStats = ({ progress }: ProgressStatsProps) => {
  const overall = calculateOverallCompletion(progress);
  const disciplines = disciplineSummaries(progress);
  const categories = categorySummaries(progress).sort((a, b) => a.progress - b.progress).slice(0, 12);
  const countries = bestWorstCountries(progress);
  const clueTypes = bestWorstClueTypes(progress);

  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs uppercase tracking-[0.22em] text-signal">Profile analytics</div>
        <h1 className="font-display text-5xl font-black">Progress / Stats</h1>
      </div>
      <section className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <div className="glass rounded-lg p-5 text-center">
          <ProgressRing value={overall} size={170} stroke={14} label="overall" />
          <h2 className="mt-4 font-display text-4xl font-black">{masteryRank(overall)}</h2>
          <p className="text-sm text-slate-400">{progress.attempts.length} attempts / {progress.completedLessons.length} lessons learned</p>
        </div>
        <div className="glass rounded-lg p-5">
          <h2 className="font-display text-3xl font-bold">Discipline percentages</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {disciplines.map((discipline) => (
              <div key={discipline.id} className="rounded border border-white/10 bg-white/[0.04] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{discipline.title}</span>
                  <span>{discipline.progress}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10">
                  <div className="h-full rounded-full" style={{ width: `${discipline.progress}%`, backgroundColor: discipline.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="grid gap-4 xl:grid-cols-3">
        <div className="glass rounded-lg p-5">
          <h2 className="font-display text-2xl font-bold">Weak categories</h2>
          <div className="mt-3 space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex justify-between rounded border border-white/10 bg-white/[0.04] px-3 py-2 text-sm">
                <span>{category.title}</span>
                <span>{category.progress}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-lg p-5">
          <h2 className="font-display text-2xl font-bold">Best / worst countries</h2>
          <div className="mt-3 space-y-2 text-sm">
            {[...countries.best, ...countries.worst].map(([country, value]) => (
              <div key={`${country}-${value}`} className="flex justify-between rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                <span>{country}</span>
                <span>{value}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-lg p-5">
          <h2 className="font-display text-2xl font-bold">Best / worst clue types</h2>
          <div className="mt-3 space-y-2 text-sm">
            {[...clueTypes.best, ...clueTypes.worst].slice(0, 10).map((item) => (
              <div key={`${item.tag}-${item.accuracy}`} className="flex justify-between rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                <span>{item.tag}</span>
                <span>{item.accuracy}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <h2 className="mb-3 font-display text-3xl font-bold">Badges</h2>
        <BadgeDisplay badges={badges} earnedIds={progress.earnedBadges} />
      </section>
    </div>
  );
};

export default ProgressStats;
