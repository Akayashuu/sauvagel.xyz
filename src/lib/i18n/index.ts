import { writable, derived } from "svelte/store";
import { fr } from "./fr";
import { en } from "./en";

export type Locale = "fr" | "en";

const translations = { fr, en } as const;

function getBrowserLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const lang = navigator.language.slice(0, 2);
  return lang === "fr" ? "fr" : "en";
}

export const locale = writable<Locale>(getBrowserLocale());

export const t = derived(locale, ($locale) => {
  return translations[$locale];
});
