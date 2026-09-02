// Mini-anteprime grafiche su misura (SVG): contestuali, nitide a ogni schermo, on-brand (nero+oro).
// Sostituiscono le immagini di repertorio: niente bitmap scadenti, solo vettoriale.
type Variant = "video" | "classifica" | "stats";

export default function SectionPreview({ variant, className = "" }: { variant: Variant; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[10px] border border-gold/20 bg-[#0e0b07] ${className}`}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(70% 120% at 50% 0%, rgba(214,162,26,.12), transparent 70%)" }} />
      <svg viewBox="0 0 240 72" preserveAspectRatio="xMidYMid meet" className="relative w-full h-full" aria-hidden="true">
        {variant === "video" && (
          <>
            <rect x="12" y="10" width="216" height="44" rx="7" fill="none" stroke="rgba(214,162,26,.16)" />
            <circle cx="120" cy="32" r="15" fill="#f3c64a" />
            <path d="M115 25 L129 32 L115 39 Z" fill="#181308" />
            <rect x="16" y="61" width="208" height="3" rx="1.5" fill="rgba(214,162,26,.18)" />
            <rect x="16" y="61" width="84" height="3" rx="1.5" fill="#d6a21a" />
            <circle cx="100" cy="62.5" r="3.2" fill="#f3c64a" />
          </>
        )}
        {variant === "classifica" && (
          <>
            {[
              { y: 14, w: 188, c: "#f3c64a", o: 0.9 },
              { y: 34, w: 150, c: "#e6d09a", o: 0.7 },
              { y: 54, w: 112, c: "#d68b3c", o: 0.6 },
            ].map((r, i) => (
              <g key={i}>
                <circle cx="18" cy={r.y + 4} r="6.5" fill={r.c} />
                <rect x="32" y={r.y} width={r.w} height="9" rx="4.5" fill={r.c} opacity={r.o} />
              </g>
            ))}
          </>
        )}
        {variant === "stats" && (
          <>
            <line x1="14" y1="60" x2="226" y2="60" stroke="rgba(214,162,26,.18)" strokeWidth="1" />
            {[
              { x: 26, h: 14 },
              { x: 62, h: 24 },
              { x: 98, h: 20 },
              { x: 134, h: 34 },
              { x: 170, h: 42 },
              { x: 206, h: 50 },
            ].map((b, i, a) => (
              <rect key={i} x={b.x} y={60 - b.h} width="20" height={b.h} rx="3" fill={i === a.length - 1 ? "#f3c64a" : "#d6a21a"} opacity={i === a.length - 1 ? 1 : 0.45 + i * 0.09} />
            ))}
            <circle cx="216" cy="10" r="3.2" fill="#f3c64a" />
          </>
        )}
      </svg>
    </div>
  );
}
