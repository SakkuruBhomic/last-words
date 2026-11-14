"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Machine } from "@/data/types";
import { KID_STORIES, KidStory } from "@/data/kidStories";
import SceneBackdrop, { SceneType, SceneVariant } from "@/components/kids/SceneBackdrop";
import MachineIllustration, { MachineMood } from "@/components/kids/MachineIllustration";
import Ping, { PingBubble } from "@/components/kids/Ping";
import WordBubble from "@/components/kids/WordBubble";
import KidQuiz from "@/components/kids/KidQuiz";
import { useNarration } from "@/context/NarrationContext";
import { useSound } from "@/context/SoundContext";
import { useStickers } from "@/context/StickerContext";
import { useMode } from "@/context/ModeContext";
import {
  ArrowLeft,
  ArrowRight,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Sparkles,
  Gamepad2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";
import confetti from "canvas-confetti";

interface StoryStageProps {
  machine: Machine;
  prevMachine: Machine;
  nextMachine: Machine;
  onPlayGame?: () => void;
  hasGame?: boolean;
  gameLabel?: string;
  grownUpChildren?: React.ReactNode;
}

export default function StoryStage({
  machine,
  prevMachine,
  nextMachine,
  onPlayGame,
  hasGame = false,
  gameLabel = "Play the mini-game",
  grownUpChildren,
}: StoryStageProps) {
  const story: KidStory = KID_STORIES[machine.slug] || {
    slug: machine.slug,
    title: machine.name,
    destination: machine.destination,
    initialMood: "awake",
    finalMood: "quiet",
    isActive: machine.status !== "silent",
    wowFact: machine.oneLiner,
    goodnightLine: `Goodnight, ${machine.name}!`,
    panels: [
      {
        panelIndex: 1,
        cue: "intro",
        text: `Hi! I'm ${machine.name}.`,
        factRef: "LAUNCH",
      },
    ],
    quiz: [],
  };

  const [currentPanelIndex, setCurrentPanelIndex] = useState(0); // 0 to 5
  const [isGoodnight, setIsGoodnight] = useState(false);
  const [readWholeStory, setReadWholeStory] = useState(false);
  const [showGrownUpFacts, setShowGrownUpFacts] = useState(false);

  const { speak, stop: stopSpeech, isSpeaking, isSupported: speechSupported } = useNarration();
  const { playPop, playWhoosh, playDing, soundEnabled, toggleSound } = useSound();
  const { unlockSticker } = useStickers();
  const { calmMode } = useMode();

  const totalPanels = story.panels.length;
  const currentPanel = story.panels[currentPanelIndex];

  // Map destination to SceneType
  const sceneType: SceneType =
    machine.destination === "Moon"
      ? "moon"
      : machine.destination === "Mars"
      ? "mars"
      : "space";

  const sceneVariant: SceneVariant = currentPanel?.sceneVariant || "day";

  // Determine current illustration mood based on panel progress
  const illustrationMood: MachineMood = isGoodnight
    ? story.finalMood
    : currentPanelIndex === 0
    ? story.initialMood
    : currentPanelIndex >= 4
    ? story.finalMood
    : "awake";

  // Stop narration on unmount or panel change
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, [currentPanelIndex, stopSpeech]);

  // Read current panel aloud
  const handleReadPanel = useCallback(() => {
    if (!currentPanel) return;
    speak(currentPanel.text, () => {
      if (readWholeStory && currentPanelIndex < totalPanels - 1) {
        setTimeout(() => {
          handleNext();
        }, 1200);
      }
    });
  }, [currentPanel, speak, readWholeStory, currentPanelIndex, totalPanels]);

  // Panel navigation
  const handleNext = useCallback(() => {
    playWhoosh();
    stopSpeech();
    if (currentPanelIndex < totalPanels - 1) {
      setCurrentPanelIndex((prev) => prev + 1);
    } else {
      // Reached Goodnight screen!
      setIsGoodnight(true);
      playDing();
      unlockSticker(machine.slug);
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#FFD34E", "#5BE3C0", "#FF8FB1", "#6CB8FF"],
        });
      } catch {
        // ignore
      }
    }
  }, [currentPanelIndex, totalPanels, playWhoosh, playDing, stopSpeech, unlockSticker, machine.slug]);

  const handlePrev = useCallback(() => {
    playWhoosh();
    stopSpeech();
    if (isGoodnight) {
      setIsGoodnight(false);
    } else if (currentPanelIndex > 0) {
      setCurrentPanelIndex((prev) => prev - 1);
    }
  }, [isGoodnight, currentPanelIndex, playWhoosh, stopSpeech]);

  const handleRestart = () => {
    playPop();
    stopSpeech();
    setIsGoodnight(false);
    setCurrentPanelIndex(0);
  };

  // Keyboard navigation (Arrow keys move panels, Space reads aloud)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === " " && !isGoodnight && speechSupported) {
        e.preventDefault();
        handleReadPanel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, handleReadPanel, isGoodnight, speechSupported]);

  // Highlight key terms in text using WordBubble
  const renderTextWithWordBubbles = (text: string) => {
    const glossaryWords = [
      "rover",
      "lander",
      "dust storm",
      "solar panel",
      "solar panels",
      "laser",
      "lasers",
      "Mars day",
      "nuclear battery",
      "shake sensor",
      "laser mirror",
      "moonquake",
      "Sun's bubble",
    ];

    // Simple replacement
    const words = text.split(" ");
    return words.map((w, idx) => {
      const clean = w.toLowerCase().replace(/[^a-z0-9]/g, "");
      const matched = glossaryWords.find((gw) => clean === gw.replace(/[^a-z0-9]/g, ""));

      if (matched) {
        return (
          <React.Fragment key={idx}>
            <WordBubble wordKey={matched}>{w}</WordBubble>{" "}
          </React.Fragment>
        );
      }
      return <React.Fragment key={idx}>{w} </React.Fragment>;
    });
  };

  return (
    <div className="relative flex flex-col min-h-[calc(100vh-4.5rem)] text-white overflow-hidden pb-16">
      {/* 1. Immersive Layered Scene Backdrop */}
      <SceneBackdrop
        scene={sceneType}
        variant={sceneVariant}
        showFootprints={currentPanel?.cue === "footprints"}
      />

      {/* Screen Reader Full Transcript (Visually Hidden) */}
      <div className="sr-only">
        <h2>{story.title} complete story</h2>
        {story.panels.map((p) => (
          <p key={p.panelIndex}>
            Panel {p.panelIndex}: {p.text}
          </p>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-between pt-4">
        {/* Top Navigation & Status Bar */}
        <div className="flex items-center justify-between py-2 border-b border-white/10 shrink-0">
          <Link
            href="/#neighborhood"
            onClick={playPop}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0B1033]/80 border border-white/15 text-sm font-display font-medium text-gray-200 hover:text-white hover:border-[#5BE3C0] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Space Friends</span>
          </Link>

          {/* 6 Progress Dots */}
          <div className="flex items-center space-x-2" role="tablist" aria-label="Story panels">
            {story.panels.map((p, idx) => (
              <button
                key={p.panelIndex}
                type="button"
                role="tab"
                aria-selected={currentPanelIndex === idx && !isGoodnight}
                aria-label={`Go to story panel ${p.panelIndex}`}
                onClick={() => {
                  playPop();
                  stopSpeech();
                  setIsGoodnight(false);
                  setCurrentPanelIndex(idx);
                }}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all cursor-pointer ${
                  isGoodnight
                    ? "bg-[#5BE3C0]"
                    : currentPanelIndex === idx
                    ? "bg-[#FFD34E] scale-125 shadow-[0_0_12px_#FFD34E]"
                    : currentPanelIndex > idx
                    ? "bg-[#5BE3C0]"
                    : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Read Aloud & Sound Controls */}
          <div className="flex items-center space-x-2">
            {speechSupported ? (
              <button
                type="button"
                onClick={handleReadPanel}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-display font-bold border transition-all ${
                  isSpeaking
                    ? "border-[#5BE3C0] bg-[#5BE3C0] text-black shadow-lg"
                    : "border-white/15 bg-white/5 text-gray-200 hover:text-white hover:border-[#5BE3C0]"
                }`}
                title="Read this panel aloud"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {isSpeaking ? "Reading..." : "Read to me"}
                </span>
              </button>
            ) : (
              <span className="text-[11px] text-gray-400 hidden sm:inline">
                Ask a grown-up to read with you!
              </span>
            )}

            <button
              type="button"
              onClick={() => {
                playPop();
                toggleSound();
              }}
              className="p-2 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:text-white"
              title={soundEnabled ? "Mute sounds" : "Enable sounds"}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#5BE3C0]" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* Middle Stage: Machine Illustration with Cue Animation */}
        {/* ============================================================== */}
        <div className="my-auto py-4 flex flex-col items-center justify-center">
          {!isGoodnight ? (
            <div className="w-full max-w-lg flex flex-col items-center">
              <MachineIllustration
                slug={machine.slug}
                mood={illustrationMood}
                size={340}
                face={true}
                cue={currentPanel?.cue}
                photoSrc={machine.images[0]?.src}
                photoAlt={machine.images[0]?.alt}
                photoCredit={machine.images[0]?.credit}
              />
            </div>
          ) : (
            // ==============================================================
            // Final Goodnight Screen
            // ==============================================================
            <div className="w-full max-w-2xl text-center p-6 sm:p-10 rounded-3xl bg-[#0B1033]/90 border-4 border-[#5BE3C0]/40 shadow-2xl animate-pop-in">
              <div className="flex justify-center mb-4">
                <MachineIllustration
                  slug={machine.slug}
                  mood={story.finalMood}
                  size={260}
                  face={true}
                  photoSrc={machine.images[1]?.src || machine.images[0]?.src}
                  photoAlt={machine.images[1]?.alt || machine.images[0]?.alt}
                  photoCredit={machine.images[1]?.credit || machine.images[0]?.credit}
                />
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FFD34E]/20 text-[#FFD34E] text-xs font-display font-bold mb-3 border border-[#FFD34E]/30">
                <Star className="w-3.5 h-3.5 fill-[#FFD34E]" />
                <span>NEW STICKER UNLOCKED!</span>
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-3">
                {story.goodnightLine}
              </h2>

              <p className="font-body text-lg text-gray-200 max-w-lg mx-auto mb-6 leading-relaxed">
                <span className="font-bold text-[#FFD34E]">Wow fact: </span>
                {story.wowFact}
              </p>

              {/* Big Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                {hasGame && onPlayGame && (
                  <button
                    type="button"
                    onClick={() => {
                      playPop();
                      onPlayGame();
                    }}
                    className="min-h-[56px] px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF7A45] to-[#FFD34E] text-black font-display font-extrabold text-base flex items-center space-x-2 shadow-lg hover:scale-103 transition-transform cursor-pointer"
                  >
                    <Gamepad2 className="w-5 h-5" />
                    <span>{gameLabel}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    const el = document.getElementById("kid-quiz-section");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="min-h-[56px] px-6 py-3 rounded-2xl bg-[#5BE3C0] text-black font-display font-extrabold text-base flex items-center space-x-2 shadow-lg hover:scale-103 transition-transform cursor-pointer"
                >
                  <HelpCircle className="w-5 h-5" />
                  <span>Quick Quiz</span>
                </button>

                <Link
                  href={`/machines/${nextMachine.slug}`}
                  onClick={playPop}
                  className="min-h-[56px] px-6 py-3 rounded-2xl bg-white/10 border border-white/20 text-white font-display font-bold text-base flex items-center space-x-2 hover:bg-white/20 transition-all"
                >
                  <span>Meet Next Friend ({nextMachine.name})</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="min-h-[56px] p-3.5 rounded-2xl border border-white/20 text-gray-300 hover:text-white"
                  title="Read story again"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* Bottom Bar: Ping Speech Bubble + Giant Next Pillow Button */}
        {/* ============================================================== */}
        {!isGoodnight && currentPanel && (
          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4 pt-2">
            {/* Ping Avatar */}
            <div className="shrink-0 hidden sm:block">
              <Ping mood={illustrationMood === "glow" ? "listening" : "idle"} size={105} />
            </div>

            {/* Speech Bubble */}
            <div className="flex-1 w-full">
              <PingBubble text="">
                <div className="text-xl sm:text-2xl font-display font-medium text-white leading-relaxed">
                  {renderTextWithWordBubbles(currentPanel.text)}
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                  <span>
                    Panel {currentPanel.panelIndex} of {totalPanels}
                  </span>
                  <span className="font-mono text-[#5BE3C0] text-[11px]">
                    Fact: {currentPanel.factRef}
                  </span>
                </div>
              </PingBubble>
            </div>

            {/* Giant NEXT Pillow Button (minimum 64px tap target) */}
            <div className="shrink-0 w-full sm:w-auto flex sm:flex-col gap-2">
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 sm:flex-none min-h-[64px] min-w-[140px] px-8 py-4 rounded-3xl bg-gradient-to-r from-[#FFD34E] to-[#FF7A45] text-black font-display font-extrabold text-xl sm:text-2xl flex items-center justify-center space-x-3 shadow-[0_8px_25px_rgba(255,211,78,0.35)] hover:scale-104 active:scale-95 transition-all cursor-pointer"
                aria-label={currentPanelIndex === totalPanels - 1 ? "Finish Story" : "Next story panel"}
              >
                <span>{currentPanelIndex === totalPanels - 1 ? "Finish" : "Next"}</span>
                <ArrowRight className="w-6 h-6 stroke-[3]" />
              </button>

              {currentPanelIndex > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-2.5 rounded-2xl border border-white/15 bg-white/5 text-gray-300 hover:text-white font-display text-xs"
                >
                  Back
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* Kid Quiz Section (Always reachable below the stage) */}
      {/* ============================================================== */}
      <div id="kid-quiz-section" className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 w-full mt-12">
        <KidQuiz
          quiz={story.quiz}
          machineSlug={machine.slug}
          machineTitle={machine.name}
        />
      </div>

      {/* ============================================================== */}
      {/* Grown-Up Facts Accordion (Keeps 100% of detailed telemetry & data) */}
      {/* ============================================================== */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full mt-8">
        <div className="rounded-3xl border border-white/15 bg-[#0B1033]/80 backdrop-blur-md overflow-hidden">
          <button
            type="button"
            onClick={() => {
              playPop();
              setShowGrownUpFacts(!showGrownUpFacts);
            }}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors cursor-pointer"
            aria-expanded={showGrownUpFacts}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-lg">
                📚
              </div>
              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                  Grown-up Facts & Scientific Telemetry
                </h3>
                <p className="text-xs text-gray-400">
                  Click to open full mission specs, primary records, Then/Now slider & scientific impact.
                </p>
              </div>
            </div>

            <div className="p-2 rounded-full border border-white/10 text-gray-300">
              {showGrownUpFacts ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </button>

          {showGrownUpFacts && (
            <div className="p-6 sm:p-8 border-t border-white/10 bg-black/40 animate-fade-in">
              {grownUpChildren}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
