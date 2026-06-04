// Tilt 3D riutilizzabile (basato su React Bits TiltedCard) — tilt + scale + glare oro.
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { SpringOptions } from "motion/react";

const spring: SpringOptions = { damping: 28, stiffness: 120, mass: 1.3 };

export default function Tilt({
  children,
  className = "",
  amplitude = 9,
  scaleOnHover = 1.03,
  glare = true,
  radius = 14,
}: {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  scaleOnHover?: number;
  glare?: boolean;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), spring);
  const ry = useSpring(useMotionValue(0), spring);
  const scale = useSpring(1, spring);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glareOpacity = useSpring(0, spring);
  const glareBg = useTransform(
    () => `radial-gradient(circle at ${gx.get()}% ${gy.get()}%, rgba(214,162,26,0.20), transparent 55%)`
  );

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const ox = e.clientX - r.left - r.width / 2;
    const oy = e.clientY - r.top - r.height / 2;
    rx.set((oy / (r.height / 2)) * -amplitude);
    ry.set((ox / (r.width / 2)) * amplitude);
    gx.set(((e.clientX - r.left) / r.width) * 100);
    gy.set(((e.clientY - r.top) / r.height) * 100);
  }
  function onEnter() {
    scale.set(scaleOnHover);
    glareOpacity.set(1);
  }
  function onLeave() {
    scale.set(1);
    rx.set(0);
    ry.set(0);
    glareOpacity.set(0);
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseEnter={onEnter} onMouseLeave={onLeave} className={`[perspective:900px] ${className}`}>
      <motion.div className="relative will-change-transform [transform-style:preserve-3d]" style={{ rotateX: rx, rotateY: ry, scale }}>
        {children}
        {glare && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{ background: glareBg, opacity: glareOpacity, borderRadius: radius }}
          />
        )}
      </motion.div>
    </div>
  );
}
