"use client";

import { useState } from "react";
import Link from "next/link";
import { MACHINES } from "@/data/machines";
import { Destination } from "@/data/types";
import { Radio, Moon, Compass, Rocket, Sparkles, Filter } from "lucide-react";
import { sound } from "@/lib/audio";

export default function SilenceTimeline() {
  const [activeFilter, setActiveFilter] = useState<"All" | Destination>("All");

  // Filter machines
  const filteredMachines = MACHINES.filter((m) => {
    if (activeFilter === "All") return true;
    return m.destination === activeFilter;
  });

  const getDestinationColor = (dest: Destination) => {
    switch (dest) {
      case "Moon":
        return "text-[var(--color-moon-silver)] border-[var(--color-moon-silver)]/40 bg-[var(--color-moon-silver)]/10";
      case "Mars":
        return "text-[var(--color-mars-rust)] border-[var(--color-mars-rust)]/40 bg-[var(--color-mars-rust)]/10";
      case "Deep space":
        return "text-[var(--color-deep-space-violet)] border-[var(--color-deep-space-violet)]/40 bg-[var(--color-deep-space-violet)]/10";
    }
  };

  return (
    <section id="timeline" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[var(--color-border)] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] mb-2">
            <Radio className="w-4 h-4" />
            <span>CHRONOLOGY OF TRANSMISSIONS (1967 – NOW)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)]">
            The Silence Timeline
          </h2>
          <p className="text-base text-[var(--color-muted)] mt-1 max-w-xl">
            Six machines went dark in the quiet of space. Two remain active across billions of miles.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="mt-6 md:mt-0 flex flex-wrap gap-2 items-center" role="group" aria-label="Filter machines by destination">
          <span className="text-xs font-mono text-[var(--color-muted)] mr-1 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1" /> Filters:
          </span>
          {(["All", "Moon", "Mars", "Deep space"] as const).map((filter) => {
            const isSelected = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  setActiveFilter(filter);
                  sound.playTelemetryBlip(800, 30);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  isSelected
                    ? "bg-[var(--color-signal-amber)] text-black font-semibold shadow-md"
                    : "bg-[var(--color-surface)] text-[var(--color-muted)] border border-[var(--color-border)] hover:border-[var(--color-border-glow)] hover:text-white"
                }`}
                aria-pressed={isSelected}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline Layout */}
      {/* Desktop Horizontal Track (visible on lg screens) */}
      <div className="hidden lg:block relative py-12">
        {/* Timeline Axis Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-white/10 via-[var(--color-signal-amber)]/40 to-[var(--color-alive-cyan)]/60 -translate-y-1/2 pointer-events-none" />

        <div className="grid grid-cols-8 gap-4 relative z-10">
          {filteredMachines.map((m, idx) => {
            const isAlive = m.status === "still-talking" || m.status === "still-answering";
            const colorClass = getDestinationColor(m.destination);

            return (
              <Link
                key={m.slug}
                href={`/machines/${m.slug}`}
                onMouseEnter={() => sound.playTelemetryBlip(600 + idx * 80, 25)}
                className="group relative flex flex-col items-center focus:outline-none"
              >
                {/* Year Label top */}
                <span className="font-mono text-xs text-[var(--color-muted)] group-hover:text-white mb-4 transition-colors">
                  {m.lastSignalISO ? new Date(m.lastSignalISO).getFullYear() : "NOW"}
                </span>

                {/* Node circle */}
                <div
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all transform group-hover:scale-110 ${
                    isAlive
                      ? "border-[var(--color-alive-cyan)] bg-[var(--color-surface)] shadow-[0_0_15px_rgba(62,230,195,0.4)]"
                      : "border-white/20 bg-[var(--color-surface)] group-hover:border-[var(--color-signal-amber)]"
                  }`}
                >
                  {isAlive ? (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-alive-cyan)] opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-alive-cyan)]" />
                    </span>
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-white/30 group-hover:bg-[var(--color-signal-amber)] transition-colors" />
                  )}
                </div>

                {/* Card preview below */}
                <div className="mt-4 p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] group-hover:border-[var(--color-border-glow)] group-hover:bg-[var(--color-surface-elevated)] transition-all w-full text-center">
                  <div className="flex items-center justify-center mb-1">
                    <span
                      className={`inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded border ${colorClass}`}
                    >
                      {m.destination === "Moon" && <Moon className="w-2.5 h-2.5 mr-1" />}
                      {m.destination === "Mars" && <Compass className="w-2.5 h-2.5 mr-1" />}
                      {m.destination === "Deep space" && <Rocket className="w-2.5 h-2.5 mr-1" />}
                      {m.destination}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xs text-[var(--color-text)] group-hover:text-[var(--color-signal-amber)] line-clamp-1 transition-colors">
                    {m.name}
                  </h3>

                  <div className="mt-2 text-[10px] font-mono">
                    {isAlive ? (
                      <span className="text-[var(--color-alive-cyan)] font-medium">● ACTIVE</span>
                    ) : (
                      <span className="text-[var(--color-muted)]">○ SILENT</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile & Tablet Vertical Timeline (< lg screens) */}
      <div className="lg:hidden relative pl-6 border-l-2 border-[var(--color-border)] space-y-8 my-6">
        {filteredMachines.map((m, idx) => {
          const isAlive = m.status === "still-talking" || m.status === "still-answering";
          const colorClass = getDestinationColor(m.destination);

          return (
            <div key={m.slug} className="relative group">
              {/* Node dot on the left line */}
              <div
                className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 ${
                  isAlive
                    ? "border-[var(--color-alive-cyan)] bg-[var(--color-alive-cyan)] shadow-[0_0_10px_rgba(62,230,195,0.6)]"
                    : "border-white/30 bg-[var(--color-void)] group-hover:border-[var(--color-signal-amber)]"
                }`}
              />

              {/* Card link */}
              <Link
                href={`/machines/${m.slug}`}
                onClick={() => sound.playTelemetryBlip(700 + idx * 50, 30)}
                className="block p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-glow)] hover:bg-[var(--color-surface-elevated)] transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`inline-flex items-center text-xs font-mono px-2 py-0.5 rounded border ${colorClass}`}
                  >
                    {m.destination === "Moon" && <Moon className="w-3 h-3 mr-1" />}
                    {m.destination === "Mars" && <Compass className="w-3 h-3 mr-1" />}
                    {m.destination === "Deep space" && <Rocket className="w-3 h-3 mr-1" />}
                    {m.destination}
                  </span>

                  <span className="font-mono text-xs text-[var(--color-muted)]">
                    {m.lastSignalISO
                      ? `Silent: ${new Date(m.lastSignalISO).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}`
                      : "Still Talking"}
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <h3 className="font-display font-bold text-lg text-[var(--color-text)] group-hover:text-[var(--color-signal-amber)] transition-colors">
                    {m.name}
                  </h3>

                  {isAlive ? (
                    <span className="flex items-center text-xs font-mono text-[var(--color-alive-cyan)]">
                      <Sparkles className="w-3.5 h-3.5 mr-1" /> Pulse active
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-[var(--color-muted)]">
                      {m.lastSignalLabel}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[var(--color-muted)] mt-1.5 line-clamp-2">
                  {m.oneLiner}
                </p>

                <div className="mt-3 pt-2.5 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--color-signal-amber)] group-hover:underline">
                    Listen to final log →
                  </span>
                  <span className="text-[var(--color-muted)]">
                    {m.designed.value} {m.designed.unit} vs {m.actual.value} {m.actual.unit}
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
