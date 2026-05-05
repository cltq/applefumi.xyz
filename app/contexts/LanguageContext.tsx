"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

type Language = "en" | "th";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  autoDetect: boolean;
  setAutoDetect: (auto: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [autoDetect, setAutoDetectState] = useState(true);

  useEffect(() => {
    // Defer localStorage access to not block rendering
    const init = () => {
      try {
        const savedLang = localStorage.getItem("fumi-language") as Language | null;
        const savedAuto = localStorage.getItem("fumi-auto-detect");

        if (savedAuto !== null) {
          setAutoDetectState(savedAuto === "true");
        }

        if (savedLang && savedAuto === "false") {
          setLanguageState(savedLang);
        } else if (savedAuto === null || savedAuto === "true") {
          const browserLang = navigator.language.toLowerCase();
          if (browserLang.startsWith("th")) {
            setLanguageState("th");
          }
        }
      } catch {
        // localStorage unavailable
      }
    };

    // Use requestIdleCallback for non-critical initialization
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(init, { timeout: 100 });
    } else {
      // Fallback for Safari
      setTimeout(init, 0);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("fumi-language", lang);
      localStorage.setItem("fumi-auto-detect", "false");
    } catch {
      // localStorage unavailable
    }
  }, []);

  const setAutoDetect = useCallback((auto: boolean) => {
    setAutoDetectState(auto);
    try {
      localStorage.setItem("fumi-auto-detect", String(auto));
    } catch {
      // localStorage unavailable
    }
    if (auto) {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("th")) {
        setLanguageState("th");
      } else {
        setLanguageState("en");
      }
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, autoDetect, setAutoDetect }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
