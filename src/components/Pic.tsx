/** Immagine responsive WebP/AVIF generata da .planning/scripts/optimize-images.mjs */
export default function Pic({
  base,
  alt,
  className,
  sizes = "(max-width: 1024px) 90vw, 520px",
  eager = false,
}: {
  base: string; // es. "juventus" → /img/juventus-{480,960,1440}.{webp,avif}
  alt: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
}) {
  const set = (ext: string) =>
    `/img/${base}-480.${ext} 480w, /img/${base}-960.${ext} 960w, /img/${base}-1440.${ext} 1440w`;
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={`/img/${base}-960.webp`}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        className={className}
      />
    </picture>
  );
}
