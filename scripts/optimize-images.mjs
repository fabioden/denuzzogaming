// Comprime + ridimensiona le immagini articoli (e diabete) in-place.
// Lanciare a mano dopo aver aggiunto nuove immagini: node scripts/optimize-images.mjs
import sharp from "sharp";
import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const DIRS = ["public/img/articles", "public/img/diabete"];
const MAX_W = 1280; // gli articoli si vedono a ~760px: 1280 dà margine retina
const QUALITY = 82;

let before = 0,
  after = 0;
for (const dir of DIRS) {
  if (!existsSync(dir)) continue;
  const files = readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f));
  for (const f of files) {
    const p = join(dir, f);
    const input = readFileSync(p);
    const meta = await sharp(input).metadata();
    const out = await sharp(input)
      .resize({ width: MAX_W, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toBuffer();
    // riscrivi solo se l'output è più piccolo
    if (out.length < input.length) writeFileSync(p, out);
    before += input.length;
    after += Math.min(out.length, input.length);
    console.log(
      `${f}  ${meta.width}x${meta.height}  ${(input.length / 1024).toFixed(0)}KB → ${(Math.min(out.length, input.length) / 1024).toFixed(0)}KB`,
    );
  }
}
console.log(
  `\nTOTALE: ${(before / 1048576).toFixed(2)}MB → ${(after / 1048576).toFixed(2)}MB  (-${(100 - (after / before) * 100).toFixed(0)}%)`,
);
