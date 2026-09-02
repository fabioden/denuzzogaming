import { Link, useOutletContext } from "react-router-dom";
import { courses, categoryOrder, categoryTitle } from "@/content/membership";
import { wrap, Row, CourseTile } from "@/components/academy";
import type { MemberContext } from "@/components/MemberLayout";

export default function Courses() {
  const { isActive } = useOutletContext<MemberContext>();
  const locked = !isActive;

  // I moduli in ordine = il percorso. Ogni modulo e' una tappa.
  const modules = categoryOrder
    .map((cat) => ({ cat, title: categoryTitle[cat], items: courses.filter((c) => c.category === cat) }))
    .filter((m) => m.items.length > 0);

  return (
    <section className="pt-[clamp(28px,4vw,52px)] pb-[clamp(60px,10vh,120px)]">
      <div className={wrap}>
        <span className="section-label hero-rise block" style={{ animationDelay: ".05s" }}>Allenamenti</span>
        <h1 className="hero-rise font-display serif text-[clamp(1.7rem,3.2vw,2.5rem)] text-ink mt-1 mb-2" style={{ animationDelay: ".16s" }}>Allenati come un professionista</h1>
        <p className="hero-rise lead text-ink-2 max-w-[58ch]" style={{ animationDelay: ".27s" }}>
          Tutti gli esercizi di Fabio, divisi per area: costruzione squadra, difesa, attacco e mentalità. Scegli su cosa allenarti, al tuo ritmo. Se preferisci seguirli nell'ordine giusto, con i tuoi progressi, te li guida <Link to="/account/percorso" className="text-gold no-underline hover:underline">Il mio percorso</Link>.
        </p>

        {/* Richiamo all'offerta: solo per chi è ancora gratis */}
        {locked && (
          <div className="hero-rise mt-5 rounded-[var(--radius-card)] border border-gold/30 bg-gold/[.06] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5" style={{ animationDelay: ".45s" }}>
            <p className="text-ink-2 text-[.97rem] flex-1 leading-snug">
              <strong className="text-ink">Il primo esercizio di ogni area è gratis.</strong> Provalo ora. Per sbloccare tutto il percorso e diventare un Elite Player, c'è il piano dedicato, con il prezzo founder bloccato per i primi.
            </p>
            <Link to="/account/abbonamento" className="btn-primary no-underline shrink-0">Diventa Elite Player</Link>
          </div>
        )}

        {modules.map((m, i) => (
          <Row key={m.cat} title={`Tappa ${i + 1} · ${m.title}`} hint={`${m.items.reduce((n, c) => n + c.lessons.length, 0)} esercizi`}>
            {m.items.map((c) => (
              <CourseTile key={c.id} course={c} locked={locked} to={`/account/corso/${c.id}`} />
            ))}
          </Row>
        ))}
      </div>
    </section>
  );
}
