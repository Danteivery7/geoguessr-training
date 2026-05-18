import type { Question } from "../types";

const countryAnswers = new Set([
  "Argentina",
  "Australia",
  "Bolivia",
  "Botswana",
  "Brazil",
  "Cambodia",
  "Canada",
  "Chile",
  "Colombia",
  "Czechia",
  "Denmark",
  "Ecuador",
  "Estonia",
  "Finland",
  "France",
  "Ghana",
  "Greece",
  "Indonesia",
  "Israel",
  "Japan",
  "Kenya",
  "Latvia",
  "Lithuania",
  "Malaysia",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Peru",
  "Portugal",
  "Romania",
  "Serbia",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sweden",
  "Thailand",
  "Turkey",
  "Uganda",
  "United Kingdom",
  "United States",
]);

const languageSamples: Record<string, string> = {
  Czech: "P\u0159\u00ed\u0161t\u00ed v\u00fdjezd / n\u00e1m\u011bst\u00ed / \u0159eka",
  Finnish: "Keskusta / tie / j\u00e4rvi",
  Greek: "\u039f\u03b4\u03cc\u03c2 / \u039a\u03ad\u03bd\u03c4\u03c1\u03bf / \u03ad\u03be\u03bf\u03b4\u03bf\u03c2",
  "South Korea": "\uc11c\uc6b8 / \ub3c4\ub85c / \ucd9c\uad6c",
  Korean: "\uc11c\uc6b8 / \ub3c4\ub85c / \ucd9c\uad6c",
  Japan: "\u6771\u4eac / \u99c5\u524d / \u56fd\u9053",
  Japanese: "\u6771\u4eac / \u99c5\u524d / \u56fd\u9053",
  Portuguese: "Rua / Estrada / S\u00e3o",
  Czechia: "P\u0159\u00ed\u0161t\u00ed v\u00fdjezd / n\u00e1m\u011bst\u00ed / \u0159eka",
  Slovakia: "N\u00e1mestie / cesta / v\u00fdjazd",
  Thailand: "\u0e16\u0e19\u0e19 / \u0e40\u0e21\u0e37\u0e2d\u0e07 / \u0e17\u0e32\u0e07\u0e2d\u0e2d\u0e01",
  Thai: "\u0e16\u0e19\u0e19 / \u0e40\u0e21\u0e37\u0e2d\u0e07 / \u0e17\u0e32\u0e07\u0e2d\u0e2d\u0e01",
  Cambodia: "\u1795\u17d2\u179b\u17bc\u179c / \u1780\u17d2\u179a\u17bb\u1784 / \u1785\u17c1\u1789",
  Khmer: "\u1795\u17d2\u179b\u17bc\u179c / \u1780\u17d2\u179a\u17bb\u1784 / \u1785\u17c1\u1789",
  Finland: "Keskusta / tie / j\u00e4rvi",
  Slovak: "N\u00e1mestie / cesta / v\u00fdjazd",
  Dutch: "straat / weg / centrum",
  Turkish: "Cadde / \u00e7\u0131k\u0131\u015f / \u015fehir",
  Israel: "\u05e8\u05d7\u05d5\u05d1 / \u05d9\u05e6\u05d9\u05d0\u05d4 / \u05de\u05e8\u05db\u05d6",
};

const redactions: Array<[RegExp, string]> = [
  [/\bSpanish\b/gi, "Romance-language"],
  [/\bPortuguese\b/gi, "Romance-language"],
  [/\bFinnish\b/gi, "Nordic-looking"],
  [/\bSwedish\b/gi, "Nordic-looking"],
  [/\bNorwegian\b/gi, "Nordic-looking"],
  [/\bDanish\b/gi, "Nordic-looking"],
  [/\bJapanese\b/gi, "East Asian"],
  [/\bKorean\b/gi, "East Asian"],
  [/\bHangul\b/gi, "block-shaped script"],
  [/\bkana\b/gi, "mixed local script"],
  [/\bkanji\b/gi, "logographic characters"],
  [/\bThai\b/gi, "Southeast Asian"],
  [/\bKhmer\b/gi, "Southeast Asian"],
  [/\bGreek\b/gi, "non-Latin"],
  [/\bTurkish\b/gi, "Latin-script"],
  [/\bCzech\b/gi, "West Slavic"],
  [/\bSlovak\b/gi, "West Slavic"],
  [/\bSlovenian\b/gi, "South Slavic"],
  [/\bCroatian\b/gi, "South Slavic"],
  [/\bLithuanian\b/gi, "Baltic"],
  [/\bLatvian\b/gi, "Baltic"],
  [/\bEstonian\b/gi, "Finnic"],
  [/\bBrazilian\b/gi, "South American"],
  [/\bMexican\b/gi, "North American"],
];

const redactPrompt = (prompt: string) =>
  redactions.reduce((current, [pattern, replacement]) => current.replace(pattern, replacement), prompt);

const asksForCountry = (question: Question) =>
  question.answers.some((answer) => countryAnswers.has(answer.label)) || countryAnswers.has(question.correctAnswer);

export const getQuestionDisplayPrompt = (question: Question) => {
  if (question.type === "languageText" || question.type === "languageImage") {
    return asksForCountry(question)
      ? "Which country is this text or sign sample most likely from?"
      : "Which language is this text sample most likely in?";
  }

  if (question.type === "imageCountryGuess") {
    return "Which country is this scene most likely in?";
  }

  if (question.type === "multipleChoiceImage") {
    return asksForCountry(question)
      ? "Which country best matches this visual clue?"
      : "Which answer best matches this visual clue?";
  }

  if (question.type === "clueIdentification") {
    return "What is the strongest visible clue in this card?";
  }

  return redactPrompt(question.prompt);
};

export const getQuestionVisualTitle = (question: Question) => {
  if (question.type === "languageText" || question.type === "languageImage") {
    return languageSamples[question.correctAnswer] ?? "Road sign text sample";
  }

  if (question.type === "imageCountryGuess" || question.type === "multipleChoiceImage") {
    return asksForCountry(question) ? "Country clue image" : "Visual clue image";
  }

  if (question.type === "clueIdentification") {
    return "Find the giveaway";
  }

  return redactPrompt(question.prompt);
};

export const getTextSample = (question: Question) => {
  if (question.type !== "languageText") return null;
  return languageSamples[question.correctAnswer] ?? null;
};
