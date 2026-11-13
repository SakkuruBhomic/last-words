"use client";

import { useState } from "react";
import Image from "next/image";
import { MachineImage } from "@/data/types";
import { Sliders, ExternalLink, Image as ImageIcon } from "lucide-react";

interface ThenNowSliderProps {
  images: MachineImage[];
  machineName: string;
}

export default function ThenNowSlider({ images, machineName }: ThenNowSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);

  const thenImage = images.find((img) => img.kind === "then");
  const nowImage = images.find((img) => img.kind === "now");
  const singleImage = images.find((img) => img.kind === "single") || images[0];

  // If only one image exists or either then/now is missing, render single captioned image
  if (!thenImage || !nowImage) {
    return (
      <section className="my-12">
        <div className="flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] mb-2">
          <ImageIcon className="w-4 h-4" />
          <span>MISSION IMAGERY</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-4">
          Archival Photograph
        </h2>

        {singleImage && (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
            <div className="relative aspect-video w-full bg-black">
              <Image
                src={singleImage.src}
                alt={singleImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <div className="p-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[var(--color-muted)] gap-2">
              <p>{singleImage.alt}</p>
              <a
                href={singleImage.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[var(--color-signal-amber)] hover:underline whitespace-nowrap"
              >
                <span>Credit: {singleImage.credit}</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="my-12">
      <div className="flex items-center space-x-2 text-xs font-mono text-[var(--color-signal-amber)] mb-2">
        <Sliders className="w-4 h-4" />
        <span>INTERACTIVE THEN & NOW COMPARISON</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)]">
            Then & Now: Photographic Evidence
          </h2>
          <p className="text-sm text-[var(--color-muted)] mt-1">
            Drag the slider or use Arrow Left/Right keys to compare {machineName} in its prime versus its resting state.
          </p>
        </div>

        <div className="mt-3 sm:mt-0 font-mono text-xs text-[var(--color-muted)] flex items-center space-x-4">
          <span className="text-[var(--color-moon-silver)] font-bold">← THEN ({sliderPos}%)</span>
          <span className="text-[var(--color-signal-amber)] font-bold">NOW ({100 - sliderPos}%) →</span>
        </div>
      </div>

      {/* Comparison Container */}
      <div className="relative aspect-[16/10] sm:aspect-video w-full rounded-2xl overflow-hidden border border-[var(--color-border)] bg-black shadow-2xl select-none">
        {/* NOW Image (Background layer) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={nowImage.src}
            alt={nowImage.alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
          />
          <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm border border-white/20 text-xs font-mono text-[var(--color-signal-amber)] font-bold">
            NOW // RESTING
          </div>
        </div>

        {/* THEN Image (Clipped Foreground layer) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <Image
            src={thenImage.src}
            alt={thenImage.alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
          />
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm border border-white/20 text-xs font-mono text-white font-bold">
            THEN // OPERATIONAL
          </div>
        </div>

        {/* Vertical Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)] z-20 pointer-events-none -translate-x-1/2"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Circular drag handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--color-signal-amber)] text-black font-bold text-xs flex items-center justify-center shadow-lg border-2 border-white">
            ⬌
          </div>
        </div>

        {/* Keyboard-accessible range input overlay */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          aria-label={`Comparison slider between Then and Now images for ${machineName}`}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
        />
      </div>

      {/* Visible Image Credits & Source Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs text-[var(--color-muted)]">
        <div className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
          <span className="font-mono text-[10px] text-white/50 block mb-0.5">THEN PHOTOGRAPH</span>
          <p className="line-clamp-2 text-white/80 mb-1">{thenImage.alt}</p>
          <a
            href={thenImage.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[var(--color-signal-amber)] hover:underline"
          >
            <span>Credit: {thenImage.credit}</span>
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>

        <div className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
          <span className="font-mono text-[10px] text-white/50 block mb-0.5">NOW PHOTOGRAPH</span>
          <p className="line-clamp-2 text-white/80 mb-1">{nowImage.alt}</p>
          <a
            href={nowImage.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[var(--color-signal-amber)] hover:underline"
          >
            <span>Credit: {nowImage.credit}</span>
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
