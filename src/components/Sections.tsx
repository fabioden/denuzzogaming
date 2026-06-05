import { Link } from "react-router-dom";
import { homeSections } from "@/content";
import Reveal from "@/components/Reveal";
import Pic from "@/components/Pic";
import ShinyText from "@/components/reactbits/ShinyText";
import Magnet from "@/components/reactbits/Magnet";
import Tilt from "@/components/reactbits/Tilt";

type Section = (typeof homeSections)[number];

function Cta({ cta }: { cta: Section["cta"] }) {
  const ext = "external" in cta && cta.external;
  const cls = "whatsapp" in cta && cta.whatsapp ? "btn-whatsapp" : "btn-primary";
  if (ext) {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" className={cls}>{cta.label}</a>
    );
  }
  return <Link to={cta.href} className="btn-primary">{cta.label}</Link>;
}

function SectionSplit({ s, index }: { s: Section; index: number }) {
  return (
    <section
      id={s.id}
      className="min-h-[86vh] flex items-center max-w-[1180px] mx-auto px-[clamp(24px,5vw,64px)] py-[clamp(56px,9vh,120px)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-[clamp(36px,5vw,80px)] w-full">
        {/* LEFT — testo */}
        <Reveal dir="left" className="max-w-[520px] order-2 lg:order-1">
          <span className="section-label">{s.eyebrow}</span>
          <h2 className="text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1.02] mb-5">{s.title}</h2>
          <p className="text-[clamp(1.02rem,1.4vw,1.2rem)] text-ink-2 leading-relaxed mb-8 max-w-[44ch]">{s.text}</p>
          <Cta cta={s.cta} />
        </Reveal>

        {/* RIGHT — foto. La Community è un'illustrazione quadrata → riquadro quadrato (no taglio). */}
        <Reveal dir="right" delay={0.1} className="order-1 lg:order-2">
          <Tilt amplitude={7} radius={14}>
            <div className={`relative rounded-[14px] overflow-hidden border border-line-2 bg-card shadow-[0_30px_80px_-24px_rgba(0,0,0,.7)] ${s.id === "community" ? "aspect-square" : "aspect-[4/3]"}`}>
              <Pic base={s.img.base} alt={s.img.alt} eager={index === 0} className="w-full h-full object-cover" />
              {s.id !== "community" && <span className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />}
            </div>
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-[clamp(72px,12vh,150px)] text-center">
      <div className="gold-sep mb-[clamp(72px,12vh,150px)]" />
      <div className="max-w-[1180px] mx-auto px-[clamp(24px,5vw,64px)]">
        <Reveal>
          <h2 className="text-[clamp(2.4rem,6vw,4.2rem)] mb-5">Pronto a <em className="not-italic"><ShinyText text="vincere" color="#d6a21a" shineColor="#f6d98a" speed={4} spread={100} /></em>?</h2>
          <p className="text-[clamp(1.05rem,1.5vw,1.25rem)] text-ink-2 max-w-[46ch] mx-auto mb-9">Coaching 1:1 con un 2× Campione Italiano EA FC. Da €22,50 a sessione.</p>
          <Magnet padding={50} magnetStrength={4} wrapperClassName="inline-block">
            <Link to="/coaching" className="btn-primary">Prenota il coaching →</Link>
          </Magnet>
        </Reveal>
      </div>
    </section>
  );
}

export default function Sections() {
  return (
    <>
      {homeSections.map((s, i) => (
        <div key={s.id}>
          <div className="gold-sep" />
          <SectionSplit s={s} index={i} />
        </div>
      ))}
      <FinalCTA />
    </>
  );
}
