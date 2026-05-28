import { useState } from 'react';
import Sidebar from './Sidebar';
import ProductGrid from './ProductGrid';
import { products } from '../../data/products';
import './ProductSection.css';

function ProductSection() {
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [sortOption, setSortOption] = useState('Mới nhất');

  // Filter products based on activeTab
  let filteredProducts = [...products];
  if (activeTab === 'Khuyến mãi') {
    filteredProducts = products.filter(p => p.badge === 'KHUYẾN MÃI');
  } else if (activeTab === 'Mới nhất') {
    filteredProducts = products.filter(p => p.badge === 'MỚI');
  } else if (activeTab === 'Bán chạy') {
    filteredProducts = products.filter(p => p.badge === 'HOT');
  }

  // Sort products
  if (sortOption === 'Giá: Thấp đến Cao') {
    filteredProducts.sort((a, b) => {
      const getVal = (p) => p.price === 'Call' ? 0 : parseInt(p.price.replace(/\D/g, ''));
      return getVal(a) - getVal(b);
    });
  } else if (sortOption === 'Giá: Cao đến Thấp') {
    filteredProducts.sort((a, b) => {
      const getVal = (p) => p.price === 'Call' ? 0 : parseInt(p.price.replace(/\D/g, ''));
      return getVal(b) - getVal(a);
    });
  }

  return (
    <section className="product-section" id="product-section">
      <div className="container product-container">
        <aside className="sidebar-wrapper">
          <Sidebar />
        </aside>
        <div className="product-content">
          <div className="product-header-wrapper">
            <div className="product-header">
              <h2 className="section-title">Sản Phẩm Nổi Bật</h2>
              <div className="product-filter">
                <span className="filter-label">Sắp xếp theo:</span>
                <select 
                  className="filter-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option>Mới nhất</option>
                  <option>Giá: Thấp đến Cao</option>
                  <option>Giá: Cao đến Thấp</option>
                  <option>Bán chạy</option>
                </select>
              </div>
            </div>
            
            <div className="product-tabs-bar">
              {['Tất cả', 'Khuyến mãi', 'Mới nhất', 'Bán chạy'].map(tab => (
                <button
                  key={tab}
                  className={`tab-btn-prod ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'Khuyến mãi' ? (
                    <>
                      <i className="fas fa-percentage tab-icon-sale"></i> {tab}
                    </>
                  ) : tab}
                </button>
              ))}
            </div>
          </div>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
