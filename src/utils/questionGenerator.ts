import type { Question } from "../types";
import { questions } from "../data/questions";

export type TestFilters = {
  disciplineId?: string;
  categoryId?: string;
  countries?: string[];
  difficulty?: number;
  count: number;
  visualOnly?: boolean;
  closeCountryMode?: boolean;
  mistakeQuestionIds?: string[];
};

export const shuffle = <T,>(items: T[]) => {
  const clone = [...items];
  for (let index = clone.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[target]] = [clone[target], clone[index]];
  }
  return clone;
};

export const withShuffledAnswers = (question: Question): Question => ({
  ...question,
  answers: shuffle(question.answers),
});

export const getQuestionsByFilters = (filters: TestFilters, pool: Question[] = questions) => {
  const filtered = pool.filter((question) => {
    if (filters.disciplineId && question.disciplineId !== filters.disciplineId) return false;
    if (filters.categoryId && question.categoryId !== filters.categoryId) return false;
    if (filters.difficulty && question.difficulty !== filters.difficulty) return false;
    if (filters.visualOnly && !question.imageSource) return false;
    if (filters.countries?.length) {
      const countries = [question.correctAnswer, ...question.relatedCountries].map((item) => item.toLowerCase());
      if (!filters.countries.some((country) => countries.includes(country.toLowerCase()))) return false;
    }
    if (filters.mistakeQuestionIds?.length && !filters.mistakeQuestionIds.includes(question.id)) return false;
    return true;
  });

  const source = filtered.length ? filtered : pool;
  const closeModePool = filters.closeCountryMode
    ? source.filter((question) => question.answers.some((answer) => answer.isClose))
    : source;

  return shuffle(closeModePool.length ? closeModePool : source)
    .slice(0, filters.count)
    .map(withShuffledAnswers);
};

export const dailyMixedTest = () =>
  getQuestionsByFilters({
    count: 10,
    closeCountryMode: true,
  });

export const bossTest = () =>
  getQuestionsByFilters({
    count: 8,
    visualOnly: true,
  }).filter((question) => question.type === "finalBoss" || question.tags.includes("boss"));
