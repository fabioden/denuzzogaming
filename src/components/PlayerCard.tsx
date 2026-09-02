import { useEffect, useState } from "react";
import Tilt from "@/components/reactbits/Tilt";
import type { DashboardData } from "@/hooks/useDashboardData";

// Ordine dei livelli: serve a capire quando l'utente SALE (e solo allora si festeggia).
const TIER_ORDER = ["ROOKIE", "ADVANCED", "PRO", "ELITE"];
const TIER_KEY = "academy_lasttier";

type Update = (p: Partial<DashboardData>) => void;

// Carica la foto dell'utente, la ridimensiona (max 480px) e la salva come data URL leggero. Niente webcam.
function handleFile(file: File, data: DashboardData, update: Update) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const max = 480;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d")?.drawImage(img, 0, 0, w, h);
      update({ profile: { ...data.profile, photo: canvas.toDataURL("image/jpeg", 0.82) } });
    };
    img.src = reader.result as string;
  };
  reader.readAsDataURL(file);
}

// Card dell'utente, look della card di Fabio ma dati dinamici. Tilt 3D + riflesso oro + sheen metallico.
export default function PlayerCard({ data, update, rating }: { data: DashboardData; update: Update; rating: number }) {
  const p = data.profile;
  const tier = rating >= 90 ? "ELITE" : rating >= 78 ? "PRO" : rating >= 62 ? "ADVANCED" : "ROOKIE";
  const id = p.gamertag ? String(1000 + ([...p.gamertag].reduce((a, c) => a + c.charCodeAt(0), 0) % 9000)).padStart(4, "0") : "0000";

  // Momento wow: festeggia solo quando il livello SALE rispetto all'ultima volta vista.
  const tierIdx = TIER_ORDER.indexOf(tier);
  const [levelUp, setLevelUp] = useState(false);
  useEffect(() => {
    if (tierIdx < 0) return;
    let prev = -1;
    try {
      const v = localStorage.getItem(TIER_KEY);
      prev = v === null ? -1 : Number(v);
    } catch {
      /* ignore */
    }
    // Primo avvio: fissa la base senza festeggiare.
    if (prev === -1 || tierIdx <= prev) {
      try {
        localStorage.setItem(TIER_KEY, String(tierIdx));
      } catch {
        /* ignore */
      }
      return;
    }
    // Salito di livello: celebra una volta e aggiorna la base.
    setLevelUp(true);
    try {
      localStorage.setItem(TIER_KEY, String(tierIdx));
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => setLevelUp(false), 2600);
    return () => clearTimeout(t);
  }, [tierIdx]);

  return (
    <Tilt radius={16} amplitude={9} scaleOnHover={1.03} className="mx-auto w-full max-w-[196px]">
      <div className="relative rounded-[16px] overflow-hidden border border-gold/30 shadow-[0_24px_60px_-18px_rgba(0,0,0,.75)]" style={{ background: "radial-gradient(120% 80% at 50% 0%, #221a0e 0%, #16110c 55%, #0b0810 100%)" }}>
        {/* header */}
        <div className="flex items-center justify-between px-4 pt-3.5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[.14em] text-gold/85 uppercase">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
            Accesso privato
          </span>
          <img src="/img/fd-mark.png" alt="" className="h-5 w-auto object-contain opacity-90" />
        </div>

        {/* foto + rating */}
        <div className="relative mx-4 mt-3 rounded-[12px] overflow-hidden aspect-[4/5] border border-gold/25 bg-[#0d0a07]">
          <img src={p.photo || "/img/fabio-480.webp"} alt="" className="w-full h-full object-cover object-top" />
          {/* rating badge */}
          <div className={`absolute top-2 left-2.5 text-center drop-shadow-[0_2px_6px_rgba(0,0,0,.7)] ${levelUp ? "reward-pop" : ""}`}>
            <p className="font-display text-gold text-[1.5rem] leading-none">{rating || "—"}</p>
            <p className="text-[10px] font-bold tracking-[.14em] text-gold/85 uppercase mt-0.5">{tier}</p>
          </div>
          {/* upload foto */}
          <label className="absolute bottom-2 right-2 inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide text-ink bg-[#0b0810]/70 border border-gold/30 rounded-full px-2.5 py-1 cursor-pointer hover:border-gold/60 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M12 5v14M5 12h14" /></svg>
            {p.photo ? "Cambia" : "Foto"}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f, data, update); }} />
          </label>
        </div>

        {/* nome */}
        <div className="text-center px-4 mt-3">
          <p className="font-display text-ink text-[1.02rem] leading-tight uppercase tracking-[.02em] truncate">{p.gamertag || "Il tuo nome"}</p>
          <p className="text-gold/80 text-[11px] tracking-[.2em] uppercase mt-0.5">{p.division ? `Div ${p.division}` : "—"}{p.platform ? ` · ${p.platform}` : ""}</p>
        </div>

        {/* footer */}
        <div className="flex items-end justify-between px-4 py-3.5 mt-3 border-t border-gold/15">
          <div>
            <p className="text-[10px] tracking-[.12em] text-muted uppercase">ID Number</p>
            <p className="font-mono text-[13px] text-ink tracking-wide">{id}</p>
          </div>
          <div className="flex items-center gap-2 text-gold/40">
            <span className="font-mono text-[11px] tracking-[.18em] text-ink-2 uppercase">FD Academy</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-6 h-6"><path d="M12 11v3M9 4.5a6 6 0 0 1 9 5.2v1.8M6 9.7A6 6 0 0 1 7 6M6 13a6 6 0 0 0 1 3.3M9 13v1a3 3 0 0 0 .3 1.3M15 13v1.6c0 .8-.1 1.6-.4 2.4M12 13v2a8 8 0 0 0 .5 2.8" /></svg>
          </div>
        </div>

        {/* sheen metallico statico */}
        <span className="pointer-events-none absolute inset-0 mix-blend-overlay" style={{ background: "linear-gradient(135deg, rgba(255,255,255,.26) 0%, rgba(255,255,255,.03) 40%, transparent 50%, rgba(255,255,255,.03) 60%, rgba(255,255,255,.18) 100%)" }} />
        {/* banda di luce che attraversa la card: la fa sembrare viva e di valore */}
        <span className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <span className="sheen-sweep absolute inset-y-0 -left-1/3 w-1/3 mix-blend-overlay" style={{ background: "linear-gradient(105deg, transparent 0%, rgba(255,255,255,.35) 50%, transparent 100%)" }} />
        </span>

        {/* Celebrazione: appare solo quando sali di livello */}
        {levelUp && (
          <div className="reward-ring pointer-events-none absolute inset-0 z-20 grid place-items-center rounded-[16px]" style={{ background: "radial-gradient(72% 60% at 50% 45%, rgba(11,8,16,.8), rgba(11,8,16,.5))" }}>
            <div className="reward-pop text-center px-4">
              <p className="text-[11px] font-bold tracking-[.24em] text-gold uppercase">Livello su</p>
              <p className="font-display text-ink text-[1.6rem] leading-none mt-1.5">{tier}</p>
              <span className="block mt-2.5 mx-auto w-10 h-[2px] bg-gold rounded" />
            </div>
          </div>
        )}
      </div>
    </Tilt>
  );
}
