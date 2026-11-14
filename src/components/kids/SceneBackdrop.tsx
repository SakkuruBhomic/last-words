"use client";

import React, { useMemo } from "react";
import { useMode } from "@/context/ModeContext";

export type SceneType = "moon" | "mars" | "space";
export type SceneVariant = "day" | "night" | "storm";

interface SceneBackdropProps {
  scene: SceneType;
  variant?: SceneVariant;
  className?: string;
  showEarth?: boolean;
  showFootprints?: boolean;
}

export default function SceneBackdrop({
  scene,
  variant = "day",
  className = "",
  showEarth = true,
  showFootprints = false,
}: SceneBackdropProps) {
  const { calmMode } = useMode();

  // Pre-generate stable star positions so SSR / client hydration matches
  const stars = useMemo(() => {
    const starList = [];
    for (let i = 0; i < 35; i++) {
      const top = (i * 17 + 23) % 100;
      const left = (i * 29 + 47) % 100;
      const size = (i % 3) + 1.5;
      const delay = (i % 5) * 0.7;
      const opacity = 0.35 + (i % 5) * 0.12;
      starList.push({ top, left, size, delay, opacity });
    }
    return starList;
  }, []);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 1. Deep Celestial Gradient Base */}
      {scene === "moon" && (
        <div
          className={`absolute inset-0 transition-colors duration-1000 ${
            variant === "night"
              ? "bg-gradient-to-b from-[#050716] via-[#0B1033] to-[#12163A]"
              : "bg-gradient-to-b from-[#0B1033] via-[#151B4F] to-[#252C6A]"
          }`}
        />
      )}

      {scene === "mars" && (
        <div
          className={`absolute inset-0 transition-colors duration-1000 ${
            variant === "storm"
              ? "bg-gradient-to-b from-[#2B170B] via-[#4A2511] to-[#3B1E0E]"
              : variant === "night"
              ? "bg-gradient-to-b from-[#0F0D24] via-[#20183A] to-[#422638]"
              : "bg-gradient-to-b from-[#2E1E36] via-[#5C2E2B] to-[#9E4A34]"
          }`}
        />
      )}

      {scene === "space" && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#03040C] via-[#070B24] to-[#0D123D]" />
      )}

      {/* 2. Starfield & Milky Way Glow */}
      <div className={`absolute inset-0 ${calmMode ? "" : "animate-star-drift"}`}>
        {stars.map((s, idx) => (
          <div
            key={idx}
            className={`absolute rounded-full bg-white ${
              calmMode ? "" : "animate-twinkle"
            }`}
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}

        {/* Rare gentle shooting star (omitted in calm mode) */}
        {!calmMode && (
          <div
            className="absolute top-1/4 left-1/3 w-28 h-0.5 bg-gradient-to-r from-transparent via-[#FFD34E] to-transparent rotate-[-25deg] opacity-0 animate-shooting-star"
            style={{ animationDelay: "6s" }}
          />
        )}
      </div>

      {/* 3. Scene-Specific Background Celestial Bodies */}
      {/* MOON: Blue-White Earth hanging gently in the black sky */}
      {scene === "moon" && showEarth && (
        <div
          className={`absolute top-8 right-12 sm:right-24 w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-sky-300/30 shadow-[0_0_40px_rgba(108,184,255,0.45)] overflow-hidden bg-gradient-to-tr from-[#0F356B] via-[#2563EB] to-[#60A5FA] ${
            calmMode ? "" : "animate-float-slow"
          }`}
        >
          {/* Swirling soft white cloud patches */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.9)_0%,transparent_50%)]" />
          <div className="absolute top-4 left-2 w-12 h-6 rounded-full bg-white/20 blur-[1px]" />
          <div className="absolute bottom-6 right-3 w-16 h-8 rounded-full bg-white/20 blur-[1px]" />
        </div>
      )}

      {/* MARS: Small Pale Sun & Dust Devils */}
      {scene === "mars" && (
        <>
          {/* Distant small sun */}
          <div
            className={`absolute top-10 left-16 sm:left-32 w-10 h-10 rounded-full bg-[#FFF3D6] shadow-[0_0_35px_rgba(255,211,78,0.5)] transition-opacity duration-1000 ${
              variant === "storm" ? "opacity-20 blur-sm" : "opacity-90"
            }`}
          />

          {/* Storm Swirls */}
          {variant === "storm" && !calmMode && (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(228,87,46,0.25)_0%,transparent_70%)] animate-pulse" />
          )}
        </>
      )}

      {/* DEEP SPACE: Distant sun speck + Expanding Signal Rings */}
      {scene === "space" && (
        <>
          <div className="absolute top-12 left-1/4 w-3 h-3 rounded-full bg-white shadow-[0_0_20px_#FFFFFF]" />
          {/* Faint Milky Way dust lane */}
          <div className="absolute -inset-x-20 top-1/3 h-48 bg-gradient-to-r from-transparent via-[#8E7CFF]/15 to-transparent rotate-[-12deg] blur-2xl" />
        </>
      )}

      {/* 4. Planetary Horizons and Terrain (Bottom Layers) */}
      {scene === "moon" && (
        <div className="absolute bottom-0 left-0 right-0 h-44 sm:h-56">
          {/* Back lunar hill */}
          <svg
            viewBox="0 0 1200 240"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full text-[#1B2238] fill-current"
          >
            <path d="M 0 120 Q 350 40 700 90 T 1200 60 L 1200 240 L 0 240 Z" />
          </svg>

          {/* Front lunar cratered plain */}
          <svg
            viewBox="0 0 1200 180"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-3/4 text-[#2C3450] fill-current"
          >
            <path d="M 0 80 Q 250 20 600 60 T 1200 40 L 1200 180 L 0 180 Z" />
            {/* Crater accents */}
            <ellipse cx="220" cy="110" rx="35" ry="12" fill="#1E2438" opacity="0.6" />
            <ellipse cx="850" cy="130" rx="45" ry="16" fill="#1E2438" opacity="0.5" />
          </svg>

          {/* Footprints (for Surveyor 3 and Apollo panels) */}
          {showFootprints && (
            <div className="absolute bottom-6 left-1/3 flex space-x-3 opacity-70">
              <span className="text-sm">👣</span>
              <span className="text-sm">👣</span>
              <span className="text-sm">👣</span>
            </div>
          )}
        </div>
      )}

      {scene === "mars" && (
        <div className="absolute bottom-0 left-0 right-0 h-44 sm:h-56">
          {/* Back Mars dunes */}
          <svg
            viewBox="0 0 1200 240"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full text-[#7B3322] fill-current"
          >
            <path d="M 0 130 Q 300 50 650 100 T 1200 80 L 1200 240 L 0 240 Z" />
          </svg>

          {/* Front Mars rocky plateau */}
          <svg
            viewBox="0 0 1200 180"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-3/4 text-[#B84E33] fill-current"
          >
            <path d="M 0 70 Q 280 20 580 50 T 1200 30 L 1200 180 L 0 180 Z" />
            {/* Small Martian Rocks */}
            <path d="M 180 85 L 195 72 L 210 87 Z" fill="#6B291A" />
            <path d="M 820 90 L 840 76 L 855 92 Z" fill="#6B291A" />
          </svg>
        </div>
      )}

      {/* 5. Gentle Edge Vignette for Storybook Coziness */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(4,6,11,0.5)_100%)] pointer-events-none" />
    </div>
  );
}
