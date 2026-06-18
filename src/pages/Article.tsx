import { useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getArticle, articles, articleView } from "@/content/articles";
import { L, useLang, useT } from "@/i18n";
import Seo from "@/components/Seo";
import CoachingCTA from "@/components/CoachingCTA";

const wrap = "max-w-[760px] mx-auto px-[clamp(24px,5vw,56px)]";

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticle(slug) : undefined;
  const lang = useLang();
  const t = useT();

  if (!article) return <Navigate to="/newsletter" replace />;

  const v = articleView(article, lang);
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 2);
  const heroUrl = article.heroImage
    ? `https://denuzzogaming.com${article.heroImage}`
    : "https://denuzzogaming.com/img/og-default.jpg";

  return (
    <>
      <Seo
        title={`${v.title} | Denuzzo Gaming`}
        description={v.description}
        path={`/newsletter/${article.slug}`}
        type="article"
        image={article.heroImage}
        bilingual={v.hasEn}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: v.title,
          description: v.description,
          inLanguage: lang === "en" ? "en" : "it",
          author: { "@type": "Person", name: "Fabio Denuzzo", url: "https://denuzzogaming.com" },
          publisher: {
            "@type": "Organization",
            name: "Denuzzo Gaming",
            logo: { "@type": "ImageObject", url: "https://denuzzogaming.com/logo.png" },
          },
          datePublished: article.date,
          dateModified: article.date,
          mainEntityOfPage: `https://denuzzogaming.com/newsletter/${article.slug}`,
          image: heroUrl,
          articleSection: v.category,
          ...(article.youtubeId && {
            video: {
              "@type": "VideoObject",
              name: v.title,
              description: v.description,
              thumbnailUrl: heroUrl,
              uploadDate: article.date,
              contentUrl: `https://www.youtube.com/watch?v=${article.youtubeId}`,
              embedUrl: `https://www.youtube.com/embed/${article.youtubeId}`,
            },
          }),
        }}
      />

      <article className={`${wrap} pt-[clamp(140px,18vh,200px)] pb-[clamp(48px,7vh,90px)]`}>
        {/* Breadcrumb */}
        <nav className="font-mono text-[11px] tracking-[.08em] uppercase text-muted mb-8">
          <L to="/gaming" className="hover:text-gold">{t("nav.home")}</L> /{" "}
          <L to="/newsletter" className="hover:text-gold">{t("nav.newsletter")}</L> /{" "}
          <span className="text-ink-2">{v.category}</span>
        </nav>

        <span className="section-label">{v.category}</span>
        <h1 className="text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.08] mb-5">{v.title}</h1>
        <div className="flex items-center gap-3 font-mono text-[12px] text-muted mb-10 pb-8 border-b border-line">
          <span>Fabio Denuzzo</span><span>·</span><span>{v.dateLabel}</span><span>·</span><span>{article.readingTime}</span>
        </div>

        {article.heroImage && (
          <img
            src={article.heroImage}
            alt={v.heroAlt || v.title}
            className="w-full rounded-xl border border-line mb-10"
          />
        )}

        {article.youtubeId && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-line mb-10">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${article.youtubeId}`}
              title={v.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        )}

        <div className="article-body">
          <ReactMarkdown>{v.body}</ReactMarkdown>
        </div>
      </article>

      {/* Related */}
      <section className="pb-[clamp(40px,6vh,72px)]">
        <div className="max-w-[1100px] mx-auto px-[clamp(24px,5vw,56px)]">
          <div className="gold-sep mb-[clamp(40px,6vh,72px)]" />
          <span className="section-label">{t("article.readAlso")}</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            {related.map((a) => {
              const rv = articleView(a, lang);
              return (
                <L key={a.slug} to={`/newsletter/${a.slug}`} className="card no-underline group">
                  <span className="font-mono text-[11px] tracking-[.1em] uppercase text-gold">{rv.category}</span>
                  <h3 className="text-[1.1rem] leading-snug mt-2 text-ink group-hover:text-gold transition-colors">{rv.title}</h3>
                </L>
              );
            })}
          </div>
        </div>
      </section>

      <CoachingCTA />
    </>
  );
}
