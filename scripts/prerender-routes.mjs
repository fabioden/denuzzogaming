// Genera un file HTML statico per ogni rotta della SPA, così GitHub Pages le serve
// con HTTP 200 invece del fallback 404.html (che dava status 404 → Google non indicizza).
// Gira come "postbuild", dopo `vite build`, sulla cartella dist/.
// La lista rotte rispecchia gen-sitemap.mjs.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist");

const indexHtml = readFileSync(join(dist, "index.html"), "utf8");

// Articoli (slug + se hanno il blocco EN), stesso parsing della sitemap.
const src = readFileSync(join(root, "src/content/articles.ts"), "utf8");
const slugMatches = [...src.matchAll(/\n\s*slug:\s*"([a-z0-9-]+)"/g)];
const articles = slugMatches.map((m, i) => {
  const start = m.index;
  const end = i + 1 < slugMatches.length ? slugMatches[i + 1].index : src.length;
  const chunk = src.slice(start, end);
  return { slug: m[1], hasEn: /\n\s*en:\s*\{/.test(chunk) };
});

// Pagine statiche bilingui (come la sitemap). /business/* sono già file statici reali → esclusi.
const pages = [
  { path: "/gaming", bilingual: true },
  { path: "/coaching", bilingual: true },
  { path: "/newsletter", bilingual: true },
  { path: "/privacy", bilingual: true },
];

const routes = new Set();
routes.add("/en"); // hub inglese
for (const p of pages) {
  routes.add(p.path);
  if (p.bilingual) routes.add("/en" + p.path);
}
for (const a of articles) {
  routes.add(`/newsletter/${a.slug}`);
  if (a.hasEn) routes.add(`/en/newsletter/${a.slug}`);
}

let count = 0;
for (const route of routes) {
  const rel = route.replace(/^\//, ""); // es. "newsletter/slug"
  const outFile = join(dist, rel + ".html"); // GitHub Pages serve /newsletter/slug da newsletter/slug.html (200)
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, indexHtml);
  count++;
}

console.log(`prerender-routes: ${count} rotte generate come HTML statico (HTTP 200 su GitHub Pages)`);
