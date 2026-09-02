import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const wrap = "max-w-[1100px] mx-auto px-[clamp(24px,5vw,64px)]";
const input =
  "bg-card border border-line-2 rounded-[8px] px-[18px] py-[15px] text-ink text-[.95rem] outline-none focus:border-gold transition-colors";

// Cosa ottieni entrando ora come founder (niente prezzi: i corsi non sono ancora usciti).
const founderPerks = [
  "Accesso prioritario ai corsi appena escono",
  "Posto founder riservato, a condizioni migliori",
  "La tua area personale nell'Academy",
  "Nessun pagamento ora, nessuna carta",
];

function Perk({ children, strong }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <li className="flex gap-2.5 text-[.92rem] leading-snug">
      <span className="text-gold mt-[1px]" aria-hidden>
        ✓
      </span>
      <span className={strong ? "text-ink" : "text-ink-2"}>{children}</span>
    </li>
  );
}

// Login + Registrazione alla membership PRO (Supabase Auth, email + password).
export default function Login() {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e: FormEvent) {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        // Se la conferma email e' disattivata, Supabase restituisce subito una sessione: entra diretto.
        if (data.session) {
          navigate("/account");
        } else {
          setMsg("Account creato. Controlla l'email per confermare, poi accedi.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/account");
      }
    } catch (err) {
      const m = (err as Error).message || "";
      if (/email not confirmed/i.test(m)) {
        setMsg("Questa email non è confermata. Su Supabase disattiva 'Confirm email' e cancella questo utente, poi registrati di nuovo (oppure usa un'altra email).");
      } else if (/invalid login credentials/i.test(m)) {
        setMsg("Email o password errate. Se non hai ancora un account, registrati.");
      } else {
        setMsg(m || "Qualcosa non ha funzionato, riprova.");
      }
    }
    setLoading(false);
  }

  return (
    <section className="pt-[clamp(140px,18vh,200px)] pb-[clamp(60px,10vh,120px)]">
      <div className={wrap}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start">
          {/* SINISTRA — il valore: reward immediato + confronto Free vs PRO */}
          <div>
            <span className="section-label">Area Membri</span>
            <h1 className="text-[clamp(2rem,4.5vw,3rem)] text-ink mb-5 leading-[1.1]">
              Iscriviti gratis.
              <br />
              Entra nella lista founder.
            </h1>

            {/* REWARD IMMEDIATO — cosa ottieni appena ti registri */}
            <div className="card card--static flex items-center gap-4 mb-6">
              <img
                src="/img/fabio-480.webp"
                alt="Fabio Denuzzo, coach EA FC"
                className="w-[84px] h-[108px] object-cover object-top rounded-[8px] shrink-0 border border-line-2"
                loading="eager"
              />
              <div>
                <span className="section-label">Subito per te</span>
                <h3 className="text-[1.1rem] text-ink leading-snug mb-1">
                  In arrivo con EA FC 27
                </h3>
                <p className="text-ink-2 text-[.9rem] leading-snug">
                  I corsi video di Fabio stanno arrivando. Registrati gratis ed entra tra i primi
                  founder, senza pagare.
                </p>
              </div>
            </div>

            {/* Cosa ottieni entrando ora come founder (niente prezzi) */}
            <div className="card card--static relative outline outline-1 outline-gold">
              <span className="absolute top-5 right-5 inline-flex items-center px-2.5 py-0.5 font-display text-[10px] font-bold tracking-[.1em] uppercase rounded-full bg-gold text-gold-contrast">
                Founder
              </span>
              <span className="section-label">Entrando ora</span>
              <h3 className="text-[1.15rem] mt-1 text-ink">Sei tra i primi</h3>
              <p className="text-muted text-[.85rem] mb-4">Nessun pagamento ora</p>
              <ul className="flex flex-col gap-2.5">
                {founderPerks.map((p) => (
                  <Perk key={p} strong>
                    {p}
                  </Perk>
                ))}
              </ul>
            </div>

            <p className="text-muted text-[.82rem] mt-4">
              Ti registri gratis ora. Quando i corsi escono, i founder entrano per primi. Nessuna carta per iniziare.
            </p>
          </div>

          {/* DESTRA — il form */}
          <div className="card card--static lg:sticky lg:top-28">
            <h2 className="text-[1.5rem] text-ink mb-1">
              {mode === "login" ? "Accedi" : "Crea il tuo account gratis"}
            </h2>
            <p className="text-ink-2 text-[.9rem] mb-5">
              {mode === "login"
                ? "Bentornato. Accedi alla tua area."
                : "Bastano email e password. Nessuna carta richiesta."}
            </p>

            <form onSubmit={submit} className="flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="La tua email"
                aria-label="Email"
                className={input}
              />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (almeno 6 caratteri)"
                aria-label="Password"
                className={input}
              />
              <button type="submit" disabled={loading} className="btn-primary mt-1">
                {loading ? "Attendi…" : mode === "login" ? "Accedi" : "Registrati gratis"}
              </button>
            </form>

            {msg && <p className="mt-4 text-[.95rem] text-gold">{msg}</p>}

            <p className="mt-6 text-[.9rem] text-ink-2">
              {mode === "login" ? "Non hai un account?" : "Hai già un account?"}{" "}
              <button
                onClick={() => {
                  setMode(mode === "login" ? "signup" : "login");
                  setMsg("");
                }}
                className="text-gold underline"
              >
                {mode === "login" ? "Registrati" : "Accedi"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
