// Avanzamento del percorso, lato client (localStorage). Quando arriva la cassa/DB si sincronizza.
// Tiene gli id degli esercizi (lesson.id) completati.
const KEY = "academy_progress_v1";
const EVENT = "academy-progress";

export function getCompleted(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(KEY) || "[]") as string[]);
  } catch {
    return new Set();
  }
}

function save(s: Set<string>) {
  try {
    localStorage.setItem(KEY, JSON.stringify([...s]));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* localStorage non disponibile */
  }
}

export function toggleLesson(id: string, done: boolean) {
  const s = getCompleted();
  if (done) s.add(id);
  else s.delete(id);
  save(s);
}

export const PROGRESS_EVENT = EVENT;
