// Restituisce i contenuti delle pagine gaming nella lingua corrente (derivata dall'URL).
// EN = override dei testi tradotti su IT; IT = contenuti originali.
import * as it from "./index";
import * as en from "./en";
import { useLang } from "@/i18n";

export function useContent(): typeof it {
  return useLang() === "en" ? ({ ...it, ...en } as unknown as typeof it) : it;
}
