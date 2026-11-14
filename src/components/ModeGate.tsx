"use client";

import React from "react";
import { useMode } from "@/context/ModeContext";
import { useSound } from "@/context/SoundContext";
import Ping from "@/components/kids/Ping";
import { Rocket, Satellite, Sparkles } from "lucide-react";

export default function ModeGate() {
  const { hasChosenMode, setMode } = useMode();
  const { playPop } = useSound();

  // If already chosen, do not show welcome gate
  if (hasChosenMode) return null;

  const handleChoose = (choice: "kids" | "control") => {
    playPop();
    setMode(choice);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-gate-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#04060B]/90 backdrop-blur-lg animate-fade-in"
    >
      <div className="relative w-full max-w-xl rounded-3xl bg-gradient-to-b from-[#0B1033] to-[#151B4F] border-4 border-[#5BE3C0]/40 shadow-[0_24px_70px_rgba(0,0,0,0.8)] p-6 sm:p-10 text-center text-white">
        {/* Mascot Ping waving */}
        <div className="flex justify-center mb-4">
          <Ping mood="wave" size={130} />
        </div>

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#5BE3C0]/20 border border-[#5BE3C0]/40 text-[#5BE3C0] font-mono text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>NASA SPACE APPS CHALLENGE 2026</span>
        </div>

        <h1 id="welcome-gate-title" className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-3">
          Welcome to LAST WORDS!
        </h1>

        <p className="font-body text-base sm:text-lg text-gray-200 max-w-md mx-auto mb-8 leading-relaxed">
          Every machine NASA left behind said something before it went quiet. How would you like to explore their stories?
        </p>

        {/* Two Huge Mode Choice Pillow Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Option 1: Little Explorers (Kids Mode) */}
          <button
            type="button"
            onClick={() => handleChoose("kids")}
            className="group relative p-6 rounded-3xl bg-gradient-to-b from-[#5BE3C0] to-[#14B8A6] text-black font-display font-extrabold text-left shadow-xl hover:shadow-[0_0_30px_rgba(91,227,192,0.4)] hover:scale-102 transition-all cursor-pointer border-3 border-white/40"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-12 h-12 rounded-2xl bg-white/30 flex items-center justify-center text-2xl">
                🚀
              </span>
              <span className="text-[11px] font-mono bg-black/15 px-2.5 py-0.5 rounded-full font-bold">
                DEFAULT
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight mb-1 text-black">
              I&apos;m a Little Explorer
            </div>
            <div className="text-xs text-black/80 font-normal">
              Picture books, read-aloud stories, stickers & fun games!
            </div>
          </button>

          {/* Option 2: Mission Control (Detailed Mode) */}
          <button
            type="button"
            onClick={() => handleChoose("control")}
            className="group relative p-6 rounded-3xl bg-gradient-to-b from-[#1E293B] to-[#0F172A] text-white font-display font-extrabold text-left shadow-xl hover:shadow-[0_0_30px_rgba(255,176,32,0.3)] hover:scale-102 transition-all cursor-pointer border-3 border-[#FFB020]/40"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="w-12 h-12 rounded-2xl bg-[#FFB020]/20 text-[#FFB020] flex items-center justify-center">
                <Satellite className="w-6 h-6" />
              </span>
              <span className="text-[11px] font-mono bg-white/10 px-2.5 py-0.5 rounded-full text-[#FFB020]">
                DETAILED
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight mb-1 text-white">
              I&apos;m in Mission Control
            </div>
            <div className="text-xs text-gray-400 font-normal">
              Scientific telemetry, transmission logs & primary records.
            </div>
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          You can switch modes anytime with the button at the top of the screen.
        </p>
      </div>
    </div>
  );
}
