import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { diabeteArticles } from '@/content/diabete-articles';
import { PageBackground, DiabeteTopBar, DiabeteFooter, ArticleCards } from '@/pages/diabete/shared';

// Lista articoli del sito diabete: /diabete/articoli
// Menu per argomento (categorie dinamiche, con contatori) + ricerca sul sito.
export default function DiabeteArticles() {
  const [cat, setCat] = useState('Tutti');
  const [query, setQuery] = useState('');

  useEffect(() => {
    document.title = 'Articoli sul diabete | Fabio Denuzzo';
  }, []);

  // Argomenti = categorie effettivamente presenti negli articoli (+ "Tutti"),
  // ognuno col numero di articoli. Così il menu cresce da solo aggiungendo articoli.
  const topics = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of diabeteArticles) counts.set(a.category, (counts.get(a.category) ?? 0) + 1);
    return [
      { name: 'Tutti', count: diabeteArticles.length },
      ...Array.from(counts, ([name, count]) => ({ name, count })).sort((a, b) => a.name.localeCompare(b.name)),
    ];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return diabeteArticles.filter((a) => {
      const okCat = cat === 'Tutti' || a.category === cat;
      const okQ = !q || `${a.title} ${a.excerpt} ${a.category} ${a.body}`.toLowerCase().includes(q);
      return okCat && okQ;
    });
  }, [cat, query]);

  return (
    <div className="diabete-scope relative min-h-screen overflow-x-hidden font-sans text-ink">
      <PageBackground />
      <DiabeteTopBar />

      {/* HERO */}
      <header className="px-5 pb-10 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-[0.92rem] font-bold uppercase tracking-[0.16em] text-glu-green-deep">Articoli</p>
          <h1 className="font-display text-[clamp(2.6rem,6vw,4rem)] font-bold leading-[1.05] tracking-tight text-ink [text-wrap:balance]">
            Capire il diabete, un articolo alla volta
          </h1>
          <p className="mt-6 max-w-2xl text-[1.2rem] leading-relaxed text-ink/80">
            Scegli un argomento o cerca quello che ti serve — alimentazione, ricette, vita di tutti i giorni e altro.
            Spunti educativi, <strong className="text-ink">non sostituiscono il medico</strong>.
          </p>
        </div>
      </header>

      <main className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-5xl">
          {/* ===== Barra strumenti: ricerca + menu argomenti ===== */}
          <div className="mb-8 flex flex-col gap-5">
            {/* ricerca */}
            <div className="relative max-w-xl">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-ink-soft">🔍</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cerca un articolo… (es. ipoglicemia, pasta, sport)"
                aria-label="Cerca tra gli articoli"
                className="w-full rounded-full border border-line bg-white/80 py-3.5 pl-12 pr-4 text-[1rem] text-ink shadow-sm outline-none backdrop-blur-sm transition-colors placeholder:text-ink-soft/70 focus:border-glu-green"
              />
            </div>

            {/* menu argomenti (categorie dinamiche con contatore) */}
            <div className="flex flex-wrap gap-2.5">
              {topics.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setCat(t.name)}
                  className={
                    'inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[0.95rem] font-semibold transition ' +
                    (cat === t.name
                      ? 'border-glu-green bg-glu-green text-white'
                      : 'border-line bg-white/60 text-ink-soft hover:border-glu-green hover:text-glu-green-deep')
                  }
                >
                  {t.name}
                  <span
                    className={
                      'rounded-full px-2 py-0.5 text-[0.72rem] font-bold ' +
                      (cat === t.name ? 'bg-white/25 text-white' : 'bg-glu-green-soft text-glu-green-deep')
                    }
                  >
                    {t.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* riga risultati quando si cerca */}
          {query.trim() && (
            <p className="mb-4 text-[0.95rem] text-ink-soft">
              {filtered.length === 0
                ? 'Nessun risultato'
                : `${filtered.length} ${filtered.length === 1 ? 'articolo trovato' : 'articoli trovati'}`}
              {' per '}
              <strong className="text-ink">“{query.trim()}”</strong>
            </p>
          )}

          {/* griglia articoli a card (con miniatura) */}
          {filtered.length > 0 ? (
            <motion.div
              key={cat + query}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <ArticleCards items={filtered} />
            </motion.div>
          ) : (
            <div className="rounded-3xl border border-line bg-white/70 px-6 py-16 text-center">
              <p className="text-[1.05rem] text-ink-soft">
                Nessun articolo per questa ricerca. Prova un altro argomento, oppure{' '}
                <a href="/diabete#assistente" className="font-semibold text-glu-green-deep hover:underline">
                  chiedi direttamente all'assistente
                </a>
                .
              </p>
            </div>
          )}

          {/* CTA finale verso l'assistente */}
          <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-glu-green-deep to-[#0d3a27] p-8 text-white shadow-[0_24px_60px_rgba(33,138,87,0.28)]">
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.1rem)] font-bold leading-tight">Hai una domanda che nessun articolo copre?</h2>
            <p className="mt-4 max-w-xl text-[1.15rem] leading-relaxed text-white/90">
              Chiedila direttamente all'assistente: ti risponde gratis, in italiano, con la mia esperienza e con la scienza.
            </p>
            <a
              href="/diabete#assistente"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[1.02rem] font-semibold text-glu-green-deep transition hover:bg-white/90"
            >
              Fai una domanda →
            </a>
          </div>
        </div>
      </main>

      <DiabeteFooter />
    </div>
  );
}
