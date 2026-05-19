import type { ImageSource } from "../types";

type RealTrainingImage = ImageSource & {
  id: string;
  matchCountries: string[];
  matchTags: string[];
  priority: number;
};

const makeUnsplashImage = ({
  id,
  file,
  photoId,
  title,
  country,
  tags,
  matchTags,
  priority,
}: {
  id: string;
  file: string;
  photoId: string;
  title: string;
  country: string;
  tags: string[];
  matchTags: string[];
  priority: number;
}): RealTrainingImage => ({
  id,
  sourceType: "local",
  sourceUrl: `/assets/training/unsplash/${file}`,
  referenceUrl: `https://unsplash.com/photos/${photoId}`,
  attribution: `${title} / Unsplash`,
  license: "Unsplash License",
  country,
  clueTags: tags,
  matchCountries: [country],
  matchTags,
  priority,
  verificationStatus: "verified",
});

const unsplashTrainingImages: RealTrainingImage[] = [
  makeUnsplashImage({
    id: "unsplash-japan-shinjuku-street-signs",
    file: "japan-shinjuku-street-signs.jpg",
    photoId: "TLe-L256Psw",
    title: "Shinjuku street signs",
    country: "Japan",
    tags: ["japanese", "language", "street-signs", "urban", "city-vibe"],
    matchTags: ["japan", "japanese", "shinjuku", "kana", "kanji", "city-vibe"],
    priority: 94,
  }),
  makeUnsplashImage({
    id: "unsplash-spain-rural-road-sign",
    file: "spain-rural-road-sign.jpg",
    photoId: "44L6800yTM8",
    title: "Spanish rural road sign",
    country: "Spain",
    tags: ["spain", "road-signs", "rural", "iberia", "roads"],
    matchTags: ["spain", "spanish", "iberia", "road-signs", "rural"],
    priority: 92,
  }),
  makeUnsplashImage({
    id: "unsplash-spain-madrid-street-sign",
    file: "spain-madrid-street-sign.jpg",
    photoId: "nbilcCRLKaQ",
    title: "Madrid street sign",
    country: "Spain",
    tags: ["spain", "spanish", "street-signs", "urban", "language"],
    matchTags: ["spain", "spanish", "madrid", "street-signs", "urban"],
    priority: 91,
  }),
  makeUnsplashImage({
    id: "unsplash-spain-pedestrian-crossing-sign",
    file: "spain-pedestrian-crossing-sign.jpg",
    photoId: "Xqud3oER2mc",
    title: "Spanish pedestrian crossing sign",
    country: "Spain",
    tags: ["spain", "road-signs", "pedestrian", "warning-signs"],
    matchTags: ["spain", "spanish", "pedestrian", "warning-signs"],
    priority: 89,
  }),
  makeUnsplashImage({
    id: "unsplash-portugal-lisbon-metro-sign",
    file: "portugal-lisbon-metro-sign.jpg",
    photoId: "ukaJVDA1KzE",
    title: "Lisbon metro and street sign",
    country: "Portugal",
    tags: ["portugal", "portuguese", "street-signs", "urban", "language"],
    matchTags: ["portugal", "portuguese", "lisbon", "street-signs", "urban"],
    priority: 92,
  }),
  makeUnsplashImage({
    id: "unsplash-australia-outback-road",
    file: "australia-outback-road.jpg",
    photoId: "4lbE-In8Bm8",
    title: "Australian outback road",
    country: "Australia",
    tags: ["australia", "outback", "landscape", "roads", "red-soil"],
    matchTags: ["australia", "australian", "outback", "red-soil", "landscape"],
    priority: 92,
  }),
  makeUnsplashImage({
    id: "unsplash-norway-fjord-road",
    file: "norway-fjord-road.jpg",
    photoId: "e35MCCSUhVY",
    title: "Norwegian fjord road",
    country: "Norway",
    tags: ["norway", "fjords", "mountains", "roads", "landscape"],
    matchTags: ["norway", "norwegian", "fjord", "fjords", "tunnels", "mountains"],
    priority: 92,
  }),
  makeUnsplashImage({
    id: "unsplash-new-zealand-winding-road",
    file: "new-zealand-winding-road.jpg",
    photoId: "Kunf0K0mP8c",
    title: "New Zealand winding road",
    country: "New Zealand",
    tags: ["new-zealand", "roads", "landscape", "green-hills", "left-driving"],
    matchTags: ["new-zealand", "new zealand", "maori", "green-hills", "left-driving"],
    priority: 92,
  }),
  makeUnsplashImage({
    id: "unsplash-mexico-cancun-road-sign",
    file: "mexico-cancun-road-sign.jpg",
    photoId: "RpKl4kaTbKg",
    title: "Mexico road direction sign",
    country: "Mexico",
    tags: ["mexico", "spanish", "road-signs", "direction-signs", "language"],
    matchTags: ["mexico", "mexican", "spanish", "direction-signs", "road-signs"],
    priority: 92,
  }),
  makeUnsplashImage({
    id: "unsplash-mexico-baja-road-sign",
    file: "mexico-baja-road-sign.jpg",
    photoId: "AGP1PbM7KBw",
    title: "Baja California road sign",
    country: "Mexico",
    tags: ["mexico", "spanish", "road-signs", "desert", "north-america"],
    matchTags: ["mexico", "mexican", "baja", "desert", "road-signs"],
    priority: 90,
  }),
  makeUnsplashImage({
    id: "unsplash-thailand-ko-lanta-highway-sign",
    file: "thailand-ko-lanta-highway-sign.jpg",
    photoId: "7lCgTIOeCyw",
    title: "Thailand highway sign",
    country: "Thailand",
    tags: ["thailand", "thai", "road-signs", "language", "southeast-asia"],
    matchTags: ["thailand", "thai", "southeast-asia", "road-signs"],
    priority: 92,
  }),
  makeUnsplashImage({
    id: "unsplash-thailand-bangkok-road-sign",
    file: "thailand-bangkok-road-sign.jpg",
    photoId: "hPwv2cEIBrs",
    title: "Bangkok road sign",
    country: "Thailand",
    tags: ["thailand", "thai", "road-signs", "urban", "language"],
    matchTags: ["thailand", "thai", "bangkok", "road-signs", "urban"],
    priority: 90,
  }),
  makeUnsplashImage({
    id: "unsplash-thailand-night-road-sign",
    file: "thailand-night-road-sign.jpg",
    photoId: "oJarrf2CdpA",
    title: "Thailand night road sign",
    country: "Thailand",
    tags: ["thailand", "thai", "road-signs", "urban", "night"],
    matchTags: ["thailand", "thai", "road-signs", "urban"],
    priority: 88,
  }),
  makeUnsplashImage({
    id: "unsplash-thailand-market-sign",
    file: "thailand-bangkok-market-sign.jpg",
    photoId: "U-3htalA93w",
    title: "Thailand market sign",
    country: "Thailand",
    tags: ["thailand", "thai", "shop-signs", "language", "urban"],
    matchTags: ["thailand", "thai", "shop-signs", "market"],
    priority: 87,
  }),
  makeUnsplashImage({
    id: "unsplash-thailand-green-direction-signs",
    file: "thailand-green-direction-signs.jpg",
    photoId: "KqFoifB-qw4",
    title: "Thailand green direction signs",
    country: "Thailand",
    tags: ["thailand", "thai", "direction-signs", "road-signs"],
    matchTags: ["thailand", "thai", "direction-signs", "road-signs"],
    priority: 89,
  }),
  makeUnsplashImage({
    id: "unsplash-brazil-sao-paulo-street-sign",
    file: "brazil-sao-paulo-street-sign.jpg",
    photoId: "tqF3oK4haSU",
    title: "Brazil street sign",
    country: "Brazil",
    tags: ["brazil", "portuguese", "street-signs", "urban", "language"],
    matchTags: ["brazil", "brazilian", "portuguese", "sao-paulo", "street-signs"],
    priority: 92,
  }),
  makeUnsplashImage({
    id: "unsplash-brazil-fortaleza-street-sign",
    file: "brazil-fortaleza-street-sign.jpg",
    photoId: "qxHkmosB-i8",
    title: "Brazil Fortaleza street sign",
    country: "Brazil",
    tags: ["brazil", "portuguese", "street-signs", "urban", "language"],
    matchTags: ["brazil", "brazilian", "portuguese", "fortaleza", "street-signs"],
    priority: 90,
  }),
  makeUnsplashImage({
    id: "unsplash-brazil-no-parking-sign",
    file: "brazil-no-parking-sign.jpg",
    photoId: "NICR__TP6ps",
    title: "Brazil no-parking sign",
    country: "Brazil",
    tags: ["brazil", "portuguese", "road-signs", "urban", "language"],
    matchTags: ["brazil", "brazilian", "portuguese", "road-signs"],
    priority: 89,
  }),
  makeUnsplashImage({
    id: "unsplash-brazil-rio-road-sign",
    file: "brazil-rio-road-sign.jpg",
    photoId: "Ny8niZgOhs8",
    title: "Brazil Rio road sign",
    country: "Brazil",
    tags: ["brazil", "portuguese", "road-signs", "urban", "language"],
    matchTags: ["brazil", "brazilian", "rio", "road-signs"],
    priority: 88,
  }),
  makeUnsplashImage({
    id: "unsplash-colombia-curved-road-sign",
    file: "colombia-curved-road-sign.jpg",
    photoId: "FYIMagkO14o",
    title: "Colombia road sign",
    country: "Colombia",
    tags: ["colombia", "spanish", "road-signs", "landscape", "south-america"],
    matchTags: ["colombia", "colombian", "spanish", "road-signs", "andes"],
    priority: 92,
  }),
  makeUnsplashImage({
    id: "unsplash-colombia-valledupar-road-sign",
    file: "colombia-valledupar-road-sign.jpg",
    photoId: "dwFN4T3oBSc",
    title: "Colombia Valledupar road sign",
    country: "Colombia",
    tags: ["colombia", "spanish", "road-signs", "direction-signs"],
    matchTags: ["colombia", "colombian", "valledupar", "road-signs"],
    priority: 90,
  }),
  makeUnsplashImage({
    id: "unsplash-colombia-tatacoa-desert-sign",
    file: "colombia-tatacoa-desert-sign.jpg",
    photoId: "Uj77w21iBF4",
    title: "Colombia Tatacoa desert sign",
    country: "Colombia",
    tags: ["colombia", "spanish", "desert", "road-signs", "landscape"],
    matchTags: ["colombia", "colombian", "tatacoa", "desert", "landscape"],
    priority: 88,
  }),
  makeUnsplashImage({
    id: "unsplash-chile-puerto-montt-road-sign",
    file: "chile-puerto-montt-road-sign.jpg",
    photoId: "dQZKZxYMkb0",
    title: "Chile Puerto Montt road sign",
    country: "Chile",
    tags: ["chile", "spanish", "road-signs", "south-america", "landscape"],
    matchTags: ["chile", "chilean", "puerto-montt", "road-signs", "south-america"],
    priority: 92,
  }),
  makeUnsplashImage({
    id: "unsplash-czechia-prague-red-street-sign",
    file: "czechia-prague-red-street-sign.jpg",
    photoId: "y5hY3t1JlMc",
    title: "Prague red street sign",
    country: "Czechia",
    tags: ["czechia", "czech", "street-signs", "language", "urban"],
    matchTags: ["czechia", "czech", "prague", "diacritics", "street-signs"],
    priority: 92,
  }),
  makeUnsplashImage({
    id: "unsplash-czechia-prague-street-sign",
    file: "czechia-prague-street-sign.jpg",
    photoId: "vC-WHNEWRdE",
    title: "Prague street sign",
    country: "Czechia",
    tags: ["czechia", "czech", "street-signs", "language", "urban"],
    matchTags: ["czechia", "czech", "prague", "street-signs"],
    priority: 90,
  }),
  makeUnsplashImage({
    id: "unsplash-czechia-zizkov-street-sign",
    file: "czechia-zizkov-street-sign.jpg",
    photoId: "WzvskOeGnrY",
    title: "Zizkov street sign",
    country: "Czechia",
    tags: ["czechia", "czech", "street-signs", "language", "urban"],
    matchTags: ["czechia", "czech", "zizkov", "street-signs"],
    priority: 89,
  }),
  makeUnsplashImage({
    id: "unsplash-slovenia-forest-warning-sign",
    file: "slovenia-forest-warning-sign.jpg",
    photoId: "RBOO8AjjwL0",
    title: "Slovenia forest warning sign",
    country: "Slovenia",
    tags: ["slovenia", "slovene", "road-signs", "forest", "landscape"],
    matchTags: ["slovenia", "slovene", "forest", "road-signs", "balkan"],
    priority: 92,
  }),
  makeUnsplashImage({
    id: "unsplash-slovenia-stara-fuzina-road-sign",
    file: "slovenia-stara-fuzina-road-sign.jpg",
    photoId: "cF2ON2eaVHg",
    title: "Slovenia Stara Fuzina road sign",
    country: "Slovenia",
    tags: ["slovenia", "slovene", "direction-signs", "road-signs", "language"],
    matchTags: ["slovenia", "slovene", "stara-fuzina", "direction-signs"],
    priority: 90,
  }),
  makeUnsplashImage({
    id: "unsplash-croatia-aerial-road",
    file: "croatia-aerial-road.jpg",
    photoId: "IpOyXo10Sfw",
    title: "Croatia coastal road",
    country: "Croatia",
    tags: ["croatia", "coast", "roads", "landscape", "architecture"],
    matchTags: ["croatia", "croatian", "coast", "adriatic", "roads"],
    priority: 90,
  }),
  makeUnsplashImage({
    id: "unsplash-croatia-green-road-sign",
    file: "croatia-green-road-sign.jpg",
    photoId: "es2HW4H35WY",
    title: "Croatia green road sign",
    country: "Croatia",
    tags: ["croatia", "croatian", "road-signs", "direction-signs", "language"],
    matchTags: ["croatia", "croatian", "direction-signs", "road-signs"],
    priority: 92,
  }),
  makeUnsplashImage({
    id: "unsplash-croatia-coast-road-landscape",
    file: "croatia-coast-road-landscape.jpg",
    photoId: "AIRoW3PgzgI",
    title: "Croatia coast road landscape",
    country: "Croatia",
    tags: ["croatia", "coast", "roads", "landscape", "adriatic"],
    matchTags: ["croatia", "croatian", "coast", "adriatic", "landscape"],
    priority: 88,
  }),
  makeUnsplashImage({
    id: "unsplash-indonesia-surabaya-road-sign",
    file: "indonesia-surabaya-road-sign.jpg",
    photoId: "FMR3AwFUuJI",
    title: "Indonesia Surabaya road sign",
    country: "Indonesia",
    tags: ["indonesia", "indonesian", "road-signs", "language", "southeast-asia"],
    matchTags: ["indonesia", "indonesian", "surabaya", "jalan", "road-signs"],
    priority: 92,
  }),
  makeUnsplashImage({
    id: "unsplash-south-korea-busan-highway-signs",
    file: "south-korea-busan-highway-signs.jpg",
    photoId: "lGFBlmKu8Kg",
    title: "South Korea highway signs",
    country: "South Korea",
    tags: ["south-korea", "korean", "hangul", "road-signs", "language"],
    matchTags: ["south-korea", "south korea", "korean", "hangul", "road-signs"],
    priority: 94,
  }),
  makeUnsplashImage({
    id: "unsplash-south-korea-geumsan-sign",
    file: "south-korea-geumsan-sign.jpg",
    photoId: "lPPbV6ys7qQ",
    title: "South Korea Geumsan sign",
    country: "South Korea",
    tags: ["south-korea", "korean", "hangul", "direction-signs", "language"],
    matchTags: ["south-korea", "south korea", "korean", "hangul", "geumsan"],
    priority: 91,
  }),
  makeUnsplashImage({
    id: "unsplash-south-korea-jeju-road-signs",
    file: "south-korea-jeju-road-signs.jpg",
    photoId: "pkTP0CnUb8k",
    title: "South Korea Jeju road signs",
    country: "South Korea",
    tags: ["south-korea", "korean", "hangul", "road-signs", "language"],
    matchTags: ["south-korea", "south korea", "korean", "hangul", "jeju"],
    priority: 90,
  }),
  makeUnsplashImage({
    id: "unsplash-south-korea-seoul-street-sign",
    file: "south-korea-seoul-street-sign.jpg",
    photoId: "JZ0Fmv_XM14",
    title: "South Korea Seoul street sign",
    country: "South Korea",
    tags: ["south-korea", "korean", "hangul", "street-signs", "urban"],
    matchTags: ["south-korea", "south korea", "korean", "hangul", "seoul"],
    priority: 89,
  }),
  makeUnsplashImage({
    id: "unsplash-malaysia-georgetown-one-way-sign",
    file: "malaysia-georgetown-one-way-sign.jpg",
    photoId: "QzPBW-unRUM",
    title: "Malaysia Georgetown one-way sign",
    country: "Malaysia",
    tags: ["malaysia", "malay", "road-signs", "left-driving", "language"],
    matchTags: ["malaysia", "malay", "georgetown", "one-way", "left-driving"],
    priority: 92,
  }),
  makeUnsplashImage({
    id: "unsplash-malaysia-kuala-lumpur-street-sign",
    file: "malaysia-kuala-lumpur-street-sign.jpg",
    photoId: "Ak6Duswl7Ps",
    title: "Malaysia Kuala Lumpur street sign",
    country: "Malaysia",
    tags: ["malaysia", "malay", "street-signs", "urban", "language"],
    matchTags: ["malaysia", "malay", "kuala-lumpur", "street-signs"],
    priority: 90,
  }),
  makeUnsplashImage({
    id: "unsplash-malaysia-highway-direction-signs",
    file: "malaysia-highway-direction-signs.jpg",
    photoId: "Cr0LaPfOg4k",
    title: "Malaysia highway direction signs",
    country: "Malaysia",
    tags: ["malaysia", "malay", "road-signs", "direction-signs", "left-driving"],
    matchTags: ["malaysia", "malay", "highway", "direction-signs", "left-driving"],
    priority: 91,
  }),
  makeUnsplashImage({
    id: "unsplash-malaysia-stop-sign",
    file: "malaysia-stop-sign.jpg",
    photoId: "k_ENIx9qLjk",
    title: "Malaysia stop sign",
    country: "Malaysia",
    tags: ["malaysia", "road-signs", "stop-sign", "left-driving"],
    matchTags: ["malaysia", "malay", "stop-sign", "road-signs"],
    priority: 88,
  }),
  makeUnsplashImage({
    id: "unsplash-malaysia-pangkor-direction-signs",
    file: "malaysia-pangkor-direction-signs.jpg",
    photoId: "_YZ92NWe2MU",
    title: "Malaysia Pangkor direction signs",
    country: "Malaysia",
    tags: ["malaysia", "malay", "road-signs", "direction-signs"],
    matchTags: ["malaysia", "malay", "pangkor", "direction-signs"],
    priority: 87,
  }),
  makeUnsplashImage({
    id: "unsplash-malaysia-kuala-lumpur-road-sign",
    file: "malaysia-kuala-lumpur-road-sign.jpg",
    photoId: "R5pHk0iUrKA",
    title: "Malaysia Kuala Lumpur road sign",
    country: "Malaysia",
    tags: ["malaysia", "malay", "road-signs", "urban", "language"],
    matchTags: ["malaysia", "malay", "kuala-lumpur", "road-signs"],
    priority: 86,
  }),
];

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
    id: "spain-road-sign-p1e",
    sourceType: "wikimedia",
    sourceUrl: "/assets/training/commons/spain-road-sign-p1e.svg",
    referenceUrl: "https://commons.wikimedia.org/wiki/File:Spain_traffic_signal_p1e.svg",
    attribution: "Wikimedia Commons: Spain traffic signal p1e.svg",
    license: "CC0 / license listed on Commons file page",
    country: "Spain",
    clueTags: ["roads", "road-signs", "warning-signs", "spain", "europe"],
    matchCountries: ["Spain"],
    matchTags: ["spain", "spanish", "iberia", "road-signs", "warning-signs"],
    priority: 91,
    verificationStatus: "verified",
  },
  {
    id: "portugal-road-sign-i8",
    sourceType: "wikimedia",
    sourceUrl: "/assets/training/commons/portugal-road-sign-i8.svg",
    referenceUrl: "https://commons.wikimedia.org/wiki/File:Portugal_road_sign_I8.svg",
    attribution: "Republic of Portugal / Wikimedia Commons",
    license: "Public domain / license listed on Commons file page",
    country: "Portugal",
    clueTags: ["roads", "road-signs", "warning-signs", "portugal", "iberia"],
    matchCountries: ["Portugal"],
    matchTags: ["portugal", "portuguese", "iberia", "road-signs", "warning-signs"],
    priority: 90,
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
    id: "australia-road-sign-w44",
    sourceType: "wikimedia",
    sourceUrl: "/assets/training/commons/australia-road-sign-w44.svg",
    referenceUrl: "https://commons.wikimedia.org/wiki/File:Australia_road_sign_W4-4.svg",
    attribution: "Government of Queensland / Wikimedia Commons",
    license: "CC BY 3.0 AU / license listed on Commons file page",
    country: "Australia",
    clueTags: ["roads", "road-signs", "warning-signs", "australia", "left-driving"],
    matchCountries: ["Australia"],
    matchTags: ["australia", "australian", "left-driving", "road-signs", "warning-signs"],
    priority: 89,
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
  ...unsplashTrainingImages,
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
