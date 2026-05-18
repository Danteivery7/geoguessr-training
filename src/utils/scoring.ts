import type { QuizAttempt, QuizResponse, RoadFinderChallenge } from "../types";
import { haversineDistanceKm } from "./mapDistance";

export const gradeForAccuracy = (accuracy: number): QuizAttempt["grade"] => {
  if (accuracy >= 100) return "Perfect";
  if (accuracy >= 85) return "Gold";
  if (accuracy >= 70) return "Silver";
  return "Bronze";
};

export const scoreQuizAttempt = (
  profileId: string,
  quizId: string,
  title: string,
  startedAt: string,
  responses: QuizResponse[]
): QuizAttempt => {
  const correct = responses.filter((response) => response.isCorrect).length;
  const maxScore = responses.reduce((total, response) => total + response.difficulty * 100, 0);
  const score = responses.reduce(
    (total, response) => total + (response.isCorrect ? response.difficulty * 100 : 0),
    0
  );
  const accuracy = responses.length ? Math.round((correct / responses.length) * 100) : 0;

  return {
    id: crypto.randomUUID(),
    profileId,
    quizId,
    title,
    startedAt,
    completedAt: new Date().toISOString(),
    score,
    maxScore,
    accuracy,
    grade: gradeForAccuracy(accuracy),
    responses,
  };
};

export const scoreMapChallenge = (
  challenge: RoadFinderChallenge,
  clicked: { lat: number; lng: number },
  secondsRemaining: number
) => {
  const distanceKm = haversineDistanceKm(clicked, challenge.target);
  const distanceRatio = Math.max(0, 1 - distanceKm / Math.max(challenge.radiusKm * 3, 1));
  const timeRatio = Math.max(0, secondsRemaining / challenge.timeLimitSeconds);
  const score = Math.round(800 * distanceRatio + 200 * timeRatio);

  return {
    distanceKm,
    score: Math.max(0, Math.min(1000, score)),
    accuracy: Math.round(Math.max(0, distanceRatio) * 100),
  };
};
