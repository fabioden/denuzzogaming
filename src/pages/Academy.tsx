import { Link } from "react-router-dom";
import { courses } from "@/content/membership";
import { CourseTile, ArrowIcon } from "@/components/academy";
import { AcademyOffer, AcademyProof, FOUNDER_TOTAL } from "@/components/AcademyOffer";
import Seo from "@/components/Seo";

// PAGINA DI VENDITA PUBBLICA dell'Academy (cornice marketing, per i NON loggati).
// Mostra l'offerta + il catalogo corsi bloccato + la prova. Ogni CTA porta a registrarsi.
const wrap = "max-w-[1100px] mx-auto px-[clamp(20px,5vw,56px)]";

export default function Academy() {
  return (
    <>
      <Seo
        title="Academy EA FC — i corsi video di Fabio Denuzzo | Denuzzo Gaming"
        description="Sblocca tutti i corsi video di Fabio Denuzzo, 2× Campione Italiano EA FC: esercizi brevi e concreti per salire di divisione e arrivare in Elite. Prezzo fondatore."
        path="/academy"
      />

      {/* HERO */}
      <header className={`${wrap} pt-[clamp(120px,18vh,190px)] pb-[clamp(30px,5vh,56px)]`}>
        <div className="relative rounded-[18px] overflow-hidden border border-line-2 min-h-[clamp(320px,44vh,420px)] flex items-end">
          <img src="/img/hero-academy.png" alt="" className="absolute inset-0 w-full h-full object-cover object-right" style={{ WebkitMaskImage: "linear-gradient(90deg, transparent, #000 55%)", maskImage: "linear-gradient(90deg, transparent, #000 55%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, #14101a 8%, rgba(20,16,26,.72) 46%, transparent 82%)" }} />
          <div className="relative p-[clamp(24px,4vw,48px)] max-w-[640px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/[.08] px-3 py-1.5 text-gold text-[11.5px] font-semibold backdrop-blur-sm">
              <span className="text-gold" aria-hidden>●</span> In arrivo con EA FC 27 · lista founder aperta
            </span>
            <h1 className="font-display serif text-[clamp(2.2rem,5.6vw,3.6rem)] text-ink leading-[1.04] mt-4 mb-3">
              Sblocca i corsi e sali in <span className="text-gold">Elite</span>
            </h1>
            <p className="text-ink-2 text-[clamp(1rem,1.5vw,1.18rem)] max-w-[46ch] leading-relaxed">
              Tutti i corsi video di Fabio, esercizi da 2-3 minuti. In arrivo con EA FC 27: entra ora nella lista founder e assicurati il posto, prima che si riempia.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link to="/login" className="btn-primary no-underline inline-flex items-center gap-2">Entra nella lista founder</Link>
              <Link to="/login" className="btn-secondary no-underline inline-flex items-center gap-2">Ho già un account · Accedi</Link>
            </div>
          </div>
        </div>
      </header>

      {/* OFFERTA */}
      <section className={`${wrap} pb-[clamp(20px,4vh,40px)]`}>
        <AcademyOffer
          comingSoon
          cta={
            <Link to="/login" className="btn-primary w-full no-underline inline-flex items-center justify-center gap-2 text-[1.02rem] py-4">
              Entra nella lista founder
            </Link>
          }
        />
        <p className="text-center text-muted text-[.82rem] mt-3">Registrati gratis e blocchi il prezzo founder. I corsi arrivano con EA FC 27: nessun pagamento ora.</p>
      </section>

      {/* PROVA */}
      <section className={`${wrap} py-[clamp(24px,4vh,44px)]`}>
        <AcademyProof />
      </section>

      {/* CATALOGO (bloccato: si vedono i titoli, non i video) */}
      <section className={`${wrap} py-[clamp(24px,4vh,44px)]`}>
        <div className="text-center mb-[clamp(24px,4vh,40px)]">
          <span className="section-label justify-center">Cosa sblocchi</span>
          <h2 className="font-display serif text-[clamp(1.6rem,3.4vw,2.4rem)] text-ink mt-1">7 corsi, un percorso solo</h2>
          <p className="text-ink-2 text-[.97rem] max-w-[54ch] mx-auto mt-2">Dalla costruzione della rosa alla testa da campione. Il 1° esercizio di ogni area lo provi gratis.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 fade-up">
          {courses.map((c) => (
            <CourseTile key={c.id} course={c} locked={true} to="/login" fluid />
          ))}
        </div>
      </section>

      {/* CHIUSURA */}
      <section className="py-[clamp(48px,8vh,100px)] text-center">
        <div className="gold-sep mb-[clamp(40px,7vh,90px)]" />
        <div className={wrap}>
          <h2 className="font-display serif text-[clamp(2rem,5vw,3.2rem)] text-ink">Pronto a salire in <span className="text-gold">Elite</span>?</h2>
          <div className="mt-6 flex justify-center">
            <Link to="/login" className="btn-primary no-underline inline-flex items-center gap-2 text-[1.02rem] px-8 py-4">Entra nella lista founder <ArrowIcon size={17} /></Link>
          </div>
          <p className="text-muted text-[.82rem] mt-3">In arrivo con EA FC 27 · prezzo founder per i primi {FOUNDER_TOTAL} · nessun pagamento ora</p>
        </div>
      </section>
    </>
  );
}
