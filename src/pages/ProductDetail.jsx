import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, RefreshCw, Star } from "lucide-react";
import useCartStore from "../store/cartStore";
import { useProduct } from "../hooks/useProducts";
import QuantityStepper from "../components/QuantityStepper";
import { capitalize, formatPrice } from "../utils/format";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const { product, loading, error, retry } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    setQuantity(1);
    setAdded(false);
  }, [id]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/carrito");
  };

  if (error) {
    return (
      <section className="section">
        <div className="notice notice--error" role="alert">
          <p>No encontramos este producto. Puede que ya no esté disponible.</p>
          <div className="notice__actions">
            <button type="button" className="btn btn--primary" onClick={retry}>
              <RefreshCw size={16} aria-hidden="true" />
              Reintentar
            </button>
            <Link to="/productos" className="btn btn--ghost">
              Volver al catálogo
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <Link to="/productos" className="back-link">
        <ArrowLeft size={16} aria-hidden="true" />
        Volver al catálogo
      </Link>

      {loading || !product ? (
        <div className="detail">
          <div className="skeleton skeleton--detail" aria-hidden="true" />
          <div className="detail__info">
            <div className="skeleton skeleton--line skeleton--sm" />
            <div className="skeleton skeleton--line" />
            <div className="skeleton skeleton--line skeleton--md" />
            <div className="skeleton skeleton--line" />
          </div>
          <p className="visually-hidden" role="status">
            Cargando producto
          </p>
        </div>
      ) : (
        <div className="detail">
          <div className="detail__media">
            <img src={product.image} alt={product.title} loading="lazy" />
          </div>

          <div className="detail__info">
            <p className="detail__category">{capitalize(product.category)}</p>
            <h1 className="detail__title">{product.title}</h1>

            {product.rating?.rate != null && (
              <p className="detail__rating">
                <Star size={16} aria-hidden="true" />
                {product.rating.rate} · {product.rating.count} reseñas
              </p>
            )}

            <p className="detail__price">{formatPrice(product.price)}</p>
            <p className="detail__description">{product.description}</p>

            <div className="detail__actions">
              <QuantityStepper value={quantity} onChange={setQuantity} />
              <button type="button" className="btn btn--primary btn--lg" onClick={handleBuyNow}>
                Comprar ahora
              </button>
              <button type="button" className="btn btn--ghost btn--lg" onClick={handleAdd}>
                Agregar al carrito
              </button>
            </div>

            <p className="detail__feedback" role="status">
              {added && (
                <>
                  <Check size={16} aria-hidden="true" />
                  Agregado al carrito. <Link to="/carrito">Ver carrito</Link>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
