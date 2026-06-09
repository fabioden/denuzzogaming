import Hero from "@/components/Hero";
import Sections from "@/components/Sections";
import Seo from "@/components/Seo";
import Marquee from "@/components/Marquee";
import CareerDeck from "@/components/CareerDeck";
import { credentials } from "@/content";

export default function Home() {
  return (
    <>
      <Seo
        title="Fabio Denuzzo — Coach EA FC 26 | 2× Campione Italiano & eWorld Cup"
        description="Allenati a vincere su EA FC 26 con Fabio Denuzzo: 2× Campione Italiano, partecipante FIFA eWorld Cup, ex pro player Juventus. Coaching 1:1 da €22,50."
        path="/gaming"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Fabio Denuzzo",
          jobTitle: "EA FC Coach & Content Creator",
          url: "https://denuzzogaming.com/gaming",
          sameAs: [
            "https://www.youtube.com/@denuzzofabio",
            "https://www.instagram.com/fabio_denuzzo_/",
            "https://www.twitch.tv/fabio_denuzzo",
            "https://www.tiktok.com/@fabio_denuzzo_",
            "https://x.com/_lionel_10_",
          ],
        }}
      />
      <Hero />
      <div className="py-6 border-y border-line">
        <Marquee items={credentials} />
      </div>
      <CareerDeck />
      <div className="gold-sep" />
      <Sections />
    </>
  );
}
