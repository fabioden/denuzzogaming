import { useContent } from "@/content/use-content";
import { useLang } from "@/i18n";
import Seo from "@/components/Seo";
import SpotlightCard from "@/components/reactbits/SpotlightCard";

const wrap = "max-w-[1100px] mx-auto px-[clamp(24px,5vw,56px)]";
const section = "py-[clamp(64px,9vh,120px)] relative";
const lead = "text-[clamp(1rem,1.4vw,1.18rem)] text-ink-2 max-w-[56ch]";

export default function Coaching() {
  const { coachingPage: c } = useContent();
  const lang = useLang();
  return (
    <>
      <Seo
        title={c.seo.title}
        description={c.seo.description}
        path={c.seo.path}
        bilingual
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Coaching EA FC 1:1",
          provider: { "@type": "Person", name: "Fabio Denuzzo", jobTitle: "Professional Esports Coach" },
          offers: c.packages.map((p) => ({
            "@type": "Offer",
            name: p.name,
            price: p.price.replace("€", "").replace(",", "."),
            priceCurrency: "EUR",
          })),
        }}
      />

      {/* HERO */}
      <header className={`${wrap} pt-[clamp(150px,20vh,220px)] pb-[clamp(40px,6vh,72px)] text-center`}>
        <span className="section-label justify-center">{c.hero.eyebrow}</span>
        <h1 className="text-[clamp(2.6rem,7vw,5rem)] mb-5">{c.hero.title}</h1>
        <p className={`${lead} mx-auto mb-9`}>{c.hero.subtitle}</p>
        <div className="flex flex-wrap gap-3.5 justify-center">
          <a href={c.hero.ctaPrimary.href} className="btn-primary">{c.hero.ctaPrimary.label}</a>
          <a href={c.hero.ctaWhatsapp.href} target="_blank" rel="noopener noreferrer" className="btn-secondary">{c.hero.ctaWhatsapp.label}</a>
        </div>
      </header>

      <div className="gold-sep" />

      {/* PRICING */}
      <section className={section} id="prezzi">
        <div className={wrap}>
          <div className="text-center mb-[clamp(40px,6vh,64px)] fade-up">
            <span className="section-label justify-center">{lang === "en" ? "Packages · launch offer −25%" : "Pacchetti · offerta lancio −25%"}</span>
            <h2 className="text-[clamp(2rem,5vw,3.2rem)]">{lang === "en" ? "Choose your path" : "Scegli il tuo percorso"}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
            {c.packages.map((p) => (
              <div key={p.name} className={`relative h-full ${p.popular ? "lg:-translate-y-2" : ""}`}>
                {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 inline-flex items-center px-3.5 py-1 font-display text-[11px] font-bold tracking-[.1em] uppercase rounded-full bg-red text-white">{lang === "en" ? "Most chosen" : "Più scelto"}</span>}
                <SpotlightCard className={`card flex flex-col h-full ${p.popular ? "border-gold/40" : ""}`}>
                  <h3 className="text-[1.4rem] mb-2">{p.name}</h3>
                  <p className="text-[.92rem] text-ink-2 mb-5 min-h-[3em]">{p.desc}</p>
                  <div className="flex items-end gap-2 mb-5 tabular-nums">
                    <span className="font-display text-[2.6rem] font-bold text-gold leading-none">{p.price}</span>
                    <span className="font-mono text-[14px] text-muted line-through mb-1">{p.priceFull}</span>
                  </div>
                  <ul className="flex flex-col gap-2.5 mb-7">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[.92rem] text-ink-2">
                        <span className="text-gold mt-0.5 shrink-0">✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  <a href={p.stripe} target="_blank" rel="noopener noreferrer" className={`${p.popular ? "btn-primary" : "btn-secondary"} mt-auto justify-center`}>{p.cta}</a>
                  <p className="text-center font-mono text-[11px] text-muted mt-3">{c.microcopy}</p>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-sep" />

      {/* COSA IMPARI */}
      <section className={section}>
        <div className={wrap}>
          <div className="mb-[clamp(40px,6vh,64px)] fade-up">
            <span className="section-label">{lang === "en" ? "What you learn" : "Cosa impari"}</span>
            <h2 className="text-[clamp(2rem,5vw,3.2rem)]">{lang === "en" ? "Concrete results, not theory" : "Risultati concreti, non teoria"}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 fade-up">
            {c.learn.map((l) => (
              <div key={l.h} className="card">
                <h3 className="text-[1.15rem] mb-2">{l.h}</h3>
                <p className="text-[.92rem] text-ink-2">{l.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-sep" />

      {/* COME FUNZIONA */}
      <section className={section}>
        <div className={wrap}>
          <div className="mb-[clamp(40px,6vh,64px)] fade-up">
            <span className="section-label">{lang === "en" ? "How it works" : "Come funziona"}</span>
            <h2 className="text-[clamp(2rem,5vw,3.2rem)]">{lang === "en" ? "From booking to recap" : "Dalla prenotazione al recap"}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 fade-up">
            {c.steps.map((s) => (
              <div key={s.n} className="card">
                <div className="font-display text-[13px] font-bold tracking-[.1em] text-gold mb-3.5">{s.n}</div>
                <h3 className="text-[1.25rem] mb-2">{s.h}</h3>
                <p className="text-[.95rem] text-ink-2">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-sep" />

      {/* RISULTATI */}
      <section className={section}>
        <div className={wrap}>
          <div className="mb-[clamp(40px,6vh,64px)] fade-up">
            <span className="section-label">{lang === "en" ? "Real results" : "Risultati reali"}</span>
            <h2 className="text-[clamp(2rem,5vw,3.2rem)]">{lang === "en" ? "My students climb Divisions" : "I miei allievi salgono di Division"}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 fade-up">
            {c.results.map((r) => (
              <blockquote key={r.author} className="card card--static">
                <div className="flex items-center gap-2 font-display font-bold mb-1">
                  <span className="text-ink-2">{r.from}</span>
                  <span className="text-gold">→</span>
                  <span className="text-gold">{r.to}</span>
                </div>
                <div className="font-mono text-[11px] tracking-[.08em] uppercase text-muted mb-4">{r.time}</div>
                <p className="text-[.98rem] text-ink leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
                <span className="block mt-4 font-mono text-[12px] tracking-[.1em] uppercase text-ink-2">{r.author}</span>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-sep" />

      {/* FAQ */}
      <section className={section}>
        <div className={wrap}>
          <div className="mb-[clamp(40px,6vh,64px)] fade-up">
            <span className="section-label">FAQ</span>
            <h2 className="text-[clamp(2rem,5vw,3.2rem)]">{lang === "en" ? "Frequently asked questions" : "Domande frequenti"}</h2>
          </div>
          <div className="flex flex-col gap-4 max-w-[820px] fade-up">
            {c.faq.map((f) => (
              <details key={f.q} className="card card--static group">
                <summary className="flex items-center justify-between cursor-pointer list-none font-display text-[1.1rem] font-semibold text-ink">
                  {f.q}
                  <span className="text-gold transition-transform group-open:rotate-45 text-[1.4rem] leading-none">+</span>
                </summary>
                <p className="text-[.95rem] text-ink-2 mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-[clamp(56px,8vh,110px)] text-center">
        <div className="gold-sep mb-[clamp(56px,8vh,110px)]" />
        <div className={wrap}>
          <div className="fade-up">
            <h2 className="text-[clamp(2.2rem,5.5vw,3.6rem)]">{lang === "en" ? <>Ready to <em className="not-italic text-gold">win</em>?</> : <>Pronto a <em className="not-italic text-gold">vincere</em>?</>}</h2>
            <p className={`${lead} mx-auto mb-8 mt-[18px]`}>{lang === "en" ? "Book your session and start playing like a pro." : "Prenota e inizia a giocare come un professionista."}</p>
            <div className="flex flex-wrap gap-3.5 justify-center">
              <a href="#prezzi" className="btn-primary">{lang === "en" ? "Choose your package →" : "Scegli il pacchetto →"}</a>
              <a href="https://wa.me/393667142489" target="_blank" rel="noopener noreferrer" className="btn-secondary">{lang === "en" ? "Message me first" : "Scrivimi prima"}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
