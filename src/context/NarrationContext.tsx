"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";

interface NarrationContextType {
  isSupported: boolean;
  isSpeaking: boolean;
  currentWordIndex: number;
  currentWordCharIndex: number;
  speak: (text: string, onEnd?: () => void) => void;
  stop: () => void;
}

const NarrationContext = createContext<NarrationContextType | undefined>(undefined);

export function NarrationProvider({ children }: { children: React.ReactNode }) {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [currentWordCharIndex, setCurrentWordCharIndex] = useState<number>(-1);
  const currentWordIndex = useRef<number>(-1);

  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);

      const updateVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        // Look for warm, natural English voices (e.g. Google US English, Samantha, Daniel, Natural, etc.)
        const preferred =
          voices.find((v) => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha"))) ||
          voices.find((v) => v.lang.startsWith("en-US")) ||
          voices.find((v) => v.lang.startsWith("en")) ||
          voices[0];
        if (preferred) {
          voiceRef.current = preferred;
        }
      };

      updateVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    }

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setCurrentWordCharIndex(-1);
    currentWordIndex.current = -1;
  }, []);

  const speak = useCallback(
    (text: string, onEnd?: () => void) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        return;
      }

      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentWordCharIndex(-1);

      if (!text || text.trim().length === 0) return;

      const utterance = new SpeechSynthesisUtterance(text);
      if (voiceRef.current) {
        utterance.voice = voiceRef.current;
      }
      utterance.rate = 0.92; // Slightly slower for children
      utterance.pitch = 1.05; // Slightly warmer/friendly pitch
      utterance.lang = "en-US";

      utterance.onboundary = (event) => {
        if (event.name === "word") {
          setCurrentWordCharIndex(event.charIndex);
        }
      };

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentWordCharIndex(-1);
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setCurrentWordCharIndex(-1);
      };

      window.speechSynthesis.speak(utterance);
    },
    []
  );

  return (
    <NarrationContext.Provider
      value={{
        isSupported,
        isSpeaking,
        currentWordIndex: currentWordIndex.current,
        currentWordCharIndex,
        speak,
        stop,
      }}
    >
      {children}
    </NarrationContext.Provider>
  );
}

export function useNarration() {
  const context = useContext(NarrationContext);
  if (!context) {
    throw new Error("useNarration must be used within a NarrationProvider");
  }
  return context;
}
