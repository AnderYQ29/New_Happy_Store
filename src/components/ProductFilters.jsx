import { Search } from "lucide-react";
import { capitalize } from "../utils/format";

const ProductFilters = ({ categories, filters, onChange }) => {
  const update = (key) => (event) =>
    onChange({ ...filters, [key]: event.target.value });

  return (
    <div className="filters">
      <div className="filters__search">
        <Search size={18} aria-hidden="true" />
        <input
          type="search"
          id="buscar"
          placeholder="Buscar productos"
          value={filters.search}
          onChange={update("search")}
          aria-label="Buscar productos por nombre"
        />
      </div>

      <div className="filters__field">
        <label htmlFor="categoria">Categoría</label>
        <select id="categoria" value={filters.category} onChange={update("category")}>
          <option value="all">Todas</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {capitalize(category)}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__field">
        <label htmlFor="orden">Ordenar por</label>
        <select id="orden" value={filters.sort} onChange={update("sort")}>
          <option value="relevance">Relevancia</option>
          <option value="price-asc">Menor precio</option>
          <option value="price-desc">Mayor precio</option>
          <option value="rating">Mejor valorados</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;
