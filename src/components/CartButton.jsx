import { ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useCartStore, { selectTotalItems } from "../store/cartStore";

/** Botón flotante. Se oculta en el carrito y en el checkout. */
const CartButton = () => {
  const totalItems = useCartStore(selectTotalItems);
  const { pathname } = useLocation();

  const hidden = ["/carrito", "/checkout"].includes(pathname);
  if (hidden || totalItems === 0) return null;

  return (
    <Link
      to="/carrito"
      className="cart-fab"
      aria-label={`Ver carrito, ${totalItems} productos`}
    >
      <ShoppingCart size={22} aria-hidden="true" />
      <span className="cart-fab__count">{totalItems}</span>
    </Link>
  );
};

export default CartButton;
