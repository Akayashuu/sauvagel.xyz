import { writable, derived } from "svelte/store";
import { fr } from "./fr";
import { en } from "./en";

export type Locale = "fr" | "en";

const translations = { fr, en } as const;

function getBrowserLocale(): Locale {
  // Le site est écrit en français d'abord, et le document sort du serveur en
  // lang="fr" : le rendu serveur doit dire la même chose que la balise.
  if (typeof window === "undefined") return "fr";
  const lang = navigator.language.slice(0, 2);
  return lang === "fr" ? "fr" : "en";
}

export const locale = writable<Locale>(getBrowserLocale());

export const t = derived(locale, ($locale) => {
  return translations[$locale];
});
