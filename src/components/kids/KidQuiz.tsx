"use client";

import React, { useState } from "react";
import { KidQuizQuestion } from "@/data/kidStories";
import { useSound } from "@/context/SoundContext";
import { useStickers } from "@/context/StickerContext";
import { CheckCircle2, RotateCcw, Sparkles, Star } from "lucide-react";
import confetti from "canvas-confetti";

interface KidQuizProps {
  quiz: KidQuizQuestion[];
  machineSlug: string;
  machineTitle: string;
}

export default function KidQuiz({ quiz, machineSlug, machineTitle }: KidQuizProps) {
  const { playDing, playBoing, playPop } = useSound();
  const { unlockSticker } = useStickers();

  // answers: question index -> chosen option index
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [wigglingIndex, setWigglingIndex] = useState<number | null>(null);

  const handleSelectOption = (qIdx: number, oIdx: number) => {
    const isCorrect = oIdx === quiz[qIdx].correctAnswer;

    if (isCorrect) {
      playDing();
      const nextAnswers = { ...answers, [qIdx]: oIdx };
      setAnswers(nextAnswers);

      // Check if all 3 questions are answered correctly!
      const allDone = quiz.every((q, idx) => nextAnswers[idx] === q.correctAnswer);
      if (allDone) {
        unlockSticker(machineSlug);
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ["#FFD34E", "#5BE3C0", "#FF8FB1"],
          });
        } catch {
          // ignore
        }
      }
    } else {
      // Gentle playful feedback: gentle wiggle + try again
      playBoing();
      setWigglingIndex(qIdx);
      setTimeout(() => setWigglingIndex(null), 600);
    }
  };

  const handleReset = () => {
    playPop();
    setAnswers({});
  };

  const completedCount = quiz.filter((q, idx) => answers[idx] === q.correctAnswer).length;
  const isAllComplete = completedCount === quiz.length;

  return (
    <section className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0B1033] to-[#151B4F] border-3 border-[#5BE3C0]/40 shadow-2xl text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-display font-bold text-[#FFD34E] mb-2 px-3 py-1 rounded-full bg-[#FFD34E]/10 border border-[#FFD34E]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KID EXPLORER QUIZ</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            Quick Quiz with {machineTitle}
          </h2>
          <p className="font-body text-base text-gray-200 mt-1">
            Tap a picture to answer. No timers, no failing — just fun learning!
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-[#FFD34E]/20 border border-[#FFD34E]/40 text-[#FFD34E] font-display font-bold text-sm">
            <Star className="w-4 h-4 fill-[#FFD34E]" />
            <span>
              Stars: {completedCount} of {quiz.length}
            </span>
          </div>

          {Object.keys(answers).length > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="p-2.5 rounded-2xl border border-white/20 text-gray-300 hover:text-white hover:bg-white/10"
              title="Reset questions"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 3 Questions */}
      <div className="space-y-8">
        {quiz.map((q, qIdx) => {
          const selected = answers[qIdx];
          const isCorrect = selected === q.correctAnswer;
          const isWiggling = wigglingIndex === qIdx;

          return (
            <div
              key={qIdx}
              className={`p-5 sm:p-6 rounded-3xl border-2 transition-all ${
                isCorrect
                  ? "border-[#5BE3C0] bg-[#5BE3C0]/10 shadow-[0_0_25px_rgba(91,227,192,0.15)]"
                  : isWiggling
                  ? "border-[#FF7A45] animate-wiggle bg-[#FF7A45]/10"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#FFD34E]/20 text-[#FFD34E] font-bold text-sm flex items-center justify-center shrink-0">
                  {qIdx + 1}
                </span>
                <span>{q.question}</span>
              </h3>

              {/* Big Tappable Pillow Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {q.options.map((opt, oIdx) => {
                  const isThisSelected = selected === oIdx;

                  let cardStyle =
                    "border-white/15 bg-white/5 hover:border-[#5BE3C0]/60 hover:bg-white/10 text-white";

                  if (isCorrect && isThisSelected) {
                    cardStyle =
                      "border-[#5BE3C0] bg-[#5BE3C0] text-black font-extrabold shadow-lg";
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={isCorrect}
                      onClick={() => handleSelectOption(qIdx, oIdx)}
                      className={`min-h-[72px] p-4 rounded-2xl border-2 text-left flex items-center space-x-3 transition-all cursor-pointer active:scale-95 ${cardStyle}`}
                    >
                      <span className="text-3xl shrink-0">{opt.icon}</span>
                      <span className="font-display font-medium text-base sm:text-lg leading-tight">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Instant feedback badge */}
              {isCorrect && (
                <div className="mt-4 pt-3 border-t border-[#5BE3C0]/30 flex items-start space-x-2 text-sm text-[#5BE3C0] font-body animate-pop-in">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold font-display">You got it! </span>
                    <span>{q.funFact}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Trophy Card */}
      {isAllComplete && (
        <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-[#FFD34E]/20 via-[#5BE3C0]/20 to-[#FF8FB1]/20 border-2 border-[#FFD34E] text-center animate-pop-in">
          <div className="text-4xl mb-2">🎉 ⭐ 🏆</div>
          <h4 className="font-display font-extrabold text-2xl text-[#FFD34E]">
            Hooray! You answered all questions!
          </h4>
          <p className="font-body text-base text-gray-200 mt-1 max-w-md mx-auto">
            You earned the {machineTitle} explorer sticker! It is safely stored in your Sticker Book.
          </p>
        </div>
      )}
    </section>
  );
}
