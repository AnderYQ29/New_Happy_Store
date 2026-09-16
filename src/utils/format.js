const priceFormatter = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

/** Formatea un número como precio: 12.5 -> "US$ 12.50" */
export const formatPrice = (value) => priceFormatter.format(Number(value) || 0);

/** Corta un texto sin partir palabras a la mitad. */
export const truncate = (text = "", max = 120) => {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(" ", max)).trim()}…`;
};

/** "men's clothing" -> "Men's clothing" */
export const capitalize = (text = "") =>
  text.charAt(0).toUpperCase() + text.slice(1);

/** Genera un código de pedido legible: HS-8F3K2Q */
export const buildOrderCode = () =>
  `HS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
