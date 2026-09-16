import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import logo from "../assets/logoHappy.png";
import useCartStore, { selectTotalItems } from "../store/cartStore";

const LINKS = [
  { to: "/", label: "Inicio", end: true },
  { to: "/productos", label: "Productos" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const totalItems = useCartStore(selectTotalItems);

  // El menú móvil se cierra solo al cambiar de página.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <div className="site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="Happy Store, ir al inicio">
          <img src={logo} width="56" height="56" alt="" />
          <span>Happy Store</span>
        </Link>

        <nav
          id="menu-principal"
          className={`site-nav${open ? " is-open" : ""}`}
          aria-label="Navegación principal"
        >
          {LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `site-nav__link${isActive ? " is-active" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link to="/carrito" className="cart-link" aria-label={`Carrito, ${totalItems} productos`}>
            <ShoppingCart size={22} aria-hidden="true" />
            {totalItems > 0 && <span className="cart-link__count">{totalItems}</span>}
          </Link>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-principal"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
