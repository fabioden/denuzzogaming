import { useEffect, useState } from "react";

// Vista SOLA LETTURA delle disponibilita' coaching: mostra gli slot liberi veri (presi da Cal.com
// tramite il Worker, chiave lato server) come caselle NON cliccabili. Serve a far vedere gli orari
// a chi non ha ancora comprato: si sfoglia tutta la settimana, ma prenotare resta impossibile.

const WORKER_URL = "https://denuzzo-stripe-webhook.business-fabiodenuzzo.workers.dev";
const TZ = "Europe/Rome";
const GIORNI = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];
const MESI = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];

type Slot = { start: string };

function ymd(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}
function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
// L'orario arriva gia' in fuso Europe/Rome (es. "2026-10-16T20:00:00.000+02:00") -> prendo HH:MM dopo la T.
function hhmm(iso: string): string {
  return iso.slice(11, 16);
}

export default function AvailabilityView({ notice }: { notice?: string } = {}) {
  const [weekStart, setWeekStart] = useState<Date>(startOfToday);
  const [data, setData] = useState<Record<string, Slot[]>>({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr(false);
    const start = ymd(weekStart);
    const end = ymd(addDays(weekStart, 7));
    fetch(`${WORKER_URL}/slots?start=${start}&end=${end}&timeZone=${encodeURIComponent(TZ)}`)
      .then((r) => r.json())
      .then((j) => {
        if (!alive) return;
        setData((j && j.data) || {});
        setLoading(false);
      })
      .catch(() => {
        if (!alive) return;
        setErr(true);
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [weekStart]);

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const canPrev = ymd(weekStart) > ymd(startOfToday());
  const last = days[6];
  const rangeLabel =
    weekStart.getMonth() === last.getMonth()
      ? `${weekStart.getDate()} - ${last.getDate()} ${MESI[last.getMonth()]}`
      : `${weekStart.getDate()} ${MESI[weekStart.getMonth()]} - ${last.getDate()} ${MESI[last.getMonth()]}`;
  const totalSlots = Object.values(data).reduce((n, a) => n + (a ? a.length : 0), 0);

  return (
    <div className="rounded-[var(--radius-card)] border border-line-2 bg-card overflow-hidden">
      {notice && (
        <div className="flex items-start gap-2.5 px-4 sm:px-5 py-3 bg-gold/[.1] border-b border-gold/35 text-ink text-[.88rem] leading-snug">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] text-gold shrink-0 mt-[1px]" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          <span>{notice}</span>
        </div>
      )}

      {/* Testata: navigazione settimana */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-b border-line-2">
        <div>
          <p className="text-ink font-medium text-[.98rem] leading-tight">{rangeLabel}</p>
          <p className="text-muted text-[.78rem]">Disponibilità reali, aggiornate dal vivo</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => canPrev && setWeekStart(addDays(weekStart, -7))}
            disabled={!canPrev}
            aria-label="Settimana precedente"
            className="w-9 h-9 grid place-items-center rounded-full border border-line-2 text-ink-2 enabled:hover:border-gold enabled:hover:text-gold transition-colors disabled:opacity-35 disabled:cursor-not-allowed"
          >
            ‹
          </button>
          <button
            onClick={() => setWeekStart(addDays(weekStart, 7))}
            aria-label="Settimana successiva"
            className="w-9 h-9 grid place-items-center rounded-full border border-line-2 text-ink-2 hover:border-gold hover:text-gold transition-colors"
          >
            ›
          </button>
        </div>
      </div>

      {/* Griglia giorni */}
      {loading ? (
        <p className="text-ink-2 text-[.92rem] px-5 py-10 text-center">Carico le disponibilità…</p>
      ) : err ? (
        <p className="text-ink-2 text-[.92rem] px-5 py-10 text-center">Non riesco a caricare le disponibilità ora. Riprova tra poco.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-px bg-line-2">
            {days.map((d) => {
              const slots = data[ymd(d)] || [];
              return (
                <div key={ymd(d)} className="bg-card p-2.5 min-h-[120px]">
                  <div className="text-center mb-2">
                    <p className="text-muted text-[.72rem] uppercase tracking-[.08em]">{GIORNI[d.getDay()]}</p>
                    <p className="text-ink font-display text-[1.05rem] leading-none">{d.getDate()}</p>
                  </div>
                  {slots.length === 0 ? (
                    <p className="text-muted text-[.78rem] text-center mt-3">—</p>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      {slots.map((s) => (
                        <span
                          key={s.start}
                          className="block text-center text-[.82rem] text-ink-2 bg-[#0f0c08] border border-line-2 rounded-[7px] py-1 select-none"
                        >
                          {hhmm(s.start)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {totalSlots === 0 && (
            <p className="text-muted text-[.85rem] px-5 py-4 text-center border-t border-line-2">Nessuno slot libero in questa settimana. Prova la successiva ›</p>
          )}
        </>
      )}
    </div>
  );
}
