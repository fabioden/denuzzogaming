import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";

// CODE-SPLIT: ogni pagina è un chunk separato, caricato solo quando serve.
// Così l'home (hub) non carica il 3D del diabete né le animazioni del gaming.
const Hub = lazy(() => import("@/pages/Hub"));
const Home = lazy(() => import("@/pages/Home"));
const Coaching = lazy(() => import("@/pages/Coaching"));
const Newsletter = lazy(() => import("@/pages/Newsletter"));
const Article = lazy(() => import("@/pages/Article"));
const Privacy = lazy(() => import("@/pages/Privacy"));

// La cornice gaming (nav, footer, sfondo) avvolge SOLO il mondo gaming.
function GamingShell() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={null}>
        <Routes>
          {/* HUB (bilingue: / = IT, /en = EN) */}
          <Route path="/" element={<Hub />} />
          <Route path="/en" element={<Hub />} />
          {/* /diabete temporaneamente NON pubblico (chat backend = Fase 3, contenuti da revisione clinica) */}
          <Route path="/diabete" element={<Navigate to="/" replace />} />

          {/* MONDO GAMING: dentro il Layout gaming */}
          <Route element={<GamingShell />}>
            {/* Italiano (default) */}
            <Route path="/gaming" element={<Home />} />
            <Route path="/coaching" element={<Coaching />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/newsletter/:slug" element={<Article />} />
            <Route path="/privacy" element={<Privacy />} />
            {/* Inglese (mirror /en) — stesso componente, lingua derivata dall'URL */}
            <Route path="/en/gaming" element={<Home />} />
            <Route path="/en/coaching" element={<Coaching />} />
            <Route path="/en/newsletter" element={<Newsletter />} />
            <Route path="/en/newsletter/:slug" element={<Article />} />
            <Route path="/en/privacy" element={<Privacy />} />
            {/* Blog unificato dentro Newsletter — redirect legacy */}
            <Route path="/blog" element={<Navigate to="/newsletter" replace />} />
            <Route path="/blog/:slug" element={<Navigate to="/newsletter" replace />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}
