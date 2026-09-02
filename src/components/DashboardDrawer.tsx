import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDashboardData } from "@/hooks/useDashboardData";
import { DashOverview } from "@/components/DashboardSections";

// Tendina = VISTA VELOCE: il colpo d'occhio (card, livello, numeri) + il salto alla dashboard completa.
// Tutto il resto (le sezioni, la classifica, i grafici) vive nella pagina /account/dashboard.
export default function DashboardDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pathname } = useLocation();
  const { data, update } = useDashboardData();

  // Chiudi se navighi via (es. apri la dashboard completa o un esercizio).
  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-[105] bg-[#070509]/70 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="La mia dashboard"
        className={`fixed top-0 left-0 bottom-0 z-[106] w-[clamp(320px,92vw,420px)] bg-[#100d08] border-r border-line-2 shadow-[0_0_60px_rgba(0,0,0,.6)] flex flex-col transition-transform duration-300 ease-out ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-line-2 shrink-0">
          <div>
            <span className="section-label">La mia dashboard</span>
            <p className="font-display text-ink text-[1.15rem] mt-0.5">Colpo d'occhio</p>
          </div>
          <button onClick={onClose} aria-label="Chiudi" className="w-8 h-8 rounded-full border border-line-2 grid place-items-center text-ink-2 hover:text-gold hover:border-gold/50 transition-colors shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-[16px] h-[16px]"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {open && (
            <>
              <DashOverview data={data} update={update} />
              <Link to="/account/dashboard" className="btn-primary w-full justify-center mt-1">Apri la dashboard completa</Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
