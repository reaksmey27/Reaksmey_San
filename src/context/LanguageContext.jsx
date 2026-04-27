import { createContext, useContext } from "react";
import { DEFAULT_LANGUAGE, STORAGE_KEYS } from "../config/site";
import { translations } from "../content/translations";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useLocalStorageState(
    STORAGE_KEYS.language,
    DEFAULT_LANGUAGE,
  );
  const resolvedLanguage = translations[language] ? language : DEFAULT_LANGUAGE;

  const value = {
    language: resolvedLanguage,
    setLanguage,
    t: translations[resolvedLanguage],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
