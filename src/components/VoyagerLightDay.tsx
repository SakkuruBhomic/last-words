"use client";

import { useState, useEffect } from "react";
import { Zap, Timer } from "lucide-react";
import Link from "next/link";
import { useMounted } from "@/lib/useMounted";

export default function VoyagerLightDay() {
  const mounted = useMounted();
  const [now, setNow] = useState<number | null>(null);

  // Target event: 2026-11-18T10:16:07Z
  const targetISO = "2026-11-18T10:16:07Z";
  const targetTime = new Date(targetISO).getTime();

  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted || now === null) {
    return (
      <section className="my-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] animate-pulse h-40" />
      </section>
    );
  }

  const diffMs = targetTime - now;
  const isPast = diffMs <= 0;

  // Calculate days, hours, minutes, seconds
  const totalSeconds = Math.max(0, Math.floor(Math.abs(diffMs) / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <section className="my-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-[var(--color-deep-space-violet)]/40 bg-gradient-to-r from-[#0c0820] via-[var(--color-surface)] to-[#0c0820] p-6 sm:p-10 shadow-2xl">
        {/* Deep space ambient beam */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[var(--color-deep-space-violet)]/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          {/* Information */}
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-[var(--color-deep-space-violet)] font-bold px-3 py-1 rounded-full border border-[var(--color-deep-space-violet)]/30 bg-[var(--color-deep-space-violet)]/10 mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>INTERSTELLAR HORIZON WATCH // HISTORIC EVENT</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              The Voyager 1 Light-Day Moment
            </h2>

            <p className="text-sm text-gray-300 leading-relaxed">
              At 25.9 billion kilometers (173.3 AU) from Earth, Voyager 1 is about to cross the threshold where radio signals traveling at the speed of light take a full <strong>24 hours</strong> to make a one-way trip.
            </p>

            <div className="mt-4 flex items-center space-x-4 text-xs font-mono">
              <Link
                href="/machines/voyager-1"
                className="text-[var(--color-signal-amber)] hover:underline inline-flex items-center"
              >
                <span>Read Voyager 1&apos;s Final Transmission Log →</span>
              </Link>
            </div>
          </div>

          {/* Countdown / Milestone Display */}
          <div className="p-6 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md min-w-[280px] sm:min-w-[340px] text-center">
            <span className="font-mono text-xs text-[var(--color-muted)] mb-3 flex items-center justify-center space-x-1.5">
              <Timer className="w-3.5 h-3.5 text-[var(--color-signal-amber)]" />
              <span>
                {isPast ? "ONE LIGHT-DAY MILESTONE REACHED" : "COUNTDOWN TO ONE LIGHT-DAY"}
              </span>
            </span>

            {isPast ? (
              <div className="space-y-2 py-2">
                <span className="text-xl sm:text-2xl font-bold font-display text-[var(--color-alive-cyan)] block">
                  Voyager 1 is now more than one light-day away
                </span>
                <p className="text-xs text-[var(--color-muted)] font-mono">
                  A radio transmission takes over 24 hours to reach it from Earth.
                </p>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-4 gap-2 text-center my-2">
                  <div className="p-2 rounded bg-white/5 border border-white/10">
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white block">
                      {days}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase">Days</span>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/10">
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white block">
                      {String(hours).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase">Hours</span>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/10">
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white block">
                      {String(minutes).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase">Mins</span>
                  </div>
                  <div className="p-2 rounded bg-white/5 border border-white/10">
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[var(--color-signal-amber)] block">
                      {String(seconds).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase">Secs</span>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-[var(--color-muted)] mt-3">
                  Exact event time: 2026-11-18 10:16:07 UTC
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
