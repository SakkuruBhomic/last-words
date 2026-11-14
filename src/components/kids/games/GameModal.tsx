"use client";

import React from "react";
import WipeDustGame from "./WipeDustGame";
import FlyIngenuityGame from "./FlyIngenuityGame";
import CatchSignalGame from "./CatchSignalGame";
import MoonEchoGame from "./MoonEchoGame";
import { X } from "lucide-react";

export type GameType = "wipe-dust" | "fly-ingenuity" | "catch-signal" | "moon-echo";

interface GameModalProps {
  game: GameType | null;
  machineSlug: string;
  onClose: () => void;
}

export default function GameModal({ game, machineSlug, onClose }: GameModalProps) {
  if (!game) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white"
          aria-label="Close game"
        >
          <X className="w-5 h-5" />
        </button>

        {game === "wipe-dust" && (
          <WipeDustGame machineSlug={machineSlug} onClose={onClose} />
        )}
        {game === "fly-ingenuity" && (
          <FlyIngenuityGame onClose={onClose} />
        )}
        {game === "catch-signal" && (
          <CatchSignalGame onClose={onClose} />
        )}
        {game === "moon-echo" && (
          <MoonEchoGame onClose={onClose} />
        )}
      </div>
    </div>
  );
}
