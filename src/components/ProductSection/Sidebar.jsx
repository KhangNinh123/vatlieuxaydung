import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const categories = [
  {
    title: 'Gạch Ấn Độ',
    count: 120,
    subcategories: ['Gạch Ốp - Trang Trí', 'Gạch Nền Ấn Độ'],
  },
  {
    title: 'Gạch Nhập Khẩu',
    count: 85,
    subcategories: ['Gạch Tranh', 'Gạch Thảm', 'Gạch Gốm', 'Mosaic Kiếng'],
  },
  {
    title: 'Gạch Tây Ban Nha - Italy',
    count: 45,
    subcategories: ['Ốp Bộ (30x60cm)', 'Nền Cao Cấp'],
  },
  {
    title: 'Gạch Nội',
    count: 210,
    subcategories: ['Gạch Sân Vườn', 'Gạch Nền WC', 'Gốm Nghệ Thuật'],
  },
  {
    title: 'Thiết Bị Vệ Sinh',
    count: 56,
    subcategories: [],
  },
  {
    title: 'Sơn & Ngói',
    count: 32,
    subcategories: [],
  },
];

function Sidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';
  const maxPriceParam = searchParams.get('maxPrice') || '';

  // Synchronize open category accordion with active category from URL
  const activeCatIndex = categories.findIndex(cat => cat.title === activeCategory);
  const [openIndex, setOpenIndex] = useState(activeCatIndex !== -1 ? activeCatIndex : 0);

  // Sync open accordion when URL parameter changes
  useEffect(() => {
    if (activeCatIndex !== -1) {
      setOpenIndex(activeCatIndex);
    }
  }, [activeCategory]);

  const [maxPriceVal, setMaxPriceVal] = useState(() => {
    return maxPriceParam ? parseInt(maxPriceParam) : 20000000;
  });

  // Sync price slider with URL changes
  useEffect(() => {
    setMaxPriceVal(maxPriceParam ? parseInt(maxPriceParam) : 20000000);
  }, [maxPriceParam]);

  const toggleCategory = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCategoryClick = (catTitle, hasSub) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (activeCategory === catTitle) {
      newParams.delete('category');
      newParams.delete('search');
    } else {
      newParams.set('category', catTitle);
      newParams.delete('search'); // Clear specific subcategory search on main category click
    }
    setSearchParams(newParams);
  };

  const handleSubcategoryClick = (e, catTitle, subName) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    newParams.set('category', catTitle);
    
    // Extract a keyword to search within the category
    let keyword = subName;
    if (keyword.startsWith('Gạch ')) keyword = keyword.substring(5);
    if (keyword.startsWith('Gốm ')) keyword = keyword.substring(4);
    
    newParams.set('search', keyword);
    setSearchParams(newParams);
  };

  const handlePriceFilterSubmit = () => {
    const newParams = new URLSearchParams(searchParams);
    if (maxPriceVal >= 20000000) {
      newParams.delete('maxPrice');
    } else {
      newParams.set('maxPrice', maxPriceVal.toString());
    }
    setSearchParams(newParams);
  };

  const hasFilters = activeCategory || searchParam || maxPriceParam;
  const handleClearFilters = () => {
    setSearchParams({});
  };

  const formatVND = (num) => {
    return num.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header-box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid var(--secondary-color)', paddingBottom: '12px' }}>
        <h3 className="sidebar-title" style={{ borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>Danh Mục</h3>
        {hasFilters && (
          <button 
            onClick={handleClearFilters} 
            className="clear-filters-btn" 
            style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--accent-red)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <i className="fas fa-trash-alt"></i> Xóa lọc
          </button>
        )}
      </div>

      <ul className="category-list">
        {categories.map((cat, index) => {
          const isOpen = openIndex === index;
          const hasSub = cat.subcategories.length > 0;
          const isActive = activeCategory === cat.title;

          return (
            <li key={index} className={`category-item ${isOpen ? 'active' : ''} ${isActive ? 'current-active' : ''}`} style={isActive ? { borderLeft: '3px solid var(--secondary-color)', paddingLeft: '5px' } : {}}>
              <div className="category-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <span 
                  className="category-name" 
                  onClick={() => handleCategoryClick(cat.title, hasSub)}
                  style={{ flex: 1, fontWeight: isActive ? 'bold' : 'normal', color: isActive ? 'var(--secondary-color)' : 'inherit' }}
                >
                  {cat.title}
                </span>
                {hasSub && (
                  <div className="category-right" onClick={() => toggleCategory(index)} style={{ padding: '0 5px', cursor: 'pointer' }}>
                    <span className="category-count">({cat.count})</span>
                    <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} toggle-icon`}></i>
                  </div>
                )}
                {!hasSub && (
                  <div className="category-right">
                    <span className="category-count">({cat.count})</span>
                  </div>
                )}
              </div>
              
              {hasSub && (
                <ul className="subcategory-list" style={{ display: isOpen ? 'block' : 'none' }}>
                  {cat.subcategories.map((sub, subIdx) => {
                    const isSubActive = searchParam && sub.includes(searchParam);
                    return (
                      <li key={subIdx} className="subcategory-item">
                        <a 
                          href="#" 
                          onClick={(e) => handleSubcategoryClick(e, cat.title, sub)}
                          style={{ color: isSubActive ? 'var(--secondary-color)' : '', fontWeight: isSubActive ? 'bold' : '' }}
                        >
                          {sub}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      {/* Filter by Price Widget */}
      <div className="widget-box">
        <h4 className="widget-title">Lọc Theo Giá</h4>
        <div className="price-filter">
          <input 
            type="range" 
            min="100000" 
            max="20000000" 
            step="100000"
            value={maxPriceVal} 
            onChange={(e) => setMaxPriceVal(parseInt(e.target.value))}
            className="price-slider" 
          />
          <div className="price-labels">
            <span>100kđ</span>
            <span>Tối đa: {maxPriceVal >= 20000000 ? '20trđ+' : formatVND(maxPriceVal)}</span>
          </div>
          <button onClick={handlePriceFilterSubmit} className="filter-btn">Lọc</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
