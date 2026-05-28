import ProductCard from './ProductCard';

function ProductGrid({ products = [] }) {
  if (products.length === 0) {
    return (
      <div className="no-products-found">
        <i className="fas fa-box-open no-prod-icon"></i>
        <p>Không tìm thấy sản phẩm phù hợp.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
