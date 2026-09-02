import { Link, useOutletContext } from "react-router-dom";
import { weeklyDrop, promo, nextDrop } from "@/content/membership";
import { wrap, PlayIcon, DownloadIcon, VideoPlayer } from "@/components/academy";
import type { MemberContext } from "@/components/MemberLayout";

export default function Week() {
  const { isActive } = useOutletContext<MemberContext>();
  // Il numero della settimana corrente è l'assaggio gratis di "Le Dritte di Denuzzo": libero per tutti.
  const days = Math.max(0, Math.ceil((new Date(nextDrop.dateISO).getTime() - new Date().getTime()) / 86400000));
  const countdown = days === 0 ? "Il nuovo numero esce oggi" : days === 1 ? "Nuovo numero tra 1 giorno" : `Nuovo numero tra ${days} giorni`;

  return (
    <section className="pt-[clamp(24px,4vw,44px)] pb-[clamp(60px,10vh,120px)]">
      <div className={wrap}>
        {/* BILLBOARD */}
        <section className="relative overflow-hidden rounded-[var(--radius-card)] border border-line-2 min-h-[clamp(300px,42vw,420px)] flex items-end">
          <div className="absolute inset-0" style={{ background: `radial-gradient(120% 95% at 86% 6%, ${promo.accent}30, transparent 56%), linear-gradient(135deg, ${promo.bgTop} 0%, #160e2b 54%, #0c0816 100%)` }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,8,18,.96) 0%, rgba(10,8,18,.7) 44%, rgba(10,8,18,.12) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,8,18,.9) 0%, transparent 42%)" }} />
          <span className="absolute -right-2 bottom-0 font-display leading-none text-[clamp(7rem,18vw,15rem)] pointer-events-none select-none" style={{ color: "rgba(255,255,255,.04)" }} aria-hidden="true">{weeklyDrop.episode}</span>
          <div className="relative p-[clamp(20px,4vw,44px)] max-w-[640px]">
            <span className="section-label hero-rise block" style={{ animationDelay: ".05s" }}>{promo.name} · Episodio {weeklyDrop.episode}</span>
            <h1 className="hero-rise font-display serif text-[clamp(1.8rem,4vw,2.9rem)] text-ink leading-[1.08] mt-2 mb-3" style={{ animationDelay: ".17s" }}>{weeklyDrop.title}</h1>
            <div className="hero-rise flex flex-wrap gap-2 mb-5" style={{ animationDelay: ".28s" }}>
              <span className="text-[.84rem] text-ink-2 bg-card/70 border border-line-2 px-2.5 py-1 rounded-full">Obiettivo {weeklyDrop.objective}</span>
              <span className="text-[.84rem] text-ink-2 bg-card/70 border border-line-2 px-2.5 py-1 rounded-full">{weeklyDrop.formation}</span>
            </div>
            <div className="hero-rise flex flex-wrap items-center gap-3" style={{ animationDelay: ".39s" }}>
              <a href="#video" className="btn-primary inline-flex items-center gap-2 no-underline">
                <PlayIcon size={18} /> Guarda ora
              </a>
              {isActive ? (
                <button className="btn-secondary inline-flex items-center gap-2">
                  <DownloadIcon size={16} /> Scarica scheda
                </button>
              ) : (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-gold/[.12] border border-gold/30 text-gold text-[.86rem] font-medium">Numero gratis di prova</span>
              )}
            </div>
          </div>
        </section>

        <p className="text-gold text-[.9rem] mt-4">{countdown}</p>

        {/* Cosa sono Le Dritte, spiegato semplice per chi arriva nuovo */}
        <p className="text-ink-2 text-[.95rem] mt-3 max-w-[72ch] leading-relaxed">
          <strong className="text-ink">Le Dritte di Denuzzo</strong> sono il tuo aggiornamento settimanale: ogni settimana Fabio ti dice le mosse giuste del momento, quali giocatori comprare, quali SBC fare e quali evoluzioni valgono. Così non perdi tempo a provare: vai sul sicuro. Questo numero è il tuo assaggio gratis.
        </p>

        {/* IL VIDEO DEL META */}
        <section id="video" className="mt-[clamp(28px,4vw,44px)] scroll-mt-24 fade-up">
          <h2 className="font-display text-[clamp(1.2rem,2.2vw,1.5rem)] text-ink mb-4">Il video del meta</h2>
          <div className="max-w-[900px]">
            <VideoPlayer youtubeId={weeklyDrop.youtubeId} title={weeklyDrop.title} locked={false} />
          </div>
        </section>

        {/* UPSELL: questo numero è l'assaggio, l'abbonamento dà ogni settimana + archivio */}
        {!isActive && (
          <div className="mt-6 rounded-[var(--radius-card)] border border-gold/30 bg-gradient-to-r from-gold/[.10] to-transparent p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between fade-up">
            <div>
              <p className="font-display text-ink text-[1.12rem]">Questo è il tuo assaggio gratis.</p>
              <p className="text-ink-2 text-[.97rem] mt-0.5">Con <strong className="text-ink">Le Dritte di Denuzzo</strong> lo ricevi ogni settimana, più tutto l'archivio dei numeri passati.</p>
            </div>
            <Link to="/account/abbonamento" className="btn-primary inline-flex shrink-0 no-underline">Entra in lista founder</Link>
          </div>
        )}

        {/* IN QUESTO NUMERO */}
        <h2 className="font-display text-[clamp(1.2rem,2.2vw,1.5rem)] text-ink mt-[clamp(34px,4.5vw,54px)] mb-4">In questo numero</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 fade-up">
          {/* top player */}
          <div className="card card--static">
            <span className="section-label">Top player</span>
            <ul className="mt-2 flex flex-col gap-3">
              {weeklyDrop.topPlayers.map((p) => (
                <li key={p.name}>
                  <p className="text-ink text-[.98rem] font-medium">{p.name}</p>
                  <p className="text-ink-2 text-[.9rem]">{p.role} · {p.note}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* gemma + sbc */}
          <div className="flex flex-col gap-5">
            <div className="card card--static">
              <span className="section-label">La gemma</span>
              <p className="text-ink text-[1.05rem] font-medium mt-1">{weeklyDrop.gem.name} <span className="text-gold text-[.95rem]">{weeklyDrop.gem.price}</span></p>
              <p className="text-ink-2 text-[.93rem] mt-1">{weeklyDrop.gem.note}</p>
            </div>
            <div className="card card--static">
              <span className="section-label">SBC della settimana</span>
              <ul className="mt-2 flex flex-col gap-2">
                {weeklyDrop.sbc.map((s) => (
                  <li key={s.name} className="flex items-start gap-2 text-[.95rem]">
                    <span className={s.worthIt ? "text-gold" : "text-muted"}>{s.worthIt ? "Sì" : "No"}</span>
                    <span className="text-ink-2">
                      <span className="text-ink">{s.name}.</span> {s.note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Link to="/account/archivio" className="inline-flex items-center gap-2 text-ink-2 hover:text-gold text-[.95rem] mt-[clamp(28px,4vw,44px)] transition-colors">
          Vedi i numeri precedenti →
        </Link>
      </div>
    </section>
  );
}
