"use client";

import { useState, useEffect } from "react";
import { FinalLog as FinalLogType } from "@/data/types";
import { Terminal, FastForward, Info, ChevronDown, ChevronUp } from "lucide-react";
import { sound } from "@/lib/audio";

interface FinalLogProps {
  finalLog: FinalLogType;
  onProgress?: (progress: number) => void;
}

export default function FinalLog({ finalLog, onProgress }: FinalLogProps) {
  const [displayedLineCount, setDisplayedLineCount] = useState(0);
  const [isSkipped, setIsSkipped] = useState(false);
  const [whyNoteOpen, setWhyNoteOpen] = useState(false);

  const totalLines = finalLog.lines.length;

  useEffect(() => {
    if (isSkipped) {
      setDisplayedLineCount(totalLines);
      if (onProgress) onProgress(1);
      return;
    }

    // Step-by-step typewriter progression line by line
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setDisplayedLineCount(current);
      sound.playTypewriterClick();
      if (onProgress) onProgress(Math.min(1, current / totalLines));

      if (current >= totalLines) {
        clearInterval(interval);
      }
    }, 650);

    return () => clearInterval(interval);
  }, [totalLines, isSkipped, onProgress]);

  const handleSkip = () => {
    setIsSkipped(true);
    setDisplayedLineCount(totalLines);
    if (onProgress) onProgress(1);
    sound.playTelemetryBlip(900, 40);
  };

  return (
    <div className="my-8 rounded-xl border border-[var(--color-signal-amber)]/30 bg-[#060913] p-6 shadow-2xl relative overflow-hidden scanlines">
      {/* Monospace Terminal Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-white/10 gap-3">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-[var(--color-signal-amber)]" />
          <span className="font-mono text-xs font-bold text-[var(--color-signal-amber)] uppercase tracking-wider">
            FINAL TRANSMISSION LOG // {finalLog.stamp}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--color-signal-amber)]/10 text-[var(--color-signal-amber)] border border-[var(--color-signal-amber)]/20">
            DRAMATIZATION BASED ON REAL EVENTS
          </span>

          {!isSkipped && displayedLineCount < totalLines && (
            <button
              onClick={handleSkip}
              type="button"
              className="inline-flex items-center space-x-1 text-xs font-mono text-[var(--color-muted)] hover:text-white border border-white/10 px-2 py-0.5 rounded transition-colors"
              aria-label="Skip terminal typing animation"
            >
              <FastForward className="w-3 h-3" />
              <span>Skip</span>
            </button>
          )}
        </div>
      </div>

      {/* Screen Reader Full Accessible Text (Always available in DOM) */}
      <div className="sr-only" aria-live="off">
        <h3>Final Transmission Log (Dramatization based on real NASA events):</h3>
        {finalLog.lines.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
        <p>{finalLog.endTag}</p>
      </div>

      {/* Visual Monospace Typewriter Output */}
      <div className="font-mono text-sm sm:text-base text-gray-200 space-y-3.5 leading-relaxed py-2 min-h-[160px]" aria-hidden="true">
        {finalLog.lines.slice(0, displayedLineCount).map((line, index) => (
          <div key={index} className="flex items-start space-x-3 animate-in fade-in duration-200">
            <span className="text-[var(--color-signal-amber)]/60 select-none text-xs mt-1">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="flex-1">{line}</p>
          </div>
        ))}

        {/* End Tag */}
        {displayedLineCount >= totalLines && (
          <div className="pt-4 mt-4 border-t border-white/10 text-[var(--color-signal-amber)] font-bold tracking-widest text-xs sm:text-sm animate-in fade-in duration-300">
            {finalLog.endTag}
          </div>
        )}
      </div>

      {/* Expandable Pedagogical Note: Why do the machines talk? */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <button
          onClick={() => setWhyNoteOpen(!whyNoteOpen)}
          type="button"
          className="flex items-center justify-between w-full text-xs font-mono text-[var(--color-muted)] hover:text-[var(--color-signal-amber)] transition-colors text-left"
          aria-expanded={whyNoteOpen}
        >
          <span className="flex items-center space-x-1.5">
            <Info className="w-3.5 h-3.5 text-[var(--color-signal-amber)]" />
            <span className="font-medium">Why do the machines talk? (Read note on storytelling & facts)</span>
          </span>
          {whyNoteOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {whyNoteOpen && (
          <div className="mt-3 p-4 rounded-lg bg-[var(--color-surface)] border border-white/10 text-xs text-[var(--color-muted)] leading-relaxed space-y-2">
            <p>
              <strong className="text-white">Machines are made of metal, silicon, and solar panels — they are not alive.</strong> In space exploration, machines do not speak in words; they transmit numerical telemetry, voltages, temperatures, and images.
            </p>
            <p>
              We present these logs in the first person as a creative storytelling device so students and young scientists can connect emotionally with the incredible engineering journeys. Every single line in the log corresponds directly to a real event documented in NASA's mission flight records, detailed line-by-line below in <em>What really happened</em>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
