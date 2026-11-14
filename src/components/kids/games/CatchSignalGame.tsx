"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSound } from "@/context/SoundContext";
import { useStickers } from "@/context/StickerContext";
import { Sparkles, Radio, Trophy, ArrowLeft, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface Ring {
  id: number;
  x: number; // percentage 10% to 90%
  y: number; // percentage 0% to 100%
  speed: number;
}

interface CatchSignalGameProps {
  onClose?: () => void;
}

export default function CatchSignalGame({ onClose }: CatchSignalGameProps) {
  const { playDing, playPop, playBlip } = useSound();
  const { unlockSticker } = useStickers();

  // Dish X position: 10% to 90%
  const [dishX, setDishX] = useState(50);
  const [score, setScore] = useState(0);
  const [rings, setRings] = useState<Ring[]>([]);
  const nextId = useRef(1);

  // Spawn falling signal rings periodically
  useEffect(() => {
    const spawner = setInterval(() => {
      setRings((prev) => [
        ...prev,
        {
          id: nextId.current++,
          x: 15 + Math.random() * 70,
          y: 0,
          speed: 2 + Math.random() * 1.5,
        },
      ]);
    }, 1200);

    return () => clearInterval(spawner);
  }, []);

  // Animation frame loop for ring descent & collision detection
  useEffect(() => {
    const loop = setInterval(() => {
      setRings((prevRings) => {
        const nextList: Ring[] = [];

        for (const ring of prevRings) {
          const nextY = ring.y + ring.speed;

          // Check if caught by dish near the bottom (y between 78% and 92%)
          if (nextY >= 78 && nextY <= 92 && Math.abs(ring.x - dishX) < 14) {
            // Caught!
            playBlip(980, 50);
            setScore((s) => {
              const updated = s + 1;
              if (updated % 10 === 0) {
                playDing();
                unlockSticker("game-catch-signal");
                confetti({ particleCount: 50, spread: 60, colors: ["#5BE3C0", "#FFD34E"] });
              }
              return updated;
            });
            continue; // Remove caught ring
          }

          // If still on screen, keep
          if (nextY < 100) {
            nextList.push({ ...ring, y: nextY });
          }
        }

        return nextList;
      });
    }, 45);

    return () => clearInterval(loop);
  }, [dishX, playBlip, playDing, unlockSticker]);

  // Keyboard navigation: ArrowLeft / ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setDishX((x) => Math.max(12, x - 8));
      } else if (e.key === "ArrowRight") {
        setDishX((x) => Math.min(88, x + 8));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setDishX(Math.max(12, Math.min(88, pct)));
  };

  const handleWatchInstead = () => {
    setScore(10);
    unlockSticker("game-catch-signal");
    playDing();
  };

  return (
    <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-[#0B1033] border-3 border-[#8E7CFF]/50 text-white max-w-xl mx-auto shadow-2xl">
      <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#8E7CFF]/20 text-[#8E7CFF] font-display font-bold text-xs mb-3">
        <Radio className="w-3.5 h-3.5" />
        <span>DEEP SPACE NETWORK</span>
      </div>

      <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
        Catch the Signal!
      </h3>
      <p className="font-body text-sm text-gray-300 max-w-md mb-6">
        Move the antenna dish left and right to catch incoming radio rings. Every 10 caught wins a sticker!
      </p>

      {/* Score Header */}
      <div className="flex items-center justify-between w-full max-w-sm px-4 py-2 rounded-2xl bg-white/10 border border-white/20 mb-4">
        <span className="text-xs font-display text-gray-300">Signals Caught:</span>
        <span className="text-xl font-display font-black text-[#5BE3C0]">
          📡 {score}
        </span>
      </div>

      {/* Game Playing Field */}
      <div
        onPointerMove={handlePointerMove}
        className="relative w-full max-w-sm h-72 rounded-2xl border-3 border-white/20 bg-gradient-to-b from-[#03040C] via-[#070B24] to-[#0D123D] overflow-hidden select-none touch-none cursor-pointer"
      >
        {/* Falling Radio Signal Rings */}
        {rings.map((ring) => (
          <div
            key={ring.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${ring.x}%`, top: `${ring.y}%` }}
          >
            <div className="w-8 h-8 rounded-full border-2 border-[#5BE3C0] bg-[#5BE3C0]/20 animate-pulse flex items-center justify-center text-[10px]">
              〰️
            </div>
          </div>
        ))}

        {/* Catching Dish at Bottom */}
        <div
          className="absolute bottom-3 -translate-x-1/2 transition-transform duration-75 text-3xl"
          style={{ left: `${dishX}%` }}
        >
          <div className="flex flex-col items-center">
            <span>📡</span>
            <div className="w-12 h-1 rounded-full bg-[#5BE3C0] mt-0.5" />
          </div>
        </div>
      </div>

      {/* Dish Stepper Controls for touch buttons */}
      <div className="mt-4 flex items-center justify-center gap-4 w-full max-w-sm">
        <button
          type="button"
          onClick={() => setDishX((x) => Math.max(12, x - 12))}
          className="p-3 rounded-2xl bg-white/10 border border-white/20 text-white font-bold flex items-center gap-1 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Move Left</span>
        </button>

        <button
          type="button"
          onClick={() => setDishX((x) => Math.min(88, x + 12))}
          className="p-3 rounded-2xl bg-white/10 border border-white/20 text-white font-bold flex items-center gap-1 active:scale-95"
        >
          <span>Move Right</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Tip & Watch instead */}
      <div className="mt-6 flex flex-col items-center gap-2 text-xs text-gray-400">
        <p>💡 Tip: Signals get weaker as they travel far through deep space.</p>
        <div className="flex items-center gap-4">
          <button
            onClick={handleWatchInstead}
            className="hover:text-[#FFD34E] underline underline-offset-2"
          >
            Watch instead (catch 10)
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
