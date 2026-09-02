import { useEffect, useState } from "react";

// Urgenza dell'offerta fondatore: una scadenza vera (da confermare) + posti limitati.
// NB: la data e il numero posti sono indicativi: vanno fissati da Fabio quando decide l'offerta.
// Scadenza ravvicinata: un'urgenza vera vende, 3 mesi no. Da confermare da Fabio.
const DEADLINE = "2026-07-07T00:00:00"; // ~18 giorni: urgenza reale
const SPOTS = 100;

function timeLeft() {
  const ms = new Date(DEADLINE).getTime() - Date.now();
  if (ms <= 0) return null;
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  return { days, hours };
}

export default function FounderUrgency() {
  const [left, setLeft] = useState(timeLeft());
  useEffect(() => {
    const i = setInterval(() => setLeft(timeLeft()), 60000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-[.88rem]">
      <span className="inline-flex items-center gap-1.5 text-gold font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-gold" style={{ animation: "livePulse 2.4s infinite" }} />
        Offerta fondatore
      </span>
      <span className="text-ink-2">riservata ai primi <strong className="text-ink">{SPOTS}</strong></span>
      {left && (
        <span className="text-ink-2">· si chiude tra <strong className="text-ink">{left.days}g {left.hours}h</strong></span>
      )}
    </div>
  );
}
