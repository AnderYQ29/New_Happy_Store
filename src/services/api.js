const BASE_URL = "https://fakestoreapi.com";

/**
 * Wrapper único sobre fetch: centraliza la URL base, el manejo de errores
 * HTTP y el soporte de AbortSignal para cancelar peticiones.
 */
const request = async (path, { signal } = {}) => {
  const response = await fetch(`${BASE_URL}${path}`, { signal });

  if (!response.ok) {
    throw new Error(`La API respondió ${response.status}`);
  }

  return response.json();
};

export const getProducts = (options) => request("/products", options);

export const getProductById = (id, options) =>
  request(`/products/${id}`, options);
