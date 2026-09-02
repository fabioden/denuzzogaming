import { Link, useOutletContext } from "react-router-dom";
import { courses, categoryOrder, categoryTitle, weeklyDrop, promo } from "@/content/membership";
import { wrap, ArrowIcon, PlayIcon, LockIcon } from "@/components/academy";
import { useProgress } from "@/hooks/useProgress";
import type { MemberContext } from "@/components/MemberLayout";

// Icona identità per area: dà un volto a ogni tappa (difesa, attacco, ecc.) anche prima delle copertine vere.
function CatIcon({ cat }: { cat: string }) {
  const p = { width: 17, height: 17, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (cat === "Difesa") return <svg {...p}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /></svg>;
  if (cat === "Attacco") return <svg {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.5" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></svg>;
  if (cat === "Mentalità") return <svg {...p}><path d="M9 18v2h6v-2M12 3a6 6 0 0 0-4 10.5c.6.6 1 1.3 1 2.5h6c0-1.2.4-1.9 1-2.5A6 6 0 0 0 12 3z" /></svg>;
  return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>;
}

// "Il mio percorso": la pagina personale del cammino. Le tappe in ordine con avanzamento reale,
// da dove riprendere e il video della settimana. (Separata dalla Home, che spiega la piattaforma.)
export default function Percorso() {
  const { isActive } = useOutletContext<MemberContext>();
  const locked = !isActive;
  const completed = useProgress();

  const modules = categoryOrder
    .map((cat) => {
      const cs = courses.filter((c) => c.category === cat);
      const lessonIds = cs.flatMap((c) => c.lessons.map((l) => l.id));
      const done = lessonIds.filter((id) => completed.has(id)).length;
      return { cat, title: categoryTitle[cat], firstCourseId: cs[0]?.id, total: lessonIds.length, done };
    })
    .filter((m) => m.firstCourseId);

  const totalLessons = modules.reduce((n, m) => n + m.total, 0);
  const doneLessons = modules.reduce((n, m) => n + m.done, 0);
  const overall = totalLessons ? Math.round((doneLessons / totalLessons) * 100) : 0;
  const started = doneLessons > 0;

  // "Riprendi": il primo esercizio non ancora completato.
  const nextLesson = courses.flatMap((c) => c.lessons.map((l) => ({ courseId: c.id, id: l.id }))).find((l) => !completed.has(l.id));
  const resumeCourseId = nextLesson?.courseId ?? courses[0]?.id;

  return (
    <section className="pt-[clamp(24px,4vw,44px)] pb-[clamp(60px,10vh,120px)]">
      <div className={wrap}>
        <span className="section-label hero-rise block" style={{ animationDelay: ".05s" }}>Il mio percorso</span>
        <h1 className="hero-rise font-display serif text-[clamp(1.7rem,3.2vw,2.5rem)] text-ink mt-1 mb-2" style={{ animationDelay: ".16s" }}>Il tuo cammino verso l'Elite</h1>
        <p className="hero-rise lead text-ink-2 max-w-[56ch]" style={{ animationDelay: ".27s" }}>Le quattro tappe in ordine. Vai al tuo ritmo: qui vedi a che punto sei e da dove riprendere.</p>

        {/* Riprendi / avanzamento */}
        <div className="hero-rise mt-6 flex flex-wrap items-center gap-4" style={{ animationDelay: ".36s" }}>
          {resumeCourseId && (
            <Link to={`/account/corso/${resumeCourseId}`} className="btn-primary inline-flex items-center gap-2 no-underline">
              <PlayIcon size={18} /> {started ? "Riprendi il percorso" : locked ? "Inizia gratis" : "Inizia il percorso"}
            </Link>
          )}
          {started && <span className="text-muted text-[.9rem]">{doneLessons}/{totalLessons} esercizi · {overall}%</span>}
        </div>

        {/* LE TAPPE */}
        <div className="flex flex-col gap-3 mt-[clamp(28px,4vw,44px)]">
          {modules.map((m, i) => (
            <Link
              key={m.cat}
              to={`/account/corso/${m.firstCourseId}`}
              className="group rounded-[var(--radius-card)] border border-line-2 bg-[#120f0a]/70 hover:border-gold/35 hover:bg-[#181510] transition-colors p-4 sm:p-5 no-underline flex items-center gap-4 fade-up"
            >
              <span className="shrink-0 w-9 h-9 rounded-full border border-line-2 grid place-items-center font-display text-ink-2 text-[.95rem]">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="font-display text-ink text-[1.05rem] flex items-center gap-2"><span className="text-gold shrink-0"><CatIcon cat={m.cat} /></span>{m.title}</p>
                <p className="text-muted text-[.86rem] mt-0.5">{m.done > 0 ? `${m.done}/${m.total} completati` : `${m.total} esercizi · ${locked ? "1 gratis, gli altri PRO" : "da iniziare"}`}</p>
                <div className="h-1 rounded-full bg-line-2 mt-2 overflow-hidden max-w-[260px]">
                  <div className="h-full bg-gold transition-[width] duration-500" style={{ width: `${m.total ? (m.done / m.total) * 100 : 0}%` }} />
                </div>
              </div>
              <span className="text-muted group-hover:text-gold transition-all group-hover:translate-x-0.5 shrink-0">
                {m.total > 0 && m.done === m.total ? <span className="text-gold text-[1.1rem]" aria-hidden>✓</span> : locked ? <LockIcon size={16} /> : <ArrowIcon size={18} />}
              </span>
            </Link>
          ))}
        </div>

        {/* IL VIDEO DELLA SETTIMANA (scorciatoia a Questa settimana) */}
        <div className="flex items-end justify-between gap-4 mt-[clamp(34px,4.5vw,54px)] mb-4">
          <h2 className="font-display text-[clamp(1.2rem,2.2vw,1.5rem)] text-ink">Il video della settimana</h2>
          <Link to="/account/settimana" className="text-muted hover:text-gold text-[.88rem] transition-colors shrink-0 no-underline">Apri Questa settimana →</Link>
        </div>
        <Link to="/account/settimana" className="group block relative overflow-hidden rounded-[var(--radius-card)] border border-line-2 min-h-[clamp(220px,32vw,320px)] flex items-end no-underline fade-up">
          <div className="absolute inset-0" style={{ background: `radial-gradient(120% 95% at 86% 6%, ${promo.accent}30, transparent 56%), linear-gradient(135deg, ${promo.bgTop} 0%, #160e2b 54%, #0c0816 100%)` }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,8,18,.92) 0%, transparent 62%)" }} />
          <span className="absolute -right-2 top-1 font-display leading-none text-[clamp(5rem,14vw,11rem)] pointer-events-none select-none" style={{ color: "rgba(255,255,255,.05)" }} aria-hidden="true">{weeklyDrop.episode}</span>
          <span className="absolute top-4 left-5 section-label">Video esclusivo · ogni settimana</span>
          {!isActive && <span className="absolute top-4 right-4 inline-flex items-center px-2.5 py-0.5 rounded-full bg-gold text-gold-contrast text-[11px] font-bold uppercase tracking-[.12em]">Gratis di prova</span>}
          <span className="absolute inset-0 grid place-items-center pointer-events-none">
            <span className="w-16 h-16 rounded-full bg-gold text-gold-contrast grid place-items-center shadow-[0_10px_30px_-8px_rgba(0,0,0,.7)] group-hover:scale-105 transition-transform">
              <PlayIcon size={26} />
            </span>
          </span>
          <div className="relative p-[clamp(20px,4vw,40px)] max-w-[640px]">
            <p className="text-muted text-[.86rem]">{promo.name} · Episodio {weeklyDrop.episode}</p>
            <h3 className="font-display text-ink text-[clamp(1.3rem,3vw,2rem)] leading-tight mt-1 mb-3">{weeklyDrop.title}</h3>
            <div className="flex flex-wrap gap-2">
              {weeklyDrop.topPlayers[0] && <span className="text-[.84rem] text-ink-2 bg-card/70 border border-line-2 px-2.5 py-1 rounded-full">Top: {weeklyDrop.topPlayers[0].name}</span>}
              <span className="text-[.84rem] text-ink-2 bg-card/70 border border-line-2 px-2.5 py-1 rounded-full">Gemma: {weeklyDrop.gem.name}</span>
              <span className="text-[.84rem] text-ink-2 bg-card/70 border border-line-2 px-2.5 py-1 rounded-full">{weeklyDrop.sbc.length} SBC risolti</span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
