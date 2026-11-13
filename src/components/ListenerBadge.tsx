"use client";

import { useState, useEffect } from "react";
import { MACHINES } from "@/data/machines";
import { Award } from "lucide-react";
import confetti from "canvas-confetti";
import { useMounted } from "@/lib/useMounted";

export default function ListenerBadge() {
  const [completedCount, setCompletedCount] = useState(0);
  const mounted = useMounted();

  useEffect(() => {
    let count = 0;
    try {
      MACHINES.forEach((m) => {
        if (localStorage.getItem(`quiz-completed-${m.slug}`) === "true") {
          count++;
        }
      });
      setCompletedCount(count);

      // If unlocked all 8 for the first time, celebrate!
      if (count === MACHINES.length && !sessionStorage.getItem("badge-celebrated")) {
        sessionStorage.setItem("badge-celebrated", "true");
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#FFB020", "#3EE6C3", "#C9D1DC"],
        });
      }
    } catch {
      // storage unavailable
    }
  }, []);

  if (!mounted) return null;

  const isMaster = completedCount === MACHINES.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isMaster
            ? "border-[var(--color-signal-amber)] bg-gradient-to-r from-amber-950/40 via-[var(--color-surface)] to-amber-950/40 shadow-[0_0_30px_rgba(255,176,32,0.15)]"
            : "border-[var(--color-border)] bg-[var(--color-surface)]"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                isMaster
                  ? "bg-[var(--color-signal-amber)] text-black"
                  : "bg-white/5 text-[var(--color-muted)] border border-white/10"
              }`}
            >
              <Award className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs text-[var(--color-signal-amber)] uppercase tracking-wider">
                  STUDENT BADGE PROGRESS
                </span>
                {isMaster && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--color-signal-amber)]/20 text-[var(--color-signal-amber)] font-bold">
                    UNLOCKED
                  </span>
                )}
              </div>
              <h3 className="font-display font-bold text-lg text-white">
                {isMaster ? "Certified Deep Space Listener" : "Mission Debrief Progress"}
              </h3>
              <p className="text-xs text-[var(--color-muted)]">
                {isMaster
                  ? "Congratulations! You have completed the scientific debrief for all 8 NASA missions."
                  : "Complete quizzes across all machines to unlock the NASA Space Apps Listener Badge."}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 self-end sm:self-center">
            <div className="text-right">
              <span className="font-mono text-lg font-bold text-white block">
                {completedCount} / {MACHINES.length}
              </span>
              <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase">
                Missions Debriefed
              </span>
            </div>

            {/* Micro progress ring/bar */}
            <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--color-signal-amber)] transition-all duration-500"
                style={{ width: `${(completedCount / MACHINES.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
