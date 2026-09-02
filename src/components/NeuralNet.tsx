import { useEffect, useRef } from "react";

// Rete neurale VIVA su canvas: nodi che derivano, linee tra i vicini (sinapsi), reattività al mouse, nodi che brillano.
// È l'effetto "network" premium, non linee SVG statiche. Sfondo della mappa piattaforma.
type P = { x: number; y: number; vx: number; vy: number; r: number };

export default function NeuralNet({ className = "", count = 46 }: { className?: string; count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0;
    let pts: P[] = [];
    const mouse = { x: -9999, y: -9999 };
    const LINK = 120; // distanza max per disegnare una sinapsi
    const MOUSE = 150;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const init = () => {
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 0.7,
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(214,162,26,${(1 - d / LINK) * 0.34})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < MOUSE) {
          ctx.strokeStyle = `rgba(243,198,74,${(1 - md / MOUSE) * 0.6})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      for (const p of pts) {
        const near = Math.hypot(p.x - mouse.x, p.y - mouse.y) < MOUSE;
        ctx.beginPath();
        ctx.arc(p.x, p.y, near ? p.r + 0.8 : p.r, 0, Math.PI * 2);
        ctx.fillStyle = near ? "rgba(255,235,170,.95)" : "rgba(243,198,74,.8)";
        ctx.shadowColor = "rgba(243,198,74,.85)";
        ctx.shadowBlur = near ? 10 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };
    const loop = () => { draw(); raf = requestAnimationFrame(loop); };

    resize(); init();
    if (reduce) draw();
    else loop();

    const onMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [count]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
