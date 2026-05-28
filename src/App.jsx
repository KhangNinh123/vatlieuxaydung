import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage'
import GalleryPage from './pages/GalleryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AboutPage from './pages/AboutPage'
import NewsPage from './pages/NewsPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hinh-anh" element={<GalleryPage />} />
            <Route path="/gioi-thieu" element={<AboutPage />} />
            <Route path="/tin-tuc" element={<NewsPage />} />
            <Route path="/san-pham/:id" element={<ProductDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
