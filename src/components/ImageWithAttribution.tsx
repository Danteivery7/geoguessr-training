import type { ImageSource } from "../types";
import { resolveRealImageSource } from "../data/realImageSources";
import SourceAttribution from "./SourceAttribution";

type ImageWithAttributionProps = {
  source?: ImageSource;
  title?: string;
  className?: string;
};

const tagColor = (tag: string) => {
  const colors = ["#35d39f", "#39a8ff", "#f5c451", "#ff6b6b", "#c084fc"];
  return colors[Math.abs(tag.split("").reduce((total, char) => total + char.charCodeAt(0), 0)) % colors.length];
};

const isBundledAssetUrl = (url?: string) =>
  Boolean(url && (url.startsWith("/") || url.startsWith("./") || url.startsWith("../") || url.startsWith("data:")));

const sceneKind = (source?: ImageSource, title = "") => {
  const search = `${title} ${(source?.clueTags ?? []).join(" ")}`.toLowerCase();
  if (search.includes("language") || search.includes("script") || search.includes("domain")) return "language";
  if (search.includes("road") || search.includes("route") || search.includes("lane")) return "road";
  if (search.includes("sign") || search.includes("bollard") || search.includes("infrastructure")) return "sign";
  if (search.includes("architecture") || search.includes("urban") || search.includes("city")) return "city";
  if (search.includes("landscape") || search.includes("nature") || search.includes("soil") || search.includes("tree")) return "landscape";
  if (search.includes("duel") || search.includes("boss")) return "duel";
  return "map";
};

const StaticTrainingVisual = ({ source, title }: { source?: ImageSource; title: string }) => {
  const kind = sceneKind(source, title);
  const tags = source?.clueTags ?? ["static", "trainer", kind];
  const accent = tagColor(tags[0] ?? kind);

  return (
    <div className="relative min-h-[230px] overflow-hidden bg-[#0a1720]">
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), radial-gradient(circle at 18% 18%, rgba(53,211,159,.2), transparent 28%), radial-gradient(circle at 84% 20%, rgba(57,168,255,.17), transparent 24%), linear-gradient(145deg, #0a1720, #112736)",
          backgroundSize: "34px 34px, 34px 34px, 100% 100%, 100% 100%, 100% 100%",
        }}
      />
      {kind === "road" ? (
        <div className="absolute inset-x-0 bottom-0 h-36 bg-slate-950/80 [clip-path:polygon(36%_0,64%_0,92%_100%,8%_100%)]">
          <div className="absolute left-1/2 top-2 h-32 w-1 -translate-x-1/2 rounded bg-amber" />
          <div className="absolute left-[28%] top-8 h-24 w-1 rotate-[-8deg] rounded bg-white/60" />
          <div className="absolute right-[28%] top-8 h-24 w-1 rotate-[8deg] rounded bg-white/60" />
        </div>
      ) : null}
      {kind === "sign" ? (
        <div className="absolute left-8 top-9">
          <div className="h-24 w-40 rounded-lg border-4 border-white/70 bg-ocean/80 p-3 shadow-card">
            <div className="h-3 w-24 rounded bg-white/80" />
            <div className="mt-4 h-3 w-32 rounded bg-white/60" />
            <div className="mt-4 h-3 w-20 rounded bg-white/50" />
          </div>
          <div className="mx-auto h-20 w-3 bg-slate-300/70" />
        </div>
      ) : null}
      {kind === "language" ? (
        <div className="absolute inset-x-8 top-9 rounded-lg border border-amber/40 bg-night/80 p-5 shadow-card">
          <div className="font-display text-3xl font-black text-amber">Aa / Script</div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["cz", "sk", "pt", "jp", "kr", "th"].map((item) => (
              <div key={item} className="rounded bg-white/10 px-2 py-2 text-center text-sm font-bold uppercase text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {kind === "landscape" ? (
        <>
          <div className="absolute bottom-0 left-0 h-28 w-full bg-signal/25 [clip-path:polygon(0_62%,18%_42%,34%_60%,48%_30%,70%_64%,100%_40%,100%_100%,0_100%)]" />
          <div className="absolute bottom-0 left-0 h-20 w-full bg-amber/20 [clip-path:polygon(0_45%,28%_30%,52%_54%,78%_28%,100%_50%,100%_100%,0_100%)]" />
        </>
      ) : null}
      {kind === "city" ? (
        <div className="absolute inset-x-6 bottom-0 flex items-end gap-2">
          {[70, 110, 86, 138, 96, 120, 78].map((height, index) => (
            <div key={height + index} className="flex-1 rounded-t bg-white/12" style={{ height }}>
              <div className="m-2 grid grid-cols-2 gap-1">
                {Array.from({ length: 6 }, (_, windowIndex) => (
                  <span key={windowIndex} className="h-2 rounded bg-signal/30" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {kind === "duel" ? (
        <div className="absolute inset-8 grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-signal/30 bg-signal/15 p-4">
            <div className="font-display text-4xl font-black">A</div>
            <div className="mt-3 h-2 rounded bg-white/30" />
            <div className="mt-2 h-2 w-2/3 rounded bg-white/20" />
          </div>
          <div className="rounded-lg border border-coral/30 bg-coral/15 p-4">
            <div className="font-display text-4xl font-black">B</div>
            <div className="mt-3 h-2 rounded bg-white/30" />
            <div className="mt-2 h-2 w-2/3 rounded bg-white/20" />
          </div>
        </div>
      ) : null}
      {kind === "map" ? (
        <div className="absolute inset-8 rounded-lg border border-white/10 bg-white/[0.04]">
          <div className="absolute left-[18%] top-[30%] h-12 w-24 rounded-full bg-signal/20" />
          <div className="absolute left-[48%] top-[24%] h-10 w-16 rounded-full bg-ocean/25" />
          <div className="absolute left-[60%] top-[48%] h-16 w-28 rounded-full bg-amber/20" />
          <div className="absolute left-[78%] top-[68%] h-9 w-14 rounded-full bg-coral/20" />
        </div>
      ) : null}
      <div className="relative z-10 flex min-h-[230px] flex-col justify-between p-5">
        <div className="flex items-center justify-between">
          <span className="rounded bg-night/75 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-200">
            training visual
          </span>
          <span className="rounded bg-night/75 px-2 py-1 text-xs text-slate-300">static card</span>
        </div>
        <div>
          <div className="max-w-xl font-display text-3xl font-bold text-white drop-shadow">{title}</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded border px-2 py-1 text-xs text-slate-100"
                style={{ borderColor: `${tagColor(tag)}77`, backgroundColor: `${tagColor(tag)}28` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full" style={{ backgroundColor: accent }} />
    </div>
  );
};

const ImageWithAttribution = ({ source, title = "Static training visual", className = "" }: ImageWithAttributionProps) => {
  const resolvedSource = resolveRealImageSource(source, title);
  const isPlaceholder = !resolvedSource || resolvedSource.sourceType === "generatedPlaceholder";
  const canRenderImage =
    resolvedSource?.sourceUrl && !isPlaceholder && isBundledAssetUrl(resolvedSource.sourceUrl);

  return (
    <figure className={`overflow-hidden rounded-lg border border-white/10 bg-ink ${className}`}>
      <div className="relative min-h-[230px] overflow-hidden bg-grid bg-[length:34px_34px]">
        {canRenderImage ? (
          <img src={resolvedSource.sourceUrl} alt={title} className="h-full min-h-[230px] w-full object-cover" />
        ) : (
          <StaticTrainingVisual source={resolvedSource} title={title} />
        )}
      </div>
      <figcaption className="border-t border-white/10 p-3">
        <SourceAttribution source={resolvedSource} compact />
      </figcaption>
    </figure>
  );
};

export default ImageWithAttribution;
