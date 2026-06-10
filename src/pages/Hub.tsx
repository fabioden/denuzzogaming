import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { useLang, L } from "@/i18n";
import Lightfall from "@/components/reactbits/Lightfall";
import Seo from "@/components/Seo";

const INK = "#f5f0e8";
const MUTED = "#9e998d";
const GOLD = "#d6a21a";

// Le 3 "porte" dell'ecosistema. L'ombrello è la PERSONA (Fabio Denuzzo).
const PORTE = [
  {
    key: "gaming",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <line x1="6" x2="10" y1="11" y2="11" />
        <line x1="8" x2="8" y1="9" y2="13" />
        <line x1="15" x2="15.01" y1="12" y2="12" />
        <line x1="18" x2="18.01" y1="10" y2="10" />
        <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
      </svg>
    ),
    title: "Gaming",
    titleEn: "Gaming",
    desc: "Coaching 1:1, guide e la mia storia da 2× Campione Italiano nel competitivo EA FC.",
    descEn: "1:1 coaching, guides and my story as a 2× Italian Champion in competitive EA FC.",
    cta: "Entra nel gaming",
    ctaEn: "Enter gaming",
    to: "/gaming",
    external: false,
    accent: "#d6a21a",
    comingSoon: false,
  },
  {
    key: "business",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: "Business",
    titleEn: "Business",
    desc: "Agenti AI, automazioni e siti web su misura per far crescere la tua azienda.",
    descEn: "AI agents, automations and custom websites to grow your business.",
    cta: "Lavora con me",
    ctaEn: "Work with me",
    to: "/business/",
    external: true,
    accent: "#4a9eff",
    comingSoon: false,
  },
  {
    key: "diabete",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
      </svg>
    ),
    title: "Diabete",
    titleEn: "Diabetes",
    desc: "Un assistente AI gratuito e la mia esperienza, per chi convive col diabete.",
    descEn: "A free AI assistant and my own experience, for people living with diabetes.",
    cta: "Trova aiuto",
    ctaEn: "Find help",
    to: "https://diabete.denuzzogaming.com",
    external: true,
    accent: "#2fa56a",
    comingSoon: false,
  },
];

function Porta({ p, i }: { p: (typeof PORTE)[number]; i: number }) {
  const lang = useLang();
  const title = lang === "en" ? p.titleEn : p.title;
  const desc = lang === "en" ? p.descEn : p.desc;
  const cta = p.comingSoon
    ? lang === "en"
      ? "Coming soon"
      : "In arrivo"
    : lang === "en"
      ? p.ctaEn
      : p.cta;
  const inner = (
    <>
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `${p.accent}55` }}
      />
      <div className="relative">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ background: `${p.accent}22`, boxShadow: `inset 0 0 0 1px ${p.accent}55`, color: p.accent }}
        >
          {p.icon}
        </div>
        <h2 className="mt-5 text-2xl font-bold" style={{ color: p.accent, fontFamily: "'Playfair Display', serif" }}>
          {title}
        </h2>
        <p className="mt-2 text-[0.98rem] leading-relaxed" style={{ color: MUTED }}>
          {desc}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: p.comingSoon ? MUTED : INK }}>
          {cta}
          {!p.comingSoon && <span className="transition-transform group-hover:translate-x-1">→</span>}
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
      whileHover={p.comingSoon ? undefined : { y: -8 }}
    >
      {p.comingSoon ? (
        <div className={className} style={{ ...style, opacity: 0.55, cursor: "default" }}>
          {inner}
        </div>
      ) : p.external ? (
        <a href={lang === "en" && p.to === "/business/" ? "/business/en/" : p.to} className={className} style={style}>
          {inner}
        </a>
      ) : (
        <L to={p.to} className={className} style={style}>
          {inner}
        </L>
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

  const lang = useLang();
  const switchHref = lang === "en" ? "/" : "/en"; // toggle hub IT/EN

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08080a]" style={{ color: INK }}>
      <Seo
        title={lang === "en" ? "Fabio Denuzzo: Gaming, Business & Diabetes" : "Fabio Denuzzo: Gaming, Business & Diabete"}
        description={
          lang === "en"
            ? "Fabio Denuzzo's hub: EA FC coaching, AI solutions for business, and a free diabetes assistant. Choose where to go."
            : "L'hub di Fabio Denuzzo: coaching EA FC, soluzioni AI per il business e un assistente gratuito sul diabete. Scegli dove andare."
        }
        path="/"
        bilingual
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
            speed={0.42}
            streakCount={6}
            glow={0.7}
            density={0.5}
            opacity={0.78}
            mouseInteraction={false}
          />
        </div>
        {/* velo leggero: i colori dei 3 mondi restano visibili, ma con un look curato */}
        <div className="absolute inset-0 bg-[#08080a]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080a] via-[#08080a]/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-5 py-8 sm:px-8">
        <header className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <img src="/img/fd-mark.png" className="h-9 w-9" alt="" />
            <span className="text-lg font-semibold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Fabio Denuzzo
            </span>
          </div>
          <Link
            to={switchHref}
            aria-label="Switch language"
            className="inline-flex items-center justify-center rounded-full border px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-white"
            style={{ borderColor: "rgba(245,240,232,0.18)", color: MUTED }}
          >
            {lang === "en" ? "IT" : "EN"}
          </Link>
        </header>

        <div className="flex flex-1 flex-col justify-center py-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: GOLD }}
          >
            {lang === "en" ? "Welcome" : "Benvenuto"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-3 text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {lang === "en" ? "One person, three worlds." : "Una persona, tre mondi."}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-4 max-w-xl text-lg leading-relaxed"
            style={{ color: MUTED }}
          >
            {lang === "en"
              ? "Competitive gaming, AI for your business and diabetes support."
              : "Gaming competitivo, AI per il tuo business e supporto sul diabete."}
            <br className="hidden sm:block" />{" "}
            <span className="font-medium" style={{ color: INK }}>
              {lang === "en" ? "What can I do for you?" : "Cosa posso fare per te?"}
            </span>
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
