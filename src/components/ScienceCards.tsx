import { ScienceImpact } from "@/data/types";
import { Atom, FlaskConical } from "lucide-react";

interface ScienceCardsProps {
  science: ScienceImpact[];
  tryIt: string;
  machineName: string;
}

export default function ScienceCards({ science, tryIt, machineName }: ScienceCardsProps) {
  return (
    <section className="my-12">
      <div className="flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] mb-2">
        <Atom className="w-4 h-4" />
        <span>EDUCATIONAL DISCOVERY</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-2">
        The Science {machineName} Made Possible
      </h2>
      <p className="text-sm text-[var(--color-muted)] mb-8">
        These machines were not abandoned in vain. Each robot transformed human physics, geology, and planetary exploration forever.
      </p>

      {/* 3 Science Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {science.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col justify-between hover:border-[var(--color-border-glow)] hover:bg-[var(--color-surface-elevated)] transition-all"
          >
            <div>
              {/* Card Badge */}
              <div className="flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] mb-3">
                <span className="w-5 h-5 rounded-full bg-[var(--color-signal-amber)]/20 flex items-center justify-center font-bold text-[10px]">
                  {index + 1}
                </span>
                <span className="uppercase tracking-wider">BREAKTHROUGH</span>
              </div>

              {/* Idea Header */}
              <h3 className="font-display font-bold text-lg text-white mb-3">
                {item.idea}
              </h3>

              {/* Real Result */}
              <div className="mb-4">
                <span className="font-mono text-[11px] text-[var(--color-muted)] uppercase tracking-wider block mb-1">
                  WHAT THE INSTRUMENTS FOUND:
                </span>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {item.result}
                </p>
              </div>
            </div>

            {/* Why it Matters */}
            <div className="pt-4 border-t border-[var(--color-border)]">
              <span className="font-mono text-[11px] text-[var(--color-signal-amber)] uppercase tracking-wider block mb-1">
                WHY IT MATTERS TODAY:
              </span>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                {item.whyItMatters}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* "Try It" Hands-on Mini-Experiment */}
      <div className="p-5 rounded-xl border border-[var(--color-alive-cyan)]/30 bg-[#06151b] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-[var(--color-alive-cyan)]/20 text-[var(--color-alive-cyan)] mt-0.5">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono text-xs font-bold text-[var(--color-alive-cyan)] uppercase tracking-wider block">
              STUDENT MINI-EXPERIMENT // TRY IT AT HOME OR SCHOOL
            </span>
            <p className="text-sm text-white font-medium mt-1 leading-relaxed">
              {tryIt}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
