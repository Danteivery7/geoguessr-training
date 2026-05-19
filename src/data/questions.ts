import type { AnswerChoice, Question, QuestionType } from "../types";
import { countries } from "./countries";
import { makePlaceholderSource } from "./sourceRegistry";

type Seed = {
  type: QuestionType;
  disciplineId: string;
  categoryId: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  prompt: string;
  correct: string;
  close: string[];
  wrong: string;
  explanation: string;
  giveaway: string;
  commonMistake: string;
  relatedCountries: string[];
  tags: string[];
  points?: number;
  seconds?: number;
  imageCountry?: string;
};

const answersFor = (correct: string, close: string[], wrong: string): AnswerChoice[] =>
  [correct, ...close.slice(0, 2), wrong].map((label) => ({
    id: label,
    label,
    country: label,
    isClose: label !== correct && label !== wrong,
  }));

const toQuestion = (seed: Seed, index: number, prefix: string): Question => ({
  id: `${prefix}-${String(index + 1).padStart(3, "0")}`,
  type: seed.type,
  disciplineId: seed.disciplineId,
  categoryId: seed.categoryId,
  difficulty: seed.difficulty,
  prompt: seed.prompt,
  imageSource:
    seed.type.includes("Image") || seed.type === "imageCountryGuess" || seed.type === "clueIdentification" || seed.type === "finalBoss"
      ? makePlaceholderSource(seed.imageCountry ?? seed.correct, seed.tags)
      : undefined,
  answers: answersFor(seed.correct, seed.close, seed.wrong),
  correctAnswer: seed.correct,
  explanation: seed.explanation,
  giveaway: seed.giveaway,
  commonMistake: seed.commonMistake,
  relatedCountries: seed.relatedCountries,
  tags: seed.tags,
  timeLimitSeconds: seed.seconds,
  points: seed.points ?? seed.difficulty * 100,
  verificationStatus: "starter",
});

const languageSeeds: Question[] = [
  ["Which language is most likely to use letters like ř and ů?", "Czech", ["Slovak", "Slovenian"], "Greek", "Those diacritics are a strong Czech practice cue.", "Look for ř/ů-style Czech markers.", "Slovak is close but usually lacks ř."],
  ["Which language is most likely to use many double vowels such as aa or ee?", "Finnish", ["Estonian", "Swedish"], "Arabic", "Finnic languages often show long vowel patterns.", "Double vowels are the scan target.", "Estonian is the close trap; use place-name endings too."],
  ["Which script is this road-sign training card focused on?", "Greek", ["Cyrillic", "Latin"], "Thai", "Greek has distinct letter shapes and often appears with Latin transliteration in Greece.", "Greek letters, not Cyrillic.", "Some letters look shared with Cyrillic, so compare the whole word."],
  ["Which country is most likely if the sign uses Hangul?", "South Korea", ["Japan", "China"], "Portugal", "Hangul is the giveaway for Korean-language signs.", "Block-like Hangul syllables.", "Japanese and Chinese use different script mixes."],
  ["Which country is most likely if a sign mixes kana and kanji?", "Japan", ["South Korea", "China"], "Ghana", "Japanese commonly mixes kana with kanji.", "Kana curves plus kanji.", "Chinese lacks kana; Korean uses Hangul."],
  ["Which language clue best fits words like rua and estrada?", "Portuguese", ["Spanish", "Italian"], "Finnish", "Rua and estrada are high-value Portuguese road words.", "Rua/estrada vocabulary.", "Spanish road vocabulary overlaps but rua is the trap breaker."],
  ["Which country is most likely with .cz on a sign or domain?", "Czechia", ["Slovakia", "Slovenia"], "Japan", "The .cz domain is the direct country-code clue.", ".cz domain ending.", ".sk and .si are the close pair traps."],
  ["Which country is most likely with .sk?", "Slovakia", ["Czechia", "Slovenia"], "Brazil", ".sk is Slovakia's country-code domain.", ".sk domain ending.", ".si looks similar but belongs to Slovenia."],
  ["Which language family clue helps separate Romania from Bulgaria?", "Latin script Romance language", ["Cyrillic Slavic", "Latin Slavic"], "Hangul", "Romanian is a Romance language written in Latin script.", "Latin words that feel Romance.", "Bulgaria uses Cyrillic, so script is the fast check."],
  ["Which script points most strongly to Thailand?", "Thai", ["Khmer", "Lao"], "Greek", "Thai script is visually distinct and common on Thai signs.", "Thai script shapes.", "Khmer and Lao are close regional script traps."],
  ["Which script points most strongly to Cambodia?", "Khmer", ["Thai", "Lao"], "Cyrillic", "Khmer script is the key Cambodia training cue.", "Khmer script silhouette.", "Thailand is nearby but drives left and uses Thai script."],
  ["Which language clue fits Brazil better than Portugal in many street scenes?", "Portuguese with Brazilian place context", ["European Portuguese", "Spanish"], "Korean", "The language is Portuguese, but tropical/road context can split Brazil from Portugal.", "Portuguese plus Brazil context.", "Do not answer Portugal from language alone."],
  ["Which region is likely with Nordic letters and dense forest?", "Nordic Europe", ["Baltic Europe", "Central Europe"], "West Africa", "Letters plus landscape should be combined before choosing a country.", "Nordic text plus forest road context.", "Baltic countries can also be flat and forested."],
  ["Which country is most likely when signs use both Finnish and Swedish?", "Finland", ["Sweden", "Estonia"], "Spain", "Bilingual Finnish/Swedish signs are a useful Finland cue in many areas.", "Finnish plus Swedish together.", "Sweden alone is tempting when Swedish appears."],
  ["Which language is the closest trap for Czech?", "Slovak", ["Slovenian", "Croatian"], "Japanese", "Czech and Slovak share many visible patterns and are a classic close-answer pair.", "Czech vs Slovak is a close language duel.", "Slovenian/Croatian are Slavic but usually not the first Czech trap."],
  ["Which language clue is common in Dutch street names?", "straat or weg", ["rua", "calle"], "hangul", "Dutch commonly uses straat/weg in street contexts.", "straat/weg vocabulary.", "Afrikaans can look related, so use country context."],
  ["Which country code domain is Portugal?", ".pt", [".es", ".br"], ".jp", ".pt is the direct Portugal domain clue.", ".pt", ".br is Portuguese-language but Brazil."],
  ["Which country code domain is Brazil?", ".br", [".pt", ".co"], ".no", ".br is the direct Brazil domain clue.", ".br", ".pt is the close Portuguese-language trap."],
  ["Which country code domain is Estonia?", ".ee", [".fi", ".lv"], ".mx", ".ee is Estonia.", ".ee", ".fi can feel close because of Finnic language clues."],
  ["Which writing system most separates Bulgaria from Romania?", "Cyrillic", ["Latin", "Greek"], "Japanese kana", "Bulgarian uses Cyrillic; Romanian uses Latin script.", "Cyrillic on signs.", "Some Balkan landscapes overlap, so script matters."],
  ["Which country is most likely with Spanish and Andean highland context?", "Peru", ["Bolivia", "Ecuador"], "Denmark", "All three close answers are plausible; use altitude, road, and town context.", "Spanish plus Andes.", "Bolivia and Ecuador are close, so this needs multiple clues."],
  ["Which country is most likely with Malay words like jalan and left driving?", "Malaysia", ["Indonesia", "Thailand"], "Canada", "Jalan appears in Malay/Indonesian contexts; road quality and country context split the pair.", "jalan plus left driving.", "Indonesia is a close language trap."],
  ["Which language is most likely with Hangul and English road transliteration?", "Korean", ["Japanese", "Chinese"], "Portuguese", "Hangul is the core Korean clue.", "Hangul blocks.", "Japan also has English transliteration, but the script differs."],
  ["Which language clue fits Turkish signs?", "ç, ş, ğ, dotted/dotless i patterns", ["Greek script", "Cyrillic"], "Hangul", "Turkish uses Latin script with distinctive letters.", "Turkish-specific Latin letters.", "Greek is geographically close but script is different."],
  ["Which country is most likely with Arabic script on road signs?", "Jordan or nearby Arabic-speaking countries", ["Israel", "Greece"], "Finland", "Arabic script narrows the region but still needs country context.", "Arabic script.", "Do not overcommit from script alone."],
  ["Which country is likely when Hebrew dominates road signs?", "Israel", ["Jordan", "Greece"], "Brazil", "Hebrew script is a strong Israel-region cue.", "Hebrew script.", "Arabic may also appear regionally, so read the dominant script."],
  ["Which language comparison belongs in a Slavic close-answer drill?", "Czech vs Slovak vs Slovenian vs Croatian", ["Spanish vs Portuguese", "Thai vs Khmer"], "Japanese vs Korean", "These are common Slavic Latin-script traps.", "Shared Slavic-looking words and diacritics.", "Treat all Slavic text as one bucket and you lose accuracy."],
  ["Which language comparison belongs in a Nordic close-answer drill?", "Swedish vs Finnish vs Norwegian vs Danish", ["Greek vs Turkish", "Spanish vs Portuguese"], "Hindi vs Bengali", "Nordic country guesses often need language plus landscape.", "Nordic letters and place-name endings.", "Finnish is not Germanic, so the words can feel very different."],
  ["Which language clue helps identify Iceland in a road context?", "Icelandic letters and place-name endings", ["Finnish double vowels", "Dutch straat"], "Khmer script", "Icelandic has distinct letters and many place names ending around natural features.", "Icelandic text plus volcanic landscape.", "Nordic overlap can tempt Norway."],
  ["Which language clue is a safe first scan in European town names?", "Diacritics and word endings", ["Only road width", "Only sky color"], "License plate blur", "Text details are high-signal but should be combined with scene context.", "Diacritics, endings, and domains.", "One isolated word can be a business name or borrowed language."],
].map(([prompt, correct, close, wrong, explanation, giveaway, commonMistake], index) => {
  const closeList = Array.isArray(close) ? close : String(close).split("|");

  return toQuestion(
    {
      type: "languageImage",
      disciplineId: "language",
      categoryId: index % 3 === 0 ? "language-diacritics" : index % 3 === 1 ? "language-domain-endings" : "language-european-language-comparison",
      difficulty: ((index % 5) + 1) as Seed["difficulty"],
      prompt: String(prompt),
      correct: String(correct),
      close: closeList,
      wrong: String(wrong),
      explanation: String(explanation),
      giveaway: String(giveaway),
      commonMistake: String(commonMistake),
      relatedCountries: closeList.concat(String(correct)),
      tags: ["language", "close-answer", "starter"],
      imageCountry: String(correct),
    },
    index,
    "lang"
  );
});

const roadSignPairs = [
  ["Which country is the strongest fit for an interstate shield training card?", "United States", "Canada|Australia", "Greece", "Interstate shields are a classic US road-system cue.", "Shield shape and I-route naming.", "Canada has highways, but not US interstate shields."],
  ["Which country is most likely for a Trans-Canada Highway finder clue?", "Canada", "United States|Australia", "Japan", "The Trans-Canada is the Canada route spine to remember.", "Trans-Canada naming.", "US interstate logic is the close North American trap."],
  ["Which country should you test when a route shield says BR-101?", "Brazil", "Portugal|Argentina", "Finland", "BR highway codes point to Brazil in this starter deck.", "BR route prefix.", "Portuguese language can tempt Portugal."],
  ["Which country is the best fit for N1 route practice in southern Africa?", "South Africa", "Botswana|Australia", "Japan", "N routes are a useful South Africa road-finder cue.", "N-road naming.", "Botswana is nearby but has different route context."],
  ["Which country is most likely when left driving combines with yellow diamond warnings and eucalyptus scrub?", "Australia", "South Africa|New Zealand", "Spain", "This is a classic close-country visual drill.", "Left driving plus dry Australian landscape.", "South Africa can also be dry and left-driving."],
  ["Which country is most likely when left driving appears with green hills and Maori place names?", "New Zealand", "Australia|United Kingdom", "Mexico", "Maori place names and green terrain are useful New Zealand cues.", "Maori names plus left driving.", "Australia shares driving side but often has a different landscape feel."],
  ["Which country is more likely if the road scene shows Thai script and left driving?", "Thailand", "Cambodia|Malaysia", "Norway", "Thai script plus left driving is a strong pairing.", "Thai script and traffic side.", "Cambodia uses Khmer and right driving."],
  ["Which country is more likely if Khmer script appears and traffic keeps right?", "Cambodia", "Thailand|Laos", "Denmark", "Khmer script and right-side traffic separate Cambodia from Thailand.", "Khmer script plus right driving.", "Thailand is nearby but left-driving."],
  ["Which country is the best fit for A1 road practice in the UK-style road category?", "United Kingdom", "Ireland|Australia", "Brazil", "A-road naming is a map-finder training clue; verify local route details before publishing.", "A-road naming.", "Many countries use A roads, so use the map context."],
  ["Which country is most likely if a road finder prompt mentions Route 1 ring road?", "Iceland", "Norway|Denmark", "Ghana", "Iceland's Route 1 is a key map training anchor.", "Route 1 ring-road idea.", "Other Nordic countries have route 1s, so map context matters."],
  ["Which side does Japan drive on?", "Left", "Right|Varies by region", "Unknown", "Japan drives on the left.", "Traffic side.", "Do not infer from urban density alone."],
  ["Which side does South Korea drive on?", "Right", "Left|Varies by region", "Unknown", "South Korea drives on the right.", "Traffic side.", "Japan is the close East Asia trap."],
  ["Which side does Indonesia drive on?", "Left", "Right|Varies by island", "Unknown", "Indonesia drives on the left.", "Traffic side plus motorbike-heavy roads.", "Malaysia is close, so use language and road context."],
  ["Which side does Ghana drive on?", "Right", "Left|Varies by region", "Unknown", "Ghana drives on the right.", "Traffic side.", "Kenya and Uganda drive left, so this is a key Africa split."],
  ["Which country is most likely for yellow center-line South America road practice with lush Andes?", "Colombia", "Ecuador|Peru", "Finland", "Use this as a close-country Andean road drill, not a single-clue fact.", "Andean road context.", "Ecuador and Peru can feel very close."],
  ["Which country is more likely with long pampas roads and RN route practice?", "Argentina", "Chile|Uruguay", "Japan", "Argentina road practice often includes long flat pampas contexts.", "RN route label plus pampas.", "Chile can share Andes but not pampas feel."],
  ["Which country is more likely with desert north-south highway and Route 5 practice?", "Chile", "Argentina|Peru", "Netherlands", "Chile's long north-south geography makes this a useful map-road cue.", "North-south spine and desert/coast context.", "Peru also has dry coast, so use map position."],
  ["Which country is more likely with Mexican federal highway shield practice?", "Mexico", "Colombia|United States", "Thailand", "Mexican highway markers are a road-system clue to study.", "Mex route marker context.", "Spanish language alone can tempt Colombia."],
  ["Which country is more likely with blue Japanese road signs and left-side traffic?", "Japan", "South Korea|Taiwan", "Portugal", "Japan combines left driving with Japanese scripts.", "Left driving plus Japanese scripts.", "South Korea uses Hangul and right driving."],
  ["Which country is more likely with Korean road signs and right-side traffic?", "South Korea", "Japan|China", "Spain", "Hangul plus right-side traffic is the quick scan.", "Hangul and traffic side.", "Japan is the close urban-density trap."],
  ["Which country is a better fit for red soil shoulders and left driving in East Africa?", "Kenya", "Uganda|Botswana", "Norway", "Kenya and Uganda are close; this starter cue needs local image verification.", "Left driving plus red soil East Africa context.", "Uganda can look similar."],
  ["Which country is more likely with lush red-soil roads and left driving around Lake Victoria context?", "Uganda", "Kenya|Ghana", "Czechia", "Uganda practice should compare Kenya closely.", "Lush green plus red soil.", "Kenya is the close East Africa trap."],
  ["Which country is more likely with flat dry savanna and left driving?", "Botswana", "South Africa|Kenya", "Netherlands", "Botswana often trains as a dry southern Africa close-country pair.", "Flat dry savanna plus left driving.", "South Africa is the main close trap."],
  ["Which country is more likely with kilometer markers and Finnish-looking names?", "Finland", "Sweden|Estonia", "Mexico", "Language and Nordic road context should be combined.", "Finnish place-name patterns.", "Estonia can feel close linguistically."],
  ["Which country is more likely with fjord roads and many tunnels?", "Norway", "Sweden|Finland", "Brazil", "Fjords and tunnels are high-signal Norway training cues.", "Fjords, tunnels, steep terrain.", "Sweden has forests but not the same fjord density."],
  ["Which country is more likely with flat bike infrastructure and Dutch street names?", "Netherlands", "Denmark|Belgium", "Peru", "Dutch language plus cycle-heavy flat urban context is strong.", "Dutch words and bike lanes.", "Denmark is the close flat/cycling trap."],
  ["Which country is more likely with flat farmland and Danish place names?", "Denmark", "Netherlands|Sweden", "Bolivia", "Danish language and flat landscape split Denmark from Netherlands.", "Danish text plus flat coast/farm context.", "Netherlands is the close flat-bike trap."],
  ["Which country is more likely with Baltic road signs and Lithuanian endings?", "Lithuania", "Latvia|Estonia", "Australia", "Baltic language endings and domain clues matter.", "Lithuanian-looking endings.", "Latvia is the closest trap."],
  ["Which country is more likely with Latvian macron-heavy place names?", "Latvia", "Lithuania|Estonia", "Japan", "Latvian text often uses macrons; pair it with map context.", "Macron-heavy Latvian text.", "Lithuania is the close Baltic trap."],
  ["Which country is more likely with Estonian/Finnic-looking names south of Finland?", "Estonia", "Finland|Latvia", "Chile", "Estonian can feel Finnish; road and map context split it.", "Finnic text with Baltic context.", "Finland is the tempting language trap."],
].map(([prompt, correct, close, wrong, explanation, giveaway, commonMistake], index) =>
  toQuestion(
    {
      type: index % 4 === 0 ? "multipleChoiceImage" : index % 4 === 1 ? "imageCountryGuess" : "multipleChoiceText",
      disciplineId: index % 3 === 0 ? "roads" : "signs",
      categoryId: index % 3 === 0 ? "roads-route-shields" : index % 3 === 1 ? "signs-direction-signs" : "roads-left-vs-right-driving",
      difficulty: ((index % 5) + 1) as Seed["difficulty"],
      prompt,
      correct,
      close: close.split("|"),
      wrong,
      explanation,
      giveaway,
      commonMistake,
      relatedCountries: close.split("|").concat(correct),
      tags: ["roads", "signs", "infrastructure", "starter"],
      imageCountry: correct,
    },
    index,
    "road"
  )
);

const landscapeCountries = [
  ["Atacama-style dry desert and long thin country context", "Chile", "Peru|Bolivia", "Finland"],
  ["Pampas-style open farmland and long straight roads", "Argentina", "Uruguay|Chile", "Japan"],
  ["Altiplano highland dryness and rough rural roads", "Bolivia", "Peru|Chile", "Netherlands"],
  ["Andean cloud forest and tropical mountain roads", "Ecuador", "Colombia|Peru", "Denmark"],
  ["Lush Andean valleys with tropical edges", "Colombia", "Ecuador|Peru", "Norway"],
  ["Red soil and eucalyptus-like dry roadside scrub", "Australia", "South Africa|Botswana", "Greece"],
  ["Dry grassland, mountains, and left-driving southern Africa", "South Africa", "Botswana|Australia", "Japan"],
  ["Green pasture, mountains, and coastal roads", "New Zealand", "Australia|Norway", "Ghana"],
  ["Fjord, tunnel, and steep coastal terrain", "Norway", "Sweden|Iceland", "Brazil"],
  ["Flat forest, lakes, and Finnic language context", "Finland", "Estonia|Sweden", "Mexico"],
  ["Flat polders, canals, and cycle paths", "Netherlands", "Denmark|Belgium", "Peru"],
  ["Mediterranean dry hills and olive groves", "Greece", "Turkey|Spain", "Canada"],
  ["Dry plateau and Turkish road-language context", "Turkey", "Greece|Bulgaria", "New Zealand"],
  ["Tropical rice fields and Thai script context", "Thailand", "Cambodia|Malaysia", "Sweden"],
  ["Flat tropical lowlands and Khmer script context", "Cambodia", "Thailand|Vietnam", "Romania"],
  ["Tropical palm roads and Malay/Indonesian language context", "Malaysia", "Indonesia|Thailand", "Chile"],
  ["Volcanic tropical roads and Indonesian language context", "Indonesia", "Malaysia|Philippines", "Norway"],
  ["Dry savanna and sparse southern Africa roads", "Botswana", "South Africa|Kenya", "Czechia"],
  ["Red soil highlands and left-driving East Africa", "Kenya", "Uganda|Ghana", "Spain"],
  ["Lush equatorial roads and red dirt shoulders", "Uganda", "Kenya|Ghana", "Portugal"],
  ["Tropical West Africa with English shop signs", "Ghana", "Nigeria|Kenya", "Slovakia"],
  ["Busy West African urban roads and English signage", "Nigeria", "Ghana|Uganda", "Finland"],
  ["Mediterranean Iberian dry scrub and Spanish text", "Spain", "Portugal|Italy", "South Korea"],
  ["Atlantic Iberian greenery and Portuguese text", "Portugal", "Spain|Brazil", "Japan"],
].map(([cue, correct, close, wrong], index) =>
  toQuestion(
    {
      type: "imageCountryGuess",
      disciplineId: "nature",
      categoryId: index % 2 === 0 ? "nature-soil-color" : "nature-trees",
      difficulty: ((index % 5) + 1) as Seed["difficulty"],
      prompt: `Which country is the strongest fit for this landscape cue: ${cue}?`,
      correct,
      close: close.split("|"),
      wrong,
      explanation: "Use the landscape as a starting hypothesis, then confirm with road, sign, and language clues.",
      giveaway: cue,
      commonMistake: "Picking from scenery alone when a close neighbor can share the same biome.",
      relatedCountries: close.split("|").concat(correct),
      tags: ["landscape", "visual", "starter"],
      imageCountry: correct,
    },
    index,
    "land"
  )
);

const architectureCountries = [
  ["azulejo tile, white walls, and Portuguese text", "Portugal", "Spain|Brazil", "Finland"],
  ["compact old towns, stucco walls, and Spanish place names", "Spain", "Portugal|Italy", "Japan"],
  ["whitewashed Mediterranean buildings with Greek script nearby", "Greece", "Turkey|Cyprus", "Canada"],
  ["apartment blocks, minarets, and Turkish lettering", "Turkey", "Greece|Bulgaria", "Australia"],
  ["red wooden houses and Nordic forest towns", "Sweden", "Finland|Norway", "Mexico"],
  ["wood houses, clean towns, and Finnish text", "Finland", "Estonia|Sweden", "Brazil"],
  ["steep roof wooden houses near fjords", "Norway", "Sweden|Iceland", "Ghana"],
  ["brick row houses, canals, and Dutch signs", "Netherlands", "Denmark|Belgium", "Peru"],
  ["brick houses, bike-first streets, and Danish names", "Denmark", "Netherlands|Sweden", "Chile"],
  ["Central European red roofs and Czech diacritics", "Czechia", "Slovakia|Slovenia", "Thailand"],
  ["Carpathian villages and Slovak text", "Slovakia", "Czechia|Slovenia", "Indonesia"],
  ["Alpine villages and Slovene-looking signs", "Slovenia", "Croatia|Slovakia", "Nigeria"],
  ["stone coastal towns and Croatian text", "Croatia", "Slovenia|Serbia", "New Zealand"],
  ["Balkan towns with mixed Latin/Cyrillic signs", "Serbia", "North Macedonia|Bulgaria", "Portugal"],
  ["Cyrillic signs and dry Balkan mountain towns", "North Macedonia", "Serbia|Bulgaria", "Netherlands"],
  ["painted rural gates and Romanian Latin text", "Romania", "Bulgaria|Serbia", "Japan"],
  ["Cyrillic signs and concrete Balkan apartment blocks", "Bulgaria", "Romania|North Macedonia", "Spain"],
  ["wooden rural houses and Lithuanian text", "Lithuania", "Latvia|Estonia", "Brazil"],
  ["Baltic towns with Latvian macrons", "Latvia", "Lithuania|Estonia", "Turkey"],
  ["Nordic-Baltic streets and Estonian place names", "Estonia", "Finland|Latvia", "Mexico"],
  ["compact houses, dense utility poles, and Japanese scripts", "Japan", "South Korea|Taiwan", "Ghana"],
  ["apartment towers, Hangul signs, and mountain cities", "South Korea", "Japan|China", "Portugal"],
].map(([cue, correct, close, wrong], index) =>
  toQuestion(
    {
      type: index % 3 === 0 ? "clueIdentification" : "imageCountryGuess",
      disciplineId: "architecture",
      categoryId: index % 2 === 0 ? "architecture-house-structures" : "architecture-city-architecture",
      difficulty: ((index % 5) + 1) as Seed["difficulty"],
      prompt: `Which country is most likely from this architecture cue: ${cue}?`,
      correct,
      close: close.split("|"),
      wrong,
      explanation: "Architecture works best when paired with language, road signs, and landscape.",
      giveaway: cue,
      commonMistake: "Using a building style without checking the country-specific text or road context.",
      relatedCountries: close.split("|").concat(correct),
      tags: ["architecture", "visual", "starter"],
      imageCountry: correct,
    },
    index,
    "arch"
  )
);

const metaSeeds = [
  ["Which country pair is the classic left-driving dry-road trap?", "Australia vs South Africa", "Australia vs New Zealand|Botswana vs South Africa", "Japan vs South Korea"],
  ["Which clue type should you review when you miss utility pole styles?", "Infrastructure", "Vehicles & Meta|Road Systems", "Mixed Exams"],
  ["Which clue type tracks camera or coverage quality?", "Vehicles & Meta", "Road Systems|Nature & Landscape", "Language & Writing"],
  ["Which country is the close trap for Japan in urban East Asia?", "South Korea", "China|Taiwan", "Portugal"],
  ["Which country is the close trap for Thailand because of regional scripts?", "Cambodia", "Malaysia|Laos", "Norway"],
  ["Which category should store license plate blur clues?", "Blurred plates", "License plates|Camera generation clues", "Trees"],
  ["Which category should store roof rack clues?", "Roof racks", "Google car clues|Car color clues", "Greek"],
  ["Which category should store trekker coverage notes?", "Trekker coverage", "Coverage quality|Motorbike coverage", "Road shoulders"],
  ["Which clue type should handle follow cars?", "Follow cars", "License plates|Country-specific vehicles", "Flowers"],
  ["Which category is best for bus stop designs?", "Bus stops", "Street name signs|Traffic lights", "Desert landscapes"],
  ["Which category is best for post box designs?", "Post boxes", "Street name signs|Gas stations", "Mountains"],
  ["Which category is best for roadside reflectors?", "Roadside reflectors", "Bollards|Guardrails", "Domain endings"],
  ["Which category is best for kilometer marker drills?", "Kilometer markers", "Route shields|Road numbering systems", "Japanese"],
  ["Which category should train traffic light styles?", "Traffic lights", "Warning signs|Street furniture", "Soil color"],
  ["Which category should train gas station brand/context clues?", "Gas stations", "Bus stops|Shops", "Cyrillic"],
  ["Which discipline owns route shields?", "Road Systems", "Signs & Infrastructure|Map Search / Road Finder", "Nature & Landscape"],
  ["Which discipline owns bollards?", "Signs & Infrastructure", "Road Systems|Architecture & Urban", "Language & Writing"],
  ["Which discipline owns sun/hemisphere clues?", "Nature & Landscape", "Vehicles & Meta|Architecture & Urban", "Country Duels"],
  ["Which discipline owns curb and sidewalk style?", "Architecture & Urban", "Road Systems|Mixed Exams", "Language & Writing"],
  ["Which mode should be used for a Spain vs Portugal head-to-head?", "Country Duels", "Language Lab|Map Finder", "Asset Manager"],
  ["Which mode should locate I-95 on a map?", "Map Search / Road Finder", "Country Duels|Road & Sign Finder", "Review Mistakes"],
  ["Which mode should create a 15-question Slavic drill?", "Custom Tests", "Settings|Asset Manager", "Country Profiles"],
  ["Which mode should revisit missed clues?", "Review Mistakes", "Dashboard|World Map Trainer", "Asset Manager"],
  ["Which mode should add future user-owned images?", "Asset Manager", "Mixed Exams|Settings", "Country Duels"],
].map(([prompt, correct, close, wrong], index) =>
  toQuestion(
    {
      type: index % 4 === 0 ? "multipleChoiceImage" : "multipleChoiceText",
      disciplineId: index % 2 === 0 ? "vehicles" : "signs",
      categoryId: index % 2 === 0 ? "vehicles-coverage-quality" : "signs-bollards",
      difficulty: ((index % 5) + 1) as Seed["difficulty"],
      prompt,
      correct,
      close: close.split("|"),
      wrong,
      explanation: "This is a system-training question that teaches where to place and review a clue.",
      giveaway: "Choose the most specific module or close-country framing.",
      commonMistake: "Putting every clue into a generic mixed bucket makes review less useful.",
      relatedCountries: ["Global"],
      tags: ["meta", "infrastructure", "starter"],
      imageCountry: "Global",
    },
    index,
    "meta"
  )
);

const visualSeeds = [
  "What clue gives away an Iberian scene fastest?",
  "What clue gives away a Nordic forest road fastest?",
  "What clue gives away an Andean highland road fastest?",
  "What clue gives away a tropical Southeast Asia road fastest?",
  "What clue gives away a Balkan Cyrillic street fastest?",
  "What clue gives away a Japanese urban street fastest?",
  "What clue gives away a Korean urban street fastest?",
  "What clue gives away a Dutch cycling street fastest?",
  "What clue gives away a southern Africa dry-road scene fastest?",
  "What clue gives away a West African English-sign scene fastest?",
  "What clue gives away a Baltic flat-forest scene fastest?",
  "What clue gives away a Mediterranean coastal town fastest?",
  "What clue gives away a Brazilian Portuguese road scene fastest?",
  "What clue gives away a Mexican Spanish highway scene fastest?",
  "What clue gives away a Canadian metric road scene fastest?",
].map((prompt, index) =>
  toQuestion(
    {
      type: index % 2 === 0 ? "clueIdentification" : "imageCountryGuess",
      disciplineId: "visual",
      categoryId: index % 2 === 0 ? "visual-what-clue-gives-it-away" : "visual-country-from-image",
      difficulty: ((index % 5) + 1) as Seed["difficulty"],
      prompt,
      correct: ["Language/sign text", "Road furniture", "Landscape", "Driving side", "Architecture"][index % 5],
      close: ["Landscape", "Road furniture", "Language/sign text"].filter(
        (answer) => answer !== ["Language/sign text", "Road furniture", "Landscape", "Driving side", "Architecture"][index % 5]
      ),
      wrong: "Random sky color",
      explanation: "Scan for durable clues before mood or lighting.",
      giveaway: "A stable clue category should beat a vague vibe.",
      commonMistake: "Guessing from atmosphere instead of a repeatable clue.",
      relatedCountries: ["Global"],
      tags: ["visual", "clue-reveal", "starter"],
      imageCountry: "Global",
    },
    index,
    "visual"
  )
);

const bossNames = [
  ["Europe Road Sign Boss", "Road Systems", "roads-road-signs"],
  ["Latin America Language Boss", "Language & Writing", "language-romance-language-comparison"],
  ["Australia vs South Africa Boss", "Country Duels", "country-duels-oceania-duels"],
  ["Bollard Boss", "Signs & Infrastructure", "signs-bollards"],
  ["Slavic Language Boss", "Language & Writing", "language-slavic-language-comparison"],
  ["World Road Lines Boss", "Road Systems", "roads-road-lines"],
  ["Architecture Boss", "Architecture & Urban", "architecture-city-architecture"],
  ["Map Finder Boss", "Map Search / Road Finder", "map-finder-transcontinental-routes"],
].map(([title, disciplineTitle, categoryId], index) =>
  toQuestion(
    {
      type: index === 7 ? "timedMapFind" : "finalBoss",
      disciplineId:
        disciplineTitle === "Road Systems"
          ? "roads"
          : disciplineTitle === "Language & Writing"
            ? "language"
            : disciplineTitle === "Signs & Infrastructure"
              ? "signs"
              : disciplineTitle === "Architecture & Urban"
                ? "architecture"
                : disciplineTitle === "Map Search / Road Finder"
                  ? "map-finder"
                  : "country-duels",
      categoryId,
      difficulty: 5,
      prompt: `${title}: choose the most repeatable clue strategy.`,
      correct: "Use the giveaway and confirm with a second clue",
      close: ["Guess from vibe only", "Use one isolated clue"],
      wrong: "Ignore the image",
      explanation: "Boss events reward disciplined clue stacking.",
      giveaway: "Combine the strongest visible clue with one confirmation clue.",
      commonMistake: "Rushing to a country from one attractive clue.",
      relatedCountries: ["Global"],
      tags: ["boss", "final-boss", title.toLowerCase()],
      points: 750,
      seconds: 60,
      imageCountry: "Global",
    },
    index,
    "boss"
  )
);

const countryNameByCode = new Map(countries.map((country) => [country.name, country]));

const closeCountriesFor = (countryName: string) => {
  const country = countryNameByCode.get(countryName);
  if (!country) return countries.filter((candidate) => candidate.name !== countryName).slice(0, 3);

  const confusables = country.confusableCountries
    .map((name) => countryNameByCode.get(name))
    .filter((candidate): candidate is (typeof countries)[number] => Boolean(candidate));
  const regional = countries.filter(
    (candidate) => candidate.region === country.region && candidate.name !== country.name && candidate.phoneCode !== country.phoneCode
  );
  const global = countries.filter((candidate) => candidate.name !== country.name && candidate.phoneCode !== country.phoneCode);

  return [...confusables, ...regional, ...global].filter(
    (candidate, index, list) => list.findIndex((item) => item.name === candidate.name) === index
  );
};

const areaCodeCountries = countries.filter((country) => country.phoneCode !== "+1").slice(0, 36);

const areaCodeQuestions: Question[] = areaCodeCountries.map((country, index) => {
  const closeCountries = closeCountriesFor(country.name);
  const closeNames = Array.from(new Set(closeCountries.map((candidate) => candidate.name))).slice(0, 2);
  const closeCodes = Array.from(
    new Set(closeCountries.map((candidate) => candidate.phoneCode).filter((code) => code !== country.phoneCode))
  ).slice(0, 2);
  const fallbackCodes = countries
    .map((candidate) => candidate.phoneCode)
    .filter((code) => code !== country.phoneCode && !closeCodes.includes(code));
  while (closeCodes.length < 2 && fallbackCodes.length) {
    closeCodes.push(fallbackCodes.shift() ?? "+999");
  }
  const wrongCountry = countries.find(
    (candidate) =>
      candidate.region !== country.region &&
      candidate.phoneCode !== country.phoneCode &&
      !closeNames.includes(candidate.name)
  ) ?? countries[0];
  const wrongCode =
    countries.find(
      (candidate) =>
        candidate.region !== country.region &&
        candidate.phoneCode !== country.phoneCode &&
        !closeCodes.includes(candidate.phoneCode)
    )?.phoneCode ?? "+999";
  const askForCode = index % 2 === 0;

  return toQuestion(
    {
      type: "multipleChoiceText",
      disciplineId: "area-codes",
      categoryId: index % 3 === 0 ? "area-codes-country-calling-codes" : index % 3 === 1 ? "area-codes-shared-calling-code-traps" : "area-codes-regional-dialing-patterns",
      difficulty: ((index % 5) + 1) as Seed["difficulty"],
      prompt: askForCode
        ? `Which calling code belongs to ${country.name}?`
        : `Which country uses the calling code ${country.phoneCode}?`,
      correct: askForCode ? country.phoneCode : country.name,
      close: askForCode ? closeCodes : closeNames,
      wrong: askForCode ? wrongCode : wrongCountry.name,
      explanation: askForCode ? `${country.name} uses ${country.phoneCode}.` : `${country.phoneCode} is the calling code for ${country.name}.`,
      giveaway: askForCode ? `${country.name} profile code: ${country.phoneCode}` : `Calling code ${country.phoneCode}.`,
      commonMistake: "Nearby or confusable countries often have similar-looking phone-code ranges, so drill them as close answers.",
      relatedCountries: closeNames.concat(country.name),
      tags: ["area-codes", "calling-codes", "phone-codes", country.region.toLowerCase()],
      points: 100 + ((index % 5) + 1) * 50,
    },
    index,
    "area"
  );
});

const sharedAreaCodeQuestions: Question[] = [
  toQuestion(
    {
      type: "multipleChoiceText",
      disciplineId: "area-codes",
      categoryId: "area-codes-shared-calling-code-traps",
      difficulty: 2,
      prompt: "Which answer is a correct +1 calling-code trap?",
      correct: "United States and Canada",
      close: ["United Kingdom and Ireland", "Australia and New Zealand"],
      wrong: "Spain and Portugal",
      explanation: "The United States and Canada both use +1, so use other clues before committing.",
      giveaway: "+1 is shared in the North American Numbering Plan.",
      commonMistake: "Treating +1 as only the United States.",
      relatedCountries: ["United States", "Canada"],
      tags: ["area-codes", "calling-codes", "shared-code"],
    },
    0,
    "area-shared"
  ),
  toQuestion(
    {
      type: "multipleChoiceText",
      disciplineId: "area-codes",
      categoryId: "area-codes-country-calling-codes",
      difficulty: 1,
      prompt: "Which calling code belongs to Japan?",
      correct: "+81",
      close: ["+82", "+86"],
      wrong: "+351",
      explanation: "Japan is +81; South Korea is the close +82 trap.",
      giveaway: "+81 for Japan.",
      commonMistake: "Mixing Japan +81 with South Korea +82.",
      relatedCountries: ["Japan", "South Korea", "China"],
      tags: ["area-codes", "east-asia", "calling-codes"],
    },
    1,
    "area-shared"
  ),
];

const specialQuestions: Question[] = [
  toQuestion(
    {
      type: "trueFalse",
      disciplineId: "roads",
      categoryId: "roads-left-vs-right-driving",
      difficulty: 1,
      prompt: "True or false: this app is designed to connect to GeoGuessr accounts.",
      correct: "False",
      close: ["True", "Only during exams"],
      wrong: "Only for paid users",
      explanation: "GeoMastery Trainer is a standalone local trainer with no outside account connection.",
      giveaway: "Standalone trainer, local profiles only.",
      commonMistake: "Confusing training content with live-game assistance.",
      relatedCountries: ["Global"],
      tags: ["safety", "standalone"],
    },
    0,
    "special"
  ),
  toQuestion(
    {
      type: "sequenceOrdering",
      disciplineId: "visual",
      categoryId: "visual-what-clue-gives-it-away",
      difficulty: 3,
      prompt: "Best scan order for a visual clue card?",
      correct: "Text/signs, road system, landscape, architecture",
      close: ["Landscape, sky, mood, guess", "Car blur, sky, color, guess"],
      wrong: "Guess first, explain later",
      explanation: "A consistent scan order catches more repeatable clues.",
      giveaway: "Text and road systems usually give stronger anchors than mood.",
      commonMistake: "Letting a pretty landscape override visible text.",
      relatedCountries: ["Global"],
      tags: ["visual", "sequence"],
    },
    1,
    "special"
  ),
  toQuestion(
    {
      type: "flashcard",
      disciplineId: "language",
      categoryId: "language-domain-endings",
      difficulty: 2,
      prompt: "Flashcard: .pt belongs to which country?",
      correct: "Portugal",
      close: ["Brazil", "Spain"],
      wrong: "Japan",
      explanation: ".pt is Portugal.",
      giveaway: "Country-code domain.",
      commonMistake: "Choosing Brazil because both use Portuguese.",
      relatedCountries: ["Portugal", "Brazil", "Spain"],
      tags: ["flashcard", "domain"],
    },
    2,
    "special"
  ),
  toQuestion(
    {
      type: "mapClick",
      disciplineId: "map-finder",
      categoryId: "map-finder-national-routes",
      difficulty: 3,
      prompt: "Map click drill: find the broad region of Iceland Route 1.",
      correct: "Iceland",
      close: ["Norway", "Denmark"],
      wrong: "Ghana",
      explanation: "Route 1 loops around Iceland and is a strong road-finder anchor.",
      giveaway: "Island ring-road context.",
      commonMistake: "Choosing a Nordic mainland route from the number alone.",
      relatedCountries: ["Iceland", "Norway", "Denmark"],
      tags: ["map", "road-finder"],
      seconds: 300,
    },
    3,
    "special"
  ),
];

export const questions: Question[] = [
  ...languageSeeds,
  ...roadSignPairs,
  ...landscapeCountries,
  ...architectureCountries,
  ...metaSeeds,
  ...visualSeeds,
  ...bossNames,
  ...areaCodeQuestions,
  ...sharedAreaCodeQuestions,
  ...specialQuestions,
];

export const bossQuestionIds = bossNames.map((question) => question.id);
