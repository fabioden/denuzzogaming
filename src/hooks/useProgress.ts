import { useEffect, useState } from "react";
import { getCompleted, PROGRESS_EVENT } from "@/lib/progress";

// Set reattivo degli esercizi completati: si aggiorna quando cambi pagina o segni un esercizio.
export function useProgress() {
  const [completed, setCompleted] = useState<Set<string>>(() => getCompleted());
  useEffect(() => {
    const sync = () => setCompleted(getCompleted());
    window.addEventListener(PROGRESS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return completed;
}
