"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSound } from "@/context/SoundContext";
import { useStickers } from "@/context/StickerContext";
import Ping, { PingBubble } from "@/components/kids/Ping";
import { Zap, Timer, RotateCcw, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

interface MoonEchoGameProps {
  onClose?: () => void;
}

export default function MoonEchoGame({ onClose }: MoonEchoGameProps) {
  const { playLaserZing, playDing, playPop } = useSound();
  const { unlockSticker } = useStickers();

  const [state, setState] = useState<"idle" | "firing-to-moon" | "bouncing-back" | "received">("idle");
  const [elapsedMs, setElapsedMs] = useState(0);
  const startTimeRef = useRef(0);

  const handleFire = () => {
    playLaserZing();
    setState("firing-to-moon");
    startTimeRef.current = performance.now();
    setElapsedMs(0);

    // Halfway point: 1.28 seconds
    setTimeout(() => {
      setState("bouncing-back");
    }, 1280);

    // Round-trip return: 2.56 seconds
    setTimeout(() => {
      setState("received");
      playDing();
      unlockSticker("game-moon-echo");
      confetti({ particleCount: 50, spread: 70, colors: ["#5BE3C0", "#FFD34E"] });
    }, 2560);
  };

  // Stopwatch counter animation
  useEffect(() => {
    if (state === "idle" || state === "received") return;

    const timer = setInterval(() => {
      setElapsedMs(Math.round(performance.now() - startTimeRef.current));
    }, 20);

    return () => clearInterval(timer);
  }, [state]);

  const handleReset = () => {
    playPop();
    setState("idle");
    setElapsedMs(0);
  };

  const isTraveling = state === "firing-to-moon" || state === "bouncing-back";

  return (
    <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-[#0B1033] border-3 border-[#5BE3C0]/50 text-white max-w-xl mx-auto shadow-2xl">
      <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#5BE3C0]/20 text-[#5BE3C0] font-display font-bold text-xs mb-3">
        <Zap className="w-3.5 h-3.5" />
        <span>LUNAR LASER RANGING EXPERIMENT</span>
      </div>

      <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
        Moon Laser Echo!
      </h3>
      <p className="font-body text-sm text-gray-300 max-w-md mb-6">
        Press the button to fire green laser photons from Earth to the Moon and back in real time!
      </p>

      {/* Stopwatch Display */}
      <div className="flex items-center justify-center space-x-3 px-6 py-3 rounded-2xl bg-white/10 border border-white/20 mb-6">
        <Timer className="w-6 h-6 text-[#FFD34E]" />
        <span className="font-mono font-bold text-2xl sm:text-3xl text-[#5BE3C0]">
          {(elapsedMs / 1000).toFixed(2)}s
        </span>
        <span className="text-xs text-gray-400">/ 2.56 seconds</span>
      </div>

      {/* Earth to Moon Laser Track Diagram */}
      <div className="relative w-full max-w-md h-36 rounded-2xl bg-gradient-to-r from-[#0F356B] via-[#0B1033] to-[#2C3450] border-2 border-white/20 p-4 flex items-center justify-between overflow-hidden">
        {/* Earth on Left */}
        <div className="flex flex-col items-center z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-700 to-sky-300 flex items-center justify-center text-2xl shadow-[0_0_15px_#38BDF8]">
            🌍
          </div>
          <span className="text-[11px] font-display text-gray-300 mt-1">Earth</span>
        </div>

        {/* Traveling Photon Beam */}
        <div className="flex-1 relative h-1 mx-4 bg-white/10 rounded-full">
          {state === "firing-to-moon" && (
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#5BE3C0] shadow-[0_0_15px_#5BE3C0] animate-laser-travel"
            />
          )}
          {state === "bouncing-back" && (
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FFD34E] shadow-[0_0_15px_#FFD34E] animate-laser-return"
            />
          )}
          {state === "received" && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#5BE3C0] to-[#FFD34E] rounded-full opacity-60" />
          )}
        </div>

        {/* Moon Mirror on Right */}
        <div className="flex flex-col items-center z-10">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(255,255,255,0.4)]">
            🌕
          </div>
          <span className="text-[11px] font-display text-gray-300 mt-1">Mirror</span>
        </div>
      </div>

      {/* Ping commentary */}
      <div className="mt-6 flex items-center gap-3 w-full max-w-md text-left">
        <Ping mood={state === "received" ? "cheer" : isTraveling ? "listening" : "idle"} size={70} />
        <div className="flex-1 p-3 rounded-2xl bg-white/10 border border-white/10 text-xs sm:text-sm font-display text-white">
          {state === "idle" && "Ready on the launch pad! Press Fire to start timing."}
          {state === "firing-to-moon" && "Zipping through 384,400 km of dark space toward the Moon..."}
          {state === "bouncing-back" && "Ding! Hit the corner cube mirror! Racing back to Earth..."}
          {state === "received" && "“Echo received in 2.56 seconds! That’s how we measure the Moon!”"}
        </div>
      </div>

      {/* Button Controls */}
      <div className="mt-6 w-full max-w-xs flex flex-col gap-3">
        {state === "idle" ? (
          <button
            type="button"
            onClick={handleFire}
            className="min-h-[64px] rounded-3xl bg-gradient-to-r from-[#5BE3C0] to-[#FFD34E] text-black font-display font-black text-xl flex items-center justify-center space-x-2 shadow-lg hover:scale-103 active:scale-95 transition-all cursor-pointer"
          >
            <Zap className="w-6 h-6 stroke-[3]" />
            <span>FIRE LASER!</span>
          </button>
        ) : state === "received" ? (
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="flex-1 py-3 rounded-2xl border border-white/20 text-xs font-display text-gray-300 hover:text-white"
            >
              Fire again
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl bg-[#5BE3C0] text-black font-display font-bold text-xs"
              >
                Done
              </button>
            )}
          </div>
        ) : (
          <div className="py-4 text-xs font-mono text-[#FFD34E] animate-pulse">
            Laser photons in flight...
          </div>
        )}
      </div>
    </div>
  );
}
