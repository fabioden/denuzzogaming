import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { courses, categoryOrder } from "@/content/membership";
import { wrap, CourseTile, PlayIcon, LockIcon, ArrowIcon } from "@/components/academy";
import { AcademyOffer, AcademyProof, CheckIcon, FOUNDER_TOTAL } from "@/components/AcademyOffer";
import { useProgress } from "@/hooks/useProgress";
import type { MemberContext } from "@/components/MemberLayout";

// HOME = la dashboard dell'account, semplice: ti registri, entri, vedi i corsi.
// - Non abbonato: hero + una sola offerta (metodo Hormozi) + i corsi in anteprima bloccata.
// - Abbonato: "continua a guardare" + la tua libreria di corsi da riprodurre.
// Le altre sezioni (percorso, classifica, questa settimana) restano nelle loro pagine.
// L'offerta è nel componente condiviso AcademyOffer (usato anche dalla pagina pubblica /academy).

// Link di pagamento del corso (Stripe). Quando Fabio lo dà, incollalo qui e il bottone
// "Sblocca" diventa acquisto vero. Se vuoto, porta alla pagina piani (come oggi).
const CHECKOUT_URL = "";

export default function Home() {
  const { user, isActive } = useOutletContext<MemberContext>();
  const name = user.email ? user.email.split("@")[0] : "";
  const completed = useProgress();

  // "Continua a guardare": la prima lezione non ancora completata.
  const flat = courses.flatMap((c) => c.lessons.map((l) => ({ course: c, lesson: l })));
  const next = flat.find((x) => !completed.has(x.lesson.id)) ?? flat[0];
  // Prima area con lezione gratis, per l'assaggio "guarda gratis".
  const freeCourse = courses.find((c) => c.lessons.some((l) => l.free)) ?? courses[0];

  // "I miei corsi": filtro per area + progresso per corso.
  const [area, setArea] = useState<string>("Tutti");
  const areas = ["Tutti", ...categoryOrder];
  const shown = area === "Tutti" ? courses : courses.filter((c) => c.category === area);
  const progressOf = (c: (typeof courses)[number]) => ({ done: c.lessons.filter((l) => completed.has(l.id)).length, total: c.lessons.length });
  const started = completed.size > 0;

  // Bottone acquisto: link Stripe se c'è, altrimenti la pagina piani.
  const BuyButton = ({ className = "btn-primary", children }: { className?: string; children: React.ReactNode }) =>
    CHECKOUT_URL ? (
      <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className={`${className} no-underline inline-flex items-center justify-center gap-2`}>
        {children}
      </a>
    ) : (
      <Link to="/account/abbonamento" className={`${className} no-underline inline-flex items-center justify-center gap-2`}>
        {children}
      </Link>
    );

  return (
    <section className="pt-[clamp(20px,3vw,36px)] pb-[clamp(60px,10vh,120px)]">
      <div className={wrap}>
        {/* ---- SALUTO ACCOUNT ---- */}
        <div className="hero-rise flex flex-wrap items-center gap-3" style={{ animationDelay: ".05s" }}>
          <span className="section-label">Il tuo account</span>
          {isActive ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gold/35 bg-gold/[.07] text-gold text-[11px] font-bold uppercase tracking-[.1em]">
              <CheckIcon size={13} /> Accesso completo
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-line-2 text-ink-2 text-[11px] font-bold uppercase tracking-[.1em]">
              <LockIcon size={13} /> Account gratuito
            </span>
          )}
        </div>
        <h1 className="hero-rise font-display serif text-[clamp(1.7rem,3.6vw,2.6rem)] text-ink mt-1.5" style={{ animationDelay: ".14s" }}>
          Ciao {name}
        </h1>

        {/* ==================== ABBONATO: la tua libreria ==================== */}
        {isActive ? (
          <>
            {!started ? (
              /* PRIMO ACCESSO: nessun esercizio ancora fatto */
              <div className="hero-rise mt-6 rounded-[18px] border border-gold/25 bg-gradient-to-br from-[#1c1622] to-[#131017] p-[clamp(22px,4vw,40px)] relative overflow-hidden" style={{ animationDelay: ".24s" }}>
                <span className="section-label">Benvenuto nell'Academy</span>
                <h2 className="font-display serif text-[clamp(1.5rem,3vw,2.2rem)] text-ink mt-2 mb-2">Il tuo percorso per l'Elite parte qui</h2>
                <p className="text-ink-2 text-[.98rem] max-w-[54ch]">Non devi guardare tutto. Parti da un'area, fai un esercizio da 2-3 minuti, poi vai in partita e provalo.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 max-w-[720px]">
                  {[["1", "Scegli un'area", "Difesa, attacco, rosa o mentalità."], ["2", "Fai l'esercizio", "Video corti e concreti, niente teoria."], ["3", "Provalo in partita", "Applica e segna l'esercizio come fatto."]].map((s) => (
                    <div key={s[0]} className="rounded-[12px] border border-line-2 bg-black/25 p-4">
                      <span className="inline-grid place-items-center w-7 h-7 rounded-full bg-gold text-gold-contrast font-display text-[.9rem]">{s[0]}</span>
                      <p className="font-display text-ink text-[1rem] mt-2.5">{s[1]}</p>
                      <p className="text-ink-2 text-[.9rem] mt-1">{s[2]}</p>
                    </div>
                  ))}
                </div>
                <Link to={`/account/corso/${freeCourse.id}`} className="btn-primary no-underline inline-flex items-center gap-2 mt-6"><PlayIcon size={16} /> Inizia da qui</Link>
              </div>
            ) : next ? (
              /* CONTINUA A GUARDARE */
              <Link
                to={`/account/corso/${next.course.id}`}
                className="hero-rise group mt-6 flex items-center gap-4 rounded-[var(--radius-card)] border border-line-2 bg-gradient-to-r from-[#1a1520] to-[#141017] p-4 no-underline hover:border-gold/45 transition-colors"
                style={{ animationDelay: ".24s" }}
              >
                <span className="grid place-items-center w-[120px] h-[68px] shrink-0 rounded-[10px] bg-gold text-gold-contrast">
                  <PlayIcon size={26} />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="section-label">Continua a guardare</span>
                  <p className="font-display text-ink text-[1.05rem] leading-tight mt-1 truncate">{next.lesson.title}</p>
                  <p className="text-muted text-[.86rem] mt-0.5">{next.course.category} · {next.lesson.durationMin} min</p>
                </div>
                <span className="btn-primary shrink-0 hidden sm:inline-flex items-center gap-2 no-underline">Riprendi <PlayIcon size={16} /></span>
              </Link>
            ) : null}

            <div className="mt-[clamp(30px,4vw,48px)]">
              <span className="section-label">La tua libreria</span>
              <h2 className="font-display serif text-[clamp(1.4rem,2.6vw,2rem)] text-ink mt-1 mb-1">I tuoi corsi</h2>
              <p className="text-ink-2 text-[.97rem] max-w-[58ch]">Hai accesso a tutto. Scegli su cosa allenarti, al tuo ritmo.</p>
            </div>

            {/* Filtri per area */}
            <div className="mt-4 flex flex-wrap gap-2 fade-up">
              {areas.map((a) => (
                <button key={a} onClick={() => setArea(a)} className={`text-[.86rem] font-medium rounded-full px-3.5 py-1.5 border transition-colors ${area === a ? "border-gold/45 bg-gold/[.14] text-gold" : "border-line-2 text-ink-2 hover:text-ink"}`}>{a}</button>
              ))}
            </div>

            {/* Griglia con progresso */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 fade-up">
              {shown.map((c) => (
                <CourseTile key={c.id} course={c} locked={false} to={`/account/corso/${c.id}`} progress={progressOf(c)} fluid />
              ))}
            </div>
          </>
        ) : (
          /* ==================== NON ABBONATO: hero + offerta ==================== */
          <>
            {/* HERO cinematografico */}
            <div
              className="hero-rise relative mt-6 rounded-[18px] overflow-hidden border border-line-2 min-h-[360px] flex items-end"
              style={{ animationDelay: ".2s" }}
            >
              <img src="/img/hero-academy.png" alt="" className="absolute inset-0 w-full h-full object-cover object-right" style={{ WebkitMaskImage: "linear-gradient(90deg, transparent, #000 55%)", maskImage: "linear-gradient(90deg, transparent, #000 55%)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, #14101a 8%, rgba(20,16,26,.72) 46%, transparent 82%)" }} />
              <div className="relative p-[clamp(24px,4vw,44px)] max-w-[620px]">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/[.08] px-3 py-1.5 text-gold text-[11.5px] font-semibold backdrop-blur-sm">
                  <span className="text-gold" aria-hidden>●</span> In arrivo con EA FC 27 · lista founder aperta
                </span>
                <h2 className="font-display serif text-[clamp(2rem,5.2vw,3.4rem)] text-ink leading-[1.04] mt-4 mb-3">
                  Sblocca i corsi e sali in <span className="text-gold">Elite</span>
                </h2>
                <p className="text-ink-2 text-[clamp(1rem,1.5vw,1.15rem)] max-w-[44ch] leading-relaxed">
                  Tutti i corsi video, esercizi da 2-3 minuti. In arrivo con EA FC 27: entra nella lista founder e assicurati il posto prima che si riempia.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <BuyButton>
                    Entra nella lista founder
                  </BuyButton>
                  <Link to={`/account/corso/${freeCourse.id}`} className="btn-secondary no-underline inline-flex items-center gap-2">
                    <PlayIcon size={16} /> Guarda un'anteprima
                  </Link>
                </div>
              </div>
            </div>

            {/* OFFERTA (una sola, Hormozi) — componente condiviso con /academy */}
            <div className="mt-[clamp(26px,4vw,42px)]">
              <AcademyOffer
                comingSoon
                cta={
                  <BuyButton className="btn-primary w-full text-[1.02rem] py-4">
                    Entra nella lista founder
                  </BuyButton>
                }
              />
            </div>

            {/* Prova reale: solo il palmarès di Fabio */}
            <div className="mt-[clamp(28px,4vw,44px)]">
              <AcademyProof />
            </div>

            {/* Cosa sblocchi: i corsi in anteprima bloccata */}
            <div className="mt-[clamp(34px,5vw,56px)]">
              <span className="section-label">Cosa sblocchi</span>
              <h2 className="font-display serif text-[clamp(1.4rem,2.6vw,2rem)] text-ink mt-1 mb-1">7 corsi, un percorso solo</h2>
              <p className="text-ink-2 text-[.97rem] max-w-[58ch]">Il 1° esercizio di ogni area lo provi gratis. Il resto si sblocca con l'offerta.</p>
            </div>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 fade-up">
              {courses.map((c) => (
                <CourseTile key={c.id} course={c} locked={true} to={`/account/corso/${c.id}`} fluid />
              ))}
            </div>

            {/* Chiusura */}
            <div className="text-center mt-[clamp(40px,6vw,64px)] fade-up">
              <h2 className="font-display serif text-[clamp(1.6rem,3.4vw,2.4rem)] text-ink">Pronto a salire in <span className="text-gold">Elite</span>?</h2>
              <div className="mt-5 flex justify-center">
                <BuyButton className="btn-primary text-[1.02rem] px-8 py-4">
                  Entra nella lista founder <ArrowIcon size={17} />
                </BuyButton>
              </div>
              <p className="text-muted text-[.82rem] mt-3">In arrivo con EA FC 27 · prezzo founder per i primi {FOUNDER_TOTAL} · nessun pagamento ora</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
