// Doppia elica del DNA in DIAGONALE che taglia tutto lo sfondo del sito.
// Filamenti verde uniforme luminoso + glow (niente gradiente verticale, che
// creava una striscia orizzontale). Accenti glicemia solo sui gradini radi.
// Tutto ruotato di un angolo → le eliche e i gradini sono diagonali, non dritti.
// Canvas 2D: leggero, niente WebGL. Disegna SEMPRE un frame sincrono (al mount e
// a ogni resize) così non resta mai vuoto anche se l'rAF è in pausa; l'rAF anima.
import { useEffect, useRef } from 'react';

const BASE_COLORS = ['#6cc79a', '#a6e0c2', '#e0cd86', '#e8ad96']; // accenti soft
const ANGLE = (-22 * Math.PI) / 180; // inclinazione diagonale

export default function DnaHelix({
  className,
  spacing = 360, // distanza tra un'elica e l'altra (più rade = più soft)
  amplitude = 66, // ampiezza dei filamenti
  speed = 1,
}: {
  className?: string;
  spacing?: number;
  amplitude?: number;
  speed?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const wavelength = 240;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;

    function resize() {
      // fallback al viewport: evita il canvas 1px se il parent misura 0 al mount
      w = parent!.clientWidth || window.innerWidth || 1;
      h = parent!.clientHeight || window.innerHeight || 1;
      canvas!.width = Math.max(1, Math.floor(w * dpr));
      canvas!.height = Math.max(1, Math.floor(h * dpr));
      canvas!.style.width = w + 'px';
      canvas!.style.height = h + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // un filamento, disegnato nel sistema RUOTATO: avanza lungo l'asse locale u,
    // oscilla in orizzontale locale → dopo la rotazione è diagonale.
    function strand(cx: number, dir: number, phase: number, half: number) {
      ctx!.beginPath();
      for (let u = -half; u <= half; u += 6) {
        const a = (u / wavelength) * Math.PI * 2 + phase;
        const x = cx + Math.sin(a) * amplitude * dir;
        if (u <= -half) ctx!.moveTo(x, u);
        else ctx!.lineTo(x, u);
      }
      ctx!.stroke();
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h);
      const phase = reduce ? 0.6 : t * 0.00035 * speed;

      ctx!.save();
      ctx!.translate(w / 2, h / 2);
      ctx!.rotate(ANGLE);
      ctx!.lineCap = 'round';

      const half = Math.hypot(w, h) / 2 + spacing; // copre oltre gli angoli
      const n = Math.ceil((half * 2) / spacing) + 1;

      for (let k = 0; k < n; k++) {
        const cx = -half + k * spacing + (k % 2 ? amplitude * 0.5 : 0);
        const kphase = phase + k * 0.6;

        // GLOW: alone verde molto tenue (soft)
        ctx!.strokeStyle = '#7fd9ad';
        ctx!.lineWidth = 5;
        ctx!.globalAlpha = 0.08;
        strand(cx, +1, kphase, half);
        strand(cx, -1, kphase, half);
        // CORE: verde tenue, linee sottili (leggero, professionale)
        ctx!.strokeStyle = '#4bb487';
        ctx!.lineWidth = 1.4;
        ctx!.globalAlpha = 0.4;
        strand(cx, +1, kphase, half);
        strand(cx, -1, kphase, half);

        // gradini radi e sfumati (basi), accenti glicemia soft, diagonali
        for (let u = -half; u < half; u += 64) {
          const a = (u / wavelength) * Math.PI * 2 + kphase;
          const x1 = cx + Math.sin(a) * amplitude;
          const x2 = cx - Math.sin(a) * amplitude;
          ctx!.strokeStyle = BASE_COLORS[Math.floor((u + k * 30) / 64 + 10000) % BASE_COLORS.length];
          ctx!.globalAlpha = 0.04 + Math.abs(Math.sin(a)) * 0.12;
          ctx!.lineWidth = 1.3;
          ctx!.beginPath();
          ctx!.moveTo(x1, u);
          ctx!.lineTo(x2, u);
          ctx!.stroke();
        }
      }

      ctx!.globalAlpha = 1;
      ctx!.restore();
    }

    resize();
    draw(0); // frame iniziale SINCRONO
    const ro = new ResizeObserver(() => {
      resize();
      draw(0);
    });
    ro.observe(parent);

    let raf = 0;
    if (!reduce) {
      const loop = (t: number) => {
        raf = requestAnimationFrame(loop);
        draw(t);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spacing, amplitude, speed]);

  return <canvas ref={ref} className={className} />;
}
