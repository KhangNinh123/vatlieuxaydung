function TopBar() {
  return (
    <div className="top-bar">
      <div className="container top-bar-container">
        <div className="top-bar-left">
          <a href="#" className="top-link" id="top-cart-link">
            <i className="fas fa-shopping-cart"></i>
            <span>Giỏ hàng (0)</span>
          </a>
          <a href="#" className="top-link" id="top-video-link">
            <i className="fas fa-video"></i>
            <span>Video</span>
          </a>
          <a href="#" className="top-link" id="top-map-link">
            <i className="fas fa-map-marker-alt"></i>
            <span>Bản đồ</span>
          </a>
          <a href="#" className="top-link" id="top-sitemap-link">
            <i className="fas fa-sitemap"></i>
            <span>Sitemap</span>
          </a>
        </div>
        <div className="top-bar-right">
          <div className="hotline">
            <i className="fas fa-phone-volume hotline-icon"></i>
            <span className="hotline-label">Hotline:</span>
            <a href="tel:0796999353" className="hotline-number" id="hotline-1">0796 999 353</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
