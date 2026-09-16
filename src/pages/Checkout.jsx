import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import useCartStore, { selectTotalPrice } from "../store/cartStore";
import { buildOrderCode, formatPrice, truncate } from "../utils/format";

const PAYMENT_METHODS = [
  { value: "visa", label: "Tarjeta Visa" },
  { value: "mastercard", label: "Tarjeta Mastercard" },
  { value: "yape", label: "Yape / Plin" },
  { value: "paypal", label: "PayPal" },
  { value: "cash", label: "Pago contra entrega" },
];

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  payment: "visa",
};

/** Devuelve un objeto con un mensaje por cada campo inválido. */
const validate = (form) => {
  const errors = {};

  if (form.name.trim().length < 3) errors.name = "Escribe tu nombre y apellido.";
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Revisa el formato del correo.";
  if (!/^\d{6,15}$/.test(form.phone.replace(/\s/g, "")))
    errors.phone = "Ingresa un teléfono de 6 a 15 dígitos.";
  if (form.address.trim().length < 6) errors.address = "Indica calle y número.";
  if (!form.city.trim()) errors.city = "Indica tu ciudad o distrito.";

  return errors;
};

const Checkout = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = useCartStore(selectTotalPrice);

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      document.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setOrder({ code: buildOrderCode(), total: subtotal, name: form.name });
    clearCart();
  };

  if (order) {
    return (
      <section className="section section--narrow">
        <div className="order-success">
          <CheckCircle2 size={48} aria-hidden="true" />
          <h1>Pedido confirmado</h1>
          <p>
            Gracias, {order.name.split(" ")[0]}. Tu pedido{" "}
            <strong>{order.code}</strong> por {formatPrice(order.total)} está en
            preparación. Te escribimos a {form.email} con el seguimiento.
          </p>
          <Link to="/productos" className="btn btn--primary btn--lg">
            Seguir comprando
          </Link>
        </div>
      </section>
    );
  }

  // Nadie debería llegar al checkout sin productos.
  if (cartItems.length === 0) return <Navigate to="/carrito" replace />;

  const field = (name) => ({
    name,
    value: form[name],
    onChange: handleChange,
    className: errors[name] ? "is-invalid" : "",
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <section className="section">
      <h1>Finalizar compra</h1>

      <div className="checkout">
        <form className="checkout__form" onSubmit={handleSubmit} noValidate>
          <h2>Datos de entrega</h2>

          <div className="field">
            <label htmlFor="name">Nombre y apellido</label>
            <input id="name" type="text" autoComplete="name" {...field("name")} />
            {errors.name && (
              <p className="field__error" id="name-error">{errors.name}</p>
            )}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="email">Correo electrónico</label>
              <input id="email" type="email" autoComplete="email" {...field("email")} />
              {errors.email && (
                <p className="field__error" id="email-error">{errors.email}</p>
              )}
            </div>

            <div className="field">
              <label htmlFor="phone">Teléfono</label>
              <input id="phone" type="tel" autoComplete="tel" {...field("phone")} />
              {errors.phone && (
                <p className="field__error" id="phone-error">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="field">
            <label htmlFor="address">Dirección</label>
            <input
              id="address"
              type="text"
              autoComplete="street-address"
              placeholder="Av. Arequipa 1234, dpto. 502"
              {...field("address")}
            />
            {errors.address && (
              <p className="field__error" id="address-error">{errors.address}</p>
            )}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="city">Ciudad o distrito</label>
              <input id="city" type="text" autoComplete="address-level2" {...field("city")} />
              {errors.city && (
                <p className="field__error" id="city-error">{errors.city}</p>
              )}
            </div>

            <div className="field">
              <label htmlFor="payment">Método de pago</label>
              <select id="payment" name="payment" value={form.payment} onChange={handleChange}>
                {PAYMENT_METHODS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn--primary btn--lg btn--block">
            Pagar {formatPrice(subtotal)}
          </button>
        </form>

        <aside className="summary">
          <h2>Tu pedido</h2>
          <ul className="summary__items">
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>
                  {item.quantity} × {truncate(item.title, 42)}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <dl className="summary__rows">
            <div className="summary__total">
              <dt>Total</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
          </dl>

          <Link to="/carrito" className="btn btn--text">
            Editar carrito
          </Link>
        </aside>
      </div>
    </section>
  );
};

export default Checkout;
