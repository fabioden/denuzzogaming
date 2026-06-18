import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// I meta SEO/social pre-renderizzati (prerender-routes.mjs) servono ai crawler che non
// eseguono JavaScript. Appena l'app parte li rimuoviamo, così react-helmet inietta i suoi
// senza creare tag duplicati nel DOM (canonical, og:*, hreflang, ecc.).
document.querySelectorAll('head [data-prerender]').forEach((el) => el.remove())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
