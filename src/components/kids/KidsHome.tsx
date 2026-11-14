"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Ping, { PingBubble } from "@/components/kids/Ping";
import SceneBackdrop from "@/components/kids/SceneBackdrop";
import MachineIllustration from "@/components/kids/MachineIllustration";
import { MACHINES } from "@/data/machines";
import { useSound } from "@/context/SoundContext";
import { useStickers } from "@/context/StickerContext";
import { useMode } from "@/context/ModeContext";
import {
  Sparkles,
  ArrowRight,
  Star,
  GraduationCap,
  Shield,
  Recycle,
  Wrench,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";

export default function KidsHome() {
  const { playPop, playBoing, playDing } = useSound();
  const { machineCount, hasSticker } = useStickers();
  const { calmMode } = useMode();
  const [showGrownUpStuff, setShowGrownUpStuff] = useState(false);

  // Group machines into the 3 zones
  const moonMachines = MACHINES.filter((m) => m.destination === "Moon");
  const marsMachines = MACHINES.filter((m) => m.destination === "Mars");
  const spaceMachines = MACHINES.filter((m) => m.destination === "Deep space");

  // Documented Super Stretchers data (Kid units only; excludes Surveyor 3 & Apollo 11 mirror per F2/F3)
  const stretchers = [
    {
      slug: "opportunity",
      name: "Opportunity Rover",
      plannedLabel: "About 3 months",
      realLabel: "Over 14 years!",
      multiplier: "57x",
      plannedPct: 15,
      realPct: 100,
      icon: "🤖",
    },
    {
      slug: "ingenuity",
      name: "Ingenuity Helicopter",
      plannedLabel: "5 flights",
      realLabel: "72 flights!",
      multiplier: "14x",
      plannedPct: 18,
      realPct: 100,
      icon: "🚁",
    },
    {
      slug: "pioneer-10",
      name: "Pioneer 10",
      plannedLabel: "21 months",
      realLabel: "About 31 years!",
      multiplier: "17x",
      plannedPct: 20,
      realPct: 100,
      icon: "⭐",
    },
    {
      slug: "voyager-1",
      name: "Voyager 1",
      plannedLabel: "4 years",
      realLabel: "Over 49 years!",
      multiplier: "12x",
      plannedPct: 22,
      realPct: 100,
      icon: "🚀",
    },
    {
      slug: "insight",
      name: "InSight Lander",
      plannedLabel: "About 2 years",
      realLabel: "Over 4 years!",
      multiplier: "2x",
      plannedPct: 45,
      realPct: 90,
      icon: "👂",
    },
    {
      slug: "apollo-17-alsep",
      name: "Apollo 17 Science Station",
      plannedLabel: "2 years",
      realLabel: "Almost 5 years!",
      multiplier: "2.4x",
      plannedPct: 40,
      realPct: 95,
      icon: "📡",
    },
  ];

  const handleScrollToNeighborhood = () => {
    playPop();
    const el = document.getElementById("neighborhood");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen text-white overflow-hidden pb-16">
      {/* ============================================================== */}
      {/* 1. HERO: Living Scene with Ping Waving */}
      {/* ============================================================== */}
      <section className="relative min-h-[82vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-12 pb-20 text-center overflow-hidden">
        {/* Layered starfield & space backdrop */}
        <SceneBackdrop scene="space" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          {/* Mascot Ping waving */}
          <div className="mb-4">
            <Ping mood="wave" size={140} onClick={playBoing} />
          </div>

          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#5BE3C0]/20 border border-[#5BE3C0]/40 text-[#5BE3C0] font-display font-bold text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            <span>HELLO, LITTLE EXPLORER!</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight sm:leading-tight mb-6">
            Space robots have stories. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD34E] via-[#5BE3C0] to-[#FF8FB1]">
              Let&apos;s listen!
            </span>
          </h1>

          {/* Ping's Speech Bubble */}
          <div className="max-w-xl mb-8">
            <PingBubble text="Hi! I'm Ping. I listen for signals from space. Tap a friend to hear their story!" />
          </div>

          {/* Giant START Button */}
          <button
            type="button"
            onClick={handleScrollToNeighborhood}
            className="min-h-[64px] px-10 py-5 rounded-3xl bg-gradient-to-r from-[#FFD34E] via-[#FF7A45] to-[#FF8FB1] text-black font-display font-black text-2xl shadow-[0_12px_40px_rgba(255,211,78,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center space-x-3 cursor-pointer"
          >
            <span>Start Exploring</span>
            <ArrowRight className="w-7 h-7 stroke-[3]" />
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. SPACE NEIGHBORHOOD MAP: 3 Illustrated Zones */}
      {/* ============================================================== */}
      <section id="neighborhood" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-display font-bold text-[#FFD34E] mb-2">
              <Sparkles className="w-4 h-4" />
              <span>THE SPACE NEIGHBORHOOD</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
              Meet the 8 Explorers
            </h2>
            <p className="font-body text-base sm:text-lg text-gray-300 mt-2 max-w-2xl">
              Tap any friend to open their animated storybook!
            </p>
          </div>

          {/* Sticker Collection Counter */}
          <div className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-[#FFD34E]/20 border border-[#FFD34E]/40 text-[#FFD34E] font-display font-bold text-base self-start sm:self-auto">
            <Star className="w-5 h-5 fill-[#FFD34E]" />
            <span>Stickers Collected: {machineCount} of 8</span>
          </div>
        </div>

        {/* 3 Illustrated Zones */}
        <div className="space-y-12">
          {/* ZONE 1: THE MOON */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#151B4F]/80 to-[#0B1033] border-3 border-sky-400/30 shadow-xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-sky-400/20 text-3xl flex items-center justify-center">
                🌕
              </div>
              <div>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  The Moon
                </h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  Our friendly neighbor in the night sky
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {moonMachines.map((m) => {
                const isAlive = m.status !== "silent";
                const earned = hasSticker(m.slug);

                return (
                  <Link
                    key={m.slug}
                    href={`/machines/${m.slug}`}
                    onClick={playPop}
                    className="group relative p-6 rounded-3xl bg-white/[0.04] border-2 border-white/10 hover:border-[#5BE3C0] hover:bg-white/[0.08] transition-all flex flex-col items-center text-center cursor-pointer"
                  >
                    {/* Sticker earned badge */}
                    {earned && (
                      <span className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#FFD34E] text-black text-sm flex items-center justify-center font-bold shadow-md">
                        ⭐
                      </span>
                    )}

                    <div className="h-44 flex items-center justify-center mb-3">
                      <MachineIllustration
                        slug={m.slug}
                        mood={isAlive ? "glow" : "curious"}
                        size={210}
                        face={true}
                        showPhotoToggle={false}
                      />
                    </div>

                    <h4 className="font-display font-extrabold text-xl text-white group-hover:text-[#5BE3C0] transition-colors mb-2">
                      {m.name}
                    </h4>

                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-display font-bold ${
                        isAlive
                          ? "bg-[#5BE3C0]/20 text-[#5BE3C0] border border-[#5BE3C0]/40 animate-pulse"
                          : "bg-white/10 text-gray-300 border border-white/10"
                      }`}
                    >
                      <span>{isAlive ? "✨ Still answering!" : "🌙 Quiet now"}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ZONE 2: MARS */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#3B1E0E]/80 to-[#1F1008] border-3 border-[#FF7A45]/30 shadow-xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#FF7A45]/20 text-3xl flex items-center justify-center">
                🪐
              </div>
              <div>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  Mars
                </h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  The dusty red planet of craters and volcanoes
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {marsMachines.map((m) => {
                const earned = hasSticker(m.slug);

                return (
                  <Link
                    key={m.slug}
                    href={`/machines/${m.slug}`}
                    onClick={playPop}
                    className="group relative p-6 rounded-3xl bg-white/[0.04] border-2 border-white/10 hover:border-[#FF7A45] hover:bg-white/[0.08] transition-all flex flex-col items-center text-center cursor-pointer"
                  >
                    {earned && (
                      <span className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#FFD34E] text-black text-sm flex items-center justify-center font-bold shadow-md">
                        ⭐
                      </span>
                    )}

                    <div className="h-44 flex items-center justify-center mb-3">
                      <MachineIllustration
                        slug={m.slug}
                        mood="awake"
                        size={210}
                        face={true}
                        showPhotoToggle={false}
                      />
                    </div>

                    <h4 className="font-display font-extrabold text-xl text-white group-hover:text-[#FF7A45] transition-colors mb-2">
                      {m.name}
                    </h4>

                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-display font-bold bg-white/10 text-gray-300 border border-white/10">
                      <span>🌙 Quiet now</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ZONE 3: WAY OUT IN SPACE */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0D123D]/80 to-[#050716] border-3 border-[#8E7CFF]/30 shadow-xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#8E7CFF]/20 text-3xl flex items-center justify-center">
                ✨
              </div>
              <div>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  Way Out in Deep Space
                </h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  Flying beyond the planets toward the stars
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {spaceMachines.map((m) => {
                const isAlive = m.status !== "silent";
                const earned = hasSticker(m.slug);

                return (
                  <Link
                    key={m.slug}
                    href={`/machines/${m.slug}`}
                    onClick={playPop}
                    className="group relative p-6 rounded-3xl bg-white/[0.04] border-2 border-white/10 hover:border-[#8E7CFF] hover:bg-white/[0.08] transition-all flex flex-col items-center text-center cursor-pointer"
                  >
                    {earned && (
                      <span className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#FFD34E] text-black text-sm flex items-center justify-center font-bold shadow-md">
                        ⭐
                      </span>
                    )}

                    <div className="h-44 flex items-center justify-center mb-3">
                      <MachineIllustration
                        slug={m.slug}
                        mood={isAlive ? "glow" : "awake"}
                        size={210}
                        face={true}
                        showPhotoToggle={false}
                      />
                    </div>

                    <h4 className="font-display font-extrabold text-xl text-white group-hover:text-[#8E7CFF] transition-colors mb-2">
                      {m.name}
                    </h4>

                    <span
                      className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-display font-bold ${
                        isAlive
                          ? "bg-[#5BE3C0]/20 text-[#5BE3C0] border border-[#5BE3C0]/40 animate-pulse"
                          : "bg-white/10 text-gray-300 border border-white/10"
                      }`}
                    >
                      <span>{isAlive ? "✨ Still talking!" : "🌙 Quiet now"}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. SUPER STRETCHERS: Elastic animated bars in kid units */}
      {/* ============================================================== */}
      <section className="my-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0B1033] to-[#151B4F] border-3 border-[#FFD34E]/40 shadow-2xl">
          <div className="flex items-center space-x-2 text-xs font-display font-bold text-[#FFD34E] mb-2">
            <Sparkles className="w-4 h-4" />
            <span>ENGINEERING SUPERHEROES</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-3">
            Super Stretchers!
          </h2>
          <p className="font-body text-base sm:text-lg text-gray-200 max-w-2xl mb-8 leading-relaxed">
            NASA built these robots for a short mission. Look how far they stretched!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stretchers.map((s) => (
              <div
                key={s.slug}
                className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#FFD34E]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display font-bold text-lg text-white flex items-center gap-2">
                      <span>{s.icon}</span>
                      <span>{s.name}</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#FFD34E] text-black font-display font-black text-sm shadow">
                      {s.multiplier} LONGER!
                    </span>
                  </div>

                  {/* Elastic Comparison Bars */}
                  <div className="space-y-3 my-4">
                    {/* Planned */}
                    <div>
                      <div className="flex justify-between text-xs font-display text-gray-400 mb-1">
                        <span>Planned goal:</span>
                        <span className="text-white font-medium">{s.plannedLabel}</span>
                      </div>
                      <div className="w-full h-4 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gray-400"
                          style={{ width: `${s.plannedPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Real Stretched */}
                    <div>
                      <div className="flex justify-between text-xs font-display text-gray-300 mb-1">
                        <span className="text-[#FFD34E] font-bold">How long it really worked:</span>
                        <span className="text-[#5BE3C0] font-bold">{s.realLabel}</span>
                      </div>
                      <div className="w-full h-5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#FFD34E] via-[#FF7A45] to-[#5BE3C0] transition-all duration-1000"
                          style={{ width: `${s.realPct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-right">
                  <Link
                    href={`/machines/${s.slug}`}
                    onClick={playPop}
                    className="text-xs font-display font-bold text-[#5BE3C0] hover:underline inline-flex items-center"
                  >
                    <span>Read story →</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. WHY ARE THEY STILL UP THERE? (3 Kid Cards) */}
      {/* ============================================================== */}
      <section className="my-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2">
            Why are they still up there?
          </h2>
          <p className="font-body text-base text-gray-300">
            Three simple reasons why space robots rest across the solar system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card A: Rocket with fuel barrels */}
          <div className="p-7 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-2 border-white/10 flex flex-col justify-between text-center items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FF7A45]/20 text-4xl flex items-center justify-center mb-4">
              🚀
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-2">
              Extra Rockets Needed
            </h3>
            <p className="font-body text-base text-gray-200 leading-relaxed">
              Bringing a robot home would need a whole extra rocket just to lift the fuel.
            </p>
          </div>

          {/* Card B: Sparkling mirror */}
          <div className="p-7 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-2 border-white/10 flex flex-col justify-between text-center items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#5BE3C0]/20 text-4xl flex items-center justify-center mb-4">
              ✨
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-2">
              Still Hard at Work
            </h3>
            <p className="font-body text-base text-gray-200 leading-relaxed">
              Some things, like the laser mirrors, were left on purpose to keep answering forever.
            </p>
          </div>

          {/* Card C: Footprints */}
          <div className="p-7 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-2 border-white/10 flex flex-col justify-between text-center items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#FFD34E]/20 text-4xl flex items-center justify-center mb-4">
              👣
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-2">
              Astronaut Visits
            </h3>
            <p className="font-body text-base text-gray-200 leading-relaxed">
              Sometimes astronauts walk right back for a visit, like Apollo 12 did with Surveyor 3!
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. WHAT HAPPENS TO OLD SPACE STUFF? (Protect, Recycle, Reuse) */}
      {/* ============================================================== */}
      <section className="my-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0B1033] border-3 border-teal-500/30">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2">
              What happens to old space stuff?
            </h2>
            <p className="font-body text-base text-gray-300">
              When humans build bases on the Moon and Mars, here is how we will treat historical machines:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Protect */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-sky-400/20 text-[#6CB8FF] flex items-center justify-center mb-3">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">Protect It</h3>
              <p className="font-body text-sm text-gray-200">
                Landing sites like Tranquility Base are protected as world heritage so rocket dust won&apos;t harm them.
              </p>
            </div>

            {/* Recycle */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#5BE3C0]/20 text-[#5BE3C0] flex items-center justify-center mb-3">
                <Recycle className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">Recycle It</h3>
              <p className="font-body text-sm text-gray-200">
                NASA&apos;s LunaRecycle Challenge asks inventors to turn solid waste into useful tools on the Moon.
              </p>
            </div>

            {/* Reuse */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#FFD34E]/20 text-[#FFD34E] flex items-center justify-center mb-3">
                <Wrench className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">Reuse It</h3>
              <p className="font-body text-sm text-gray-200">
                The PROMISE Moon rover will use spare parts made for Mars rovers to explore the lunar south pole.
              </p>
            </div>
          </div>

          {/* Grown-Up Sourced Info Accordion */}
          <div className="border-t border-white/10 pt-4 text-center">
            <button
              type="button"
              onClick={() => {
                playPop();
                setShowGrownUpStuff(!showGrownUpStuff);
              }}
              className="inline-flex items-center space-x-2 text-xs font-mono text-[#5BE3C0] hover:underline"
            >
              <span>{showGrownUpStuff ? "Hide sourced info" : "Grown-up info & NASA source links"}</span>
              {showGrownUpStuff ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showGrownUpStuff && (
              <div className="mt-4 p-6 rounded-2xl bg-black/40 text-left text-xs space-y-3 font-mono text-gray-300">
                <p>
                  • <strong>Preserve:</strong> 2011 NASA Lunar Recommendations & One Small Step Act (PLAW-116publ275).{" "}
                  <a href="https://www.nasa.gov/pdf/617743main_NASA-USG_LUNAR_HISTORIC_SITES_RevA-508.pdf" target="_blank" rel="noopener noreferrer" className="text-[#FFD34E] underline">
                    NASA PDF ↗
                  </a>
                </p>
                <p>
                  • <strong>Recycle:</strong> NASA LunaRecycle $3M challenge with University of Alabama.{" "}
                  <a href="https://lunarecyclechallenge.ua.edu" target="_blank" rel="noopener noreferrer" className="text-[#FFD34E] underline">
                    LunaRecycle Site ↗
                  </a>
                </p>
                <p>
                  • <strong>Reuse:</strong> PROMISE lunar rover using Mars rover spare inventory.{" "}
                  <a href="https://www.jpl.nasa.gov/news/nasa-awards-moon-base-transportation-technology-science-projects/" target="_blank" rel="noopener noreferrer" className="text-[#FFD34E] underline">
                    JPL News ↗
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. GROWN-UPS AND TEACHERS CARD */}
      {/* ============================================================== */}
      <section className="my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1E293B] to-[#0F172A] border-2 border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FFD34E]/20 text-[#FFD34E] flex items-center justify-center shrink-0">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                Grown-ups & Teachers
              </h3>
              <p className="font-body text-sm text-gray-300">
                Explore our 20-minute classroom lesson plan, printable worksheets, and NASA citations.
              </p>
            </div>
          </div>

          <Link
            href="/teachers"
            onClick={playPop}
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-display font-bold text-sm inline-flex items-center space-x-2"
          >
            <span>Open Teacher Guide</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
