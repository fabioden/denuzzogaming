import { useContent } from "@/content/use-content";
import { useLang } from "@/i18n";
import Seo from "@/components/Seo";

const wrap = "max-w-[820px] mx-auto px-[clamp(24px,5vw,56px)]";

export default function Privacy() {
  const { privacyPage: p } = useContent();
  const lang = useLang();
  return (
    <>
      <Seo
        title={p.seo.title}
        description={p.seo.description}
        path={p.seo.path}
        bilingual
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Denuzzo Gaming",
          url: "https://denuzzogaming.com",
          logo: "https://denuzzogaming.com/logo.png",
          founder: { "@type": "Person", name: "Fabio Denuzzo" },
        }}
      />

      <header className={`${wrap} pt-[clamp(150px,20vh,220px)] pb-[clamp(32px,5vh,56px)]`}>
        <span className="section-label">Denuzzo Gaming</span>
        <h1 className="text-[clamp(2.4rem,6vw,4rem)] mb-4">Privacy <em className="not-italic text-gold">Policy</em></h1>
        <p className="text-[clamp(1rem,1.4vw,1.18rem)] text-ink-2">{p.subtitle}</p>
        <p className="font-mono text-[12px] text-muted mt-3">{p.updated}</p>
      </header>

      <div className={`${wrap} pb-[clamp(64px,9vh,120px)]`}>
        <div className="flex flex-col gap-9">
          {p.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-[1.4rem] mb-3 text-ink">
                <span className="text-gold mr-1">|</span> {s.h.replace(/^\d+\.\s*/, "")}
              </h2>
              {s.p.map((para, i) => (
                <p key={i} className="text-[.98rem] text-ink-2 leading-relaxed mb-2">{para}</p>
              ))}
            </section>
          ))}
        </div>

        <div className="card card--gold mt-12 text-center">
          <p className="text-ink-2 text-[.98rem]">
            {lang === "en" ? "To exercise your rights, write to" : "Per esercitare i tuoi diritti scrivi a"}{" "}
            <a href={`mailto:${p.email}`} className="text-gold no-underline border-b border-gold/35 hover:border-gold">{p.email}</a>
          </p>
        </div>
      </div>
    </>
  );
}
