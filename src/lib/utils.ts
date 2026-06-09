// Helper per comporre classi CSS (versione senza dipendenze esterne).
export function cn(...inputs: (string | false | null | undefined)[]): string {
  return inputs.filter(Boolean).join(" ");
}
