import { DesignedLife, ActualLife } from "@/data/types";
import Link from "next/link";

interface BuiltForLastedBarProps {
  designed: DesignedLife;
  actual: ActualLife;
  machineName?: string;
  machineSlug?: string;
  sourceUrl?: string;
  className?: string;
}

export default function BuiltForLastedBar({
  designed,
  actual,
  machineName,
  machineSlug,
  sourceUrl = "https://science.nasa.gov",
  className = "",
}: BuiltForLastedBarProps) {
  // If designed.value is 0 (like Apollo 11 passive mirror), handle gracefully
  const hasDesigned = designed.value > 0;
  const multiplier = hasDesigned ? (actual.value / designed.value).toFixed(1) : null;
  const isMultiple = hasDesigned && actual.value > designed.value;

  const maxVal = Math.max(designed.value || 1, actual.value);
  const designedPct = hasDesigned ? Math.max(8, Math.round((designed.value / maxVal) * 100)) : 0;
  const actualPct = Math.min(100, Math.round((actual.value / maxVal) * 100));

  return (
    <div className={`p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <div>
          <span className="text-xs font-mono text-[var(--color-signal-amber)] uppercase tracking-wider block">
            BUILT FOR X, LASTED Y {machineName ? `// ${machineName.toUpperCase()}` : ""}
          </span>
          <h3 className="font-display font-bold text-lg text-[var(--color-text)]">
            {hasDesigned
              ? `Built for ${designed.value} ${designed.unit}, Lasted ${actual.value} ${actual.unit}`
              : `Active for ${actual.value} ${actual.unit} (Passive Mirror)`}
          </h3>
        </div>

        {isMultiple && multiplier && (
          <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-mono font-bold bg-[var(--color-signal-amber)]/15 text-[var(--color-signal-amber)] border border-[var(--color-signal-amber)]/30">
            {multiplier}x PLANNED LIFETIME
          </span>
        )}
      </div>

      {/* Hand-crafted SVG Comparison Bar */}
      <div className="space-y-4">
        {/* Planned Bar (if applicable) */}
        {hasDesigned && (
          <div>
            <div className="flex justify-between text-xs font-mono text-[var(--color-muted)] mb-1">
              <span>PLANNED DESIGN: {designed.label}</span>
              <span className="text-white font-medium">
                {designed.value} {designed.unit}
              </span>
            </div>
            <svg
              className="w-full h-4 rounded-full overflow-hidden bg-white/5"
              preserveAspectRatio="none"
              role="img"
              aria-label={`Planned life: ${designed.value} ${designed.unit}`}
            >
              <rect
                x="0"
                y="0"
                width={`${designedPct}%`}
                height="100%"
                rx="4"
                fill="rgba(138, 147, 168, 0.45)"
              />
            </svg>
          </div>
        )}

        {/* Actual Bar */}
        <div>
          <div className="flex justify-between text-xs font-mono text-[var(--color-muted)] mb-1">
            <span>ACTUAL OPERATIONS: {actual.label}</span>
            <span className="text-[var(--color-signal-amber)] font-bold">
              {actual.value} {actual.unit}
            </span>
          </div>
          <svg
            className="w-full h-5 rounded-full overflow-hidden bg-white/5"
            preserveAspectRatio="none"
            role="img"
            aria-label={`Actual life: ${actual.value} ${actual.unit}`}
          >
            <defs>
              <linearGradient id={`actualGradient-${machineSlug || 'default'}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffb020" />
                <stop offset="100%" stopColor="#e4572e" />
              </linearGradient>
            </defs>
            <rect
              x="0"
              y="0"
              width={`${actualPct}%`}
              height="100%"
              rx="4"
              fill={`url(#actualGradient-${machineSlug || 'default'})`}
            />
          </svg>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-muted)]">
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-signal-amber)] underline underline-offset-2"
        >
          NASA Mission Records Source ↗
        </a>
        {machineSlug && (
          <Link
            href={`/machines/${machineSlug}`}
            className="font-mono text-[var(--color-signal-amber)] hover:underline"
          >
            Full telemetry →
          </Link>
        )}
      </div>
    </div>
  );
}
