"use client";

import { useEffect, useState } from "react";
import { MachineStatus } from "@/data/types";

interface SignalVisualizerProps {
  status: MachineStatus;
  scrollProgress?: number; // 0 (start of log) to 1 (end of log / flatline)
}

export default function SignalVisualizer({
  status,
  scrollProgress = 0,
}: SignalVisualizerProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [pulsePhase, setPulsePhase] = useState(0);

  const isAlive = status === "still-talking" || status === "still-answering";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, []);

  // For alive machines, animate continuous heartbeat
  useEffect(() => {
    if (!isAlive || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setPulsePhase((p) => (p + 1) % 60);
    }, 50);
    return () => clearInterval(interval);
  }, [isAlive, prefersReducedMotion]);

  // Compute amplitude decay based on scrollProgress
  // When scrollProgress is 0: full waveform (amplitude 30)
  // When scrollProgress approaches 1: decays to flat line (amplitude 0)
  const amplitude = isAlive ? 28 : Math.max(0, 30 * (1 - scrollProgress));
  const strokeColor = isAlive ? "#3EE6C3" : "#FFB020";

  // Generate dynamic SVG path
  const points: string[] = [];
  const width = 600;
  const height = 80;
  const centerY = height / 2;

  for (let x = 0; x <= width; x += 10) {
    if (prefersReducedMotion) {
      points.push(`${x},${centerY}`);
      continue;
    }

    let y = centerY;
    if (x > 180 && x < 420) {
      const normalizedX = (x - 180) / 240; // 0 to 1
      const envelope = Math.sin(normalizedX * Math.PI); // peak in center
      const frequency = isAlive ? 14 : 10;
      const phase = isAlive ? pulsePhase * 0.2 : 0;
      const wave = Math.sin(normalizedX * Math.PI * frequency + phase);
      y = centerY - wave * amplitude * envelope;
    }
    points.push(`${x},${y.toFixed(1)}`);
  }

  const pathD = `M ${points.join(" L ")}`;

  return (
    <div className="w-full my-6 bg-[#04060b] border border-[var(--color-border)] rounded-xl p-3 relative overflow-hidden shadow-inner">
      <div className="flex items-center justify-between text-[11px] font-mono text-[var(--color-muted)] mb-1 px-2">
        <span className="flex items-center space-x-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              isAlive ? "bg-[var(--color-alive-cyan)] animate-ping" : "bg-[var(--color-signal-amber)]"
            }`}
          />
          <span>SIGNAL VISUALIZER: {isAlive ? "TRANSMITTING" : "CARRIER DECAY MONITOR"}</span>
        </span>
        <span>
          {isAlive
            ? "CONTINUOUS CARRIER WAVE"
            : scrollProgress > 0.85
            ? "SIGNAL TERMINATED (0.00 dB)"
            : `DECAY: ${(scrollProgress * 100).toFixed(0)}%`}
        </span>
      </div>

      {/* Waveform SVG */}
      <div className="h-20 w-full flex items-center justify-center relative">
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        <svg
          className="w-full h-full"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          role="img"
          aria-label={
            isAlive
              ? "Active pulsating carrier waveform"
              : `Decaying carrier signal waveform, currently at ${Math.round((1 - scrollProgress) * 100)} percent power`
          }
        >
          {/* Subtle center guide */}
          <line
            x1="0"
            y1={centerY}
            x2={width}
            y2={centerY}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeDasharray="4 4"
            strokeWidth="1"
          />

          <path
            d={pathD}
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* CRT Scanline effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.015] via-transparent to-white/[0.015] pointer-events-none" />
      </div>

      <div className="text-[10px] font-mono text-[var(--color-muted)] text-right px-2 mt-1">
        {isAlive ? "PULSE STATUS: NOMINAL" : "Scroll down through Final Log to observe signal cutoff"}
      </div>
    </div>
  );
}
