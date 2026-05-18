import type { ProgressState, QuizAttempt } from "../types";
import { categories } from "../data/categories";
import { countryDuels } from "../data/countryDuels";
import { disciplines } from "../data/disciplines";
import { lessons } from "../data/lessons";
import { questions } from "../data/questions";

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

const averageAccuracy = (attempts: QuizAttempt[]) => {
  if (!attempts.length) return 0;
  return attempts.reduce((total, attempt) => total + attempt.accuracy, 0) / attempts.length;
};

const reviewCleanup = (progress: ProgressState) => {
  if (!progress.mistakes.length) return 100;
  const mastered = progress.mistakes.filter((mistake) => mistake.mastered).length;
  return (mastered / progress.mistakes.length) * 100;
};

export const calculateOverallCompletion = (progress: ProgressState) => {
  const lessonCompletion = (progress.completedLessons.length / lessons.length) * 100;
  const uniqueQuizCompletion =
    (new Set(progress.attempts.map((attempt) => attempt.quizId)).size /
      Math.max(questions.length + countryDuels.length, 1)) *
    100;
  const mastery = averageAccuracy(progress.attempts);
  const review = reviewCleanup(progress);

  return clamp(lessonCompletion * 0.35 + uniqueQuizCompletion * 0.35 + mastery * 0.2 + review * 0.1);
};

export const calculateDisciplineCompletion = (progress: ProgressState, disciplineId: string) => {
  const disciplineLessons = lessons.filter((lesson) => lesson.disciplineId === disciplineId);
  const disciplineAttempts = progress.attempts.filter((attempt) =>
    attempt.responses.some((response) => response.disciplineId === disciplineId)
  );
  const disciplineQuestions = questions.filter((question) => question.disciplineId === disciplineId);
  const completedLessons = disciplineLessons.filter((lesson) => progress.completedLessons.includes(lesson.id));
  const lessonCompletion = disciplineLessons.length ? (completedLessons.length / disciplineLessons.length) * 100 : 0;
  const quizCompletion =
    disciplineQuestions.length && disciplineAttempts.length
      ? (new Set(disciplineAttempts.map((attempt) => attempt.quizId)).size / disciplineQuestions.length) * 100
      : 0;
  const mastery = averageAccuracy(disciplineAttempts);
  const disciplineMistakes = progress.mistakes.filter((mistake) => mistake.disciplineId === disciplineId);
  const review = disciplineMistakes.length
    ? (disciplineMistakes.filter((mistake) => mistake.mastered).length / disciplineMistakes.length) * 100
    : 100;

  return clamp(lessonCompletion * 0.35 + quizCompletion * 0.35 + mastery * 0.2 + review * 0.1);
};

export const calculateCategoryCompletion = (progress: ProgressState, categoryId: string) => {
  const categoryLessons = lessons.filter((lesson) => lesson.categoryId === categoryId);
  const categoryAttempts = progress.attempts.filter((attempt) =>
    attempt.responses.some((response) => response.categoryId === categoryId)
  );
  const lessonCompletion = categoryLessons.length
    ? (categoryLessons.filter((lesson) => progress.completedLessons.includes(lesson.id)).length / categoryLessons.length) * 100
    : 0;
  const mastery = averageAccuracy(categoryAttempts);
  return clamp(lessonCompletion * 0.45 + mastery * 0.45 + (progress.categoryMastery[categoryId] ?? 0) * 0.1);
};

export const masteryRank = (completion: number) => {
  if (completion >= 90) return "World Class";
  if (completion >= 75) return "Pro";
  if (completion >= 60) return "Specialist";
  if (completion >= 40) return "Analyst";
  if (completion >= 20) return "Explorer";
  return "Rookie";
};

export const disciplineSummaries = (progress: ProgressState) =>
  disciplines.map((discipline) => ({
    ...discipline,
    progress: calculateDisciplineCompletion(progress, discipline.id),
  }));

export const categorySummaries = (progress: ProgressState) =>
  categories.map((category) => ({
    ...category,
    progress: calculateCategoryCompletion(progress, category.id),
  }));

export const strongestWeakestDisciplines = (progress: ProgressState) => {
  const summaries = disciplineSummaries(progress).sort((a, b) => b.progress - a.progress);

  return {
    strongest: summaries[0],
    weakest: summaries[summaries.length - 1],
  };
};

export const bestWorstCountries = (progress: ProgressState) => {
  const entries = Object.entries(progress.countryMastery).sort((a, b) => b[1] - a[1]);

  return {
    best: entries.slice(0, 3),
    worst: entries.slice(-3).reverse(),
  };
};

export const bestWorstClueTypes = (progress: ProgressState) => {
  const entries = Object.entries(progress.clueTypeAccuracy)
    .map(([tag, value]) => ({
      tag,
      accuracy: value.total ? Math.round((value.correct / value.total) * 100) : 0,
      total: value.total,
    }))
    .filter((entry) => entry.total > 0)
    .sort((a, b) => b.accuracy - a.accuracy);

  return {
    best: entries.slice(0, 5),
    worst: entries.slice(-5).reverse(),
  };
};
