import { ArrowRight, Brain, Flame, Play, Target } from "lucide-react";
import type { ProgressState, UserProfile } from "../types";
import { badges } from "../data/badges";
import { questions } from "../data/questions";
import {
  calculateOverallCompletion,
  disciplineSummaries,
  masteryRank,
  strongestWeakestDisciplines,
} from "../utils/progressCalculations";
import { dailyMixedTest } from "../utils/questionGenerator";
import BadgeDisplay from "./BadgeDisplay";
import DisciplineCard from "./DisciplineCard";
import ProgressRing from "./ProgressRing";

type DashboardProps = {
  profile: UserProfile;
  progress: ProgressState;
  onStartQuiz: (title: string, selectedQuestions: typeof questions) => void;
  onNavigate: (route: string) => void;
};

const Dashboard = ({ profile, progress, onStartQuiz, onNavigate }: DashboardProps) => {
  const overall = calculateOverallCompletion(progress);
  const rank = masteryRank(overall);
  const summaries = disciplineSummaries(progress);
  const { strongest, weakest } = strongestWeakestDisciplines(progress);
  const recent = progress.attempts.slice(-4).reverse();
  const activeMistakes = progress.mistakes.filter((mistake) => !mistake.mastered);

  return (
    <div className="space-y-6">
      <section className="map-texture glass rounded-lg p-6 sm:p-8">
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-signal">Local save profile</div>
            <h1 className="mt-2 font-display text-5xl font-black leading-none sm:text-6xl">
              {profile.name}'s GeoMastery
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Standalone geography clue training with local progress, review loops, and no live game or account connection.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onStartQuiz("Daily Mixed Test", dailyMixedTest())}
                className="inline-flex items-center gap-2 rounded bg-signal px-4 py-3 font-bold text-night"
              >
                <Play size={18} /> Daily Mixed Test
              </button>
              <button
                type="button"
                onClick={() => onNavigate("country-duels")}
                className="inline-flex items-center gap-2 rounded border border-white/10 px-4 py-3 font-semibold text-slate-100"
              >
                <Target size={18} /> Country Duel
              </button>
              <button
                type="button"
                onClick={() => onNavigate("review")}
                className="inline-flex items-center gap-2 rounded border border-white/10 px-4 py-3 font-semibold text-slate-100"
              >
                <Brain size={18} /> Review Mistakes
              </button>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-night/70 p-5">
            <ProgressRing value={overall} size={150} stroke={12} label="overall" color="#35d39f" />
            <div className="mt-5">
              <div className="text-sm text-slate-400">Mastery rank</div>
              <div className="font-display text-4xl font-black">{rank}</div>
              <div className="mt-2 flex items-center gap-2 text-sm text-amber">
                <Flame size={16} /> {progress.streakDays || 0} day streak
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="glass rounded-lg p-5">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Recommended</div>
          <h2 className="mt-2 font-display text-2xl font-bold">Train {weakest?.title ?? "Road Systems"}</h2>
          <p className="mt-2 text-sm text-slate-400">Your weakest discipline feeds today's suggested path.</p>
          <button type="button" onClick={() => onNavigate("disciplines")} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-signal">
            Continue training <ArrowRight size={16} />
          </button>
        </div>
        <div className="glass rounded-lg p-5">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Strongest</div>
          <h2 className="mt-2 font-display text-2xl font-bold">{strongest?.title ?? "Not enough data"}</h2>
          <p className="mt-2 text-sm text-slate-400">{Math.round(strongest?.progress ?? 0)}% discipline completion.</p>
        </div>
        <div className="glass rounded-lg p-5">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Review queue</div>
          <h2 className="mt-2 font-display text-2xl font-bold">{activeMistakes.length} clues</h2>
          <p className="mt-2 text-sm text-slate-400">Recently failed clues are grouped by country, category, and tag.</p>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-3xl font-bold">Disciplines</h2>
          <button type="button" onClick={() => onNavigate("disciplines")} className="text-sm font-semibold text-signal">
            View all
          </button>
        </div>
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {summaries.map((discipline) => (
            <DisciplineCard key={discipline.id} discipline={discipline} onOpen={() => onNavigate("disciplines")} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_420px]">
        <div className="glass rounded-lg p-5">
          <h2 className="font-display text-3xl font-bold">Recent scores</h2>
          <div className="mt-4 space-y-3">
            {recent.length ? (
              recent.map((attempt) => (
                <div key={attempt.id} className="flex items-center justify-between rounded border border-white/10 bg-white/[0.04] p-3">
                  <div>
                    <div className="font-semibold">{attempt.title}</div>
                    <div className="text-xs text-slate-500">{new Date(attempt.completedAt).toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl font-bold">{attempt.accuracy}%</div>
                    <div className="text-xs text-slate-400">{attempt.grade}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400">No tests yet. Run a daily mixed test to light this up.</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="mb-3 font-display text-3xl font-bold">Badges</h2>
          <BadgeDisplay badges={badges.slice(0, 6)} earnedIds={progress.earnedBadges} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
