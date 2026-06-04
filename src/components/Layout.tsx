import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { nav, social } from "@/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SiteBackground from "@/components/SiteBackground";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";

// Sito Business (Web Design · Automazioni · AI) — pagina dedicata su denuzzogaming.com
const BUSINESS_URL = "/business";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Coaching", href: "/coaching" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "YouTube", href: social.youtube, ext: true },
  { label: "Instagram", href: social.instagram, ext: true },
  { label: "Twitch", href: social.twitch, ext: true },
  { label: "TikTok", href: social.tiktok, ext: true },
  { label: "Twitter", href: social.twitter, ext: true },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [annOpen, setAnnOpen] = useState(true);
  const { pathname } = useLocation();
  useScrollReveal(pathname);

  return (
    <>
      <SmoothScroll />
      <SiteBackground />
      <Loader />
      <div className="grain-overlay" aria-hidden="true" />

      {/* Announcement bar */}
      {annOpen && (
        <div className="fixed top-0 inset-x-0 z-[1001] flex items-center justify-center gap-3 px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[.08em] text-gold-light font-mono border-b border-gold/15 bg-gradient-to-r from-gold/12 to-gold/[.06] backdrop-blur-md">
          <span>Offerta lancio · Coaching EA FC 1:1 da €22,50</span>
          <Link to="/coaching" className="text-ink underline underline-offset-4 hover:text-gold transition-colors">Scopri i pacchetti →</Link>
          <button onClick={() => setAnnOpen(false)} aria-label="Chiudi" className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 grid place-items-center rounded-full bg-white/[.06] text-ink-2 hover:bg-white/12 hover:text-ink transition">×</button>
        </div>
      )}

      {/* Nav */}
      <nav className={`fixed inset-x-0 z-[1000] flex items-center justify-between px-6 py-3.5 bg-black/90 backdrop-blur-2xl border-b border-gold/[.06] transition-[top] duration-300 ${annOpen ? "top-[44px]" : "top-0"}`}>
        <Link to="/" className="flex items-center gap-3 no-underline">
          <span className="w-[34px] h-[34px] rounded-full border-[1.5px] border-gold overflow-hidden shrink-0">
            <img src="/logo.png" alt="DG" className="w-full h-full object-cover" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
          </span>
          <span className="font-display text-[15px] font-bold tracking-[.14em] uppercase text-ink">Denuzzo Gaming</span>
        </Link>

        <div className="hidden md:flex items-center gap-[clamp(16px,2.5vw,32px)]">
          {nav.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link key={l.label} to={l.href} className={`group relative font-mono text-[12px] font-medium tracking-[.12em] uppercase no-underline transition-colors ${active ? "text-gold" : "text-ink-2 hover:text-gold"}`}>
                {l.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            );
          })}

          {/* Denuzzo Business — sito personale */}
          <span className="w-px h-4 bg-gold/20" aria-hidden="true" />
          <a
            href={BUSINESS_URL}
            aria-label="Vai al sito Denuzzo Business"
            className="group relative flex items-center justify-center w-9 h-9 rounded-full border border-gold/25 text-ink-2 hover:text-gold hover:border-gold/60 hover:bg-gold/[.08] transition-all"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px]">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="pointer-events-none absolute top-[calc(100%+10px)] right-0 whitespace-nowrap rounded-md border border-gold/20 bg-black/90 px-2.5 py-1.5 font-mono text-[10px] tracking-[.1em] uppercase text-ink-2 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
              Denuzzo Business ↗
            </span>
          </a>
        </div>

        <button onClick={() => setMenuOpen(true)} aria-label="Menu" className="md:hidden w-10 h-10 rounded-full bg-white/[.04] border border-line-2 flex flex-col items-center justify-center gap-[5px] hover:bg-gold/[.08] transition">
          <span className="block w-4 h-[1.5px] bg-ink" />
          <span className="block w-4 h-[1.5px] bg-ink" />
          <span className="block w-4 h-[1.5px] bg-ink" />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-[9999] bg-bg flex flex-col px-6 py-5 transition-all duration-400 ${menuOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-5"}`}>
        <div className="flex items-center justify-between">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 no-underline">
            <span className="w-[34px] h-[34px] rounded-full border-[1.5px] border-gold overflow-hidden">
              <img src="/logo.png" alt="DG" className="w-full h-full object-cover" />
            </span>
            <span className="font-display text-[15px] font-bold tracking-[.14em] uppercase text-ink">Denuzzo Gaming</span>
          </Link>
          <button onClick={() => setMenuOpen(false)} aria-label="Chiudi" className="w-10 h-10 rounded-full bg-white/[.04] border border-line-2 grid place-items-center text-ink hover:rotate-90 transition">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-[18px] h-[18px]"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        <div className="flex-1 flex flex-col justify-center gap-6">
          {nav.map((l) => (
            <Link key={l.label} to={l.href} onClick={() => setMenuOpen(false)} className={`font-display text-[clamp(28px,6vw,42px)] font-bold uppercase no-underline transition ${isActive(pathname, l.href) ? "text-gold" : "text-ink hover:text-gold hover:translate-x-3"}`}>{l.label}</Link>
          ))}
          {/* Denuzzo Business — sito personale */}
          <a href={BUSINESS_URL} onClick={() => setMenuOpen(false)} className="flex items-center gap-3 font-display text-[clamp(20px,4.5vw,30px)] font-bold uppercase no-underline text-ink-2 hover:text-gold transition">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 shrink-0">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Denuzzo Business <span className="text-gold text-[.7em]">↗</span>
          </a>
        </div>
      </div>

      <main>{children}</main>

      {/* Footer */}
      <footer className="relative z-[2] text-center px-6 pt-14 pb-9">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(60%,400px)] h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
        <div className="flex items-center justify-center mb-5">
          <img src="/img/fd-logo.png" alt="Fabio Denuzzo" className="w-[clamp(140px,18vw,200px)] h-auto object-contain" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
        </div>
        <div className="flex gap-6 justify-center flex-wrap mb-5">
          {footerLinks.map((l) =>
            l.ext ? (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="text-[12px] font-semibold tracking-[.14em] uppercase text-ink-2 no-underline hover:text-gold transition-colors">{l.label}</a>
            ) : (
              <Link key={l.label} to={l.href} className="text-[12px] font-semibold tracking-[.14em] uppercase text-ink-2 no-underline hover:text-gold transition-colors">{l.label}</Link>
            )
          )}
        </div>
        <div className="text-[12px] text-muted">
          © 2026 Fabio Denuzzo · Tutti i diritti riservati · <Link to="/privacy" className="text-muted underline underline-offset-[3px] hover:text-gold transition-colors">Privacy Policy</Link>
        </div>
      </footer>
    </>
  );
}
