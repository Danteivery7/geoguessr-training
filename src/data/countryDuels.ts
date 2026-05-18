import type { CountryDuel, DuelClueCard } from "../types";
import { makePlaceholderSource } from "./sourceRegistry";

const requiredPairs: Array<[string, string]> = [
  ["Spain", "Portugal"],
  ["Turkey", "Greece"],
  ["Australia", "South Africa"],
  ["New Zealand", "Australia"],
  ["Colombia", "Ecuador"],
  ["Peru", "Bolivia"],
  ["Chile", "Argentina"],
  ["Brazil", "Portugal"],
  ["Mexico", "Colombia"],
  ["United States", "Canada"],
  ["Sweden", "Finland"],
  ["Norway", "Sweden"],
  ["Denmark", "Netherlands"],
  ["Czechia", "Slovakia"],
  ["Slovenia", "Croatia"],
  ["Serbia", "North Macedonia"],
  ["Romania", "Bulgaria"],
  ["Lithuania", "Latvia"],
  ["Estonia", "Finland"],
  ["Thailand", "Cambodia"],
  ["Indonesia", "Malaysia"],
  ["Japan", "South Korea"],
  ["Botswana", "South Africa"],
  ["Kenya", "Uganda"],
  ["Ghana", "Nigeria"],
];

const clueTemplates = [
  "road language and place-name pattern",
  "lane markings and shoulder treatment",
  "sign color and route-number style",
  "architecture and roadside shop design",
  "landscape, soil, and vegetation",
  "utility poles, bollards, and small infrastructure",
];

const makeClueCards = (a: string, b: string, duelId: string): DuelClueCard[] =>
  clueTemplates.map((template, index) => {
    const country = index % 2 === 0 ? a : b;
    const other = country === a ? b : a;

    return {
      id: `${duelId}-clue-${index + 1}`,
      title: `${country}: ${template}`,
      country,
      giveaway: `Compare ${template} against ${other}; confirm with at least one second clue before answering.`,
      commonMistake: `Guessing ${other} from shared regional scenery before checking text, road, and infrastructure details.`,
      imageSource: makePlaceholderSource(country, ["country-duel", template, duelId]),
      tags: ["duel", country.toLowerCase(), other.toLowerCase(), template],
    };
  });

export const countryDuels: CountryDuel[] = requiredPairs.map(([a, b], index) => {
  const duelId = `${a.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-vs-${b
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;

  return {
    id: duelId,
    title: `${a} vs ${b}`,
    countries: [a, b],
    description: `A focused head-to-head module for separating ${a} from ${b} with visual clue cards, quick drills, timed tests, and a boss round.`,
    clueCards: makeClueCards(a, b, duelId),
    quickQuizQuestionIds: [`road-${String((index % 30) + 1).padStart(3, "0")}`],
    timedTestQuestionIds: [
      `land-${String((index % 24) + 1).padStart(3, "0")}`,
      `arch-${String((index % 22) + 1).padStart(3, "0")}`,
    ],
    finalBossQuestionIds: [`boss-${String((index % 8) + 1).padStart(3, "0")}`],
    tags: ["duel", a.toLowerCase(), b.toLowerCase(), "close-answer"],
  };
});
