import { Download, FileUp, ImagePlus, Upload } from "lucide-react";
import { ChangeEvent, useMemo, useState } from "react";
import type { AssetRecord, ProgressState, Question, SourceType } from "../types";
import { sampleAssets } from "../data/sampleAssets";
import { makePlaceholderSource } from "../data/sourceRegistry";
import { assetMetadataKey, exportAssetMetadata, saveAssetBlob } from "../utils/assetStore";
import { useLocalStorage } from "../hooks/useLocalStorage";

type AssetManagerProps = {
  profileId: string;
  progress: ProgressState;
  importProgress: (raw: string) => void;
  addCustomQuestion: (question: Question) => void;
};

const sourceTypes: SourceType[] = ["local", "wikimedia", "mapillary", "googleStreetView", "generatedPlaceholder"];

const downloadJson = (filename: string, content: string) => {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

const AssetManager = ({ profileId, progress, importProgress, addCustomQuestion }: AssetManagerProps) => {
  const [assets, setAssets] = useLocalStorage<AssetRecord[]>(assetMetadataKey(profileId), []);
  const [form, setForm] = useState({
    title: "",
    country: "",
    region: "",
    category: "",
    tags: "",
    sourceType: "local" as SourceType,
    attribution: "",
    license: "",
    sourceUrl: "",
    apiReference: "",
    clueExplanation: "",
    correctAnswer: "",
    closeWrongAnswers: "",
    difficulty: 2,
  });
  const [file, setFile] = useState<File | null>(null);
  const allAssets = useMemo(() => [...sampleAssets, ...assets], [assets]);

  const handleImport = async (event: ChangeEvent<HTMLInputElement>, type: "progress" | "questions" | "assets") => {
    const selected = event.target.files?.[0];
    if (!selected) return;
    const raw = await selected.text();
    if (type === "progress") {
      importProgress(raw);
    }
    if (type === "questions") {
      const parsed = JSON.parse(raw) as { questions?: Question[] } | Question[];
      const imported = Array.isArray(parsed) ? parsed : parsed.questions ?? [];
      imported.forEach(addCustomQuestion);
    }
    if (type === "assets") {
      const parsed = JSON.parse(raw) as { assets?: AssetRecord[] } | AssetRecord[];
      setAssets(Array.isArray(parsed) ? parsed : parsed.assets ?? []);
    }
    event.target.value = "";
  };

  const saveAsset = async () => {
    const id = crypto.randomUUID();
    const blobKey = file ? `${profileId}:${id}` : undefined;
    if (file && blobKey) await saveAssetBlob(blobKey, file);
    const asset: AssetRecord = {
      id,
      profileId,
      title: form.title || "Untitled clue asset",
      country: form.country || "Global",
      region: form.region || undefined,
      category: form.category || "Unsorted",
      tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      sourceType: form.sourceType,
      attribution: form.attribution || "User-provided or pending attribution",
      license: form.license || "User must verify license before publishing",
      sourceUrl: form.sourceUrl || undefined,
      apiReference: form.apiReference || undefined,
      clueExplanation: form.clueExplanation || "Add the clue explanation here.",
      correctAnswer: form.correctAnswer || form.country || "Unknown",
      closeWrongAnswers: form.closeWrongAnswers.split(",").map((answer) => answer.trim()).filter(Boolean),
      difficulty: Number(form.difficulty) as AssetRecord["difficulty"],
      createdAt: new Date().toISOString(),
      blobKey,
    };
    setAssets((current) => [asset, ...current]);
    const customQuestion: Question = {
      id: `custom-${id}`,
      type: "imageCountryGuess",
      disciplineId: "visual",
      categoryId: "visual-country-from-image",
      difficulty: asset.difficulty,
      prompt: asset.clueExplanation,
      imageSource: {
        ...makePlaceholderSource(asset.country, asset.tags),
        sourceType: asset.sourceType,
        attribution: asset.attribution,
        license: asset.license,
        sourceUrl: asset.sourceUrl,
        apiReference: asset.apiReference,
      },
      answers: [asset.correctAnswer, ...asset.closeWrongAnswers.slice(0, 2), "Not enough clues"].map((label) => ({
        id: label,
        label,
        isClose: label !== asset.correctAnswer && label !== "Not enough clues",
      })),
      correctAnswer: asset.correctAnswer,
      explanation: asset.clueExplanation,
      giveaway: asset.clueExplanation,
      commonMistake: "Using an unverified visual cue without a second clue.",
      relatedCountries: [asset.country, ...asset.closeWrongAnswers],
      tags: asset.tags,
      points: asset.difficulty * 100,
      verificationStatus: "verify-before-publishing",
    };
    addCustomQuestion(customQuestion);
    setFile(null);
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs uppercase tracking-[0.22em] text-signal">Legal asset workflow</div>
        <h1 className="font-display text-5xl font-black">Asset Manager</h1>
      </div>
      <section className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <div className="glass rounded-lg p-5">
          <h2 className="font-display text-3xl font-bold">Add future image</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[
              ["title", "Title"],
              ["country", "Country"],
              ["region", "Region"],
              ["category", "Category"],
              ["tags", "Tags, comma separated"],
              ["attribution", "Attribution"],
              ["license", "License"],
              ["sourceUrl", "Source URL"],
              ["apiReference", "API reference"],
              ["correctAnswer", "Correct answer"],
              ["closeWrongAnswers", "Close wrong answers"],
            ].map(([key, label]) => (
              <label key={key} className="text-sm text-slate-300">
                {label}
                <input
                  value={String(form[key as keyof typeof form])}
                  onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                  className="mt-1 w-full rounded border border-white/10 bg-night px-3 py-2 text-slate-100 outline-none focus:border-signal/60"
                />
              </label>
            ))}
            <label className="text-sm text-slate-300">
              Source type
              <select
                value={form.sourceType}
                onChange={(event) => setForm((current) => ({ ...current, sourceType: event.target.value as SourceType }))}
                className="mt-1 w-full rounded border border-white/10 bg-night px-3 py-2 text-slate-100 outline-none focus:border-signal/60"
              >
                {sourceTypes.map((sourceType) => (
                  <option key={sourceType} value={sourceType}>
                    {sourceType}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm text-slate-300">
              Difficulty
              <input
                type="number"
                min={1}
                max={5}
                value={form.difficulty}
                onChange={(event) => setForm((current) => ({ ...current, difficulty: Number(event.target.value) }))}
                className="mt-1 w-full rounded border border-white/10 bg-night px-3 py-2 text-slate-100 outline-none focus:border-signal/60"
              />
            </label>
            <label className="text-sm text-slate-300 md:col-span-2">
              Clue explanation
              <textarea
                value={form.clueExplanation}
                onChange={(event) => setForm((current) => ({ ...current, clueExplanation: event.target.value }))}
                className="mt-1 min-h-[96px] w-full rounded border border-white/10 bg-night px-3 py-2 text-slate-100 outline-none focus:border-signal/60"
              />
            </label>
            <label className="rounded border border-dashed border-white/20 bg-white/[0.04] p-4 text-sm text-slate-300 md:col-span-2">
              <span className="inline-flex items-center gap-2"><ImagePlus size={18} /> Upload local image</span>
              <input type="file" accept="image/*" onChange={(event) => setFile(event.target.files?.[0] ?? null)} className="mt-3 block w-full text-sm" />
              {file ? <span className="mt-2 block text-signal">{file.name}</span> : null}
            </label>
          </div>
          <button type="button" onClick={saveAsset} className="mt-4 rounded bg-signal px-4 py-2 font-bold text-night">
            Save asset and custom question
          </button>
        </div>
        <aside className="space-y-4">
          <div className="glass rounded-lg p-5">
            <h2 className="font-display text-2xl font-bold">Backup center</h2>
            <div className="mt-4 grid gap-2">
              <button type="button" onClick={() => downloadJson("geomastery-progress.json", JSON.stringify(progress, null, 2))} className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-sm">
                <Download size={16} /> Export progress JSON
              </button>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded border border-white/10 px-3 py-2 text-sm">
                <Upload size={16} /> Import progress JSON
                <input type="file" accept="application/json" onChange={(event) => void handleImport(event, "progress")} className="hidden" />
              </label>
              <button type="button" onClick={() => downloadJson("geomastery-custom-questions.json", JSON.stringify({ questions: progress.customQuestions }, null, 2))} className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-sm">
                <Download size={16} /> Export custom questions
              </button>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded border border-white/10 px-3 py-2 text-sm">
                <FileUp size={16} /> Import custom questions
                <input type="file" accept="application/json" onChange={(event) => void handleImport(event, "questions")} className="hidden" />
              </label>
              <button type="button" onClick={() => downloadJson("geomastery-assets.json", exportAssetMetadata(assets))} className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-sm">
                <Download size={16} /> Export asset metadata
              </button>
            </div>
          </div>
          <div className="glass rounded-lg p-5">
            <h2 className="font-display text-2xl font-bold">Saved assets</h2>
            <div className="mt-4 max-h-[420px] space-y-2 overflow-auto pr-1">
              {allAssets.map((asset) => (
                <div key={asset.id} className="rounded border border-white/10 bg-white/[0.04] p-3">
                  <div className="font-semibold">{asset.title}</div>
                  <div className="text-xs text-slate-400">{asset.country} / {asset.sourceType} / {asset.license}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default AssetManager;
