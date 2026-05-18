import * as Icons from "lucide-react";
import type { Badge } from "../types";

type BadgeDisplayProps = {
  badges: Badge[];
  earnedIds: string[];
};

const iconFor = (name: string) => {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Badge;
  return Icon;
};

const BadgeDisplay = ({ badges, earnedIds }: BadgeDisplayProps) => (
  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
    {badges.map((badge) => {
      const Icon = iconFor(badge.icon);
      const earned = earnedIds.includes(badge.id);

      return (
        <div
          key={badge.id}
          className={`glass rounded-lg p-4 ${earned ? "border-signal/40" : "opacity-55 grayscale"}`}
        >
          <div className="flex items-center gap-3">
            <div className={`rounded-lg p-2 ${earned ? "bg-signal/20 text-signal" : "bg-white/10 text-slate-400"}`}>
              <Icon size={20} />
            </div>
            <div>
              <div className="font-semibold">{badge.title}</div>
              <div className="text-xs text-slate-400">{badge.description}</div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

export default BadgeDisplay;
