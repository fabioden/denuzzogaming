import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import Hub from "@/pages/Hub";
import Diabete from "@/pages/Diabete";
import Home from "@/pages/Home";
import Coaching from "@/pages/Coaching";
import Newsletter from "@/pages/Newsletter";
import Article from "@/pages/Article";
import Privacy from "@/pages/Privacy";

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
      </BrowserRouter>
    </HelmetProvider>
  );
}
