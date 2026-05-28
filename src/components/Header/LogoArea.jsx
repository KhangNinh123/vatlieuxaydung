import { Link } from 'react-router-dom'
import logoImg from '../../assets/logo.png'

function LogoArea({ onMenuToggle }) {
  return (
    <div className="logo-area">
      <div className="container logo-container">
        <div className="logo">
          <Link to="/" id="logo-link" className="logo-link-with-img">
            <img src={logoImg} alt="Hưng Long Vĩnh Long Logo" className="logo-img" />
            <div className="logo-text-group">
              <span className="logo-text">
                Hưng Long<span className="dot">.</span>
              </span>
              <span className="logo-subtext">Vật Liệu Xây Dựng &amp; Nội Thất Cao Cấp</span>
            </div>
          </Link>
        </div>

        <div className="search-box">
          <form action="#" method="GET">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, danh mục..."
              id="search-input"
            />
            <button type="submit" className="search-btn" id="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={onMenuToggle}
          id="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </div>
  )
}

export default LogoArea
