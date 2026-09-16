import { Link } from "react-router-dom";
import BienvenidoImg from "../assets/Bienvenidos.jpeg";
import Producto1 from "../assets/Producto1.png";
import Producto2 from "../assets/producto2.png";
import Mision from "../assets/mision.png";
import Vision from "../assets/vision.png";

const AboutUs = () => (
  <>
    <section className="section about-intro">
      <div className="about-intro__text">
        <h1>Bienvenidos a Happy Store</h1>
        <p>
          Creemos que la felicidad está en los pequeños detalles. Por eso
          reunimos ropa con estilo, accesorios únicos, tecnología y artículos
          para el hogar en un solo lugar.
        </p>
        <p>
          Cada producto del catálogo se elige pensando en tu comodidad y en tu
          día a día. Explora, descubre y disfruta: en Happy Store siempre hay
          algo para ti.
        </p>
        <Link to="/productos" className="btn btn--primary btn--lg">
          Ver el catálogo
        </Link>
      </div>

      <img
        className="about-intro__image"
        src={BienvenidoImg}
        alt="Equipo de Happy Store dando la bienvenida"
        loading="lazy"
      />
    </section>

    <section className="section about-story">
      <img src={Producto1} alt="" width="150" height="150" loading="lazy" />

      <div className="about-story__text">
        <h2>Sobre nosotros</h2>
        <p>
          Happy Store nació con una misión clara: ofrecer productos variados,
          modernos y accesibles que se adapten a todos los estilos de vida.
        </p>
        <p>
          Desde nuestros inicios hemos crecido como una tienda integral donde
          encuentras desde ropa y accesorios hasta tecnología y artículos para el
          hogar. No solo vendemos productos: construimos momentos de alegría.
        </p>
      </div>

      <img src={Producto2} alt="" width="150" height="150" loading="lazy" />
    </section>

    <section className="section section--narrow">
      <div className="about-commitment">
        <h2>Nuestro compromiso</h2>
        <p>
          Desde ropa y accesorios hasta tecnología y artículos para el hogar,
          cada producto se selecciona para ofrecerte variedad, estilo y
          comodidad en un solo lugar.
        </p>
      </div>

      <div className="pillars">
        <article className="pillar">
          <img src={Mision} alt="" width="100" height="100" loading="lazy" />
          <h3>Misión</h3>
          <p>
            Brindar una experiencia de compra única, con productos de calidad a
            precios accesibles, cuidando la satisfacción de cada cliente.
          </p>
        </article>

        <article className="pillar">
          <img src={Vision} alt="" width="100" height="100" loading="lazy" />
          <h3>Visión</h3>
          <p>
            Ser la tienda virtual preferida en el Perú por nuestra diversidad de
            productos y el compromiso con la felicidad de quienes nos compran.
          </p>
        </article>
      </div>
    </section>
  </>
);

export default AboutUs;
