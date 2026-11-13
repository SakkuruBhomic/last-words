import Link from "next/link";
import { Radio, ArrowLeft, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-2xl border border-[var(--color-signal-amber)]/40 bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-signal-amber)] mb-6 shadow-2xl">
        <Radio className="w-8 h-8 animate-pulse" />
      </div>

      <div className="inline-flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] px-3 py-1 rounded-full border border-[var(--color-signal-amber)]/30 bg-[var(--color-surface)] mb-4">
        <AlertTriangle className="w-3.5 h-3.5" />
        <span>TELEMETRY ERROR 404 // CARRIER SIGNAL LOST</span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 font-display">
        Signal Lost in the Deep Void
      </h1>

      <p className="text-sm sm:text-base text-[var(--color-muted)] max-w-md mb-8 leading-relaxed">
        The coordinates you transmitted do not match any known NASA hardware on the Moon, Mars, or deep space. The antenna returned only static noise.
      </p>

      {/* SVG static oscilloscope */}
      <div className="w-full max-w-md h-16 bg-black/60 rounded-xl border border-white/10 mb-8 p-2 flex items-center justify-center overflow-hidden">
        <svg className="w-full h-8 opacity-40" viewBox="0 0 300 30">
          <path
            d="M 0 15 Q 10 5, 20 25 T 40 10 T 60 20 T 80 5 T 100 25 T 120 15 T 140 10 T 160 25 T 180 5 T 200 20 T 220 10 T 240 25 T 260 5 T 280 20 T 300 15"
            fill="none"
            stroke="#ffb020"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <Link
        href="/"
        className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[var(--color-signal-amber)] text-black font-mono font-bold text-xs hover:opacity-90 transition-all shadow-xl"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Mission Control (Home)</span>
      </Link>
    </div>
  );
}
