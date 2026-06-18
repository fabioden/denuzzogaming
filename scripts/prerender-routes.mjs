// Genera un file HTML statico per ogni rotta della SPA, così GitHub Pages le serve
// con HTTP 200 invece del fallback 404.html (che dava status 404 → Google non indicizza).
// Gira come "postbuild", dopo `vite build`, sulla cartella dist/.
//
// In più, INIETTA in ogni HTML statico i meta SEO/social per-pagina (title, description,
// canonical, hreflang, Open Graph, Twitter card). Questo serve ai crawler che NON eseguono
// JavaScript (WhatsApp, Facebook, X, LinkedIn, Telegram, Discord): senza, le anteprime social
// uscirebbero vuote. I tag sono marcati con `data-rh="true"` (attributo di react-helmet-async)
// così, lato browser/Google, helmet li RICONCILIA invece di duplicarli.
//
// La lista rotte rispecchia gen-sitemap.mjs.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist");

const SITE = "https://denuzzogaming.com";
const OG_DEFAULT = `${SITE}/img/og-default.jpg`;

const indexHtml = readFileSync(join(dist, "index.html"), "utf8");

// ── Articoli: slug + title/description/heroImage + versione EN (parsing testuale di articles.ts) ──
const src = readFileSync(join(root, "src/content/articles.ts"), "utf8");
const slugMatches = [...src.matchAll(/\n\s*slug:\s*"([a-z0-9-]+)"/g)];
const articles = slugMatches.map((m, i) => {
  const start = m.index;
  const end = i + 1 < slugMatches.length ? slugMatches[i + 1].index : src.length;
  const chunk = src.slice(start, end);
  const grab = (text, key) => {
    const m2 = text.match(new RegExp(key + ':\\s*"((?:[^"\\\\]|\\\\.)*)"'));
    return m2 ? m2[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\") : undefined;
  };
  const enIdx = chunk.search(/\n\s*en:\s*\{/);
  const enChunk = enIdx >= 0 ? chunk.slice(enIdx) : "";
  return {
    slug: m[1],
    title: grab(chunk, "title"),
    description: grab(chunk, "description"),
    heroImage: grab(chunk, "heroImage"),
    hasEn: enIdx >= 0,
    enTitle: grab(enChunk, "title"),
    enDescription: grab(enChunk, "description"),
  };
});

// ── Pagine statiche (meta di fallback per i social; lato Google ci pensa comunque helmet) ──
const PAGES = [
  {
    path: "/", bilingual: true, type: "website",
    it: { title: "Denuzzo Gaming — coaching e contenuti EA FC", description: "Migliora davvero a EA FC con Fabio Denuzzo, 2x campione italiano ed ex pro player: coaching, guide e newsletter." },
    en: { title: "Denuzzo Gaming — EA FC coaching & content", description: "Truly get better at EA FC with Fabio Denuzzo, 2x Italian champion and former pro: coaching, guides and newsletter." },
  },
  {
    path: "/gaming", bilingual: true, type: "website",
    it: { title: "EA FC con Denuzzo Gaming", description: "Il mondo EA FC di Fabio Denuzzo: coaching, newsletter e la Scuola Denuzzo per imparare a giocare." },
    en: { title: "EA FC with Denuzzo Gaming", description: "Fabio Denuzzo's EA FC world: coaching, newsletter and Denuzzo School to learn how to play." },
  },
  {
    path: "/coaching", bilingual: true, type: "website",
    it: { title: "Coaching EA FC con Fabio Denuzzo", description: "Sessioni di coaching EA FC, individuali e di gruppo, con un 2x campione italiano ed ex pro player." },
    en: { title: "EA FC Coaching with Fabio Denuzzo", description: "One-to-one and group EA FC coaching sessions with a 2x Italian champion and former pro player." },
  },
  {
    path: "/newsletter", bilingual: true, type: "website",
    it: { title: "Newsletter EA FC e Scuola Denuzzo", description: "Articoli, leak e guide EA FC, piu la Scuola Denuzzo: impara a giocare con le guide del coach." },
    en: { title: "EA FC Newsletter & Denuzzo School", description: "EA FC articles, leaks and guides, plus Denuzzo School: learn to play with the coach's guides." },
  },
  {
    path: "/privacy", bilingual: true, type: "website",
    it: { title: "Privacy — Denuzzo Gaming", description: "Informativa sulla privacy di Denuzzo Gaming." },
    en: { title: "Privacy — Denuzzo Gaming", description: "Denuzzo Gaming privacy policy." },
  },
];

// ── Costruzione descrittori di rotta (uno per ogni file HTML da generare) ──
const enPathOf = (itPath) => (itPath === "/" ? "/en" : "/en" + itPath);
const routes = [];

const pushPair = ({ itPath, type, image, bilingual, it, en }) => {
  const canonicalIt = SITE + itPath;
  const canonicalEn = SITE + enPathOf(itPath);
  routes.push({ path: itPath, url: canonicalIt, canonicalIt, canonicalEn, lang: "it", title: it.title, description: it.description, image, type, bilingual });
  if (bilingual) {
    routes.push({ path: enPathOf(itPath), url: canonicalEn, canonicalIt, canonicalEn, lang: "en", title: (en && en.title) || it.title, description: (en && en.description) || it.description, image, type, bilingual });
  }
};

for (const p of PAGES) pushPair({ itPath: p.path, type: p.type, image: undefined, bilingual: p.bilingual, it: p.it, en: p.en });
for (const a of articles) {
  pushPair({
    itPath: `/newsletter/${a.slug}`,
    type: "article",
    image: a.heroImage,
    bilingual: a.hasEn,
    it: { title: a.title, description: a.description },
    en: { title: a.enTitle, description: a.enDescription },
  });
}

// ── Helpers ──
const esc = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function metaBlock(r) {
  const img = r.image ? (r.image.startsWith("http") ? r.image : SITE + r.image) : OG_DEFAULT;
  const t = esc(r.title);
  const d = esc(r.description);
  const u = esc(r.url);
  const im = esc(img);
  const rh = 'data-prerender="true"';
  const lines = [
    `<title ${rh}>${t}</title>`,
    `<meta ${rh} name="description" content="${d}" />`,
    `<meta ${rh} name="robots" content="index, follow" />`,
    `<link ${rh} rel="canonical" href="${u}" />`,
  ];
  if (r.bilingual) {
    lines.push(`<link ${rh} rel="alternate" hreflang="it" href="${esc(r.canonicalIt)}" />`);
    lines.push(`<link ${rh} rel="alternate" hreflang="en" href="${esc(r.canonicalEn)}" />`);
    lines.push(`<link ${rh} rel="alternate" hreflang="x-default" href="${esc(r.canonicalIt)}" />`);
  }
  lines.push(`<meta ${rh} property="og:type" content="${esc(r.type)}" />`);
  lines.push(`<meta ${rh} property="og:url" content="${u}" />`);
  lines.push(`<meta ${rh} property="og:title" content="${t}" />`);
  lines.push(`<meta ${rh} property="og:description" content="${d}" />`);
  lines.push(`<meta ${rh} property="og:image" content="${im}" />`);
  lines.push(`<meta ${rh} property="og:locale" content="${r.lang === "en" ? "en_US" : "it_IT"}" />`);
  lines.push(`<meta ${rh} name="twitter:card" content="summary_large_image" />`);
  lines.push(`<meta ${rh} name="twitter:title" content="${t}" />`);
  lines.push(`<meta ${rh} name="twitter:description" content="${d}" />`);
  lines.push(`<meta ${rh} name="twitter:image" content="${im}" />`);
  return lines.join("\n    ");
}

// ── Scrittura dei file ──
let count = 0;
for (const r of routes) {
  const html = indexHtml.replace("</head>", `    ${metaBlock(r)}\n  </head>`);
  const outFile = r.path === "/" ? join(dist, "index.html") : join(dist, r.path.replace(/^\//, "") + ".html");
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html);
  count++;
}

console.log(`prerender-routes: ${count} rotte generate come HTML statico (HTTP 200 + meta SEO/social per-pagina)`);
