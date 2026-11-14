"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSound } from "@/context/SoundContext";
import { useStickers } from "@/context/StickerContext";
import { useMode } from "@/context/ModeContext";
import { Sparkles, Sun, Battery, RotateCcw, Check } from "lucide-react";
import confetti from "canvas-confetti";

interface WipeDustGameProps {
  machineSlug: string;
  onClose?: () => void;
}

export default function WipeDustGame({ machineSlug, onClose }: WipeDustGameProps) {
  const { playPop, playDing, playWhoosh } = useSound();
  const { unlockSticker } = useStickers();
  const { calmMode } = useMode();

  // Progress from 0 to 100% clean
  const [cleanliness, setCleanliness] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const isDragging = useRef(false);

  const addCleanliness = (amount: number) => {
    if (isDone) return;
    setCleanliness((prev) => {
      const next = Math.min(100, prev + amount);
      if (next >= 100 && !isDone) {
        setIsDone(true);
        playDing();
        unlockSticker("game-wipe-dust");
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#FFD34E", "#FF7A45", "#5BE3C0"],
          });
        } catch {
          // ignore
        }
      }
      return next;
    });
  };

  // Keyboard shortcut: Spacebar repeatedly wipes dust
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        playWhoosh();
        addCleanliness(8);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDone]);

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging.current || calmMode) {
      addCleanliness(2.5);
    }
  };

  const handleWatchInstead = () => {
    // Auto-wipe for calm / reduced-motion users
    let curr = cleanliness;
    const interval = setInterval(() => {
      curr += 10;
      setCleanliness(Math.min(100, curr));
      if (curr >= 100) {
        clearInterval(interval);
        setIsDone(true);
        unlockSticker("game-wipe-dust");
      }
    }, 150);
  };

  const handleRestart = () => {
    playPop();
    setCleanliness(0);
    setIsDone(false);
  };

  return (
    <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-[#0B1033] border-3 border-[#FF7A45]/50 text-white max-w-xl mx-auto shadow-2xl">
      <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FF7A45]/20 text-[#FF7A45] font-display font-bold text-xs mb-3">
        <Sun className="w-3.5 h-3.5" />
        <span>MARTIAN CLEANING EVENT</span>
      </div>

      <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
        Wipe the Dust Off!
      </h3>
      <p className="font-body text-sm text-gray-300 max-w-md mb-6">
        Swipe across the solar panel with your finger or mouse, or tap the <kbd className="px-2 py-0.5 rounded bg-white/20 font-mono text-xs">Spacebar</kbd>!
      </p>

      {/* Battery Power Meter */}
      <div className="w-full max-w-xs mb-6">
        <div className="flex justify-between text-xs font-display font-bold mb-1">
          <span className="flex items-center gap-1 text-[#FFD34E]">
            <Battery className="w-4 h-4" /> Battery Power
          </span>
          <span className="text-[#5BE3C0]">{cleanliness}%</span>
        </div>
        <div className="w-full h-5 rounded-full bg-white/10 p-0.5 border border-white/20">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FF7A45] via-[#FFD34E] to-[#5BE3C0] transition-all duration-150"
            style={{ width: `${cleanliness}%` }}
          />
        </div>
      </div>

      {/* Interactive Dusty Panel Canvas Area */}
      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        className="relative w-full aspect-[16/9] max-w-md rounded-2xl overflow-hidden border-3 border-white/20 shadow-inner cursor-grab active:cursor-grabbing select-none touch-none bg-[#1E3A8A]"
      >
        {/* Shiny Blue Solar Cells underneath */}
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-1 p-2 bg-[#172554]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded bg-[#1D4ED8] border border-blue-400/30 flex items-center justify-center">
              <span className="text-[10px] text-blue-200/40">✦</span>
            </div>
          ))}
        </div>

        {/* Dusty Red Martian Film that fades away */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-[#99341E] via-[#B84E33] to-[#7B2412] pointer-events-none transition-opacity duration-150"
          style={{ opacity: Math.max(0, (100 - cleanliness) / 100) }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center text-white/80 font-display font-bold text-sm">
            <span>Red dust covers the solar cells!</span>
            <span className="text-xs text-white/60 mt-1">Rub here to clean 👆</span>
          </div>
        </div>

        {/* Sparkles on full clean */}
        {isDone && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#5BE3C0]/20 pointer-events-none animate-pop-in">
            <span className="text-4xl animate-bounce">☀️ ✨ 🔋</span>
          </div>
        )}
      </div>

      {/* Completion announcement */}
      {isDone ? (
        <div className="mt-6 p-4 rounded-2xl bg-[#5BE3C0]/20 border border-[#5BE3C0] text-center w-full animate-pop-in">
          <h4 className="font-display font-bold text-xl text-[#5BE3C0] mb-1">
            &ldquo;Now I can see the Sun!&rdquo;
          </h4>
          <p className="text-xs text-gray-200 mb-4">
            Just like real Martian wind gusts blew dust off Opportunity and InSight!
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-4 py-2 rounded-xl border border-white/20 text-xs font-display text-gray-300 hover:text-white"
            >
              Play again
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#5BE3C0] text-black font-display font-bold text-xs"
              >
                Back to Story
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-between w-full max-w-md text-xs text-gray-400">
          <button
            onClick={handleWatchInstead}
            className="hover:text-[#FFD34E] underline underline-offset-2"
          >
            Watch instead (auto-clean)
          </button>
          <span>Real Mars wind speed: ~60 mph</span>
        </div>
      )}
    </div>
  );
}
