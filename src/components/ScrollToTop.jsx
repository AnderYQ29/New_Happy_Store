import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Al cambiar de ruta la página vuelve arriba, como en cualquier sitio real. */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
