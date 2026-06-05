import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { nav, social } from "@/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SiteBackground from "@/components/SiteBackground";
import CursorGlow from "@/components/CursorGlow";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";

// Sito Business (Web Design · Automazioni · AI) — pagina statica.
// Punta a /business/index.html così apre SEMPRE la pagina (sia in dev che in produzione),
// senza che il router SPA la intercetti e rimandi alla home.
const BUSINESS_URL = "/business/index.html";

// Community WhatsApp — apre la chat col messaggio precompilato
const COMMUNITY_WA = "https://wa.me/393667142489?text=" + encodeURIComponent("Ciao fabio, voglio entrare nella community");

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
  const { pathname } = useLocation();
  useScrollReveal(pathname);

  return (
    <>
      <SmoothScroll />
      <SiteBackground />
      <CursorGlow />
      <Loader />
      <div className="grain-overlay" aria-hidden="true" />

      {/* Nav */}
      <nav className="fixed inset-x-0 top-0 z-[1000] flex items-center justify-between px-[clamp(20px,4vw,52px)] py-4 bg-[#0e0c0d]/80 backdrop-blur-2xl border-b border-line transition-[background] duration-300">
        <Link to="/" className="flex items-center gap-3 no-underline group shrink-0">
          <img src="/img/fd-mark.png" alt="Fabio Denuzzo" className="h-9 w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-105" />
          <span className="font-mono text-[12px] font-medium tracking-[.28em] uppercase text-ink">Denuzzo Gaming</span>
        </Link>

        {/* Link centrali */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-[clamp(12px,1.6vw,26px)]">
          {nav.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link key={l.label} to={l.href} className={`group relative font-mono text-[11.5px] font-medium tracking-[.16em] uppercase no-underline transition-colors ${active ? "text-gold" : "text-ink-2 hover:text-ink"}`}>
                {l.label}
                <span className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            );
          })}

          {/* Denuzzo Business — apre il sito business (pagina statica) */}
          <a href={BUSINESS_URL} className="group relative inline-flex items-center gap-1.5 font-mono text-[11.5px] font-medium tracking-[.16em] uppercase no-underline text-ink-2 hover:text-gold transition-colors">
            Denuzzo Business
            <span className="text-gold text-[0.85em] leading-none transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            <span className="absolute -bottom-1.5 left-0 h-px bg-gold w-0 group-hover:w-full transition-all duration-300" />
          </a>

          {/* Community WhatsApp */}
          <a href={COMMUNITY_WA} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-1.5 font-mono text-[11.5px] font-medium tracking-[.16em] uppercase no-underline text-ink-2 hover:text-gold transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] shrink-0"><path d="M17.5 14.4c-.3-.15-1.7-.84-1.97-.94-.26-.1-.46-.14-.65.14-.2.27-.74.94-.9 1.13-.17.2-.33.22-.61.07-1.5-.75-2.48-1.34-3.47-3.03-.26-.45.26-.42.74-1.4.08-.17.04-.31-.02-.45-.07-.14-.65-1.57-.9-2.15-.23-.56-.47-.48-.65-.49h-.55c-.2 0-.5.07-.76.36-.26.27-1 .98-1 2.4 0 1.4 1.02 2.76 1.17 2.95.14.2 2.01 3.08 4.88 4.32 2.86 1.24 2.86.83 3.38.78.52-.05 1.68-.69 1.92-1.35.24-.66.24-1.22.17-1.34-.07-.12-.26-.19-.55-.33M12 2a10 10 0 0 0-8.55 15.18L2 22l4.94-1.3A10 10 0 1 0 12 2Z"/></svg>
            Community
            <span className="absolute -bottom-1.5 left-0 h-px bg-gold w-0 group-hover:w-full transition-all duration-300" />
          </a>
        </div>

        {/* Destra: Prenota + menu mobile */}
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/coaching" className="hidden lg:inline-flex items-center px-4 py-2 rounded-full border border-gold/35 font-mono text-[11px] font-medium tracking-[.16em] uppercase text-gold hover:bg-gold/[.08] hover:border-gold/60 transition-all no-underline">Prenota</Link>
          <button onClick={() => setMenuOpen(true)} aria-label="Menu" className="lg:hidden w-10 h-10 rounded-full bg-white/[.04] border border-line-2 flex flex-col items-center justify-center gap-[5px] hover:bg-gold/[.08] transition">
            <span className="block w-4 h-[1.5px] bg-ink" />
            <span className="block w-4 h-[1.5px] bg-ink" />
            <span className="block w-4 h-[1.5px] bg-ink" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-[9999] bg-bg flex flex-col px-6 py-5 transition-all duration-400 ${menuOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-5"}`}>
        <div className="flex items-center justify-between">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 no-underline">
            <img src="/img/fd-mark.png" alt="Fabio Denuzzo" className="h-9 w-auto object-contain" />
            <span className="font-mono text-[12px] font-medium tracking-[.28em] uppercase text-ink">Denuzzo Gaming</span>
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
          {/* Community WhatsApp */}
          <a href={COMMUNITY_WA} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 font-display text-[clamp(20px,4.5vw,30px)] font-bold uppercase no-underline text-ink-2 hover:text-gold transition">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0"><path d="M17.5 14.4c-.3-.15-1.7-.84-1.97-.94-.26-.1-.46-.14-.65.14-.2.27-.74.94-.9 1.13-.17.2-.33.22-.61.07-1.5-.75-2.48-1.34-3.47-3.03-.26-.45.26-.42.74-1.4.08-.17.04-.31-.02-.45-.07-.14-.65-1.57-.9-2.15-.23-.56-.47-.48-.65-.49h-.55c-.2 0-.5.07-.76.36-.26.27-1 .98-1 2.4 0 1.4 1.02 2.76 1.17 2.95.14.2 2.01 3.08 4.88 4.32 2.86 1.24 2.86.83 3.38.78.52-.05 1.68-.69 1.92-1.35.24-.66.24-1.22.17-1.34-.07-.12-.26-.19-.55-.33M12 2a10 10 0 0 0-8.55 15.18L2 22l4.94-1.3A10 10 0 1 0 12 2Z"/></svg>
            Community
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
