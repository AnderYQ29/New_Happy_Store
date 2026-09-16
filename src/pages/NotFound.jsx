import { Link } from "react-router-dom";

const NotFound = () => (
  <section className="section section--narrow">
    <div className="not-found">
      <p className="not-found__code">404</p>
      <h1>Esta página no existe</h1>
      <p>
        Puede que el enlace esté mal escrito o que el producto ya no esté publicado.
      </p>
      <div className="not-found__actions">
        <Link to="/" className="btn btn--primary btn--lg">
          Ir al inicio
        </Link>
        <Link to="/productos" className="btn btn--ghost btn--lg">
          Ver productos
        </Link>
      </div>
    </div>
  </section>
);

export default NotFound;
