import { useState, useEffect } from 'react';
import './Banner.css';

const slides = [
  {
    id: 1,
    image: '/banner_living_room.png',
    title: 'Gạch Ốp Lát Nhập Khẩu',
    subtitle: 'Nâng tầm không gian sống với bộ sưu tập gạch vân đá cao cấp, mang đến vẻ đẹp sang trọng và đẳng cấp cho ngôi nhà của bạn.',
    cta: 'Khám Phá Ngay'
  },
  {
    id: 2,
    image: '/banner_bathroom.png',
    title: 'Thiết Bị Vệ Sinh Cao Cấp',
    subtitle: 'Trải nghiệm không gian thư giãn tuyệt đối với các thiết kế tối giản, tinh tế cùng chất lượng vượt trội.',
    cta: 'Xem Bộ Sưu Tập'
  }
];

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Auto slide every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="banner-section">
      <div className="banner-slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`banner-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="banner-overlay"></div>
            <div className="container banner-content-wrapper">
              <div className="banner-content">
                <h2 className="banner-title">{slide.title}</h2>
                <p className="banner-subtitle">{slide.subtitle}</p>
                <a href="#" className="banner-btn">{slide.cta}</a>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button className="banner-nav prev" onClick={prevSlide}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="banner-nav next" onClick={nextSlide}>
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Indicators */}
        <div className="banner-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Banner;
