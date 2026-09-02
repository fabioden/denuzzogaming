import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { wrap } from "@/components/academy";
import { AcademyOffer, AcademyProof } from "@/components/AcademyOffer";
import type { MemberContext } from "@/components/MemberLayout";

// PAGINA ACCOUNT / LISTA FOUNDER.
// Finché i corsi non sono pronti: nessun prezzo, nessun piano. Solo "entra nella lista founder".
// joinWaitlist() segna l'utente come founder su Supabase (plan = "pro_waitlist").
export default function Settings() {
  const { user, profile, isActive, setProfile } = useOutletContext<MemberContext>();
  const [joining, setJoining] = useState(false);
  const navigate = useNavigate();
  const inWaitlist = profile?.plan === "pro_waitlist";

  async function joinWaitlist() {
    setJoining(true);
    const { error } = await supabase.from("profiles").update({ plan: "pro_waitlist" }).eq("id", user.id);
    if (!error) {
      setProfile((p) => (p ? { ...p, plan: "pro_waitlist" } : { subscription_status: "free", plan: "pro_waitlist", current_period_end: null }));
    }
    setJoining(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  const accountCard = (
    <div className="card card--static">
      <span className="section-label">Account</span>
      <p className="text-ink text-[.95rem] mt-1 mb-1">{user.email}</p>
      <p className="text-ink-2 text-[.9rem] mb-4">
        Vuoi essere seguito fino in Elite? <Link to="/account/coaching" className="text-gold">Scopri la Strada per l'Elite →</Link>
      </p>
      <button onClick={logout} className="text-ink-2 underline text-[.95rem]">Esci</button>
    </div>
  );

  return (
    <section className="pt-[clamp(24px,4vw,44px)] pb-[clamp(60px,10vh,120px)]">
      <div className={wrap}>
        <span className="section-label">Il tuo account</span>
        <h1 className="font-display serif text-[clamp(1.7rem,3.2vw,2.5rem)] text-ink mt-1 mb-6">{isActive ? "Accesso completo" : "Entra nella lista founder"}</h1>

        {isActive ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="card card--static">
              <span className="section-label">Piano</span>
              <h3 className="text-[1.3rem] mt-1 mb-2 text-ink">Sei un founder</h3>
              <p className="text-ink-2 text-[.95rem] mb-4">Hai accesso completo all'Academy. I nuovi corsi si aggiungono man mano che escono.</p>
            </div>
            {accountCard}
          </div>
        ) : (
          <>
            <p className="lead text-ink-2 max-w-[58ch] mb-8">
              I corsi arrivano con <strong className="text-ink">EA FC 27</strong>. Entra nella lista founder: sei tra i primi ad averli appena escono, a condizioni riservate. <strong className="text-ink">Nessun pagamento ora.</strong>
            </p>

            <AcademyOffer
              comingSoon
              cta={
                inWaitlist ? (
                  <div className="w-full rounded-[var(--radius-card)] border border-gold/30 bg-gold/[.06] px-5 py-4 flex items-center gap-3">
                    <span className="text-gold shrink-0" aria-hidden>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    </span>
                    <p className="text-ink-2 text-[.92rem]">
                      Sei nella <strong className="text-ink">lista founder</strong>. Ti avviso appena escono i corsi, con accesso prioritario.
                    </p>
                  </div>
                ) : (
                  <button onClick={joinWaitlist} disabled={joining} className="btn-primary w-full text-[1.02rem] py-4">
                    {joining ? "Attendi…" : "Entra nella lista founder"}
                  </button>
                )
              }
            />

            <div className="mt-[clamp(28px,4vw,44px)]"><AcademyProof /></div>

            <div className="mt-9 max-w-[560px] mx-auto">{accountCard}</div>
          </>
        )}
      </div>
    </section>
  );
}
