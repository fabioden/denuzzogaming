import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import Lightfall from "@/components/reactbits/Lightfall";
import Seo from "@/components/Seo";

const INK = "#f5f0e8";
const MUTED = "#9e998d";
const GOLD = "#d6a21a";

// Le 3 "porte" dell'ecosistema. L'ombrello è la PERSONA (Fabio Denuzzo).
const PORTE = [
  {
    key: "gaming",
    emoji: "🎮",
    title: "Gaming",
    desc: "Coaching, guide e la mia storia nel competitivo EA FC.",
    cta: "Entra nel gaming",
    to: "/gaming",
    external: false,
    accent: "#d6a21a",
  },
  {
    key: "business",
    emoji: "💼",
    title: "Business",
    desc: "Agenti AI, automazioni e siti web che fanno crescere la tua azienda.",
    cta: "Lavora con me",
    to: "/business/",
    external: true,
    accent: "#4a9eff",
  },
  {
    key: "diabete",
    emoji: "🩺",
    title: "Diabete",
    desc: "Un assistente AI gratuito e la mia esperienza, per chi convive col diabete.",
    cta: "Trova aiuto",
    to: "/diabete",
    external: false,
    accent: "#2fa56a",
  },
];

function Porta({ p, i }: { p: (typeof PORTE)[number]; i: number }) {
  const inner = (
    <>
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `${p.accent}55` }}
      />
      <div className="relative">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
          style={{ background: `${p.accent}22`, boxShadow: `inset 0 0 0 1px ${p.accent}55` }}
        >
          {p.emoji}
        </div>
        <h2 className="mt-5 text-2xl font-bold" style={{ color: p.accent, fontFamily: "'Playfair Display', serif" }}>
          {p.title}
        </h2>
        <p className="mt-2 text-[0.98rem] leading-relaxed" style={{ color: MUTED }}>
          {p.desc}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: INK }}>
          {p.cta}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </>
  );

  const className =
    "group relative block overflow-hidden rounded-3xl border p-7 backdrop-blur-sm transition-colors";
  const style = { borderColor: "rgba(245,240,232,0.12)", background: "rgba(245,240,232,0.035)" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
      whileHover={{ y: -8 }}
    >
      {p.external ? (
        <a href={p.to} className={className} style={style}>
          {inner}
        </a>
      ) : (
        <Link to={p.to} className={className} style={style}>
          {inner}
        </Link>
      )}
    </motion.div>
  );
}

export default function Hub() {
  const [intro, setIntro] = useState(() => {
    try {
      return sessionStorage.getItem("hub_intro") !== "1";
    } catch {
      return true;
    }
  });
  useEffect(() => {
    if (!intro) return;
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem("hub_intro", "1");
      } catch {
        /* ignora */
      }
      setIntro(false);
    }, 1900);
    return () => clearTimeout(t);
  }, [intro]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08080a]" style={{ color: INK }}>
      <Seo
        title="Fabio Denuzzo — Gaming, Business & Diabete"
        description="L'hub di Fabio Denuzzo: coaching EA FC, soluzioni AI per il business e un assistente gratuito sul diabete. Scegli dove andare."
        path="/"
      />

      {/* INTRO: logo che si carica, poi rivela la hub */}
      <AnimatePresence>
        {intro && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#08080a]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.img
              src="/img/fd-mark.png"
              alt="Fabio Denuzzo"
              className="h-24 w-24"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* sfondo: Lightfall (React Bits, ogl) coi 3 colori dei mondi su nero */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0">
          <Lightfall
            className="h-full w-full"
            colors={["#e6b53c", "#4a9eff", "#2fa56a"]}
            backgroundColor="#08080a"
            speed={0.5}
            streakCount={7}
            glow={1}
            density={0.6}
            opacity={1}
            mouseInteraction={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080a] via-[#08080a]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-8 sm:px-8">
        <header className="flex items-center gap-2.5">
          <img src="/img/fd-mark.png" className="h-9 w-9" alt="" />
          <span className="text-lg font-semibold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Fabio Denuzzo
          </span>
        </header>

        <div className="flex flex-1 flex-col justify-center py-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: GOLD }}
          >
            Ciao 👋
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-3 text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Sono Fabio Denuzzo.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-4 max-w-xl text-lg leading-relaxed"
            style={{ color: MUTED }}
          >
            Gioco, creo soluzioni AI per il business e aiuto chi convive col diabete.
            <br className="hidden sm:block" /> <span className="font-medium" style={{ color: INK }}>Cosa cerchi?</span>
          </motion.p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PORTE.map((p, i) => (
              <Porta key={p.key} p={p} i={i} />
            ))}
          </div>
        </div>

        <footer
          className="flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-sm"
          style={{ borderColor: "rgba(245,240,232,0.1)", color: MUTED }}
        >
          <span>© 2026 Fabio Denuzzo</span>
          <div className="flex gap-5">
            <a href="https://www.tiktok.com/@fabio_denuzzo_" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">TikTok</a>
            <a href="https://www.youtube.com/@denuzzofabio" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">YouTube</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
