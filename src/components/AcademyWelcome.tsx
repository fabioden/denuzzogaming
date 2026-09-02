import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { courses } from "@/content/membership";
import { useDashboardData } from "@/hooks/useDashboardData";

// Onboarding cinematografico in 3 passi (stile MasterClass): accoglie, spiega il metodo,
// porta al primo passo. Si apre da solo al primo accesso; riapribile da "Rivedi l'introduzione".
const STEPS = [
  { t: "Guarda", d: "Un video corto, 2-3 minuti. Una cosa alla volta." },
  { t: "Applica", d: "Provi subito quella mossa nella tua prossima partita." },
  { t: "Sali", d: "Esercizio dopo esercizio migliori, fino all'Elite." },
];
const GOALS = [
  "Salire di divisione",
  "Arrivare in Elite Division",
  "Difendere meglio e subire meno gol",
  "Vincere più Weekend League",
];

export default function AcademyWelcome({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const { data, update } = useDashboardData();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<string | null>(null);

  if (!open) return null;

  const firstCourseId = courses[0]?.id;

  function saveGoal() {
    if (!goal) return;
    if (data.goals.some((g) => g.text === goal)) return;
    update({ goals: [...data.goals, { id: Math.random().toString(36).slice(2, 9), text: goal, done: false }] });
  }
  function finish(go: boolean) {
    saveGoal();
    onClose();
    if (go && firstCourseId) navigate(`/account/corso/${firstCourseId}`);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#070509]/92 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Benvenuto nell'Academy">
      <div className="relative w-full max-w-[680px] rounded-[var(--radius-card)] border border-gold/25 bg-[#100d08] overflow-hidden shadow-[0_30px_90px_-20px_rgba(0,0,0,.8)]">
        {/* alone d'oro cinematografico */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: "radial-gradient(80% 60% at 50% -8%, rgba(214,162,26,.20), transparent 60%)" }} />

        <button onClick={() => finish(false)} aria-label="Chiudi" className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full border border-line-2 grid place-items-center text-ink-2 hover:text-gold hover:border-gold/50 transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-[16px] h-[16px]"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>

        {/* progress dots */}
        <div className="relative flex items-center gap-1.5 px-[clamp(22px,4vw,40px)] pt-6">
          {STEPS.map((_, i) => (
            <span key={i} className={`h-1 rounded-full transition-all duration-300 ${i === step ? "w-7 bg-gold" : i < step ? "w-3 bg-gold/50" : "w-3 bg-line-2"}`} />
          ))}
        </div>

        <div key={step} className="hero-rise relative p-[clamp(22px,4vw,40px)] pt-5">
          {step === 0 && (
            <div>
              <img src="/img/fd-mark.png" alt="" className="h-9 w-auto object-contain mb-4 opacity-90" />
              <span className="section-label">Benvenuto</span>
              <h2 className="font-display serif text-[clamp(1.7rem,4vw,2.6rem)] text-ink leading-[1.06] mt-1.5 mb-3">Sei dentro l'Academy di un campione.</h2>
              <p className="text-ink-2 text-[1rem] max-w-[52ch] leading-relaxed">
                Due volte campione italiano, top 4 in Europa, due Mondiali (FIFA eWorld Cup). Ora il mio metodo è tuo. In un minuto ti mostro come funziona.
              </p>
              <div className="flex items-center gap-3 mt-7">
                <button onClick={() => setStep(1)} className="btn-primary">Iniziamo</button>
                <button onClick={() => finish(false)} className="text-muted text-[.9rem] hover:text-ink-2 transition-colors">Salta</button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <span className="section-label">Come funziona</span>
              <h2 className="font-display text-[clamp(1.5rem,3.4vw,2.1rem)] text-ink mt-1.5 mb-5">Tre passi, ogni giorno.</h2>
              <div className="flex flex-col gap-3">
                {STEPS.map((s, i) => (
                  <div key={s.t} className="flex items-start gap-3.5">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-gold text-gold-contrast font-display grid place-items-center">{i + 1}</span>
                    <span>
                      <span className="block font-display text-ink text-[1.1rem]">{s.t}</span>
                      <span className="block text-ink-2 text-[.95rem] mt-0.5">{s.d}</span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-ink-2 text-[.95rem] mt-5 border-l-2 border-gold/50 pl-3 leading-relaxed">
                Ogni giorno c'è una <strong className="text-ink">sfida</strong>: falla e la tua <strong className="text-ink">striscia</strong> sale. Resta costante e sblocchi una <strong className="text-ink">clip-review 1:1 con me</strong>.
              </p>
              <div className="flex items-center gap-3 mt-7">
                <button onClick={() => setStep(0)} className="btn-secondary">Indietro</button>
                <button onClick={() => setStep(2)} className="btn-primary">Avanti</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <span className="section-label">Il tuo primo passo</span>
              <h2 className="font-display text-[clamp(1.5rem,3.4vw,2.1rem)] text-ink mt-1.5 mb-2">Qual è il tuo obiettivo?</h2>
              <p className="text-ink-2 text-[.97rem] mb-4">Scegline uno: lo metto tra i tuoi obiettivi e ti aiuto a tenerlo d'occhio.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                {GOALS.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGoal(g)}
                    className={`text-left rounded-[10px] border px-3.5 py-3 text-[.97rem] transition-colors ${goal === g ? "border-gold bg-gold/[.08] text-ink" : "border-line-2 text-ink-2 hover:border-gold/40 hover:text-ink"}`}
                  >
                    {goal === g && <span className="text-gold mr-1.5" aria-hidden>✓</span>}
                    {g}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button onClick={() => finish(true)} className="btn-primary">Guarda la prima lezione gratis</button>
                <button onClick={() => finish(false)} className="text-muted text-[.9rem] hover:text-ink-2 transition-colors">Esploro da solo</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
