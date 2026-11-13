"use client";

import { useState, useEffect } from "react";
import { QuizQuestion } from "@/data/types";
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { sound } from "@/lib/audio";

interface QuizProps {
  quiz: QuizQuestion[];
  machineSlug: string;
  machineName: string;
}

export default function Quiz({ quiz, machineSlug, machineName }: QuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isCompletedBefore, setIsCompletedBefore] = useState(false);

  useEffect(() => {
    // Check localStorage for saved completed status
    try {
      const stored = localStorage.getItem(`quiz-completed-${machineSlug}`);
      if (stored === "true") {
        setIsCompletedBefore(true);
      }
    } catch {
      // storage unavailable
    }
  }, [machineSlug]);

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
    sound.playTelemetryBlip(750, 25);
  };

  const allAnswered = quiz.every((_, idx) => selectedAnswers[idx] !== undefined);

  const handleSubmit = () => {
    if (!allAnswered) return;
    setSubmitted(true);

    // Calculate score
    const correctCount = quiz.filter(
      (q, idx) => selectedAnswers[idx] === q.correctAnswer
    ).length;

    if (correctCount >= 2) {
      sound.playTelemetryBlip(1050, 120);
      try {
        localStorage.setItem(`quiz-completed-${machineSlug}`, "true");
        setIsCompletedBefore(true);

        // Fire festive confetti
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#FFB020", "#3EE6C3", "#8E7CFF"],
        });
      } catch {
        // storage disabled
      }
    } else {
      sound.playTelemetryBlip(440, 120);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    sound.playTelemetryBlip(600, 30);
  };

  const score = quiz.filter((q, idx) => selectedAnswers[idx] === q.correctAnswer).length;

  return (
    <section className="my-14 p-6 sm:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[var(--color-border)] gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>KNOWLEDGE CHECK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)]">
            Mission Debrief Quiz
          </h2>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            Test your understanding of {machineName}'s scientific discoveries and mission history.
          </p>
        </div>

        {isCompletedBefore && (
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[var(--color-alive-cyan)]/15 border border-[var(--color-alive-cyan)]/30 text-[var(--color-alive-cyan)] text-xs font-mono font-bold self-start sm:self-auto">
            <Award className="w-4 h-4" />
            <span>MISSION ACCREDITED</span>
          </div>
        )}
      </div>

      {/* 3 Questions */}
      <div className="space-y-8">
        {quiz.map((item, qIdx) => {
          const userChoice = selectedAnswers[qIdx];
          const isCorrect = userChoice === item.correctAnswer;

          return (
            <div key={qIdx} className="space-y-3">
              <h3 className="font-display font-bold text-base sm:text-lg text-white">
                <span className="font-mono text-xs text-[var(--color-signal-amber)] mr-2 font-normal">
                  Q{qIdx + 1}.
                </span>
                {item.q}
              </h3>

              <div className="grid grid-cols-1 gap-2.5" role="radiogroup" aria-label={`Question ${qIdx + 1}`}>
                {item.options.map((option, optIdx) => {
                  const isSelected = userChoice === optIdx;
                  let optionStyle = "border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text)] hover:border-white/30";

                  if (submitted) {
                    if (optIdx === item.correctAnswer) {
                      optionStyle = "border-emerald-500 bg-emerald-950/40 text-emerald-200 font-medium";
                    } else if (isSelected && !isCorrect) {
                      optionStyle = "border-rose-500 bg-rose-950/40 text-rose-200";
                    } else {
                      optionStyle = "border-[var(--color-border)] opacity-50 text-[var(--color-muted)]";
                    }
                  } else if (isSelected) {
                    optionStyle = "border-[var(--color-signal-amber)] bg-[var(--color-signal-amber)]/10 text-white font-medium";
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      disabled={submitted}
                      className={`p-3.5 rounded-xl border text-left text-sm transition-all flex items-start justify-between ${optionStyle}`}
                      role="radio"
                      aria-checked={isSelected}
                    >
                      <span className="flex-1 pr-2">{option}</span>
                      {submitted && optIdx === item.correctAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {submitted && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant explanation feedback */}
              {submitted && (
                <div
                  className={`p-3.5 rounded-lg text-xs leading-relaxed mt-2 border ${
                    isCorrect
                      ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-200"
                      : "bg-amber-950/30 border-amber-500/30 text-amber-200"
                  }`}
                >
                  <strong>{isCorrect ? "Correct!" : "Scientific context:"}</strong> {item.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          {submitted ? (
            <div className="font-mono text-sm">
              Debrief Result:{" "}
              <strong className={score >= 2 ? "text-emerald-400" : "text-amber-400"}>
                {score} / {quiz.length} Correct
              </strong>
              {score === 3 && " — Flawless mission mastery!"}
            </div>
          ) : (
            <span className="text-xs text-[var(--color-muted)] font-mono">
              Answer all 3 questions to record your score.
            </span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {submitted ? (
            <button
              onClick={handleReset}
              type="button"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg border border-[var(--color-border)] text-xs font-mono text-[var(--color-muted)] hover:text-white hover:border-white/40 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Quiz</span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              type="button"
              className={`px-5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all ${
                allAnswered
                  ? "bg-[var(--color-signal-amber)] text-black hover:opacity-90 shadow-lg cursor-pointer"
                  : "bg-white/10 text-white/40 cursor-not-allowed"
              }`}
            >
              Submit Debrief Answers
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
