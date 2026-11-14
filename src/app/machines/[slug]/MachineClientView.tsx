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
import StoryStage from "@/components/kids/StoryStage";
import GameModal, { GameType } from "@/components/kids/games/GameModal";
import SceneBackdrop, { SceneType } from "@/components/kids/SceneBackdrop";
import MachineIllustration from "@/components/kids/MachineIllustration";
import { useMode } from "@/context/ModeContext";
import {
  Share2,
  Check,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Moon,
  Compass,
  Rocket,
  Info,
  Layers,
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
  const { mode } = useMode();
  const [logProgress, setLogProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeGame, setActiveGame] = useState<GameType | null>(null);

  const isAlive = machine.status === "still-talking" || machine.status === "still-answering";

  // Map machine to corresponding mini-game if any
  let machineGame: GameType | null = null;
  let gameLabel = "Play Mini-Game";
  if (machine.slug === "opportunity" || machine.slug === "insight") {
    machineGame = "wipe-dust";
    gameLabel = "Wipe the Dust";
  } else if (machine.slug === "ingenuity") {
    machineGame = "fly-ingenuity";
    gameLabel = "Fly Ingenuity";
  } else if (machine.slug === "voyager-1" || machine.slug === "pioneer-10") {
    machineGame = "catch-signal";
    gameLabel = "Catch the Signal";
  } else if (machine.slug === "apollo-11-laser-reflector") {
    machineGame = "moon-echo";
    gameLabel = "Fire Moon Laser";
  }

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

  // Detailed Grown-Up Facts Content Component
  const detailedGrownUpContent = (
    <div className="space-y-12 text-left">
      {/* 1. Plain-English Summary banner */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 flex items-start space-x-3">
        <Info className="w-5 h-5 text-[var(--color-signal-amber)] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white">Summary for Researchers & Educators: </span>
          <span>{machine.oneLiner}</span>
        </div>
      </div>

      {/* 2. Built for X, Lasted Y Bar */}
      <div>
        <div className="text-xs font-mono text-[var(--color-signal-amber)] uppercase mb-2">
          Engineering Endurance
        </div>
        <BuiltForLastedBar
          designed={machine.designed}
          actual={machine.actual}
          machineName={machine.name}
          machineSlug={machine.slug}
          sourceUrl={machine.sources[0]?.url}
        />
      </div>

      {/* 3. Silence Clock + Signal Visualizer */}
      <div className="space-y-4">
        <div className="text-xs font-mono text-[var(--color-signal-amber)] uppercase">
          Transmission Latency & Elapsed Silence
        </div>
        <SilenceClock machine={machine} />
        <SignalVisualizer status={machine.status} scrollProgress={logProgress} />
      </div>

      {/* 4. FINAL LOG (Terminal typewriter) */}
      <div>
        <div className="text-xs font-mono text-[var(--color-signal-amber)] uppercase mb-2">
          Historical Mission Telemetry Log
        </div>
        <FinalLog finalLog={machine.finalLog} onProgress={setLogProgress} />
      </div>

      {/* 5. WHAT REALLY HAPPENED (Fact-by-fact mapping) */}
      <div>
        <div className="text-xs font-mono text-[var(--color-signal-amber)] uppercase mb-2">
          Primary Mission Milestones
        </div>
        <WhatReallyHappened
          facts={machine.whatReallyHappened}
          machineSlug={machine.slug}
        />
      </div>

      {/* 6. THEN & NOW (Interactive slider) */}
      <div>
        <div className="text-xs font-mono text-[var(--color-signal-amber)] uppercase mb-2">
          Surface Imagery (Then & Now)
        </div>
        <ThenNowSlider images={machine.images} machineName={machine.name} />
      </div>

      {/* 7. THE SCIENCE IT MADE POSSIBLE */}
      <div>
        <div className="text-xs font-mono text-[var(--color-signal-amber)] uppercase mb-2">
          Scientific Impact
        </div>
        <ScienceCards
          science={machine.science}
          tryIt={machine.tryIt}
          machineName={machine.name}
        />
      </div>

      {/* 8. MISSION DEBRIEF QUIZ */}
      <div>
        <Quiz
          quiz={machine.quiz}
          machineSlug={machine.slug}
          machineName={machine.name}
        />
      </div>

      {/* 9. PRIMARY SOURCES & CITATIONS */}
      <section className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
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
    </div>
  );

  // If in Little Explorers mode: show the full picture book first, with Grown-Up facts accordion below
  if (mode === "kids") {
    return (
      <>
        <StoryStage
          machine={machine}
          prevMachine={prevMachine}
          nextMachine={nextMachine}
          hasGame={machineGame !== null}
          gameLabel={gameLabel}
          onPlayGame={() => setActiveGame(machineGame)}
          grownUpChildren={detailedGrownUpContent}
        />

        {/* Mini Game Modal */}
        <GameModal
          game={activeGame}
          machineSlug={machine.slug}
          onClose={() => setActiveGame(null)}
        />
      </>
    );
  }

  // ==============================================================
  // Mission Control Mode (Detailed telemetry, enhanced with backdrop & illustration)
  // ==============================================================
  const sceneType: SceneType =
    machine.destination === "Moon"
      ? "moon"
      : machine.destination === "Mars"
      ? "mars"
      : "space";

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

      {/* Hero Header with SceneBackdrop and Hardware Illustration (Face OFF) */}
      <header className="relative rounded-3xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10 mb-8 shadow-2xl">
        <SceneBackdrop scene={sceneType} className="opacity-40" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
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
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg border border-[var(--color-border)] text-xs font-mono text-[var(--color-muted)] hover:text-white hover:border-[var(--color-border-glow)] transition-colors cursor-pointer"
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
                  <span>SHARE TELEMETRY</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-3">
                {machine.name}
              </h1>
              <p className="text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl">
                {machine.oneLiner}
              </p>
            </div>

            {/* Hardware Illustration (Faces OFF in Mission Control) */}
            <div className="flex justify-center md:justify-end">
              <MachineIllustration
                slug={machine.slug}
                mood={isAlive ? "glow" : "awake"}
                size={220}
                face={false}
                photoSrc={machine.images[0]?.src}
                photoAlt={machine.images[0]?.alt}
                photoCredit={machine.images[0]?.credit}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Render detailed telemetry sections */}
      {detailedGrownUpContent}

      {/* Circular Pager: Previous / Next Machine Navigation in Chronological Order */}
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
