"use client";

import { useState, useEffect } from "react";
import { QuizQuestion } from "@/data/types";
import { HelpCircle, CheckCircle2, AlertCircle, Award, RotateCcw, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { sound } from "@/lib/audio";

interface QuizProps {
  quiz: QuizQuestion[];
  machineSlug: string;
  machineName: string;
}

export default function Quiz({ quiz, machineSlug, machineName }: QuizProps) {
  // Map of question index -> selected option index
  const [answers, setAnswers] = useState<Record<number, number>>({});
  // Track wrong attempts per question for wiggle animation
  const [wigglingQuestion, setWigglingQuestion] = useState<number | null>(null);
  const [isCompletedBefore, setIsCompletedBefore] = useState(false);

  useEffect(() => {
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
    const isCorrect = optionIndex === quiz[questionIndex].correctAnswer;

    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));

    if (isCorrect) {
      sound.playTelemetryBlip(980, 80);
      // Check if all questions are now answered correctly
      const updatedAnswers = { ...answers, [questionIndex]: optionIndex };
      const allCorrect = quiz.every(
        (q, idx) => updatedAnswers[idx] === q.correctAnswer
      );

      if (allCorrect) {
        sound.playTelemetryBlip(1200, 150);
        try {
          localStorage.setItem(`quiz-completed-${machineSlug}`, "true");
          setIsCompletedBefore(true);
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ["#FFB020", "#3EE6C3", "#8E7CFF"],
          });
        } catch {
          // storage error
        }
      }
    } else {
      // Gentle incorrect feedback: trigger gentle wiggle, allow try again
      sound.playTelemetryBlip(440, 60);
      setWigglingQuestion(questionIndex);
      setTimeout(() => setWigglingQuestion(null), 600);
    }
  };

  const handleReset = () => {
    setAnswers({});
    sound.playTelemetryBlip(600, 40);
  };

  const correctCount = quiz.filter(
    (q, idx) => answers[idx] === q.correctAnswer
  ).length;

  return (
    <section className="my-14 p-6 sm:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[var(--color-border)] gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>KNOWLEDGE CHECK // INSTANT FEEDBACK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)]">
            Mission Debrief Quiz
          </h2>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            Test your understanding of {machineName}&apos;s scientific discoveries. Tap an answer for instant feedback.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {isCompletedBefore && (
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[var(--color-alive-cyan)]/15 border border-[var(--color-alive-cyan)]/30 text-[var(--color-alive-cyan)] text-xs font-mono font-bold">
              <Award className="w-4 h-4" />
              <span>MISSION ACCREDITED</span>
            </div>
          )}

          {Object.keys(answers).length > 0 && (
            <button
              onClick={handleReset}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-xs font-mono text-[var(--color-muted)] hover:text-white transition-colors"
              title="Reset quiz"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress pill */}
      <div className="flex items-center justify-between text-xs font-mono text-[var(--color-muted)] mb-6">
        <span>Correct: {correctCount} of {quiz.length}</span>
        {correctCount === quiz.length && (
          <span className="text-[var(--color-alive-cyan)] font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> All questions completed!
          </span>
        )}
      </div>

      <div className="space-y-8">
        {quiz.map((q, qIdx) => {
          const selected = answers[qIdx];
          const hasAnswered = selected !== undefined;
          const isCorrect = hasAnswered && selected === q.correctAnswer;
          const isWrong = hasAnswered && !isCorrect;
          const isWiggling = wigglingQuestion === qIdx;

          return (
            <div
              key={qIdx}
              className={`p-5 rounded-xl border transition-all ${
                isWiggling ? "animate-wiggle border-red-500/40" : "border-white/5 bg-white/[0.02]"
              }`}
            >
              <h3 className="font-display font-semibold text-base sm:text-lg text-[var(--color-text)] mb-4 flex items-start gap-2">
                <span className="text-[var(--color-signal-amber)] font-mono text-sm">
                  0{qIdx + 1}.
                </span>
                <span>{q.q}</span>
              </h3>

              <div className="grid grid-cols-1 gap-2.5">
                {q.options.map((option, oIdx) => {
                  const isThisSelected = selected === oIdx;
                  const isThisCorrect = oIdx === q.correctAnswer;

                  let buttonStyle = "border-[var(--color-border)] bg-[var(--color-surface-elevated)]/60 text-gray-300 hover:border-[var(--color-signal-amber)]/50";

                  if (hasAnswered) {
                    if (isThisSelected && isThisCorrect) {
                      buttonStyle = "border-[var(--color-alive-cyan)] bg-[var(--color-alive-cyan)]/20 text-white font-medium ring-1 ring-[var(--color-alive-cyan)]";
                    } else if (isThisSelected && !isThisCorrect) {
                      buttonStyle = "border-red-500/50 bg-red-500/10 text-red-200";
                    } else if (isCorrect && isThisCorrect) {
                      buttonStyle = "border-[var(--color-alive-cyan)]/40 bg-[var(--color-alive-cyan)]/10 text-gray-200";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelectOption(qIdx, oIdx)}
                      className={`text-left p-3.5 rounded-xl border transition-all text-sm flex items-center justify-between cursor-pointer ${buttonStyle}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono border border-white/20 shrink-0">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {hasAnswered && isThisSelected && (
                        <div className="ml-2 shrink-0">
                          {isThisCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-[var(--color-alive-cyan)]" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-400" />
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant feedback message & explanation */}
              {hasAnswered && (
                <div className="mt-4 pt-3 border-t border-white/10">
                  {isCorrect ? (
                    <div className="text-xs text-[var(--color-alive-cyan)] flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Correct! </span>
                        <span className="text-gray-300">{q.explanation}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-amber-300/90 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Not quite. Give it another try!</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
