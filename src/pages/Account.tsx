import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import type { MemberContext } from "@/components/MemberLayout";
import { weeklyDrop, courses, pastDrops, nextDrop, collections, promo, type Course } from "@/content/membership";

const wrap = "max-w-[1700px] mx-auto px-[clamp(16px,4vw,58px)]";
const COMMUNITY_WA = "https://wa.me/393667142489?text=" + encodeURIComponent("Ciao Fabio, voglio entrare nella community");
const COACHING_WA = "https://wa.me/393667142489?text=" + encodeURIComponent("Ciao Fabio, voglio candidarmi alla Strada per l'Elite (coaching seguito)");

// Le tappe del coaching seguito (stesse del documento OFFERTA-COACHING.md).
const eliteSteps = ["Analisi", "Mese 1 · Fondamenta", "Mese 2 · Attacco + WL", "Mese 3 · Scalata", "Mese 4 · Elite"];

type Profile = {
  subscription_status: string | null;
  plan: string | null;
  current_period_end: string | null;
};

// ---- Icone (SVG, niente emoji) ----
function PlayIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function LockIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
function DownloadIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
    </svg>
  );
}
function InfoIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.5h.01" />
    </svg>
  );
}
function CalendarIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}
function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
// ---- Riga orizzontale stile Netflix ----
function Row({ title, hint, id, children }: { title: string; hint?: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-[clamp(34px,4.5vw,54px)] scroll-mt-24">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="font-display text-[clamp(1.2rem,2.2vw,1.5rem)] text-ink">{title}</h2>
        {hint && <span className="text-muted text-[.8rem]">{hint}</span>}
      </div>
      <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </section>
  );
}

// ---- Tessera corso: copertina DISEGNATA (16:9), niente immagine necessaria ----
function CourseTile({ course, locked }: { course: Course; locked: boolean }) {
  const hasFree = course.lessons.some((l) => l.free);
  return (
    <button className="group snap-start shrink-0 w-[clamp(220px,30vw,280px)] text-left cursor-pointer transition-transform duration-200 ease-out hover:scale-[1.04] hover:z-10 focus-visible:scale-[1.04]">
      <div className="relative aspect-video rounded-[var(--radius-card)] overflow-hidden border border-line-2 bg-card">
        {/* sfumatura per leggibilità del titolo */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 42%, rgba(10,10,15,.55))" }} />
        {/* accento oro (unico accento) */}
        <div className="absolute top-0 left-0 h-[3px] w-10 bg-gold rounded-br" />
        <span className="absolute top-2.5 left-3 text-[10px] font-semibold uppercase tracking-[.12em] text-ink-2">{course.category}</span>
        {locked && !hasFree && (
          <span className="absolute top-2.5 right-2.5 text-gold">
            <LockIcon />
          </span>
        )}
        {locked && hasFree && (
          <span className="absolute top-2.5 right-2.5 text-[10px] font-semibold bg-gold text-gold-contrast px-2 py-0.5 rounded-full">Anteprima gratis</span>
        )}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200"
          style={{ background: "rgba(10,10,15,.34)" }}
        >
          <span className="w-12 h-12 rounded-full bg-gold text-gold-contrast flex items-center justify-center">
            <PlayIcon size={22} />
          </span>
          <span className="text-ink text-[.8rem] font-medium">{locked && !hasFree ? "Anteprima con PRO" : "Riproduci"}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3">
          <p className="font-display text-ink text-[.98rem] leading-tight">{course.title}</p>
          <p className="text-muted text-[.78rem] mt-1">
            {course.level} · {course.lessons.length} lezioni
          </p>
        </div>
      </div>
    </button>
  );
}

// ---- Poster drop (copertina DISEGNATA 3:4), riusato da archivio e riga Top ----
function DropPoster({ episode, objective, isNew, locked }: { episode: number; objective: string; isNew?: boolean; locked: boolean }) {
  return (
    <div className="relative aspect-[3/4] rounded-[var(--radius-card)] overflow-hidden border border-line-2 bg-card">
      <span className="absolute -right-1 bottom-2 font-display text-gold opacity-[.12] leading-none text-[5.5rem] pointer-events-none">{episode}</span>
      <div className="absolute top-0 left-0 h-[3px] w-8 bg-gold rounded-br" />
      <span className="absolute top-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.1em] text-muted">EA FC 26 Weekly</span>
      {isNew && <span className="absolute top-2.5 right-2.5 text-[10px] font-semibold bg-red text-white px-2 py-0.5 rounded-full">Nuovo</span>}
      {locked && !isNew && (
        <span className="absolute top-2.5 right-2.5 text-gold">
          <LockIcon size={15} />
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 p-2.5">
        <p className="text-muted text-[.72rem]">Episodio {episode}</p>
        <p className="font-display text-ink text-[.92rem] leading-tight">{objective}</p>
      </div>
    </div>
  );
}

// ---- Tessera archivio (poster + hover) ----
function DropTile({ episode, objective, isNew, locked }: { episode: number; objective: string; isNew?: boolean; locked: boolean }) {
  return (
    <button className="snap-start shrink-0 w-[clamp(140px,20vw,168px)] text-left cursor-pointer transition-transform duration-200 ease-out hover:scale-[1.04] focus-visible:scale-[1.04]">
      <DropPoster episode={episode} objective={objective} isNew={isNew} locked={locked} />
    </button>
  );
}

// ---- Riga "Top": numerone gigante dietro il poster (stile Netflix Top 10) ----
function RankedDropTile({ rank, episode, objective, isNew, locked }: { rank: number; episode: number; objective: string; isNew?: boolean; locked: boolean }) {
  return (
    <button className="group snap-start shrink-0 flex items-end text-left cursor-pointer">
      <span
        className="font-display leading-none select-none -mr-3 text-[clamp(5rem,11vw,8.5rem)] pointer-events-none"
        style={{ color: "#211e29", WebkitTextStroke: "2px rgba(244,241,234,.16)" }}
        aria-hidden="true"
      >
        {rank}
      </span>
      <div className="w-[clamp(120px,16vw,150px)] transition-transform duration-200 ease-out group-hover:scale-[1.05] group-focus-visible:scale-[1.05]">
        <DropPoster episode={episode} objective={objective} isNew={isNew} locked={locked} />
      </div>
    </button>
  );
}

// ---- "Inizia da qui": 3 passi guidati ----
function StepCard({ n, title, desc, href, external }: { n: number; title: string; desc: string; href: string; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="card group flex items-start gap-3 no-underline"
    >
      <span className="shrink-0 w-8 h-8 rounded-full border border-gold/40 text-gold grid place-items-center font-display text-[.95rem]">{n}</span>
      <div className="flex-1">
        <p className="text-ink text-[.98rem] font-medium mb-0.5 flex items-center gap-1.5">
          {title}
          <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowIcon size={14} />
          </span>
        </p>
        <p className="text-ink-2 text-[.86rem] leading-snug">{desc}</p>
      </div>
    </a>
  );
}

export default function Account() {
  const { user } = useOutletContext<MemberContext>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: p } = await supabase
        .from("profiles")
        .select("subscription_status, plan, current_period_end")
        .eq("id", user.id)
        .single();
      setProfile(p as Profile | null);
      setReady(true);
    })();
  }, [user.id]);

  async function joinWaitlist() {
    setJoining(true);
    const { error } = await supabase.from("profiles").update({ plan: "pro_waitlist" }).eq("id", user.id);
    if (!error) {
      setProfile((p) =>
        p ? { ...p, plan: "pro_waitlist" } : { subscription_status: "free", plan: "pro_waitlist", current_period_end: null }
      );
    }
    setJoining(false);
  }

  function goPro() {
    document.getElementById("abbonamento")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  if (!ready) return null;
  const isActive = profile?.subscription_status === "active";
  const inWaitlist = profile?.plan === "pro_waitlist";
  const locked = !isActive;
  const name = user.email ? user.email.split("@")[0] : "";

  // Countdown al prossimo drop.
  const msPerDay = 86400000;
  const days = Math.max(0, Math.ceil((new Date(nextDrop.dateISO).getTime() - new Date().getTime()) / msPerDay));
  const countdownLabel = days === 0 ? "Il nuovo numero esce oggi" : days === 1 ? "Nuovo numero tra 1 giorno" : `Nuovo numero tra ${days} giorni`;

  // Lookup corsi per id (le collezioni per obiettivo pescano da qui).
  const courseById: Record<string, Course> = Object.fromEntries(courses.map((c) => [c.id, c]));

  // Riga "Top": il numero della settimana + l'archivio, classificati.
  const ranked = [
    { episode: weeklyDrop.episode, objective: weeklyDrop.objective, isNew: true },
    ...pastDrops.map((d) => ({ episode: d.episode, objective: d.objective, isNew: false })),
  ];

  return (
    <section className="pt-[clamp(24px,4vw,44px)] pb-[clamp(60px,10vh,120px)]">
      <div className={wrap}>
        {/* FASCIA PROSSIMA PROMO (minimale: l'atmosfera promo è già lo sfondo) */}
        <a href="#meta" className="flex items-center gap-3.5 mb-7 no-underline">
          <span className="w-1.5 h-11 rounded-full shrink-0" style={{ background: promo.accent }} />
          <div className="min-w-0">
            <span className="font-mono text-[11px] tracking-[.24em] uppercase" style={{ color: promo.accent }}>Prossima promo</span>
            <p className="font-display text-ink text-[clamp(1.1rem,2.2vw,1.55rem)] leading-tight">{promo.name}</p>
          </div>
          <span className="text-muted text-[.82rem] ml-auto hidden sm:block">In arrivo venerdì →</span>
        </a>

        {/* SALUTO + STATO */}
        <div className="flex items-center gap-3 mb-5">
          <p className="text-ink-2 text-[.95rem]">Ciao, {name}</p>
          {isActive ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gold text-gold-contrast text-[10px] font-bold uppercase tracking-[.12em]">PRO</span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-line-2 text-ink-2 text-[10px] font-bold uppercase tracking-[.12em]">Free</span>
          )}
        </div>

        {/* BILLBOARD — il drop della settimana */}
        <section id="meta" className="relative overflow-hidden rounded-[var(--radius-card)] border border-line-2 min-h-[clamp(300px,42vw,420px)] flex items-end scroll-mt-24">
          <div className="absolute inset-0" style={{ backgroundImage: `url(${weeklyDrop.cover})`, backgroundSize: "cover", backgroundPosition: "right center" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,10,15,.97) 0%, rgba(10,10,15,.82) 40%, rgba(10,10,15,.15) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(10,10,15,.9) 0%, transparent 42%)" }} />
          <div className="relative p-[clamp(20px,4vw,44px)] max-w-[640px]">
            <span className="section-label">{promo.name} · Episodio {weeklyDrop.episode}</span>
            <h1 className="font-display text-[clamp(1.7rem,4vw,2.8rem)] text-ink leading-[1.08] mt-2 mb-3">{weeklyDrop.title}</h1>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-[.78rem] text-ink-2 bg-card/70 border border-line-2 px-2.5 py-1 rounded-full">Obiettivo {weeklyDrop.objective}</span>
              <span className="text-[.78rem] text-ink-2 bg-card/70 border border-line-2 px-2.5 py-1 rounded-full">{weeklyDrop.formation}</span>
              <span className="text-[.78rem] text-ink-2 bg-card/70 border border-line-2 px-2.5 py-1 rounded-full">Gemma: {weeklyDrop.gem.name}</span>
            </div>
            <p className="text-ink-2 text-[.95rem] max-w-[48ch] mb-5">
              {weeklyDrop.topPlayers.map((p) => p.name).join(", ")}. La gemma della settimana e' {weeklyDrop.gem.name} ({weeklyDrop.gem.price}).
            </p>
            {locked ? (
              <div className="flex flex-wrap items-center gap-3">
                <button onClick={goPro} className="btn-primary inline-flex items-center gap-2">
                  <LockIcon size={16} /> Passa a PRO per guardare
                </button>
                <span className="text-muted text-[.82rem]">Anteprima gratis disponibile nei corsi</span>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center gap-2 bg-ink text-bg font-medium px-7 py-2.5 rounded-[6px] hover:bg-ink/85 transition-colors">
                  <PlayIcon size={20} /> Riproduci
                </button>
                <button className="inline-flex items-center gap-2 bg-white/15 text-ink font-medium px-5 py-2.5 rounded-[6px] hover:bg-white/25 transition-colors backdrop-blur-sm">
                  <InfoIcon size={18} /> Altre info
                </button>
                <button className="inline-flex items-center gap-2 text-ink-2 hover:text-ink text-[.88rem] px-2 py-2 transition-colors">
                  <DownloadIcon size={16} /> Scarica scheda
                </button>
              </div>
            )}
          </div>
        </section>

        {/* COUNTDOWN PROSSIMO DROP (inline, senza box) */}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="inline-flex items-center gap-2 text-gold text-[.85rem] font-medium">
            <CalendarIcon size={15} /> {countdownLabel}
          </span>
          <span className="text-ink-2 text-[.85rem]">{nextDrop.teaser}</span>
        </div>

        {/* INIZIA DA QUI */}
        <section className="mt-[clamp(28px,4vw,44px)]">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="font-display text-[clamp(1.15rem,2.2vw,1.45rem)] text-ink">Inizia da qui</h2>
            <span className="text-muted text-[.8rem]">3 passi per partire</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StepCard n={1} title="Guarda il meta della settimana" desc="La squadra da copiare e i giocatori su cui puntare adesso." href="#meta" />
            <StepCard n={2} title="Scegli un corso e inizia" desc="Parti dai fondamentali: difesa, attacco, costruzione squadra." href="#corsi" />
            <StepCard n={3} title="Entra nella community" desc="Confrontati con gli altri giocatori sul gruppo WhatsApp." href={COMMUNITY_WA} external />
          </div>
        </section>

        {/* TOP: le squadre meta più copiate (numeroni stile Netflix) */}
        <section className="mt-[clamp(28px,4vw,44px)]">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="font-display text-[clamp(1.15rem,2.2vw,1.45rem)] text-ink">Le squadre che spaccano</h2>
            <span className="text-muted text-[.8rem]">questa settimana</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-3 pl-1 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {ranked.map((d, i) => (
              <RankedDropTile key={d.episode} rank={i + 1} episode={d.episode} objective={d.objective} isNew={d.isNew} locked={locked} />
            ))}
          </div>
        </section>

        {/* ALLENAMENTI PER OBIETTIVO (collezioni curate) */}
        {collections.map((col, i) => (
          <Row key={col.id} title={col.title} hint={col.hint} id={i === 0 ? "corsi" : undefined}>
            {col.courseIds
              .map((cid) => courseById[cid])
              .filter(Boolean)
              .map((c) => (
                <CourseTile key={col.id + "-" + c.id} course={c} locked={locked} />
              ))}
          </Row>
        ))}

        {/* NUMERI PRECEDENTI (archivio) */}
        <Row title="Rivivi le meta passate" hint="l'archivio cresce ogni settimana" id="archivio">
          {pastDrops.map((d) => (
            <DropTile key={d.episode} episode={d.episode} objective={d.objective} locked={locked} />
          ))}
        </Row>

        {/* STRADA PER L'ELITE — coaching seguito (alto valore) */}
        <section id="strada-elite" className="mt-[clamp(40px,6vw,56px)] scroll-mt-24">
          <div className="rounded-[var(--radius-card)] border border-gold/25 bg-card p-[clamp(20px,4vw,40px)]">
            <div>
              <span className="section-label">Coaching seguito 1:1</span>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] text-ink mt-1 mb-2">Strada per l'Elite</h2>
              <p className="text-ink-2 text-[.98rem] max-w-[60ch] mb-5">
                Ti seguo personalmente per 3-4 mesi fino in Elite Division. Ogni settimana mandi le clip, ti do il focus su
                WhatsApp. Non compri ore: compri il risultato, con me dietro.
              </p>

              {/* le tappe */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {eliteSteps.map((s, i) => (
                  <span key={s} className="inline-flex items-center gap-2">
                    {i > 0 && <span className="text-muted text-[.8rem]">→</span>}
                    <span className="text-[.8rem] text-ink-2 bg-bg/40 border border-line-2 px-2.5 py-1 rounded-full">{s}</span>
                  </span>
                ))}
              </div>

              {/* punti di valore */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-ink text-[.95rem] font-medium mb-0.5">Seguito ogni settimana</p>
                  <p className="text-ink-2 text-[.85rem]">Clip analizzate + focus diretto su WhatsApp.</p>
                </div>
                <div>
                  <p className="text-ink text-[.95rem] font-medium mb-0.5">Garanzia sul risultato</p>
                  <p className="text-ink-2 text-[.85rem]">Fai il lavoro e non sali? Continuo gratis.</p>
                </div>
                <div>
                  <p className="text-ink text-[.95rem] font-medium mb-0.5">Posti limitati</p>
                  <p className="text-ink-2 text-[.85rem]">Seguo poche persone per ciclo. Su candidatura.</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a href={COACHING_WA} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 no-underline">
                  Candidati ora
                </a>
                <span className="text-muted text-[.82rem]">Rispondi a 3 domande · pochi posti per ciclo</span>
              </div>
            </div>
          </div>
        </section>

        {/* GESTIONE: abbonamento + coaching */}
        <section id="abbonamento" className="mt-[clamp(40px,6vw,56px)] grid grid-cols-1 md:grid-cols-2 gap-5 scroll-mt-24">
          {/* Abbonamento */}
          <div className="card card--static">
            <span className="section-label">Abbonamento</span>
            <h3 className="text-[1.3rem] mt-1 mb-2 text-ink">{isActive ? "Abbonamento PRO" : "Piano Free"}</h3>
            {isActive ? (
              <>
                <p className="text-ink-2 text-[.9rem] mb-4">Attivo · 4,99€/mese</p>
                <button className="text-ink-2 underline text-[.9rem]">Gestisci abbonamento</button>
              </>
            ) : inWaitlist ? (
              <>
                <p className="text-gold text-[.9rem] font-medium mb-1">✓ Sei in lista PRO</p>
                <p className="text-ink-2 text-[.9rem]">
                  Prezzo fondatore <strong className="text-ink">4,99€</strong> bloccato. Ti avviso appena il PRO apre, con accesso prioritario.
                </p>
              </>
            ) : (
              <>
                <p className="text-ink-2 text-[.9rem] mb-4">Sblocca i video completi, i corsi, l'archivio e il 30% di sconto sul coaching.</p>
                <button onClick={joinWaitlist} disabled={joining} className="btn-primary w-full">
                  {joining ? "Attendi…" : "Entra in lista PRO · prezzo fondatore"}
                </button>
                <p className="text-muted text-[11px] mt-2 text-center">4,99€ bloccati per i primi iscritti. Nessun pagamento ora.</p>
              </>
            )}
          </div>

          {/* Coaching */}
          <div className="card card--static">
            <span className="section-label">Coaching</span>
            <p className="text-ink-2 text-[.92rem] mt-1 mb-3">Vuoi essere seguito fino in Elite? C'è il programma "Strada per l'Elite". Gli abbonati PRO hanno priorità.</p>
            <a href="#strada-elite" className="text-gold text-[.9rem] font-medium">Scopri la Strada per l'Elite →</a>
          </div>
        </section>
      </div>
    </section>
  );
}
