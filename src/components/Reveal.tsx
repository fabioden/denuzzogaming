import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Dir = "up" | "left" | "right";

const offset: Record<Dir, { x?: number; y?: number }> = {
  up: { y: 30 },
  left: { x: -44 },
  right: { x: 44 },
};

/**
 * Reveal: contenuto che entra in scena allo scroll (stile React Bits "AnimatedContent").
 * Rispetta prefers-reduced-motion.
 */
export default function Reveal({
  children,
  dir = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  dir?: Dir;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const from = reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(8px)", ...offset[dir] };

  return (
    <motion.div
      className={className}
      initial={from}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
