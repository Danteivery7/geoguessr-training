import type { ImageSource } from "../types";

type SourceAttributionProps = {
  source?: ImageSource;
  compact?: boolean;
};

const SourceAttribution = ({ source, compact = false }: SourceAttributionProps) => {
  if (!source) return null;
  const linkUrl = source.referenceUrl ?? (source.sourceUrl?.startsWith("data:") ? undefined : source.sourceUrl);

  return (
    <div className={compact ? "text-[10px] text-slate-400" : "text-xs text-slate-400"}>
      <span className="uppercase tracking-[0.16em] text-slate-500">{source.sourceType}</span>
      <span className="mx-2 text-slate-600">/</span>
      {linkUrl ? (
        <a href={linkUrl} target="_blank" rel="noreferrer" className="text-slate-300 underline decoration-slate-600">
          {source.attribution}
        </a>
      ) : (
        <span>{source.attribution}</span>
      )}
      <span className="mx-2 text-slate-600">/</span>
      <span>{source.license}</span>
    </div>
  );
};

export default SourceAttribution;
