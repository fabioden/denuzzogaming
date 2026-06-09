import { Helmet } from "react-helmet-async";
import { useLang, localizePath, canonicalPath } from "@/i18n";

const SITE = "https://denuzzogaming.com";
const OG_IMAGE = `${SITE}/img/og-default.jpg`;

type Props = {
  title: string;
  description: string;
  path: string; // path canonico IT (es. "/coaching")
  type?: "website" | "article";
  jsonLd?: object;
  image?: string; // opzionale (es. hero dell'articolo)
  /** Emette gli hreflang it/en — attivare solo quando esiste davvero la versione EN. */
  bilingual?: boolean;
};

export default function Seo({ title, description, path, type = "website", jsonLd, image, bilingual = false }: Props) {
  const lang = useLang();
  const canon = canonicalPath(path);
  const itUrl = `${SITE}${canon}`;
  const enUrl = `${SITE}${localizePath(canon, "en")}`;
  const currentUrl = lang === "en" ? enUrl : itUrl;
  const ogImage = image ? (image.startsWith("http") ? image : `${SITE}${image}`) : OG_IMAGE;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={currentUrl} />

      {bilingual && <link rel="alternate" hrefLang="it" href={itUrl} />}
      {bilingual && <link rel="alternate" hrefLang="en" href={enUrl} />}
      {bilingual && <link rel="alternate" hrefLang="x-default" href={itUrl} />}

      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={lang === "en" ? "en_US" : "it_IT"} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
