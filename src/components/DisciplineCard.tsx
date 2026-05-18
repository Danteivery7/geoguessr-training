import * as Icons from "lucide-react";
import type { Discipline } from "../types";
import ProgressRing from "./ProgressRing";

type DisciplineCardProps = {
  discipline: Discipline & { progress?: number };
  onOpen?: () => void;
};

const iconFor = (name: string) => {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Compass;
  return Icon;
};

const DisciplineCard = ({ discipline, onOpen }: DisciplineCardProps) => {
  const Icon = iconFor(discipline.icon);
  const progress = discipline.progress ?? 0;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="glass hover-lift group rounded-lg p-5 text-left focus:outline-none focus:ring-2 focus:ring-signal/60"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-4 inline-flex rounded-lg p-3" style={{ backgroundColor: `${discipline.color}22`, color: discipline.color }}>
            <Icon size={24} />
          </div>
          <h3 className="font-display text-2xl font-bold">{discipline.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-slate-400">{discipline.description}</p>
        </div>
        <ProgressRing value={progress} size={72} stroke={7} color={discipline.color} />
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: discipline.color }} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {discipline.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded bg-white/10 px-2 py-1 text-xs text-slate-300">
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
};

export default DisciplineCard;
