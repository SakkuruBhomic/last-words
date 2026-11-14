"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

export type AppMode = "kids" | "control";
export type TextSize = "normal" | "large" | "xlarge";

interface ModeContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  toggleMode: () => void;
  calmMode: boolean;
  setCalmMode: (calm: boolean) => void;
  toggleCalmMode: () => void;
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  cycleTextSize: () => void;
  hasChosenMode: boolean;
  setHasChosenMode: (chosen: boolean) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

function QueryParamSync({ onSync }: { onSync: (mode: AppMode) => void }) {
  const searchParams = useSearchParams();
  useEffect(() => {
    const qMode = searchParams.get("mode");
    if (qMode === "kids" || qMode === "control") {
      onSync(qMode);
    }
  }, [searchParams, onSync]);

  return null;
}

export function ModeProvider({ children }: { children: React.ReactNode }) {
  // Default to 'kids' (Little Explorers) for first-time visitors
  const [mode, setModeState] = useState<AppMode>("kids");
  const [hasChosenMode, setHasChosenMode] = useState<boolean>(true); // will check in useEffect
  const [calmMode, setCalmModeState] = useState<boolean>(false);
  const [textSize, setTextSizeState] = useState<TextSize>("normal");
  const [, startTransition] = useTransition();

  useEffect(() => {
    // 1. Check prefers-reduced-motion for Calm Mode default
    if (typeof window !== "undefined") {
      try {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mediaQuery.matches) {
          setCalmModeState(true);
        }
      } catch {
        // ignore
      }

      // 2. Read saved mode from localStorage
      try {
        const savedMode = localStorage.getItem("last-words-mode") as AppMode | null;
        const savedChoice = localStorage.getItem("last-words-mode-chosen");
        const savedCalm = localStorage.getItem("last-words-calm-mode");
        const savedTextSize = localStorage.getItem("last-words-text-size") as TextSize | null;

        if (savedChoice === "true" && (savedMode === "kids" || savedMode === "control")) {
          setModeState(savedMode);
          setHasChosenMode(true);
        } else {
          // First visit: default mode is 'kids', but show welcome gate
          setModeState("kids");
          setHasChosenMode(false);
        }

        if (savedCalm !== null) {
          setCalmModeState(savedCalm === "true");
        }
        if (savedTextSize) {
          setTextSizeState(savedTextSize);
        }
      } catch {
        // fallback
        setModeState("kids");
        setHasChosenMode(true);
      }
    }
  }, []);

  // Update DOM attributes on state change
  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.setAttribute("data-mode", mode);
      root.setAttribute("data-calm", calmMode ? "true" : "false");
      root.setAttribute("data-text-size", textSize);
    }
  }, [mode, calmMode, textSize]);

  const setMode = (newMode: AppMode) => {
    setModeState(newMode);
    setHasChosenMode(true);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("last-words-mode", newMode);
        localStorage.setItem("last-words-mode-chosen", "true");
      } catch {
        // storage disabled
      }
    }
  };

  const toggleMode = () => {
    setMode(mode === "kids" ? "control" : "kids");
  };

  const setCalmMode = (calm: boolean) => {
    setCalmModeState(calm);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("last-words-calm-mode", calm ? "true" : "false");
      } catch {
        // storage disabled
      }
    }
  };

  const toggleCalmMode = () => {
    setCalmMode(!calmMode);
  };

  const setTextSize = (size: TextSize) => {
    setTextSizeState(size);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("last-words-text-size", size);
      } catch {
        // storage disabled
      }
    }
  };

  const cycleTextSize = () => {
    if (textSize === "normal") setTextSize("large");
    else if (textSize === "large") setTextSize("xlarge");
    else setTextSize("normal");
  };

  const handleQueryMode = React.useCallback((qMode: AppMode) => {
    startTransition(() => {
      setModeState(qMode);
      setHasChosenMode(true);
    });
  }, []);

  return (
    <ModeContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        calmMode,
        setCalmMode,
        toggleCalmMode,
        textSize,
        setTextSize,
        cycleTextSize,
        hasChosenMode,
        setHasChosenMode,
      }}
    >
      <React.Suspense fallback={null}>
        <QueryParamSync onSync={handleQueryMode} />
      </React.Suspense>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
}
