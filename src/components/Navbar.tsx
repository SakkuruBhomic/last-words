"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Volume2, VolumeX, Menu, X, Radio, GraduationCap, Info, Star } from "lucide-react";
import { useMode } from "@/context/ModeContext";
import { useSound } from "@/context/SoundContext";
import { useStickers } from "@/context/StickerContext";
import ModeSwitch from "@/components/ModeSwitch";

export default function Navbar() {
  const pathname = usePathname();
  const { mode } = useMode();
  const { soundEnabled, toggleSound, playPop } = useSound();
  const { machineCount, openStickerBook } = useStickers();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isKids = mode === "kids";

  const navLinks = [
    { href: isKids ? "/#neighborhood" : "/#timeline", label: isKids ? "Space Friends" : "Timeline", icon: Radio },
    { href: "/teachers", label: "For Teachers", icon: GraduationCap },
    { href: "/about", label: "About & Sources", icon: Info },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors backdrop-blur-md ${
        isKids
          ? "border-teal-500/20 bg-[#0B1033]/90"
          : "border-[var(--color-border)] bg-[var(--color-void)]/90"
      }`}
    >
      {/* Skip Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 z-[100] bg-[var(--color-signal-amber)] text-black px-4 py-2 font-bold rounded"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <Link
            href="/"
            onClick={() => {
              setMobileMenuOpen(false);
              playPop();
            }}
            className="flex items-center space-x-3 group focus-visible:ring-2 focus-visible:ring-[#5BE3C0] p-1 rounded"
            aria-label="LAST WORDS - Home"
          >
            <div
              className={`w-9 h-9 rounded-2xl border flex items-center justify-center transition-all ${
                isKids
                  ? "border-[#5BE3C0]/40 bg-[#151B4F] text-xl"
                  : "border-[var(--color-signal-amber)]/40 bg-[var(--color-surface)]"
              }`}
            >
              {isKids ? "🚀" : <span className="w-2 h-2 rounded-full bg-[var(--color-signal-amber)] animate-pulse" />}
            </div>
            <div>
              <span className={`font-display font-extrabold text-lg sm:text-xl tracking-wider ${
                isKids ? "text-white" : "text-[var(--color-text)]"
              }`}>
                LAST WORDS
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-mono text-[var(--color-muted)]">
                NASA SPACE APPS 2026
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Controls & Nav */}
        <div className="hidden md:flex items-center space-x-5 lg:space-x-7">
          {/* Main Links */}
          <nav className="flex items-center space-x-5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? isKids
                        ? "text-[#5BE3C0] font-bold"
                        : "text-[var(--color-signal-amber)]"
                      : "text-[var(--color-muted)] hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-75" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Sticker Book Button */}
          <button
            type="button"
            onClick={() => {
              playPop();
              openStickerBook();
            }}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-[#FFD34E]/40 bg-[#FFD34E]/10 text-xs font-display font-bold text-[#FFD34E] hover:bg-[#FFD34E]/20 transition-all cursor-pointer"
            title="Open Explorer Sticker Book"
          >
            <Star className="w-3.5 h-3.5 fill-[#FFD34E]" />
            <span>Stickers: {machineCount}/8</span>
          </button>

          {/* Sound Toggle (Big & Labeled for Kids, Sleek for Mission Control) */}
          <button
            onClick={() => {
              playPop();
              toggleSound();
            }}
            type="button"
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
              soundEnabled
                ? "border-[#5BE3C0]/50 bg-[#5BE3C0]/15 text-[#5BE3C0] font-bold text-xs"
                : "border-white/10 bg-white/5 text-gray-400 hover:text-white text-xs font-mono"
            }`}
            aria-label={soundEnabled ? "Mute sounds" : "Enable sounds (off by default)"}
            title={soundEnabled ? "Sounds active (click to mute)" : "Sounds muted (click to enable)"}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-[#5BE3C0]" />
                <span className="font-display font-bold">SOUND ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span>MUTED</span>
              </>
            )}
          </button>

          {/* Mode Switch Component */}
          <ModeSwitch />
        </div>

        {/* Mobile controls & menu trigger */}
        <div className="flex md:hidden items-center space-x-2">
          {/* Sticker book mini */}
          <button
            type="button"
            onClick={() => {
              playPop();
              openStickerBook();
            }}
            className="p-2 rounded-full border border-[#FFD34E]/40 text-[#FFD34E]"
            aria-label="Open stickers"
          >
            <Star className="w-4 h-4 fill-[#FFD34E]" />
          </button>

          {/* Sound mini */}
          <button
            onClick={() => {
              playPop();
              toggleSound();
            }}
            type="button"
            className="p-2 text-gray-300 hover:text-white rounded-full border border-white/10"
            aria-label={soundEnabled ? "Mute sounds" : "Enable sounds"}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#5BE3C0]" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2 text-white rounded-lg border border-white/10"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#0B1033] px-4 pt-3 pb-6 space-y-4">
          <div className="pb-3 border-b border-white/10 flex justify-between items-center">
            <span className="text-xs text-gray-400 font-mono">EXPLORATION MODE</span>
            <ModeSwitch />
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-base font-medium ${
                  isActive
                    ? "bg-white/10 text-[#5BE3C0] font-bold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
