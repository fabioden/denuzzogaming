import CountUp from "@/components/reactbits/CountUp";
import Testimonials from "@/components/Testimonials";

// Blocchi "vendita/prova" spostati qui dalla home: numeri veri, testimonianze, come funziona, FAQ.
// Vivono sulla pagina Abbonamento (non più in home, che resta snella).
const STATS = [
  { to: 2, suffix: "×", label: "Campione Italiano" },
  { to: 2, suffix: "×", label: "FIFA eWorld Cup" },
  { to: 300, suffix: "+", label: "Allievi dal 2020" },
];
const STEPS = [
  { t: "Analisi", d: "Capisci dove perdi punti e da dove partire." },
  { t: "Allenamento", d: "Segui le tappe e gli esercizi, settimana dopo settimana." },
  { t: "Elite", d: "Applichi in partita, sali di divisione, arrivi in Elite." },
];
const FAQ = [
  { q: "Posso disdire quando voglio?", a: "Sì, nessun vincolo: gestisci o annulli l'abbonamento in un clic, quando vuoi." },
  { q: "Funziona davvero?", a: "È lo stesso metodo con cui ho vinto due volte il campionato e seguito oltre 300 allievi. Tu fai gli esercizi, i risultati si vedono in campo." },
  { q: "Quanto tempo serve?", a: "Gli esercizi durano 2-3 minuti. Bastano pochi minuti al giorno, senza stravolgere le tue giornate." },
  { q: "Quando apre il PRO?", a: "A ridosso di EA FC 27. Chi entra in lista founder ora blocca il prezzo founder e ha accesso prioritario." },
];

export default function MembershipPitch() {
  return (
    <section className="mt-[clamp(48px,7vw,84px)]">
      <div className="text-center max-w-[640px] mx-auto fade-up">
        <span className="section-label justify-center">Perché vale</span>
        <h2 className="font-display text-[clamp(1.5rem,3.4vw,2.4rem)] text-ink mt-1 mb-3">Impari da chi ha vinto davvero</h2>
        <p className="lead text-ink-2 mx-auto">Due volte campione, oltre 300 allievi. Lo stesso metodo, ora nelle tue mani.</p>
      </div>

      {/* PROVA: numeri veri animati */}
      <div className="mt-8 rounded-[var(--radius-card)] border border-line-2 bg-[#120f0a]/55 px-4 py-5 flex flex-wrap items-center justify-around gap-y-4 text-center fade-up">
        {STATS.map((s) => (
          <div key={s.label} className="px-3 min-w-[28%]">
            <div className="font-display text-[clamp(1.7rem,4vw,2.5rem)] text-ink leading-none flex items-baseline justify-center">
              <CountUp to={s.to} duration={1.6} startOnMount />
              <span className="text-gold ml-0.5 text-[.55em]">{s.suffix}</span>
            </div>
            <div className="text-muted text-[.78rem] tracking-[.1em] uppercase mt-2">{s.label}</div>
          </div>
        ))}
      </div>

      {/* RISULTATI: prova sugli allievi (reale) */}
      <h3 className="font-display text-[clamp(1.2rem,2.2vw,1.5rem)] text-ink text-center mt-[clamp(40px,6vw,64px)] mb-6 fade-up">Loro ci sono arrivati</h3>
      <div className="fade-up"><Testimonials /></div>

      {/* Come funziona */}
      <h3 className="font-display text-[clamp(1.2rem,2.2vw,1.5rem)] text-ink text-center mt-[clamp(40px,6vw,64px)] mb-6 fade-up">Come funziona</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 fade-up">
        {STEPS.map((s, i) => (
          <div key={s.t} className="rounded-[var(--radius-card)] border border-line-2 bg-[#120f0a]/60 p-5">
            <span className="inline-flex w-9 h-9 rounded-full bg-gold text-gold-contrast items-center justify-center font-display text-[1rem]">{i + 1}</span>
            <p className="font-display text-ink text-[1.15rem] mt-3">{s.t}</p>
            <p className="text-ink-2 text-[.95rem] mt-1">{s.d}</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <h3 className="font-display text-[clamp(1.2rem,2.2vw,1.5rem)] text-ink text-center mt-[clamp(40px,6vw,64px)] mb-6 fade-up">Domande frequenti</h3>
      <div className="flex flex-col gap-2.5 max-w-[760px] mx-auto fade-up">
        {FAQ.map((f) => (
          <details key={f.q} className="group rounded-[var(--radius-card)] border border-line-2 bg-[#120f0a]/60 px-5 py-4">
            <summary className="flex items-center justify-between gap-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden text-ink font-medium text-[.98rem]">
              {f.q}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted group-open:rotate-180 transition-transform shrink-0" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
            </summary>
            <p className="text-ink-2 text-[.97rem] mt-3 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
