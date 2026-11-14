"use client";

import React, { useState } from "react";
import { KID_GLOSSARY } from "@/data/glossaryKids";
import { useNarration } from "@/context/NarrationContext";
import { useSound } from "@/context/SoundContext";
import { Volume2, X } from "lucide-react";

interface WordBubbleProps {
  wordKey: string;
  children: React.ReactNode;
}

export default function WordBubble({ wordKey, children }: WordBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { speak } = useNarration();
  const { playPop } = useSound();

  const term = KID_GLOSSARY[wordKey.toLowerCase()];
  if (!term) {
    return <span>{children}</span>;
  }

  const handleOpen = () => {
    playPop();
    setIsOpen(!isOpen);
    if (!isOpen) {
      speak(`${term.word}. ${term.definition}`);
    }
  };

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={handleOpen}
        className="inline-flex items-center underline decoration-wavy decoration-[#5BE3C0] hover:text-[#5BE3C0] cursor-pointer font-bold px-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#5BE3C0]"
        aria-expanded={isOpen}
      >
        <span>{children}</span>
        <span className="ml-1 text-xs opacity-75">{term.icon}</span>
      </button>

      {isOpen && (
        <span
          role="dialog"
          aria-label={term.word}
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 sm:w-72 p-4 rounded-2xl bg-[#0B1033] border-2 border-[#5BE3C0] shadow-2xl text-left block animate-pop-in"
        >
          {/* Arrow */}
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0B1033] border-r-2 border-b-2 border-[#5BE3C0] rotate-45" />

          <span className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <span className="flex items-center space-x-2 font-display font-bold text-base text-white">
              <span className="text-xl">{term.icon}</span>
              <span>{term.word}</span>
            </span>

            <span className="flex items-center space-x-1">
              <button
                type="button"
                onClick={() => speak(`${term.word}. ${term.definition}`)}
                className="p-1 rounded-full text-[#5BE3C0] hover:bg-white/10"
                title="Hear word"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          </span>

          <span className="text-xs sm:text-sm text-gray-200 leading-relaxed block">
            {term.definition}
          </span>
        </span>
      )}
    </span>
  );
}
