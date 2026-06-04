// Marquee credenziali — CSS puro, leggero. Scorre in loop con dissolvenza ai bordi.
export default function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee__track">
        {row.map((t, i) => (
          <span key={i} className="marquee__item">{t}</span>
        ))}
      </div>
    </div>
  );
}
