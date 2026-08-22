import { writable, derived } from "svelte/store";
import { fr } from "./fr";
import { en } from "./en";

export type Locale = "fr" | "en";

const translations = { fr, en } as const;

export const STORAGE_KEY = "locale";

function isLocale(value: string | null): value is Locale {
  return value === "fr" || value === "en";
}

function readStoredLocale(): Locale | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isLocale(stored) ? stored : null;
  } catch {
    return null;
  }
}

function persistLocale(value: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    return;
  }
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "fr";
  return (
    readStoredLocale() ??
    (navigator.language.slice(0, 2) === "fr" ? "fr" : "en")
  );
}

export const locale = writable<Locale>(getInitialLocale());

if (typeof window !== "undefined") {
  locale.subscribe((value) => {
    document.documentElement.lang = value;
    persistLocale(value);
  });
}

export const t = derived(locale, ($locale) => {
  return translations[$locale];
});
