import { useEffect } from "react";

/**
 * Aggiunge la classe `is-in` agli elementi `.fade-up` quando entrano nel viewport.
 * Motion sobrio in linea con il design Premium Restraint (DEC-004).
 * Passa `dep` (es. pathname) per ri-osservare gli elementi al cambio route.
 */
export function useScrollReveal(dep?: unknown) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".fade-up:not(.is-in)"));
    if (!("IntersectionObserver" in window) || els.length === 0) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}
