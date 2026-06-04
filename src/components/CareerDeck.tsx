import { career } from "@/content";
import Tilt from "@/components/reactbits/Tilt";

const wrap = "max-w-[1180px] mx-auto px-[clamp(24px,5vw,64px)]";

export default function CareerDeck() {
  return (
    <section className="py-[clamp(64px,9vh,120px)]" id="palmares">
      <div className={wrap}>
        <div className="mb-[clamp(28px,4vh,48px)] fade-up">
          <span className="section-label">Carriera · Palmares</span>
          <h2 className="text-[clamp(2rem,5vw,3.4rem)] leading-[1.05]">Costruito sul campo, una stagione alla volta</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {career.map((c) => (
            <Tilt key={c.year + c.title} amplitude={10} radius={16} className="fade-up">
              <div className="relative aspect-[4/5] rounded-[16px] p-7 flex flex-col border border-gold/25 bg-gradient-to-b from-[#1c1407] to-[#0a0a0f] overflow-hidden shadow-[0_24px_60px_-22px_rgba(0,0,0,.85)]">
                <span className="absolute top-0 right-0 w-24 h-24 bg-gold/15 [clip-path:polygon(100%_0,0_0,100%_100%)]" />
                <div className="font-display text-[clamp(2.6rem,5vw,4rem)] font-bold text-gold leading-none tabular-nums">{c.year}</div>
                <div className="font-mono text-[11px] tracking-[.22em] uppercase text-gold-light/80 mt-3">{c.type}</div>
                <div className="mt-auto">
                  <div className="font-display text-[clamp(1.3rem,2vw,1.85rem)] font-semibold text-ink leading-tight">{c.title}</div>
                  <div className="font-mono text-[12px] text-muted mt-2">{c.sub}</div>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
