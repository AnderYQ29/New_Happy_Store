import { Link } from "react-router-dom";
import logo from "../assets/logoHappy.png";
import face from "../assets/facebook.svg";
import insta from "../assets/instagram.svg";
import github from "../assets/github.svg";

const SOCIAL = [
  { href: "https://www.instagram.com/jhon_anderson29/?hl=es", icon: insta, label: "Instagram" },
  { href: "https://www.facebook.com/profile.php?id=100009151740355", icon: face, label: "Facebook" },
  { href: "https://github.com/AnderYQ29", icon: github, label: "GitHub" },
];

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer__inner">
      <div className="site-footer__brand">
        <img src={logo} width="64" height="64" alt="" />
        <p>
          Productos escogidos con cuidado para el día a día. Envíos a todo el Perú
          en 24 a 72 horas.
        </p>
      </div>

      <nav className="site-footer__nav" aria-label="Enlaces del pie de página">
        <h2>Tienda</h2>
        <Link to="/productos">Productos</Link>
        <Link to="/carrito">Carrito</Link>
        <Link to="/nosotros">Nosotros</Link>
        <Link to="/contacto">Contacto</Link>
      </nav>

      <div className="site-footer__social">
        <h2>Síguenos</h2>
        <ul>
          {SOCIAL.map(({ href, icon, label }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <img src={icon} width="22" height="22" alt="" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <p className="site-footer__legal">© 2025 Happy Store. Proyecto académico.</p>
  </footer>
);

export default Footer;
