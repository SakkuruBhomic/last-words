"use client";

import React from "react";
import { useMode } from "@/context/ModeContext";
import { useSound } from "@/context/SoundContext";
import { Rocket, Satellite, Moon, Sun, Type, Eye } from "lucide-react";

export default function ModeSwitch() {
  const { mode, toggleMode, calmMode, toggleCalmMode, textSize, cycleTextSize } = useMode();
  const { playPop } = useSound();

  const handleToggleMode = () => {
    playPop();
    toggleMode();
  };

  const handleToggleCalm = () => {
    playPop();
    toggleCalmMode();
  };

  const handleCycleText = () => {
    playPop();
    cycleTextSize();
  };

  return (
    <div className="flex items-center space-x-2">
      {/* 1. Primary Mode Switch Button */}
      <button
        type="button"
        onClick={handleToggleMode}
        className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-display font-bold transition-all shadow-md ${
          mode === "kids"
            ? "bg-[#5BE3C0] border-teal-300 text-black shadow-[0_0_15px_rgba(91,227,192,0.3)] hover:scale-102"
            : "bg-[#1E293B] border-[#FFB020]/40 text-[#FFB020] hover:border-[#FFB020]"
        }`}
        title={mode === "kids" ? "Switch to Mission Control mode" : "Switch to Little Explorers mode"}
        aria-label={`Currently in ${mode === "kids" ? "Little Explorers" : "Mission Control"} mode. Click to toggle.`}
      >
        {mode === "kids" ? (
          <>
            <Rocket className="w-4 h-4 text-black" />
            <span className="tracking-wide">Little Explorers</span>
          </>
        ) : (
          <>
            <Satellite className="w-4 h-4 text-[#FFB020]" />
            <span className="tracking-wide">Mission Control</span>
          </>
        )}
      </button>

      {/* 2. Calm Mode (Accessibility: stops all animations and sounds) */}
      <button
        type="button"
        onClick={handleToggleCalm}
        className={`p-1.5 rounded-full border text-xs transition-colors ${
          calmMode
            ? "border-sky-400 bg-sky-400/20 text-sky-300"
            : "border-white/10 text-gray-400 hover:text-white"
        }`}
        title={calmMode ? "Calm mode active (reduced motion)" : "Enable Calm mode (stops movement)"}
        aria-label="Toggle calm mode"
        aria-pressed={calmMode}
      >
        <Eye className="w-4 h-4" />
      </button>

      {/* 3. Text Size Multiplier (A A A) */}
      <button
        type="button"
        onClick={handleCycleText}
        className="px-2 py-1 rounded-full border border-white/10 text-xs font-mono text-gray-300 hover:text-white hover:border-white/30"
        title={`Text size: ${textSize}. Click to change.`}
        aria-label={`Change text size. Currently ${textSize}.`}
      >
        <span className="font-bold">
          {textSize === "normal" ? "A" : textSize === "large" ? "A+" : "A++"}
        </span>
      </button>
    </div>
  );
}
