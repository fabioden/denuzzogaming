import { useParams, Navigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getArticle, articles } from "@/content/articles";
import Seo from "@/components/Seo";
import CoachingCTA from "@/components/CoachingCTA";

const wrap = "max-w-[760px] mx-auto px-[clamp(24px,5vw,56px)]";

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticle(slug) : undefined;

  if (!article) return <Navigate to="/newsletter" replace />;

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      <Seo
        title={`${article.title} — Denuzzo Gaming`}
        description={article.description}
        path={`/newsletter/${article.slug}`}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          author: { "@type": "Person", name: "Fabio Denuzzo", url: "https://denuzzogaming.com" },
          publisher: {
            "@type": "Organization",
            name: "Denuzzo Gaming",
            logo: { "@type": "ImageObject", url: "https://denuzzogaming.com/logo.png" },
          },
          datePublished: article.date,
          dateModified: article.date,
          mainEntityOfPage: `https://denuzzogaming.com/newsletter/${article.slug}`,
          image: "https://denuzzogaming.com/img/og-default.jpg",
          articleSection: article.category,
        }}
      />

      <article className={`${wrap} pt-[clamp(140px,18vh,200px)] pb-[clamp(48px,7vh,90px)]`}>
        {/* Breadcrumb */}
        <nav className="font-mono text-[11px] tracking-[.08em] uppercase text-muted mb-8">
          <Link to="/gaming" className="hover:text-gold">Home</Link> /{" "}
          <Link to="/newsletter" className="hover:text-gold">Newsletter</Link> /{" "}
          <span className="text-ink-2">{article.category}</span>
        </nav>

        <span className="section-label">{article.category}</span>
        <h1 className="text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.08] mb-5">{article.title}</h1>
        <div className="flex items-center gap-3 font-mono text-[12px] text-muted mb-10 pb-8 border-b border-line">
          <span>Fabio Denuzzo</span><span>·</span><span>{article.dateLabel}</span><span>·</span><span>{article.readingTime}</span>
        </div>

        <div className="article-body">
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>
      </article>

      {/* Related */}
      <section className="pb-[clamp(40px,6vh,72px)]">
        <div className="max-w-[1100px] mx-auto px-[clamp(24px,5vw,56px)]">
          <div className="gold-sep mb-[clamp(40px,6vh,72px)]" />
          <span className="section-label">Leggi anche</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            {related.map((a) => (
              <Link key={a.slug} to={`/newsletter/${a.slug}`} className="card no-underline group">
                <span className="font-mono text-[11px] tracking-[.1em] uppercase text-gold">{a.category}</span>
                <h3 className="text-[1.1rem] leading-snug mt-2 text-ink group-hover:text-gold transition-colors">{a.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CoachingCTA />
    </>
  );
}
