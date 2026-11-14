"use client";

import React from "react";
import { useMode } from "@/context/ModeContext";
import KidsHome from "@/components/kids/KidsHome";
import OscilloscopeHero from "@/components/OscilloscopeHero";
import SilenceTimeline from "@/components/SilenceTimeline";
import VoyagerLightDay from "@/components/VoyagerLightDay";
import WhyStillThere from "@/components/WhyStillThere";
import WhatHappensNext from "@/components/WhatHappensNext";
import ListenerBadge from "@/components/ListenerBadge";
import BuiltForLastedBar from "@/components/BuiltForLastedBar";
import { MACHINES } from "@/data/machines";
import Link from "next/link";
import { GraduationCap, ArrowRight, Layers } from "lucide-react";

export default function HomeClientView() {
  const { mode } = useMode();

  if (mode === "kids") {
    return <KidsHome />;
  }

  // Mission Control Mode Home
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Oscilloscope Hero with Carrier Pulse */}
      <OscilloscopeHero />

      {/* 2. Real-time Student Listener Badge Progress */}
      <ListenerBadge />

      {/* 3. The Silence Timeline (1967 - Now) with Destination Filters */}
      <SilenceTimeline />

      {/* 4. Still Talking Band: Voyager 1 Light-Day Moment */}
      <VoyagerLightDay />

      {/* 5. Built For X vs Lasted Y: Comparison Showcase */}
      <section className="my-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] mb-2">
          <Layers className="w-4 h-4" />
          <span>Super survivors</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text)] mb-3">
          Built for X, Lasted Y
        </h2>
        <p className="text-base text-[var(--color-muted)] max-w-2xl mb-8 leading-relaxed">
          NASA robots were built to survive hostile radiation, sub-zero nights, and violent dust storms. Many lasted orders of magnitude beyond their design parameters.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MACHINES.map((machine) => (
            <div key={machine.slug} className="flex flex-col justify-between">
              <BuiltForLastedBar
                designed={machine.designed}
                actual={machine.actual}
                machineName={machine.name}
                machineSlug={machine.slug}
                sourceUrl={machine.sources[0]?.url}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 6. Why Is It Still There? (3 Cards) */}
      <WhyStillThere />

      {/* 7. What Happens Next? (Preserve, Recycle, Reuse) */}
      <WhatHappensNext />

      {/* 8. Callout banner for Teachers & Classrooms */}
      <section className="my-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl border border-[var(--color-signal-amber)]/40 bg-[var(--color-surface)] shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] font-bold mb-3">
              <GraduationCap className="w-4 h-4" />
              <span>EDUCATOR RESOURCES // GRADES 5 - 10</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
              Teaching with LAST WORDS
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Access a turnkey 20-minute lesson plan, guided class discussion prompts, and a printer-friendly student worksheet for your science classroom.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/teachers"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-[var(--color-signal-amber)] text-black font-mono font-bold text-sm hover:opacity-95 shadow-xl transition-all"
            >
              <span>Open Teacher Guide & Worksheet</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
