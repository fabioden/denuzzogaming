import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { hero } from "@/content";
import Pic from "@/components/Pic";
import SplitText from "@/components/reactbits/SplitText";
import CountUp from "@/components/reactbits/CountUp";
import Magnet from "@/components/reactbits/Magnet";
import Tilt from "@/components/reactbits/Tilt";
import ShinyText from "@/components/reactbits/ShinyText";

export default function Hero() {
  const reduce = useReducedMotion();

  // Safety net: se l'animazione SplitText non parte (es. rAF throttled),
  // forza i caratteri visibili dopo 1.5s così il titolo non resta mai invisibile.
  useEffect(() => {
    const t = setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".split-char, .split-word").forEach((c) => {
        if (getComputedStyle(c).opacity === "0") {
          c.style.opacity = "1";
          c.style.transform = "none";
        }
      });
    }, 1500);
    return () => clearTimeout(t);
  }, []);
  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
  });

  const statIcons = [
    <svg key="g" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" /></svg>,
    <svg key="t" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" /><path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M9 18h6M10 18v-3M14 18v-3M8 21h8" /></svg>,
    <svg key="u" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 6a3 3 0 0 1 0 6M21 19a5 5 0 0 0-4-4.9" /></svg>,
  ];

  return (
    <section className="relative min-h-screen flex items-center max-w-[1180px] mx-auto px-[clamp(24px,5vw,64px)] pt-[clamp(120px,16vh,180px)] pb-[clamp(48px,8vh,90px)]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-[clamp(40px,5vw,80px)] w-full">
        {/* LEFT — presentazione */}
        <div className="max-w-[560px]">
          <motion.div {...rise(0)} className="flex w-fit items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-line-2 bg-white/[.03] font-mono text-[10px] tracking-[.14em] uppercase text-ink-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" style={{ animation: "livePulse 2s infinite" }} />
            Disponibile per coaching · risposta in 24h
          </motion.div>
          <motion.span {...rise(0.06)} className="section-label"><ShinyText text={hero.eyebrow} color="#e6b43c" shineColor="#fff3cf" speed={6} spread={90} /></motion.span>

          <SplitText
            text={hero.name}
            tag="h1"
            splitType="chars"
            delay={26}
            duration={0.9}
            ease="power3.out"
            from={{ opacity: 0, y: 55 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="left"
            className="font-display !block text-[clamp(3rem,7vw,5rem)] font-semibold leading-[0.98] tracking-[-0.02em] mb-7 text-ink"
          />

          <motion.p {...rise(0.15)} className="text-[1.08rem] text-ink-2 leading-relaxed mb-11 max-w-[42ch]">{hero.intro}</motion.p>

          {/* STAT — contatori animati (React Bits CountUp) */}
          <motion.div {...rise(0.3)} className="flex items-stretch mb-12">
            {hero.stats.map((s, i) => (
              <Fragment key={s.label}>
                {i > 0 && <span className="w-px self-stretch bg-line-2 mx-[clamp(18px,3vw,38px)] my-1" />}
                <div className="group">
                  <div className="text-gold/55 group-hover:text-gold transition-colors mb-2.5">{statIcons[i]}</div>
                  <div className="font-display text-[clamp(2rem,3.4vw,2.9rem)] font-semibold leading-none flex items-baseline text-ink group-hover:text-gold-light transition-colors tabular-nums">
                    <CountUp to={s.to} duration={1.6} startOnMount />
                    <span className="text-gold ml-0.5">{s.suffix}</span>
                  </div>
                  <div className="font-mono text-[10px] tracking-[.18em] uppercase text-muted mt-3 whitespace-nowrap">{s.label}</div>
                </div>
              </Fragment>
            ))}
          </motion.div>

          <motion.div {...rise(0.42)} className="flex flex-wrap items-center gap-4">
            <Magnet padding={50} magnetStrength={4} wrapperClassName="inline-block">
              <span className="cta-ring">
                <Link to={hero.ctaPrimary.href} className="btn-primary">{hero.ctaPrimary.label}</Link>
              </span>
            </Magnet>
            <a href={hero.ctaSecondary.href} target="_blank" rel="noopener noreferrer" className="btn-secondary">{hero.ctaSecondary.label}</a>
          </motion.div>
        </div>

        {/* RIGHT — foto Juventus */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: 40, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative"
        >
          <Tilt className="relative" amplitude={8} radius={14}>
            <div className="relative rounded-[14px] overflow-hidden aspect-[3/2] border border-line-2 bg-card shadow-[0_30px_80px_-20px_rgba(0,0,0,.7)]">
              <Pic base={hero.img.base} alt={hero.img.alt} eager sizes="(max-width: 1024px) 90vw, 520px" className="w-full h-full object-cover" />
              <span className="absolute inset-0 bg-gradient-to-tr from-black/45 via-transparent to-gold/[.06] pointer-events-none" />
            </div>
          </Tilt>
          <span className="absolute -bottom-3 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1.5 scroll-cue text-muted pointer-events-none">
        <span className="font-mono text-[10px] tracking-[.2em] uppercase">Scopri</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
      </div>
    </section>
  );
}
