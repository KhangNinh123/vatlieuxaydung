import { useState } from 'react';

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
  const [openIndex, setOpenIndex] = useState(0); // First one open by default

  const toggleCategory = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Danh Mục Sản Phẩm</h3>
      <ul className="category-list">
        {categories.map((cat, index) => {
          const isOpen = openIndex === index;
          const hasSub = cat.subcategories.length > 0;

          return (
            <li key={index} className={`category-item ${isOpen ? 'active' : ''}`}>
              <div 
                className="category-header" 
                onClick={() => hasSub && toggleCategory(index)}
              >
                <span className="category-name">{cat.title}</span>
                <div className="category-right">
                  <span className="category-count">({cat.count})</span>
                  {hasSub && (
                    <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} toggle-icon`}></i>
                  )}
                </div>
              </div>
              
              {hasSub && (
                <ul className="subcategory-list" style={{ display: isOpen ? 'block' : 'none' }}>
                  {cat.subcategories.map((sub, subIdx) => (
                    <li key={subIdx} className="subcategory-item">
                      <a href="#">{sub}</a>
                    </li>
                  ))}
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
          <input type="range" min="0" max="100" defaultValue="50" className="price-slider" />
          <div className="price-labels">
            <span>0đ</span>
            <span>1.000.000đ+</span>
          </div>
          <button className="filter-btn">Lọc</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
