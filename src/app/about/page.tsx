import type { Metadata } from "next";
import { MACHINES } from "@/data/machines";
import { Shield, BookOpen, Image as ImageIcon, ExternalLink, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About, Sources & Methodology | LAST WORDS - NASA Space Apps 2026",
  description: "How we verified facts against primary NASA archives, full attribution table for every image, and pedagogical rationale.",
};

export default function AboutPage() {
  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="border-b border-[var(--color-border)] pb-8 mb-12">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] mb-2">
          <Shield className="w-4 h-4" />
          <span>METHODOLOGY & ATTRIBUTION</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          About LAST WORDS
        </h1>
        <p className="text-lg text-[var(--color-muted)] leading-relaxed max-w-3xl">
          LAST WORDS is an interactive educational project built for the <strong>NASA Space Apps Challenge 2026</strong>. Our mission is to introduce school-age space enthusiasts (ages 10–16) to the discarded equipment resting on the Moon, Mars, and in deep space, connecting them to the revolutionary science made possible by these silent explorers.
        </p>
      </header>

      {/* Section 1: Pedagogical Note: Why do the machines talk? */}
      <section className="my-12 p-8 rounded-2xl border border-[var(--color-signal-amber)]/40 bg-[var(--color-surface)]">
        <div className="flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] font-bold mb-2">
          <BookOpen className="w-4 h-4" />
          <span>PEDAGOGICAL TRANSPARENCY</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">
          Why Do The Machines &quot;Talk&quot;?
        </h2>
        <div className="text-sm text-gray-300 leading-relaxed space-y-3">
          <p>
            Robotic rovers, landers, and orbiters are collections of aluminum, silicon circuits, composite solar arrays, and beryllium mirrors. They do not possess feelings, vocal cords, or consciousness. In reality, they transmit hexadecimal strings of binary telemetry: thermistor voltage drops, radiation sensor counts, and compressed JPEG image matrices.
          </p>
          <p>
            We use dramatized, first-person &quot;Final Logs&quot; as an intentional literary device to make complex robotic engineering relatable and memorable for students. 
            However, we adhere to a strict rule: <strong>accuracy beats drama</strong>. Every log entry maps 1:1 to a verified historical event documented in NASA flight director logs. Each dramatized line is explained factually right beneath it in the <em>What Really Happened</em> panel.
          </p>
        </div>
      </section>

      {/* Section 2: Fact-Checking Methodology */}
      <section id="methodology" className="my-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Our Fact-Checking Methodology
        </h2>
        <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-sm text-gray-300 space-y-3 leading-relaxed mb-6">
          <p>
            No AI hallucinations or fictional dates are published on this website. Our research adheres to a strict hierarchy of primary sources:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm font-mono text-gray-300">
            <li>
              <strong>Primary NASA Repositories:</strong> Official NASA mission archives (<code>science.nasa.gov</code>, <code>jpl.nasa.gov</code>, <code>mars.nasa.gov</code>).
            </li>
            <li>
              <strong>NASA Technical Reports Server (NTRS):</strong> Declassified termination reports and engineering assessments (such as the ALSEP permanent termination report <code>19790014808</code>).
            </li>
            <li>
              <strong>University Instrument Teams:</strong> Direct telemetry publications from Arizona State University (LROC Moon imaging) and University of Arizona (HiRISE Mars orbital imaging).
            </li>
            <li>
              <strong>UTC Timestamp Standardization:</strong> When local control station logs and universal time differed (e.g. Pioneer 10 Jan 22 US Pacific vs Jan 23 UTC), we standardize to the verified fact sheet and supply transparent footnotes.
            </li>
          </ol>
        </div>
      </section>

      {/* Section 3: Image Credits & Attribution Table */}
      <section className="my-12">
        <div className="flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] mb-2">
          <ImageIcon className="w-4 h-4" />
          <span>FULL PUBLIC ASSET REGISTRY</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Complete Image Attribution & Rights Table
        </h2>
        <p className="text-sm text-[var(--color-muted)] mb-6">
          Every photo is public domain NASA, JPL-Caltech, ASU, or University of Arizona imagery. No copyrighted material is utilized.
        </p>

        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[var(--color-surface-elevated)] border-b border-[var(--color-border)] text-white/70 uppercase">
              <tr>
                <th className="p-3">Mission</th>
                <th className="p-3">Era</th>
                <th className="p-3">Credit Attribution</th>
                <th className="p-3">Primary Source Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-[var(--color-surface)]">
              {MACHINES.flatMap((m) =>
                m.images.map((img, idx) => (
                  <tr key={`${m.slug}-${idx}`} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-bold text-white">{m.name}</td>
                    <td className="p-3 uppercase text-[var(--color-signal-amber)]">{img.kind}</td>
                    <td className="p-3 text-[var(--color-muted)]">{img.credit}</td>
                    <td className="p-3">
                      <a
                        href={img.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-signal-amber)] hover:underline inline-flex items-center"
                      >
                        <span>NASA Image Archive</span>
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Full Mission Citations */}
      <section className="my-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          Full Mission Bibliography & Citations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MACHINES.map((m) => (
            <div key={m.slug} className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
              <h3 className="font-display font-bold text-base text-white mb-2">
                {m.name} ({m.destination})
              </h3>
              <ul className="space-y-1.5 text-xs">
                {m.sources.map((s, idx) => (
                  <li key={idx}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-signal-amber)] hover:underline inline-flex items-center"
                    >
                      <span>{s.label}</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Legal Disclaimer */}
      <section className="my-12 p-6 rounded-xl border border-white/10 bg-black/40 text-xs text-[var(--color-muted)] space-y-2">
        <div className="flex items-center space-x-2 text-white font-bold mb-1">
          <AlertCircle className="w-4 h-4 text-[var(--color-signal-amber)]" />
          <span>LEGAL NOTICE & COMPETITION DISCLAIMER</span>
        </div>
        <p>
          Independent student project made for the NASA Space Apps Challenge 2026. Not affiliated with or endorsed by the National Aeronautics and Space Administration (NASA).
        </p>
        <p>
          This website does not display official NASA insignia or logos. All information, telemetry quotes, and imagery are compiled from open public-domain educational resources provided by the United States government.
        </p>
      </section>
    </article>
  );
}
