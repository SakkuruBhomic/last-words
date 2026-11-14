"use client";

import React from "react";
import { useStickers, ALL_STICKERS } from "@/context/StickerContext";
import { useSound } from "@/context/SoundContext";
import { Award, X, Sparkles, Check, Lock } from "lucide-react";

export default function StickerBookModal() {
  const { isStickerBookOpen, closeStickerBook, unlockedStickers, machineCount } = useStickers();
  const { playPop } = useSound();

  if (!isStickerBookOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sticker-book-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0B1033] border-3 border-[#FFD34E]/50 shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-6 sm:p-8 text-white overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFD34E]/20 text-[#FFD34E] flex items-center justify-center text-2xl">
              ⭐
            </div>
            <div>
              <h2 id="sticker-book-title" className="font-display font-bold text-2xl sm:text-3xl text-white">
                Explorer Sticker Book
              </h2>
              <p className="text-xs sm:text-sm text-gray-300">
                You collected <span className="text-[#FFD34E] font-bold">{machineCount} of 8</span> space friend stickers!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playPop();
              closeStickerBook();
            }}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10"
            aria-label="Close sticker book"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sticker Grid */}
        <div className="overflow-y-auto py-6 space-y-6 flex-1 pr-1">
          {/* 1. Machine Stickers */}
          <div>
            <h3 className="font-display font-semibold text-sm sm:text-base text-[#5BE3C0] uppercase tracking-wider mb-3">
              Space Explorer Badges
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {ALL_STICKERS.filter((s) => s.category === "machine").map((sticker) => {
                const isUnlocked = unlockedStickers.includes(sticker.id);

                return (
                  <div
                    key={sticker.id}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all ${
                      isUnlocked
                        ? "border-[#5BE3C0] bg-white/[0.06] shadow-lg shadow-[#5BE3C0]/10"
                        : "border-white/10 bg-white/[0.02] opacity-50"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl mb-2">
                      {isUnlocked ? sticker.icon : <Lock className="w-6 h-6 text-gray-400" />}
                    </div>
                    <span className="font-display font-bold text-sm text-white line-clamp-1">
                      {sticker.name}
                    </span>
                    <span className="text-[11px] text-gray-400 mt-0.5">
                      {isUnlocked ? "Unlocked!" : "Read story to earn"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Mini-Game Stickers */}
          <div>
            <h3 className="font-display font-semibold text-sm sm:text-base text-[#FF8FB1] uppercase tracking-wider mb-3">
              Mini-Game Medals
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {ALL_STICKERS.filter((s) => s.category === "game").map((sticker) => {
                const isUnlocked = unlockedStickers.includes(sticker.id);

                return (
                  <div
                    key={sticker.id}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all ${
                      isUnlocked
                        ? "border-[#FF8FB1] bg-white/[0.06] shadow-lg shadow-[#FF8FB1]/10"
                        : "border-white/10 bg-white/[0.02] opacity-50"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl mb-2">
                      {isUnlocked ? sticker.icon : <Lock className="w-6 h-6 text-gray-400" />}
                    </div>
                    <span className="font-display font-bold text-sm text-white line-clamp-1">
                      {sticker.name}
                    </span>
                    <span className="text-[11px] text-gray-400 mt-0.5">
                      {isUnlocked ? "Champion!" : "Play mini-game"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between shrink-0">
          <span className="text-xs text-gray-400">
            Stickers are saved safely in your browser.
          </span>
          <button
            onClick={() => {
              playPop();
              closeStickerBook();
            }}
            className="px-6 py-2.5 rounded-full bg-[#5BE3C0] text-black font-display font-bold text-sm hover:opacity-95"
          >
            Keep Exploring!
          </button>
        </div>
      </div>
    </div>
  );
}
