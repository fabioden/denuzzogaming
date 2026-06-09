// i18n leggero, senza librerie esterne (sicuro col nostro stack).
// La lingua è derivata dall'URL: prefisso "/en" = inglese, altrimenti italiano.
// SOLO il mondo gaming è bilingue (hub/diabete/business restano com'erano).
import { useLocation, Link, type LinkProps } from "react-router-dom";
import { forwardRef } from "react";

export type Lang = "it" | "en";

/** Lingua corrente, derivata dall'URL. */
export function useLang(): Lang {
  const { pathname } = useLocation();
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "it";
}

/** Path canonico italiano (senza prefisso /en). */
export function canonicalPath(path: string): string {
  const p = path.replace(/^\/en(?=\/|$)/, "");
  return p === "" ? "/" : p;
}

// Solo questi path del mondo gaming sono bilingui (hub "/", /diabete, /business no).
const GAMING_PREFIXES = ["/gaming", "/coaching", "/newsletter", "/privacy"];

/** True se il path appartiene al mondo gaming (quindi localizzabile). */
export function isGamingPath(path: string): boolean {
  const c = canonicalPath(path);
  return GAMING_PREFIXES.some((p) => c === p || c.startsWith(p + "/"));
}

/** Aggiunge/toglie il prefisso /en. Bilingue: l'hub "/" e i path gaming; business/diabete restano IT. */
export function localizePath(path: string, lang: Lang): string {
  const clean = canonicalPath(path);
  if (lang !== "en") return clean;
  if (clean === "/") return "/en"; // hub
  if (!isGamingPath(clean)) return clean; // business/diabete = solo IT
  return `/en${clean}`;
}

// ---- Dizionario UI (cresce man mano che traduciamo le pagine) ----
const DICT: Record<string, { it: string; en: string }> = {
  "nav.book": { it: "Prenota", en: "Book a session" },
  "nav.community": { it: "Community", en: "Community" },
  "nav.business": { it: "Denuzzo Business", en: "Denuzzo Business" },
  "nav.coaching": { it: "Coaching", en: "Coaching" },
  "nav.newsletter": { it: "Newsletter", en: "Newsletter" },
  "nav.home": { it: "Home", en: "Home" },
  "menu.open": { it: "Menu", en: "Menu" },
  "menu.close": { it: "Chiudi", en: "Close" },
  "footer.rights": { it: "Tutti i diritti riservati", en: "All rights reserved" },
  "footer.privacy": { it: "Privacy Policy", en: "Privacy Policy" },
  "article.readAlso": { it: "Leggi anche", en: "Read also" },
  "lang.switch": { it: "English", en: "Italiano" }, // etichetta del bottone (mostra l'ALTRA lingua)
};

/** Hook traduzione: t("chiave") → stringa nella lingua corrente. */
export function useT() {
  const lang = useLang();
  return (key: string): string => DICT[key]?.[lang] ?? key;
}

/**
 * Link che rispetta la lingua corrente: passi il path canonico (IT) e
 * aggiunge /en automaticamente quando sei in inglese. Per i link gaming.
 */
export const L = forwardRef<HTMLAnchorElement, LinkProps>(function L({ to, ...rest }, ref) {
  const lang = useLang();
  const target = typeof to === "string" ? localizePath(to, lang) : to;
  return <Link ref={ref} to={target} {...rest} />;
});
