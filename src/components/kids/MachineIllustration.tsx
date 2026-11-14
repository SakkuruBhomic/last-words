"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useMode } from "@/context/ModeContext";
import { Camera, Image as ImageIcon, Sparkles, X } from "lucide-react";

export type MachineMood = "awake" | "curious" | "sleepy" | "quiet" | "glow";

interface MachineIllustrationProps {
  slug: string;
  mood?: MachineMood;
  size?: number; // default 360
  face?: boolean; // default true in kids mode, false in control mode
  outline?: boolean; // true for coloring page printable mode
  cue?: string; // animation cue
  className?: string;
  showPhotoToggle?: boolean;
  photoSrc?: string;
  photoAlt?: string;
  photoCredit?: string;
}

export default function MachineIllustration({
  slug,
  mood = "awake",
  size = 360,
  face = true,
  outline = false,
  cue = "",
  className = "",
  showPhotoToggle = true,
  photoSrc,
  photoAlt,
  photoCredit,
}: MachineIllustrationProps) {
  const { calmMode, mode: appMode } = useMode();
  const [showRealPhoto, setShowRealPhoto] = useState(false);

  // If in control mode, faces default to false unless explicitly overridden
  const showFace = appMode === "kids" && face && !outline;
  const isQuiet = mood === "quiet";
  const isSleepy = mood === "sleepy";
  const isGlowing = mood === "glow";

  // Common stroke & fill tokens
  const strokeColor = outline ? "#000000" : "#1B2238";
  const strokeW = outline ? "2.5" : "3";
  const fillColor = (color: string) => (outline ? "#FFFFFF" : color);

  // Face SVG Helper: Two expressive eyes & gentle smile
  const renderFace = (cx: number, cy: number, eyeSpacing = 16, eyeR = 4.5) => {
    if (!showFace) return null;

    if (isQuiet) {
      // Resting peaceful eyes
      return (
        <g stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" fill="none">
          <path d={`M ${cx - eyeSpacing - 5} ${cy} Q ${cx - eyeSpacing} ${cy + 4} ${cx - eyeSpacing + 5} ${cy}`} />
          <path d={`M ${cx + eyeSpacing - 5} ${cy} Q ${cx + eyeSpacing} ${cy + 4} ${cx + eyeSpacing + 5} ${cy}`} />
          {/* Peaceful closed smile */}
          <path d={`M ${cx - 4} ${cy + 8} Q ${cx} ${cy + 11} ${cx + 4} ${cy + 8}`} />
        </g>
      );
    }

    if (isSleepy) {
      // Drooping eyelids
      return (
        <g>
          <ellipse cx={cx - eyeSpacing} cy={cy} rx={eyeR} ry={eyeR * 0.5} fill="#0B1033" />
          <ellipse cx={cx + eyeSpacing} cy={cy} rx={eyeR} ry={eyeR * 0.5} fill="#0B1033" />
          <path d={`M ${cx - 3} ${cy + 7} Q ${cx} ${cy + 9} ${cx + 3} ${cy + 7}`} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      );
    }

    // Awake or Curious or Glowing
    return (
      <g>
        {/* Left Eye */}
        <circle cx={cx - eyeSpacing} cy={cy} r={eyeR} fill="#0B1033" />
        <circle cx={cx - eyeSpacing + 1.5} cy={cy - 1.5} r={eyeR * 0.4} fill="#FFFFFF" />

        {/* Right Eye */}
        <circle cx={cx + eyeSpacing} cy={cy} r={eyeR} fill="#0B1033" />
        <circle cx={cx + eyeSpacing + 1.5} cy={cy - 1.5} r={eyeR * 0.4} fill="#FFFFFF" />

        {/* Gentle Happy Smile */}
        <path
          d={`M ${cx - 5} ${cy + 8} Q ${cx} ${cy + 13} ${cx + 5} ${cy + 8}`}
          stroke="#0B1033"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Soft Cheeks */}
        {!outline && (
          <>
            <ellipse cx={cx - eyeSpacing - 6} cy={cy + 4} rx="4" ry="2.5" fill="#FF8FB1" opacity="0.6" />
            <ellipse cx={cx + eyeSpacing + 6} cy={cy + 4} rx="4" ry="2.5" fill="#FF8FB1" opacity="0.6" />
          </>
        )}
      </g>
    );
  };

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Real NASA Photo Modal / Overlay Toggle */}
      {showRealPhoto && photoSrc ? (
        <div className="relative rounded-3xl overflow-hidden border-4 border-[#5BE3C0]/60 shadow-2xl bg-black max-w-md w-full">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={photoSrc}
              alt={photoAlt || "NASA Photo"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
          <div className="p-3 bg-[#0B1033] text-xs text-gray-300 flex items-center justify-between">
            <span className="truncate pr-2">{photoCredit || "NASA / JPL"}</span>
            <button
              onClick={() => setShowRealPhoto(false)}
              className="px-2.5 py-1 rounded-full bg-[#5BE3C0] text-black font-bold flex items-center gap-1 hover:opacity-90"
            >
              <X className="w-3.5 h-3.5" /> Back to Cartoon
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`relative transition-transform duration-500 ${
            calmMode ? "" : isGlowing ? "animate-pulse" : "animate-float"
          }`}
          style={{ width: size, height: (size * 3) / 4 }}
        >
          {/* Active Signal Rings for Still-Talking / Still-Answering */}
          {isGlowing && !outline && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <span className="absolute w-48 h-48 rounded-full border-2 border-[#5BE3C0]/40 animate-ping" />
              <span className="absolute w-64 h-64 rounded-full border border-[#5BE3C0]/20 animate-pulse" />
            </div>
          )}

          <svg
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-md"
            role="img"
            aria-label={`${slug} illustration`}
          >
            {/* ============================================================== */}
            {/* 1. SURVEYOR 3 (3 legs + pads, central mast, scoop, camera) */}
            {/* ============================================================== */}
            {slug === "surveyor-3" && (
              <g id="surveyor-3-group">
                {/* 3 Landing Legs */}
                <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round">
                  {/* Left Leg & Footpad */}
                  <line x1="160" y1="210" x2="100" y2="260" />
                  <ellipse cx="95" cy="264" rx="16" ry="6" fill={fillColor("#C9D1DC")} />

                  {/* Center Leg & Footpad */}
                  <line x1="200" y1="215" x2="200" y2="270" />
                  <ellipse cx="200" cy="274" rx="16" ry="6" fill={fillColor("#C9D1DC")} />

                  {/* Right Leg & Footpad */}
                  <line x1="240" y1="210" x2="300" y2="260" />
                  <ellipse cx="305" cy="264" rx="16" ry="6" fill={fillColor("#C9D1DC")} />
                </g>

                {/* Triangular Central Spacecraft Body */}
                <polygon
                  points="150,210 250,210 200,140"
                  fill={fillColor("#E2E8F0")}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                  strokeLinejoin="round"
                />

                {/* Electronics Compartments & Thermal Blankets */}
                <rect
                  x="170"
                  y="170"
                  width="60"
                  height="36"
                  rx="6"
                  fill={fillColor("#CBD5E1")}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                />

                {/* Soil Scoop on Extendable Arm (Right side) */}
                <g
                  className={cue === "dig" && !calmMode ? "animate-dig" : ""}
                  transform-origin="235 185"
                >
                  {/* Accordion Scissor Arm */}
                  <polyline
                    points="235,185 270,195 285,215 320,230"
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeW}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Metal Scoop Bucket */}
                  <path
                    d="M 315 225 L 335 235 L 325 250 L 308 242 Z"
                    fill={fillColor("#94A3B8")}
                    stroke={strokeColor}
                    strokeWidth={strokeW}
                    strokeLinejoin="round"
                  />
                  {/* Dust puff when digging */}
                  {cue === "dig" && !outline && (
                    <circle cx="330" cy="248" r="8" fill="#CBD5E1" opacity="0.6" className="animate-ping" />
                  )}
                </g>

                {/* Central Mast with TV Camera & Solar Panel */}
                <line x1="200" y1="140" x2="200" y2="70" stroke={strokeColor} strokeWidth={strokeW} />

                {/* Flat Solar Panel on top */}
                <rect
                  x="165"
                  y="55"
                  width="70"
                  height="16"
                  rx="3"
                  fill={fillColor("#3B82F6")}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                />

                {/* TV Camera Head */}
                <rect
                  x="185"
                  y="85"
                  width="30"
                  height="26"
                  rx="6"
                  fill={fillColor("#F8FAFC")}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                />
                {/* Camera Lens */}
                <circle cx="200" cy="98" r="7" fill={fillColor("#0F172A")} stroke={strokeColor} strokeWidth="2" />

                {/* Friendly Face on Central Body */}
                {renderFace(200, 185, 12, 4)}
              </g>
            )}

            {/* ============================================================== */}
            {/* 2. APOLLO 17 ALSEP (Gold foil central station, antenna, RTG cylinder) */}
            {/* ============================================================== */}
            {slug === "apollo-17-alsep" && (
              <g id="apollo-17-alsep-group">
                {/* Connecting power cable on ground */}
                <path
                  d="M 215 240 Q 250 255 285 240"
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Finned RTG Nuclear Cylinder (Right side) */}
                <g>
                  {/* Fins */}
                  <line x1="275" y1="205" x2="275" y2="245" stroke={strokeColor} strokeWidth="3" />
                  <line x1="305" y1="205" x2="305" y2="245" stroke={strokeColor} strokeWidth="3" />
                  {/* Cylinder Body */}
                  <rect
                    x="278"
                    y="200"
                    width="24"
                    height="45"
                    rx="5"
                    fill={fillColor("#94A3B8")}
                    stroke={strokeColor}
                    strokeWidth={strokeW}
                  />
                  {/* Warm nuclear thermal glow */}
                  {!outline && !isQuiet && (
                    <circle cx="290" cy="222" r="8" fill="#FFD34E" opacity="0.7" className="animate-pulse" />
                  )}
                </g>

                {/* Central Station Box (Gold Foil look) */}
                <rect
                  x="120"
                  y="170"
                  width="105"
                  height="75"
                  rx="10"
                  fill={fillColor("#F59E0B")}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                />
                {/* Station Legs */}
                <line x1="130" y1="245" x2="125" y2="265" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
                <line x1="215" y1="245" x2="220" y2="265" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />

                {/* Tall Helical Antenna aimed at Earth */}
                <line x1="172" y1="170" x2="172" y2="80" stroke={strokeColor} strokeWidth={strokeW} />
                {/* Dish reflector on antenna */}
                <path
                  d="M 145 100 Q 172 70 200 100"
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                  strokeLinecap="round"
                />
                <circle cx="172" cy="72" r="5" fill={fillColor("#FFD34E")} stroke={strokeColor} strokeWidth="2" />

                {/* Little side sensor (Seismometer dome nearby) */}
                <path
                  d="M 75 255 A 18 18 0 0 1 105 255 Z"
                  fill={fillColor("#E2E8F0")}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                />

                {/* Face on Central Station Box */}
                {renderFace(172, 205, 16, 5)}
              </g>
            )}

            {/* ============================================================== */}
            {/* 3. APOLLO 11 LASER MIRROR (10x10 array, tilted stand, NO antenna) */}
            {/* ============================================================== */}
            {slug === "apollo-11-laser-reflector" && (
              <g id="apollo-11-mirror-group">
                {/* Tilted Ground Stand */}
                <polygon
                  points="120,245 280,245 260,265 140,265"
                  fill={fillColor("#64748B")}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                  strokeLinejoin="round"
                />
                {/* Tilted Mirror Tray Panel */}
                <polygon
                  points="110,210 290,170 300,230 120,250"
                  fill={fillColor("#E2E8F0")}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                  strokeLinejoin="round"
                />

                {/* 10 x 10 Corner Cube Prisms Grid (Represented as gleaming circular prisms) */}
                <g fill={fillColor("#38BDF8")}>
                  {[0, 1, 2, 3, 4].map((col) =>
                    [0, 1, 2, 3].map((row) => (
                      <circle
                        key={`${col}-${row}`}
                        cx={140 + col * 30 + row * 6}
                        cy={200 - col * 6 + row * 10}
                        r="4"
                        stroke={strokeColor}
                        strokeWidth="1.2"
                      />
                    ))
                  )}
                </g>

                {/* Laser Beam Hit & Bounce animation */}
                {(cue === "laser-bounce" || isGlowing) && !outline && (
                  <g className="animate-pulse">
                    {/* Incoming laser from upper right Earth */}
                    <line
                      x1="380"
                      y1="30"
                      x2="210"
                      y2="195"
                      stroke="#5BE3C0"
                      strokeWidth="3.5"
                      strokeDasharray="6 4"
                    />
                    {/* Returning bounce beam */}
                    <line
                      x1="210"
                      y1="195"
                      x2="390"
                      y2="40"
                      stroke="#FFD34E"
                      strokeWidth="3.5"
                    />
                    {/* Sparkle burst at mirror center */}
                    <circle cx="210" cy="195" r="9" fill="#5BE3C0" className="animate-ping" />
                  </g>
                )}

                {/* Face on the side mounting frame */}
                {renderFace(205, 230, 14, 4)}
              </g>
            )}

            {/* ============================================================== */}
            {/* 4. OPPORTUNITY (6 wheels rocker-bogie, solar deck, mast, arm) */}
            {/* ============================================================== */}
            {slug === "opportunity" && (
              <g id="opportunity-group">
                {/* Rocker-Bogie Suspension Frame */}
                <path
                  d="M 120 235 L 165 210 L 220 220 L 280 235"
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* 6 Rover Wheels */}
                {[90, 140, 185, 235, 280, 315].map((wx, idx) => (
                  <g key={idx}>
                    <circle
                      cx={wx}
                      cy={252}
                      r="16"
                      fill={fillColor("#475569")}
                      stroke={strokeColor}
                      strokeWidth={strokeW}
                    />
                    {/* Wheel treads */}
                    <circle cx={wx} cy={252} r="9" fill={fillColor("#94A3B8")} />
                    <line x1={wx} y1={238} x2={wx} y2={266} stroke={strokeColor} strokeWidth="2" />
                  </g>
                ))}

                {/* Main Rover Body Chassis & Rectangular Solar Deck */}
                <rect
                  x="130"
                  y="160"
                  width="145"
                  height="45"
                  rx="8"
                  fill={fillColor("#E2E8F0")}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                />
                {/* Dark Blue Solar Cells */}
                <rect
                  x="135"
                  y="152"
                  width="135"
                  height="12"
                  rx="3"
                  fill={fillColor("#1E3A8A")}
                  stroke={strokeColor}
                  strokeWidth="2"
                />

                {/* Pancam Mast & Camera Head */}
                <line x1="230" y1="160" x2="230" y2="85" stroke={strokeColor} strokeWidth={strokeW} />
                {/* Camera Bar Head */}
                <rect
                  x="212"
                  y="75"
                  width="36"
                  height="18"
                  rx="5"
                  fill={fillColor("#F8FAFC")}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                />
                {/* Dual Stereo Camera Lenses */}
                <circle cx="220" cy="84" r="4.5" fill="#0F172A" />
                <circle cx="238" cy="84" r="4.5" fill="#0F172A" />

                {/* Robotic Arm in Front */}
                <path
                  d="M 130 185 L 95 195 L 85 220"
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                  strokeLinecap="round"
                />
                <circle cx="85" cy="220" r="5" fill={fillColor("#64748B")} stroke={strokeColor} strokeWidth="2" />

                {/* Face on Chassis */}
                {renderFace(190, 182, 16, 4.5)}
              </g>
            )}

            {/* ============================================================== */}
            {/* 5. INSIGHT (Stationary lander, 2 round solar wings, SEIS dome) */}
            {/* ============================================================== */}
            {slug === "insight" && (
              <g id="insight-group">
                {/* 3 Lander Legs with shock pads */}
                <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round">
                  <line x1="160" y1="210" x2="120" y2="265" />
                  <ellipse cx="115" cy="268" rx="14" ry="5" fill={fillColor("#64748B")} />

                  <line x1="200" y1="215" x2="200" y2="270" />
                  <ellipse cx="200" cy="273" rx="14" ry="5" fill={fillColor("#64748B")} />

                  <line x1="240" y1="210" x2="280" y2="265" />
                  <ellipse cx="285" cy="268" rx="14" ry="5" fill={fillColor("#64748B")} />
                </g>

                {/* Left Circular Solar Wing */}
                <g>
                  <circle
                    cx="85"
                    cy="185"
                    r="44"
                    fill={fillColor("#1E3A8A")}
                    stroke={strokeColor}
                    strokeWidth={strokeW}
                  />
                  {/* Solar radial pie segments */}
                  {[0, 45, 90, 135].map((deg) => (
                    <line
                      key={deg}
                      x1={85 - 40 * Math.cos((deg * Math.PI) / 180)}
                      y1={185 - 40 * Math.sin((deg * Math.PI) / 180)}
                      x2={85 + 40 * Math.cos((deg * Math.PI) / 180)}
                      y2={185 + 40 * Math.sin((deg * Math.PI) / 180)}
                      stroke={strokeColor}
                      strokeWidth="1.5"
                    />
                  ))}
                </g>

                {/* Right Circular Solar Wing */}
                <g>
                  <circle
                    cx="315"
                    cy="185"
                    r="44"
                    fill={fillColor("#1E3A8A")}
                    stroke={strokeColor}
                    strokeWidth={strokeW}
                  />
                  {[0, 45, 90, 135].map((deg) => (
                    <line
                      key={deg}
                      x1={315 - 40 * Math.cos((deg * Math.PI) / 180)}
                      y1={185 - 40 * Math.sin((deg * Math.PI) / 180)}
                      x2={315 + 40 * Math.cos((deg * Math.PI) / 180)}
                      y2={185 + 40 * Math.sin((deg * Math.PI) / 180)}
                      stroke={strokeColor}
                      strokeWidth="1.5"
                    />
                  ))}
                </g>

                {/* Central Lander Body */}
                <rect
                  x="150"
                  y="160"
                  width="100"
                  height="50"
                  rx="10"
                  fill={fillColor("#F8FAFC")}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                />

                {/* SEIS Dome Wind Shield on Ground (Right front) */}
                <path
                  d="M 235 260 A 24 24 0 0 1 275 260 Z"
                  fill={fillColor("#CBD5E1")}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                />
                {/* Ground seismic ripples */}
                {(cue === "seismic-ripple" || cue === "arm-place") && !outline && (
                  <ellipse cx="255" cy="262" rx="30" ry="8" fill="none" stroke="#FF7A45" strokeWidth="2" className="animate-ping" />
                )}

                {/* Face on Central Lander Body */}
                {renderFace(200, 185, 14, 4.5)}
              </g>
            )}

            {/* ============================================================== */}
            {/* 6. INGENUITY (Box body, 4 thin wire legs, 2 counter-rotating rotors) */}
            {/* ============================================================== */}
            {slug === "ingenuity" && (
              <g id="ingenuity-group" className={cue === "rotor-spin" && !calmMode ? "animate-hover-helicopter" : ""}>
                {/* 4 Angled Wire Legs */}
                <g stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round">
                  <line x1="180" y1="210" x2="140" y2="265" />
                  <ellipse cx="138" cy="267" rx="5" ry="3" fill="#64748B" />

                  <line x1="190" y1="210" x2="170" y2="265" />
                  <ellipse cx="168" cy="267" rx="5" ry="3" fill="#64748B" />

                  <line x1="210" y1="210" x2="230" y2="265" />
                  <ellipse cx="232" cy="267" rx="5" ry="3" fill="#64748B" />

                  <line x1="220" y1="210" x2="260" y2="265" />
                  <ellipse cx="262" cy="267" rx="5" ry="3" fill="#64748B" />
                </g>

                {/* Gold-wrapped Box Body */}
                <rect
                  x="180"
                  y="160"
                  width="40"
                  height="45"
                  rx="6"
                  fill={fillColor("#F59E0B")}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                />

                {/* Central Rotor Mast */}
                <line x1="200" y1="160" x2="200" y2="60" stroke={strokeColor} strokeWidth="4" />

                {/* Lower Rotor Set */}
                <g className={cue === "rotor-spin" && !calmMode ? "animate-spin-fast origin-[200px_110px]" : ""}>
                  <ellipse cx="200" cy="115" rx="100" ry="7" fill={fillColor("#334155")} stroke={strokeColor} strokeWidth="2" />
                </g>

                {/* Upper Rotor Set */}
                <g className={cue === "rotor-spin" && !calmMode ? "animate-spin-reverse origin-[200px_85px]" : ""}>
                  <ellipse cx="200" cy="85" rx="100" ry="7" fill={fillColor("#334155")} stroke={strokeColor} strokeWidth="2" />
                  {/* Rotor blade chip cue */}
                  {cue === "rotor-chip" && (
                    <polygon points="295,82 302,85 296,88" fill="#FF7A45" />
                  )}
                </g>

                {/* Small Solar Panel above Rotors */}
                <rect
                  x="182"
                  y="52"
                  width="36"
                  height="12"
                  rx="3"
                  fill={fillColor("#1E3A8A")}
                  stroke={strokeColor}
                  strokeWidth="2"
                />

                {/* Face on Gold Box Body */}
                {renderFace(200, 182, 9, 3.5)}
              </g>
            )}

            {/* ============================================================== */}
            {/* 7. PIONEER 10 (Large dish, 6-sided body, RTG booms, golden plaque) */}
            {/* ============================================================== */}
            {slug === "pioneer-10" && (
              <g id="pioneer-10-group">
                {/* Two RTG Booms stretching out */}
                <line x1="160" y1="180" x2="70" y2="230" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
                <rect x="55" y="222" width="22" height="16" rx="3" fill={fillColor("#64748B")} stroke={strokeColor} strokeWidth="2" />

                <line x1="240" y1="180" x2="330" y2="230" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
                <rect x="323" y="222" width="22" height="16" rx="3" fill={fillColor("#64748B")} stroke={strokeColor} strokeWidth="2" />

                {/* Giant Dish Antenna facing Earth */}
                <ellipse
                  cx="200"
                  cy="130"
                  rx="85"
                  ry="50"
                  fill={fillColor("#F8FAFC")}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                />
                {/* Dish Feed Horn */}
                <line x1="200" y1="130" x2="200" y2="75" stroke={strokeColor} strokeWidth={strokeW} />
                <circle cx="200" cy="72" r="6" fill={fillColor("#FFD34E")} stroke={strokeColor} strokeWidth="2" />

                {/* Six-sided Equipment Bay Behind Dish */}
                <polygon
                  points="160,170 240,170 255,210 200,225 145,210"
                  fill={fillColor("#E2E8F0")}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                  strokeLinejoin="round"
                />

                {/* Pioneer Golden Plaque on strut */}
                <g>
                  <rect
                    x="184"
                    y="190"
                    width="32"
                    height="22"
                    rx="2"
                    fill={fillColor("#F59E0B")}
                    stroke={strokeColor}
                    strokeWidth="2"
                  />
                  {/* Subtle human figure etching line */}
                  <line x1="194" y1="195" x2="194" y2="206" stroke="#B45309" strokeWidth="1.5" />
                  <line x1="206" y1="195" x2="206" y2="206" stroke="#B45309" strokeWidth="1.5" />
                </g>

                {/* Face on Dish Center */}
                {renderFace(200, 132, 14, 4)}
              </g>
            )}

            {/* ============================================================== */}
            {/* 8. VOYAGER 1 (Big white dish, 10-sided body, RTG boom, Golden Record) */}
            {/* ============================================================== */}
            {slug === "voyager-1" && (
              <g id="voyager-1-group">
                {/* RTG Power Boom (Left) */}
                <line x1="150" y1="170" x2="60" y2="200" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
                <rect x="42" y="190" width="24" height="20" rx="4" fill={fillColor("#475569")} stroke={strokeColor} strokeWidth="2" />

                {/* Long Magnetometer Sensor Boom (Right) */}
                <line x1="250" y1="170" x2="350" y2="130" stroke={strokeColor} strokeWidth={strokeW} strokeLinecap="round" />
                <circle cx="352" cy="129" r="6" fill={fillColor("#94A3B8")} stroke={strokeColor} strokeWidth="2" />

                {/* Huge White High-Gain Dish Antenna */}
                <ellipse
                  cx="200"
                  cy="120"
                  rx="92"
                  ry="52"
                  fill={fillColor("#FFFFFF")}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                />
                {/* Subreflector Tripod & Feed Horn */}
                <line x1="160" y1="120" x2="200" y2="65" stroke={strokeColor} strokeWidth="2" />
                <line x1="240" y1="120" x2="200" y2="65" stroke={strokeColor} strokeWidth="2" />
                <circle cx="200" cy="62" r="7" fill={fillColor("#64748B")} stroke={strokeColor} strokeWidth="2" />

                {/* 10-sided Bus Body beneath Dish */}
                <rect
                  x="165"
                  y="160"
                  width="70"
                  height="42"
                  rx="7"
                  fill={fillColor("#E2E8F0")}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                />

                {/* The Golden Record on the side */}
                <g>
                  <circle
                    cx="175"
                    cy="180"
                    r="12"
                    fill={fillColor("#F59E0B")}
                    stroke={strokeColor}
                    strokeWidth="2"
                  />
                  <circle cx="175" cy="180" r="4" fill="#B45309" />
                </g>

                {/* Face on Dish Antenna */}
                {renderFace(200, 122, 16, 4.5)}
              </g>
            )}
          </svg>
        </div>
      )}

      {/* Cartoon Disclaimer & Real Photo Toggle */}
      {!outline && (
        <div className="mt-3 flex items-center justify-center space-x-3 text-xs text-[var(--color-muted)]">
          {showFace && (
            <span className="opacity-75">
              Cartoon version. Real machines don&apos;t have faces.
            </span>
          )}

          {showPhotoToggle && photoSrc && (
            <button
              type="button"
              onClick={() => setShowRealPhoto(!showRealPhoto)}
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              <Camera className="w-3.5 h-3.5 text-[#5BE3C0]" />
              <span>{showRealPhoto ? "Cartoon version" : "Real photo"}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
