"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Radio, Sparkles } from "lucide-react";
import { sound } from "@/lib/audio";

export default function OscilloscopeHero() {
  const [pulsed, setPulsed] = useState(false);

  useEffect(() => {
    // Trigger faint pulse shortly after mount
    const timer = setTimeout(() => {
      setPulsed(true);
      sound.playCarrierPulse();
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-[var(--color-surface)]/40 via-transparent to-transparent pointer-events-none" />

      {/* Oscilloscope Waveform Display */}
      <div className="w-full max-w-2xl mb-8 relative">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--color-muted)] mb-2 px-2">
          <span className="flex items-center space-x-1.5">
            <Radio className="w-3.5 h-3.5 text-[var(--color-signal-amber)] animate-pulse" />
            <span>CHANNEL: DEEP SPACE NETWORK</span>
          </span>
          <span className="tracking-widest">CARRIER: 2.295 GHz</span>
        </div>

        {/* SVG Oscilloscope screen */}
        <div className="h-28 w-full bg-[#030508] border border-[var(--color-border)] rounded-lg p-2 relative shadow-inner overflow-hidden flex items-center justify-center">
          {/* Subtle grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          {/* Center line with animated pulse */}
          <svg
            className="w-full h-full"
            viewBox="0 0 600 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Flat line with single pulse in middle */}
            <path
              d={
                pulsed
                  ? "M 0 50 L 220 50 Q 235 50 240 45 L 255 15 L 270 85 L 285 20 L 300 75 L 315 35 L 330 65 L 345 48 L 360 52 L 375 50 L 600 50"
                  : "M 0 50 L 600 50"
              }
              fill="none"
              stroke="#ffb020"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={pulsed ? "transition-all duration-700 ease-out" : ""}
            />
          </svg>

          {/* CRT scanline sheen */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Main Titles */}
      <div className="max-w-3xl space-y-6 z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[var(--color-signal-amber)]/30 bg-[var(--color-surface)]/70 text-xs font-mono text-[var(--color-signal-amber)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>NASA SPACE APPS CHALLENGE 2026</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--color-text)]">
          LAST WORDS
        </h1>

        <p className="text-xl sm:text-2xl text-[var(--color-text)]/90 font-light leading-relaxed max-w-2xl mx-auto">
          "Every machine NASA left behind said something before it went quiet."
        </p>

        <p className="text-base text-[var(--color-muted)] max-w-xl mx-auto leading-relaxed">
          From the cratered plains of the Moon to the windswept sands of Mars and the cold interstellar void, explore 8 missions that shaped human science before falling silent.
        </p>
      </div>

      {/* Scroll Cue */}
      <div className="mt-14 z-10">
        <a
          href="#timeline"
          className="inline-flex flex-col items-center group text-xs font-mono text-[var(--color-signal-amber)] hover:text-white transition-colors"
        >
          <span className="mb-2 tracking-wider">8 MACHINES. 8 FINAL SIGNALS. START LISTENING.</span>
          <div className="w-8 h-8 rounded-full border border-[var(--color-signal-amber)]/40 flex items-center justify-center group-hover:border-[var(--color-signal-amber)] group-hover:translate-y-1 transition-all">
            <ArrowDown className="w-4 h-4 animate-bounce text-[var(--color-signal-amber)]" />
          </div>
        </a>
      </div>
    </section>
  );
}
