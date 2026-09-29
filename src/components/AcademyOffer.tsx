import { Link } from "react-router-dom";
import { CHECKOUT, PRICING, checkoutUrl } from "@/lib/checkout";

// Offerta dell'Academy (acquisto vero, due piani), riusata da:
//  - la pagina di vendita pubblica (/academy) per i non loggati -> i bottoni portano a registrarsi
//  - l'area membri (Home, /account/abbonamento) per gli utenti free -> i bottoni portano al checkout Stripe
// L'utente loggato lo passiamo come prop `user`: serve ad agganciare il pagamento all'account.

type BuyUser = { id?: string; email?: string | null } | null | undefined;

// Cosa ottieni davvero. Onesto: la Difesa è pronta ora, il resto arriva ogni settimana.
export const STACK: { t: string }[] = [
  { t: "Corso Difesa completo: 8 video, dalla teoria al pressing — disponibile ora" },
  { t: "Intro + le impostazioni di gioco che uso io" },
  { t: "Nuovi video ogni settimana sul meta, per tutta la stagione EA FC 27" },
  { t: "Video protetti: li vedi solo qui, sempre, finché sei iscritto" },
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

// Una card piano. Loggato -> link Stripe con aggancio account; non loggato -> registrati prima.
function PlanCard({ base, user, tier, price, period, hint, recommended, badge }: {
  base: string; user: BuyUser; tier: string; price: string; period: string; hint: string; recommended?: boolean; badge?: string;
}) {
  const btnCls = recommended ? "btn-primary" : "btn-secondary";
  const href = user?.id ? checkoutUrl(base, user) : "";
  return (
    <div className={`relative rounded-[13px] border p-4 flex flex-col ${recommended ? "border-gold/60 bg-gold/[.06]" : "border-line-2 bg-black/20"}`}>
      {badge && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap inline-flex items-center px-2.5 py-0.5 rounded-full bg-gold text-gold-contrast text-[10px] font-bold uppercase tracking-[.08em]">{badge}</span>
      )}
      <span className="text-ink-2 text-[.86rem] font-medium uppercase tracking-[.08em] mt-1">{tier}</span>
      <div className="flex items-baseline gap-1 mt-1.5">
        <span className="font-display serif text-ink font-bold leading-none text-[clamp(2rem,6vw,2.6rem)]">{price}</span>
        <span className="text-ink-2 text-[.9rem]">{period}</span>
      </div>
      <span className="text-muted text-[.82rem] mt-1 mb-4">{hint}</span>
      {user?.id ? (
        <a href={href} className={`${btnCls} no-underline w-full text-center mt-auto`}>Abbonati</a>
      ) : (
        <Link to="/login" className={`${btnCls} no-underline w-full text-center mt-auto inline-block`}>Abbonati</Link>
      )}
    </div>
  );
}

export function AcademyOffer({ user }: { user?: BuyUser }) {
  return (
    <div className="relative mx-auto max-w-[620px] rounded-[16px] border border-line-2 bg-gradient-to-b from-[#1b1721] to-[#131017] p-[clamp(22px,4vw,32px)] shadow-[0_30px_70px_-34px_rgba(0,0,0,.85)] fade-up">
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center px-4 py-1 rounded-full bg-gold text-gold-contrast text-[11px] font-bold uppercase tracking-[.1em] whitespace-nowrap">
        Il Corso di Fabio
      </span>

      <h3 className="text-center font-display serif text-ink font-bold text-[clamp(1.5rem,4vw,2rem)] mt-2 leading-tight">Sblocca tutto il corso</h3>
      <p className="text-center text-ink-2 text-[.92rem] mt-2 leading-relaxed max-w-[46ch] mx-auto">
        La <strong className="text-ink">Difesa è pronta ora</strong>. E ogni settimana carico nuovi video sul meta, per tutta la stagione.
      </p>

      {/* I DUE PIANI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
        <PlanCard
          base={CHECKOUT.mensile}
          user={user}
          tier="Mensile"
          price={PRICING.mensile.price}
          period={PRICING.mensile.period}
          hint="Annulla quando vuoi"
        />
        <PlanCard
          base={CHECKOUT.annuale}
          user={user}
          tier="Annuale"
          price={PRICING.annuale.price}
          period={PRICING.annuale.period}
          hint="Il migliore per la stagione"
          recommended
          badge="≈ 2 mesi gratis"
        />
      </div>

      {/* COSA OTTIENI */}
      <ul className="flex flex-col mt-6">
        {STACK.map((s) => (
          <li key={s.t} className="flex items-start gap-3 py-2 text-[.94rem] text-ink">
            <span className="text-gold mt-0.5 shrink-0"><CheckIcon size={18} /></span>
            <span className="flex-1">{s.t}</span>
          </li>
        ))}
      </ul>

      {/* Fiducia al punto di decisione */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-5 text-[.72rem] text-muted">
        <span className="inline-flex items-center gap-1.5"><span className="text-gold"><ShieldIcon size={14} /></span> Pagamento sicuro Stripe</span>
        <span>Annulla quando vuoi</span>
        <span>Disdici = niente più addebiti</span>
      </div>
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
