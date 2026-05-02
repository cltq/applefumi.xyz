"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
    // Load saved preferences
    const savedLang = localStorage.getItem("fumi-language") as Language | null;
    const savedAuto = localStorage.getItem("fumi-auto-detect");

    if (savedAuto !== null) {
      setAutoDetectState(savedAuto === "true");
    }

    if (savedLang && !savedAuto) {
      setLanguageState(savedLang);
    } else if (savedAuto === null || savedAuto === "true") {
      // Auto detect from browser
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("th")) {
        setLanguageState("th");
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("fumi-language", lang);
    localStorage.setItem("fumi-auto-detect", "false");
  };

  const setAutoDetect = (auto: boolean) => {
    setAutoDetectState(auto);
    localStorage.setItem("fumi-auto-detect", String(auto));
    if (auto) {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("th")) {
        setLanguageState("th");
      } else {
        setLanguageState("en");
      }
    }
  };

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
