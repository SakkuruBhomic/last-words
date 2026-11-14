"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Radio } from "lucide-react";

export type PingMood = "idle" | "blink" | "listening" | "cheer" | "sleepy" | "wave";

interface PingProps {
  mood?: PingMood;
  size?: number; // default 120
  className?: string;
  onClick?: () => void;
}

export default function Ping({
  mood = "idle",
  size = 120,
  className = "",
  onClick,
}: PingProps) {
  const [internalBlink, setInternalBlink] = useState(false);

  // Periodic automatic blink every 3.5 - 5 seconds when idle or listening
  useEffect(() => {
    if (mood !== "idle" && mood !== "listening") return;
    const interval = setInterval(() => {
      setInternalBlink(true);
      setTimeout(() => setInternalBlink(false), 180);
    }, 3800);
    return () => clearInterval(interval);
  }, [mood]);

  const isBlinking = mood === "blink" || internalBlink;
  const isListening = mood === "listening";
  const isCheering = mood === "cheer";
  const isSleepy = mood === "sleepy";
  const isWaving = mood === "wave";

  return (
    <div
      onClick={onClick}
      className={`inline-block relative select-none transition-transform duration-300 ${
        isCheering ? "animate-bounce" : "animate-float"
      } ${className}`}
      style={{ width: size, height: size * 1.15 }}
      role="img"
      aria-label="Ping the friendly space mascot"
    >
      <svg
        viewBox="0 0 160 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-lg"
      >
        <defs>
          {/* Ping Teal Gradient */}
          <linearGradient id="pingTeal" x1="20" y1="40" x2="140" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5BE3C0" />
            <stop offset="100%" stopColor="#14B8A6" />
          </linearGradient>

          {/* Eye Sparkle */}
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#0B1033" />
          </radialGradient>

          {/* Radio Waves Arc Gradient */}
          <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5BE3C0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFD34E" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* 1. Radio Wave Ear Arcs (Left and Right) */}
        <g className={isListening ? "animate-pulse" : ""}>
          {/* Left Radio Arcs */}
          <path
            d="M 28 65 A 35 35 0 0 0 28 115"
            stroke="url(#waveGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity={isListening ? "1" : "0.75"}
          />
          <path
            d="M 18 55 A 48 48 0 0 0 18 125"
            stroke="url(#waveGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="2 6"
            fill="none"
            opacity={isListening ? "0.9" : "0.45"}
          />

          {/* Right Radio Arcs */}
          <path
            d="M 132 65 A 35 35 0 0 1 132 115"
            stroke="url(#waveGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity={isListening ? "1" : "0.75"}
          />
          <path
            d="M 142 55 A 48 48 0 0 1 142 125"
            stroke="url(#waveGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="2 6"
            fill="none"
            opacity={isListening ? "0.9" : "0.45"}
          />
        </g>

        {/* 2. Antenna Mast with Glowing Tip */}
        <g>
          {/* Antenna stem */}
          <line
            x1="80"
            y1="52"
            x2="80"
            y2="24"
            stroke="#14B8A6"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Glowing tip */}
          <circle
            cx="80"
            cy="20"
            r="9"
            fill="#FFD34E"
            className="animate-pulse"
          />
          <circle
            cx="80"
            cy="20"
            r="14"
            fill="#FFD34E"
            opacity="0.35"
            className="animate-ping"
          />
        </g>

        {/* 3. Round Teal Body */}
        <ellipse
          cx="80"
          cy="105"
          rx="52"
          ry="48"
          fill="url(#pingTeal)"
          stroke="#0D9488"
          strokeWidth="3.5"
        />

        {/* Soft Belly Highlight */}
        <ellipse
          cx="80"
          cy="118"
          rx="32"
          ry="24"
          fill="#FFFFFF"
          opacity="0.18"
        />

        {/* 4. Cheeks (Soft Peach Glow) */}
        <ellipse cx="52" cy="116" rx="8" ry="5" fill="#FF8FB1" opacity="0.65" />
        <ellipse cx="108" cy="116" rx="8" ry="5" fill="#FF8FB1" opacity="0.65" />

        {/* 5. Big Friendly Eyes */}
        {isBlinking || isSleepy ? (
          // Closed smiling curves
          <g stroke="#0B1033" strokeWidth="4" strokeLinecap="round" fill="none">
            <path d="M 52 98 Q 62 106 72 98" />
            <path d="M 88 98 Q 98 106 108 98" />
          </g>
        ) : (
          // Open big eyes
          <g>
            {/* Left Eye */}
            <circle cx="62" cy="96" r="11" fill="#0B1033" />
            <circle cx="65" cy="93" r="4.5" fill="#FFFFFF" />
            <circle cx="59" cy="99" r="2" fill="#FFFFFF" />

            {/* Right Eye */}
            <circle cx="98" cy="96" r="11" fill="#0B1033" />
            <circle cx="101" cy="93" r="4.5" fill="#FFFFFF" />
            <circle cx="95" cy="99" r="2" fill="#FFFFFF" />
          </g>
        )}

        {/* 6. Mouth */}
        {isCheering ? (
          // Big happy open smile
          <path
            d="M 68 116 Q 80 134 92 116 Z"
            fill="#FF8FB1"
            stroke="#0B1033"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        ) : isSleepy ? (
          // Little 'o' yawn
          <ellipse cx="80" cy="118" rx="5" ry="7" fill="#0B1033" />
        ) : (
          // Friendly gentle arc smile
          <path
            d="M 72 115 Q 80 124 88 115"
            stroke="#0B1033"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* 7. Waving Arm */}
        {isWaving && (
          <g className="animate-spin-gentle origin-[125px_100px]">
            <path
              d="M 124 100 Q 148 90 144 72 Q 138 68 128 85 Z"
              fill="#5BE3C0"
              stroke="#0D9488"
              strokeWidth="3"
            />
          </g>
        )}

        {/* 8. Star Sparkles when cheering */}
        {isCheering && (
          <g fill="#FFD34E">
            <polygon points="30,35 33,42 40,45 33,48 30,55 27,48 20,45 27,42" className="animate-ping" />
            <polygon points="135,30 137,35 142,37 137,39 135,44 133,39 128,37 133,35" className="animate-pulse" />
          </g>
        )}
      </svg>
    </div>
  );
}

// Ping Speech Bubble Component
interface PingBubbleProps {
  text: string;
  className?: string;
  children?: React.ReactNode;
}

export function PingBubble({ text, className = "", children }: PingBubbleProps) {
  return (
    <div
      aria-live="off"
      className={`relative rounded-3xl p-6 sm:p-7 bg-[#0B1033]/95 border-3 border-[#5BE3C0]/40 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-md text-white transition-all transform animate-pop-in ${className}`}
    >
      {/* Speech bubble tail pointer pointing towards Ping */}
      <div className="absolute -left-3 top-8 w-6 h-6 bg-[#0B1033] border-l-3 border-b-3 border-[#5BE3C0]/40 rotate-45 pointer-events-none" />

      <p className="font-display font-medium text-xl sm:text-2xl sm:leading-snug text-white tracking-wide">
        {text}
      </p>

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
