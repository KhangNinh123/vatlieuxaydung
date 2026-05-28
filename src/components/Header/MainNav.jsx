import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const menuItems = [
  { label: 'Trang chủ', href: '/', icon: 'fas fa-home' },
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  {
    label: 'Sản phẩm',
    href: '/',
    children: [
      { label: 'Gạch Ấn Độ', href: '/' },
      { label: 'Gạch Nhập Khẩu', href: '/' },
      { label: 'Gạch Tây Ban Nha - Italy', href: '/' },
      { label: 'Gạch Nội', href: '/' },
      { label: 'Sản phẩm khác', href: '/' },
    ],
  },
  { label: 'Sản phẩm khuyến mãi', href: '/', highlight: true },
  {
    label: 'Thông tin khác',
    href: '/',
    children: [
      { label: 'Nhập khẩu phân phối', href: '/' },
      { label: 'Phân phối VLXD & Nội thất', href: '/' },
      { label: 'Thiết kế - Thi công Gỗ', href: '/' },
      { label: 'Hướng Dẫn Mua Hàng', href: '/' },
      { label: 'Chính Sách Bảo Hành', href: '/' },
    ],
  },
  { label: 'Tin tức', href: '/tin-tuc' },
  { label: 'Hình ảnh đẹp', href: '/hinh-anh' },
  { label: 'Liên hệ', href: '/lien-he' },
]

function MainNav({ isOpen }) {
  const [openDropdown, setOpenDropdown] = useState(null)
  const location = useLocation()

  const handleDropdownToggle = (index) => {
    setOpenDropdown(prev => (prev === index ? null : index))
  }

  return (
    <nav className={`main-nav ${isOpen ? 'is-open' : ''}`}>
      <div className="container">
        <ul className="nav-list">
          {menuItems.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0
            const isDropdownOpen = openDropdown === index
            const isActive = location.pathname === item.href

            return (
              <li
                key={index}
                className={`nav-item ${hasChildren ? 'has-dropdown' : ''}`}
                onMouseEnter={() => hasChildren && setOpenDropdown(index)}
                onMouseLeave={() => hasChildren && setOpenDropdown(null)}
              >
                {hasChildren ? (
                  <a
                    href="#"
                    className={`nav-link ${isActive ? 'active' : ''} ${item.highlight ? 'highlight' : ''}`}
                    id={`nav-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault()
                      handleDropdownToggle(index)
                    }}
                  >
                    {item.icon && <i className={item.icon}></i>}
                    {item.label}
                    <i className={`fas fa-angle-down dropdown-arrow ${isDropdownOpen ? 'rotated' : ''}`}></i>
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className={`nav-link ${isActive ? 'active' : ''} ${item.highlight ? 'highlight' : ''}`}
                    id={`nav-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    {item.icon && <i className={item.icon}></i>}
                    {item.label}
                  </Link>
                )}

                {hasChildren && (
                  <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                    {item.children.map((child, childIndex) => (
                      <li key={childIndex}>
                        <Link
                          to={child.href}
                          className="dropdown-link"
                          id={`dropdown-${child.label.replace(/\s+/g, '-').toLowerCase()}`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default MainNav
