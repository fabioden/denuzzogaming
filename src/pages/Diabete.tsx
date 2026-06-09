import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence, useScroll, type MotionValue } from 'motion/react';
import SilkWaves from '@/components/silk-waves';
import { cn } from '@/lib/utils';

// Palette "livelli di glicemia" chiara e morbida per lo shader di sfondo.
const GLU_COLORS = [
  '#f7fbf8', '#e6f6ee', '#bfe6cf', '#86cfa3',
  '#dfe089', '#f2c94c', '#f0a07a', '#e98a7d',
];

const QUESTIONS = [
  'Posso mangiare la pasta la sera? 🍝',
  'Cosa faccio se vado in ipo?',
  'Come gestisco lo sport col diabete?',
  'Perché la glicemia sale di notte?',
];

// Sfondo CONTINUO di tutta la pagina (fixed): lo shader Silk non si "taglia" più tra le sezioni.
function PageBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-white">
      <SilkWaves
        className="absolute inset-0"
        colors={GLU_COLORS}
        speed={0.5}
        scale={2.3}
        distortion={1.1}
        contrast={1}
        brightness={1.05}
        opacity={0.5}
      />
      {/* velo per la leggibilità: più forte a sinistra (dove c'è il testo), tenue ovunque */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.62) 45%, rgba(255,255,255,0.55) 100%)',
        }}
      />
    </div>
  );
}

/* ------------------------------- effetti ------------------------------- */

// Titolo che entra mettendosi a fuoco, parola per parola.
function BlurWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split(' ').map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ marginRight: '0.26em' }}
          initial={{ opacity: 0, filter: 'blur(12px)', y: 10 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.6, delay: delay + i * 0.08, ease: 'easeOut' }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

// CTA con bordo che gira piano.
function StarBorderButton({ children, href }: { children: ReactNode; href: string }) {
  return (
    <a href={href} className="relative inline-flex overflow-hidden rounded-full p-[2px]">
      <motion.span
        aria-hidden
        className="absolute inset-[-60%]"
        style={{ background: 'conic-gradient(from 0deg, var(--color-glu-green), var(--color-glu-yellow), var(--color-glu-red), var(--color-glu-green))' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
      />
      <span className="relative rounded-full bg-glu-green px-7 py-3.5 font-semibold text-white transition-colors hover:bg-glu-green-deep">
        {children}
      </span>
    </a>
  );
}

// Fumetto con domande di esempio che ruotano.
function ChatBubble() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % QUESTIONS.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-[0_16px_40px_rgba(21,37,43,0.16)] ring-1 ring-black/5">
      <span className="mb-1 block text-[0.64rem] font-bold uppercase tracking-wider text-glu-green-deep">
        Chiedimi pure
      </span>
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.32 }}
          className="whitespace-nowrap text-[0.92rem] font-medium text-ink"
        >
          {QUESTIONS[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

// Marchio: il monogramma "FD" verde su trasparente (logo nuovo).
function LogoBadge() {
  return <img src="/logo-mark.png" alt="Fabio Denuzzo" className="h-10 w-10 flex-none" />;
}

// Filo conduttore: la curva della glicemia che si DISEGNA scrollando (timeline a sinistra).
function GlucoseThread({ progress }: { progress: MotionValue<number> }) {
  const D =
    'M50,0 C30,80 70,160 50,250 C32,340 68,430 50,520 C30,610 70,700 50,800 C34,880 66,940 50,1000';
  return (
    <svg
      className="pointer-events-none absolute left-0 top-0 z-0 hidden h-full w-24 sm:block md:w-28"
      viewBox="0 0 100 1000"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="glucothread" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#218a57" />
          <stop offset="20%" stopColor="#2fa56a" />
          <stop offset="36%" stopColor="#eab308" />
          <stop offset="50%" stopColor="#2fa56a" />
          <stop offset="66%" stopColor="#e0483c" />
          <stop offset="82%" stopColor="#2fa56a" />
          <stop offset="100%" stopColor="#218a57" />
        </linearGradient>
      </defs>
      {/* traccia di base (la linea "da percorrere"), già visibile dall'hero */}
      <path d={D} fill="none" stroke="#bcdfca" strokeWidth={3.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      {/* linea che si disegna con lo scroll */}
      <motion.path
        d={D}
        fill="none"
        stroke="url(#glucothread)"
        strokeWidth={4.5}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{ pathLength: progress, filter: 'drop-shadow(0 0 7px rgba(47,165,106,0.55))' }}
      />
    </svg>
  );
}

// Nodo-"lettura" che pulsa, centrato sul filo.
function ThreadNode() {
  return (
    <span className="absolute left-1/2 top-[6.5rem] hidden -translate-x-1/2 sm:flex">
      <span className="relative flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glu-green opacity-50" />
        <span className="relative inline-flex h-4 w-4 rounded-full bg-glu-green ring-4 ring-white" />
      </span>
    </span>
  );
}

// La CHAT vera: parla col motore AI tramite /api/chat.
const ESEMPI = [
  'Posso mangiare la pasta la sera?',
  'Cosa faccio se vado in ipo?',
  'Come gestisco lo sport col diabete?',
  'Posso bere alcolici?',
  'Perché la glicemia sale di notte?',
  'Che differenza c’è tra tipo 1 e tipo 2?',
  'Posso mangiare i dolci?',
  'Ho appena scoperto il diabete, da dove inizio?',
];

type Msg = { role: 'user' | 'bot'; text: string };

function ChatAssistant() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'bot',
      text: "Ciao! 👋 Sono l'assistente di Fabio. Chiedimi quello che vuoi sul diabete — ti rispondo in modo semplice, con la sua esperienza e con la scienza.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const [accepted, setAccepted] = useState(() => {
    try {
      return localStorage.getItem('disclaimer_diabete_ok') === '1';
    } catch {
      return false;
    }
  });
  function accept() {
    try {
      localStorage.setItem('disclaimer_diabete_ok', '1');
    } catch {
      /* ignora */
    }
    setAccepted(true);
  }

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  async function send(q: string) {
    const question = q.trim();
    if (!question || loading) return;
    setMessages((m) => [...m, { role: 'user', text: question }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: 'bot', text: data.risposta || data.errore || 'Scusa, qualcosa non ha funzionato.' },
      ]);
    } catch {
      setMessages((m) => [...m, { role: 'bot', text: 'Scusa, non riesco a rispondere ora. Riprova tra poco.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_80px_rgba(21,37,43,0.16)]">
      {/* header */}
      <div className="flex items-center gap-3 border-b border-line bg-glu-green-soft/60 px-5 py-4">
        <img src="/agente.png" alt="" className="h-11 w-11 flex-none" />
        <div>
          <p className="font-semibold text-ink">Assistente di Fabio</p>
          <p className="flex items-center gap-1.5 text-xs text-ink-soft">
            <span className="h-2 w-2 rounded-full bg-glu-green" /> pronto a rispondere
          </p>
        </div>
      </div>

      {/* GATE: prima di chattare bisogna ACCETTARE il disclaimer */}
      {!accepted && (
        <div className="px-6 py-10 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-2xl">⚠️</div>
          <h3 className="font-display text-xl font-bold text-ink">Prima di iniziare</h3>
          <p className="mx-auto mt-3 max-w-md text-[0.93rem] leading-relaxed text-ink/75">
            I consigli si basano sull'<strong className="text-glu-red">esperienza personale di Fabio</strong> e
            sulla scienza, ma <strong className="text-glu-red">non sostituiscono il medico</strong>: niente
            diagnosi né dosi di terapia. Per qualsiasi problema o decisione sulla terapia contatta sempre il
            tuo medico di riferimento. In emergenza: <strong className="text-glu-red">112 / 118</strong>.
          </p>
          <button
            onClick={accept}
            className="mt-6 rounded-full bg-glu-green px-7 py-3.5 font-semibold text-white shadow-lg transition-colors hover:bg-glu-green-deep"
          >
            Ho capito, accetto e continuo
          </button>
        </div>
      )}

      {accepted && (
        <>
          {/* promemoria rosso sempre visibile durante la chat */}
          <div className="flex items-start gap-2.5 border-b border-red-200 bg-red-50 px-5 py-3 text-[0.82rem] leading-relaxed text-glu-red">
            <span aria-hidden className="mt-0.5">⚠️</span>
            <p>
              Consigli basati sull'<strong>esperienza di Fabio</strong>, non sostituiscono il medico. Per
              problemi o terapia, <strong>contatta sempre il tuo medico di riferimento</strong>.
            </p>
          </div>

      {/* messaggi */}
      <div ref={boxRef} className="flex h-[380px] flex-col gap-3 overflow-y-auto px-5 py-5">
        {messages.map((m, i) => (
          <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div
              className={cn(
                'max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[0.98rem] leading-relaxed',
                m.role === 'user'
                  ? 'rounded-br-md bg-glu-green text-white'
                  : 'rounded-bl-md bg-[#f3f6f4] text-ink',
              )}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-md bg-[#f3f6f4] px-4 py-3">
              <span className="flex gap-1">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-2 w-2 animate-bounce rounded-full bg-ink-soft/60"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </span>
            </div>
          </div>
        )}

        {messages.length === 1 && !loading && (
          <div className="mt-3">
            <p className="mb-2.5 text-sm font-semibold text-ink-soft">Prova a chiedermi 👇</p>
            <div className="flex flex-wrap gap-2">
              {ESEMPI.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-line bg-white px-3.5 py-2 text-sm text-ink transition-colors hover:border-glu-green hover:bg-glu-green-soft/40 hover:text-glu-green-deep"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-end gap-2 border-t border-line p-3"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          rows={1}
          placeholder="Scrivi la tua domanda…"
          className="max-h-32 flex-1 resize-none rounded-xl border border-line px-3.5 py-3 text-ink outline-none transition-colors focus:border-glu-green"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Invia"
          className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-glu-green text-xl text-white transition-colors hover:bg-glu-green-deep disabled:opacity-40"
        >
          ↑
        </button>
      </form>

      <p className="border-t border-line px-5 py-2.5 text-[0.72rem] text-ink-soft">
        In emergenza chiama subito il <strong className="text-ink">112 / 118</strong>.
      </p>
        </>
      )}
    </div>
  );
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrolled;
}

/* -------------------------------- pagina ------------------------------- */

export default function Diabete() {
  const scrolled = useScrolled();
  const { scrollYProgress } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = 'Diabete — Assistente AI gratuito | Fabio Denuzzo';
  }, []);

  return (
    <div className="diabete-scope relative min-h-screen overflow-x-hidden bg-white font-sans text-ink">
      <PageBackground />
      {/* il "filo glicemico" parte dall'hero e si disegna lungo TUTTA la pagina */}
      <GlucoseThread progress={scrollYProgress} />

      {/* ============================ MENU ============================ */}
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled ? 'bg-white/80 shadow-[0_1px_0_rgba(21,37,43,0.08)] backdrop-blur-md' : '',
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3.5 sm:px-8">
          <a href="#" className="flex items-center gap-2.5">
            <LogoBadge />
            <span className="font-display text-lg font-semibold tracking-tight">Fabio Denuzzo</span>
          </a>

          <nav className="ml-auto hidden items-center gap-7 md:flex">
            <a href="#chi-sono" className="text-[0.94rem] font-medium text-ink-soft transition-colors hover:text-ink">Chi sono</a>
            <a
              href="https://denuzzogaming.com/business"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.94rem] font-medium text-ink-soft transition-colors hover:text-ink"
            >
              Business
            </a>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href="#sostieni"
              className="rounded-full bg-glu-red px-3.5 py-2 text-[0.9rem] font-semibold text-white shadow-sm transition hover:brightness-95"
            >
              <span aria-hidden>❤️</span> Sostieni
            </a>
            <a
              href="#assistente"
              className="rounded-full bg-glu-green px-4 py-2 text-[0.9rem] font-semibold text-white transition-colors hover:bg-glu-green-deep"
            >
              Parla con l'assistente
            </a>
          </div>

          {/* hamburger mobile */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-full text-xl text-ink transition-colors hover:bg-ink/5 md:hidden"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* pannello menu mobile */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mx-4 mb-2 rounded-2xl border border-line bg-white/95 p-3 shadow-[0_20px_50px_rgba(21,37,43,0.14)] backdrop-blur-md md:hidden"
            >
              <a href="#chi-sono" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-2.5 font-medium text-ink hover:bg-glu-green-soft/40">Chi sono</a>
              <a href="https://denuzzogaming.com/business" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-2.5 font-medium text-ink hover:bg-glu-green-soft/40">Business ↗</a>
              <a href="#sostieni" onClick={() => setMenuOpen(false)} className="mt-1 block rounded-xl bg-glu-red px-4 py-3 text-center font-semibold text-white">❤️ Sostieni</a>
              <a href="#assistente" onClick={() => setMenuOpen(false)} className="mt-2 block rounded-xl bg-glu-green px-4 py-3 text-center font-semibold text-white">Parla con l'assistente</a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ============================ HERO ============================ */}
      <section className="relative flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          {/* -------- colonna testo -------- */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
            {/* (7) eyebrow personale, non più "SaaS" maiuscolo */}
            <p className="mb-4 text-[0.98rem] font-medium text-glu-green-deep">
              Ciao, sono Fabio 👋 — diabetico di tipo 1 da 30 anni.
            </p>

            {/* (1)(3)(4)(5) titolo: peso 700, tracking più aperto, un solo colore + UNA parola
                col gradiente che RISOLVE in verde (rosso→verde = "torni in range") */}
            <h1 className="font-display text-[clamp(2.4rem,5.4vw,3.8rem)] font-bold leading-[1.05] tracking-[-0.01em] text-ink [text-wrap:balance]">
              <BlurWords text="Hai una domanda" />
              <br />
              <BlurWords text="sul" delay={0.35} />{' '}
              <motion.span
                initial={{ opacity: 0, filter: 'blur(12px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="bg-gradient-to-r from-glu-red to-glu-green-deep bg-clip-text text-transparent"
              >
                diabete?
              </motion.span>
            </h1>

            {/* (6) sottotitolo: più scuro, più corto */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 max-w-lg text-[1.07rem] leading-relaxed text-ink/75"
            >
              <span className="font-semibold text-ink">Convivo col diabete da 30 anni</span> e ho creato un
              assistente che risponde alle tue domande — con la mia esperienza e con la scienza. Non
              sostituisce il medico.
            </motion.p>

            {/* (8) CTA: pill + ghost button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <StarBorderButton href="#assistente">Fai una domanda</StarBorderButton>
              <a
                href="#chi-sono"
                className="rounded-full border border-line bg-white/50 px-6 py-3.5 font-semibold text-ink backdrop-blur-sm transition-colors hover:border-glu-green hover:text-glu-green-deep"
              >
                La mia storia →
              </a>
            </motion.div>

            {/* (9) trust chips separati */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="mt-8 flex flex-wrap gap-2.5"
            >
              {['Gratuito', 'In italiano', 'Senza registrazione'].map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-line bg-white/55 px-3.5 py-1.5 text-xs font-semibold text-ink-soft backdrop-blur-sm"
                >
                  {t}
                </li>
              ))}
            </motion.ul>

            {/* (9) disclaimer su riga propria, più defilato */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-4 text-[0.72rem] leading-relaxed text-ink-soft/80"
            >
              Strumento educativo, non sostituisce il medico. In emergenza: 112 / 118.
            </motion.p>
          </motion.div>

          {/* -------- colonna visual: glucometro + agente + fumetto -------- */}
          <div className="relative mx-auto aspect-square w-full max-w-[440px]">
            {/* alone morbido per dare profondità */}
            <div
              className="absolute inset-[12%] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(47,165,106,0.20), transparent 70%)' }}
            />

            {/* glucometro: in alto a destra, inclinato, galleggia */}
            <motion.div
              className="absolute right-0 top-[2%] z-10 w-[55%]"
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              <motion.img
                src="/glucometro.png"
                alt="Glucometro che mostra 112 mg/dL, in range"
                className="w-full -rotate-6 drop-shadow-[0_28px_55px_rgba(21,37,43,0.20)]"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* fumetto con domande che ruotano — appena sopra l'agente, come se lo dicesse lui */}
            <motion.div
              className="absolute left-[6%] top-[34%] z-30"
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 18 }}
            >
              <ChatBubble />
            </motion.div>

            {/* agente: in basso a sinistra, grande, cliccabile */}
            <motion.a
              href="#assistente"
              aria-label="Fai una domanda all'assistente"
              className="group absolute bottom-0 left-[6%] z-20 block w-[50%] cursor-pointer"
              initial={{ opacity: 0, scale: 0.6, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.55 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.img
                src="/agente.png"
                alt="Il tuo assistente"
                className="w-full drop-shadow-[0_22px_44px_rgba(21,37,43,0.22)]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              />
              <span className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-glu-green px-3 py-1 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                Tocca e chiedi
              </span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* ===================== SEZIONI (landing a scrolling) ===================== */}
      <main className="relative">
        {/* ===== L'ASSISTENTE — il cuore del sito ===== */}
        <section id="assistente" className="relative scroll-mt-24">
          <div className="mx-auto flex max-w-6xl px-5 sm:px-8">
            <div className="relative hidden w-24 flex-none sm:block md:w-28">
              <ThreadNode />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex-1 py-24"
            >
              <p className="mb-3 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-glu-green-deep">L'assistente</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-ink">Fai la tua domanda</h2>
              <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-ink/75">
                Qui l'assistente ti risponde <strong className="text-ink">davvero</strong>: scrivi un dubbio sul
                diabete e ricevi una spiegazione semplice — gratis, in italiano, quando vuoi.
              </p>
              <div className="mt-8 max-w-2xl">
                <ChatAssistant />
              </div>
            </motion.div>
          </div>
        </section>

        <section id="chi-sono" className="relative scroll-mt-24">
          <div className="mx-auto flex max-w-6xl px-5 sm:px-8">
            <div className="relative hidden w-24 flex-none sm:block md:w-28">
              <ThreadNode />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex-1 py-24"
            >
              <p className="mb-3 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-glu-green-deep">La mia storia</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-ink">Chi sono</h2>

              {/* lead: testo + foto */}
              <div className="mt-9 grid gap-8 md:grid-cols-2 md:items-center">
                <div className="space-y-4 text-[1.05rem] leading-relaxed text-ink/75">
                  <p>
                    Mi chiamo <strong className="text-ink">Fabio</strong>, ho 33 anni e convivo con il diabete
                    di tipo 1 da quando avevo 3 anni: fa parte della mia vita da circa 30 anni. Non è qualcosa
                    che ho conosciuto da poco, ma una realtà con cui sono cresciuto giorno dopo giorno.
                  </p>
                  <p>
                    Il diabete di tipo 1 non riguarda solo me: anche <strong className="text-ink">mio fratello</strong>{' '}
                    convive con la stessa malattia. I miei genitori non sono diabetici, ma abbiamo imparato presto
                    cosa significa gestire una condizione cronica ogni giorno.
                  </p>
                </div>
                <div className="overflow-hidden rounded-3xl shadow-[0_24px_60px_rgba(21,37,43,0.18)] ring-1 ring-black/5">
                  <img src="/fabio.png" alt="Fabio Denuzzo" className="h-full w-full object-cover" />
                </div>
              </div>

              {/* timeline terapie */}
              <div className="mt-12">
                <p className="mb-4 text-sm font-semibold text-ink-soft">30 anni di terapie, in breve</p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  {[
                    { t: 'Iniezioni', d: 'Actrapid, Novorapid, Protaphane', c: 'var(--color-glu-red)' },
                    { t: 'Basale', d: 'Lantus, Tresiba', c: 'var(--color-glu-yellow)' },
                    { t: 'Oggi', d: 'Microinfusore', c: 'var(--color-glu-green)' },
                  ].map((s, i) => (
                    <div key={s.t} className="flex items-center gap-3">
                      <div className="rounded-2xl border border-line bg-white/80 px-5 py-4 shadow-sm backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.c }} />
                          <span className="font-semibold text-ink">{s.t}</span>
                        </div>
                        <p className="mt-1 text-sm text-ink-soft">{s.d}</p>
                      </div>
                      {i < 2 && <span className="hidden text-lg text-ink-soft sm:inline">→</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* sotto-sezioni */}
              <div className="mt-14 max-w-2xl space-y-12">
                <div>
                  <h3 className="font-display text-2xl font-bold text-ink">Perché parlo di diabete</h3>
                  <div className="mt-4 space-y-4 text-[1.05rem] leading-relaxed text-ink/75">
                    <p>
                      Ho creato questo sito e i miei canali social per condividere la mia esperienza e provare ad
                      aiutare chi affronta il diabete, l'insulino-resistenza o un cambiamento importante nel proprio
                      stile di vita.
                    </p>
                    <p>
                      So quanto può essere difficile, soprattutto all'inizio. Lo so da persona diabetica, ma anche
                      pensando a ciò che hanno vissuto i miei genitori nel gestire il diabete di un bambino. Capisco
                      le paure, i dubbi, le difficoltà quotidiane — e quanto sia complicato cambiare abitudini da
                      adulti, ad esempio con un diabete di tipo 2 o un'insulino-resistenza.
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-ink">Il progetto</h3>
                  <div className="mt-4 space-y-4 text-[1.05rem] leading-relaxed text-ink/75">
                    <p>
                      Oltre all'esperienza personale, negli anni mi sono occupato di tecnologia, competizioni nei
                      videogiochi e intelligenza artificiale applicata al business.
                    </p>
                    <p>
                      Da questa unione tra <strong className="text-ink">esperienza personale</strong> e{' '}
                      <strong className="text-ink">competenze tecnologiche</strong> nasce questo progetto: un sito
                      sul diabete con contenuti gratuiti e un agente AI creato da me, per offrire consigli, spunti e
                      un primo orientamento a chi ne ha bisogno.
                    </p>
                  </div>
                </div>
              </div>

              {/* BLOCCO AI-BUSINESS — Fabio si presenta a chi legge (evidente, si "vende") */}
              <div className="mt-12 max-w-2xl overflow-hidden rounded-3xl bg-gradient-to-br from-glu-green-deep to-[#0d3a27] p-7 text-white shadow-[0_24px_60px_rgba(33,138,87,0.28)]">
                <p className="text-[0.74rem] font-bold uppercase tracking-[0.18em] text-white/70">Oltre al diabete · il mio lavoro</p>
                <h3 className="mt-2 font-display text-[1.7rem] font-bold leading-tight">
                  Costruisco agenti AI e automazioni per il business
                </h3>
                <p className="mt-3 text-[1.02rem] leading-relaxed text-white/85">
                  Questo stesso assistente l'ho progettato e costruito io. Nel mio lavoro aiuto aziende e
                  professionisti a <strong className="text-white">risparmiare tempo e denaro</strong>: agenti AI su
                  misura, automazioni che eliminano i lavori ripetitivi e siti web che convertono. Se hai un
                  processo lento o costoso, quasi sempre si può automatizzare.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {['🤖 Agenti AI su misura', '⚙️ Automazioni', '🌐 Web design'].map((x) => (
                    <li key={x} className="rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-medium">
                      {x}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://denuzzogaming.com/business"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-glu-green-deep transition hover:bg-white/90"
                >
                  Scopri cosa posso fare per te →
                </a>
              </div>

              {/* nota importante */}
              <div className="mt-12 max-w-2xl rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
                <p className="font-semibold text-ink">⚠️ Una nota importante</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">
                  Non sono un medico e questo sito non sostituisce il parere di un professionista sanitario. Tutto
                  ciò che trovi qui nasce dalla mia esperienza e offre consigli generali e supporto pratico. Per
                  qualsiasi dubbio, decisione o modifica della terapia, rivolgiti sempre al tuo medico o diabetologo.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== SOSTIENI — donazione libera (bottone rosso) ===== */}
        <section id="sostieni" className="relative scroll-mt-24">
          <div className="mx-auto flex max-w-6xl px-5 sm:px-8">
            <div className="relative hidden w-24 flex-none sm:block md:w-28">
              <ThreadNode />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex-1 py-24"
            >
              <p className="mb-3 text-[0.78rem] font-bold uppercase tracking-[0.16em] text-glu-red">Sostieni</p>
              <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-ink">
                Aiutami a tenerlo vivo
              </h2>

              <div className="mt-7 max-w-2xl rounded-3xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-8 shadow-[0_24px_60px_rgba(224,72,60,0.14)]">
                <div className="text-3xl">❤️</div>
                <p className="mt-3 text-[1.05rem] leading-relaxed text-ink/80">
                  Questo progetto è — e resterà — <strong className="text-ink">gratuito</strong>. Ma tenerlo online e
                  far funzionare l'assistente AI ha dei <strong className="text-ink">costi reali</strong>: ogni
                  risposta dell'agente e i server hanno un prezzo.
                </p>
                <p className="mt-3 text-[1.05rem] leading-relaxed text-ink/80">
                  Se ti è stato utile e vuoi che continui a esserlo anche per chi verrà dopo di te, una piccola{' '}
                  <strong className="text-glu-red">donazione libera</strong> fa davvero la differenza. Non è
                  obbligatoria: chi non può o non vuole, continua a usare tutto gratis.
                </p>
                <a
                  href="#"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-glu-red px-7 py-3.5 font-semibold text-white shadow-lg transition hover:brightness-95"
                >
                  <span aria-hidden>❤️</span> Fai una donazione libera
                </a>
                <p className="mt-4 text-sm text-ink-soft">
                  Ogni aiuto, anche piccolo, mantiene il progetto utile per sempre più persone. Grazie. 🙏
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ============================ FOOTER ============================ */}
      <footer className="relative border-t border-line bg-white/70 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <LogoBadge />
                <span className="font-display text-lg font-semibold tracking-tight text-ink">Fabio Denuzzo</span>
              </div>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
                Convivo col diabete da 30 anni. Un assistente AI gratuito e la mia esperienza, per aiutarti a
                capire — mai per sostituire il medico.
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">Diabete</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                <li><a href="#assistente" className="hover:text-ink">Assistente</a></li>
                <li><a href="#chi-sono" className="hover:text-ink">Chi sono</a></li>
                <li><a href="#sostieni" className="hover:text-ink">Sostieni</a></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">Ecosistema</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                <li><a href="/" className="hover:text-ink">Home</a></li>
                <li><a href="https://denuzzogaming.com" target="_blank" rel="noopener noreferrer" className="hover:text-ink">Gaming ↗</a></li>
                <li><a href="https://denuzzogaming.com/business" target="_blank" rel="noopener noreferrer" className="hover:text-ink">Business ↗</a></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">Seguimi</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                <li><a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-ink">TikTok ↗</a></li>
                <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-ink">YouTube ↗</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Fabio Denuzzo — Strumento educativo, non sostituisce il medico. In emergenza: 112 / 118.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-ink">Privacy</a>
              <a href="#" className="hover:text-ink">Cookie</a>
              <a href="#" className="hover:text-ink">Termini</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
