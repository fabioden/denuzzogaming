import { useLocation } from "react-router-dom";

// Sweep oro ad ogni cambio pagina. key={pathname} riavvia l'animazione CSS.
export default function PageTransition() {
  const { pathname } = useLocation();
  return <div key={pathname} className="page-sweep" aria-hidden="true" />;
}
