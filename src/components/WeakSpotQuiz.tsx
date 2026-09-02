import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Diagnosi guidata: l'utente dice dove fatica, noi lo mandiamo all'esercizio gratis dell'area giusta.
type AreaKey = "difesa" | "attacco" | "squadra" | "mentalita";

const AREAS: Record<AreaKey, { label: string; courseId: string; blurb: string }> = {
  difesa: { label: "Difesa", courseId: "difesa", blurb: "Prendi gol evitabili: è lì che perdi i punti." },
  attacco: { label: "Attacco", courseId: "attacco", blurb: "Crei ma non concretizzi: il problema è in zona gol." },
  squadra: { label: "Costruzione squadra", courseId: "squadra-meta", blurb: "La rosa non gira: moduli, chimica e PlayStyle da sistemare." },
  mentalita: { label: "Testa da campione", courseId: "pressione", blurb: "Sotto pressione crolli: la testa decide le partite." },
};

const QUESTIONS: { q: string; options: { t: string; a: AreaKey }[] }[] = [
  {
    q: "Quando perdi, di solito è perché...",
    options: [
      { t: "Prendo gol evitabili", a: "difesa" },
      { t: "Non riesco a segnare", a: "attacco" },
      { t: "La squadra non gira", a: "squadra" },
      { t: "Crollo nel finale", a: "mentalita" },
    ],
  },
  {
    q: "Cosa ti frustra di più in partita?",
    options: [
      { t: "Contropiedi e palle inattive subite", a: "difesa" },
      { t: "Tiri sbagliati a porta quasi vuota", a: "attacco" },
      { t: "Giocatori sempre fuori posizione", a: "squadra" },
      { t: "Sbrocco dopo un gol subito", a: "mentalita" },
    ],
  },
  {
    q: "Su cosa vuoi migliorare per primo?",
    options: [
      { t: "Difendere senza scoprirmi", a: "difesa" },
      { t: "Finalizzare freddo", a: "attacco" },
      { t: "Costruire la rosa giusta", a: "squadra" },
      { t: "Tenere la testa nei momenti chiave", a: "mentalita" },
    ],
  },
];

export default function WeakSpotQuiz({ onResult }: { onResult?: (area: string) => void } = {}) {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const done = step >= QUESTIONS.length;

  function pick(a: AreaKey) {
    setScores((s) => ({ ...s, [a]: (s[a] || 0) + 1 }));
    setStep((s) => s + 1);
  }
  function reset() {
    setScores({});
    setStep(0);
  }

  const winner = (Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] as AreaKey) || "difesa";
  const area = AREAS[winner];

  useEffect(() => {
    if (done && onResult) onResult(winner);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  return (
    <div className="rounded-[var(--radius-card)] border border-line-2 bg-[#120f0a]/60 p-5 sm:p-6">
      <span className="section-label">Trova il tuo punto debole</span>

      {!done ? (
        <>
          <div className="flex items-center gap-2 mt-3 mb-4">
            {QUESTIONS.map((_, i) => (
              <span key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-gold" : "bg-line-2"}`} />
            ))}
          </div>
          <h3 className="font-display text-ink text-[clamp(1.1rem,2.2vw,1.4rem)] mb-4">{QUESTIONS[step].q}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {QUESTIONS[step].options.map((o) => (
              <button
                key={o.t}
                onClick={() => pick(o.a)}
                className="text-left rounded-[10px] border border-line-2 bg-[#181510] hover:border-gold/45 hover:bg-[#1e1813] transition-colors px-4 py-3 text-ink-2 hover:text-ink text-[.97rem]"
              >
                {o.t}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-3">
          <p className="text-muted text-[.9rem]">Il tuo punto debole è</p>
          <h3 className="font-display text-gold text-[clamp(1.4rem,3vw,2rem)] mb-2">{area.label}</h3>
          <p className="text-ink-2 text-[.95rem] max-w-[52ch] mb-5">{area.blurb} Parti dall'esercizio gratuito di quest'area.</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link to={`/account/corso/${area.courseId}`} className="btn-primary inline-flex no-underline">Guarda l'esercizio gratis</Link>
            <button onClick={reset} className="text-ink-2 underline text-[.93rem] hover:text-gold transition-colors">Rifai il test</button>
          </div>
        </div>
      )}
    </div>
  );
}
