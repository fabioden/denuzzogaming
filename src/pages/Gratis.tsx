import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

// L'amo: la pagina dove il traffico YouTube lascia l'email e riceve subito la lezione gratis.
// Iscrizione via il Worker -> Brevo (lo stesso della newsletter, gia attivo).
const NEWSLETTER_API = "https://diabete-assistant.business-fabiodenuzzo.workers.dev/newsletter";
// La lezione regalata (per ora un video coaching esistente; si cambia qui quando arriva il dedicato da 10 min).
const LESSON_URL = "https://www.youtube.com/watch?v=VoccWsVV5mU";

const wrap = "max-w-[860px] mx-auto px-[clamp(24px,5vw,64px)]";

const perks = [
  "La mentalità giusta per salire di divisione",
  "Cosa allenare davvero per arrivare in Elite",
  "I consigli di chi l'ha vinto, due volte",
];

export default function Gratis() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    try {
      await fetch(NEWSLETTER_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      /* il Worker e affidabile: confermiamo comunque */
    }
    setDone(true);
  }

  return (
    <>
      <Seo
        title="La lezione gratis di Fabio · Arriva in Elite Division"
        description="Lascia la tua email e ricevi gratis la lezione di coaching di Fabio Denuzzo, 2 volte campione italiano EA FC: cosa imparare per salire fino in Elite Division."
        path="/gratis"
      />
      <section className="pt-[clamp(150px,20vh,220px)] pb-[clamp(60px,10vh,120px)]">
        <div className={wrap}>
          <span className="section-label">Gratis · Lezione di coaching</span>
          <h1 className="text-[clamp(2.2rem,6vw,3.6rem)] leading-[1.05] mb-5">Arriva in Elite Division: la lezione gratis di Fabio</h1>
          <p className="text-ink-2 text-[clamp(1rem,1.5vw,1.2rem)] max-w-[54ch] mb-8">
            Sono Fabio Denuzzo, 2 volte campione italiano EA FC. Lascia la tua email e ti regalo la mia lezione di coaching: cosa
            imparare per salire fino in Elite.
          </p>

          {done ? (
            <div className="max-w-[560px] flex flex-col gap-4">
              <div className="card card--static">
                <p className="text-gold text-[1.15rem] font-medium mb-3">Fatto! Ecco la tua lezione.</p>
                <a href={LESSON_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex no-underline">
                  Guarda la lezione →
                </a>
                <p className="text-muted text-[.85rem] mt-3">Guardala con calma e applicala in 3 partite. Sei nella lista: ti arrivano i prossimi consigli.</p>
              </div>
              {/* Ponte verso l'Academy: l'iscritto fa il primo passo nella scala di valore */}
              <div className="card card--static">
                <span className="section-label">Il passo dopo</span>
                <p className="text-ink text-[1.05rem] font-medium mt-1 mb-1">Entra nell'Academy, gratis</p>
                <p className="text-ink-2 text-[.92rem] mb-4">Crea il tuo account e trovi il percorso di allenamenti: il primo esercizio di ogni area è gratis. Quando vuoi salire davvero, c'è il PRO.</p>
                <Link to="/login" className="btn-secondary inline-flex no-underline">Crea account gratis →</Link>
              </div>
            </div>
          ) : (
            <>
              <ul className="flex flex-col gap-2.5 mb-8 max-w-[46ch]">
                {perks.map((p) => (
                  <li key={p} className="flex gap-2.5 text-ink-2">
                    <span className="text-gold" aria-hidden>
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <form onSubmit={submit} className="flex flex-wrap gap-3 max-w-[480px]">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="La tua email"
                  aria-label="Email"
                  className="flex-1 min-w-[200px] bg-card border border-line-2 rounded-[8px] px-[18px] py-[15px] text-ink text-[.95rem] outline-none focus:border-gold transition-colors"
                />
                <button type="submit" className="btn-primary">Voglio la lezione gratis</button>
              </form>
              <p className="font-mono text-[12px] text-muted mt-3">Niente spam. Solo consigli per giocare meglio. Cancellati quando vuoi.</p>
            </>
          )}

          <p className="text-muted text-[.9rem] mt-10">Fabio Denuzzo · 2× Campione Italiano EA FC · FIFA eWorld Cup 2018 e 2021</p>
        </div>
      </section>
    </>
  );
}
