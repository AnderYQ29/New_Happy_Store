import { useState } from "react";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import contacto from "../assets/contact.webp";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  message: "",
  acceptTerms: false,
};

const validate = (form) => {
  const errors = {};

  if (form.name.trim().length < 3) errors.name = "Escribe tu nombre.";
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Revisa el formato del correo.";
  if (form.phone && !/^\d{6,15}$/.test(form.phone.replace(/\s/g, "")))
    errors.phone = "Ingresa solo números, entre 6 y 15 dígitos.";
  if (form.message.trim().length < 10)
    errors.message = "Cuéntanos un poco más, mínimo 10 caracteres.";
  if (!form.acceptTerms) errors.acceptTerms = "Necesitamos tu aceptación para responderte.";

  return errors;
};

const Contact = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [sentTo, setSentTo] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSentTo("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      document.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setSentTo(form.name.trim());
    setForm(INITIAL_FORM);
  };

  return (
    <section className="section">
      <div className="contact">
        <div className="contact__intro">
          <img src={contacto} alt="" width="120" height="120" />
          <h1>Hablemos</h1>
          <p>
            ¿Dudas sobre un producto, tu pedido o una devolución? Escríbenos y
            respondemos dentro de las 24 horas hábiles.
          </p>

          <ul className="contact__channels">
            <li>
              <Mail size={18} aria-hidden="true" />
              <a href="mailto:hola@happystore.pe">hola@happystore.pe</a>
            </li>
            <li>
              <Phone size={18} aria-hidden="true" />
              <a href="tel:+51987654321">+51 987 654 321</a>
            </li>
            <li>
              <MapPin size={18} aria-hidden="true" />
              Lima, Perú
            </li>
          </ul>
        </div>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          {sentTo && (
            <p className="notice notice--success" role="status">
              <CheckCircle2 size={18} aria-hidden="true" />
              Gracias, {sentTo}. Recibimos tu mensaje y te respondemos pronto.
            </p>
          )}

          <div className="field">
            <label htmlFor="contact-name">Nombre</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? "is-invalid" : ""}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <p className="field__error">{errors.name}</p>}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="contact-email">Correo electrónico</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? "is-invalid" : ""}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && <p className="field__error">{errors.email}</p>}
            </div>

            <div className="field">
              <label htmlFor="contact-phone">Teléfono (opcional)</label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                className={errors.phone ? "is-invalid" : ""}
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone && <p className="field__error">{errors.phone}</p>}
            </div>
          </div>

          <div className="field">
            <label htmlFor="contact-message">Mensaje</label>
            <textarea
              id="contact-message"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              className={errors.message ? "is-invalid" : ""}
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message && <p className="field__error">{errors.message}</p>}
          </div>

          <div className="field field--check">
            <label htmlFor="contact-terms">
              <input
                id="contact-terms"
                name="acceptTerms"
                type="checkbox"
                checked={form.acceptTerms}
                onChange={handleChange}
                aria-invalid={Boolean(errors.acceptTerms)}
              />
              Acepto que usen mis datos para responder esta consulta.
            </label>
            {errors.acceptTerms && <p className="field__error">{errors.acceptTerms}</p>}
          </div>

          <button type="submit" className="btn btn--primary btn--lg btn--block">
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
