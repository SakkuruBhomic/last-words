"use client";

import { useEffect, useState } from "react";
import { Machine } from "@/data/types";
import { Clock } from "lucide-react";
import { useMounted } from "@/lib/useMounted";

interface SilenceClockProps {
  machine: Machine;
}

interface TimeDifference {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateDiff(fromDate: Date, toDate: Date): TimeDifference {
  let years = toDate.getFullYear() - fromDate.getFullYear();
  let months = toDate.getMonth() - fromDate.getMonth();
  let days = toDate.getDate() - fromDate.getDate();
  let hours = toDate.getHours() - fromDate.getHours();
  let minutes = toDate.getMinutes() - fromDate.getMinutes();
  let seconds = toDate.getSeconds() - fromDate.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    const prevMonthLastDay = new Date(toDate.getFullYear(), toDate.getMonth(), 0).getDate();
    days += prevMonthLastDay;
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days, hours, minutes, seconds };
}

export default function SilenceClock({ machine }: SilenceClockProps) {
  const mounted = useMounted();
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    // Schedule periodic tick
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isSilent = machine.status === "silent";
  const isStillTalking = machine.status === "still-talking";
  const isStillAnswering = machine.status === "still-answering";

  // During SSR or before mount
  if (!mounted) {
    return (
      <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-between animate-pulse">
        <div className="h-4 bg-white/10 rounded w-48" />
        <div className="h-6 bg-white/10 rounded w-24" />
      </div>
    );
  }

  const effectiveTime = currentTime || new Date();

  if (isSilent && machine.lastSignalISO) {
    const lastDate = new Date(machine.lastSignalISO);
    const diff = calculateDiff(lastDate, effectiveTime);

    let eventLabel = "Since Last Signal";
    if (machine.slug === "ingenuity") eventLabel = "Since Final Flight 72 Touchdown";
    if (machine.slug === "surveyor-3") eventLabel = "Since First Lunar Nightfall";
    if (machine.slug === "apollo-17-alsep") eventLabel = "Since Commanded Shutdown";
    if (machine.slug === "opportunity") eventLabel = "Since Dust Storm Cutoff (Sol 5111)";
    if (machine.slug === "insight") eventLabel = "Since Final Transmission from Elysium Planitia";
    if (machine.slug === "pioneer-10") eventLabel = "Since Final Carrier Signal";

    return (
      <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--color-muted)] mb-2">
          <span className="flex items-center space-x-1.5 text-white/70">
            <Clock className="w-3.5 h-3.5 text-[var(--color-signal-amber)]" />
            <span>SILENCE CLOCK: {eventLabel.toUpperCase()}</span>
          </span>
          <span className="text-[var(--color-muted)]">
            UTC {effectiveTime.toISOString().substring(11, 19)}
          </span>
        </div>

        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 my-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] font-display">
            {diff.years} years, {diff.months} months, {diff.days} days
          </span>
          <span className="font-mono text-sm text-[var(--color-signal-amber)]">
            {String(diff.hours).padStart(2, "0")}:{String(diff.minutes).padStart(2, "0")}:{String(diff.seconds).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-2 text-xs font-mono text-[var(--color-muted)] flex items-center justify-between border-t border-[var(--color-border)] pt-2.5">
          <span>Last contact: {lastDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
          <span className="text-white/40">STATUS: CARRIER DECAYED</span>
        </div>
      </div>
    );
  }

  const launchDate = new Date(machine.launchISO);
  const diffDays = Math.floor((effectiveTime.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="p-5 rounded-xl border border-[var(--color-alive-cyan)]/40 bg-[var(--color-surface)] shadow-[0_0_20px_rgba(62,230,195,0.08)]">
      <div className="flex items-center justify-between text-xs font-mono mb-2">
        <span className="flex items-center space-x-2 text-[var(--color-alive-cyan)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-alive-cyan)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-alive-cyan)]" />
          </span>
          <span className="font-bold">
            {isStillTalking ? "STILL TRANSMITTING FROM INTERSTELLAR SPACE" : "STILL ANSWERING LASER ECHOES"}
          </span>
        </span>
        <span className="text-[var(--color-muted)]">
          DAY {diffDays.toLocaleString()} SINCE LAUNCH
        </span>
      </div>

      <div className="my-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] font-display">
          Active for {Math.floor(diffDays / 365.25)} Earth years, {(diffDays % 365.25).toFixed(0)} days
        </span>
      </div>

      {isStillTalking && (
        <div className="mt-3 pt-2.5 border-t border-[var(--color-border)] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          <div className="text-[var(--color-muted)]">
            One-way signal time: <span className="text-[var(--color-alive-cyan)] font-bold">~23.1 hours</span>
          </div>
          <div className="text-[var(--color-muted)]">
            Two-way roundtrip delay: <span className="text-[var(--color-alive-cyan)] font-bold">~46.2 hours</span>
          </div>
        </div>
      )}

      {isStillAnswering && (
        <div className="mt-3 pt-2.5 border-t border-[var(--color-border)] text-xs font-mono text-[var(--color-muted)]">
          Roundtrip laser light time to Earth: <span className="text-[var(--color-alive-cyan)] font-bold">~2.56 seconds</span> (384,400 km)
        </div>
      )}
    </div>
  );
}
