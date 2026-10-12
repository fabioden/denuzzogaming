import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { wrap } from "@/components/academy";
import { supabase } from "@/lib/supabaseClient";
import Testimonials from "@/components/Testimonials";
import type { MemberContext } from "@/components/MemberLayout";

const eliteSteps = ["Analisi", "Mese 1 · Fondamenta", "Mese 2 · Attacco + WL", "Mese 3 · Scalata", "Mese 4 · Elite"];

// Endpoint del Worker (dichiarazione ore già fatte dei clienti vecchi).
const WORKER_URL = "https://denuzzo-stripe-webhook.business-fabiodenuzzo.workers.dev";
const CAL_URL = "https://cal.com/fabio-denuzzo-be6jqr/coachin-1vs1";

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

        {/* PRENOTA: in base alle ore acquistate su Stripe */}
        <div id="prenota" className="fade-up scroll-mt-24">
          <span className="section-label block mb-3">Prenota la tua sessione</span>

          {loading ? (
            <p className="text-ink-2 text-[.95rem]">Carico le tue ore…</p>
          ) : !credits ? (
            <div className="card card--static max-w-[560px]">
              <p className="text-ink text-[1.05rem] font-medium mb-1">Non risultano ore di coaching sul tuo account.</p>
              <p className="text-ink-2 text-[.95rem] mb-4">Per prenotare una sessione, prendi prima un pacchetto. (Usa la stessa email dell'account.)</p>
              <Link to="/coaching" className="btn-primary no-underline inline-flex items-center">Vedi i pacchetti</Link>
            </div>
          ) : credits.pending ? (
            <div className="card card--static max-w-[560px]">
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
                <button onClick={submitDeclare} disabled={declaring} className="btn-primary">{declaring ? "Attendi…" : "Conferma"}</button>
              </div>
              {declMsg && <p className="text-gold text-[.9rem] mt-2">{declMsg}</p>}
              <p className="text-muted text-[.82rem] mt-2">Si conferma una volta sola: da lì prenoti le ore che ti restano.</p>
            </div>
          ) : remaining <= 0 ? (
            <div className="card card--static max-w-[560px]">
              <p className="text-ink text-[1.05rem] font-medium mb-1">Hai usato tutte le tue ore.</p>
              <p className="text-ink-2 text-[.95rem] mb-4">Per continuare il percorso, prendi un altro pacchetto.</p>
              <Link to="/coaching" className="btn-primary no-underline inline-flex items-center">Acquista ancora</Link>
            </div>
          ) : (
            <>
              <p className="text-ink-2 text-[.95rem] mb-3">
                Ti restano <strong className="text-gold">{remaining} {remaining === 1 ? "ora" : "ore"}</strong>. Scegli uno slot libero: ricevi l'invito e io lo vedo nel calendario. <span className="text-muted">(usa questa email: {user.email})</span>
              </p>
              <div className="rounded-[var(--radius-card)] border border-line-2 overflow-hidden bg-card">
                <iframe
                  src={`${CAL_URL}?theme=dark&email=${encodeURIComponent(user.email || "")}`}
                  title="Prenota la sessione di coaching"
                  className="w-full block"
                  style={{ height: "clamp(640px, 80vh, 820px)", border: 0 }}
                  loading="lazy"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
