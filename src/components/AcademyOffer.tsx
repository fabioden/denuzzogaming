import type { ReactNode } from "react";

// Offerta unica dell'Academy (metodo Hormozi), riusata da:
//  - la pagina di vendita pubblica (/academy) per i non loggati
//  - l'area membri (Home) per gli utenti free
// Il bottone (cta) cambia in base al contesto: "Inizia gratis" fuori, "Sblocca" dentro.

// Valori indicativi: Fabio li conferma prima del lancio.
export const FOUNDER_TAKEN = 37;
export const FOUNDER_TOTAL = 50;

export const STACK: { t: string; v: string; bonus?: boolean }[] = [
  { t: "7 corsi video completi (17 esercizi)", v: "€149" },
  { t: "Le Dritte: il meta ogni settimana, tutta la stagione", v: "€60" },
  { t: "30% di sconto sul coaching 1:1", v: "€60" },
  { t: "Community WhatsApp privata degli allievi", v: "€40" },
  { t: "Clip-review 1:1 di una tua partita", v: "€50", bonus: true },
];

// Palmarès reale di Fabio (titoli SUOI da giocatore) = l'unica prova, niente testimonianze finte.
export const PROOF = ["2× Campione Italiano", "Top 4 Europa", "2× FIFA eWorld Cup", "300+ allievi dal 2020"];

export function CheckIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
export function ShieldIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function AcademyOffer({ cta, comingSoon }: { cta: ReactNode; comingSoon?: boolean }) {
  const seatsPct = Math.min(100, Math.round((FOUNDER_TAKEN / FOUNDER_TOTAL) * 100));
  return (
    <div className="relative mx-auto max-w-[560px] rounded-[16px] border border-line-2 bg-gradient-to-b from-[#1b1721] to-[#131017] p-[clamp(22px,4vw,32px)] shadow-[0_30px_70px_-34px_rgba(0,0,0,.85)] fade-up">
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center px-4 py-1 rounded-full bg-gold text-gold-contrast text-[11px] font-bold uppercase tracking-[.1em] whitespace-nowrap">
        Offerta fondatore · primi {FOUNDER_TOTAL}
      </span>

      {comingSoon && (
        <p className="text-center text-gold text-[12px] font-semibold tracking-[.1em] uppercase mt-1 mb-1">In arrivo con EA FC 27</p>
      )}
      {comingSoon ? (
        <>
          <h3 className="text-center font-display serif text-ink font-bold text-[clamp(1.5rem,4vw,2rem)] mt-2 leading-tight">Accesso founder all'Academy</h3>
          <p className="text-center text-ink-2 text-[.9rem] mt-2 leading-relaxed max-w-[42ch] mx-auto">I primi {FOUNDER_TOTAL} entrano da founder: sei tra i primissimi ad avere i corsi appena escono, a condizioni riservate.</p>
        </>
      ) : (
        <>
          <div className="flex items-baseline justify-center gap-2.5 mt-1">
            <span className="text-muted line-through text-[18px]">359€</span>
            <span className="font-display serif text-ink font-bold leading-none text-[clamp(3rem,9vw,4rem)]">29</span>
            <span className="text-gold text-[24px] font-bold self-start mt-1.5">€</span>
          </div>
          <p className="text-center text-ink-2 text-[.86rem] mt-1.5">una volta sola · tutta la stagione EA FC 27</p>
          <p className="text-center text-ink-2 text-[.82rem] mt-2 leading-relaxed">
            Il coaching 1:1 con Fabio è <strong className="text-ink">€30/ora</strong>. Qui hai <strong className="text-ink">7 corsi + tutto</strong>, a 29€ una volta.
          </p>
        </>
      )}

      <ul className="flex flex-col mt-5">
        {STACK.map((s) => (
          <li key={s.t} className="flex items-start gap-3 py-2 text-[.94rem] text-ink">
            <span className="text-gold mt-0.5 shrink-0"><CheckIcon size={18} /></span>
            <span className="flex-1">{s.bonus && <strong className="text-gold">Bonus:&nbsp;</strong>}{s.t}</span>
            {!comingSoon && <span className="text-muted text-[.8rem] self-center whitespace-nowrap">{s.v}</span>}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3 mt-4 rounded-[11px] border border-gold/30 bg-gold/[.07] px-4 py-3">
        <span className="text-gold shrink-0"><ShieldIcon size={26} /></span>
        <p className="text-[.86rem] text-ink"><strong className="text-gold">Sali o continui gratis.</strong> Se segui il percorso e non sali di divisione, tieni l'accesso finché non ci arrivi.</p>
      </div>

      {/* Scarsità visibile */}
      <div className="mt-5">
        <div className="h-[9px] rounded-full bg-line-2 overflow-hidden">
          <span className="block h-full rounded-full bg-gradient-to-r from-gold to-gold-light" style={{ width: `${seatsPct}%` }} />
        </div>
        <div className="flex items-center justify-between mt-2 text-[.78rem] text-ink-2">
          <span>{comingSoon ? "Posti founder" : "Prezzo fondatore, poi 59€"}</span>
          <strong className="text-gold tabular-nums">{FOUNDER_TAKEN} / {FOUNDER_TOTAL} posti presi</strong>
        </div>
      </div>

      <div className="mt-4">{cta}</div>

      {/* Fiducia al punto di decisione */}
      {comingSoon ? (
        <p className="text-center text-[.72rem] text-muted mt-3.5">Nessun pagamento ora · blocchi solo il prezzo founder · niente carta richiesta</p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-3.5 text-[.72rem] text-muted">
          <span className="inline-flex items-center gap-1.5 text-gold"><ShieldIcon size={14} /> <span className="text-muted">Pagamento sicuro Stripe</span></span>
          <span className="inline-flex items-center gap-1"><b className="bg-[#efeae0] text-[#1a1a1a] rounded-[3px] text-[9px] font-extrabold px-1.5 py-0.5">VISA</b><b className="bg-[#efeae0] text-[#1a1a1a] rounded-[3px] text-[9px] font-extrabold px-1.5 py-0.5">MC</b><b className="bg-[#efeae0] text-[#1a1a1a] rounded-[3px] text-[9px] font-extrabold px-1.5 py-0.5">Pay</b></span>
          <span>Annulla quando vuoi</span>
        </div>
      )}
    </div>
  );
}

// Striscia prova (palmarès reale). Riusata da entrambe le pagine.
export function AcademyProof() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 fade-up">
      {PROOF.map((p) => (
        <span key={p} className="inline-flex items-center gap-1.5 text-[.84rem] text-ink-2 bg-[#0f0c08] border border-gold/25 px-3 py-1.5 rounded-full">
          <span className="text-gold text-[.7rem]" aria-hidden>●</span>{p}
        </span>
      ))}
    </div>
  );
}
