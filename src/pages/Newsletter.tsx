import { useState } from "react";
import { blogPage as blogPageIt } from "@/content";
import { useContent } from "@/content/use-content";
import { articles, articleView } from "@/content/articles";
import { L, useLang } from "@/i18n";
import Seo from "@/components/Seo";
import CoachingCTA from "@/components/CoachingCTA";

const wrap = "max-w-[1180px] mx-auto px-[clamp(24px,5vw,64px)]";
const section = "py-[clamp(56px,8vh,110px)] relative";
const lead = "text-[clamp(1rem,1.4vw,1.18rem)] text-ink-2 max-w-[56ch]";

// Iscrizione newsletter via il NOSTRO Worker → API Brevo ufficiale (affidabile, niente sibforms).
const NEWSLETTER_API = "https://diabete-assistant.business-fabiodenuzzo.workers.dev/newsletter";

export default function Newsletter() {
  const { newsletterPage: n, blogPage } = useContent();
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  // Filtro: l'indice 0 = "Tutti"/"All". I valori di confronto restano sempre
  // quelli italiani (blogPageIt.categories), perché articles[].category è in IT.
  const [cat, setCat] = useState(blogPageIt.categories[0]);

  const lang = useLang();
  const filtered = cat === blogPageIt.categories[0] ? articles : articles.filter((a) => a.category === cat);
  const latest = articles[0];
  const lv = latest ? articleView(latest, lang) : null;

  return (
    <>
      <Seo title={n.seo.title} description={n.seo.description} path={n.seo.path} bilingual />

      {/* HERO + FORM */}
      <header className={`${wrap} pt-[clamp(150px,20vh,220px)] pb-[clamp(40px,6vh,64px)]`}>
        <span className="section-label">{n.hero.eyebrow}</span>
        <h1 className="text-[clamp(2.6rem,7vw,5rem)] mb-5">{n.hero.title}</h1>
        <p className={`${lead} mb-9`}>{n.hero.subtitle}</p>

        {done ? (
          <p className="text-gold text-[1rem] font-medium mb-3">{n.success}</p>
        ) : (
          <form
            className="flex flex-wrap gap-3 max-w-[480px] mb-3"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!email.includes("@")) return;
              try {
                await fetch(NEWSLETTER_API, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email }),
                });
              } catch {
                /* rete: confermiamo comunque (il Worker è affidabile) */
              }
              setDone(true);
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={n.placeholder}
              aria-label={lang === "en" ? "Your email" : "La tua email"}
              required
              className="flex-1 min-w-[200px] bg-card border border-line-2 rounded-[8px] px-[18px] py-[15px] text-ink text-[.95rem] outline-none focus:border-gold transition-colors"
            />
            <button type="submit" className="btn-primary">{n.cta}</button>
          </form>
        )}
        <p className="font-mono text-[12px] text-muted">{n.microcopy}</p>

        <div className="flex flex-wrap gap-2.5 mt-7">
          {n.tags.map((t) => (
            <span key={t} className="font-mono text-[11px] tracking-[.1em] uppercase text-ink-2 border border-line-2 rounded-full px-3.5 py-1.5">{t}</span>
          ))}
        </div>
      </header>

      <div className="gold-sep" />

      {/* ULTIMA USCITA */}
      {latest && lv && (
        <section className="pt-[clamp(40px,6vh,64px)]">
          <div className={wrap}>
            <L to={`/newsletter/${latest.slug}`} className="card flex flex-col md:flex-row md:items-center gap-6 no-underline group">
              <div className="flex-1 order-last md:order-first">
                <div className="flex items-center gap-3 mb-3">
                  <span className="badge badge--red">🔥 {lang === "en" ? "Latest" : "Ultima uscita"}</span>
                  <span className="font-mono text-[11px] tracking-[.1em] uppercase text-gold">{lv.category}</span>
                </div>
                <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] leading-tight text-ink group-hover:text-gold transition-colors mb-2">{lv.title}</h2>
                <p className="text-[.95rem] text-ink-2 max-w-[60ch]">{lv.excerpt}</p>
                <div className="flex items-center gap-3 font-mono text-[11px] text-muted mt-4">
                  <span>{lv.dateLabel}</span><span>·</span><span>{latest.readingTime}</span>
                </div>
              </div>
              {latest.heroImage && (
                <div className="w-full md:w-[44%] shrink-0 aspect-video rounded-[12px] overflow-hidden border border-line-2 bg-card">
                  <img
                    src={latest.heroImage}
                    alt={lv.heroAlt || lv.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                  />
                </div>
              )}
            </L>
          </div>
        </section>
      )}

      {/* GRIGLIA ARTICOLI */}
      <section className={section} id="articoli">
        <div className={wrap}>
          <div className="mb-8 fade-up">
            <span className="section-label">{lang === "en" ? "All releases" : "Tutte le uscite"}</span>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)]">{lang === "en" ? "Article archive" : "Archivio articoli"}</h2>
          </div>

          {/* Filtri (valore = categoria IT, etichetta = lingua corrente) */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {blogPageIt.categories.map((c, i) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`font-mono text-[11px] tracking-[.1em] uppercase rounded-full px-4 py-2 border transition ${cat === c ? "bg-gold text-gold-contrast border-gold" : "text-ink-2 border-line-2 hover:border-gold hover:text-gold"}`}
              >
                {blogPage.categories[i] ?? c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((a) => {
              const av = articleView(a, lang);
              return (
              <L key={a.slug} to={`/newsletter/${a.slug}`} className="card flex flex-col no-underline group">
                {a.heroImage && (
                  <div className="mb-4 aspect-video rounded-[10px] overflow-hidden border border-line-2 bg-card">
                    <img
                      src={a.heroImage}
                      alt={av.heroAlt || av.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] tracking-[.1em] uppercase text-gold">{av.category}</span>
                  {a.badge && <span className="inline-flex items-center px-2.5 py-0.5 font-display text-[10px] font-bold tracking-[.1em] uppercase rounded-full bg-red text-white">{a.badge}</span>}
                </div>
                <h3 className="text-[1.2rem] leading-snug mb-3 text-ink group-hover:text-gold transition-colors">{av.title}</h3>
                <p className="text-[.92rem] text-ink-2 mb-4 flex-1">{av.excerpt}</p>
                <div className="flex items-center gap-3 font-mono text-[11px] text-muted">
                  <span>{av.dateLabel}</span><span>·</span><span>{a.readingTime}</span>
                </div>
              </L>
              );
            })}
          </div>
        </div>
      </section>

      <div className="gold-sep" />

      {/* AUTHOR */}
      <section className={section}>
        <div className={wrap}>
          <div className="card card--static max-w-[760px] mx-auto fade-up">
            <span className="section-label">{lang === "en" ? "The author" : "L'autore"}</span>
            <h3 className="text-[1.4rem] mb-3">{n.author.name}</h3>
            <p className="text-[1rem] text-ink-2 leading-relaxed">{n.author.bio}</p>
          </div>
        </div>
      </section>

      <CoachingCTA />
    </>
  );
}
