import { WhatReallyHappened as FactItem } from "@/data/types";
import { CheckCircle2, ExternalLink, Calendar, BookOpen } from "lucide-react";
import GlossaryTooltip from "@/components/GlossaryTooltip";

interface WhatReallyHappenedProps {
  facts: FactItem[];
  machineSlug: string;
}

function formatWithGlossary(text: string) {
  const regex = /\b(sols?|light-days?|rtgs?|seismometers?|heliopause|retroreflectors?)\b/gi;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const matchedWord = match[0];
    const lower = matchedWord.toLowerCase();
    let termKey = lower;
    if (lower.startsWith("sol")) termKey = "sol";
    else if (lower.startsWith("light-day")) termKey = "light-day";
    else if (lower.startsWith("rtg")) termKey = "rtg";
    else if (lower.startsWith("seismometer")) termKey = "seismometer";
    else if (lower.startsWith("retroreflector")) termKey = "retroreflector";

    parts.push(
      <GlossaryTooltip key={match.index} termKey={termKey}>
        {matchedWord}
      </GlossaryTooltip>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function WhatReallyHappened({ facts, machineSlug }: WhatReallyHappenedProps) {
  return (
    <section className="my-12">
      <div className="flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] mb-2">
        <CheckCircle2 className="w-4 h-4" />
        <span>PRIMARY MISSION TELEMETRY</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-2">
        What Really Happened
      </h2>
      <p className="text-sm text-[var(--color-muted)] mb-8">
        Behind every first-person log is verified NASA flight telemetry. Here is the verified factual chronology from mission flight logs.
      </p>

      {/* Chronological Fact Cards */}
      <div className="relative pl-6 border-l border-white/15 space-y-8">
        {facts.map((fact, index) => (
          <div key={index} className="relative group">
            {/* Timeline bullet */}
            <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 border-[var(--color-signal-amber)] bg-[var(--color-void)] group-hover:bg-[var(--color-signal-amber)] transition-colors" />

            <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-glow)] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center text-xs font-mono font-bold text-[var(--color-signal-amber)]">
                  <Calendar className="w-3.5 h-3.5 mr-1.5 opacity-80" />
                  {fact.dateLabel}
                </span>

                <a
                  href={fact.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[var(--color-muted)] hover:text-white inline-flex items-center transition-colors"
                >
                  <span>NASA Source</span>
                  <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
                </a>
              </div>

              <p className="text-sm sm:text-base text-[var(--color-text)]/90 leading-relaxed">
                {formatWithGlossary(fact.text)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Special Journalist Interpretation Sidebar for Opportunity */}
      {machineSlug === "opportunity" && (
        <div className="mt-8 p-5 rounded-xl border border-[var(--color-signal-amber)]/40 bg-[var(--color-surface-elevated)]">
          <div className="flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] font-bold mb-2">
            <BookOpen className="w-4 h-4" />
            <span>HOW SCIENTISTS & JOURNALISTS TELL STORIES (SIDEBAR)</span>
          </div>
          <h3 className="font-display font-bold text-base text-white mb-1.5">
            &ldquo;My battery is low and it&apos;s getting dark&rdquo; — Fact or Poetry?
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
            In February 2019, science journalist Jacob Margolis tweeted this poignant phrase, which went viral around the world. However, Opportunity never spoke English words. 
            The rover transmitted raw binary hex code: its battery bus voltage was declining below operating limits, and the optical depth (<code className="text-amber-300">tau &gt; 10.8</code>) meant midday darkness was impenetrable. 
            Margolis poetically paraphrased what the mission scientists at JPL felt looking at those cold numbers. This illustrates the art of science communication: translating instrument data into human resonance while remaining true to the underlying physical facts.
          </p>
        </div>
      )}
    </section>
  );
}
