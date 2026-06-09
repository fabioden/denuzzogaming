import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";

// CODE-SPLIT: ogni pagina è un chunk separato, caricato solo quando serve.
// Così l'home (hub) non carica il 3D del diabete né le animazioni del gaming.
const Hub = lazy(() => import("@/pages/Hub"));
const Diabete = lazy(() => import("@/pages/Diabete"));
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
          {/* HUB e DIABETE: fuori dalla cornice gaming, con identità propria */}
          <Route path="/" element={<Hub />} />
          <Route path="/diabete" element={<Diabete />} />

          {/* MONDO GAMING: dentro il Layout gaming */}
          <Route element={<GamingShell />}>
            <Route path="/gaming" element={<Home />} />
            <Route path="/coaching" element={<Coaching />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/newsletter/:slug" element={<Article />} />
            {/* Blog unificato dentro Newsletter — redirect legacy */}
            <Route path="/blog" element={<Navigate to="/newsletter" replace />} />
            <Route path="/blog/:slug" element={<Navigate to="/newsletter" replace />} />
            <Route path="/privacy" element={<Privacy />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}
