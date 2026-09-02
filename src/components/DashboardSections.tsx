import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import WeakSpotQuiz from "@/components/WeakSpotQuiz";
import PlayerCard from "@/components/PlayerCard";
import { bumpStreak, computeXP, computeSeasonXP, seasonEnd } from "@/hooks/useDashboardData";
import { useProgress } from "@/hooks/useProgress";
import { useLeaderboard, LeaderboardTable } from "@/components/Leaderboard";
import type { DashboardData, RivalsEntry } from "@/hooks/useDashboardData";

type Update = (p: Partial<DashboardData>) => void;

const inputCls = "w-full bg-[#120f0a] border border-line-2 rounded-[8px] px-3 py-2 text-ink text-[.97rem] outline-none focus:border-gold transition-colors";
const card = "rounded-[var(--radius-card)] border border-line-2 bg-[#181510] p-5";
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const today = () => new Date().toISOString().slice(0, 10);
const RANKS = ["Rank I", "Rank II", "Rank III", "Rank IV", "Rank V", "Rank VI", "Rank VII", "Rank VIII", "Rank IX", "Rank X"];
// Numeri reali di un Elite (da Fabio): 15/15 in WL, ~4 gol fatti, ~1,7 subiti a partita. Win rate stimato.
const ELITE = { winRate: 80, gfg: 4, gag: 1.67, wl: 15 };
const ELITE_QUALIFY = 13; // sei "in Elite Division" da 13 vittorie in su
const AREA_LABELS: Record<string, { label: string; id: string }> = {
  difesa: { label: "Difesa", id: "difesa" },
  attacco: { label: "Attacco", id: "attacco" },
  squadra: { label: "Costruzione squadra", id: "squadra-meta" },
  mentalita: { label: "Testa da campione", id: "pressione" },
};
const GOAL_PRESETS = ["Arriva in Div 3", "Arriva in Elite", "8 vittorie in WL", "11 vittorie in WL", "Allenati 7 giorni di fila"];

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-muted text-[.78rem] uppercase tracking-[.1em] mb-1">{label}</span>
      {children}
    </label>
  );
}

function Spark({ values, invert }: { values: number[]; invert?: boolean }) {
  if (values.length < 2) return null;
  const w = 240, h = 48;
  const max = Math.max(...values), min = Math.min(...values), range = max - min || 1;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const norm = (v - min) / range;
      const y = invert ? 4 + norm * (h - 8) : h - 4 - norm * (h - 8);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12 mt-2" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={pts} fill="none" style={{ stroke: "var(--color-gold)" }} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function aggRivals(rivals: RivalsEntry[]) {
  const played = rivals.reduce((a, r) => a + r.wins + r.losses, 0);
  const wins = rivals.reduce((a, r) => a + r.wins, 0);
  const gf = rivals.reduce((a, r) => a + (r.gf || 0), 0);
  const ga = rivals.reduce((a, r) => a + (r.ga || 0), 0);
  return {
    played,
    wins,
    winRate: played ? Math.round((wins / played) * 100) : 0,
    gfg: played ? +(gf / played).toFixed(1) : 0,
    gag: played ? +(ga / played).toFixed(1) : 0,
    diff: gf - ga,
  };
}

// Statistiche dei soli ultimi 7 giorni (forma recente, su base settimanale).
function recentRivals(rivals: RivalsEntry[]) {
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
  return rivals.filter((r) => r.date >= weekAgo);
}

// Skill rating: peso soprattutto alla forma recente (ultime 3-4 WL), con un bonus per il picco di sempre.
// La WL e' la fonte principale; la divisione e' un bonus secondario.
function skillRating(recentAvg: number, peak: number, division?: number) {
  if (!recentAvg && !peak && !division) return 0;
  const base = (Math.min(recentAvg, 15) / 15) * 90;
  const peakBonus = (Math.min(peak, 15) / 15) * 10;
  const divBonus = division ? (11 - division) * 1.5 : 0;
  return Math.min(100, Math.round(base + peakBonus + divBonus));
}

// Insight da coach: micro-frasi dai dati. Soglia minima di partite per non dare numeri su campioni piccoli.
function coachInsights(data: DashboardData) {
  const out: { s: string; tone: "good" | "bad" | "info"; text: string }[] = [];
  const st = aggRivals(data.rivals);
  const peak = Math.max(data.profile.bestWL || 0, ...data.wl.map((e) => e.wins), 0);
  if (data.wl.length || data.profile.bestWL) {
    if (peak >= ELITE_QUALIFY) out.push({ s: "wl", tone: "good", text: `Sei a livello Elite: ${peak}/15 in Weekend League.` });
    else if (peak > 0) out.push({ s: "wl", tone: "info", text: `Ti mancano ${ELITE_QUALIFY - peak} vittorie per l'Elite Division.` });
    if (data.wl.length >= 2) {
      const d = data.wl[0].wins - data.wl[1].wins;
      if (d > 0) out.push({ s: "wl", tone: "good", text: `Weekend in crescita: +${d} vittorie sulla scorsa.` });
      else if (d < 0) out.push({ s: "wl", tone: "bad", text: `Weekend in calo (${d} sulla scorsa): testa alta.` });
    }
  }
  if (st.played >= 5) {
    if (st.winRate >= 60) out.push({ s: "diario", tone: "good", text: `Win rate solido: ${st.winRate}%.` });
    else if (st.winRate < 45) out.push({ s: "diario", tone: "bad", text: `Win rate basso (${st.winRate}%): torniamo alle basi.` });
    if (st.gag >= 2) out.push({ s: "diario", tone: "bad", text: `Subisci troppo: ${st.gag} gol a partita, difesa da sistemare.` });
    else if (st.gag > 0 && st.gag <= 1.5) out.push({ s: "diario", tone: "good", text: `Difesa solida: ${st.gag} gol subiti a partita.` });
    if (st.gfg > 0 && st.gfg < 2) out.push({ s: "diario", tone: "bad", text: `Pochi gol (${st.gfg} a partita): finalizzazione da migliorare.` });
    else if (st.gfg >= 3) out.push({ s: "diario", tone: "good", text: `Attacco da paura: ${st.gfg} gol a partita.` });
  }
  if ((data.streak?.count || 0) >= 5) out.push({ s: "streak", tone: "good", text: `${data.streak?.count} giorni di costanza: così si cresce.` });
  return out;
}

function InsightBar({ tone, text }: { tone: "good" | "bad" | "info"; text: string }) {
  const cls = tone === "good" ? "border-gold/30 bg-gold/[.06] text-gold" : tone === "bad" ? "border-red/30 bg-red/[.05] text-red" : "border-line-2 bg-[#120f0a] text-ink-2";
  return (
    <div className={`flex items-start gap-2.5 rounded-[10px] border px-4 py-2.5 ${cls}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4 mt-px shrink-0" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
      <span className="text-[.92rem] leading-snug">{text}</span>
    </div>
  );
}

// Achievement / badge sbloccabili dai dati.
const BADGES = [
  { id: "first15", label: "Perfect Run", desc: "15-0 in WL", check: (d: DashboardData) => Math.max(d.profile.bestWL || 0, ...d.wl.map((e) => e.wins), 0) >= 15 },
  { id: "elite", label: "Elite", desc: "Divisione Elite", check: (d: DashboardData) => d.profile.division === 1 || d.divisions[d.divisions.length - 1]?.division === 1 },
  { id: "streak7", label: "Costante", desc: "7 giorni di fila", check: (d: DashboardData) => (d.streak?.count || 0) >= 7 },
  { id: "streak30", label: "Inarrestabile", desc: "30 giorni di fila", check: (d: DashboardData) => (d.streak?.count || 0) >= 30 },
  { id: "winrate", label: "Macchina", desc: "60% di vittorie", check: (d: DashboardData) => { const s = aggRivals(d.rivals); return s.played >= 10 && s.winRate >= 60; } },
  { id: "bomber", label: "Bomber", desc: "3+ gol a partita", check: (d: DashboardData) => { const s = aggRivals(d.rivals); return s.played >= 5 && s.gfg >= 3; } },
];

function BadgeIcon({ id }: { id: string }) {
  const c = { viewBox: "0 0 24 24", className: "w-4 h-4", "aria-hidden": true } as const;
  switch (id) {
    case "first15": // trofeo
      return <svg {...c} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8M12 17v4M6 4h12v3a6 6 0 0 1-12 0zM6 5H3v1.5A3.5 3.5 0 0 0 6.5 10M18 5h3v1.5A3.5 3.5 0 0 1 17.5 10" /></svg>;
    case "elite": // corona
      return <svg {...c} fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round"><path d="M3 8l3.5 9h11L21 8l-5 4-4-7-4 7z" /></svg>;
    case "streak7": // fiamma
      return <svg {...c} fill="currentColor"><path d="M12 2c1 3-1 4-2 6-1 2 0 4 2 4 1.5 0 2.5-1 2.5-2.5 1.5 1.2 2.5 3 2.5 5a7 7 0 1 1-12.4-4.4C7 12 9 10 9 7c2 1 3 3 3 5 1-2 1-6 0-10z" /></svg>;
    case "streak30": // fulmine
      return <svg {...c} fill="currentColor"><path d="M13 2L4 13h6l-1 9 10-12h-7l1-8z" /></svg>;
    case "winrate": // bersaglio
      return <svg {...c} fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.6" fill="currentColor" /></svg>;
    case "bomber": // pallone
      return <svg {...c} fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7.5l3.2 2.3-1.2 3.8h-4l-1.2-3.8z" /></svg>;
    default:
      return <svg {...c} fill="currentColor"><path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.4 6.2 17l.9-5.4L3.2 7.7l5.4-.8z" /></svg>;
  }
}

function Badges({ data }: { data: DashboardData }) {
  const got = BADGES.filter((b) => b.check(data)).length;
  return (
    <div className="rounded-[var(--radius-card)] border border-line-2 bg-[#181510] p-3">
      <div className="flex items-baseline justify-between mb-1"><span className="section-label">Traguardi</span><span className="text-muted text-[.84rem]">{got}/{BADGES.length} sbloccati</span></div>
      <p className="text-muted text-[.75rem] mb-3">Si sbloccano coi tuoi risultati.</p>
      <div className="grid grid-cols-2 gap-2">
        {BADGES.map((b) => {
          const on = b.check(data);
          return (
            <div key={b.id} className={`rounded-[10px] border p-2.5 flex items-center gap-2.5 ${on ? "border-gold/40 bg-gold/[.07] badge-earned" : "border-line-2 bg-[#120f0a] opacity-70"}`}>
              <div className={`w-7 h-7 shrink-0 rounded-full grid place-items-center ${on ? "bg-gold text-gold-contrast" : "bg-[#1e1813] text-muted"}`}>
                <BadgeIcon id={b.id} />
              </div>
              <div className="min-w-0">
                <p className={`text-[.84rem] font-medium leading-tight ${on ? "text-ink" : "text-ink-2"}`}>{b.label}</p>
                <p className="text-muted text-[.72rem] leading-tight mt-0.5">{b.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---- 1. Profilo ----
function Profilo({ data, update }: { data: DashboardData; update: Update }) {
  const p = data.profile;
  const set = (k: keyof DashboardData["profile"], v: string | number | undefined) => update({ profile: { ...p, [k]: v } });
  const wins = data.wl.map((e) => e.wins);
  const allWins = wins.length ? wins : p.bestWL ? [p.bestWL] : [];
  const recentAvg = allWins.length ? allWins.slice(0, 4).reduce((a, b) => a + b, 0) / Math.min(allWins.length, 4) : 0;
  const peak = allWins.length ? Math.max(...allWins) : 0;
  const rating = skillRating(recentAvg, peak, p.division);
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[var(--radius-card)] border border-gold/30 bg-gradient-to-br from-gold/[.08] to-transparent p-5 text-center">
        <p className="font-display text-gold text-[3rem] leading-none">{rating || "—"}</p>
        <p className="text-muted text-[.78rem] uppercase tracking-[.12em] mt-2">Skill rating · stimato dai tuoi risultati</p>
      </div>
      <div className={`${card} grid grid-cols-2 gap-3`}>
        <Field label="Gamertag"><input className={inputCls} value={p.gamertag || ""} onChange={(e) => set("gamertag", e.target.value)} placeholder="Nome in gioco" /></Field>
        <Field label="Piattaforma">
          <select className={inputCls} value={p.platform || ""} onChange={(e) => set("platform", e.target.value)}>
            <option value="">—</option><option>PlayStation</option><option>Xbox</option><option>PC</option>
          </select>
        </Field>
        <Field label="Divisione">
          <select className={inputCls} value={p.division ?? ""} onChange={(e) => set("division", e.target.value ? Number(e.target.value) : undefined)}>
            <option value="">—</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d) => <option key={d} value={d}>Div {d}</option>)}
          </select>
        </Field>
        <Field label="Miglior WL (W/15)"><input type="number" min={0} max={15} className={inputCls} value={p.bestWL ?? ""} onChange={(e) => set("bestWL", e.target.value ? Math.max(0, Math.min(15, Number(e.target.value))) : undefined)} placeholder="0-15" /></Field>
        <Field label="Età"><input type="number" className={inputCls} value={p.age || ""} onChange={(e) => set("age", e.target.value)} placeholder="es. 19" /></Field>
        <Field label="Regione"><input className={inputCls} value={p.region || ""} onChange={(e) => set("region", e.target.value)} placeholder="es. Italia" /></Field>
        <div className="col-span-2"><Field label="Club FUT"><input className={inputCls} value={p.club || ""} onChange={(e) => set("club", e.target.value)} placeholder="Nome del tuo club" /></Field></div>
      </div>
      <p className="text-muted text-[.86rem]">I dati si salvano da soli mentre scrivi.</p>
    </div>
  );
}

// ---- 2. Weekend League ----
function WL({ data, update }: { data: DashboardData; update: Update }) {
  const [w, setW] = useState(""), [gf, setGf] = useState(""), [ga, setGa] = useState(""), [rank, setRank] = useState("");
  function add() {
    if (w === "") return;
    update({ wl: [{ id: uid(), date: today(), wins: Number(w), gf: gf ? Number(gf) : undefined, ga: ga ? Number(ga) : undefined, rank: rank || undefined }, ...data.wl], streak: bumpStreak(data.streak) });
    setW(""); setGf(""); setGa(""); setRank("");
  }
  const best = data.wl.reduce((m, e) => Math.max(m, e.wins), 0);
  return (
    <div className="flex flex-col gap-4">
      {coachInsights(data).filter((i) => i.s === "wl").map((ins, idx) => <InsightBar key={idx} tone={ins.tone} text={ins.text} />)}
      {data.wl.length > 0 && (
        <div className={card}>
          <div className="flex items-baseline justify-between"><span className="section-label">Miglior weekend</span><span className="font-display text-gold text-[1.6rem]">{best}/15</span></div>
          <Spark values={data.wl.map((e) => e.wins).reverse()} />
        </div>
      )}
      <div className={`${card} grid grid-cols-2 gap-3`}>
        <Field label="Vittorie / 15"><input type="number" min={0} max={15} className={inputCls} value={w} onChange={(e) => setW(e.target.value === "" ? "" : String(Math.max(0, Math.min(15, Number(e.target.value)))))} placeholder="0-15" /></Field>
        <Field label="Rank"><select className={inputCls} value={rank} onChange={(e) => setRank(e.target.value)}><option value="">—</option>{RANKS.map((r) => <option key={r}>{r}</option>)}</select></Field>
        <Field label="Gol fatti"><input type="number" className={inputCls} value={gf} onChange={(e) => setGf(e.target.value)} /></Field>
        <Field label="Gol subiti"><input type="number" className={inputCls} value={ga} onChange={(e) => setGa(e.target.value)} /></Field>
        <div className="col-span-2"><button onClick={add} className="btn-primary w-full justify-center">Aggiungi weekend</button></div>
      </div>
      {data.wl.map((e) => (
        <div key={e.id} className="flex items-center justify-between rounded-[10px] border border-line-2 bg-[#120f0a] px-4 py-3">
          <div><p className="font-display text-ink">{e.wins}/15 {e.rank && <span className="text-gold text-[.88rem]">· {e.rank}</span>}</p><p className="text-muted text-[.8rem]">{e.date}{e.gf != null ? ` · ${e.gf}-${e.ga ?? 0} gol` : ""}</p></div>
          <button onClick={() => update({ wl: data.wl.filter((x) => x.id !== e.id) })} className="text-muted hover:text-red text-[.84rem]">Elimina</button>
        </div>
      ))}
    </div>
  );
}

// ---- 3. Andamento divisione ----
function Divisione({ data, update }: { data: DashboardData; update: Update }) {
  const [d, setD] = useState("");
  function add() {
    if (!d) return;
    update({ divisions: [...data.divisions, { date: today(), division: Number(d) }] });
    setD("");
  }
  const cur = data.divisions[data.divisions.length - 1]?.division;
  return (
    <div className="flex flex-col gap-4">
      <div className={card}>
        <div className="flex items-baseline justify-between"><span className="section-label">Divisione attuale</span><span className="font-display text-gold text-[1.6rem]">{cur ? `Div ${cur}` : "—"}</span></div>
        {data.divisions.length > 1 ? <Spark values={data.divisions.map((x) => 11 - x.division)} /> : <p className="text-muted text-[.86rem] mt-2">Aggiungi almeno due rilevazioni per vedere la curva.</p>}
      </div>
      <div className={`${card} flex items-end gap-3`}>
        <div className="flex-1"><Field label="La tua divisione ora"><select className={inputCls} value={d} onChange={(e) => setD(e.target.value)}><option value="">—</option>{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => <option key={n} value={n}>Div {n}</option>)}</select></Field></div>
        <button onClick={add} className="btn-primary shrink-0">Aggiorna</button>
      </div>
    </div>
  );
}

// ---- 4. Diario (Rivals) ----
function Diario({ data, update }: { data: DashboardData; update: Update }) {
  const [win, setWin] = useState(""), [loss, setLoss] = useState(""), [gf, setGf] = useState(""), [ga, setGa] = useState("");
  function add() {
    if (win === "" && loss === "") return;
    update({ rivals: [{ id: uid(), date: today(), wins: Number(win || 0), losses: Number(loss || 0), gf: gf ? Number(gf) : undefined, ga: ga ? Number(ga) : undefined }, ...data.rivals], streak: bumpStreak(data.streak) });
    setWin(""); setLoss(""); setGf(""); setGa("");
  }
  const st = aggRivals(recentRivals(data.rivals));
  const ins = coachInsights(data).filter((i) => i.s === "diario");
  return (
    <div className="flex flex-col gap-4">
      {ins.map((x, idx) => <InsightBar key={idx} tone={x.tone} text={x.text} />)}
      <div className={card}>
        <span className="section-label">Ultimi 7 giorni</span>
        {st.played > 0 ? (
          <div className="grid grid-cols-2 gap-3 mt-3">
            {[{ k: "Win rate", v: `${st.winRate}%` }, { k: "Gol/partita", v: st.gfg }, { k: "Subiti/partita", v: st.gag }, { k: "Differenza reti", v: (st.diff >= 0 ? "+" : "") + st.diff }].map((x) => (
              <div key={x.k} className="rounded-[10px] border border-line-2 bg-[#120f0a] p-3 text-center"><p className="font-display text-ink text-[1.4rem] leading-none">{x.v}</p><p className="text-muted text-[.72rem] uppercase tracking-[.1em] mt-1.5">{x.k}</p></div>
            ))}
          </div>
        ) : (
          <p className="text-muted text-[.88rem] mt-2">Nessuna partita negli ultimi 7 giorni. Aggiungi una sessione qui sotto.</p>
        )}
      </div>
      <div className={`${card} grid grid-cols-2 gap-3`}>
        <Field label="Vittorie (Rivals)"><input type="number" className={inputCls} value={win} onChange={(e) => setWin(e.target.value)} /></Field>
        <Field label="Sconfitte"><input type="number" className={inputCls} value={loss} onChange={(e) => setLoss(e.target.value)} /></Field>
        <Field label="Gol fatti"><input type="number" className={inputCls} value={gf} onChange={(e) => setGf(e.target.value)} /></Field>
        <Field label="Gol subiti"><input type="number" className={inputCls} value={ga} onChange={(e) => setGa(e.target.value)} /></Field>
        <div className="col-span-2"><button onClick={add} className="btn-primary w-full justify-center">Aggiungi sessione</button></div>
      </div>
      {data.rivals.map((e) => (
        <div key={e.id} className="flex items-center justify-between rounded-[10px] border border-line-2 bg-[#120f0a] px-4 py-3">
          <div><p className="font-display text-ink">{e.wins}V - {e.losses}S {e.gf != null && <span className="text-muted text-[.86rem]">· {e.gf}-{e.ga ?? 0}</span>}</p><p className="text-muted text-[.8rem]">{e.date}</p></div>
          <button onClick={() => update({ rivals: data.rivals.filter((x) => x.id !== e.id) })} className="text-muted hover:text-red text-[.84rem]">Elimina</button>
        </div>
      ))}
    </div>
  );
}

// ---- 5. Punto debole ----
function PuntoDebole({ data, update, onClose }: { data: DashboardData; update: Update; onClose: () => void }) {
  const ws = data.weakSpot;
  const save = (area: string, source: string) => update({ weakSpot: { area, source, date: today() } });
  if (ws) {
    const a = AREA_LABELS[ws.area];
    return (
      <div className="flex flex-col gap-4">
        <div className={`${card} text-center`}>
          <p className="text-muted text-[.88rem]">Il tuo punto debole</p>
          <p className="font-display text-gold text-[1.8rem] my-1">{a?.label || ws.area}</p>
          {a && <Link to={`/account/corso/${a.id}`} onClick={onClose} className="btn-primary inline-flex no-underline mt-2">Vai all'esercizio</Link>}
        </div>
        <button onClick={() => update({ weakSpot: null })} className="text-ink-2 underline text-[.93rem] self-center hover:text-gold">Rifai il test</button>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <WeakSpotQuiz onResult={(area) => save(area, "quiz")} />
      <div className={card}>
        <span className="section-label">Oppure dimmelo tu</span>
        <p className="text-ink-2 text-[.9rem] mt-2 mb-3">Dove fai più fatica?</p>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(AREA_LABELS).map(([k, a]) => <button key={k} onClick={() => save(k, "manuale")} className="text-[.93rem] text-ink-2 border border-line-2 rounded-[10px] px-3 py-2.5 hover:border-gold/40 hover:text-ink transition-colors">{a.label}</button>)}
        </div>
      </div>
    </div>
  );
}

// ---- 6. Obiettivi ----
function Obiettivi({ data, update }: { data: DashboardData; update: Update }) {
  const [text, setText] = useState("");
  const addGoal = (t: string) => { if (t.trim()) { update({ goals: [...data.goals, { id: uid(), text: t.trim(), done: false }] }); setText(""); } };
  return (
    <div className="flex flex-col gap-4">
      <div className={card}>
        <span className="section-label">Scegli un obiettivo</span>
        <div className="flex flex-wrap gap-2 mt-3">
          {GOAL_PRESETS.map((g) => <button key={g} onClick={() => addGoal(g)} className="text-[.88rem] text-ink-2 border border-line-2 rounded-full px-3 py-1.5 hover:border-gold/40 hover:text-ink transition-colors">{g}</button>)}
        </div>
        <div className="flex gap-2 mt-3">
          <input className={inputCls} value={text} onChange={(e) => setText(e.target.value)} placeholder="…o scrivi il tuo" onKeyDown={(e) => { if (e.key === "Enter") addGoal(text); }} />
          <button onClick={() => addGoal(text)} className="btn-secondary shrink-0">Aggiungi</button>
        </div>
      </div>
      {data.goals.map((g) => (
        <div key={g.id} className="flex items-center gap-3 rounded-[10px] border border-line-2 bg-[#120f0a] px-4 py-3">
          <button onClick={() => update({ goals: data.goals.map((x) => (x.id === g.id ? { ...x, done: !x.done } : x)) })} className={`w-5 h-5 rounded-[6px] border shrink-0 grid place-items-center text-[.76rem] ${g.done ? "bg-gold border-gold text-gold-contrast" : "border-line-2"}`}>{g.done ? "✓" : ""}</button>
          <span className={`flex-1 text-[.97rem] ${g.done ? "text-muted line-through" : "text-ink"}`}>{g.text}</span>
          <button onClick={() => update({ goals: data.goals.filter((x) => x.id !== g.id) })} className="text-muted hover:text-red text-[1rem] leading-none">×</button>
        </div>
      ))}
    </div>
  );
}

// ---- 7. Costanza (streak) ----
function Costanza({ data }: { data: DashboardData }) {
  const s = data.streak;
  const doneToday = s?.lastDay === today();
  return (
    <div className="flex flex-col gap-4">
      <div className={`${card} text-center`}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 mx-auto text-gold" aria-hidden="true"><path d="M12 2c1 3-1 4-2 6-1 2 0 4 2 4 1.5 0 2.5-1 2.5-2.5 1.5 1.2 2.5 3 2.5 5a7 7 0 1 1-12.4-4.4C7 12 9 10 9 7c2 1 3 3 3 5 1-2 1-6 0-10z" /></svg>
        <p className="font-display text-gold text-[2.6rem] leading-none mt-1">{s?.count || 0}</p>
        <p className="text-ink text-[.97rem] mt-1">giorni di fila che sei attivo</p>
        {doneToday && <p className="text-gold text-[.88rem] mt-2">✓ Oggi sei stato attivo</p>}
      </div>
      <div className={card}>
        <span className="section-label">Come funziona</span>
        <p className="text-ink-2 text-[.97rem] mt-2 leading-relaxed">
          Conta <strong className="text-ink">da quanti giorni di fila sei attivo</strong>. Ogni giorno in cui segni un risultato o completi un esercizio, il numero <strong className="text-ink">sale di uno</strong>. Se passa un giorno senza fare niente, <strong className="text-ink">riparte da zero</strong>. La sfida è non interromperla mai: più giorni di fila tieni, più sei costante.
        </p>
      </div>
    </div>
  );
}

// ---- 8. Benchmark Elite (Plus) ----
function Benchmark({ data }: { data: DashboardData }) {
  const st = aggRivals(recentRivals(data.rivals));
  const bestWL = Math.max(data.profile.bestWL || 0, ...data.wl.map((e) => e.wins), 0);
  const div = data.divisions[data.divisions.length - 1]?.division ?? data.profile.division;
  const isElite = bestWL >= ELITE_QUALIFY && div === 1;
  const rows = [
    { k: "Win rate", you: `${st.winRate}%`, elite: `${ELITE.winRate}%`, pct: Math.min(100, Math.round((st.winRate / ELITE.winRate) * 100)) },
    { k: "Gol a partita", you: st.gfg, elite: ELITE.gfg, pct: Math.min(100, Math.round((st.gfg / ELITE.gfg) * 100)) },
    { k: "Subiti a partita", you: st.gag || "—", elite: ELITE.gag, pct: st.gag ? Math.min(100, Math.round((ELITE.gag / st.gag) * 100)) : 0 },
    { k: "Vittorie WL", you: `${bestWL}/15`, elite: `${ELITE.wl}+`, pct: Math.min(100, Math.round((bestWL / ELITE.wl) * 100)) },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className={`${card} text-center`}>
        <p className="font-display text-[1.3rem] text-ink">{isElite ? "Sei a livello Elite" : "Non ancora Elite"}</p>
        <p className="text-muted text-[.88rem] mt-1">Elite = 13+ vittorie in WL e Divisione Elite.</p>
      </div>
      {rows.map((r) => (
        <div key={r.k} className={card}>
          <div className="flex items-baseline justify-between mb-2"><span className="text-ink text-[.97rem]">{r.k}</span><span className="text-muted text-[.88rem]">tu {r.you} · elite {r.elite}</span></div>
          <div className="h-1.5 rounded-full bg-line-2 overflow-hidden"><div className="h-full bg-gold transition-[width] duration-500" style={{ width: `${r.pct}%` }} /></div>
        </div>
      ))}
    </div>
  );
}

// ---- 9. Crediti e rosa (Plus) ----
function Crediti({ data, update }: { data: DashboardData; update: Update }) {
  const c = data.credits;
  const set = (k: "coins" | "squadValue", v: string) => update({ credits: { ...c, [k]: v ? Number(v) : undefined } });
  return (
    <div className="flex flex-col gap-4">
      <div className={`${card} grid grid-cols-2 gap-3`}>
        <Field label="FC Coins attuali"><input type="number" className={inputCls} value={c.coins ?? ""} onChange={(e) => set("coins", e.target.value)} placeholder="es. 150000" /></Field>
        <Field label="Valore rosa"><input type="number" className={inputCls} value={c.squadValue ?? ""} onChange={(e) => set("squadValue", e.target.value)} placeholder="es. 500000" /></Field>
      </div>
      <div className={`${card} text-center`}>
        <span className="section-label justify-center">La tua rosa</span>
        <p className="text-muted text-[.9rem] mt-3">Caricare lo screenshot della rosa per salvarla: in arrivo.</p>
      </div>
    </div>
  );
}

// ---- 10. Report settimanale (Plus) ----
function Report({ data, onClose }: { data: DashboardData; onClose: () => void }) {
  const st = aggRivals(recentRivals(data.rivals));
  const lastWL = data.wl[0], prevWL = data.wl[1];
  const wlDelta = lastWL && prevWL ? lastWL.wins - prevWL.wins : null;
  const fc = data.weakSpot ? AREA_LABELS[data.weakSpot.area] : null;
  return (
    <div className="flex flex-col gap-4">
      <div className={card}>
        <span className="section-label">Il tuo report</span>
        <ul className="mt-3 flex flex-col gap-2 text-[.97rem] text-ink-2">
          <li>Weekend League: <strong className="text-ink">{lastWL ? `${lastWL.wins}/15` : "—"}</strong>{wlDelta != null && <span className={wlDelta >= 0 ? "text-gold" : "text-red"}> ({wlDelta >= 0 ? "+" : ""}{wlDelta} vs scorsa)</span>}</li>
          <li>Win rate Rivals: <strong className="text-ink">{st.played ? `${st.winRate}%` : "—"}</strong></li>
          <li>Gol: <strong className="text-ink">{st.played ? `${st.gfg} fatti · ${st.gag} subiti a partita` : "—"}</strong></li>
        </ul>
      </div>
      {coachInsights(data).slice(0, 3).map((x, idx) => <InsightBar key={idx} tone={x.tone} text={x.text} />)}
      <div className={card}>
        <span className="section-label">Prossimo focus</span>
        {fc ? (
          <>
            <p className="text-ink-2 text-[.97rem] mt-2 mb-3">Dai tuoi dati, lavora su <strong className="text-ink">{fc.label}</strong>.</p>
            <Link to={`/account/corso/${fc.id}`} onClick={onClose} className="btn-primary inline-flex no-underline">Vai all'esercizio</Link>
          </>
        ) : (
          <p className="text-ink-2 text-[.97rem] mt-2">Fai il test "Punto debole" per avere il focus consigliato.</p>
        )}
      </div>
    </div>
  );
}

// Anteprima del servizio Plus: esempio sfocato del risultato + cosa ricevi davvero. Così si capisce cosa si sblocca.
const PLUS_PREVIEW: Record<string, { title: string; bullets: string[]; sample: string[] }> = {
  benchmark: {
    title: "La tua strada per l'Elite, su misura",
    bullets: ["Quanto sei lontano dall'Elite su ogni numero (win rate, gol, WL)", "Il gap numero 1 da colmare, con gli esercizi giusti da guardare", "Il tuo posto tra gli iscritti dell'Academy"],
    sample: ["Win rate · tu 54% · Elite 80%", "Subiti a partita · tu 2,3 · Elite 1,7", "Da colmare: Difesa → 2 esercizi consigliati"],
  },
  crediti: {
    title: "La tua rosa analizzata",
    bullets: ["Carichi la tua squadra e ricevi 2-3 mosse di upgrade nel tuo budget", "Cosa comprare e cosa vendere per migliorare", "Quali SBC e pack convengono davvero a te"],
    sample: ["Valore rosa 480k · Crediti 90k", "Consiglio: cedi il CC, prendi un box-to-box", "SBC della settimana: conviene (+40k stimati)"],
  },
  report: {
    title: "Il tuo report da coach, ogni settimana",
    bullets: ["Un'analisi a parole dei tuoi numeri, non solo cifre", "Le 3 mosse della settimana per migliorare", "Gli esercizi giusti da guardare, scelti dai tuoi dati"],
    sample: ["Questa settimana: 8/15 in WL (-2 vs scorsa)", "Win rate giù: subisci troppo nel finale", "Focus: Testa da campione → guarda l'esercizio"],
  },
};

function PlusGate({ sectionKey, onClose }: { sectionKey: string; onClose: () => void }) {
  const p = PLUS_PREVIEW[sectionKey] ?? PLUS_PREVIEW.report;
  return (
    <div className="flex flex-col gap-4">
      <div className="relative rounded-[var(--radius-card)] border border-line-2 bg-[#181510] p-5 overflow-hidden">
        <span className="section-label">Esempio</span>
        <div className="mt-3 flex flex-col gap-2 blur-[2.5px] select-none pointer-events-none">
          {p.sample.map((s, i) => (
            <div key={i} className="rounded-[8px] border border-line-2 bg-[#120f0a] px-3 py-2 text-ink-2 text-[.92rem]">{s}</div>
          ))}
        </div>
        <div className="absolute inset-0 grid place-items-center bg-[#100d08]/35">
          <span className="inline-flex items-center gap-1.5 text-gold text-[.86rem] font-semibold border border-gold/40 bg-[#0b0810]/80 rounded-full px-3 py-1.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
            Solo col PRO
          </span>
        </div>
      </div>
      <div className="rounded-[var(--radius-card)] border border-gold/30 bg-gradient-to-br from-gold/[.07] to-transparent p-5">
        <span className="section-label">Col PRO ricevi</span>
        <p className="font-display text-ink text-[1.15rem] mt-1 mb-3">{p.title}</p>
        <ul className="flex flex-col gap-2 mb-5">
          {p.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-ink-2 text-[.95rem]"><span className="text-gold mt-px shrink-0" aria-hidden>✓</span>{b}</li>
          ))}
        </ul>
        <Link to="/account/abbonamento" onClick={onClose} className="btn-primary inline-flex no-underline">Sblocca col PRO</Link>
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string | number }) {
  return (
    <div className="rounded-[10px] border border-line-2 bg-[#181510] p-2.5 text-center">
      <p className="font-display text-gold text-[1.25rem] leading-none">{v}</p>
      <p className="text-muted text-[.7rem] uppercase tracking-[.1em] mt-1">{k}</p>
    </div>
  );
}

// Panoramica all'apertura del pannello: la card + l'istantanea personale.
export function DashOverview({ data, update }: { data: DashboardData; update: Update }) {
  const p = data.profile;
  const allWins = data.wl.length ? data.wl.map((e) => e.wins) : p.bestWL ? [p.bestWL] : [];
  const recentAvg = allWins.length ? allWins.slice(0, 4).reduce((a, b) => a + b, 0) / Math.min(allWins.length, 4) : 0;
  const peak = allWins.length ? Math.max(...allWins) : 0;
  const rating = skillRating(recentAvg, peak, p.division);
  const lastWL = data.wl[0];
  const nextGoal = data.goals.find((g) => !g.done);
  const insights = coachInsights(data);
  const completed = useProgress();
  const { level, intoLevel, perLevel } = computeXP(data, completed.size);
  // Un nuovo non ha ancora dati: gli spieghiamo cos'è e da dove partire, invece di mostrargli solo trattini.
  const hasData = !!(p.gamertag || p.division || p.bestWL || data.wl.length || data.divisions.length || data.rivals.length);
  return (
    <div className="flex flex-col gap-3 mb-5">
      <p className="text-ink-2 text-[.93rem] leading-snug">
        Questa è la <strong className="text-ink">tua dashboard</strong>: segna i tuoi risultati e qui vedi, nero su bianco, se stai migliorando e quanto ti manca all'Elite. Più dati inserisci, più diventa precisa.
      </p>
      {!hasData && (
        <div className="rounded-[var(--radius-card)] border border-gold/30 bg-gold/[.06] p-4">
          <p className="font-display text-ink text-[1rem] mb-1">Inizia da qui, in 2 minuti</p>
          <ol className="text-ink-2 text-[.92rem] leading-relaxed list-decimal pl-4 space-y-0.5">
            <li>Apri <strong className="text-ink">Profilo e livello</strong> e scrivi gamertag, piattaforma e divisione.</li>
            <li>Apri <strong className="text-ink">Weekend League</strong> e segna quante partite hai vinto.</li>
            <li>Torna qui: la tua card e i tuoi numeri si riempiono da soli.</li>
          </ol>
        </div>
      )}
      <PlayerCard data={data} update={update} rating={rating} />
      {/* Livello = attività (XP). Sale allenandoti: è la base della classifica. */}
      <div className="rounded-[10px] border border-gold/25 bg-gold/[.05] px-3.5 py-3">
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="font-display text-ink text-[1rem]">Livello {level}</span>
          <span className="text-muted text-[.84rem]">{intoLevel}/{perLevel} XP al prossimo</span>
        </div>
        <div className="h-1.5 rounded-full bg-line-2 overflow-hidden"><div className="h-full bg-gold transition-[width] duration-500" style={{ width: `${(intoLevel / perLevel) * 100}%` }} /></div>
        <p className="text-muted text-[.78rem] mt-1.5">Sali allenandoti: ogni esercizio, risultato e giorno di costanza vale XP. Il livello conta per la classifica.</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <Stat k="Skill rating" v={rating ? `${rating}/100` : "—"} />
        <Stat k="Divisione Rivals" v={p.division ? `Div ${p.division}` : "—"} />
        <Stat k="Ultima Weekend League" v={lastWL ? `${lastWL.wins}/15` : "—"} />
        <Stat k="Miglior WL" v={peak ? `${peak}/15` : "—"} />
      </div>
      <p className="text-muted text-[.8rem] leading-snug">Lo <strong className="text-ink-2">skill rating</strong> va da 0 a 100: lo calcoliamo dalle tue vittorie in Weekend League e dalla tua divisione.</p>
      {insights[0] && <InsightBar tone={insights[0].tone} text={insights[0].text} />}
      <Badges data={data} />
      {nextGoal && (
        <div className="rounded-[10px] border border-gold/25 bg-gold/[.05] px-4 py-2.5 text-[.9rem] text-ink-2">Prossimo obiettivo: <strong className="text-ink">{nextGoal.text}</strong></div>
      )}
    </div>
  );
}

// --- Classifica e premi: la "gara" mensile sull'attività. Motore del ritorno quotidiano. ---
const SEASON_PRIZES = [
  { pos: "1", t: "Sessione di coaching 1:1 con Fabio", d: "Un'ora con me, sui tuoi problemi veri." },
  { pos: "2", t: "Una partita con Fabio", d: "Giochi contro di me. Roba che non si compra." },
  { pos: "3", t: "Clip-review della tua partita", d: "Mandi una clip, ricevi 3 consigli mirati." },
];
// I premi veri si assegnano solo quando la gara ha massa: almeno 50 giocatori in classifica.
const PRIZE_THRESHOLD = 50;

function Stagione({ data }: { data: DashboardData }) {
  const completed = useProgress();
  const { level } = computeXP(data, completed.size);
  const seasonXP = computeSeasonXP(data);
  const { days, monthName } = seasonEnd();
  const board = useLeaderboard();
  const participants = board?.length ?? 0;
  const prizesActive = participants >= PRIZE_THRESHOLD;
  return (
    <div className="flex flex-col gap-4">
      {/* intestazione stagione */}
      <div className="rounded-[var(--radius-card)] border border-gold/30 bg-gradient-to-br from-gold/[.10] to-transparent p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="section-label">Stagione di {monthName}</span>
          <span className="text-gold text-[.88rem] font-semibold">{days === 0 ? "ultimo giorno" : `chiude tra ${days}g`}</span>
        </div>
        <p className="font-display text-ink text-[1.4rem] mt-1">{seasonXP} punti questo mese</p>
        <p className="text-ink-2 text-[.93rem] mt-1 leading-relaxed">Sei al <strong className="text-ink">Livello {level}</strong>. Più ti alleni e segni risultati, più sali. Ogni mese la classifica riparte da zero: tutti hanno una nuova chance.</p>
      </div>

      {/* CLASSIFICA del mese (stessa tabella della pagina) */}
      <div>
        <span className="section-label block mb-2.5">Classifica del mese</span>
        <LeaderboardTable rows={board} />
      </div>

      {/* i 3 premi */}
      <div>
        <div className="flex items-baseline justify-between gap-2 mb-2.5">
          <span className="section-label">I premi dei primi 3</span>
          <span className={`text-[.84rem] font-semibold ${prizesActive ? "text-gold" : "text-muted"}`}>{prizesActive ? "in palio a fine mese" : `si attivano a ${PRIZE_THRESHOLD} giocatori`}</span>
        </div>
        <div className="flex flex-col gap-2.5">
          {SEASON_PRIZES.map((pr) => (
            <div key={pr.pos} className="rounded-[12px] border border-line-2 bg-[#181510] p-3.5 flex items-center gap-3.5">
              <span className="w-9 h-9 shrink-0 rounded-full bg-gold text-gold-contrast grid place-items-center font-display text-[1rem]">{pr.pos}</span>
              <span className="flex-1 min-w-0">
                <span className="block font-display text-ink text-[1rem]">{pr.t}</span>
                <span className="block text-ink-2 text-[.88rem] mt-0.5">{pr.d}</span>
              </span>
            </div>
          ))}
        </div>
        {!prizesActive && (
          <p className="text-muted text-[.84rem] mt-2.5">Ora siete in <strong className="text-ink-2">{participants}</strong>. Quando arriviamo a {PRIZE_THRESHOLD} giocatori, i primi 3 di fine mese vincono davvero. Intanto la gara è per scaldarsi e fare punti.</p>
        )}
      </div>

      {/* COME PARTECIPARE: i passi, semplici */}
      <div className="rounded-[12px] border border-line-2 bg-[#120f0a] p-4">
        <span className="section-label">Come partecipare</span>
        <ol className="mt-2.5 flex flex-col gap-2 text-ink-2 text-[.92rem] leading-relaxed list-decimal pl-4">
          <li><strong className="text-ink">Sei già dentro.</strong> Appena segni un risultato o fai un esercizio, entri in classifica.</li>
          <li><strong className="text-ink">Sali facendo attività</strong>: segna le Weekend League, fai gli esercizi del percorso, completa la sfida del giorno.</li>
          <li><strong className="text-ink">Tieni viva la striscia</strong>: ogni giorno attivo vale punti. Se salti un giorno, riparte da zero.</li>
          <li><strong className="text-ink">A fine mese</strong> i primi 3 vincono i premi, poi la classifica riparte da zero per tutti.</li>
        </ol>
        <p className="text-muted text-[.84rem] mt-3">Conta l'attività vera, non i risultati dichiarati: così non si può barare.</p>
      </div>
    </div>
  );
}

// Una riga che spiega, in italiano semplice, a cosa serve ogni sezione (in cima al contenuto).
const EXPLAINERS: Record<string, string> = {
  profilo: "I tuoi dati e il tuo skill rating, calcolato dai risultati che inserisci.",
  wl: "Dopo ogni Weekend League, segna quante ne hai vinte: vedi il tuo record e se stai migliorando.",
  divisione: "Aggiorna la tua divisione quando cambia: vedi se stai salendo, settimana dopo settimana.",
  diario: "Segna com'è andata in Rivals (vittorie, sconfitte, gol): calcoliamo win rate e medie degli ultimi 7 giorni.",
  puntodebole: "Scopri su cosa ti conviene lavorare e vai dritto all'esercizio giusto.",
  obiettivi: "Datti un traguardo e tieni d'occhio i tuoi progressi.",
  stagione: "La gara del mese: accumuli punti allenandoti e i primi 3 vincono i premi.",
  benchmark: "Quanto sei lontano dai numeri di chi gioca in Elite.",
  crediti: "Tieni traccia dei crediti e del valore della tua rosa.",
  report: "Il riepilogo della tua settimana, con cosa migliorare.",
};

export function DashSection({ sectionKey, data, update, isActive, onClose }: { sectionKey: string; data: DashboardData; update: Update; isActive: boolean; onClose: () => void }) {
  const body = (() => {
    switch (sectionKey) {
      case "profilo": return <Profilo data={data} update={update} />;
      case "wl": return <WL data={data} update={update} />;
      case "divisione": return <Divisione data={data} update={update} />;
      case "diario": return <Diario data={data} update={update} />;
      case "puntodebole": return <PuntoDebole data={data} update={update} onClose={onClose} />;
      case "obiettivi": return <Obiettivi data={data} update={update} />;
      case "stagione": return <Stagione data={data} />;
      case "streak": return <Costanza data={data} />;
      case "benchmark": return isActive ? <Benchmark data={data} /> : <PlusGate sectionKey={sectionKey} onClose={onClose} />;
      case "crediti": return isActive ? <Crediti data={data} update={update} /> : <PlusGate sectionKey={sectionKey} onClose={onClose} />;
      case "report": return isActive ? <Report data={data} onClose={onClose} /> : <PlusGate sectionKey={sectionKey} onClose={onClose} />;
      default: return null;
    }
  })();
  const explainer = EXPLAINERS[sectionKey];
  return (
    <div className="flex flex-col gap-3">
      {explainer && <p className="text-muted text-[.9rem] leading-snug">{explainer}</p>}
      {body}
    </div>
  );
}
