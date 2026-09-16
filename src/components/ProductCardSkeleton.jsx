const ProductCardSkeleton = () => (
  <div className="product-card product-card--skeleton" aria-hidden="true">
    <div className="skeleton skeleton--media" />
    <div className="product-card__body">
      <div className="skeleton skeleton--line skeleton--sm" />
      <div className="skeleton skeleton--line" />
      <div className="skeleton skeleton--line skeleton--md" />
      <div className="skeleton skeleton--line skeleton--sm" />
    </div>
  </div>
);

export default ProductCardSkeleton;
