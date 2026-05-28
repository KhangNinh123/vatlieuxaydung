import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import logoImg from '../../assets/logo.png'

function LogoArea({ onMenuToggle }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchParam = searchParams.get('search') || ''
  
  const [searchVal, setSearchVal] = useState(searchParam)

  // Keep search input in sync with URL changes
  useEffect(() => {
    setSearchVal(searchParam)
  }, [searchParam])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const trimmed = searchVal.trim()
    if (trimmed) {
      navigate(`/?search=${encodeURIComponent(trimmed)}`)
      // Scroll to the product section
      const section = document.getElementById('product-section')
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate('/')
    }
  }

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
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, danh mục..."
              id="search-input"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
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
