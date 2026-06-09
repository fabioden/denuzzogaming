import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

// Stub temporaneo: qui verrà portato il sito diabete completo (hero, chi sono, chat...).
export default function Diabete() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 text-[#15252b]">
      <Seo
        title="Diabete — Assistente AI gratuito | Fabio Denuzzo"
        description="Un assistente AI gratuito e l'esperienza di chi convive col diabete da 30 anni. In italiano, senza registrazione."
        path="/diabete"
      />
      <div className="max-w-md text-center">
        <div className="text-5xl">🩺</div>
        <h1 className="mt-4 text-3xl font-bold">Sezione Diabete</h1>
        <p className="mt-3 leading-relaxed text-[#56666b]">
          L'assistente AI sul diabete sta arrivando qui: lo stiamo integrando nel sito.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-[#2fa56a] px-6 py-3 font-semibold text-white transition hover:brightness-95"
        >
          ← Torna all'hub
        </Link>
      </div>
    </div>
  );
}
