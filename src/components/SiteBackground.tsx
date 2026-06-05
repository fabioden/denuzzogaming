import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Lightfall from "@/components/reactbits/Lightfall";

// Lightfall in oro, coerente su tutte le pagine. Varia solo l'intensità per pagina.
const GOLD = ["#ecc074", "#d6a21a", "#b8860b"];

export default function SiteBackground() {
  const { pathname } = useLocation();
  const [enabled, setEnabled] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!reduce);
    setMobile(window.innerWidth < 768);
  }, []);

  // Sottilissimo ovunque; su mobile ancora più tenue e leggero
  const opacity = mobile
    ? pathname === "/"
      ? 0.14
      : 0.1
    : pathname === "/"
      ? 0.2
      : pathname.startsWith("/privacy")
        ? 0.08
        : 0.13;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -3 }} aria-hidden="true">
      <div className="w-full h-full transition-opacity duration-700" style={{ opacity }}>
        {enabled ? (
          <Lightfall
            className="w-full h-full"
            colors={GOLD}
            backgroundColor="#0e0c0d"
            speed={0.26}
            streakCount={mobile ? 1 : 2}
            streakWidth={1}
            streakLength={1}
            glow={mobile ? 0.45 : 0.5}
            density={mobile ? 0.35 : 0.4}
            twinkle={0.25}
            zoom={3}
            backgroundGlow={0.2}
            opacity={mobile ? 0.45 : 0.5}
            mouseInteraction={!mobile}
            mouseStrength={0.3}
            mouseRadius={0.9}
            mixBlendMode="screen"
            dpr={mobile ? 1 : 1.5}
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
