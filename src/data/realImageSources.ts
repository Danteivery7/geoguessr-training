import type { ImageSource } from "../types";

type RealTrainingImage = ImageSource & {
  id: string;
  matchCountries: string[];
  matchTags: string[];
  priority: number;
};

export const realTrainingImages: RealTrainingImage[] = [
  {
    id: "interstate-95",
    sourceType: "wikimedia",
    sourceUrl: "/assets/training/commons/interstate-95.svg",
    referenceUrl: "https://commons.wikimedia.org/wiki/File:I-95.svg",
    attribution: "Wikimedia Commons: File:I-95.svg",
    license: "Public domain / license listed on Commons file page",
    country: "United States",
    clueTags: ["roads", "route-shields", "road-signs", "highway-signs", "map-finder"],
    matchCountries: ["United States"],
    matchTags: ["roads", "route", "shield", "highway", "interstate", "road-signs", "map-finder"],
    priority: 95,
    verificationStatus: "verified",
  },
  {
    id: "japanese-street-sign",
    sourceType: "wikimedia",
    sourceUrl: "/assets/training/commons/japanese-street-sign.jpg",
    referenceUrl:
      "https://commons.wikimedia.org/wiki/File:Buildings_with_colorful_neon_street_signs_at_blue_hour,_Shinjuku,_Tokyo.jpg",
    attribution: "Basile Morin / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    country: "Japan",
    clueTags: ["language", "japanese", "signs", "urban", "city-vibe", "architecture"],
    matchCountries: ["Japan"],
    matchTags: ["japan", "japanese", "language", "script", "urban", "city", "visual", "sign"],
    priority: 90,
    verificationStatus: "verified",
  },
  {
    id: "shinjuku-signs",
    sourceType: "wikimedia",
    sourceUrl: "/assets/training/wiki/shinjuku-signs.jpg",
    referenceUrl:
      "https://commons.wikimedia.org/wiki/File:Kabukicho_red_gate_and_colorful_neon_street_signs_at_night,_Shinjuku,_Tokyo,_Japan.jpg",
    attribution: "Wikimedia Commons: Kabukicho red gate and neon street signs",
    license: "Open license listed on Commons file page",
    country: "Japan",
    clueTags: ["language", "visual", "street-signs", "city-vibe", "urban"],
    matchCountries: ["Japan"],
    matchTags: ["language", "street", "sign", "visual", "city-vibe", "urban", "image"],
    priority: 80,
    verificationStatus: "verified",
  },
  {
    id: "greek-language",
    sourceType: "wikimedia",
    sourceUrl: "/assets/training/wiki/greek-language.png",
    referenceUrl: "https://commons.wikimedia.org/wiki/File:Proto_Greek_Area_reconstruction.png",
    attribution: "Wikimedia Commons: Proto Greek Area reconstruction",
    license: "Open license listed on Commons file page",
    country: "Greece",
    clueTags: ["language", "greek", "script", "europe"],
    matchCountries: ["Greece"],
    matchTags: ["greek", "greece", "language", "script", "european-language-comparison"],
    priority: 70,
    verificationStatus: "verified",
  },
  {
    id: "amsterdam-canal",
    sourceType: "wikimedia",
    sourceUrl: "/assets/training/wiki/amsterdam-canal.png",
    referenceUrl: "https://commons.wikimedia.org/wiki/File:Imagen_de_los_canales_concéntricos_en_Ámsterdam.png",
    attribution: "Wikimedia Commons: Amsterdam concentric canals image",
    license: "Open license listed on Commons file page",
    country: "Netherlands",
    clueTags: ["architecture", "urban", "netherlands", "city", "canals"],
    matchCountries: ["Netherlands"],
    matchTags: ["architecture", "urban", "city", "netherlands", "canal", "street"],
    priority: 65,
    verificationStatus: "verified",
  },
  {
    id: "andes",
    sourceType: "wikimedia",
    sourceUrl: "/assets/training/wiki/andes.jpg",
    referenceUrl: "https://commons.wikimedia.org/wiki/File:Panoramic_view_Andes-Chile.jpg",
    attribution: "Wikimedia Commons: Panoramic view Andes-Chile",
    license: "Open license listed on Commons file page",
    country: "Chile",
    clueTags: ["landscape", "andes", "mountains", "south-america", "nature"],
    matchCountries: ["Chile", "Argentina", "Peru", "Bolivia", "Ecuador", "Colombia"],
    matchTags: ["landscape", "nature", "mountain", "andes", "south-america", "soil", "trees"],
    priority: 60,
    verificationStatus: "verified",
  },
];

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const genericTags = new Set([
  "architecture",
  "city",
  "image",
  "language",
  "map",
  "nature",
  "road",
  "roads",
  "script",
  "sign",
  "signs",
  "street",
  "urban",
  "visual",
]);

export const resolveRealImageSource = (source: ImageSource | undefined, title = ""): ImageSource | undefined => {
  if (!source || source.sourceType !== "generatedPlaceholder") return source;

  const haystack = normalize(`${title} ${source.country} ${source.clueTags.join(" ")}`);
  const scored = realTrainingImages
    .map((image) => {
      const countryScore = image.matchCountries.some((country) => haystack.includes(normalize(country))) ? 100 : 0;
      const specificTagScore = image.matchTags.reduce((score, tag) => {
        const normalized = normalize(tag);
        if (genericTags.has(normalized)) return score;
        return score + (haystack.includes(normalized) ? 20 : 0);
      }, 0);
      const matched = countryScore > 0 || specificTagScore > 0;
      return { image, matched, score: countryScore + specificTagScore + image.priority };
    })
    .filter((item) => item.matched)
    .sort((a, b) => b.score - a.score);

  return scored[0]?.image ?? source;
};
