import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Dati della dashboard personale. Salvati su Supabase (colonna profiles.dashboard jsonb);
// finché la colonna non esiste, ripiego su localStorage così funziona già ora.
export type WLEntry = { id: string; date: string; wins: number; gf?: number; ga?: number; rank?: string };
export type RivalsEntry = { id: string; date: string; wins: number; losses: number; gf?: number; ga?: number };
export type Goal = { id: string; text: string; done: boolean };

export type DashboardData = {
  profile: { gamertag?: string; platform?: string; age?: string; region?: string; club?: string; division?: number; bestWL?: number; photo?: string };
  wl: WLEntry[];
  rivals: RivalsEntry[];
  divisions: { date: string; division: number }[];
  goals: Goal[];
  weakSpot: { area: string; source: string; date: string } | null;
  credits: { coins?: number; squadValue?: number };
  streak: { count: number; lastDay: string } | null;
};

const KEY = "academy_dashboard_v1";
const DEFAULT: DashboardData = { profile: {}, wl: [], rivals: [], divisions: [], goals: [], weakSpot: null, credits: {}, streak: null };

function readLocal(): DashboardData {
  try {
    return { ...DEFAULT, ...(JSON.parse(localStorage.getItem(KEY) || "{}") as Partial<DashboardData>) };
  } catch {
    return DEFAULT;
  }
}
function writeLocal(d: DashboardData) {
  try {
    localStorage.setItem(KEY, JSON.stringify(d));
  } catch {
    /* ignore */
  }
}

// Fa salire la striscia di costanza: +1 se ieri eri attivo, riparte da 1 se hai saltato un giorno.
export function bumpStreak(s: DashboardData["streak"]): DashboardData["streak"] {
  const t = new Date().toISOString().slice(0, 10);
  if (s?.lastDay === t) return s;
  const yest = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  return { count: s && s.lastDay === yest ? s.count + 1 : 1, lastDay: t };
}

// --- Sistema XP: premia l'ATTIVITA' (verificabile, non falsificabile). E' la base di livelli e classifica. ---
export const XP_PER_LEVEL = 500;
const XP_W = { lesson: 50, wl: 30, rivals: 15, goal: 40, streakDay: 15 };

// XP totale (all-time) -> livello. lessonsDone arriva da useProgress (gli esercizi completati).
export function computeXP(d: DashboardData, lessonsDone: number) {
  const goalsDone = d.goals.filter((g) => g.done).length;
  const streakDays = d.streak?.count || 0;
  const xp = lessonsDone * XP_W.lesson + d.wl.length * XP_W.wl + d.rivals.length * XP_W.rivals + goalsDone * XP_W.goal + streakDays * XP_W.streakDay;
  return { xp, level: Math.floor(xp / XP_PER_LEVEL) + 1, intoLevel: xp % XP_PER_LEVEL, perLevel: XP_PER_LEVEL };
}

// Punti della STAGIONE (mese corrente): contano per la classifica. Solo attività datata + striscia recente.
export function computeSeasonXP(d: DashboardData) {
  const m = new Date().toISOString().slice(0, 7);
  const wlM = d.wl.filter((e) => (e.date || "").slice(0, 7) === m).length;
  const rivM = d.rivals.filter((e) => (e.date || "").slice(0, 7) === m).length;
  const streakDays = d.streak?.count || 0;
  return wlM * XP_W.wl + rivM * XP_W.rivals + streakDays * XP_W.streakDay;
}

// Fine stagione = ultimo giorno del mese corrente, coi giorni che mancano.
export function seasonEnd() {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const days = Math.max(0, Math.ceil((end.getTime() - now.getTime()) / 86400000));
  const monthName = now.toLocaleDateString("it-IT", { month: "long" });
  return { days, monthName };
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData>(readLocal);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user || !alive) return;
      setUserId(u.user.id);
      const { data: row, error } = await supabase.from("profiles").select("dashboard").eq("id", u.user.id).single();
      const remote = (row as { dashboard?: Partial<DashboardData> } | null)?.dashboard;
      if (!error && remote && alive) setData({ ...DEFAULT, ...remote });
    })();
    return () => {
      alive = false;
    };
  }, []);

  const update = useCallback(
    (patch: Partial<DashboardData>) => {
      setData((prev) => {
        const next = { ...prev, ...patch };
        writeLocal(next);
        if (userId) {
          // Fire-and-forget: salva i dati + i campi della classifica (punteggio del mese, mese, nome).
          // Se le colonne non esistono ancora, l'errore viene ignorato (resta il locale).
          const month = new Date().toISOString().slice(0, 7);
          const inMonth = (d?: string) => (d || "").slice(0, 7) === month;
          const results = next.wl.filter((e) => inMonth(e.date)).length + next.rivals.filter((e) => inMonth(e.date)).length;
          supabase
            .from("profiles")
            .update({
              dashboard: next,
              season_xp: computeSeasonXP(next),
              season_month: month,
              season_name: next.profile.gamertag || null,
              season_days: next.streak?.count || 0,
              season_results: results,
            })
            .eq("id", userId)
            .then(undefined, () => {});
        }
        return next;
      });
    },
    [userId]
  );

  return { data, update };
}
