// Componenti UI condivisi dall'area membri (Academy). Una sola fonte, riusata da tutte le pagine.
import { Link } from "react-router-dom";
import Tilt from "@/components/reactbits/Tilt";
import type { Course } from "@/content/membership";

// ---- Icone (SVG, niente emoji) ----
export function PlayIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
export function LockIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
export function DownloadIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
    </svg>
  );
}
export function InfoIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.5h.01" />
    </svg>
  );
}
export function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export const wrap = "max-w-[1180px] mx-auto px-[clamp(16px,4vw,48px)]";

// ---- Riga orizzontale (carosello) ----
export function Row({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="mt-[clamp(28px,4vw,44px)] fade-up">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="font-display text-[clamp(1.2rem,2.2vw,1.5rem)] text-ink">{title}</h2>
        {hint && <span className="text-muted text-[.86rem]">{hint}</span>}
      </div>
      <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{children}</div>
    </section>
  );
}

// ---- Tessera corso (copertina disegnata 16:9) ----
// progress: {done,total} mostra una barra di avanzamento + stato (per "I miei corsi").
// fluid: la tessera riempie la cella della griglia invece della larghezza fissa da carosello.
export function CourseTile({ course, locked, to, progress, fluid }: { course: Course; locked: boolean; to?: string; progress?: { done: number; total: number }; fluid?: boolean }) {
  const hasFree = course.lessons.some((l) => l.free);
  const hasCover = !!course.cover;
  const pct = progress && progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0;
  const statusLabel = progress
    ? progress.done >= progress.total
      ? "Completato"
      : progress.done > 0
        ? `${progress.done}/${progress.total} esercizi · ${pct}%`
        : `${progress.total} esercizi`
    : `${course.lessons.length} esercizi · 2-3 min`;
  // Copertina disegnata quando non c'e' una miniatura vera (in arrivo). Dark + alone oro, coerente con l'hero.
  const placeholderBg = "radial-gradient(120% 85% at 82% 0%, rgba(214,162,26,.16), transparent 56%), linear-gradient(160deg, #1b1722 0%, #131017 56%, #100d08 100%)";
  const cls = fluid
    ? "group w-full text-left cursor-pointer no-underline"
    : "group snap-start shrink-0 w-[clamp(220px,30vw,280px)] text-left cursor-pointer hover:z-10 no-underline";
  const inner = (
      <div
        className="relative aspect-video rounded-[var(--radius-card)] overflow-hidden border border-line-2 bg-card"
        style={hasCover ? { backgroundImage: `url(${course.cover})`, backgroundSize: "cover", backgroundPosition: "center" } : { background: placeholderBg }}
      >
        {!hasCover && (
          <span className="absolute inset-0 grid place-items-center text-gold/10 pointer-events-none">
            <PlayIcon size={68} />
          </span>
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,15,.12) 0%, transparent 40%, rgba(10,10,15,.78))" }} />
        <div className="absolute top-0 left-0 h-[3px] w-10 bg-gold rounded-br" />
        <span className="absolute top-2.5 left-3 text-[11px] font-semibold uppercase tracking-[.12em] text-ink-2">{course.category}</span>
        {locked && !hasFree && (
          <span className="absolute top-2.5 right-2.5 text-gold">
            <LockIcon />
          </span>
        )}
        {locked && hasFree && <span className="absolute top-2.5 right-2.5 text-[11px] font-semibold bg-gold text-gold-contrast px-2 py-0.5 rounded-full">Anteprima gratis</span>}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200" style={{ background: "rgba(10,10,15,.34)" }}>
          <span className="w-12 h-12 rounded-full bg-gold text-gold-contrast flex items-center justify-center">
            <PlayIcon size={22} />
          </span>
          <span className="text-ink text-[.86rem] font-medium">{locked && !hasFree ? "Sblocca con il PRO" : "Riproduci"}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3">
          <p className="font-display text-ink text-[.98rem] leading-tight">{course.title}</p>
          <p className="text-muted text-[.84rem] mt-1">{statusLabel}</p>
        </div>
        {progress && progress.done > 0 && (
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-black/45">
            <span className="block h-full bg-gold" style={{ width: `${pct}%` }} />
          </div>
        )}
      </div>
  );
  return to ? (
    <Link to={to} className={cls}>
      <Tilt radius={12} amplitude={6} scaleOnHover={1.04}>{inner}</Tilt>
    </Link>
  ) : (
    <button className={cls}>
      <Tilt radius={12} amplitude={6} scaleOnHover={1.04}>{inner}</Tilt>
    </button>
  );
}

// ---- Poster numero (copertina disegnata 3:4) ----
export function DropPoster({ episode, objective, isNew, locked }: { episode: number; objective: string; isNew?: boolean; locked: boolean }) {
  return (
    <div className="relative aspect-[3/4] rounded-[var(--radius-card)] overflow-hidden border border-line-2 bg-card">
      <span className="absolute -right-1 bottom-2 font-display text-gold opacity-[.12] leading-none text-[5.5rem] pointer-events-none">{episode}</span>
      <div className="absolute top-0 left-0 h-[3px] w-8 bg-gold rounded-br" />
      <span className="absolute top-2.5 left-2.5 text-[11px] font-semibold uppercase tracking-[.1em] text-muted">EA FC 26 Weekly</span>
      {isNew && <span className="absolute top-2.5 right-2.5 text-[11px] font-semibold bg-red text-white px-2 py-0.5 rounded-full">Nuovo</span>}
      {locked && !isNew && (
        <span className="absolute top-2.5 right-2.5 text-gold">
          <LockIcon size={15} />
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 p-2.5">
        <p className="text-muted text-[.78rem]">Episodio {episode}</p>
        <p className="font-display text-ink text-[.97rem] leading-tight">{objective}</p>
      </div>
    </div>
  );
}

export function DropTile({ episode, objective, isNew, locked }: { episode: number; objective: string; isNew?: boolean; locked: boolean }) {
  return (
    <button className="snap-start shrink-0 w-[clamp(140px,20vw,168px)] text-left cursor-pointer transition-transform duration-200 ease-out hover:scale-[1.04] focus-visible:scale-[1.04]">
      <DropPoster episode={episode} objective={objective} isNew={isNew} locked={locked} />
    </button>
  );
}

export function RankedDropTile({ rank, episode, objective, isNew, locked }: { rank: number; episode: number; objective: string; isNew?: boolean; locked: boolean }) {
  return (
    <button className="group snap-start shrink-0 flex items-end text-left cursor-pointer">
      <span className="font-display leading-none select-none -mr-3 text-[clamp(5rem,11vw,8.5rem)] pointer-events-none" style={{ color: "#211e29", WebkitTextStroke: "2px rgba(244,241,234,.16)" }} aria-hidden="true">
        {rank}
      </span>
      <div className="w-[clamp(120px,16vw,150px)] transition-transform duration-200 ease-out group-hover:scale-[1.05] group-focus-visible:scale-[1.05]">
        <DropPoster episode={episode} objective={objective} isNew={isNew} locked={locked} />
      </div>
    </button>
  );
}

// ---- Player video riusabile (bozza: "in arrivo" finché non c'è il link; embed quando c'è; lucchetto se non PRO) ----
export function VideoPlayer({ youtubeId, title, locked = false }: { youtubeId: string; title?: string; locked?: boolean }) {
  const isDraft = youtubeId.startsWith("PLACEHOLDER");
  return (
    <div className="relative aspect-video rounded-[var(--radius-card)] overflow-hidden border border-line-2 bg-card">
      {locked ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-center p-6">
          <span className="text-gold">
            <LockIcon size={28} />
          </span>
          <p className="text-ink text-[1.05rem] font-medium">Questo esercizio è dei PRO.</p>
          <p className="text-ink-2 text-[.95rem] max-w-[42ch]">Sei tra i primi: blocca il <strong className="text-ink">prezzo founder</strong> prima che il PRO apra. Nessun pagamento adesso.</p>
          <Link to="/account/abbonamento" className="btn-primary no-underline mt-1">
            Entra in lista founder
          </Link>
        </div>
      ) : isDraft ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center p-6">
          <span className="text-muted">
            <PlayIcon size={30} />
          </span>
          <p className="text-ink-2">In arrivo per EA FC 27.</p>
          <p className="text-muted text-[.86rem]">Fabio sta registrando il percorso. Intanto allenati con le lezioni già disponibili.</p>
        </div>
      ) : (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title || "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}
