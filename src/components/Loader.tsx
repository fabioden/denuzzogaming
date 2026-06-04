import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// Loader con logo FD + barra: lungo al primo ingresso, breve al cambio pagina.
export default function Loader() {
  const { pathname } = useLocation();
  const [active, setActive] = useState(true);
  const first = useRef(true);

  useEffect(() => {
    setActive(true);
    const dur = first.current ? 1150 : 700;
    first.current = false;
    const t = setTimeout(() => setActive(false), dur);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div className="loader" data-active={active} aria-hidden="true">
      <div key={pathname} className="loader__inner">
        <img src="/img/fd-logo.png" alt="" className="loader__logo" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
        <div className="loader__track"><span className="loader__fill" /></div>
      </div>
    </div>
  );
}
