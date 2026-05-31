import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducts } from '../data/db';
import './ProductDetailPage.css';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsList = getProducts();
    const foundProduct = productsList.find(p => p.id === parseInt(id));
    setProduct(foundProduct || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="container product-not-found">
        <h2>Đang tải sản phẩm...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container product-not-found">
        <h2>Không tìm thấy sản phẩm</h2>
        <Link to="/" className="btn-back">Quay lại trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span className="separator">/</span>
          <Link to="/">Sản phẩm</Link>
          <span className="separator">/</span>
          <span className="current">{product.name}</span>
        </div>

        <div className="product-detail-container">
          <div className="product-detail-image-section">
            <div className="main-image">
              {product.badge && <span className={`product-badge ${product.badge === 'HOT' ? 'hot' : 'new'}`}>{product.badge}</span>}
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          <div className="product-detail-info-section">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-price-section">
              {product.price === 'Call' ? (
                <span className="price-call">Liên hệ</span>
              ) : (
                <>
                  <span className="price-value">{product.price}</span>
                  {product.unit && <span className="price-unit">{product.unit}</span>}
                </>
              )}
            </div>

            <div className="product-short-description">
              <p>{product.description || 'Chưa có mô tả cho sản phẩm này.'}</p>
            </div>

            {product.specs && (
              <div className="product-specifications">
                <h3>Thông số kỹ thuật</h3>
                <ul className="specs-list">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <li key={key}>
                      <span className="spec-key">{key}:</span>
                      <span className="spec-value">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="product-actions">
              <button className="btn-add-to-cart">
                <i className="fas fa-shopping-cart"></i> Thêm vào giỏ
              </button>
              <a 
                href="https://zalo.me/0796999353" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-buy-now btn-zalo-buy"
              >
                Mua qua Zalo
              </a>
            </div>
            
            <div className="contact-support">
              <p>Hotline tư vấn: <strong><a href="tel:0796999353">0796 999 353</a></strong></p>
            </div>
          </div>
        </div>

        {/* Thông tin chi tiết mở rộng */}
        <div className="product-long-description">
          <h2>Chi tiết sản phẩm</h2>
          <div className="content">
            <p>
              Đây là nội dung chi tiết về sản phẩm {product.name}. Tại đây bạn có thể cung cấp thêm các thông tin về nguồn gốc xuất xứ, chứng nhận chất lượng, cũng như các hướng dẫn thi công và bảo quản.
            </p>
            <p>
              Sản phẩm được phân phối chính hãng, đảm bảo mang đến cho khách hàng chất lượng tốt nhất với giá thành cạnh tranh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
