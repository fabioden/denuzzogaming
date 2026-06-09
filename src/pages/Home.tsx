import Hero from "@/components/Hero";
import Sections from "@/components/Sections";
import Seo from "@/components/Seo";
import Marquee from "@/components/Marquee";
import CareerDeck from "@/components/CareerDeck";
import { useContent } from "@/content/use-content";
import { useLang } from "@/i18n";

export default function Home() {
  const { credentials } = useContent();
  const lang = useLang();

  return (
    <>
      <Seo
        title={
          lang === "en"
            ? "Fabio Denuzzo — EA FC 26 Coach | 2× Italian Champion & eWorld Cup"
            : "Fabio Denuzzo — Coach EA FC 26 | 2× Campione Italiano & eWorld Cup"
        }
        description={
          lang === "en"
            ? "Train to win on EA FC 26 with Fabio Denuzzo: 2× Italian Champion, FIFA eWorld Cup competitor, former Juventus pro player. 1:1 coaching from €22.50."
            : "Allenati a vincere su EA FC 26 con Fabio Denuzzo: 2× Campione Italiano, partecipante FIFA eWorld Cup, ex pro player Juventus. Coaching 1:1 da €22,50."
        }
        path="/gaming"
        bilingual
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
