import type { ImageSource } from "../types";
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

const ImageWithAttribution = ({ source, title = "Image needed", className = "" }: ImageWithAttributionProps) => {
  const isPlaceholder = !source || source.sourceType === "generatedPlaceholder";

  return (
    <figure className={`overflow-hidden rounded-lg border border-white/10 bg-ink ${className}`}>
      <div className="relative min-h-[190px] overflow-hidden bg-grid bg-[length:34px_34px]">
        {source?.sourceUrl && !isPlaceholder ? (
          <img src={source.sourceUrl} alt={title} className="h-full min-h-[190px] w-full object-cover" />
        ) : (
          <div className="flex min-h-[190px] flex-col justify-between p-5">
            <div className="flex items-center justify-between">
              <span className="rounded bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-300">
                {source?.country ?? "Global"}
              </span>
              <span className="text-xs text-slate-500">Image needed</span>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-white">{title}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {(source?.clueTags ?? ["placeholder", "training"]).slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded border px-2 py-1 text-xs text-slate-200"
                    style={{ borderColor: `${tagColor(tag)}66`, backgroundColor: `${tagColor(tag)}1f` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <figcaption className="border-t border-white/10 p-3">
        <SourceAttribution source={source} compact />
      </figcaption>
    </figure>
  );
};

export default ImageWithAttribution;
