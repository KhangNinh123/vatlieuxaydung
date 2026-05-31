import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getProducts,
  saveProducts,
  getNewsArticles,
  saveNewsArticles,
  getInquiries,
  saveInquiries,
  resetDB
} from '../data/db';
import './AdminPage.css';

function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [news, setNews] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  
  // Search & Filter States
  const [productSearch, setProductSearch] = useState('');
  const [productCatFilter, setProductCatFilter] = useState('All');
  const [newsSearch, setNewsSearch] = useState('');
  const [newsCatFilter, setNewsCatFilter] = useState('All');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('All');

  // Modals States
  const [productModal, setProductModal] = useState({ show: false, mode: 'add', data: null });
  const [newsModal, setNewsModal] = useState({ show: false, mode: 'add', data: null });
  const [inquiryModal, setInquiryModal] = useState({ show: false, data: null });

  // Form States
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    unit: '',
    badge: '',
    category: '',
    description: '',
    image: '',
    specs: {}
  });
  const [customSpec, setCustomSpec] = useState({ key: '', value: '' });

  const [newsForm, setNewsForm] = useState({
    title: '',
    category: '',
    date: '',
    image: '',
    summary: '',
    content: ''
  });

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Load Data
  const loadAllData = () => {
    setProducts(getProducts());
    setNews(getNewsArticles());
    setInquiries(getInquiries());
  };

  useEffect(() => {
    loadAllData();

    // Listen for storage events (for instance if modified elsewhere)
    const handleProductsUpdate = () => setProducts(getProducts());
    const handleNewsUpdate = () => setNews(getNewsArticles());
    const handleInquiriesUpdate = () => setInquiries(getInquiries());

    window.addEventListener('hl_products_updated', handleProductsUpdate);
    window.addEventListener('hl_news_updated', handleNewsUpdate);
    window.addEventListener('hl_inquiries_updated', handleInquiriesUpdate);

    return () => {
      window.removeEventListener('hl_products_updated', handleProductsUpdate);
      window.removeEventListener('hl_news_updated', handleNewsUpdate);
      window.removeEventListener('hl_inquiries_updated', handleInquiriesUpdate);
    };
  }, []);

  // Show toast utility
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Reset database confirmation
  const handleResetDB = () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục dữ liệu hệ thống về mặc định? Toàn bộ các thay đổi của bạn sẽ bị xoá.')) {
      resetDB();
      loadAllData();
      showToast('Khôi phục dữ liệu thành công!', 'info');
    }
  };

  // Categories lists derived from current items
  const productCategories = ['Gạch Ấn Độ', 'Gạch Nhập Khẩu', 'Gạch Tây Ban Nha - Italy', 'Gạch Nội', 'Thiết Bị Vệ Sinh'];
  const newsCategories = ['Xu hướng', 'Cẩm nang', 'Tin công ty'];

  // Preset images for demo selection
  const presetProductImages = [
    { label: 'Marble Tile', path: '/product_tile_marble.png' },
    { label: 'Mosaic Tile', path: '/product_tile_mosaic.png' },
    { label: 'Living Room Gallery', path: '/gallery_livingroom2.png' },
    { label: 'Hallway Gallery', path: '/gallery_hallway.png' },
    { label: 'Bathroom Banner', path: '/banner_bathroom.png' },
    { label: 'Shower Room Gallery', path: '/gallery_shower.png' },
    { label: 'Outdoor Gallery', path: '/gallery_outdoor.png' },
    { label: 'Spa Lavabo Gallery', path: '/gallery_spa.png' },
    { label: 'Kitchen Terrazzo Gallery', path: '/gallery_kitchen.png' }
  ];

  const presetNewsImages = [
    { label: 'Living Room Tile', path: '/gallery_livingroom2.png' },
    { label: 'Bathroom Concept', path: '/banner_bathroom.png' },
    { label: 'Kitchen Terrazzo', path: '/gallery_kitchen.png' },
    { label: 'Outdoor Concept', path: '/gallery_outdoor.png' }
  ];

  // -------------------------------------------------------------
  // PRODUCT ACTIONS
  // -------------------------------------------------------------
  const openAddProduct = () => {
    setProductForm({
      name: '',
      price: 'Call',
      unit: '/ m2',
      badge: '',
      category: 'Gạch Nhập Khẩu',
      description: '',
      image: '/product_tile_marble.png',
      specs: {
        'Kích thước': '60x60 cm',
        'Bề mặt': 'Bóng',
        'Thương hiệu': 'Nhập khẩu'
      }
    });
    setCustomSpec({ key: '', value: '' });
    setProductModal({ show: true, mode: 'add', data: null });
  };

  const openEditProduct = (product) => {
    setProductForm({
      name: product.name || '',
      price: product.price || 'Call',
      unit: product.unit || '',
      badge: product.badge || '',
      category: product.category || '',
      description: product.description || '',
      image: product.image || '/product_tile_marble.png',
      specs: { ...product.specs }
    });
    setCustomSpec({ key: '', value: '' });
    setProductModal({ show: true, mode: 'edit', data: product });
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      showToast('Tên sản phẩm không được để trống!', 'error');
      return;
    }

    let updatedProducts = [...products];

    if (productModal.mode === 'add') {
      const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        ...productForm
      };
      updatedProducts.push(newProduct);
      showToast('Thêm sản phẩm thành công!');
    } else {
      const targetId = productModal.data.id;
      updatedProducts = updatedProducts.map(p => 
        p.id === targetId ? { ...p, ...productForm } : p
      );
      showToast('Cập nhật sản phẩm thành công!');
    }

    saveProducts(updatedProducts);
    setProducts(updatedProducts);
    setProductModal({ show: false, mode: 'add', data: null });
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá sản phẩm này?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      saveProducts(updatedProducts);
      setProducts(updatedProducts);
      showToast('Xoá sản phẩm thành công!', 'warning');
    }
  };

  // Dynamic Specs handler
  const handleAddSpec = () => {
    if (!customSpec.key.trim() || !customSpec.value.trim()) {
      showToast('Vui lòng nhập đầy đủ Tên và Giá trị thông số!', 'error');
      return;
    }
    setProductForm(prev => ({
      ...prev,
      specs: {
        ...prev.specs,
        [customSpec.key.trim()]: customSpec.value.trim()
      }
    }));
    setCustomSpec({ key: '', value: '' });
  };

  const handleRemoveSpec = (keyToRemove) => {
    const updatedSpecs = { ...productForm.specs };
    delete updatedSpecs[keyToRemove];
    setProductForm(prev => ({
      ...prev,
      specs: updatedSpecs
    }));
  };


  // -------------------------------------------------------------
  // NEWS ACTIONS
  // -------------------------------------------------------------
  const openAddNews = () => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    
    setNewsForm({
      title: '',
      category: 'Xu hướng',
      date: formattedDate,
      image: '/gallery_livingroom2.png',
      summary: '',
      content: ''
    });
    setNewsModal({ show: true, mode: 'add', data: null });
  };

  const openEditNews = (article) => {
    setNewsForm({
      title: article.title || '',
      category: article.category || 'Xu hướng',
      date: article.date || '',
      image: article.image || '/gallery_livingroom2.png',
      summary: article.summary || '',
      content: article.content || ''
    });
    setNewsModal({ show: true, mode: 'edit', data: article });
  };

  const handleNewsSubmit = (e) => {
    e.preventDefault();
    if (!newsForm.title.trim()) {
      showToast('Tiêu đề bài viết không được để trống!', 'error');
      return;
    }

    let updatedNews = [...news];

    if (newsModal.mode === 'add') {
      const newArticle = {
        id: news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1,
        ...newsForm
      };
      updatedNews.unshift(newArticle); // Show newest first
      showToast('Thêm bài viết thành công!');
    } else {
      const targetId = newsModal.data.id;
      updatedNews = updatedNews.map(n => 
        n.id === targetId ? { ...n, ...newsForm } : n
      );
      showToast('Cập nhật bài viết thành công!');
    }

    saveNewsArticles(updatedNews);
    setNews(updatedNews);
    setNewsModal({ show: false, mode: 'add', data: null });
  };

  const handleDeleteNews = (articleId) => {
    if (window.confirm('Bạn có chắc muốn xoá bài viết này?')) {
      const updatedNews = news.filter(n => n.id !== articleId);
      saveNewsArticles(updatedNews);
      setNews(updatedNews);
      showToast('Xoá bài viết thành công!', 'warning');
    }
  };


  // -------------------------------------------------------------
  // INQUIRY ACTIONS
  // -------------------------------------------------------------
  const handleUpdateInquiryStatus = (inquiryId, newStatus) => {
    const updatedInquiries = inquiries.map(inq => 
      inq.id === inquiryId ? { ...inq, status: newStatus } : inq
    );
    saveInquiries(updatedInquiries);
    setInquiries(updatedInquiries);
    
    // update modal detail if currently viewing it
    if (inquiryModal.data && inquiryModal.data.id === inquiryId) {
      setInquiryModal(prev => ({
        ...prev,
        data: { ...prev.data, status: newStatus }
      }));
    }
    showToast(`Đã chuyển trạng thái yêu cầu sang "${newStatus === 'Pending' ? 'Chưa xử lý' : newStatus === 'Contacted' ? 'Đã liên hệ' : 'Hoàn thành'}"!`);
  };

  const handleDeleteInquiry = (inquiryId) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá yêu cầu liên hệ này?')) {
      const updatedInquiries = inquiries.filter(inq => inq.id !== inquiryId);
      saveInquiries(updatedInquiries);
      setInquiries(updatedInquiries);
      setInquiryModal({ show: false, data: null });
      showToast('Đã xoá yêu cầu liên hệ!', 'warning');
    }
  };

  // -------------------------------------------------------------
  // FILTERS IMPLEMENTATION
  // -------------------------------------------------------------
  const filteredProductsList = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                          (p.description && p.description.toLowerCase().includes(productSearch.toLowerCase()));
    const matchesCat = productCatFilter === 'All' ? true : p.category === productCatFilter;
    return matchesSearch && matchesCat;
  });

  const filteredNewsList = news.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(newsSearch.toLowerCase()) ||
                          (n.summary && n.summary.toLowerCase().includes(newsSearch.toLowerCase()));
    const matchesCat = newsCatFilter === 'All' ? true : n.category === newsCatFilter;
    return matchesSearch && matchesCat;
  });

  const filteredInquiriesList = inquiries.filter(inq => {
    return inquiryStatusFilter === 'All' ? true : inq.status === inquiryStatusFilter;
  });

  // Stats for Dashboard Overview
  const pendingInquiriesCount = inquiries.filter(i => i.status === 'Pending').length;
  
  // Format Date for table view
  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="admin-layout">
      {/* Toast Notification Container */}
      <div className="admin-toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`admin-toast ${toast.type}`}>
            <span className="toast-icon">
              {toast.type === 'success' && <i className="fas fa-check-circle"></i>}
              {toast.type === 'error' && <i className="fas fa-exclamation-circle"></i>}
              {toast.type === 'warning' && <i className="fas fa-exclamation-triangle"></i>}
              {toast.type === 'info' && <i className="fas fa-info-circle"></i>}
            </span>
            <span className="toast-message">{toast.message}</span>
          </div>
        ))}
      </div>

      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-logo-area">
          <div className="logo-icon-box">HL</div>
          <div className="logo-texts">
            <h3>HƯNG LONG</h3>
            <span className="role-badge">Hệ Thống Admin</span>
          </div>
        </div>

        <nav className="sidebar-menu">
          <button 
            className={`menu-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <i className="fas fa-chart-line"></i> Tổng quan
          </button>
          <button 
            className={`menu-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <i className="fas fa-boxes-stacked"></i> Quản lý sản phẩm
            <span className="count-tag">{products.length}</span>
          </button>
          <button 
            className={`menu-btn ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            <i className="far fa-newspaper"></i> Quản lý bài viết
            <span className="count-tag">{news.length}</span>
          </button>
          <button 
            className={`menu-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            <i className="far fa-comment-dots"></i> Yêu cầu tư vấn
            {pendingInquiriesCount > 0 && (
              <span className="pending-badge animate-pulse">{pendingInquiriesCount}</span>
            )}
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button className="reset-db-btn" onClick={handleResetDB}>
            <i className="fas fa-rotate-left"></i> Khôi phục dữ liệu
          </button>
          <Link to="/" className="back-site-btn">
            <i className="fas fa-arrow-left-long"></i> Xem Trang Chủ
          </Link>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="admin-main">
        {/* HEADER */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <h2>
              {activeTab === 'dashboard' && 'Bảng Điều Khiển Tổng Quan'}
              {activeTab === 'products' && 'Quản Lý Danh Sách Sản Phẩm'}
              {activeTab === 'news' && 'Quản Lý Bài Viết & Cẩm Nang'}
              {activeTab === 'inquiries' && 'Quản Lý Yêu Cầu Từ Khách Hàng'}
            </h2>
            <p className="topbar-subtitle">Hệ thống quản lý dữ liệu trang web Hưng Long</p>
          </div>
          <div className="topbar-right">
            <div className="admin-profile">
              <img src="/gallery_spa.png" alt="Admin Avatar" className="admin-avatar" />
              <div className="profile-info">
                <strong>Quản trị viên</strong>
                <span>admin@hunglong.com</span>
              </div>
            </div>
          </div>
        </header>

        {/* WORKSPACE */}
        <main className="admin-workspace animate-fade-in">

          {/* ======================================================== */}
          {/* TAB: DASHBOARD */}
          {/* ======================================================== */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-view">
              {/* Stat Cards */}
              <div className="stats-grid">
                <div className="stat-card" onClick={() => setActiveTab('products')}>
                  <div className="stat-icon-wrapper blue">
                    <i className="fas fa-boxes-stacked"></i>
                  </div>
                  <div className="stat-data">
                    <h3>{products.length}</h3>
                    <span>Sản phẩm kinh doanh</span>
                  </div>
                  <div className="stat-decor-gradient"></div>
                </div>

                <div className="stat-card" onClick={() => setActiveTab('news')}>
                  <div className="stat-icon-wrapper purple">
                    <i className="far fa-newspaper"></i>
                  </div>
                  <div className="stat-data">
                    <h3>{news.length}</h3>
                    <span>Bài viết tin tức</span>
                  </div>
                  <div className="stat-decor-gradient"></div>
                </div>

                <div className="stat-card" onClick={() => setActiveTab('inquiries')}>
                  <div className="stat-icon-wrapper orange">
                    <i className="far fa-comments"></i>
                  </div>
                  <div className="stat-data">
                    <h3>{inquiries.length}</h3>
                    <span>Tổng yêu cầu tư vấn</span>
                  </div>
                  {pendingInquiriesCount > 0 && (
                    <span className="stat-alert-tag">{pendingInquiriesCount} mới</span>
                  )}
                  <div className="stat-decor-gradient"></div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon-wrapper green">
                    <i className="fas fa-layer-group"></i>
                  </div>
                  <div className="stat-data">
                    <h3>{productCategories.length}</h3>
                    <span>Danh mục sản phẩm</span>
                  </div>
                  <div className="stat-decor-gradient"></div>
                </div>
              </div>

              {/* Chart & Quick Action */}
              <div className="dashboard-insights-grid">
                {/* SVG Area Chart */}
                <div className="insights-panel main-chart-panel">
                  <div className="panel-header">
                    <h4><i className="fas fa-chart-area icon-prefix"></i>Biểu Đồ Lượt Tiếp Cận (7 ngày gần nhất)</h4>
                    <span className="period">Tuần này</span>
                  </div>
                  <div className="panel-body chart-body">
                    <div className="chart-legend">
                      <span className="legend-item"><span className="legend-color blue"></span>Lượt xem trang</span>
                      <span className="legend-item"><span className="legend-color orange"></span>Yêu cầu Zalo/SĐT</span>
                    </div>
                    {/* SVG Chart Drawing */}
                    <div className="svg-chart-container">
                      <svg viewBox="0 0 500 150" className="dashboard-svg-chart">
                        <defs>
                          <linearGradient id="chartBlueGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4"/>
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0"/>
                          </linearGradient>
                          <linearGradient id="chartOrangeGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ea580c" stopOpacity="0.4"/>
                            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.0"/>
                          </linearGradient>
                        </defs>
                        
                        {/* Grid lines */}
                        <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                        <line x1="0" y1="75" x2="500" y2="75" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                        <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />

                        {/* Blue Area Line */}
                        <path d="M 0,140 Q 80,60 160,85 T 320,35 T 500,50 L 500,150 L 0,150 Z" fill="url(#chartBlueGrad)" />
                        <path d="M 0,140 Q 80,60 160,85 T 320,35 T 500,50" fill="none" stroke="#2563eb" strokeWidth="3" />
                        
                        {/* Orange Area Line */}
                        <path d="M 0,145 Q 80,120 160,95 T 320,105 T 500,60 L 500,150 L 0,150 Z" fill="url(#chartOrangeGrad)" />
                        <path d="M 0,145 Q 80,120 160,95 T 320,105 T 500,60" fill="none" stroke="#ea580c" strokeWidth="3" />
                      </svg>
                    </div>
                    <div className="chart-x-axis">
                      <span>T2</span>
                      <span>T3</span>
                      <span>T4</span>
                      <span>T5</span>
                      <span>T6</span>
                      <span>T7</span>
                      <span>CN</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Panel */}
                <div className="insights-panel quick-actions-panel">
                  <div className="panel-header">
                    <h4>Thao Tác Nhanh</h4>
                  </div>
                  <div className="panel-body quick-actions-list">
                    <button className="action-tile-btn blue" onClick={openAddProduct}>
                      <i className="fas fa-plus"></i>
                      <span>Đăng sản phẩm mới</span>
                    </button>
                    <button className="action-tile-btn purple" onClick={openAddNews}>
                      <i className="far fa-file-lines"></i>
                      <span>Viết bài viết mới</span>
                    </button>
                    <button className="action-tile-btn orange" onClick={() => setActiveTab('inquiries')}>
                      <i className="far fa-comments"></i>
                      <span>Xem các liên hệ chờ</span>
                      {pendingInquiriesCount > 0 && <span className="action-badge">{pendingInquiriesCount}</span>}
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Inquiries Section */}
              <div className="insights-panel recent-leads-panel">
                <div className="panel-header">
                  <h4><i className="far fa-envelope icon-prefix"></i>Yêu Cầu Tư Vấn Mới Nhất</h4>
                  <button className="btn-text-link" onClick={() => setActiveTab('inquiries')}>Xem tất cả</button>
                </div>
                <div className="panel-body table-responsive">
                  {inquiries.length === 0 ? (
                    <p className="no-data-text">Không có tin nhắn nào từ khách hàng.</p>
                  ) : (
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Khách hàng</th>
                          <th>Số điện thoại</th>
                          <th>Nội dung yêu cầu</th>
                          <th>Ngày gửi</th>
                          <th>Trạng thái</th>
                          <th className="align-right">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inquiries.slice(0, 3).map(inq => (
                          <tr key={inq.id}>
                            <td>
                              <div className="cust-info">
                                <strong>{inq.name}</strong>
                                <span>{inq.email || 'Không có email'}</span>
                              </div>
                            </td>
                            <td><strong className="text-highlight">{inq.phone}</strong></td>
                            <td className="max-width-cell">{inq.message}</td>
                            <td>{formatDate(inq.date)}</td>
                            <td>
                              <span className={`status-pill ${inq.status.toLowerCase()}`}>
                                {inq.status === 'Pending' ? 'Chưa xử lý' : inq.status === 'Contacted' ? 'Đã liên hệ' : 'Hoàn thành'}
                              </span>
                            </td>
                            <td className="align-right">
                              <button 
                                className="btn-table-icon view"
                                onClick={() => setInquiryModal({ show: true, data: inq })}
                                title="Xem chi tiết"
                              >
                                <i className="far fa-eye"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: PRODUCTS */}
          {/* ======================================================== */}
          {activeTab === 'products' && (
            <div className="products-view">
              <div className="workspace-filter-bar">
                <div className="search-box">
                  <i className="fas fa-magnifying-glass"></i>
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm sản phẩm theo tên..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                  />
                </div>
                <div className="filter-group">
                  <select 
                    value={productCatFilter}
                    onChange={(e) => setProductCatFilter(e.target.value)}
                    className="admin-select"
                  >
                    <option value="All">Tất cả danh mục</option>
                    {productCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <button className="btn-primary" onClick={openAddProduct}>
                    <i className="fas fa-plus"></i> Thêm sản phẩm
                  </button>
                </div>
              </div>

              <div className="table-responsive bg-panel card-shadow">
                {filteredProductsList.length === 0 ? (
                  <div className="empty-state">
                    <i className="fas fa-cubes"></i>
                    <p>Không tìm thấy sản phẩm nào phù hợp.</p>
                  </div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Danh mục</th>
                        <th>Giá bán</th>
                        <th>Huy hiệu</th>
                        <th>Thông số chính</th>
                        <th className="align-right">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProductsList.map(prod => (
                        <tr key={prod.id}>
                          <td>
                            <img src={prod.image} alt={prod.name} className="table-thumbnail-img" />
                          </td>
                          <td>
                            <div className="prod-name-cell">
                              <strong>{prod.name}</strong>
                              <p className="truncated-desc">{prod.description?.substring(0, 50)}...</p>
                            </div>
                          </td>
                          <td><span className="category-pill">{prod.category}</span></td>
                          <td>
                            <strong className="text-highlight">
                              {prod.price === 'Call' ? 'Liên hệ' : prod.price}
                            </strong>
                            {prod.price !== 'Call' && prod.unit && <span className="unit-label">{prod.unit}</span>}
                          </td>
                          <td>
                            {prod.badge ? (
                              <span className={`badge-pill ${prod.badge === 'KHUYẾN MÃI' ? 'sale' : prod.badge === 'HOT' ? 'hot' : 'new'}`}>
                                {prod.badge}
                              </span>
                            ) : '-'}
                          </td>
                          <td>
                            <div className="specs-pill-group">
                              {prod.specs && Object.entries(prod.specs).slice(0, 2).map(([k, v]) => (
                                <span key={k} className="mini-spec-pill">
                                  <strong>{k}</strong>: {v}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="align-right actions-cell">
                            <Link 
                              to={`/san-pham/${prod.id}`}
                              className="btn-table-icon view"
                              title="Xem chi tiết trên Web"
                              target="_blank"
                            >
                              <i className="fas fa-external-link"></i>
                            </Link>
                            <button 
                              className="btn-table-icon edit"
                              onClick={() => openEditProduct(prod)}
                              title="Sửa sản phẩm"
                            >
                              <i className="far fa-edit"></i>
                            </button>
                            <button 
                              className="btn-table-icon delete"
                              onClick={() => handleDeleteProduct(prod.id)}
                              title="Xoá sản phẩm"
                            >
                              <i className="far fa-trash-can"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: NEWS */}
          {/* ======================================================== */}
          {activeTab === 'news' && (
            <div className="news-view">
              <div className="workspace-filter-bar">
                <div className="search-box">
                  <i className="fas fa-magnifying-glass"></i>
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm bài viết theo tiêu đề..."
                    value={newsSearch}
                    onChange={(e) => setNewsSearch(e.target.value)}
                  />
                </div>
                <div className="filter-group">
                  <select 
                    value={newsCatFilter}
                    onChange={(e) => setNewsCatFilter(e.target.value)}
                    className="admin-select"
                  >
                    <option value="All">Tất cả chuyên mục</option>
                    {newsCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <button className="btn-primary" onClick={openAddNews}>
                    <i className="fas fa-plus"></i> Viết bài viết
                  </button>
                </div>
              </div>

              <div className="table-responsive bg-panel card-shadow">
                {filteredNewsList.length === 0 ? (
                  <div className="empty-state">
                    <i className="far fa-newspaper"></i>
                    <p>Không tìm thấy bài viết nào phù hợp.</p>
                  </div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Hình ảnh</th>
                        <th>Tiêu đề bài viết</th>
                        <th>Chuyên mục</th>
                        <th>Ngày đăng</th>
                        <th>Tóm tắt nội dung</th>
                        <th className="align-right">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredNewsList.map(art => (
                        <tr key={art.id}>
                          <td>
                            <img src={art.image} alt={art.title} className="table-thumbnail-img" />
                          </td>
                          <td className="news-title-cell">
                            <strong>{art.title}</strong>
                          </td>
                          <td><span className="category-pill news">{art.category}</span></td>
                          <td><span className="text-secondary">{art.date}</span></td>
                          <td className="max-width-cell">{art.summary}</td>
                          <td className="align-right actions-cell">
                            <button 
                              className="btn-table-icon edit"
                              onClick={() => openEditNews(art)}
                              title="Sửa bài viết"
                            >
                              <i className="far fa-edit"></i>
                            </button>
                            <button 
                              className="btn-table-icon delete"
                              onClick={() => handleDeleteNews(art.id)}
                              title="Xoá bài viết"
                            >
                              <i className="far fa-trash-can"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB: INQUIRIES */}
          {/* ======================================================== */}
          {activeTab === 'inquiries' && (
            <div className="inquiries-view">
              <div className="workspace-filter-bar">
                <div className="filter-group">
                  <span className="filter-label">Trạng thái:</span>
                  {['All', 'Pending', 'Contacted', 'Completed'].map(status => (
                    <button 
                      key={status}
                      className={`filter-btn-pill ${inquiryStatusFilter === status ? 'active' : ''}`}
                      onClick={() => setInquiryStatusFilter(status)}
                    >
                      {status === 'All' && 'Tất cả'}
                      {status === 'Pending' && 'Chưa xử lý'}
                      {status === 'Contacted' && 'Đã liên hệ'}
                      {status === 'Completed' && 'Đã giải quyết'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="table-responsive bg-panel card-shadow">
                {filteredInquiriesList.length === 0 ? (
                  <div className="empty-state">
                    <i className="far fa-comments"></i>
                    <p>Không tìm thấy yêu cầu tư vấn nào.</p>
                  </div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Khách hàng</th>
                        <th>Thông tin liên lạc</th>
                        <th>Nội dung tin nhắn</th>
                        <th>Ngày gửi</th>
                        <th>Trạng thái</th>
                        <th className="align-right">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInquiriesList.map(inq => (
                        <tr key={inq.id}>
                          <td>
                            <strong>{inq.name}</strong>
                          </td>
                          <td>
                            <div className="contact-details">
                              <div><i className="fas fa-phone-alt icon-inline"></i><strong className="text-highlight">{inq.phone}</strong></div>
                              {inq.email && <div className="text-secondary"><i className="far fa-envelope icon-inline"></i>{inq.email}</div>}
                            </div>
                          </td>
                          <td className="max-width-cell">{inq.message}</td>
                          <td>{formatDate(inq.date)}</td>
                          <td>
                            <span className={`status-pill ${inq.status.toLowerCase()}`}>
                              {inq.status === 'Pending' ? 'Chưa xử lý' : inq.status === 'Contacted' ? 'Đã liên hệ' : 'Hoàn thành'}
                            </span>
                          </td>
                          <td className="align-right actions-cell">
                            <button 
                              className="btn-table-icon view"
                              onClick={() => setInquiryModal({ show: true, data: inq })}
                              title="Xem chi tiết & Cập nhật"
                            >
                              <i className="far fa-eye"></i>
                            </button>
                            <button 
                              className="btn-table-icon delete"
                              onClick={() => handleDeleteInquiry(inq.id)}
                              title="Xoá yêu cầu"
                            >
                              <i className="far fa-trash-can"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT PRODUCT */}
      {/* ======================================================== */}
      {productModal.show && (
        <div className="admin-modal-overlay animate-fade-in" onClick={() => setProductModal({ show: false, mode: 'add', data: null })}>
          <div className="admin-modal-container animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{productModal.mode === 'add' ? 'Thêm Sản Phẩm Mới' : 'Cập Nhật Thông Tin Sản Phẩm'}</h3>
              <button className="btn-close" onClick={() => setProductModal({ show: false, mode: 'add', data: null })}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleProductSubmit} className="modal-body-scrollable">
              <div className="form-row-2">
                <div className="form-group">
                  <label>Tên sản phẩm <span className="required">*</span></label>
                  <input 
                    type="text" 
                    className="admin-input-control" 
                    placeholder="Ví dụ: Gạch Thảm Cao Cấp HL12"
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Danh mục</label>
                  <select 
                    className="admin-input-control"
                    value={productForm.category}
                    onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                  >
                    {productCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label>Giá bán (nhập số hoặc 'Call')</label>
                  <input 
                    type="text" 
                    className="admin-input-control" 
                    placeholder="Ví dụ: 180.000đ hoặc Call"
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Đơn vị tính</label>
                  <input 
                    type="text" 
                    className="admin-input-control" 
                    placeholder="Ví dụ: / viên, / m2, / bộ"
                    value={productForm.unit}
                    onChange={(e) => setProductForm({...productForm, unit: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Huy hiệu nổi bật (Badge)</label>
                  <select 
                    className="admin-input-control"
                    value={productForm.badge}
                    onChange={(e) => setProductForm({...productForm, badge: e.target.value})}
                  >
                    <option value="">Không hiển thị huy hiệu</option>
                    <option value="MỚI">MỚI (Badge Xanh)</option>
                    <option value="HOT">HOT (Badge Đỏ)</option>
                    <option value="KHUYẾN MÃI">KHUYẾN MÃI (Badge Cam)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Hình ảnh sản phẩm (Chọn hình ảnh minh hoạ có sẵn)</label>
                <div className="image-preset-picker">
                  {presetProductImages.map(img => (
                    <div 
                      key={img.path} 
                      className={`preset-img-tile ${productForm.image === img.path ? 'selected' : ''}`}
                      onClick={() => setProductForm({...productForm, image: img.path})}
                    >
                      <img src={img.path} alt={img.label} />
                      <span className="preset-label">{img.label}</span>
                      {productForm.image === img.path && <div className="checked-badge"><i className="fas fa-check"></i></div>}
                    </div>
                  ))}
                </div>
                <div className="custom-path-input">
                  <label className="sub-label">Hoặc nhập URL / đường dẫn ảnh tùy chỉnh:</label>
                  <input 
                    type="text" 
                    className="admin-input-control compact" 
                    placeholder="Ví dụ: /my_custom_image.png"
                    value={productForm.image}
                    onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Mô tả sản phẩm</label>
                <textarea 
                  rows="3" 
                  className="admin-input-control" 
                  placeholder="Nhập mô tả sản phẩm tại đây..."
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                ></textarea>
              </div>

              {/* Dynamic Specs Subsection */}
              <div className="specs-management-section">
                <h4>Thông số kỹ thuật sản phẩm</h4>
                <div className="current-specs-table">
                  {Object.entries(productForm.specs).length === 0 ? (
                    <p className="no-specs">Chưa có thông số kỹ thuật nào được nhập.</p>
                  ) : (
                    <div className="specs-list-editor">
                      {Object.entries(productForm.specs).map(([key, val]) => (
                        <div key={key} className="spec-row-item">
                          <span className="spec-item-key"><strong>{key}</strong></span>
                          <span className="spec-item-val">{val}</span>
                          <button 
                            type="button" 
                            className="btn-remove-spec"
                            onClick={() => handleRemoveSpec(key)}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="add-spec-inputs-row">
                  <input 
                    type="text" 
                    className="admin-input-control compact"
                    placeholder="Tên (ví dụ: Kích thước)" 
                    value={customSpec.key}
                    onChange={(e) => setCustomSpec({...customSpec, key: e.target.value})}
                  />
                  <input 
                    type="text" 
                    className="admin-input-control compact"
                    placeholder="Giá trị (ví dụ: 60x120 cm)" 
                    value={customSpec.value}
                    onChange={(e) => setCustomSpec({...customSpec, value: e.target.value})}
                  />
                  <button 
                    type="button" 
                    className="btn-secondary compact" 
                    onClick={handleAddSpec}
                  >
                    <i className="fas fa-plus"></i> Thêm thông số
                  </button>
                </div>
              </div>

              <div className="modal-footer-actions">
                <button type="button" className="btn-secondary" onClick={() => setProductModal({ show: false, mode: 'add', data: null })}>
                  Hủy bỏ
                </button>
                <button type="submit" className="btn-primary">
                  <i className="fas fa-floppy-disk"></i> {productModal.mode === 'add' ? 'Lưu sản phẩm' : 'Cập nhật sản phẩm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: WRITE / EDIT ARTICLE */}
      {/* ======================================================== */}
      {newsModal.show && (
        <div className="admin-modal-overlay animate-fade-in" onClick={() => setNewsModal({ show: false, mode: 'add', data: null })}>
          <div className="admin-modal-container animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{newsModal.mode === 'add' ? 'Viết Bài Viết Mới' : 'Cập Nhật Nội Dung Bài Viết'}</h3>
              <button className="btn-close" onClick={() => setNewsModal({ show: false, mode: 'add', data: null })}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <form onSubmit={handleNewsSubmit} className="modal-body-scrollable">
              <div className="form-row-2">
                <div className="form-group">
                  <label>Tiêu đề bài viết <span className="required">*</span></label>
                  <input 
                    type="text" 
                    className="admin-input-control" 
                    placeholder="Nhập tiêu đề thu hút..."
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Chuyên mục</label>
                  <select 
                    className="admin-input-control"
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({...newsForm, category: e.target.value})}
                  >
                    {newsCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Ngày đăng bài</label>
                  <input 
                    type="text" 
                    className="admin-input-control" 
                    placeholder="Ví dụ: 31/05/2026"
                    value={newsForm.date}
                    onChange={(e) => setNewsForm({...newsForm, date: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  {/* Space for future fields or styling alignment */}
                </div>
              </div>

              <div className="form-group">
                <label>Hình ảnh bài viết (Chọn hình ảnh minh hoạ)</label>
                <div className="image-preset-picker">
                  {presetNewsImages.map(img => (
                    <div 
                      key={img.path} 
                      className={`preset-img-tile news ${newsForm.image === img.path ? 'selected' : ''}`}
                      onClick={() => setNewsForm({...newsForm, image: img.path})}
                    >
                      <img src={img.path} alt={img.label} />
                      <span className="preset-label">{img.label}</span>
                      {newsForm.image === img.path && <div className="checked-badge"><i className="fas fa-check"></i></div>}
                    </div>
                  ))}
                </div>
                <div className="custom-path-input">
                  <label className="sub-label">Hoặc nhập đường dẫn ảnh khác:</label>
                  <input 
                    type="text" 
                    className="admin-input-control compact" 
                    placeholder="Ví dụ: /my_article_image.jpg"
                    value={newsForm.image}
                    onChange={(e) => setNewsForm({...newsForm, image: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Tóm tắt bài viết (Summary)</label>
                <textarea 
                  rows="2" 
                  className="admin-input-control" 
                  placeholder="Tóm tắt ngắn gọn hiển thị trên trang danh sách tin..."
                  value={newsForm.summary}
                  onChange={(e) => setNewsForm({...newsForm, summary: e.target.value})}
                ></textarea>
              </div>

              <div className="form-group">
                <label>Nội dung chi tiết bài viết</label>
                <textarea 
                  rows="8" 
                  className="admin-input-control code-font" 
                  placeholder="Nhập nội dung bài viết. Bạn có thể xuống dòng 2 lần để phân tách các đoạn văn..."
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
                ></textarea>
              </div>

              <div className="modal-footer-actions">
                <button type="button" className="btn-secondary" onClick={() => setNewsModal({ show: false, mode: 'add', data: null })}>
                  Hủy bỏ
                </button>
                <button type="submit" className="btn-primary">
                  <i className="fas fa-floppy-disk"></i> {newsModal.mode === 'add' ? 'Đăng bài viết' : 'Lập bài viết'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: VIEW INQUIRY DETAILS */}
      {/* ======================================================== */}
      {inquiryModal.show && inquiryModal.data && (
        <div className="admin-modal-overlay animate-fade-in" onClick={() => setInquiryModal({ show: false, data: null })}>
          <div className="admin-modal-container compact animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Chi Tiết Yêu Cầu Liên Hệ #{inquiryModal.data.id}</h3>
              <button className="btn-close" onClick={() => setInquiryModal({ show: false, data: null })}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-body-scrollable pad-large">
              <div className="inquiry-details-header">
                <div className="user-avatar-circle">
                  {inquiryModal.data.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4>{inquiryModal.data.name}</h4>
                  <span className="date-time">{formatDate(inquiryModal.data.date)}</span>
                </div>
              </div>

              <div className="inquiry-fields-grid">
                <div className="inq-field-item">
                  <span className="inq-field-label">Số điện thoại:</span>
                  <a href={`tel:${inquiryModal.data.phone}`} className="inq-field-val link-phone">
                    <i className="fas fa-phone-alt"></i> {inquiryModal.data.phone}
                  </a>
                </div>
                <div className="inq-field-item">
                  <span className="inq-field-label">Email:</span>
                  <span className="inq-field-val">{inquiryModal.data.email || 'Không có email'}</span>
                </div>
              </div>

              <div className="inq-message-box">
                <span className="inq-field-label">Nội dung tin nhắn:</span>
                <div className="inq-message-text">{inquiryModal.data.message}</div>
              </div>

              <div className="inq-status-control-section">
                <span className="inq-field-label">Cập nhật trạng thái xử lý:</span>
                <div className="status-selector-row">
                  <button 
                    className={`status-select-btn pending ${inquiryModal.data.status === 'Pending' ? 'selected' : ''}`}
                    onClick={() => handleUpdateInquiryStatus(inquiryModal.data.id, 'Pending')}
                  >
                    Chưa xử lý
                  </button>
                  <button 
                    className={`status-select-btn contacted ${inquiryModal.data.status === 'Contacted' ? 'selected' : ''}`}
                    onClick={() => handleUpdateInquiryStatus(inquiryModal.data.id, 'Contacted')}
                  >
                    Đã liên hệ
                  </button>
                  <button 
                    className={`status-select-btn completed ${inquiryModal.data.status === 'Completed' ? 'selected' : ''}`}
                    onClick={() => handleUpdateInquiryStatus(inquiryModal.data.id, 'Completed')}
                  >
                    Hoàn thành
                  </button>
                </div>
              </div>

              <div className="modal-footer-actions space-between">
                <button 
                  type="button" 
                  className="btn-danger" 
                  onClick={() => handleDeleteInquiry(inquiryModal.data.id)}
                >
                  <i className="far fa-trash-can"></i> Xoá yêu cầu
                </button>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => setInquiryModal({ show: false, data: null })}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
