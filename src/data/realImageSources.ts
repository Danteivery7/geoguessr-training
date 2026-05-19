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
    id: "finland-road-sign-612",
    sourceType: "wikimedia",
    sourceUrl: "/assets/training/commons/finland-road-sign-612.svg",
    referenceUrl: "https://commons.wikimedia.org/wiki/File:Finland_road_sign_612.svg",
    attribution: "Finnish Road Administration / Wikimedia Commons",
    license: "Public domain / license listed on Commons file page",
    country: "Finland",
    clueTags: ["language", "finnish", "road-signs", "direction-signs", "nordic"],
    matchCountries: ["Finland"],
    matchTags: ["finnish", "finland", "nordic", "double-vowels", "direction-signs"],
    priority: 93,
    verificationStatus: "verified",
  },
  {
    id: "thai-road-sign-t71",
    sourceType: "wikimedia",
    sourceUrl: "/assets/training/commons/thai-road-sign-t71.png",
    referenceUrl: "https://commons.wikimedia.org/wiki/File:Thai_road_sign_T71.png",
    attribution: "So Monggo / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    country: "Thailand",
    clueTags: ["language", "thai", "road-signs", "warning-signs", "southeast-asia"],
    matchCountries: ["Thailand"],
    matchTags: ["thai", "thailand", "southeast-asia", "road-signs", "warning-signs"],
    priority: 92,
    verificationStatus: "verified",
  },
  {
    id: "thai-road-sign-b31",
    sourceType: "wikimedia",
    sourceUrl: "/assets/training/commons/thai-road-sign-b31.png",
    referenceUrl: "https://commons.wikimedia.org/wiki/File:Thai_road_sign_B-31.png",
    attribution: "So Monggo / Wikimedia Commons",
    license: "CC BY-SA 4.0",
    country: "Thailand",
    clueTags: ["language", "thai", "road-signs", "border-signs", "southeast-asia"],
    matchCountries: ["Thailand"],
    matchTags: ["thai", "thailand", "southeast-asia", "border-signs"],
    priority: 88,
    verificationStatus: "verified",
  },
  {
    id: "thailand-road-sign-b31",
    sourceType: "wikimedia",
    sourceUrl: "/assets/training/commons/thailand-road-sign-b31.svg",
    referenceUrl: "https://commons.wikimedia.org/wiki/File:Thailand_road_sign_%E0%B8%9A-31.svg",
    attribution: "Thailand Ministry of Transport / Wikimedia Commons",
    license: "Public domain / license listed on Commons file page",
    country: "Thailand",
    clueTags: ["language", "thai", "road-signs", "regulatory-signs", "southeast-asia"],
    matchCountries: ["Thailand"],
    matchTags: ["thai", "thailand", "southeast-asia", "regulatory-signs"],
    priority: 86,
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
    country: "Historic Greece",
    clueTags: ["map", "historic", "greece"],
    matchCountries: [],
    matchTags: ["proto-greek-area-map"],
    priority: 5,
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

const escapeSvgText = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const svgDataUri = (svg: string) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

const clueKindFor = (source: ImageSource, title: string) => {
  const haystack = normalize(`${title} ${source.clueTags.join(" ")}`);
  if (haystack.includes("language") || haystack.includes("script") || haystack.includes("domain")) return "language";
  if (haystack.includes("landscape") || haystack.includes("nature") || haystack.includes("soil") || haystack.includes("trees")) return "landscape";
  if (haystack.includes("architecture") || haystack.includes("urban") || haystack.includes("city")) return "architecture";
  if (haystack.includes("road") || haystack.includes("route") || haystack.includes("sign") || haystack.includes("infrastructure")) return "road";
  if (haystack.includes("duel") || haystack.includes("boss")) return "duel";
  return "visual";
};

const makeStaticClueImage = (source: ImageSource, title: string): ImageSource => {
  const sample = title || "Text sample";
  const kind = clueKindFor(source, title);
  const heading = `${kind.toUpperCase()} CLUE`;
  const reminder =
    kind === "language"
      ? "Read the script, letters, and endings. Do not use country labels."
      : "Study the clue family shown here. Replace with a licensed exact photo when added.";
  const tags = source.clueTags.slice(0, 4);
  const tagPills = tags
    .map(
      (tag, index) =>
        `<text x="${74 + index * 170}" y="310" fill="#cbd5e1" font-size="18" font-family="Arial, sans-serif">${escapeSvgText(tag)}</text>`
    )
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#07141f"/>
      <stop offset="0.52" stop-color="#102c3c"/>
      <stop offset="1" stop-color="#162033"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#000000" flood-opacity="0.42"/>
    </filter>
  </defs>
  <rect width="1200" height="720" fill="url(#bg)"/>
  <path d="M0 520 C210 440 310 595 510 515 C715 430 845 500 1200 390 L1200 720 L0 720 Z" fill="#122f28" opacity="0.86"/>
  <path d="M0 610 C250 520 435 650 690 555 C880 485 1020 530 1200 470 L1200 720 L0 720 Z" fill="#27321f" opacity="0.9"/>
  <rect x="88" y="126" width="1024" height="286" rx="26" fill="#f8fafc" filter="url(#shadow)"/>
  <rect x="116" y="154" width="968" height="230" rx="18" fill="#101827"/>
  <text x="160" y="218" fill="#94a3b8" font-size="24" font-family="Arial, sans-serif" letter-spacing="4">${escapeSvgText(heading)}</text>
  <text x="160" y="314" fill="#ffffff" font-size="56" font-weight="800" font-family="Arial, 'Noto Sans', sans-serif">${escapeSvgText(sample)}</text>
  <rect x="116" y="436" width="968" height="88" rx="18" fill="#0b1220" opacity="0.88"/>
  <text x="160" y="488" fill="#38d9a9" font-size="28" font-weight="700" font-family="Arial, sans-serif">${escapeSvgText(reminder)}</text>
  ${tagPills}
</svg>`;

  return {
    sourceType: "local",
    sourceUrl: svgDataUri(svg),
    referenceUrl: undefined,
    attribution: "GeoMastery generated local clue image",
    license: "Generated static SVG; replace with user-owned or openly licensed photo if desired",
    country: source.country,
    clueTags: source.clueTags,
    verificationStatus: "starter",
  };
};

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

  if (scored[0]) return scored[0].image;

  return makeStaticClueImage(source, title);
};
