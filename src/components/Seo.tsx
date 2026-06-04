import { Helmet } from "react-helmet-async";

const SITE = "https://denuzzogaming.com";
const OG_IMAGE = `${SITE}/img/og-default.jpg`;

type Props = {
  title: string;
  description: string;
  path: string; // es. "/coaching"
  type?: "website" | "article";
  jsonLd?: object;
};

export default function Seo({ title, description, path, type = "website", jsonLd }: Props) {
  const url = `${SITE}${path}`;
  return (
    <Helmet>
      <html lang="it" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
