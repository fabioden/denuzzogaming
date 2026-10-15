import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { wrap } from "@/components/academy";
import { supabase } from "@/lib/supabaseClient";
import Testimonials from "@/components/Testimonials";
import AvailabilityView from "@/components/AvailabilityView";
import type { MemberContext } from "@/components/MemberLayout";

const eliteSteps = ["Analisi", "Mese 1 · Fondamenta", "Mese 2 · Attacco + WL", "Mese 3 · Scalata", "Mese 4 · Elite"];

// Endpoint del Worker (dichiarazione ore già fatte dei clienti vecchi).
const WORKER_URL = "https://denuzzo-stripe-webhook.business-fabiodenuzzo.workers.dev";
const CAL_URL = "https://cal.com/fabio-denuzzo-be6jqr/coachin-1vs1";
const WHATSAPP_URL = "https://wa.me/393667142489?text=" + encodeURIComponent("Ciao Fabio! Ho acquistato il coaching 1:1. Ti scrivo per iniziare: ti confermo che ho prenotato la sessione.");

type Credits = { hours_total: number; hours_used: number; pending: boolean };

export default function Coaching() {
  const { user } = useOutletContext<MemberContext>();
  const email = (user?.email || "").toLowerCase();

  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [declDone, setDeclDone] = useState(0);
  const [declaring, setDeclaring] = useState(false);
  const [declMsg, setDeclMsg] = useState("");

  useEffect(() => {
    (async () => {
      if (!email) { setLoading(false); return; }
      const { data } = await supabase.from("coaching_credits").select("hours_total,hours_used,pending").eq("email", email).maybeSingle();
      setCredits((data as Credits) ?? null);
      setLoading(false);
    })();
  }, [email]);

  const remaining = credits ? Math.max(0, credits.hours_total - credits.hours_used) : 0;
  const canBook = !!credits && !credits.pending && remaining > 0;

  async function submitDeclare() {
    if (!credits) return;
    setDeclaring(true); setDeclMsg("");
    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess.session?.access_token;
      const res = await fetch(`${WORKER_URL}/declare`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ done: declDone }),
      });
      const j = await res.json();
      if (res.ok) {
        setCredits({ ...credits, pending: false, hours_used: credits.hours_total - j.remaining });
      } else if (j.error === "gia dichiarato") {
        setCredits({ ...credits, pending: false, hours_used: credits.hours_total - (j.remaining ?? 0) });
      } else {
        setDeclMsg("Qualcosa non ha funzionato, riprova.");
      }
    } catch {
      setDeclMsg("Errore di rete, riprova.");
    }
    setDeclaring(false);
  }

  return (
    <section className="pt-[clamp(24px,4vw,44px)] pb-[clamp(60px,10vh,120px)]">
      <div className={wrap}>
        <span className="section-label hero-rise block" style={{ animationDelay: ".05s" }}>Coaching seguito 1:1</span>
        <h1 className="hero-rise font-display serif text-[clamp(1.8rem,3.4vw,2.7rem)] text-ink mt-1 mb-3" style={{ animationDelay: ".16s" }}>Strada per l'Elite</h1>
        <p className="hero-rise lead text-ink-2 max-w-[62ch] mb-4" style={{ animationDelay: ".27s" }}>
          Ti seguo personalmente per 3-4 mesi fino in Elite Division. Ogni settimana mandi le clip, ti do il focus su
          WhatsApp. Non compri ore: compri il risultato, con me dietro.
        </p>

        <p className="hero-rise text-ink-2 text-[.97rem] max-w-[62ch] mb-7 border-l-2 border-gold/50 pl-3" style={{ animationDelay: ".33s" }}>
          <strong className="text-ink">In cosa è diverso dagli Allenamenti?</strong> Negli Allenamenti impari da solo, coi video, al tuo ritmo. Qui invece c'è <strong className="text-ink">Fabio dietro di te</strong>: guarda le tue partite e ti corregge fino a portarti in Elite. È il livello più alto, "fatto insieme".
        </p>

        <div className="hero-rise flex flex-wrap items-center gap-2 mb-8" style={{ animationDelay: ".38s" }}>
          {eliteSteps.map((s, i) => (
            <span key={s} className="inline-flex items-center gap-2">
              {i > 0 && <span className="text-muted text-[.86rem]">→</span>}
              <span className="text-[.88rem] text-ink-2 bg-card border border-line-2 px-3 py-1.5 rounded-full">{s}</span>
            </span>
          ))}
        </div>

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

        <div className="mb-9 fade-up">
          <span className="section-label block mb-4">Chi l'ha fatto con me</span>
          <Testimonials />
        </div>

        {/* PRENOTA: calendario sempre visibile. Chi non ha ore vede le disponibilità ma non prenota. */}
        <div id="prenota" className="fade-up scroll-mt-24">
          <span className="section-label block mb-3">Disponibilità e prenotazione</span>

          {/* Pannello DICHIARAZIONE ore (solo clienti storici, una volta sola) */}
          {!loading && credits?.pending && (
            <div className="card card--static max-w-[560px] mb-5 border-gold/40">
              <p className="text-ink text-[1.05rem] font-medium mb-1">
                Risulta che hai acquistato {credits.hours_total} {credits.hours_total === 1 ? "ora" : "ore"} di coaching.
              </p>
              <p className="text-ink-2 text-[.95rem] mb-4">Quante ne hai già fatte con Fabio fino a oggi? (metti <strong className="text-ink">0</strong> se è la prima)</p>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number" min={0} max={credits.hours_total} value={declDone}
                  onChange={(e) => setDeclDone(Math.max(0, Math.min(credits.hours_total, Number(e.target.value) || 0)))}
                  className="bg-card border border-line-2 rounded-[8px] px-3 py-2 w-24 text-ink outline-none focus:border-gold"
                />
                <button onClick={submitDeclare} disabled={declaring} className="btn-primary">{declaring ? "Attendi…" : "Conferma e sblocca"}</button>
              </div>
              {declMsg && <p className="text-gold text-[.9rem] mt-2">{declMsg}</p>}
              <p className="text-muted text-[.82rem] mt-2">Si conferma una volta sola: da lì prenoti le ore che ti restano.</p>
            </div>
          )}

          {/* Chi PUO' prenotare: banner ore + WhatsApp */}
          {canBook && (
            <>
              <p className="text-ink-2 text-[.95rem] mb-3">
                Ti restano <strong className="text-gold">{remaining} {remaining === 1 ? "ora" : "ore"}</strong>. Scegli uno slot libero: ricevi l'invito e io lo vedo nel calendario. <span className="text-muted">(usa questa email: {user.email})</span>
              </p>
              <div className="mb-4 rounded-[12px] border border-gold/30 bg-gold/[.06] p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                <p className="text-ink text-[.95rem]"><strong className="text-ink">Dopo aver prenotato, scrivimi su WhatsApp.</strong> Così partiamo subito e ti dico come mandarmi le clip.</p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary no-underline inline-flex items-center gap-2 shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M17.5 14.4c-.3-.15-1.7-.84-1.97-.94-.26-.1-.46-.14-.65.14-.2.27-.74.94-.9 1.13-.17.2-.33.22-.61.07-1.5-.75-2.48-1.34-3.47-3.03-.26-.45.26-.42.74-1.4.08-.17.04-.31-.02-.45-.07-.14-.65-1.57-.9-2.15-.23-.56-.47-.48-.65-.49h-.55c-.2 0-.5.07-.76.36-.26.27-1 .98-1 2.4 0 1.4 1.02 2.76 1.17 2.95.14.2 2.01 3.08 4.88 4.32 2.86 1.24 2.86.83 3.38.78.52-.05 1.68-.69 1.92-1.35.24-.66.24-1.22.17-1.34-.07-.12-.26-.19-.55-.33M12 2a10 10 0 0 0-8.55 15.18L2 22l4.94-1.3A10 10 0 1 0 12 2Z"/></svg>
                  Scrivimi su WhatsApp
                </a>
              </div>
            </>
          )}

          {!canBook && !credits?.pending && !loading && (
            <p className="text-ink-2 text-[.95rem] mb-3">
              Queste sono le mie disponibilità reali. <span className="text-muted">Le vedi liberamente: la prenotazione si sblocca quando hai un pacchetto coaching attivo.</span>
            </p>
          )}

          {/* Chi PUO' prenotare: booking vero. Gli altri: messaggio + tabella disponibilità sola-lettura. */}
          {canBook ? (
            <div className="rounded-[var(--radius-card)] border border-line-2 overflow-hidden bg-card">
              <iframe
                src={`${CAL_URL}?theme=dark&email=${encodeURIComponent(user?.email || "")}`}
                title="Prenota la sessione di coaching"
                className="w-full block"
                style={{ height: "clamp(640px, 80vh, 820px)", border: 0 }}
                loading="lazy"
              />
            </div>
          ) : loading ? (
            <p className="text-ink-2 text-[.95rem]">Carico le tue ore…</p>
          ) : (
            <>
              {!credits ? (
                // IL CONSIGLIO DI FABIO: spingi prima il Corso, poi eventualmente il coaching.
                <div className="card card--static max-w-[560px] mx-auto text-center border-gold/45 mb-5">
                  <span className="section-label block mb-2 justify-center">Il consiglio di Fabio</span>
                  <p className="text-ink text-[1.08rem] font-medium leading-snug mb-2">
                    Prima del coaching, prendi <strong className="text-gold">Il Corso di Fabio</strong>.
                  </p>
                  <p className="text-ink-2 text-[.95rem] mb-5">
                    Nel corso ti insegno io a giocare, passo passo, al tuo ritmo. La maggior parte sale di livello solo con quello. Poi, se vuoi che ti segua di persona, il coaching è qui e ti aspetta.
                  </p>
                  <div className="flex flex-col items-center gap-2.5">
                    <Link to="/corso" className="btn-primary no-underline inline-flex items-center justify-center w-full max-w-[320px]">Scopri Il Corso di Fabio</Link>
                    <Link to="/coaching" className="text-ink-2 underline text-[.9rem] hover:text-gold transition-colors">Voglio comunque il coaching 1:1</Link>
                  </div>
                </div>
              ) : credits.pending ? (
                <div className="card card--static max-w-[560px] mx-auto text-center border-gold/40 mb-5">
                  <p className="text-ink text-[1.02rem] font-medium mb-1">Conferma prima le tue ore</p>
                  <p className="text-ink-2 text-[.93rem]">Rispondi alla domanda qui sopra ("quante ore hai già fatto?") e la prenotazione si sblocca.</p>
                </div>
              ) : (
                <div className="card card--static max-w-[560px] mx-auto text-center border-gold/40 mb-5">
                  <p className="text-ink text-[1.02rem] font-medium mb-1">Hai usato tutte le tue ore.</p>
                  <p className="text-ink-2 text-[.93rem] mb-4">Per continuare il percorso, prendi un altro pacchetto.</p>
                  <Link to="/coaching" className="btn-primary no-underline inline-flex items-center">Acquista ancora</Link>
                </div>
              )}

              <AvailabilityView />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
