"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSound } from "@/context/SoundContext";
import { useStickers } from "@/context/StickerContext";
import { Sparkles, Trophy, RotateCcw, ArrowUp } from "lucide-react";
import confetti from "canvas-confetti";

interface FlyIngenuityGameProps {
  onClose?: () => void;
}

export default function FlyIngenuityGame({ onClose }: FlyIngenuityGameProps) {
  const { playRotor, playDing, playPop } = useSound();
  const { unlockSticker } = useStickers();

  // Altitude percentage (0 = ground, 100 = ceiling)
  const [altitude, setAltitude] = useState(20);
  const [isPressing, setIsPressing] = useState(false);
  const [hoverSeconds, setHoverSeconds] = useState(0);
  const [flightCount, setFlightCount] = useState(1);
  const [message, setMessage] = useState("Hold button to spin rotors and lift off!");

  // Target hover zone: 45% to 75%
  const isInsideTarget = altitude >= 45 && altitude <= 75;

  // Physics loop (rise when pressing, gravity sinks when released)
  useEffect(() => {
    const interval = setInterval(() => {
      setAltitude((prev) => {
        if (isPressing) {
          playRotor();
          return Math.min(88, prev + 2.5);
        } else {
          return Math.max(12, prev - 1.8);
        }
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPressing, playRotor]);

  // Hover timer loop
  useEffect(() => {
    if (!isInsideTarget) {
      setHoverSeconds(0);
      return;
    }

    const timer = setInterval(() => {
      setHoverSeconds((prev) => {
        const next = prev + 1;
        if (next >= 5) {
          // Completed one flight!
          playDing();
          setFlightCount((fc) => {
            const nextFlight = fc < 5 ? 5 : fc < 72 ? 72 : fc + 1;

            if (nextFlight === 5) {
              setMessage("Flight complete! 'That was what I was built for!'");
              unlockSticker("game-fly-ingenuity");
              confetti({ particleCount: 50, spread: 60, colors: ["#5BE3C0", "#FFD34E"] });
            } else if (nextFlight >= 72) {
              setMessage("72 FLIGHTS! Wow! You are a legendary Mars Aviator!");
              unlockSticker("game-fly-ingenuity");
              confetti({ particleCount: 80, spread: 90, colors: ["#FF7A45", "#FFD34E", "#FF8FB1"] });
            } else {
              setMessage(`Flight #${nextFlight} logged successfully!`);
            }
            return nextFlight;
          });
          return 0; // reset hover
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isInsideTarget, playDing, unlockSticker]);

  // Keyboard support: Space or ArrowUp
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === "ArrowUp") {
        e.preventDefault();
        setIsPressing(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === "ArrowUp") {
        setIsPressing(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleWatchInstead = () => {
    setAltitude(60);
    setFlightCount(72);
    setMessage("72 Flights completed! Great flying!");
    unlockSticker("game-fly-ingenuity");
    playDing();
  };

  return (
    <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-[#0B1033] border-3 border-[#5BE3C0]/50 text-white max-w-xl mx-auto shadow-2xl">
      <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#5BE3C0]/20 text-[#5BE3C0] font-display font-bold text-xs mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>MARS HELICOPTER FLIGHT TEST</span>
      </div>

      <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
        Fly Ingenuity!
      </h3>
      <p className="font-body text-sm text-gray-300 max-w-md mb-6">
        Press and hold the button to climb. Hover in the green zone for 5 seconds to log a flight!
      </p>

      {/* Flight Scoreboard */}
      <div className="flex items-center justify-between w-full max-w-xs px-4 py-2 rounded-2xl bg-white/10 border border-white/20 mb-4">
        <span className="text-xs font-display text-gray-300">Flights Logged:</span>
        <span className="text-xl font-display font-black text-[#FFD34E]">
          {flightCount} / 72
        </span>
      </div>

      {/* Flight Stage Column */}
      <div className="relative w-full max-w-sm h-64 rounded-2xl border-3 border-white/20 bg-gradient-to-b from-[#2E1E36] via-[#5C2E2B] to-[#9E4A34] overflow-hidden select-none">
        {/* Target Hover Zone (45% to 75% height) */}
        <div
          className={`absolute inset-x-0 h-[30%] border-y-2 border-dashed transition-colors flex items-center justify-between px-3 ${
            isInsideTarget
              ? "bg-[#5BE3C0]/25 border-[#5BE3C0]"
              : "bg-white/10 border-white/30"
          }`}
          style={{ bottom: "45%" }}
        >
          <span className="text-[11px] font-display font-bold text-white/80">
            Hover Zone (Hold!)
          </span>
          {isInsideTarget && (
            <span className="text-xs font-bold text-[#FFD34E] animate-pulse">
              ⏱️ {hoverSeconds}s / 5s
            </span>
          )}
        </div>

        {/* Ingenuity Helicopter Sprite */}
        <div
          className="absolute left-1/2 -translate-x-1/2 transition-all duration-75 text-3xl select-none"
          style={{ bottom: `${altitude}%` }}
        >
          <span className={isPressing ? "inline-block animate-spin" : "inline-block"}>
            🚁
          </span>
        </div>

        {/* Ground */}
        <div className="absolute bottom-0 inset-x-0 h-4 bg-[#6B291A]" />
      </div>

      {/* Flight Status Banner */}
      <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-display text-gray-200 max-w-sm w-full">
        {message}
      </div>

      {/* Control Button (Big 64px Pillow Button) */}
      <div className="mt-6 w-full max-w-xs flex flex-col gap-3">
        <button
          type="button"
          onPointerDown={() => setIsPressing(true)}
          onPointerUp={() => setIsPressing(false)}
          onPointerLeave={() => setIsPressing(false)}
          className={`min-h-[64px] rounded-3xl font-display font-black text-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg active:scale-95 select-none touch-none ${
            isPressing
              ? "bg-[#FFD34E] text-black scale-98"
              : "bg-[#5BE3C0] text-black hover:scale-103"
          }`}
        >
          <ArrowUp className="w-6 h-6 stroke-[3]" />
          <span>{isPressing ? "ROTORS SPINNING!" : "HOLD TO LIFT"}</span>
        </button>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <button
            onClick={handleWatchInstead}
            className="hover:text-[#FFD34E] underline underline-offset-2"
          >
            Watch instead (complete flights)
          </button>
          {onClose && (
            <button onClick={onClose} className="hover:text-white underline">
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
