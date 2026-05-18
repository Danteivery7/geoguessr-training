export type SourceType =
  | "local"
  | "wikimedia"
  | "mapillary"
  | "googleStreetView"
  | "generatedPlaceholder";

export type VerificationStatus = "verified" | "starter" | "verify-before-publishing";

export interface ImageSource {
  sourceType: SourceType;
  attribution: string;
  license: string;
  sourceUrl?: string;
  referenceUrl?: string;
  apiReference?: string;
  country: string;
  clueTags: string[];
  verificationStatus?: VerificationStatus;
}

export interface Country {
  id: string;
  name: string;
  flag: string;
  region: string;
  drivingSide: "left" | "right" | "varies";
  domain: string;
  phoneCode: string;
  roadClues: string[];
  languageClues: string[];
  signClues: string[];
  landscapeNotes: string[];
  architectureNotes: string[];
  confusableCountries: string[];
  commonClueTypes: string[];
}

export interface Category {
  id: string;
  disciplineId: string;
  title: string;
  description: string;
  tags: string[];
}

export interface Discipline {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  categories: string[];
  tags: string[];
  unlockRequirement?: number;
}

export interface Lesson {
  id: string;
  disciplineId: string;
  categoryId: string;
  title: string;
  summary: string;
  imageSource: ImageSource;
  lookFor: string[];
  commonConfusion: string;
  relatedCountries: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  verificationStatus?: VerificationStatus;
}

export type QuestionType =
  | "multipleChoiceText"
  | "multipleChoiceImage"
  | "imageCountryGuess"
  | "clueIdentification"
  | "trueFalse"
  | "mapClick"
  | "timedMapFind"
  | "countryDuel"
  | "languageText"
  | "languageImage"
  | "sequenceOrdering"
  | "flashcard"
  | "finalBoss";

export interface AnswerChoice {
  id: string;
  label: string;
  country?: string;
  isClose?: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  disciplineId: string;
  categoryId: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  prompt: string;
  image?: string;
  imageSource?: ImageSource;
  answers: AnswerChoice[];
  correctAnswer: string;
  explanation: string;
  giveaway: string;
  commonMistake: string;
  relatedCountries: string[];
  tags: string[];
  timeLimitSeconds?: number;
  points: number;
  verificationStatus?: VerificationStatus;
}

export interface QuizResponse {
  questionId: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeSpentSeconds: number;
  tags: string[];
  country?: string;
  categoryId: string;
  disciplineId: string;
  difficulty: number;
}

export interface QuizAttempt {
  id: string;
  profileId: string;
  quizId: string;
  title: string;
  startedAt: string;
  completedAt: string;
  score: number;
  maxScore: number;
  accuracy: number;
  grade: "Bronze" | "Silver" | "Gold" | "Perfect";
  responses: QuizResponse[];
}

export interface MistakeRecord {
  id: string;
  questionId: string;
  prompt: string;
  correctAnswer: string;
  selectedAnswer: string;
  country?: string;
  categoryId: string;
  disciplineId: string;
  difficulty: number;
  tags: string[];
  missedAt: string;
  mastered?: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
}

export interface RoadFinderChallenge {
  id: string;
  title: string;
  prompt: string;
  country: string;
  target: { lat: number; lng: number };
  radiusKm: number;
  timeLimitSeconds: number;
  explanation: string;
  tags: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
}

export interface DuelClueCard {
  id: string;
  title: string;
  country: string;
  giveaway: string;
  commonMistake: string;
  imageSource: ImageSource;
  tags: string[];
}

export interface CountryDuel {
  id: string;
  title: string;
  countries: [string, string];
  description: string;
  clueCards: DuelClueCard[];
  quickQuizQuestionIds: string[];
  timedTestQuestionIds: string[];
  finalBossQuestionIds: string[];
  tags: string[];
}

export interface AssetRecord {
  id: string;
  profileId: string;
  title: string;
  country: string;
  region?: string;
  category: string;
  tags: string[];
  sourceType: SourceType;
  attribution: string;
  license: string;
  sourceUrl?: string;
  referenceUrl?: string;
  apiReference?: string;
  clueExplanation: string;
  correctAnswer: string;
  closeWrongAnswers: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
  blobKey?: string;
}

export interface AppSettings {
  closeAnswerMode: boolean;
  visualOnlyMode: boolean;
  reduceMotion: boolean;
  distanceUnit: "km" | "mi";
}

export interface ProgressState {
  profileId: string;
  completedLessons: string[];
  reviewedLessons: string[];
  attempts: QuizAttempt[];
  mistakes: MistakeRecord[];
  earnedBadges: string[];
  unlockedModules: string[];
  categoryMastery: Record<string, number>;
  countryMastery: Record<string, number>;
  clueTypeAccuracy: Record<string, { correct: number; total: number }>;
  streakDays: number;
  lastTrainingDate?: string;
  timeSpentSeconds: number;
  customQuestions: Question[];
  savedSettings: AppSettings;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  skillLevel: "Rookie" | "Explorer" | "Analyst" | "Specialist" | "Pro";
  createdAt: string;
  updatedAt: string;
}
