import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useDashboardData, computeSeasonXP, seasonEnd } from "@/hooks/useDashboardData";
import { DashSection } from "@/components/DashboardSections";
import { SECTIONS, GROUPS, DashIcon } from "@/components/dashboardNav";
import { useLeaderboard, LeaderboardTable, Podium, type LeaderRow } from "@/components/Leaderboard";
import { DEMO_ROWS } from "@/components/leaderboardDemo";
import type { MemberContext } from "@/components/MemberLayout";

const box = "relative max-w-[860px] mx-auto px-[clamp(16px,4vw,40px)]";

// Dashboard = UNA tabella, stile classifica Serie A. Tutto il resto è secondario (premi, gestione dati).
export default function Dashboard() {
  const { isActive } = useOutletContext<MemberContext>();
  const { data, update } = useDashboardData();
  const rows = useLeaderboard();
  const [active, setActive] = useState<string | null>(null);
  const [showData, setShowData] = useState(false);
  const [demo, setDemo] = useState(false);
  const current = SECTIONS.find((s) => s.key === active) || null;

  const { days, monthName } = seasonEnd();
  const month = new Date().toISOString().slice(0, 7);
  const inMonth = (d?: string) => (d || "").slice(0, 7) === month;
  const me = {
    name: data.profile.gamertag || "Tu",
    season_xp: computeSeasonXP(data),
    season_days: data.streak?.count || 0,
    season_results: data.wl.filter((e) => inMonth(e.date)).length + data.rivals.filter((e) => inMonth(e.date)).length,
  };
  const hasData = !!(data.profile.gamertag || data.wl.length || data.rivals.length);

  // Righe effettive: demo (50 finti) oppure live (o la sola riga "tu" se vuota).
  const meRow: LeaderRow = { rank: 1, name: me.name, season_xp: me.season_xp, season_days: me.season_days, season_results: me.season_results, is_me: true };
  const live = rows === null ? null : rows.length ? rows : [meRow];
  const effective = demo ? DEMO_ROWS : live;
  const top3 = effective ? effective.slice(0, 3) : [];
  const myIdx = effective ? effective.findIndex((r) => r.is_me) : -1;
  const myRow = myIdx >= 0 && effective ? effective[myIdx] : null;
  let battle = "";
  if (myRow) {
    if (myRow.rank === 1) battle = "Sei in testa! Difendi il primo posto.";
    else {
      const above = effective![myIdx - 1];
      const gap = Math.max(0, (above?.season_xp ?? 0) - myRow.season_xp);
      battle = `Sei ${myRow.rank}°: ti mancano ${gap} punti per il ${myRow.rank - 1}°.`;
    }
  }

  // Vista di una singola sezione (da "Gestisci i tuoi dati").
  if (current) {
    return (
      <section className="pt-[clamp(24px,4vw,44px)] pb-[clamp(60px,10vh,120px)]">
        <div className={box}>
          <button onClick={() => setActive(null)} className="inline-flex items-center gap-1.5 text-ink-2 hover:text-gold text-[.95rem] transition-colors mb-5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
            La mia dashboard
          </button>
          <h1 className="font-display serif text-[clamp(1.5rem,3vw,2.1rem)] text-ink mb-5">{current.label}</h1>
          <DashSection sectionKey={current.key} data={data} update={update} isActive={isActive} onClose={() => setActive(null)} />
        </div>
      </section>
    );
  }

  return (
    <section className="pt-[clamp(24px,4vw,44px)] pb-[clamp(60px,10vh,120px)]">
      <div className={box}>
        <div className="pointer-events-none absolute inset-x-0 -top-12 h-[340px]" aria-hidden="true" style={{ background: "radial-gradient(52% 100% at 50% 0%, rgba(214,162,26,.12), transparent 70%)" }} />
        <div className="flex items-baseline justify-between gap-3">
          <span className="section-label">Classifica del mese</span>
          <span className="text-gold text-[.88rem] font-semibold shrink-0">{days === 0 ? "ultimo giorno" : `chiude tra ${days}g`}</span>
        </div>
        <h1 className="font-display serif text-[clamp(1.7rem,3.4vw,2.6rem)] text-ink mt-1 mb-4">Classifica di {monthName}</h1>

        {/* podio dei primi 3 (sempre visibile: compare dopo il fetch, niente animazione che resta a opacità 0) */}
        {top3.length >= 3 && <div><Podium top={top3} /></div>}

        {/* la tua battaglia */}
        {battle && <div className="mb-3 rounded-[12px] border border-gold/40 bg-gradient-to-r from-gold/[.16] to-gold/[.04] px-4 py-3 text-ink text-[.95rem] font-medium">{battle}</div>}

        {/* la tabella */}
        <div>
          <LeaderboardTable rows={effective} />
        </div>

        {/* anteprima demo: per vedere com'è da piena */}
        <button onClick={() => setDemo((d) => !d)} className="mt-2 text-muted text-[.84rem] hover:text-gold transition-colors">
          {demo ? "Nascondi anteprima" : "Anteprima: com'è con 50 giocatori (demo)"}
        </button>
        {demo && <p className="text-muted text-[.78rem] mt-1">Dati finti, solo per vedere il design da pieno. Gli utenti veri vedono solo persone reali.</p>}

        {/* premi + come partecipare, compatti */}
        <button
          onClick={() => setActive("stagione")}
          className="mt-3 w-full text-left rounded-[12px] border border-gold/40 bg-gradient-to-r from-gold/[.12] to-transparent hover:border-gold/60 hover:from-gold/[.18] transition-colors p-4 flex items-center justify-between gap-3"
        >
          <span className="text-ink text-[.95rem]"><strong className="text-gold">Premi e come partecipare</strong> · i primi 3 di fine mese vincono</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-gold shrink-0" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
        </button>

        {!hasData && !demo && (
          <p className="text-muted text-[.9rem] mt-4">Per salire in classifica, compila il profilo e segna una Weekend League in "Gestisci i tuoi dati".</p>
        )}

        {/* gestisci i tuoi dati: chiuso di default */}
        <div className="mt-8 pt-6 border-t border-line-2">
          <button onClick={() => setShowData((s) => !s)} className="w-full flex items-center justify-between gap-3 text-left">
            <span className="font-display text-ink text-[1.05rem]">Gestisci i tuoi dati</span>
            <span className="inline-flex items-center gap-1.5 text-ink-2 text-[.9rem]">
              {showData ? "nascondi" : "apri"}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`transition-transform ${showData ? "rotate-180" : ""}`} aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
            </span>
          </button>
          <p className="text-muted text-[.86rem] mt-1">Profilo, risultati, obiettivi: tutto quello che alimenta i tuoi punti in classifica.</p>

          {showData && (
            <div className="mt-4 flex flex-col gap-5">
              {GROUPS.filter((g) => g.label !== "La gara").map((g) => (
                <div key={g.label}>
                  <span className="section-label block mb-2.5">{g.label}</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {g.keys.map((k) => SECTIONS.find((s) => s.key === k)).filter(Boolean).map((s) => (
                      <button
                        key={s!.key}
                        onClick={() => setActive(s!.key)}
                        className="group text-left rounded-[12px] border border-line-2 bg-[#181510] hover:border-gold/40 transition-colors p-3.5 flex items-center gap-3"
                      >
                        <span className="w-10 h-10 rounded-[9px] border border-line-2 shrink-0 grid place-items-center text-gold/90"><DashIcon k={s!.key} /></span>
                        <span className="flex-1 min-w-0">
                          <span className="font-display text-ink text-[.98rem] flex items-center gap-2">{s!.label}{s!.plus && <span className="text-[11px] font-bold uppercase tracking-[.1em] text-gold/80">Plus</span>}</span>
                          <span className="block text-muted text-[.86rem] mt-0.5 truncate">{s!.desc}</span>
                        </span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted group-hover:text-gold transition shrink-0" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
