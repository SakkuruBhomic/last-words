"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Volume2, VolumeX, Menu, X, Radio, GraduationCap, Info } from "lucide-react";
import { sound } from "@/lib/audio";

export default function Navbar() {
  const pathname = usePathname();
  const [audioActive, setAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setAudioActive(sound.enabled);
  }, []);

  const toggleAudio = () => {
    const nextState = !audioActive;
    sound.setEnabled(nextState);
    setAudioActive(nextState);
    if (nextState) {
      sound.playTelemetryBlip(980, 80);
    }
  };

  const navLinks = [
    { href: "/#timeline", label: "Timeline", icon: Radio },
    { href: "/teachers", label: "For Teachers", icon: GraduationCap },
    { href: "/about", label: "About & Sources", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-void)]/90 backdrop-blur-md">
      {/* Skip Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 z-[100] bg-[var(--color-signal-amber)] text-black px-4 py-2 font-bold rounded"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          onClick={() => {
            setMobileMenuOpen(false);
            if (audioActive) sound.playTelemetryBlip(750, 40);
          }}
          className="flex items-center space-x-3 group focus-visible:ring-2 focus-visible:ring-[var(--color-signal-amber)] p-1 rounded"
          aria-label="LAST WORDS - Home"
        >
          <div className="w-8 h-8 rounded border border-[var(--color-signal-amber)]/40 flex items-center justify-center bg-[var(--color-surface)] group-hover:border-[var(--color-signal-amber)] transition-colors">
            <span className="w-2 h-2 rounded-full bg-[var(--color-signal-amber)] animate-pulse" />
          </div>
          <div>
            <span className="font-display font-bold text-lg tracking-wider text-[var(--color-text)]">
              LAST WORDS
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-mono text-[var(--color-muted)]">
              NASA SPACE APPS 2026
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-[var(--color-signal-amber)] ${
                  isActive ? "text-[var(--color-signal-amber)]" : "text-[var(--color-muted)]"
                }`}
              >
                <Icon className="w-4 h-4 opacity-75" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          {/* Sound Toggle */}
          <button
            onClick={toggleAudio}
            type="button"
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-[var(--color-border)] text-xs font-mono text-[var(--color-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border-glow)] transition-colors"
            aria-label={audioActive ? "Mute telemetry sounds" : "Enable telemetry sounds (off by default)"}
            title={audioActive ? "Telemetry audio active (click to mute)" : "Telemetry audio muted (click to enable)"}
          >
            {audioActive ? (
              <>
                <Volume2 className="w-4 h-4 text-[var(--color-signal-amber)]" />
                <span>AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-[var(--color-muted)]" />
                <span>MUTED</span>
              </>
            )}
          </button>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={toggleAudio}
            type="button"
            className="p-2 text-[var(--color-muted)] hover:text-[var(--color-text)] rounded border border-[var(--color-border)]"
            aria-label={audioActive ? "Mute telemetry audio" : "Enable telemetry audio"}
          >
            {audioActive ? (
              <Volume2 className="w-4 h-4 text-[var(--color-signal-amber)]" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2 text-[var(--color-text)] hover:text-[var(--color-signal-amber)] rounded border border-[var(--color-border)]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium ${
                  isActive
                    ? "bg-[var(--color-surface-elevated)] text-[var(--color-signal-amber)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
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
