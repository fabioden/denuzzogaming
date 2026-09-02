import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import ShinyText from "@/components/reactbits/ShinyText";

export type LeaderRow = { rank: number; name: string; season_xp: number; season_days?: number; season_results?: number; is_me: boolean };
export type Me = { name: string; season_xp: number; season_days: number; season_results: number };

export function useLeaderboard() {
  const [rows, setRows] = useState<LeaderRow[] | null>(null);
  useEffect(() => {
    let alive = true;
    supabase.rpc("leaderboard_season").then(({ data, error }) => {
      if (alive) setRows(!error && Array.isArray(data) ? (data as LeaderRow[]) : []);
    });
    return () => {
      alive = false;
    };
  }, []);
  return rows;
}

// Palette MEDAGLIE tutta calda (niente argento freddo): oro · oro chiaro/champagne · bronzo.
const medalColor = (rank: number) => (rank === 1 ? "#f3c64a" : rank === 2 ? "#e6d09a" : rank === 3 ? "#d68b3c" : "");
const medalSpot = (rank: number) => (rank === 1 ? "rgba(243,198,74,.26)" : rank === 2 ? "rgba(230,208,154,.20)" : "rgba(214,139,60,.20)");
const rowTint = (rank: number) => (rank === 1 ? "rgba(243,198,74,.09)" : rank === 2 ? "rgba(230,208,154,.06)" : rank === 3 ? "rgba(214,139,60,.06)" : "");

function Crown() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#f3c64a] drop-shadow-[0_0_6px_rgba(243,198,74,.6)]" aria-hidden="true">
      <path d="M3 17l1.4-8 4.3 4.2L12 6l3.3 7.2L19.6 9 21 17H3zm0 2h18v2H3v-2z" />
    </svg>
  );
}

function Avatar({ name, rank, big }: { name: string; rank: number; big?: boolean }) {
  const c = medalColor(rank);
  return (
    <span
      style={c ? { borderColor: c, color: c, boxShadow: `0 0 12px -2px ${c}55` } : undefined}
      className={`${big ? "w-16 h-16 text-[1.5rem]" : "w-9 h-9 text-[.95rem]"} rounded-full border-2 ${c ? "" : "border-gold/30 text-ink"} bg-[#241d15] grid place-items-center font-display shrink-0`}
    >
      {(name || "?").trim().charAt(0).toUpperCase()}
    </span>
  );
}

// Podio dei primi 3: palco con luci, SpotlightCard, medaglie calde, 1° con corona + nome luccicante.
export function Podium({ top }: { top: LeaderRow[] }) {
  if (top.length < 3) return null;
  const slots = [
    { r: top[1], h: "h-[70px]", first: false },
    { r: top[0], h: "h-[104px]", first: true },
    { r: top[2], h: "h-[52px]", first: false },
  ];
  return (
    <div className="relative mb-6">
      <div className="pointer-events-none absolute -inset-x-8 -top-10 bottom-4" aria-hidden="true" style={{ background: "radial-gradient(58% 78% at 50% 0%, rgba(214,162,26,.26), transparent 72%)" }} />
      <div className="relative grid grid-cols-3 gap-2.5 sm:gap-4 items-end">
        {slots.map(({ r, h, first }) =>
          r ? (
            <SpotlightCard
              key={r.rank}
              spotlightColor={medalSpot(r.rank)}
              className={`relative rounded-[16px] border bg-[#1a1510] flex flex-col items-center text-center px-2 pt-4 ${first ? "border-[#f3c64a]/55 shadow-[0_0_30px_-6px_rgba(243,198,74,.45)]" : "border-gold/25"}`}
            >
              {first && <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[16px]"><span className="sheen-sweep absolute inset-y-0 -left-1/3 w-1/3 mix-blend-overlay" style={{ background: "linear-gradient(105deg, transparent, rgba(255,247,214,.5), transparent)" }} /></span>}
              <span className="h-6 mb-1 grid place-items-center">{first && <Crown />}</span>
              <Avatar name={r.name} rank={r.rank} big />
              <div className="mt-2.5 max-w-full px-1">
                {first ? (
                  <ShinyText text={r.name} className="font-display text-[1.02rem] block truncate" color="#f3e3a8" shineColor="#fffdf0" speed={4} />
                ) : (
                  <p className="text-ink text-[.95rem] font-medium truncate">{r.name}</p>
                )}
              </div>
              <p className="font-display text-[1.45rem] leading-none mt-1 tabular-nums" style={{ color: medalColor(r.rank) }}>{r.season_xp}</p>
              <p className="text-ink-2 text-[.72rem] uppercase tracking-[.14em] mt-0.5">punti</p>
              <div className={`w-full ${h} mt-3 rounded-t-[12px] grid place-items-center`} style={{ background: `linear-gradient(to bottom, ${medalColor(r.rank)}33, transparent)`, borderTop: `2px solid ${medalColor(r.rank)}`, borderLeft: `1px solid ${medalColor(r.rank)}44`, borderRight: `1px solid ${medalColor(r.rank)}44` }}>
                <span className="font-display text-[2.1rem]" style={{ color: medalColor(r.rank), textShadow: `0 0 14px ${medalColor(r.rank)}66` }}>{r.rank}</span>
              </div>
            </SpotlightCard>
          ) : null
        )}
      </div>
    </div>
  );
}

const cols = "grid grid-cols-[40px_1fr_auto] sm:grid-cols-[52px_1fr_66px_74px_84px] gap-2 sm:gap-3 items-center";

// Tabella stile classifica Serie A: oro ed evidente, ma testi chiari per leggibilità.
export function LeaderboardTable({ rows, me, limit }: { rows: LeaderRow[] | null; me?: Me | null; limit?: number }) {
  if (rows === null) return <p className="text-ink-2 text-[.95rem]">Carico la classifica…</p>;

  const list: LeaderRow[] =
    rows.length > 0
      ? rows
      : me
      ? [{ rank: 1, name: me.name || "Tu", season_xp: me.season_xp, season_days: me.season_days, season_results: me.season_results, is_me: true }]
      : [];
  if (list.length === 0) return <p className="text-ink-2 text-[.95rem]">Classifica in arrivo.</p>;

  const shown = limit ? list.slice(0, limit) : list;
  const firstOutPrize = shown.findIndex((r) => r.rank > 3);

  return (
    <div className="rounded-[var(--radius-card)] border border-gold/20 overflow-hidden shadow-[0_1px_0_rgba(255,255,255,.04)_inset]">
      <div className={`${cols} px-4 py-3 bg-[#1e1811] border-b border-gold/20 text-gold/70 text-[.76rem] uppercase tracking-[.12em] font-bold`}>
        <span className="text-center">Pos</span>
        <span className="pl-[44px] sm:pl-[48px]">Giocatore</span>
        <span className="hidden sm:block text-right">Giorni</span>
        <span className="hidden sm:block text-right">Risult.</span>
        <span className="text-right">Punti</span>
      </div>
      <div className="flex flex-col max-h-[560px] overflow-y-auto">
        {shown.map((r, i) => (
          <div key={`${r.rank}-${i}`}>
            {i === firstOutPrize && firstOutPrize > 0 && (
              <div className="flex items-center gap-2 px-4 py-1.5 bg-[#100d08]">
                <span className="h-px flex-1 bg-gold/40" />
                <span className="text-gold text-[.6rem] uppercase tracking-[.18em] font-semibold">posti premio</span>
                <span className="h-px flex-1 bg-gold/40" />
              </div>
            )}
            <div className={`${cols} px-4 py-3 border-b border-[rgba(214,162,26,.08)]`} style={{ background: r.is_me ? "rgba(214,162,26,.16)" : rowTint(r.rank) || "#191510" }}>
              <span style={{ color: medalColor(r.rank) || undefined, textShadow: r.rank <= 3 ? `0 0 10px ${medalColor(r.rank)}55` : undefined }} className={`text-center font-display ${r.rank <= 3 ? "text-[1.25rem]" : "text-ink-2 text-[1rem]"}`}>{r.rank}</span>
              <span className="flex items-center gap-3 min-w-0">
                <Avatar name={r.name} rank={r.rank} />
                <span className="min-w-0 truncate text-ink text-[.98rem] font-medium">
                  {r.name}
                  {r.is_me && r.name.toLowerCase() !== "tu" && <span className="ml-1.5 text-[11px] font-bold uppercase tracking-wide text-gold-contrast bg-gold px-1.5 py-0.5 rounded">tu</span>}
                </span>
              </span>
              <span className="hidden sm:block text-right text-ink-2 text-[.97rem] tabular-nums">{r.season_days ?? 0}</span>
              <span className="hidden sm:block text-right text-ink-2 text-[.97rem] tabular-nums">{r.season_results ?? 0}</span>
              <span className="text-right font-display text-gold text-[1.12rem] tabular-nums">{r.season_xp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Leaderboard({ me, limit }: { me?: Me | null; limit?: number }) {
  const rows = useLeaderboard();
  return <LeaderboardTable rows={rows} me={me} limit={limit} />;
}
