import { useCallback, useEffect, useState } from "react";
import { getProductById, getProducts } from "../services/api";

/**
 * Lista de productos. Cancela la petición si el componente se desmonta
 * y expone `retry` para reintentar cuando falla la red.
 */
export const useProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProducts({ signal: controller.signal });
        setProducts(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    load();
    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { products, loading, error, retry };
};

/** Detalle de un producto por id. */
export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(id, { signal: controller.signal });
        setProduct(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    load();
    return () => controller.abort();
  }, [id, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { product, loading, error, retry };
};
