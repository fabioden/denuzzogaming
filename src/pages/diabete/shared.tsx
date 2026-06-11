// Chrome condiviso delle pagine DIABETE diverse dalla landing (lista articoli +
// singolo articolo): sfondo, top bar e footer, tutti nello stesso tema verde/chiaro.
// La landing (Diabete.tsx) ha un suo header ricco con le ancore della pagina;
// qui invece le pagine articolo usano una top bar più semplice (logo + ritorno).
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import DnaHelix from '@/components/DnaHelix';
import { cn } from '@/lib/utils';

// Sfondo CONTINUO fisso: base chiarissima + doppia elica del DNA (verticale, basi
// nei colori glicemia) con un velo che garantisce la leggibilità del testo.
export function PageBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#f5faf7]">
      {/* DNA: campo di eliche che AVVOLGE tutto lo sfondo (linee continue, anche al centro). */}
      <div className="pointer-events-none absolute inset-0">
        <DnaHelix />
      </div>
      {/* velo per la leggibilità: morbido e uniforme */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(245,250,247,0.66) 0%, rgba(245,250,247,0.52) 50%, rgba(245,250,247,0.46) 100%)',
        }}
      />
    </div>
  );
}

export function LogoBadge() {
  return <img src="/logo-mark.png" alt="Fabio Denuzzo" className="h-10 w-10 flex-none" />;
}

// Pill Nav (stile React Bits): le voci stanno in una "pillola", e una pillola
// verde scorre sotto la voce attiva/hover (motion layoutId = movimento fluido).
function PillNav({ items }: { items: { to: string; label: string; active: boolean }[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const current = hovered ?? items.find((i) => i.active)?.to ?? null;
  return (
    <nav
      onMouseLeave={() => setHovered(null)}
      className="hidden items-center rounded-full border border-line bg-white/70 p-1 backdrop-blur-md sm:flex"
    >
      {items.map((it) => (
        <Link
          key={it.to}
          to={it.to}
          onMouseEnter={() => setHovered(it.to)}
          className={cn(
            'relative rounded-full px-4 py-2 text-[0.92rem] font-semibold transition-colors',
            current === it.to ? 'text-glu-green-deep' : 'text-ink-soft hover:text-ink',
          )}
        >
          {current === it.to && (
            <motion.span
              layoutId="diabete-pill"
              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              className="absolute inset-0 -z-10 rounded-full bg-glu-green-soft"
            />
          )}
          {it.label}
        </Link>
      ))}
    </nav>
  );
}

// Top bar delle pagine articolo: logo + Pill Nav + CTA assistente.
export function DiabeteTopBar() {
  const { pathname } = useLocation();
  const items = [
    { to: '/diabete#assistente', label: 'Assistente', active: false },
    { to: '/diabete/articoli', label: 'Articoli', active: pathname.startsWith('/diabete/articoli') },
    { to: '/diabete#chi-sono', label: 'Chi sono', active: false },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 shadow-[0_1px_0_rgba(21,37,43,0.08)] backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-5 py-3 sm:px-8">
        <Link to="/diabete" className="flex items-center gap-2.5">
          <LogoBadge />
          <span className="font-display text-lg font-semibold tracking-tight">Fabio Denuzzo</span>
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <PillNav items={items} />
          <Link
            to="/diabete#assistente"
            className="rounded-full bg-glu-green px-4 py-2 text-[0.9rem] font-semibold text-white transition-colors hover:bg-glu-green-deep"
          >
            Parla con l'assistente
          </Link>
        </div>
      </div>
    </header>
  );
}

// Footer essenziale, coerente con quello della landing.
export function DiabeteFooter() {
  return (
    <footer className="relative border-t border-line bg-white/70 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/diabete" className="flex items-center gap-2.5">
            <LogoBadge />
            <span className="font-display text-lg font-semibold tracking-tight text-ink">Fabio Denuzzo</span>
          </Link>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
            <Link to="/diabete#assistente" className="hover:text-ink">Assistente</Link>
            <Link to="/diabete/articoli" className="hover:text-ink">Articoli</Link>
            <Link to="/diabete#chi-sono" className="hover:text-ink">Chi sono</Link>
            <Link to="/diabete#sostieni" className="hover:text-ink">Sostieni</Link>
          </nav>
        </div>
        <p className="mt-8 border-t border-line pt-6 text-xs text-ink-soft">
          © 2026 Fabio Denuzzo — Strumento educativo, non sostituisce il medico. In emergenza: 112 / 118.
        </p>
      </div>
    </footer>
  );
}

// Colore "livello glicemia" per categoria → pallino indicatore della riga.
const CAT_COLOR: Record<string, string> = {
  Basi: 'var(--color-glu-green)',
  Alimentazione: 'var(--color-glu-yellow)',
  'Vita quotidiana': 'var(--color-glu-green-deep)',
};

export type ArticleRowData = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  dateLabel: string;
  readingTime: string;
  badge?: string;
  draft?: boolean;
  heroImage?: string;
  heroAlt?: string;
};

// Una riga dell'INDICE articoli (look "tabella"): hover = barra-accento a sinistra
// che cresce + riga che si tinge di verde + bottone freccia che si riempie.
function ArticleRow({ a, n }: { a: ArticleRowData; n: number }) {
  return (
    <Link
      to={`/diabete/articoli/${a.slug}`}
      className="group relative grid grid-cols-[1fr_auto] items-center gap-4 border-b border-line px-5 py-5 no-underline transition-colors last:border-0 hover:bg-glu-green-soft/50 sm:grid-cols-[auto_1fr_auto] sm:gap-6 sm:px-7 sm:py-6"
    >
      {/* barra-accento a sinistra che cresce all'hover */}
      <span className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-glu-green transition-transform duration-300 group-hover:scale-y-100" />

      {/* numero indice (desktop) */}
      <span className="hidden font-mono text-[1rem] text-ink-soft/70 sm:block">{String(n).padStart(2, '0')}</span>

      {/* titolo + categoria + excerpt */}
      <div className="min-w-0">
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[0.8rem] font-bold uppercase tracking-wider text-glu-green-deep">
            <span className="h-2 w-2 rounded-full" style={{ background: CAT_COLOR[a.category] ?? 'var(--color-glu-green)' }} />
            {a.category}
          </span>
          {a.badge && (
            <span className="rounded-full bg-glu-green px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">{a.badge}</span>
          )}
        </div>
        <h3 className="font-display text-[1.3rem] font-bold leading-snug text-ink transition-colors group-hover:text-glu-green-deep sm:text-[1.45rem]">
          {a.title}
        </h3>
        <p className="mt-1.5 line-clamp-1 text-[0.98rem] text-ink/65">{a.excerpt}</p>
      </div>

      {/* meta + freccia */}
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden text-right sm:block">
          <div className="text-[0.95rem] font-semibold text-ink">{a.readingTime}</div>
          <div className="text-[0.82rem] text-ink-soft">{a.dateLabel}</div>
        </div>
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-line text-lg text-glu-green-deep transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-glu-green group-hover:bg-glu-green group-hover:text-white">
          →
        </span>
      </div>
    </Link>
  );
}

// Card singola dell'indice articoli: miniatura hero in alto (zoom in hover) +
// categoria col pallino-colore glicemia, titolo Fraunces, excerpt e meta.
function ArticleCard({ a }: { a: ArticleRowData }) {
  return (
    <Link
      to={`/diabete/articoli/${a.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white/80 no-underline shadow-[0_14px_40px_rgba(21,37,43,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-glu-green/40 hover:shadow-[0_22px_60px_rgba(33,138,87,0.18)]"
    >
      {/* miniatura */}
      <div className="aspect-video overflow-hidden bg-glu-green-soft/40">
        {a.heroImage ? (
          <img
            src={a.heroImage}
            alt={a.heroAlt || a.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-glu-green-soft to-white" />
        )}
      </div>

      {/* corpo */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[0.8rem] font-bold uppercase tracking-wider text-glu-green-deep">
            <span className="h-2 w-2 rounded-full" style={{ background: CAT_COLOR[a.category] ?? 'var(--color-glu-green)' }} />
            {a.category}
          </span>
          {a.badge && (
            <span className="rounded-full bg-glu-green px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">{a.badge}</span>
          )}
        </div>
        <h3 className="font-display text-[1.3rem] font-bold leading-snug text-ink transition-colors group-hover:text-glu-green-deep">
          {a.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-[0.98rem] text-ink/65">{a.excerpt}</p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-[0.85rem] text-ink-soft">
          <span>{a.readingTime} · {a.dateLabel}</span>
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line text-glu-green-deep transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-glu-green group-hover:bg-glu-green group-hover:text-white">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

// GRIGLIA di card con miniatura (come la Newsletter gaming), tema diabete.
export function ArticleCards({ items }: { items: ArticleRowData[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((a) => (
        <ArticleCard key={a.slug} a={a} />
      ))}
    </div>
  );
}

// INDICE articoli a tabella: pannello pulito con intestazione + righe numerate.
export function ArticleTable({ items, startIndex = 1 }: { items: ArticleRowData[]; startIndex?: number }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white/80 shadow-[0_18px_50px_rgba(21,37,43,0.10)] backdrop-blur-sm">
      {/* intestazione tabella */}
      <div className="hidden grid-cols-[auto_1fr_auto] gap-6 border-b border-line bg-glu-green-soft/40 px-7 py-3.5 sm:grid">
        <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink-soft">#</span>
        <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink-soft">Articolo</span>
        <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink-soft">Lettura</span>
      </div>
      {items.map((a, i) => (
        <ArticleRow key={a.slug} a={a} n={startIndex + i} />
      ))}
    </div>
  );
}
