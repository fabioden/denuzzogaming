// Sezioni della dashboard + raggruppamento + icone. Condivise dalla tendina (vista veloce) e dalla pagina intera.
export const SECTIONS = [
  { key: "profilo", n: 1, label: "Profilo e livello", plus: false, desc: "Livello, divisione e record." },
  { key: "wl", n: 2, label: "Weekend League", plus: false, desc: "Logga i W di ogni weekend." },
  { key: "divisione", n: 3, label: "Andamento divisione", plus: false, desc: "La curva del tuo rating." },
  { key: "diario", n: 4, label: "Diario sessioni", plus: false, desc: "Win rate, gol fatti e subiti." },
  { key: "puntodebole", n: 5, label: "Punto debole", plus: false, desc: "Trova dove migliorare." },
  { key: "obiettivi", n: 6, label: "Obiettivi", plus: false, desc: "Imposta e segui un traguardo." },
  { key: "streak", n: 7, label: "Costanza", plus: false, desc: "I giorni di fila che ti alleni." },
  { key: "benchmark", n: 8, label: "Benchmark Elite", plus: true, desc: "Quanto sei lontano dall'Elite." },
  { key: "crediti", n: 9, label: "Crediti e rosa", plus: true, desc: "Crediti, valore rosa e ROI." },
  { key: "report", n: 10, label: "Report settimanale", plus: true, desc: "Il riepilogo coi tuoi numeri." },
  { key: "stagione", n: 11, label: "Classifica e premi", plus: false, desc: "La gara del mese: scala e vinci." },
] as const;

// Le voci raggruppate in blocchi: una fila lunga intimidisce, i gruppi si leggono.
export const GROUPS: { label: string; keys: string[] }[] = [
  { label: "La gara", keys: ["stagione"] },
  { label: "I tuoi numeri", keys: ["profilo", "wl", "divisione", "diario"] },
  { label: "Migliora", keys: ["puntodebole", "obiettivi", "streak"] },
  { label: "I Plus", keys: ["benchmark", "crediti", "report"] },
];

// Icone disegnate per ogni sezione (segnaposto pulito finché Fabio non dà le immagini nuove).
export function DashIcon({ k }: { k: string }) {
  const p = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (k) {
    case "profilo": return <svg {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M5.5 16.5a3.5 3.5 0 0 1 7 0M15 9h4M15 13h4" /></svg>;
    case "wl": return <svg {...p}><path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4zM7 5H4v1a3 3 0 0 0 3 3M17 5h3v1a3 3 0 0 1-3 3" /></svg>;
    case "divisione": return <svg {...p}><path d="M3 17l6-6 4 4 7-7M17 8h4v4" /></svg>;
    case "diario": return <svg {...p}><path d="M5 4a1 1 0 0 1 1-1h13v15H6a2 2 0 0 0-2 2V4zM19 18H6M8 7h8M8 11h6" /></svg>;
    case "puntodebole": return <svg {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.2" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" /></svg>;
    case "obiettivi": return <svg {...p}><path d="M5 21V4M5 4h11l-2 4 2 4H5" /></svg>;
    case "streak": return <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 3-1 4-1 6a3 3 0 0 0 6 0c0-1 0-2-.5-3 2 2 3.5 4.5 3.5 7a8 8 0 1 1-16 0c0-3 2-6 5-8-.5 2 0 3 1 3 .8 0 1-.7 1-1.5C11.5 5 11 3.5 12 2z" /></svg>;
    case "benchmark": return <svg {...p}><path d="M5 20V11M12 20V5M19 20v-6M3 20h18" /></svg>;
    case "crediti": return <svg {...p}><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></svg>;
    case "report": return <svg {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5zM14 3v5h5M9 13h6M9 17h5" /></svg>;
    case "stagione": return <svg {...p}><circle cx="12" cy="9" r="6" /><path d="M9 14l-2 7 5-3 5 3-2-7" /></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="8" /></svg>;
  }
}
