import { useMemo, useState } from "react";
import type { Question, QuizResponse } from "../types";
import { scoreQuizAttempt } from "../utils/scoring";
import { useProgress } from "./useProgress";

export const useQuiz = (profileId: string, quizId: string, title: string, questions: Question[]) => {
  const { recordQuizAttempt } = useProgress(profileId);
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [startedAt] = useState(() => new Date().toISOString());
  const [questionStartedAt, setQuestionStartedAt] = useState(() => Date.now());
  const [finishedAttemptId, setFinishedAttemptId] = useState<string | null>(null);

  const currentQuestion = questions[index];
  const isFinished = index >= questions.length || Boolean(finishedAttemptId);

  const answer = (selectedAnswer: string) => {
    if (!currentQuestion || responses.some((response) => response.questionId === currentQuestion.id)) return;
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const response: QuizResponse = {
      questionId: currentQuestion.id,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
      timeSpentSeconds: Math.max(1, Math.round((Date.now() - questionStartedAt) / 1000)),
      tags: currentQuestion.tags,
      country: currentQuestion.relatedCountries[0],
      categoryId: currentQuestion.categoryId,
      disciplineId: currentQuestion.disciplineId,
      difficulty: currentQuestion.difficulty,
    };
    setResponses((current) => [...current, response]);
  };

  const next = () => {
    if (index + 1 >= questions.length) {
      const attempt = scoreQuizAttempt(profileId, quizId, title, startedAt, responses);
      if (!finishedAttemptId) {
        recordQuizAttempt(attempt);
        setFinishedAttemptId(attempt.id);
      }
      setIndex(index + 1);
      return;
    }
    setIndex((current) => current + 1);
    setQuestionStartedAt(Date.now());
  };

  const reset = () => {
    setIndex(0);
    setResponses([]);
    setQuestionStartedAt(Date.now());
    setFinishedAttemptId(null);
  };

  const summary = useMemo(() => {
    const correct = responses.filter((response) => response.isCorrect).length;
    const accuracy = responses.length ? Math.round((correct / responses.length) * 100) : 0;
    return { correct, total: questions.length, accuracy };
  }, [questions.length, responses]);

  return {
    currentQuestion,
    index,
    responses,
    isFinished,
    summary,
    answer,
    next,
    reset,
  };
};
