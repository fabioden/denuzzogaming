import { Link } from "react-router-dom";
import { wrap } from "@/components/academy";
import Testimonials from "@/components/Testimonials";

const COACHING_WA = "https://wa.me/393667142489?text=" + encodeURIComponent("Ciao Fabio, voglio candidarmi alla Strada per l'Elite (coaching seguito)");
const eliteSteps = ["Analisi", "Mese 1 · Fondamenta", "Mese 2 · Attacco + WL", "Mese 3 · Scalata", "Mese 4 · Elite"];

export default function Coaching() {
  return (
    <section className="pt-[clamp(24px,4vw,44px)] pb-[clamp(60px,10vh,120px)]">
      <div className={wrap}>
        <span className="section-label hero-rise block" style={{ animationDelay: ".05s" }}>Coaching seguito 1:1</span>
        <h1 className="hero-rise font-display serif text-[clamp(1.8rem,3.4vw,2.7rem)] text-ink mt-1 mb-3" style={{ animationDelay: ".16s" }}>Strada per l'Elite</h1>
        <p className="hero-rise lead text-ink-2 max-w-[62ch] mb-4" style={{ animationDelay: ".27s" }}>
          Ti seguo personalmente per 3-4 mesi fino in Elite Division. Ogni settimana mandi le clip, ti do il focus su
          WhatsApp. Non compri ore: compri il risultato, con me dietro.
        </p>

        {/* La differenza che confonde tutti, detta chiara */}
        <p className="hero-rise text-ink-2 text-[.97rem] max-w-[62ch] mb-7 border-l-2 border-gold/50 pl-3" style={{ animationDelay: ".33s" }}>
          <strong className="text-ink">In cosa è diverso dagli Allenamenti?</strong> Negli Allenamenti impari da solo, coi video, al tuo ritmo. Qui invece c'è <strong className="text-ink">Fabio dietro di te</strong>: guarda le tue partite e ti corregge fino a portarti in Elite. È il livello più alto, "fatto insieme".
        </p>

        {/* le tappe */}
        <div className="hero-rise flex flex-wrap items-center gap-2 mb-8" style={{ animationDelay: ".38s" }}>
          {eliteSteps.map((s, i) => (
            <span key={s} className="inline-flex items-center gap-2">
              {i > 0 && <span className="text-muted text-[.86rem]">→</span>}
              <span className="text-[.88rem] text-ink-2 bg-card border border-line-2 px-3 py-1.5 rounded-full">{s}</span>
            </span>
          ))}
        </div>

        {/* punti di valore */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8 fade-up">
          <div className="card card--static">
            <p className="text-ink text-[1rem] font-medium mb-1">Seguito ogni settimana</p>
            <p className="text-ink-2 text-[.93rem]">Clip analizzate e focus diretto su WhatsApp.</p>
          </div>
          <div className="card card--static">
            <p className="text-ink text-[1rem] font-medium mb-1">Garanzia sul risultato</p>
            <p className="text-ink-2 text-[.93rem]">Fai il lavoro e non sali? Continuo gratis.</p>
          </div>
          <div className="card card--static">
            <p className="text-ink text-[1rem] font-medium mb-1">Posti limitati</p>
            <p className="text-ink-2 text-[.93rem]">Seguo poche persone per ciclo. Su candidatura.</p>
          </div>
        </div>

        {/* Prova reale: un allievo seguito (la testimonianza va proprio dove si converte di più) */}
        <div className="mb-9 fade-up">
          <span className="section-label block mb-4">Chi l'ha fatto con me</span>
          <Testimonials />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a href={COACHING_WA} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 no-underline">
            Candidati ora
          </a>
          <span className="text-muted text-[.9rem]">Percorso premium su candidatura · 3 domande, pochi posti per ciclo</span>
        </div>
        <p className="text-muted text-[.88rem] mt-3">
          Hai <Link to="/account/abbonamento" className="text-ink-2 hover:text-gold no-underline">Elite Player</Link>? Il coaching è scontato del 30%.
        </p>
      </div>
    </section>
  );
}
