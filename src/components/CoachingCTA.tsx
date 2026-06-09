import ShinyText from "@/components/reactbits/ShinyText";
import Magnet from "@/components/reactbits/Magnet";
import { L, useLang } from "@/i18n";

const wrap = "max-w-[1100px] mx-auto px-[clamp(24px,5vw,56px)]";

/** Pre-footer CTA coaching, riusabile su blog/newsletter/articoli. Bilingue IT/EN. */
export default function CoachingCTA() {
  const lang = useLang();
  return (
    <section className="py-[clamp(56px,7vh,96px)] text-center">
      <div className="gold-sep mb-[clamp(56px,7vh,96px)]" />
      <div className={wrap}>
        <div className="fade-up">
          <h2 className="text-[clamp(2rem,5vw,3.4rem)]">
            {lang === "en" ? "Ready to " : "Pronto a "}
            <em className="not-italic">
              <ShinyText text={lang === "en" ? "improve" : "migliorare"} color="#d6a21a" shineColor="#f6d98a" speed={4} spread={100} />
            </em>
            ?
          </h2>
          <p className="text-[clamp(1rem,1.4vw,1.18rem)] text-ink-2 max-w-[52ch] mx-auto mb-8 mt-[18px]">
            {lang === "en"
              ? "1:1 coaching with a 2× EA FC Italian Champion. From €22.50 per session."
              : "Coaching 1:1 con un 2× Campione Italiano. Da €22,50 a sessione."}
          </p>
          <Magnet padding={50} magnetStrength={4} wrapperClassName="inline-block">
            <L to="/coaching" className="btn-primary">{lang === "en" ? "Book coaching →" : "Prenota il coaching →"}</L>
          </Magnet>
        </div>
      </div>
    </section>
  );
}
