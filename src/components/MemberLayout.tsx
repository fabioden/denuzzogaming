import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { courses } from "@/content/membership";
import { useProgress } from "@/hooks/useProgress";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ShinyText from "@/components/reactbits/ShinyText";
import Aurora from "@/components/reactbits/Aurora";
import AcademyWelcome from "@/components/AcademyWelcome";
import DashboardDrawer from "@/components/DashboardDrawer";

export type Profile = {
  subscription_status: string | null;
  plan: string | null;
  current_period_end: string | null;
};

// Contesto passato alle pagine interne: utente + profilo (caricati una volta dal guscio).
export type MemberContext = {
  user: User;
  profile: Profile | null;
  isActive: boolean;
  setProfile: Dispatch<SetStateAction<Profile | null>>;
  openDashboard: () => void;
};

// ---- Icone (SVG, niente emoji) ----
const ic = "shrink-0";
function GridIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={ic} aria-hidden><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>); }
function PlayIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={ic} aria-hidden><path d="M8 5v14l11-7z"/></svg>); }
function ChatIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={ic} aria-hidden><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>); }
function CardIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={ic} aria-hidden><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>); }
function UserIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={ic} aria-hidden><circle cx="12" cy="8" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></svg>); }
function CheckIcon() { return (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 6 9 17l-5-5"/></svg>); }
function ChevronDown() { return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M6 9l6 6 6-6" /></svg>); }

// Chiude un menu a tendina su click fuori / Esc.
function useDismissable() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);
  return { open, setOpen, ref };
}

const ONBOARDED_KEY = "academy_onboarded_v1";

// Voci sidebar (semplici, come deciso con Fabio). Le pagine extra restano raggiungibili per URL.
function useNavItems() {
  const completed = useProgress();
  const flat = courses.flatMap((c) => c.lessons.map((l) => ({ cid: c.id, id: l.id })));
  const resumeId = (flat.find((x) => !completed.has(x.id)) ?? flat[0])?.cid ?? courses[0]?.id ?? "";
  return {
    learn: [
      { label: "I miei corsi", to: "/account", icon: <GridIcon />, end: true },
      { label: "Continua a guardare", to: `/account/corso/${resumeId}`, icon: <PlayIcon />, end: false },
    ],
    more: [
      { label: "Coaching 1:1", to: "/account/coaching", icon: <ChatIcon />, end: false },
      { label: "Lista founder", to: "/account/abbonamento", icon: <CardIcon />, end: false },
    ],
    resumeId,
  };
}

// Menu account (tendina): saluto, torna al sito, rivedi intro, esci.
function AccountMenu({ user, onShowIntro, up = false }: { user: User; onShowIntro: () => void; up?: boolean }) {
  const { open, setOpen, ref } = useDismissable();
  const navigate = useNavigate();
  const name = user.email ? user.email.split("@")[0] : "";
  const initials = (user.email?.[0] ?? "U").toUpperCase();
  const item = "flex items-center gap-2 px-3 py-2 rounded-[8px] text-ink-2 hover:bg-white/[.04] hover:text-ink text-[.95rem] no-underline transition-colors w-full text-left cursor-pointer";
  async function logout() { await supabase.auth.signOut(); navigate("/login"); }
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open} aria-label="Menu account"
        className="flex items-center gap-2.5 w-full rounded-[10px] p-2 hover:bg-white/[.04] transition-colors cursor-pointer">
        <span className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-[#a5760d] text-gold-contrast grid place-items-center font-display text-[.95rem] shrink-0">{initials}</span>
        <span className="min-w-0 flex-1 text-left">
          <span className="block text-ink text-[.9rem] font-semibold truncate">{name}</span>
          <span className="block text-muted text-[.72rem] truncate">{user.email}</span>
        </span>
        <span className="text-ink-2 shrink-0"><ChevronDown /></span>
      </button>
      {open && (
        <div role="menu" className={`absolute right-0 ${up ? "bottom-full mb-2" : "mt-2"} left-0 rounded-[var(--radius-card)] border border-line-2 bg-surface p-2 shadow-[0_12px_40px_rgba(0,0,0,.5)] z-50`}>
          <Link to="/account/abbonamento" role="menuitem" onClick={() => setOpen(false)} className={item}>Abbonamento</Link>
          <button role="menuitem" onClick={() => { setOpen(false); onShowIntro(); }} className={item}>Rivedi l'introduzione</button>
          <Link to="/gaming" role="menuitem" onClick={() => setOpen(false)} className={item}>Torna al sito</Link>
          <div className="h-px bg-line-2 my-1" />
          <button onClick={logout} role="menuitem" className={item + " hover:text-gold"}>Esci</button>
        </div>
      )}
    </div>
  );
}

export default function MemberLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [dashOpen, setDashOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useScrollReveal(ready ? location.pathname : undefined);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) { navigate("/login"); return; }
      setUser(data.user);
      const { data: p } = await supabase
        .from("profiles")
        .select("subscription_status, plan, current_period_end")
        .eq("id", data.user.id)
        .single();
      setProfile(p as Profile | null);
      setReady(true);
      try { if (!localStorage.getItem(ONBOARDED_KEY)) setShowIntro(true); } catch { /* ignore */ }
    })();
  }, [navigate]);

  const { learn, more, resumeId } = useNavItems();

  if (!ready || !user) return null;
  const isActive = profile?.subscription_status === "active";

  const navLinkCls = ({ isActive: on }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[.92rem] font-medium no-underline transition-colors ${
      on ? "bg-gold/[.12] text-gold" : "text-ink-2 hover:bg-white/[.04] hover:text-ink"
    }`;

  return (
    <div className="saas min-h-screen relative" style={{ background: "radial-gradient(130% 80% at 50% -10%, #1b1622 0%, #120f0a 46%, #0b0810 100%)" }}>
      {/* Sfondo materico premium (z-0) */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden style={{ background: "radial-gradient(58% 42% at 50% -2%, rgba(214,162,26,.12), transparent 62%), radial-gradient(46% 40% at 92% 104%, rgba(214,162,26,.07), transparent 60%)" }} />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[78vh] z-0 opacity-40" aria-hidden style={{ maskImage: "linear-gradient(to bottom, #000 0%, #000 34%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 34%, transparent 100%)" }}>
        <Aurora colorStops={["#caa033", "#7a4f12", "#e2b84a"]} amplitude={0.8} blend={0.6} speed={0.45} />
      </div>
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden style={{ background: "radial-gradient(125% 100% at 50% 38%, transparent 52%, rgba(0,0,0,.5) 100%)" }} />
      <div className="grain-overlay" aria-hidden />

      <div className="relative z-10 lg:grid lg:grid-cols-[250px_1fr] lg:min-h-screen">
        {/* ===== SIDEBAR (desktop) ===== */}
        <aside className="hidden lg:flex flex-col sticky top-0 h-screen border-r border-line bg-[#100d14]/70 backdrop-blur-xl px-4 py-6">
          <Link to="/account" className="flex items-center gap-2.5 px-2 no-underline shrink-0">
            <img src="/img/fd-mark.png" alt="Fabio Denuzzo" className="h-8 w-auto object-contain" />
            <ShinyText text="ACADEMY" className="text-[12px] font-semibold tracking-[.24em] uppercase" color="#c9a23a" shineColor="#fff2c4" speed={4} />
          </Link>

          <nav className="mt-7 flex flex-col gap-1">
            <span className="text-[10.5px] tracking-[.14em] uppercase text-muted px-3 mt-1 mb-1">Impara</span>
            {learn.map((s) => (
              <NavLink key={s.label} to={s.to} end={s.end} className={navLinkCls}>{s.icon}{s.label}</NavLink>
            ))}
            <span className="text-[10.5px] tracking-[.14em] uppercase text-muted px-3 mt-3 mb-1">Di più</span>
            {more.map((s) => (
              <NavLink key={s.label} to={s.to} end={s.end} className={navLinkCls}>{s.icon}{s.label}</NavLink>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            {isActive ? (
              <div className="rounded-[12px] border border-gold/28 bg-gold/[.06] p-3">
                <div className="flex items-center gap-1.5 text-gold text-[12px] font-semibold"><CheckIcon /> Accesso completo</div>
                <div className="text-ink-2 text-[11.5px] mt-1">Tutti i corsi sbloccati · EA FC 27</div>
              </div>
            ) : (
              <Link to="/account/abbonamento" className="block rounded-[12px] border border-gold/40 bg-gold/[.08] p-3 no-underline hover:bg-gold/[.12] transition-colors">
                <div className="text-gold text-[12px] font-semibold">Entra nella lista founder</div>
                <div className="text-ink-2 text-[11.5px] mt-1">In arrivo con EA FC 27 · scopri l'Academy →</div>
              </Link>
            )}
            <AccountMenu user={user} onShowIntro={() => setShowIntro(true)} up />
          </div>
        </aside>

        {/* ===== MAIN ===== */}
        <div className="min-w-0">
          {/* Topbar: mobile = brand + dashboard + account; desktop = piano + dashboard */}
          <header className="sticky top-0 z-40 bg-[#0b0a0e]/72 backdrop-blur-xl border-b border-line-2">
            <div className="flex items-center justify-between gap-3 px-[clamp(16px,4vw,40px)] py-3">
              <Link to="/account" className="flex items-center gap-2 no-underline lg:hidden">
                <img src="/img/fd-mark.png" alt="Fabio Denuzzo" className="h-7 w-auto object-contain" />
                <ShinyText text="ACADEMY" className="text-[11px] font-semibold tracking-[.22em] uppercase" color="#c9a23a" shineColor="#fff2c4" speed={4} />
              </Link>
              <div className="hidden lg:block" />
              <div className="flex items-center gap-2.5">
                {isActive ? (
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold/40 text-[11px] font-bold uppercase tracking-[.12em] text-gold"><span className="w-1.5 h-1.5 rounded-full bg-gold" /> PRO</span>
                ) : (
                  <Link to="/account/abbonamento" className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-full bg-gold text-gold-contrast text-[11px] font-bold uppercase tracking-[.1em] hover:opacity-90 transition-opacity no-underline">Lista founder</Link>
                )}
                <div className="lg:hidden w-40"><AccountMenu user={user} onShowIntro={() => setShowIntro(true)} /></div>
              </div>
            </div>
          </header>

          <main key={location.pathname} className="route-fade pb-24 lg:pb-0">
            <Outlet context={{ user, profile, isActive, setProfile, openDashboard: () => setDashOpen(true) }} />
          </main>
        </div>
      </div>

      {/* ===== BOTTOM NAV (mobile) ===== */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 flex bg-[#100e12]/95 backdrop-blur-xl border-t border-line-2" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        {[
          { label: "Corsi", to: "/account", icon: <GridIcon />, end: true },
          { label: "Continua", to: `/account/corso/${resumeId}`, icon: <PlayIcon />, end: false },
          { label: "Coaching", to: "/account/coaching", icon: <ChatIcon />, end: false },
          { label: "Account", to: "/account/abbonamento", icon: <UserIcon />, end: false },
        ].map((s) => (
          <NavLink key={s.label} to={s.to} end={s.end}
            className={({ isActive: on }) => `flex-1 flex flex-col items-center gap-1 py-2.5 text-[10.5px] no-underline ${on ? "text-gold" : "text-ink-2"}`}>
            {s.icon}{s.label}
          </NavLink>
        ))}
      </nav>

      <AcademyWelcome open={showIntro} onClose={() => { setShowIntro(false); try { localStorage.setItem(ONBOARDED_KEY, "1"); } catch { /* ignore */ } }} />
      <DashboardDrawer open={dashOpen} onClose={() => setDashOpen(false)} />
    </div>
  );
}
