import { useOutletContext } from "react-router-dom";
import { weeklyDrop, pastDrops } from "@/content/membership";
import { wrap, DropTile, RankedDropTile } from "@/components/academy";
import type { MemberContext } from "@/components/MemberLayout";

export default function Archive() {
  const { isActive } = useOutletContext<MemberContext>();
  const locked = !isActive;
  const ranked = [
    { episode: weeklyDrop.episode, objective: weeklyDrop.objective, isNew: true },
    ...pastDrops.map((d) => ({ episode: d.episode, objective: d.objective, isNew: false })),
  ];

  return (
    <section className="pt-[clamp(24px,4vw,44px)] pb-[clamp(60px,10vh,120px)]">
      <div className={wrap}>
        <span className="section-label">Le meta passate</span>
        <h1 className="font-display text-[clamp(1.6rem,3vw,2.3rem)] text-ink mt-1 mb-1">L'archivio dei numeri</h1>
        <p className="text-ink-2 text-[.95rem] max-w-[52ch]">Le squadre e le soluzioni delle settimane passate, sempre con te finché sei PRO.</p>

        {/* Top: numeroni stile Netflix */}
        <h2 className="font-display text-[clamp(1.2rem,2.2vw,1.5rem)] text-ink mt-[clamp(34px,4.5vw,54px)] mb-4">Le squadre che spaccano</h2>
        <div className="flex gap-2 overflow-x-auto pb-3 pl-1 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {ranked.map((d, i) => (
            <RankedDropTile key={d.episode} rank={i + 1} episode={d.episode} objective={d.objective} isNew={d.isNew} locked={locked} />
          ))}
        </div>

        {/* Tutti i numeri */}
        <h2 className="font-display text-[clamp(1.2rem,2.2vw,1.5rem)] text-ink mt-[clamp(34px,4.5vw,54px)] mb-4">Tutti i numeri</h2>
        <div className="flex flex-wrap gap-4">
          {ranked.map((d) => (
            <DropTile key={d.episode} episode={d.episode} objective={d.objective} isNew={d.isNew} locked={locked} />
          ))}
        </div>
      </div>
    </section>
  );
}
