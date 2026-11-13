"use client";

import { useState } from "react";
import Link from "next/link";
import { Machine } from "@/data/types";
import SilenceClock from "@/components/SilenceClock";
import SignalVisualizer from "@/components/SignalVisualizer";
import FinalLog from "@/components/FinalLog";
import WhatReallyHappened from "@/components/WhatReallyHappened";
import ThenNowSlider from "@/components/ThenNowSlider";
import ScienceCards from "@/components/ScienceCards";
import Quiz from "@/components/Quiz";
import BuiltForLastedBar from "@/components/BuiltForLastedBar";
import {
  Share2,
  Check,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Moon,
  Compass,
  Rocket,
} from "lucide-react";

interface MachineClientViewProps {
  machine: Machine;
  prevMachine: Machine;
  nextMachine: Machine;
}

export default function MachineClientView({
  machine,
  prevMachine,
  nextMachine,
}: MachineClientViewProps) {
  const [logProgress, setLogProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const isAlive = machine.status === "still-talking" || machine.status === "still-answering";

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = `${machine.name} | LAST WORDS`;
    const text = `Read the final transmission log and scientific legacy of NASA's ${machine.name}.`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // User cancelled or unsupported
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard access error
    }
  };

  const launchYear = new Date(machine.launchISO).getFullYear();
  const endYear = machine.lastSignalISO
    ? new Date(machine.lastSignalISO).getFullYear()
    : "PRESENT";

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back to Timeline Link */}
      <div className="mb-6">
        <Link
          href="/#timeline"
          className="inline-flex items-center space-x-2 text-xs font-mono text-[var(--color-muted)] hover:text-[var(--color-signal-amber)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO THE SILENCE TIMELINE</span>
        </Link>
      </div>

      {/* 1. Header */}
      <header className="border-b border-[var(--color-border)] pb-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            {/* Destination Chip */}
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono border border-white/20 bg-white/5 text-[var(--color-text)]">
              {machine.destination === "Moon" && <Moon className="w-3.5 h-3.5" />}
              {machine.destination === "Mars" && <Compass className="w-3.5 h-3.5" />}
              {machine.destination === "Deep space" && <Rocket className="w-3.5 h-3.5" />}
              <span>{machine.destination}</span>
            </span>

            {/* Operational Years */}
            <span className="px-3 py-1 rounded-full text-xs font-mono border border-white/10 text-[var(--color-muted)]">
              {launchYear} – {endYear}
            </span>

            {/* Status Chip */}
            <span
              className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${
                isAlive
                  ? "border-[var(--color-alive-cyan)] text-[var(--color-alive-cyan)] bg-[var(--color-alive-cyan)]/10"
                  : "border-white/20 text-[var(--color-muted)] bg-white/5"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isAlive ? "bg-[var(--color-alive-cyan)] animate-ping" : "bg-white/40"
                }`}
              />
              <span>
                {machine.status === "silent"
                  ? "SILENT"
                  : machine.status === "still-talking"
                  ? "STILL TALKING"
                  : "STILL ANSWERING"}
              </span>
            </span>
          </div>

          {/* Share Button with Fallback */}
          <button
            onClick={handleShare}
            type="button"
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg border border-[var(--color-border)] text-xs font-mono text-[var(--color-muted)] hover:text-white hover:border-[var(--color-border-glow)] transition-colors"
            aria-label={`Share ${machine.name} transmission page`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">LINK COPIED!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>SHARE TRANSMISSION</span>
              </>
            )}
          </button>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-3">
          {machine.name}
        </h1>

        <p className="text-lg sm:text-xl text-[var(--color-muted)] leading-relaxed max-w-3xl">
          {machine.oneLiner}
        </p>
      </header>

      {/* 2. Built for X, Lasted Y Bar */}
      <div className="mb-8">
        <BuiltForLastedBar
          designed={machine.designed}
          actual={machine.actual}
          machineName={machine.name}
        />
      </div>

      {/* 3. Silence Clock + Signal Visualizer */}
      <div className="space-y-4 mb-8">
        <SilenceClock machine={machine} />
        <SignalVisualizer status={machine.status} scrollProgress={logProgress} />
      </div>

      {/* 4. FINAL LOG (Terminal typewriter) */}
      <FinalLog finalLog={machine.finalLog} onProgress={setLogProgress} />

      {/* 5. WHAT REALLY HAPPENED (Fact-by-fact mapping) */}
      <WhatReallyHappened
        facts={machine.whatReallyHappened}
        machineSlug={machine.slug}
      />

      {/* 6. THEN & NOW (Interactive keyboard slider) */}
      <ThenNowSlider images={machine.images} machineName={machine.name} />

      {/* 7. THE SCIENCE IT MADE POSSIBLE */}
      <ScienceCards
        science={machine.science}
        tryIt={machine.tryIt}
        machineName={machine.name}
      />

      {/* 8. MISSION QUIZ */}
      <Quiz
        quiz={machine.quiz}
        machineSlug={machine.slug}
        machineName={machine.name}
      />

      {/* 9. PRIMARY SOURCES & FOOTNOTES */}
      <section className="my-12 p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <h3 className="font-mono text-xs text-[var(--color-signal-amber)] uppercase tracking-wider mb-3">
          PRIMARY NASA CITATIONS & HISTORICAL SOURCES
        </h3>
        <ul className="space-y-2 mb-6">
          {machine.sources.map((s, idx) => (
            <li key={idx} className="text-sm">
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text)] hover:text-[var(--color-signal-amber)] inline-flex items-center underline decoration-white/20 hover:decoration-[var(--color-signal-amber)]"
              >
                <span>{s.label}</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1.5 opacity-70" />
              </a>
              <span className="text-xs font-mono text-[var(--color-muted)] block sm:inline sm:ml-2">
                ({s.url})
              </span>
            </li>
          ))}
        </ul>

        {machine.footnotes && machine.footnotes.length > 0 && (
          <div className="pt-4 border-t border-[var(--color-border)]">
            <span className="font-mono text-[11px] text-[var(--color-muted)] uppercase tracking-wider block mb-2">
              HISTORICAL FOOTNOTES & DATA NUANCES:
            </span>
            <ul className="space-y-1.5 text-xs text-[var(--color-muted)] list-disc pl-4">
              {machine.footnotes.map((fn, fIdx) => (
                <li key={fIdx}>{fn}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* 10. Previous / Next Machine Navigation */}
      <nav
        className="my-12 pt-8 border-t border-[var(--color-border)] grid grid-cols-1 sm:grid-cols-2 gap-4"
        aria-label="Previous and next machine navigation"
      >
        <Link
          href={`/machines/${prevMachine.slug}`}
          className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-glow)] transition-all flex items-center space-x-3 group"
        >
          <ArrowLeft className="w-5 h-5 text-[var(--color-signal-amber)] group-hover:-translate-x-1 transition-transform" />
          <div className="text-left">
            <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase block">
              PREVIOUS TRANSMISSION
            </span>
            <span className="font-display font-bold text-sm text-white group-hover:text-[var(--color-signal-amber)] transition-colors">
              {prevMachine.name} ({prevMachine.destination})
            </span>
          </div>
        </Link>

        <Link
          href={`/machines/${nextMachine.slug}`}
          className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-glow)] transition-all flex items-center justify-end space-x-3 group text-right"
        >
          <div>
            <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase block">
              NEXT TRANSMISSION
            </span>
            <span className="font-display font-bold text-sm text-white group-hover:text-[var(--color-signal-amber)] transition-colors">
              {nextMachine.name} ({nextMachine.destination})
            </span>
          </div>
          <ArrowRight className="w-5 h-5 text-[var(--color-signal-amber)] group-hover:translate-x-1 transition-transform" />
        </Link>
      </nav>
    </article>
  );
}
