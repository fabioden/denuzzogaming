import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Aurora from "@/components/reactbits/Aurora";

// Aurora oro, coerente su tutte le pagine. Varia solo l'intensità per pagina.
const GOLD = ["#140d02", "#d6a21a", "#140d02"];

export default function SiteBackground() {
  const { pathname } = useLocation();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    setEnabled(!reduce && !small);
  }, []);

  // Aurora più presente e in movimento (lo sfondo "vive"); lo sfondo materiale è dato dal body
  const opacity = pathname === "/" ? 0.55 : pathname.startsWith("/privacy") ? 0.22 : 0.36;

  return (
    <div className="fixed top-0 left-0 w-full h-[85vh] -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        className="w-full h-full [mask-image:linear-gradient(to_bottom,black_0%,black_36%,transparent_100%)] transition-opacity duration-700"
        style={{ opacity }}
      >
        {enabled ? (
          <Aurora colorStops={GOLD} amplitude={1.1} blend={0.55} speed={0.45} />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: "radial-gradient(60% 60% at 50% 0%, rgba(214,162,26,0.16), transparent 70%)" }}
          />
        )}
      </div>
    </div>
  );
}
