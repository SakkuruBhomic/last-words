"use client";

import { useState } from "react";
import { GLOSSARY } from "@/data/glossary";
import { HelpCircle } from "lucide-react";

interface GlossaryTooltipProps {
  termKey: keyof typeof GLOSSARY | string;
  children?: React.ReactNode;
}

export default function GlossaryTooltip({ termKey, children }: GlossaryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const termData = GLOSSARY[termKey.toLowerCase()];

  if (!termData) {
    return <>{children || termKey}</>;
  }

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className="inline-flex items-center text-[var(--color-signal-amber)] underline decoration-dotted decoration-[var(--color-signal-amber)]/60 underline-offset-4 hover:decoration-solid font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-signal-amber)] rounded px-0.5"
        aria-expanded={isOpen}
        aria-label={`Definition for ${termData.term}`}
      >
        <span>{children || termData.term}</span>
        <HelpCircle className="w-3 h-3 ml-0.5 opacity-70 inline" />
      </button>

      {isOpen && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-[var(--color-surface-elevated)] text-[var(--color-text)] border border-[var(--color-border-glow)] rounded-lg shadow-2xl text-xs z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150"
        >
          <span className="block font-mono font-bold text-[var(--color-signal-amber)] mb-1">
            {termData.term}
          </span>
          <span className="block text-[var(--color-text)] mb-2 leading-relaxed">
            {termData.definition}
          </span>
          <span className="block text-[var(--color-muted)] italic text-[11px] border-t border-[var(--color-border)] pt-1.5">
            "{termData.example}"
          </span>
          {/* Arrow */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--color-surface-elevated)]" />
        </span>
      )}
    </span>
  );
}
