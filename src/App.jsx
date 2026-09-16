import { Navigate, Route, Routes, useParams } from "react-router-dom";
import PrimaryLayout from "./layouts/PrimaryLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

/** /products/12 (ruta antigua) -> /productos/12 */
const LegacyProductRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/productos/${id}`} replace />;
};

const App = () => (
  <Routes>
    <Route element={<PrimaryLayout />}>
      <Route index element={<Home />} />
      <Route path="productos" element={<Products />} />
      <Route path="productos/:id" element={<ProductDetail />} />
      <Route path="nosotros" element={<AboutUs />} />
      <Route path="contacto" element={<Contact />} />
      <Route path="carrito" element={<CartPage />} />
      <Route path="checkout" element={<Checkout />} />

      {/* Rutas antiguas: se redirigen para no romper enlaces ya compartidos. */}
      <Route path="producto" element={<Navigate to="/productos" replace />} />
      <Route path="products/:id" element={<LegacyProductRedirect />} />
      <Route path="about" element={<Navigate to="/nosotros" replace />} />
      <Route path="contact" element={<Navigate to="/contacto" replace />} />
      <Route path="cart" element={<Navigate to="/carrito" replace />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
