import type { Lesson } from "../types";
import { categories } from "./categories";
import { disciplines } from "./disciplines";
import { makePlaceholderSource } from "./sourceRegistry";

const focusByDiscipline: Record<string, string[]> = {
  roads: ["paint rhythm", "lane edge", "shield shape", "surface quality", "roadside spacing"],
  "area-codes": ["country code prefix", "shared +1 traps", "regional number clusters", "country-page confirmation", "close-answer recall"],
  signs: ["shape", "color system", "post style", "reflector placement", "local wording"],
  language: ["script family", "diacritics", "word endings", "domain clues", "close-language traps"],
  vehicles: ["drive side", "plates", "coverage texture", "car/camera clues", "traffic mix"],
  nature: ["vegetation", "soil", "terrain", "weather light", "regional climate"],
  architecture: ["roofline", "wall material", "fences", "street furniture", "shopfront design"],
  "country-duels": ["giveaway clue", "tempting overlap", "road language", "landscape difference", "sign style"],
  "map-finder": ["route spine", "city anchor", "corridor direction", "road class", "regional context"],
  visual: ["first glance", "small clue", "background context", "sign/text crop", "landscape geometry"],
  exams: ["mixed clue scan", "speed", "confidence", "close answers", "review trigger"],
};

const relatedByDiscipline: Record<string, string[]> = {
  roads: ["United States", "Canada", "Australia", "South Africa"],
  "area-codes": ["Spain", "Portugal", "Brazil", "South Korea"],
  signs: ["Czechia", "Slovakia", "France", "Germany"],
  language: ["Czechia", "Slovakia", "Slovenia", "Croatia"],
  vehicles: ["Japan", "South Korea", "Kenya", "Ghana"],
  nature: ["Chile", "Argentina", "Bolivia", "Peru"],
  architecture: ["Portugal", "Spain", "Netherlands", "Denmark"],
  "country-duels": ["Spain", "Portugal", "Australia", "South Africa"],
  "map-finder": ["United States", "United Kingdom", "Iceland", "South Africa"],
  visual: ["Japan", "South Korea", "Brazil", "Mexico"],
  exams: ["Global", "Europe", "South America", "Asia"],
};

export const lessons: Lesson[] = disciplines.flatMap((discipline) =>
  categories
    .filter((category) => category.disciplineId === discipline.id)
    .slice(0, 8)
    .map((category, index) => ({
      id: `${discipline.id}-lesson-${index + 1}`,
      disciplineId: discipline.id,
      categoryId: category.id,
      title: `${category.title} Drill`,
      summary: `A visual-first starter lesson for recognizing ${category.title.toLowerCase()} without relying on live round data.`,
      imageSource: makePlaceholderSource("Global", [discipline.id, category.id, "lesson-card"]),
      lookFor: (focusByDiscipline[discipline.id] ?? ["shape", "text", "context", "surface", "scale"]).map(
        (item) => `${item} that stays consistent across multiple examples`
      ),
      commonConfusion: `Do not decide from one clue alone; compare ${category.title.toLowerCase()} with language, road, and landscape context.`,
      relatedCountries: relatedByDiscipline[discipline.id] ?? ["Global"],
      difficulty: ((index % 5) + 1) as Lesson["difficulty"],
      tags: [discipline.id, category.id, category.title.toLowerCase()],
      verificationStatus: "starter",
    }))
);
