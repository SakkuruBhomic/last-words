"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import confetti from "canvas-confetti";

export interface Sticker {
  id: string;
  name: string;
  slug?: string;
  category: "machine" | "game";
  icon: string;
  unlockedAt?: string;
}

export const ALL_STICKERS: Sticker[] = [
  // 8 Machine stickers
  { id: "surveyor-3", name: "Surveyor 3", slug: "surveyor-3", category: "machine", icon: "🌙" },
  { id: "apollo-17-alsep", name: "Apollo 17 Station", slug: "apollo-17-alsep", category: "machine", icon: "📡" },
  { id: "pioneer-10", name: "Pioneer 10", slug: "pioneer-10", category: "machine", icon: "⭐" },
  { id: "opportunity", name: "Opportunity", slug: "opportunity", category: "machine", icon: "🤖" },
  { id: "insight", name: "InSight", slug: "insight", category: "machine", icon: "👂" },
  { id: "ingenuity", name: "Ingenuity", slug: "ingenuity", category: "machine", icon: "🚁" },
  { id: "apollo-11-laser-reflector", name: "Laser Mirror", slug: "apollo-11-laser-reflector", category: "machine", icon: "✨" },
  { id: "voyager-1", name: "Voyager 1", slug: "voyager-1", category: "machine", icon: "🚀" },

  // Mini-game stickers
  { id: "game-wipe-dust", name: "Dust Cleaner", category: "game", icon: "🧹" },
  { id: "game-fly-ingenuity", name: "Mars Pilot", category: "game", icon: "🎯" },
  { id: "game-catch-signal", name: "Signal Catcher", category: "game", icon: "📶" },
  { id: "game-moon-echo", name: "Laser Timer", category: "game", icon: "⏱️" },
];

interface StickerContextType {
  unlockedStickers: string[];
  unlockSticker: (id: string) => boolean; // returns true if newly unlocked
  hasSticker: (id: string) => boolean;
  machineCount: number;
  totalCount: number;
  isStickerBookOpen: boolean;
  openStickerBook: () => void;
  closeStickerBook: () => void;
  newlyUnlocked: Sticker | null;
  dismissNewlyUnlocked: () => void;
}

const StickerContext = createContext<StickerContextType | undefined>(undefined);

export function StickerProvider({ children }: { children: React.ReactNode }) {
  const [unlockedStickers, setUnlockedStickers] = useState<string[]>([]);
  const [isStickerBookOpen, setIsStickerBookOpen] = useState(false);
  const [newlyUnlocked, setNewlyUnlocked] = useState<Sticker | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("last-words-unlocked-stickers");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setUnlockedStickers(parsed);
          }
        }
      } catch {
        // storage disabled or corrupted
      }
    }
  }, []);

  const unlockSticker = useCallback((id: string): boolean => {
    if (unlockedStickers.includes(id)) {
      return false; // already unlocked
    }

    const next = [...unlockedStickers, id];
    setUnlockedStickers(next);

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("last-words-unlocked-stickers", JSON.stringify(next));
      } catch {
        // ignore
      }
    }

    const found = ALL_STICKERS.find((s) => s.id === id);
    if (found) {
      setNewlyUnlocked(found);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FFD34E", "#5BE3C0", "#FF8FB1", "#6CB8FF"],
        });
      } catch {
        // ignore
      }
    }

    return true;
  }, [unlockedStickers]);

  const hasSticker = useCallback((id: string): boolean => {
    return unlockedStickers.includes(id);
  }, [unlockedStickers]);

  const machineCount = unlockedStickers.filter((id) =>
    ALL_STICKERS.some((s) => s.id === id && s.category === "machine")
  ).length;

  return (
    <StickerContext.Provider
      value={{
        unlockedStickers,
        unlockSticker,
        hasSticker,
        machineCount,
        totalCount: ALL_STICKERS.length,
        isStickerBookOpen,
        openStickerBook: () => setIsStickerBookOpen(true),
        closeStickerBook: () => setIsStickerBookOpen(false),
        newlyUnlocked,
        dismissNewlyUnlocked: () => setNewlyUnlocked(null),
      }}
    >
      {children}
    </StickerContext.Provider>
  );
}

export function useStickers() {
  const context = useContext(StickerContext);
  if (!context) {
    throw new Error("useStickers must be used within a StickerProvider");
  }
  return context;
}
