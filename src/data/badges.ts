import type { Badge } from "../types";

export const badges: Badge[] = [
  { id: "road-rookie", title: "Road Rookie", description: "Finish a road systems lesson.", icon: "Route", condition: "complete-road-lesson" },
  { id: "sign-spotter", title: "Sign Spotter", description: "Score at least Silver on a signs quiz.", icon: "Signpost", condition: "silver-signs" },
  { id: "bollard-brain", title: "Bollard Brain", description: "Answer three bollard questions correctly.", icon: "Landmark", condition: "bollard-streak" },
  { id: "language-hunter", title: "Language Hunter", description: "Pass a language lab drill.", icon: "Languages", condition: "pass-language" },
  { id: "pole-detective", title: "Pole Detective", description: "Master an infrastructure clue.", icon: "UtilityPole", condition: "infrastructure-mastered" },
  { id: "country-duelist", title: "Country Duelist", description: "Complete any country duel.", icon: "Swords", condition: "complete-duel" },
  { id: "map-finder", title: "Map Finder", description: "Score on a map finder challenge.", icon: "Map", condition: "map-score" },
  { id: "mastery-80", title: "80% Mastery", description: "Reach 80% overall mastery.", icon: "Medal", condition: "overall-80" },
  { id: "mastery-90", title: "90% Mastery", description: "Reach 90% overall mastery.", icon: "BadgeCheck", condition: "overall-90" },
  { id: "perfect-round", title: "Perfect Round", description: "Finish a quiz with 100% accuracy.", icon: "Sparkles", condition: "perfect-quiz" },
  { id: "comeback-learner", title: "Comeback Learner", description: "Retest a previously missed clue correctly.", icon: "RotateCcw", condition: "recover-mistake" },
  { id: "review-grinder", title: "Review Grinder", description: "Mark ten mistakes as mastered.", icon: "Repeat", condition: "review-10" },
];
