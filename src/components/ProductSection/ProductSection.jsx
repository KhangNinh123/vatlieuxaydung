import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import ProductGrid from './ProductGrid';
import { products } from '../../data/products';
import './ProductSection.css';

function ProductSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState('Mới nhất');

  const activeTab = searchParams.get('tab') || 'Tất cả';
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';
  const maxPriceParam = searchParams.get('maxPrice') || '';

  // Helper to parse price string to number
  const parsePrice = (priceStr) => {
    if (!priceStr || priceStr === 'Call') return 0;
    return parseInt(priceStr.replace(/\D/g, '')) || 0;
  };

  // Filter products based on URL parameters and activeTab
  let filteredProducts = products.filter(product => {
    // 1. Filter by category
    if (categoryParam && product.category !== categoryParam) {
      return false;
    }

    // 2. Filter by search query (case-insensitive search in name, description, and category)
    if (searchParam) {
      const query = searchParam.toLowerCase();
      const nameMatch = product.name?.toLowerCase().includes(query);
      const descMatch = product.description?.toLowerCase().includes(query);
      const catMatch = product.category?.toLowerCase().includes(query);
      if (!nameMatch && !descMatch && !catMatch) {
        return false;
      }
    }

    // 3. Filter by max price
    if (maxPriceParam) {
      const maxP = parseInt(maxPriceParam);
      if (maxP && product.price !== 'Call') {
        const prodPrice = parsePrice(product.price);
        if (prodPrice > maxP) {
          return false;
        }
      }
    }

    return true;
  });

  // Filter based on activeTab
  if (activeTab === 'Khuyến mãi') {
    filteredProducts = filteredProducts.filter(p => p.badge === 'KHUYẾN MÃI');
  } else if (activeTab === 'Mới nhất') {
    filteredProducts = filteredProducts.filter(p => p.badge === 'MỚI');
  } else if (activeTab === 'Bán chạy') {
    filteredProducts = filteredProducts.filter(p => p.badge === 'HOT');
  }

  // Sort products
  if (sortOption === 'Giá: Thấp đến Cao') {
    filteredProducts.sort((a, b) => {
      const getVal = (p) => p.price === 'Call' ? 0 : parsePrice(p.price);
      return getVal(a) - getVal(b);
    });
  } else if (sortOption === 'Giá: Cao đến Thấp') {
    filteredProducts.sort((a, b) => {
      const getVal = (p) => p.price === 'Call' ? 0 : parsePrice(p.price);
      return getVal(b) - getVal(a);
    });
  } else if (sortOption === 'Bán chạy') {
    filteredProducts = filteredProducts.filter(p => p.badge === 'HOT');
  }

  const handleTabChange = (tabName) => {
    const newParams = new URLSearchParams(searchParams);
    if (tabName === 'Tất cả') {
      newParams.delete('tab');
    } else {
      newParams.set('tab', tabName);
    }
    setSearchParams(newParams);
  };

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
                  onClick={() => handleTabChange(tab)}
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
