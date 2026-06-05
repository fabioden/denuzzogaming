import { useEffect, useRef } from "react";

/**
 * Bagliore dorato morbido che segue il cursore (con inerzia).
 * Disattivato su touch e con prefers-reduced-motion. Dà la sensazione di sito "vivo".
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const el = ref.current;
    if (!el || reduce || !fine) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight * 0.3;
    let tx = x;
    let ty = y;
    let raf = 0;
    let shown = false;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        shown = true;
        el.style.opacity = "1";
      }
    };

    const tick = () => {
      x += (tx - x) * 0.1;
      y += (ty - y) * 0.1;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
