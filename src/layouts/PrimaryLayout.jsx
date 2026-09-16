import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartButton from "../components/CartButton";
import ScrollToTop from "../components/ScrollToTop";

const PrimaryLayout = () => (
  <div className="app-shell">
    <ScrollToTop />
    <Header />

    <main id="contenido" className="app-main">
      <Outlet />
    </main>

    <Footer />
    <CartButton />
  </div>
);

export default PrimaryLayout;
