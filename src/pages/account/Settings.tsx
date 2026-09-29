import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { wrap } from "@/components/academy";
import { AcademyOffer, AcademyProof } from "@/components/AcademyOffer";
import type { MemberContext } from "@/components/MemberLayout";

// PAGINA ACCOUNT / ABBONAMENTO.
// - Non attivo: l'offerta a due piani (mensile/annuale) col checkout Stripe.
// - Attivo: stato dell'abbonamento + gestione.
export default function Settings() {
  const { user, profile, isActive } = useOutletContext<MemberContext>();
  const navigate = useNavigate();
  const planLabel = profile?.plan === "annuale" ? "Annuale · €99/anno" : profile?.plan === "mensile" ? "Mensile · €12,99/mese" : "Attivo";
  const renew = profile?.current_period_end ? new Date(profile.current_period_end).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" }) : null;

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
        <h1 className="font-display serif text-[clamp(1.7rem,3.2vw,2.5rem)] text-ink mt-1 mb-6">{isActive ? "Il tuo abbonamento" : "Sblocca il corso"}</h1>

        {isActive ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="card card--static">
              <span className="section-label">Piano attivo</span>
              <h3 className="text-[1.3rem] mt-1 mb-2 text-ink">{planLabel}</h3>
              <p className="text-ink-2 text-[.95rem] mb-2">Hai accesso completo al corso. Ogni settimana aggiungo nuovi video sul meta.</p>
              {renew && <p className="text-muted text-[.86rem]">Prossimo rinnovo: {renew}</p>}
              <p className="text-muted text-[.86rem] mt-3">Per disdire o cambiare metodo di pagamento gestisci dalla ricevuta Stripe che hai ricevuto via email. Se ti serve una mano, scrivimi.</p>
            </div>
            {accountCard}
          </div>
        ) : (
          <>
            <p className="lead text-ink-2 max-w-[58ch] mb-8">
              La <strong className="text-ink">Difesa è pronta ora</strong> e ogni settimana carico nuovi video sul meta, per tutta la stagione. Scegli il piano e sei dentro.
            </p>

            <AcademyOffer user={user} />

            <div className="mt-[clamp(28px,4vw,44px)]"><AcademyProof /></div>

            <div className="mt-9 max-w-[560px] mx-auto">{accountCard}</div>
          </>
        )}
      </div>
    </section>
  );
}
