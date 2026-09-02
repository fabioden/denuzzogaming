import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "@/components/Layout";
import MemberLayout from "@/components/MemberLayout";
import ScrollToTop from "@/components/ScrollToTop";

// CODE-SPLIT: ogni pagina è un chunk separato, caricato solo quando serve.
// Così l'home (hub) non carica il 3D del diabete né le animazioni del gaming.
const Hub = lazy(() => import("@/pages/Hub"));
const Home = lazy(() => import("@/pages/Home"));
const Coaching = lazy(() => import("@/pages/Coaching"));
const Academy = lazy(() => import("@/pages/Academy"));
const Newsletter = lazy(() => import("@/pages/Newsletter"));
const Article = lazy(() => import("@/pages/Article"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Login = lazy(() => import("@/pages/Login"));
const Gratis = lazy(() => import("@/pages/Gratis"));
const AccountHome = lazy(() => import("@/pages/account/Home"));
const AccountPercorso = lazy(() => import("@/pages/account/Percorso"));
const AccountDashboard = lazy(() => import("@/pages/account/Dashboard"));
const AccountWeek = lazy(() => import("@/pages/account/Week"));
const AccountCourses = lazy(() => import("@/pages/account/Courses"));
const AccountCourseDetail = lazy(() => import("@/pages/account/CourseDetail"));
const AccountArchive = lazy(() => import("@/pages/account/Archive"));
const AccountCoaching = lazy(() => import("@/pages/account/Coaching"));
const AccountSettings = lazy(() => import("@/pages/account/Settings"));

// La cornice gaming (nav, footer, sfondo) avvolge SOLO il mondo gaming.
function GamingShell() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

// Il mondo diabete vive sul sottodominio dedicato diabete.denuzzogaming.com (SEO separata).
// Redirect 1:1 per non avere contenuti duplicati: /diabete/articoli/x → .../articoli/x
function DiabeteRedirect() {
  const { pathname } = useLocation();
  useEffect(() => {
    const rest = pathname.replace(/^\/diabete/, "");
    window.location.replace("https://diabete.denuzzogaming.com" + (rest || "/"));
  }, [pathname]);
  return null;
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
          {/* Il mondo diabete è sul sottodominio dedicato → redirect 1:1 (no contenuti duplicati) */}
          <Route path="/diabete/*" element={<DiabeteRedirect />} />

          {/* MONDO GAMING: dentro il Layout gaming */}
          <Route element={<GamingShell />}>
            {/* Italiano (default) */}
            <Route path="/gaming" element={<Home />} />
            <Route path="/coaching" element={<Coaching />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/newsletter/:slug" element={<Article />} />
            <Route path="/privacy" element={<Privacy />} />
            {/* Login / registrazione alla membership (resta nella cornice sito) */}
            <Route path="/login" element={<Login />} />
            {/* Amo: pagina dove il traffico YouTube lascia l'email e riceve la lezione gratis */}
            <Route path="/gratis" element={<Gratis />} />
            {/* Inglese (mirror /en) — stesso componente, lingua derivata dall'URL */}
            <Route path="/en/gaming" element={<Home />} />
            <Route path="/en/coaching" element={<Coaching />} />
            <Route path="/en/academy" element={<Academy />} />
            <Route path="/en/newsletter" element={<Newsletter />} />
            <Route path="/en/newsletter/:slug" element={<Article />} />
            <Route path="/en/privacy" element={<Privacy />} />
            {/* Blog unificato dentro Newsletter — redirect legacy */}
            <Route path="/blog" element={<Navigate to="/newsletter" replace />} />
            <Route path="/blog/:slug" element={<Navigate to="/newsletter" replace />} />
          </Route>

          {/* AREA MEMBRI: guscio dedicato (no nav/footer marketing, con guardia auth) */}
          {/* Una pagina chiara per ogni voce di menu. */}
          <Route element={<MemberLayout />}>
            <Route path="/account" element={<AccountHome />} />
            <Route path="/account/percorso" element={<AccountPercorso />} />
            <Route path="/account/dashboard" element={<AccountDashboard />} />
            <Route path="/account/settimana" element={<AccountWeek />} />
            <Route path="/account/allenamenti" element={<AccountCourses />} />
            <Route path="/account/corso/:id" element={<AccountCourseDetail />} />
            <Route path="/account/archivio" element={<AccountArchive />} />
            <Route path="/account/coaching" element={<AccountCoaching />} />
            <Route path="/account/abbonamento" element={<AccountSettings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}
