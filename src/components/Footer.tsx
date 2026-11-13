import Link from "next/link";
import { MACHINES } from "@/data/machines";
import { ExternalLink, Shield } from "lucide-react";

export default function Footer() {
  const moonMachines = MACHINES.filter((m) => m.destination === "Moon");
  const marsMachines = MACHINES.filter((m) => m.destination === "Mars");
  const deepSpaceMachines = MACHINES.filter((m) => m.destination === "Deep space");

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]/60 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: About & Concept */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-signal-amber)] animate-pulse" />
              <span className="font-display font-bold text-base tracking-wider text-[var(--color-text)]">
                LAST WORDS
              </span>
            </div>
            <p className="text-[var(--color-muted)] text-xs leading-relaxed">
              &ldquo;Every machine NASA left behind said something before it went quiet.&rdquo; An educational storytelling experience for students and space enthusiasts.
            </p>
            <div className="pt-2">
              <Link
                href="/about#methodology"
                className="inline-flex items-center text-xs text-[var(--color-signal-amber)] hover:underline"
              >
                <Shield className="w-3.5 h-3.5 mr-1" />
                Fact-Checking Methodology
              </Link>
            </div>
          </div>

          {/* Col 2: Moon Missions */}
          <div>
            <h3 className="font-mono text-xs text-[var(--color-moon-silver)] uppercase tracking-wider mb-3">
              Moon Artifacts
            </h3>
            <ul className="space-y-2 text-xs">
              {moonMachines.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/machines/${m.slug}`}
                    className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                  >
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Mars & Deep Space */}
          <div>
            <h3 className="font-mono text-xs text-[var(--color-mars-rust)] uppercase tracking-wider mb-3">
              Mars & Deep Space
            </h3>
            <ul className="space-y-2 text-xs">
              {marsMachines.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/machines/${m.slug}`}
                    className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                  >
                    {m.name}
                  </Link>
                </li>
              ))}
              {deepSpaceMachines.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/machines/${m.slug}`}
                    className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                  >
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Official NASA Archives */}
          <div>
            <h3 className="font-mono text-xs text-[var(--color-signal-amber)] uppercase tracking-wider mb-3">
              NASA Primary Archives
            </h3>
            <ul className="space-y-2 text-xs text-[var(--color-muted)]">
              <li>
                <a
                  href="https://science.nasa.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-text)] inline-flex items-center"
                >
                  NASA Science <ExternalLink className="w-3 h-3 ml-1 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.jpl.nasa.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-text)] inline-flex items-center"
                >
                  JPL - Caltech <ExternalLink className="w-3 h-3 ml-1 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://images.nasa.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-text)] inline-flex items-center"
                >
                  NASA Image Library <ExternalLink className="w-3 h-3 ml-1 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://ntrs.nasa.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-text)] inline-flex items-center"
                >
                  NASA Technical Reports (NTRS) <ExternalLink className="w-3 h-3 ml-1 opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory NASA Space Apps Disclaimer */}
        <div className="pt-8 border-t border-[var(--color-border)] text-center space-y-2">
          <p className="text-xs font-medium text-[var(--color-muted)]">
            Independent student project made for the NASA Space Apps Challenge 2026. Not affiliated with or endorsed by NASA.
          </p>
          <p className="text-[11px] text-[var(--color-muted)]/70">
            All photography, mission data, and telemetry credit NASA, JPL-Caltech, ASU, and University of Arizona. Built with accessibility (WCAG 2.2 AA) in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
