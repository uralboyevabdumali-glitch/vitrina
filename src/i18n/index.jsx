import { createContext, useContext, useState, useCallback } from "react";
import uz from "./locales/uz";
import en from "./locales/en";
import ru from "./locales/ru";

const locales = { uz, en, ru };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("vitrina-lang") || "uz";
  });

  const changeLanguage = useCallback((code) => {
    setLang(code);
    localStorage.setItem("vitrina-lang", code);
  }, []);

  const t = locales[lang] || locales.uz;

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export const LANGUAGES = [
  { code: "uz", label: "O'zbekcha" },
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
];
