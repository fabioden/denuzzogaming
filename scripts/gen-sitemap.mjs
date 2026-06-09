// Genera public/sitemap.xml automaticamente da articles.ts + le rotte.
// Gira da solo prima di ogni build (npm script "prebuild") → la sitemap non è mai più incompleta.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const SITE = "https://denuzzogaming.com";

// 1) Estrai gli articoli da articles.ts (slug + se hanno il blocco EN), parsing testuale.
const src = readFileSync(join(root, "src/content/articles.ts"), "utf8");
const slugMatches = [...src.matchAll(/\n\s*slug:\s*"([a-z0-9-]+)"/g)];
const articles = slugMatches.map((m, i) => {
  const start = m.index;
  const end = i + 1 < slugMatches.length ? slugMatches[i + 1].index : src.length;
  const chunk = src.slice(start, end);
  return { slug: m[1], hasEn: /\n\s*en:\s*\{/.test(chunk) };
});

// 2) Pagine statiche. bilingual=true → aggiunge anche /en/... (per ora solo gli articoli sono tradotti;
//    le pagine gaming passeranno a true quando i loro contenuti saranno tradotti — Fase 2).
const pages = [
  { path: "/", cf: "weekly", pr: "1.0", bilingual: true }, // hub IT + /en
  { path: "/gaming", cf: "weekly", pr: "0.9", bilingual: true },
  { path: "/coaching", cf: "weekly", pr: "0.8", bilingual: true },
  { path: "/newsletter", cf: "weekly", pr: "0.8", bilingual: true },
  { path: "/privacy", cf: "monthly", pr: "0.4", bilingual: true },
  { path: "/business/", cf: "monthly", pr: "0.8", bilingual: false }, // statico, solo IT
  // /diabete NON in sitemap: non pubblico finché non è pronto (Fase 3)
];

const urls = [];
const add = (path, cf, pr) => urls.push({ loc: SITE + path, cf, pr });

for (const p of pages) {
  add(p.path, p.cf, p.pr);
  // URL inglese: l'hub "/" → "/en" (no doppia barra); le altre → "/en" + path
  if (p.bilingual) add(p.path === "/" ? "/en" : "/en" + p.path, p.cf, p.pr);
}
for (const a of articles) {
  add(`/newsletter/${a.slug}`, "weekly", "0.7");
  if (a.hasEn) add(`/en/newsletter/${a.slug}`, "weekly", "0.7"); // EN solo se tradotto
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.cf}</changefreq>
    <priority>${u.pr}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(join(root, "public/sitemap.xml"), xml);
console.log(
  `sitemap.xml: ${urls.length} URL — ${articles.length} articoli (${articles.filter((a) => a.hasEn).length} con EN)`,
);
