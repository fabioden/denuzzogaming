import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import Coaching from "@/pages/Coaching";
import Newsletter from "@/pages/Newsletter";
import Article from "@/pages/Article";
import Privacy from "@/pages/Privacy";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coaching" element={<Coaching />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/newsletter/:slug" element={<Article />} />
            {/* Blog unificato dentro Newsletter — redirect legacy */}
            <Route path="/blog" element={<Navigate to="/newsletter" replace />} />
            <Route path="/blog/:slug" element={<Navigate to="/newsletter" replace />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}
