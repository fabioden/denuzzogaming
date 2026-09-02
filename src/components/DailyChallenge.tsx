import { useState } from "react";
import { Link } from "react-router-dom";
import { bumpStreak } from "@/hooks/useDashboardData";
import type { DashboardData } from "@/hooks/useDashboardData";

type Update = (p: Partial<DashboardData>) => void;

// La sfida del giorno: il gancio quotidiano (stile Duolingo). Ruota ogni giorno.
// Si "completa" quando sei attivo oggi: gratificazione immediata + la streak sale.
// Il premio grande (clip-review 1:1 con Fabio) si sblocca con 30 giorni di costanza:
// dato verificabile dall'app, quindi NON falsificabile come sarebbero le vittorie.
const CHALLENGES: { text: string; cta?: string; to?: string }[] = [
  { text: "Guarda l'esercizio di oggi e provalo stasera in partita.", cta: "Vai all'esercizio", to: "resume" },
  { text: "Apri Le Dritte della settimana e scegli una mossa da provare: un giocatore o un SBC.", cta: "Apri Le Dritte", to: "/account/settimana" },
  { text: "Oggi pensa solo alla difesa: resta in posizione, niente uscite a vuoto. Poi torna e segna +1.", to: undefined },
  { text: "Una partita sola, ma concentrata al massimo. Niente fretta: costruisci ogni azione.", to: undefined },
  { text: "Guarda un esercizio nuovo del percorso, anche solo 3 minuti. Un mattone al giorno.", cta: "Vai al percorso", to: "resume" },
];

const PRIZE_DAYS = 30;
const COACHING_WA =
  "https://wa.me/393667142489?text=" +
  encodeURIComponent("Ciao Fabio, ho sbloccato la clip-review 1:1 con 30 giorni di costanza. Voglio prenotarla.");

export default function DailyChallenge({
  data,
  update,
  resumeCourseId,
}: {
  data: DashboardData;
  update: Update;
  resumeCourseId?: string;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const doneToday = data.streak?.lastDay === today;
  const streak = data.streak?.count || 0;
  const [justDone, setJustDone] = useState(false);

  // Sfida deterministica per il giorno: stessa per tutti, cambia ogni giorno.
  const dayIndex = Math.floor(new Date(today).getTime() / 86400000);
  const ch = CHALLENGES[dayIndex % CHALLENGES.length];
  const to = ch.to === "resume" ? (resumeCourseId ? `/account/corso/${resumeCourseId}` : "/account/allenamenti") : ch.to;

  const prizeReached = streak >= PRIZE_DAYS;
  const prizePct = Math.min(100, Math.round((streak / PRIZE_DAYS) * 100));

  function markDone() {
    update({ streak: bumpStreak(data.streak) });
    setJustDone(true);
  }

  return (
    <div className="relative rounded-[var(--radius-card)] border border-gold/35 bg-gradient-to-br from-gold/[.10] to-transparent p-5 sm:p-6">
      {justDone && (
        <span className="reward-float pointer-events-none absolute top-3 right-5 text-gold font-display text-[1.05rem] font-bold" aria-hidden="true">+1 giorno</span>
      )}
      <span className="section-label block mb-4">Sfida di oggi</span>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-5 items-stretch">
        {/* la sfida */}
        <div className="flex flex-col">
          {doneToday ? (
            <>
              <p className="font-display text-ink text-[1.25rem]">{justDone ? "Grande! +1 giorno." : "Sfida di oggi completata."}</p>
              <p className="text-ink-2 text-[.97rem] mt-1.5 max-w-[46ch]">Sei stato costante oggi. La prossima sfida arriva domani: torna a non perdere la striscia.</p>
              <span className="mt-auto pt-4 inline-flex w-fit items-center gap-2 rounded-[8px] border border-gold/40 bg-gold/[.08] text-gold px-4 py-2 text-[.9rem] font-semibold">
                <span aria-hidden>✓</span> Fatto per oggi
              </span>
            </>
          ) : (
            <>
              <span className="text-gold text-[.78rem] font-bold uppercase tracking-[.12em] mb-1.5">Oggi tocca a te</span>
              <p className="text-ink text-[1.15rem] leading-snug max-w-[46ch]">{ch.text}</p>
              <div className="flex flex-wrap items-center gap-3 mt-auto pt-4">
                <button onClick={markDone} className="btn-primary inline-flex items-center gap-2">
                  <span aria-hidden>✓</span> Fatto, +1 giorno
                </button>
                {to && ch.cta && (
                  <Link to={to} className="btn-secondary inline-flex no-underline">
                    {ch.cta}
                  </Link>
                )}
              </div>
            </>
          )}
        </div>

        {/* streak: il numero protagonista, riempie lo spazio a destra */}
        <div className="sm:w-[168px] rounded-[14px] border border-gold/25 bg-[#15110a]/70 grid place-items-center text-center p-4">
          <div className={justDone ? "reward-pop" : ""}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mx-auto text-gold" aria-hidden="true">
              <path d="M12 2c1 3-1 4-1 6a3 3 0 0 0 6 0c0-1 0-2-.5-3 2 2 3.5 4.5 3.5 7a8 8 0 1 1-16 0c0-3 2-6 5-8-.5 2 0 3 1 3 .8 0 1-.7 1-1.5C11.5 5 11 3.5 12 2z" />
            </svg>
            <span className="block font-display text-gold text-[2.6rem] leading-none mt-1.5 tabular-nums">{streak}</span>
            <span className="block text-ink-2 text-[.86rem] mt-1">{streak === 1 ? "giorno" : "giorni"} di fila</span>
          </div>
        </div>
      </div>

      {/* Verso il premio: barra più presente, con il traguardo in fondo */}
      <div className="mt-5 pt-4 border-t border-gold/15">
        {prizeReached ? (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <p className="text-ink text-[.97rem]">
              <span aria-hidden>🏆</span> <strong className="text-gold">Premio sbloccato:</strong> clip-review 1:1 con Fabio. Te la sei guadagnata.
            </p>
            <a href={COACHING_WA} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex shrink-0 no-underline">
              Prenota la clip-review
            </a>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-3 mb-2">
              <p className="text-ink-2 text-[.92rem]">
                Verso il premio: <strong className="text-ink">clip-review 1:1 con Fabio</strong>
              </p>
              <span className="text-gold font-display text-[.95rem] shrink-0 tabular-nums">{streak}/{PRIZE_DAYS}</span>
            </div>
            <div className="relative h-2.5 rounded-full bg-line-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-gold/70 to-gold transition-[width] duration-500" style={{ width: `${prizePct}%` }} />
            </div>
            <p className="text-muted text-[.82rem] mt-1.5">Ancora {PRIZE_DAYS - streak} {PRIZE_DAYS - streak === 1 ? "giorno" : "giorni"} di costanza e la sblocchi.</p>
          </>
        )}
      </div>
    </div>
  );
}
