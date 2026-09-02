// Risultati reali degli allievi. Aggiungere qui SOLO frasi vere (con ok dell'allievo): è la leva di credibilità.
const TESTIMONIALS = [
  {
    name: "Domenico",
    result: "Div 6-7 → quasi Div 1",
    quote: "Ero fermo in Division 6-7. Ora sono a un passo dalla Division 1, e solo grazie a Fabio.",
  },
  // { name: "...", result: "Div X → Elite", quote: "..." },
];

export default function Testimonials() {
  const cols = TESTIMONIALS.length > 1 ? "sm:grid-cols-2" : "max-w-[640px] mx-auto";
  return (
    <div className={`grid grid-cols-1 ${cols} gap-4`}>
      {TESTIMONIALS.map((t) => (
        <figure key={t.name} className="rounded-[var(--radius-card)] border border-line-2 bg-[#120f0a]/60 p-5 sm:p-6">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gold/[.12] border border-gold/30 text-gold text-[.84rem] font-semibold mb-3">
            {t.result}
          </span>
          <blockquote className="font-display text-ink text-[clamp(1.05rem,2vw,1.3rem)] leading-snug">“{t.quote}”</blockquote>
          <figcaption className="flex items-center gap-2.5 mt-4">
            <span className="w-8 h-8 rounded-full bg-gold text-gold-contrast grid place-items-center font-display text-[.95rem]">{t.name[0]}</span>
            <span className="text-ink-2 text-[.95rem]">{t.name}, allievo di Fabio</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
