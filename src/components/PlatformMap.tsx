import { useNavigate } from "react-router-dom";
import NeuralNet from "@/components/NeuralNet";

// Mappa "a rete neurale" = guida VISIVA della piattaforma. I nodi portano DRITTI alla sezione (niente click-dettaglio).
// La spiegazione chiara e semplice delle aree sta sotto, nella Home (lista pulita).
type Go = (nav: ReturnType<typeof useNavigate>, openDash: () => void) => void;
type AreaNode = { key: string; n: number; title: string; desc: string; x: number; y: number; go: Go };

const NODES: AreaNode[] = [
  { key: "allenamenti", n: 1, title: "Allenamenti", desc: "I video che ti insegnano, uno alla volta.", x: 17, y: 24, go: (nav) => nav("/account/allenamenti") },
  { key: "settimana", n: 2, title: "Questa settimana", desc: "Le mosse giuste del momento.", x: 83, y: 24, go: (nav) => nav("/account/settimana") },
  { key: "dashboard", n: 3, title: "La tua dashboard", desc: "I tuoi numeri e la classifica.", x: 17, y: 76, go: (_nav, openDash) => openDash() },
  { key: "coaching", n: 4, title: "Coaching 1:1", desc: "Fabio ti segue fino in Elite.", x: 83, y: 76, go: (nav) => nav("/account/coaching") },
];
const C = { x: 50, y: 50 };

export default function PlatformMap({ onOpenDashboard }: { onOpenDashboard: () => void }) {
  const navigate = useNavigate();
  const open = (nd: AreaNode) => nd.go(navigate, onOpenDashboard);

  return (
    <section>
      <span className="section-label block mb-1">La piattaforma in un colpo d'occhio</span>
      <p className="text-ink-2 text-[.97rem] mb-4 max-w-[62ch]">Tutto ruota intorno al tuo percorso. Tocca un'area per aprirla.</p>

      {/* GRAFO (schermi larghi): rete neurale viva + 4 aree cliccabili */}
      <div className="relative hidden lg:block h-[440px] rounded-[var(--radius-card)] border border-gold/15 bg-[#120f0a]/60 overflow-hidden">
        <NeuralNet className="absolute inset-0 w-full h-full" />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: "radial-gradient(46% 58% at 50% 50%, rgba(214,162,26,.10), transparent 70%)" }} />

        {/* centro: il tuo percorso */}
        <button
          onClick={() => navigate("/account/percorso")}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ left: `${C.x}%`, top: `${C.y}%` }}
          aria-label="Il mio percorso"
        >
          <span className="net-pulse block w-[112px] h-[112px] rounded-full grid place-items-center text-center border border-gold/45 bg-[radial-gradient(circle_at_50%_35%,#241b0e,#120f0a)] shadow-[0_0_40px_-8px_rgba(214,162,26,.5)]">
            <span>
              <span className="block text-[11px] font-bold tracking-[.2em] text-gold/80 uppercase">Tu sei qui</span>
              <span className="block font-display text-ink text-[.97rem] leading-tight mt-0.5">Il mio<br />percorso</span>
            </span>
          </span>
        </button>

        {/* nodi: portano dritti alla sezione */}
        {NODES.map((nd) => (
          <button
            key={nd.key}
            onClick={() => open(nd)}
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 w-[226px] text-left rounded-[12px] border border-gold/20 bg-[#181510] hover:border-gold/55 hover:bg-[#1e1813] hover:shadow-[0_0_22px_-7px_rgba(214,162,26,.5)] transition-all p-3.5"
            style={{ left: `${nd.x}%`, top: `${nd.y}%` }}
          >
            <span className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 shrink-0 rounded-full bg-gold text-gold-contrast grid place-items-center font-display text-[.86rem]">{nd.n}</span>
              <span className="font-display text-ink text-[1rem]">{nd.title}</span>
            </span>
            <span className="block text-ink-2 text-[.88rem] leading-snug">{nd.desc}</span>
          </button>
        ))}
      </div>

      {/* COLONNA (mobile/tablet) */}
      <div className="lg:hidden relative pl-5">
        <span className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/50 via-gold/25 to-gold/50" aria-hidden="true" />
        <div className="flex flex-col gap-2.5">
          <button onClick={() => navigate("/account/percorso")} className="group relative text-left rounded-[12px] border border-gold/40 bg-gold/[.05] hover:border-gold transition-all p-3.5">
            <span className="absolute -left-[19px] top-4 w-2.5 h-2.5 rounded-full bg-gold ring-4 ring-[#100d08]" aria-hidden="true" />
            <span className="text-[11px] font-bold tracking-[.18em] text-gold/80 uppercase">Tu sei qui</span>
            <span className="block font-display text-ink text-[1rem]">Il mio percorso</span>
          </button>
          {NODES.map((nd) => (
            <button key={nd.key} onClick={() => open(nd)} className="group relative text-left rounded-[12px] border border-gold/20 bg-[#181510] hover:border-gold/55 transition-all p-3.5">
              <span className="absolute -left-[19px] top-4 w-2.5 h-2.5 rounded-full bg-gold ring-4 ring-[#100d08]" aria-hidden="true" />
              <span className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 shrink-0 rounded-full bg-gold text-gold-contrast grid place-items-center font-display text-[.86rem]">{nd.n}</span>
                <span className="font-display text-ink text-[1rem]">{nd.title}</span>
              </span>
              <span className="block text-ink-2 text-[.88rem] leading-snug">{nd.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
