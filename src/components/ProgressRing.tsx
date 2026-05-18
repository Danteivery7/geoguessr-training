type ProgressRingProps = {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  color?: string;
};

const ProgressRing = ({ value, size = 86, stroke = 8, label, color = "#35d39f" }: ProgressRingProps) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const normalized = Math.max(0, Math.min(100, value));
  const offset = circumference - (normalized / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255,255,255,.12)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute text-center">
        <div className="font-display text-xl font-bold leading-none">{Math.round(normalized)}%</div>
        {label ? <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-400">{label}</div> : null}
      </div>
    </div>
  );
};

export default ProgressRing;
