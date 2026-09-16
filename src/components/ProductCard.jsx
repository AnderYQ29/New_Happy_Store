import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Plus, Star } from "lucide-react";
import useCartStore from "../store/cartStore";
import { capitalize, formatPrice, truncate } from "../utils/format";

const ProductCard = ({ product }) => {
  const { id, title, price, category, image, rating } = product;
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className="product-card">
      <Link to={`/productos/${id}`} className="product-card__media">
        <img src={image} alt={title} loading="lazy" />
      </Link>

      <div className="product-card__body">
        <p className="product-card__category">{capitalize(category)}</p>

        <h3 className="product-card__title">
          <Link to={`/productos/${id}`}>{truncate(title, 60)}</Link>
        </h3>

        {rating?.rate != null && (
          <p className="product-card__rating">
            <Star size={14} aria-hidden="true" />
            <span>{rating.rate}</span>
            <span className="product-card__reviews">({rating.count} reseñas)</span>
          </p>
        )}

        <div className="product-card__footer">
          <p className="product-card__price">{formatPrice(price)}</p>
          <button
            type="button"
            className={`btn-add${added ? " is-added" : ""}`}
            onClick={handleAdd}
          >
            {added ? <Check size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
            {added ? "Agregado" : "Agregar"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
