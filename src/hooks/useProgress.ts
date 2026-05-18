import { useCallback } from "react";
import type { AppSettings, MistakeRecord, ProgressState, QuizAttempt } from "../types";
import { badges } from "../data/badges";
import { questions } from "../data/questions";
import { calculateOverallCompletion } from "../utils/progressCalculations";
import { useLocalStorage } from "./useLocalStorage";

export const createDefaultProgress = (profileId: string): ProgressState => ({
  profileId,
  completedLessons: [],
  reviewedLessons: [],
  attempts: [],
  mistakes: [],
  earnedBadges: [],
  unlockedModules: ["roads", "signs", "language", "country-duels", "map-finder"],
  categoryMastery: {},
  countryMastery: {},
  clueTypeAccuracy: {},
  streakDays: 0,
  timeSpentSeconds: 0,
  customQuestions: [],
  savedSettings: {
    closeAnswerMode: true,
    visualOnlyMode: false,
    reduceMotion: false,
    distanceUnit: "km",
  },
});

const unique = (items: string[]) => Array.from(new Set(items));

const updateMastery = (attempt: QuizAttempt, current: ProgressState) => {
  const categoryTotals: Record<string, { correct: number; total: number }> = {};
  const countryTotals: Record<string, { correct: number; total: number }> = {};
  const clueTypeAccuracy = { ...current.clueTypeAccuracy };

  [...current.attempts, attempt].forEach((savedAttempt) => {
    savedAttempt.responses.forEach((response) => {
      categoryTotals[response.categoryId] ??= { correct: 0, total: 0 };
      categoryTotals[response.categoryId].total += 1;
      categoryTotals[response.categoryId].correct += response.isCorrect ? 1 : 0;

      if (response.country) {
        countryTotals[response.country] ??= { correct: 0, total: 0 };
        countryTotals[response.country].total += 1;
        countryTotals[response.country].correct += response.isCorrect ? 1 : 0;
      }

      response.tags.forEach((tag) => {
        clueTypeAccuracy[tag] ??= { correct: 0, total: 0 };
        clueTypeAccuracy[tag].total += 1;
        clueTypeAccuracy[tag].correct += response.isCorrect ? 1 : 0;
      });
    });
  });

  return {
    categoryMastery: Object.fromEntries(
      Object.entries(categoryTotals).map(([categoryId, total]) => [
        categoryId,
        Math.round((total.correct / total.total) * 100),
      ])
    ),
    countryMastery: Object.fromEntries(
      Object.entries(countryTotals).map(([country, total]) => [country, Math.round((total.correct / total.total) * 100)])
    ),
    clueTypeAccuracy,
  };
};

const badgesForAttempt = (attempt: QuizAttempt, next: ProgressState) => {
  const earned = new Set(next.earnedBadges);
  if (attempt.accuracy === 100) earned.add("perfect-round");
  if (attempt.responses.some((response) => response.disciplineId === "roads" && response.isCorrect)) earned.add("road-rookie");
  if (attempt.responses.some((response) => response.disciplineId === "language") && attempt.accuracy >= 70) earned.add("language-hunter");
  if (attempt.responses.some((response) => response.disciplineId === "country-duels")) earned.add("country-duelist");
  if (attempt.responses.some((response) => response.tags.includes("bollards")) && attempt.accuracy >= 70) earned.add("bollard-brain");
  if (attempt.responses.some((response) => response.disciplineId === "signs") && attempt.grade !== "Bronze") earned.add("sign-spotter");
  if (next.mistakes.filter((mistake) => mistake.mastered).length >= 10) earned.add("review-grinder");
  if (calculateOverallCompletion(next) >= 80) earned.add("mastery-80");
  if (calculateOverallCompletion(next) >= 90) earned.add("mastery-90");

  return badges.filter((badge) => earned.has(badge.id)).map((badge) => badge.id);
};

export const useProgress = (profileId: string) => {
  const [progress, setProgress] = useLocalStorage<ProgressState>(
    `geomastery:progress:${profileId}`,
    createDefaultProgress(profileId)
  );

  const markLessonCompleted = useCallback(
    (lessonId: string) => {
      setProgress((current) => ({
        ...current,
        completedLessons: unique([...current.completedLessons, lessonId]),
      }));
    },
    [setProgress]
  );

  const addLessonToReview = useCallback(
    (lessonId: string) => {
      setProgress((current) => ({
        ...current,
        reviewedLessons: unique([...current.reviewedLessons, lessonId]),
      }));
    },
    [setProgress]
  );

  const recordQuizAttempt = useCallback(
    (attempt: QuizAttempt) => {
      setProgress((current) => {
        const missedQuestions: MistakeRecord[] = attempt.responses
          .filter((response) => !response.isCorrect)
          .map((response) => {
            const question = questions.find((item) => item.id === response.questionId);
            return {
              id: crypto.randomUUID(),
              questionId: response.questionId,
              prompt: question?.prompt ?? "Unknown prompt",
              correctAnswer: response.correctAnswer,
              selectedAnswer: response.selectedAnswer,
              country: response.country,
              categoryId: response.categoryId,
              disciplineId: response.disciplineId,
              difficulty: response.difficulty,
              tags: response.tags,
              missedAt: new Date().toISOString(),
            };
          });
        const mastery = updateMastery(attempt, current);
        const next: ProgressState = {
          ...current,
          attempts: [...current.attempts, attempt],
          mistakes: [...missedQuestions, ...current.mistakes].slice(0, 250),
          ...mastery,
          timeSpentSeconds:
            current.timeSpentSeconds +
            attempt.responses.reduce((total, response) => total + response.timeSpentSeconds, 0),
          lastTrainingDate: new Date().toISOString().slice(0, 10),
        };

        return {
          ...next,
          earnedBadges: unique(badgesForAttempt(attempt, next)),
        };
      });
    },
    [setProgress]
  );

  const markMistakeMastered = useCallback(
    (mistakeId: string) => {
      setProgress((current) => ({
        ...current,
        mistakes: current.mistakes.map((mistake) =>
          mistake.id === mistakeId ? { ...mistake, mastered: true } : mistake
        ),
      }));
    },
    [setProgress]
  );

  const updateSettings = useCallback(
    (settings: Partial<AppSettings>) => {
      setProgress((current) => ({
        ...current,
        savedSettings: { ...current.savedSettings, ...settings },
      }));
    },
    [setProgress]
  );

  const importProgress = useCallback(
    (raw: string) => {
      const parsed = JSON.parse(raw) as ProgressState;
      setProgress({ ...parsed, profileId });
    },
    [profileId, setProgress]
  );

  const addCustomQuestion = useCallback(
    (question: ProgressState["customQuestions"][number]) => {
      setProgress((current) => ({
        ...current,
        customQuestions: [question, ...current.customQuestions],
      }));
    },
    [setProgress]
  );

  return {
    progress,
    setProgress,
    markLessonCompleted,
    addLessonToReview,
    recordQuizAttempt,
    markMistakeMastered,
    updateSettings,
    importProgress,
    addCustomQuestion,
  };
};
