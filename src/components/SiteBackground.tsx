import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Lightfall from "@/components/reactbits/Lightfall";

// Lightfall in oro, coerente su tutte le pagine. Varia solo l'intensità per pagina.
const GOLD = ["#ecc074", "#d6a21a", "#b8860b"];

export default function SiteBackground() {
  const { pathname } = useLocation();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    setEnabled(!reduce && !small);
  }, []);

  // Sottile: più presente in home, quasi assente su privacy
  const opacity = pathname === "/" ? 0.46 : pathname.startsWith("/privacy") ? 0.2 : 0.32;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -3 }} aria-hidden="true">
      <div className="w-full h-full transition-opacity duration-700" style={{ opacity }}>
        {enabled ? (
          <Lightfall
            className="w-full h-full"
            colors={GOLD}
            backgroundColor="#0e0c0d"
            speed={0.3}
            streakCount={3}
            streakWidth={1}
            streakLength={1.25}
            glow={0.7}
            density={0.5}
            twinkle={0.4}
            zoom={3}
            backgroundGlow={0.35}
            opacity={0.6}
            mouseInteraction
            mouseStrength={0.4}
            mouseRadius={0.9}
            mixBlendMode="screen"
            dpr={1.5}
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: "radial-gradient(60% 60% at 50% 0%, rgba(214,162,26,0.12), transparent 70%)" }}
          />
        )}
      </div>
    </div>
  );
}
