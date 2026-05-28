import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        {product.badge && (
          <span className={`product-badge ${
            product.badge === 'HOT' ? 'hot' : 
            product.badge === 'MỚI' ? 'new' : 'sale'
          }`}>
            {product.badge}
          </span>
        )}
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-actions-overlay">
          <button className="action-icon" title="Thêm vào giỏ hàng">
            <i className="fas fa-shopping-cart"></i>
          </button>
          <button className="action-icon" title="Xem nhanh">
            <i className="fas fa-eye"></i>
          </button>
          <button className="action-icon" title="Yêu thích">
            <i className="fas fa-heart"></i>
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">
          <Link to={`/san-pham/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="product-buttons">
          <a 
            href="https://zalo.me/0796999353" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-order" 
            style={{ textDecoration: 'none' }}
          >
            Đặt Hàng
          </a>
          <Link to={`/san-pham/${product.id}`} className="btn-details">Chi Tiết</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
