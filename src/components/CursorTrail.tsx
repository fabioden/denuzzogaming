import { useEffect, useRef } from "react";

/**
 * Scia dorata tipo "contrail": un dot segue il cursore e lascia dietro
 * una linea affusolata che si dissolve quando ci si ferma.
 * Canvas full-screen, pointer-events none. Disattivato su touch / reduced-motion.
 */
export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 20;
    const mouse = { x: w / 2, y: h / 2 };
    let active = false;
    const pts = Array.from({ length: N }, () => ({ x: mouse.x, y: mouse.y }));

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      active = true;
    };
    // pointermove copre sia mouse (desktop) che dito (mobile/touch)
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const tick = () => {
      pts[0].x += (mouse.x - pts[0].x) * 0.34;
      pts[0].y += (mouse.y - pts[0].y) * 0.34;
      for (let i = 1; i < N; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.42;
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.42;
      }

      ctx.clearRect(0, 0, w, h);
      if (active) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = "rgba(214,162,26,0.55)";
        for (let i = 1; i < N; i++) {
          const t = 1 - i / N; // 1 testa -> 0 coda
          ctx.beginPath();
          ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
          ctx.lineTo(pts[i].x, pts[i].y);
          ctx.strokeStyle = `rgba(233,184,66,${0.55 * t})`;
          ctx.lineWidth = 4.5 * t + 0.4;
          ctx.shadowBlur = 7 * t;
          ctx.stroke();
        }
        // dot di testa
        ctx.shadowBlur = 12;
        ctx.fillStyle = "rgba(247,214,128,0.95)";
        ctx.beginPath();
        ctx.arc(pts[0].x, pts[0].y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />;
}
