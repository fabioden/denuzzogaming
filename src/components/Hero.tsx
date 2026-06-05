import { Fragment } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { hero } from "@/content";
import Pic from "@/components/Pic";
import CountUp from "@/components/reactbits/CountUp";
import Tilt from "@/components/reactbits/Tilt";

export default function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay },
  });

  // "Fabio Denuzzo" → "Fabio" + cognome in corsivo oro (momento d'autore)
  const [firstName, ...restName] = hero.name.split(" ");
  const lastName = restName.join(" ");

  return (
    <section className="relative min-h-screen flex items-center max-w-[1200px] mx-auto px-[clamp(24px,5vw,64px)] pt-[clamp(112px,15vh,170px)] pb-[clamp(48px,8vh,90px)]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-[clamp(40px,5vw,84px)] w-full">
        {/* LEFT — presentazione */}
        <div className="max-w-[560px]">
          <motion.div {...rise(0)} className="flex w-fit items-center gap-2.5 mb-7 px-3.5 py-1.5 rounded-full border border-line bg-white/[.02] font-mono text-[10px] tracking-[.18em] uppercase text-ink-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" style={{ animation: "livePulse 2.4s infinite" }} />
            Disponibile per coaching · risposta in 24h
          </motion.div>

          <motion.span {...rise(0.06)} className="section-label">{hero.eyebrow}</motion.span>

          <h1 className="font-display font-medium text-[clamp(2.8rem,6.6vw,4.8rem)] leading-[1.0] tracking-[-0.015em] mb-7 text-ink">
            <motion.span {...rise(0.1)} className="block">{firstName}</motion.span>
            {lastName && <motion.span {...rise(0.18)} className="block italic text-gold-on-dark">{lastName}</motion.span>}
          </h1>

          <motion.p {...rise(0.26)} className="text-[1.08rem] text-ink-2 leading-relaxed mb-10 max-w-[44ch]">{hero.intro}</motion.p>

          {/* STAT — contatori animati, senza icone, oro come accento minimo */}
          <motion.div {...rise(0.36)} className="flex items-stretch mb-11">
            {hero.stats.map((s, i) => (
              <Fragment key={s.label}>
                {i > 0 && <span className="w-px self-stretch bg-line mx-[clamp(14px,3vw,40px)] my-1.5" />}
                <div className="flex-1 min-w-0">
                  <div className="font-display text-[clamp(1.8rem,3.4vw,3rem)] font-medium leading-none flex items-baseline text-ink nums">
                    <CountUp to={s.to} duration={1.6} startOnMount />
                    <span className="text-gold ml-1 text-[0.5em] font-mono font-medium">{s.suffix}</span>
                  </div>
                  <div className="font-mono text-[9px] sm:text-[10px] tracking-[.14em] sm:tracking-[.2em] uppercase text-muted mt-3 leading-tight">{s.label}</div>
                </div>
              </Fragment>
            ))}
          </motion.div>

          <motion.div {...rise(0.46)} className="flex flex-wrap items-center gap-4">
            <Link to={hero.ctaPrimary.href} className="btn-primary">{hero.ctaPrimary.label}</Link>
            <a href={hero.ctaSecondary.href} target="_blank" rel="noopener noreferrer" className="btn-secondary">{hero.ctaSecondary.label}</a>
          </motion.div>
        </div>

        {/* RIGHT — ritratto incorniciato */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: 36, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative"
        >
          <Tilt className="relative" amplitude={5} radius={16}>
            <div className="relative rounded-[16px] overflow-hidden aspect-[4/5] border border-gold/15 bg-card shadow-[0_44px_110px_-34px_rgba(0,0,0,.9)]">
              <Pic base={hero.img.base} alt={hero.img.alt} eager sizes="(max-width: 1024px) 90vw, 520px" className="w-full h-full object-cover object-[66%_22%]" />
              {/* gradiente: integra i loghi del media-wall e dà profondità */}
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/30 pointer-events-none" />
              <span className="absolute inset-0 rounded-[16px] ring-1 ring-inset ring-white/[.06] pointer-events-none" />
            </div>
          </Tilt>
          <span className="absolute -bottom-3 left-10 right-10 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1.5 scroll-cue text-muted pointer-events-none">
        <span className="font-mono text-[10px] tracking-[.22em] uppercase">Scopri</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
      </div>
    </section>
  );
}
