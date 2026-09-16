import { useMemo, useState } from "react";
import { PackageOpen, RefreshCw } from "lucide-react";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import ProductFilters from "../components/ProductFilters";
import EmptyState from "../components/EmptyState";
import { useProductList } from "../hooks/useProducts";

const INITIAL_FILTERS = { search: "", category: "all", sort: "relevance" };

const sorters = {
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  rating: (a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0),
};

const Products = () => {
  const { products, loading, error, retry } = useProductList();
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort(),
    [products]
  );

  const visibleProducts = useMemo(() => {
    const term = filters.search.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesCategory =
        filters.category === "all" || product.category === filters.category;
      const matchesTerm =
        !term ||
        product.title.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);

      return matchesCategory && matchesTerm;
    });

    const sorter = sorters[filters.sort];
    return sorter ? [...filtered].sort(sorter) : filtered;
  }, [products, filters]);

  return (
    <section className="section">
      <div className="section__head">
        <div>
          <h1>Catálogo</h1>
          <p className="section__subtitle">
            {loading
              ? "Cargando productos…"
              : `${visibleProducts.length} de ${products.length} productos`}
          </p>
        </div>
      </div>

      {error && (
        <div className="notice notice--error" role="alert">
          <p>No pudimos cargar el catálogo. Revisa tu conexión e inténtalo otra vez.</p>
          <button type="button" className="btn btn--primary" onClick={retry}>
            <RefreshCw size={16} aria-hidden="true" />
            Reintentar
          </button>
        </div>
      )}

      {!error && (
        <ProductFilters
          categories={categories}
          filters={filters}
          onChange={setFilters}
        />
      )}

      {loading && (
        <div className="product-grid">
          {Array.from({ length: 8 }, (_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!loading && !error && visibleProducts.length === 0 && (
        <EmptyState
          icon={PackageOpen}
          title="Ningún producto coincide con tu búsqueda"
          description="Prueba con otra palabra o quita los filtros para ver todo el catálogo."
        >
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => setFilters(INITIAL_FILTERS)}
          >
            Limpiar filtros
          </button>
        </EmptyState>
      )}

      {!loading && visibleProducts.length > 0 && (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
