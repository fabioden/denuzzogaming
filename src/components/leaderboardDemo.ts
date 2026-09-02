import type { LeaderRow } from "@/components/Leaderboard";

// DATI FINTI, SOLO ANTEPRIMA: servono a Fabio per vedere com'è la classifica da piena (50 giocatori).
// NON vanno mai mostrati agli utenti veri come avversari reali. È solo un mockup di design.
const PRE = ["Dark", "Pro", "Elite", "Toxic", "Silent", "Rapid", "King", "Ghost", "Neo", "Cyber", "Ace", "Mad", "Iron", "Storm", "Venom", "Frost", "Blaze", "Shadow", "Turbo", "Lethal", "Royal", "Wild", "Epic", "Sniper", "Falcon"];
const SUF = ["Striker", "FC", "10", "Killer", "Master", "Legend", "X", "Pirlo", "Totti", "God", "Boss", "007", "Beast", "Zlatan", "CR7", "Kun", "Wizard", "Hero", "Phenom", "Italia", "99", "Pro", "TV", "Goal", "Top"];

export const DEMO_ROWS: LeaderRow[] = Array.from({ length: 50 }, (_, i) => {
  const isMe = i === 13; // ti mostro a metà classifica, in 14ª posizione
  const name = isMe ? "Tu" : PRE[i % PRE.length] + SUF[(i * 3 + 7) % SUF.length];
  const xp = 2480 - i * 44 - (i % 5) * 7;
  const days = Math.max(1, 28 - Math.floor(i / 2) - (i % 3));
  const results = Math.max(0, 22 - Math.floor(i / 2));
  return { rank: i + 1, name, season_xp: xp, season_days: days, season_results: results, is_me: isMe };
});
