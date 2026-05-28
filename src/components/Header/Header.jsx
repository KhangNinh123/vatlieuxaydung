import { useState } from 'react'
import TopBar from './TopBar'
import LogoArea from './LogoArea'
import MainNav from './MainNav'
import './Header.css'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev)
  }

  return (
    <header className="header">
      <TopBar />
      <LogoArea onMenuToggle={toggleMobileMenu} />
      <MainNav isOpen={mobileMenuOpen} />
    </header>
  )
}

export default Header
