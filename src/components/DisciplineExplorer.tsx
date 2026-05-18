import { useMemo, useState } from "react";
import { ListChecks, Play, Target } from "lucide-react";
import type { Lesson, ProgressState } from "../types";
import { categories } from "../data/categories";
import { disciplines } from "../data/disciplines";
import { lessons } from "../data/lessons";
import { questions } from "../data/questions";
import { disciplineSummaries } from "../utils/progressCalculations";
import { getQuestionsByFilters } from "../utils/questionGenerator";
import DisciplineCard from "./DisciplineCard";
import LessonCard from "./LessonCard";

type DisciplineExplorerProps = {
  profileId: string;
  progress: ProgressState;
  markLessonCompleted: (lessonId: string) => void;
  addLessonToReview: (lessonId: string) => void;
  onStartQuiz: (title: string, selectedQuestions: typeof questions) => void;
};

const DisciplineExplorer = ({
  progress,
  markLessonCompleted,
  addLessonToReview,
  onStartQuiz,
}: DisciplineExplorerProps) => {
  const summaries = disciplineSummaries(progress);
  const [selectedDisciplineId, setSelectedDisciplineId] = useState(disciplines[0].id);
  const selected = summaries.find((discipline) => discipline.id === selectedDisciplineId) ?? summaries[0];
  const disciplineCategories = categories.filter((category) => category.disciplineId === selected.id);
  const disciplineLessons = lessons.filter((lesson) => lesson.disciplineId === selected.id);
  const recommendedPath = useMemo(() => {
    const weakTags = progress.mistakes
      .filter((mistake) => !mistake.mastered)
      .flatMap((mistake) => mistake.tags)
      .slice(0, 4);
    return [
      `${selected.title} foundation lesson`,
      weakTags.length ? `${weakTags[0]} mini-test` : `${disciplineCategories[0]?.title ?? "Category"} mini-test`,
      "Close-answer review drill",
      "20-question mixed exam",
    ];
  }, [disciplineCategories, progress.mistakes, selected.title]);

  const startLessonTest = (lesson: Lesson) => {
    onStartQuiz(
      `${lesson.title} Test`,
      getQuestionsByFilters({ disciplineId: lesson.disciplineId, categoryId: lesson.categoryId, count: 6, closeCountryMode: true })
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs uppercase tracking-[0.22em] text-signal">Progression hub</div>
        <h1 className="font-display text-5xl font-black">Disciplines</h1>
      </div>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {summaries.map((discipline) => (
          <DisciplineCard
            key={discipline.id}
            discipline={discipline}
            selected={discipline.id === selected.id}
            onOpen={() => setSelectedDisciplineId(discipline.id)}
          />
        ))}
      </div>
      <section className="glass rounded-lg p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-signal">Selected discipline</div>
            <h2 className="font-display text-4xl font-black">{selected.title}</h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-400">
              These lessons, category drills, and discipline tests are the exact things that move this discipline's progress.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              onStartQuiz(
                `${selected.title} Discipline Test`,
                getQuestionsByFilters({ disciplineId: selected.id, count: 10, closeCountryMode: true })
              )
            }
            className="inline-flex items-center gap-2 rounded bg-signal px-4 py-3 font-bold text-night"
          >
            <Play size={16} /> Start discipline test
          </button>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {disciplineCategories.map((category) => {
            const lessonCount = disciplineLessons.filter((lesson) => lesson.categoryId === category.id).length;
            const questionCount = questions.filter((question) => question.categoryId === category.id).length;
            return (
              <article key={category.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded bg-white/10 p-2 text-signal">
                    <ListChecks size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{category.title}</h3>
                    <p className="mt-1 text-xs text-slate-400">
                      {lessonCount} lessons / {questionCount || "starter"} questions
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onStartQuiz(
                      `${category.title} Drill`,
                      getQuestionsByFilters({ disciplineId: selected.id, categoryId: category.id, count: 8, closeCountryMode: true })
                    )
                  }
                  className="mt-4 inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-sm font-semibold text-slate-100"
                >
                  <Target size={15} /> Start category drill
                </button>
              </article>
            );
          })}
        </div>
      </section>
      <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-3xl font-bold">{selected.title} Lessons</h2>
            <button
              type="button"
              onClick={() =>
                onStartQuiz(
                  `${selected.title} Discipline Test`,
                  getQuestionsByFilters({ disciplineId: selected.id, count: 10, closeCountryMode: true })
                )
              }
              className="rounded bg-signal px-3 py-2 text-sm font-bold text-night"
            >
              Start discipline test
            </button>
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            {disciplineLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                completed={progress.completedLessons.includes(lesson.id)}
                reviewed={progress.reviewedLessons.includes(lesson.id)}
                onComplete={markLessonCompleted}
                onReview={addLessonToReview}
                onTest={startLessonTest}
              />
            ))}
          </div>
        </div>
        <aside className="glass h-fit rounded-lg p-5">
          <h2 className="font-display text-2xl font-bold">Generated path</h2>
          <p className="mt-2 text-sm text-slate-400">Built from your current weak categories and the selected discipline.</p>
          <ol className="mt-4 space-y-3">
            {recommendedPath.map((step, index) => (
              <li key={step} className="flex gap-3 rounded border border-white/10 bg-white/[0.04] p-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-signal/20 text-sm font-bold text-signal">
                  {index + 1}
                </span>
                <span className="text-sm text-slate-200">{step}</span>
              </li>
            ))}
          </ol>
        </aside>
      </section>
    </div>
  );
};

export default DisciplineExplorer;
