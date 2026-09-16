import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2 } from "lucide-react";
import useCartStore, { selectTotalPrice } from "../store/cartStore";
import QuantityStepper from "../components/QuantityStepper";
import EmptyState from "../components/EmptyState";
import { formatPrice, truncate } from "../utils/format";

const SHIPPING_THRESHOLD = 80;
const SHIPPING_COST = 9.9;

const CartPage = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.cartItems);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = useCartStore(selectTotalPrice);

  if (cartItems.length === 0) {
    return (
      <section className="section">
        <h1>Tu carrito</h1>
        <EmptyState
          icon={ShoppingBag}
          title="Todavía no agregaste nada"
          description="Explora el catálogo y arma tu pedido. Guardamos lo que elijas aunque cierres la página."
        >
          <Link to="/productos" className="btn btn--primary btn--lg">
            Ir al catálogo
          </Link>
        </EmptyState>
      </section>
    );
  }

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  return (
    <section className="section">
      <h1>Tu carrito</h1>

      <div className="cart">
        <ul className="cart__list">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt="" width="72" height="72" loading="lazy" />

              <div className="cart-item__info">
                <h2>
                  <Link to={`/productos/${item.id}`}>{truncate(item.title, 70)}</Link>
                </h2>
                <p className="cart-item__unit">{formatPrice(item.price)} c/u</p>
              </div>

              <QuantityStepper
                value={item.quantity}
                onChange={(value) => setQuantity(item.id, value)}
                min={0}
                label={`Cantidad de ${item.title}`}
              />

              <p className="cart-item__total">{formatPrice(item.price * item.quantity)}</p>

              <button
                type="button"
                className="icon-btn"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Quitar ${item.title} del carrito`}
              >
                <Trash2 size={18} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>

        <aside className="summary">
          <h2>Resumen</h2>

          <dl className="summary__rows">
            <div>
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div>
              <dt>Envío</dt>
              <dd>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</dd>
            </div>
            <div className="summary__total">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>

          {shipping > 0 && (
            <p className="summary__hint">
              Te faltan {formatPrice(SHIPPING_THRESHOLD - subtotal)} para el envío gratis.
            </p>
          )}

          <button
            type="button"
            className="btn btn--primary btn--lg btn--block"
            onClick={() => navigate("/checkout")}
          >
            Continuar con la compra
          </button>

          <button type="button" className="btn btn--text" onClick={clearCart}>
            Vaciar carrito
          </button>
        </aside>
      </div>
    </section>
  );
};

export default CartPage;
