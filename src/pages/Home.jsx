import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PackageCheck, ShieldCheck, Truck } from "lucide-react";
import shop from "../assets/shopping.png";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import { useProductList } from "../hooks/useProducts";

const BENEFITS = [
  { icon: Truck, title: "Envío en 24 a 72 h", text: "A Lima y provincias, con seguimiento del pedido." },
  { icon: ShieldCheck, title: "Pago protegido", text: "Tarjeta, billetera digital o pago contra entrega." },
  { icon: PackageCheck, title: "Cambios sin vueltas", text: "Tienes 15 días para cambiar lo que no te convenza." },
];

const Home = () => {
  const { products, loading } = useProductList();

  const featured = useMemo(
    () =>
      [...products]
        .sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
        .slice(0, 4),
    [products]
  );

  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Tienda online · Perú</p>
          <h1 className="hero__title">
            No es solo una tienda,
            <br />
            es <span className="hero__wordmark">Happy St😄re</span>
          </h1>
          <p className="hero__text">
            Ropa, accesorios, tecnología y artículos para el hogar escogidos uno
            por uno. Precios claros, envío rápido y cero complicaciones.
          </p>
          <div className="hero__actions">
            <Link to="/productos" className="btn btn--primary btn--lg">
              Ver productos
            </Link>
            <Link to="/nosotros" className="btn btn--ghost btn--lg">
              Conocer la tienda
            </Link>
          </div>
        </div>

        <img className="hero__image" src={shop} alt="" width="450" height="500" />
      </section>

      <section className="benefits">
        {BENEFITS.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <article key={benefit.title} className="benefit">
              <Icon size={24} aria-hidden="true" />
              <h2>{benefit.title}</h2>
              <p>{benefit.text}</p>
            </article>
          );
        })}
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Lo mejor valorado</h2>
          <Link to="/productos" className="link-more">
            Ver todo el catálogo
          </Link>
        </div>

        <div className="product-grid">
          {loading
            ? Array.from({ length: 4 }, (_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </section>
    </>
  );
};

export default Home;
