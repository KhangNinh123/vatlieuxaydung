import './AboutPage.css'
import logoImg from '../assets/logo.png'

function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Banner Section */}
      <section className="about-hero">
        <div className="container hero-container">
          <h1 className="hero-title animate-fade-in">Giới Thiệu</h1>
          <p className="hero-subtitle animate-slide-up">Hưng Long Vĩnh Long - Đồng hành kiến tạo tổ ấm Việt</p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="about-overview">
        <div className="container overview-grid">
          <div className="overview-image-wrapper">
            <img src={logoImg} alt="Hưng Long Vĩnh Long" className="overview-logo-img" />
          </div>
          <div className="overview-text">
            <h2 className="section-title-about">Về Chúng Tôi</h2>
            <div className="divider-about"></div>
            <p className="about-p highlight-p">
              <strong>Hưng Long Vĩnh Long</strong> tự hào là một trong những đơn vị tiên phong hàng đầu trong lĩnh vực cung cấp vật liệu xây dựng và nội thất cao cấp tại khu vực Vĩnh Long và các tỉnh lân cận.
            </p>
            <p className="about-p">
              Với phương châm kiến tạo những giá trị bền vững và mang tới không gian sống hoàn mỹ, chúng tôi chuyên nhập khẩu và phân phối trực tiếp các sản phẩm gạch ốp lát cao cấp từ Ấn Độ, Tây Ban Nha, Ý, cùng với thiết bị vệ sinh cao cấp và các dòng sản phẩm gỗ nội thất tinh xảo.
            </p>
            <p className="about-p">
              Chúng tôi luôn cam kết mang lại các giải pháp vật liệu xây dựng tốt nhất, an toàn và tối ưu chi phí cho mọi dự án nhà ở, biệt thự, dự án thương mại của quý khách.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="vision-mission-section">
        <div className="container vision-mission-grid">
          <div className="vision-card">
            <div className="card-icon-wrapper">
              <i className="fas fa-eye"></i>
            </div>
            <h3>Tầm Nhìn</h3>
            <p>Trở thành biểu tượng uy tín hàng đầu tại Việt Nam trong lĩnh vực cung cấp giải pháp vật liệu xây dựng và trang trí nội thất, nâng tầm phong cách sống cho hàng triệu gia đình Việt.</p>
          </div>
          
          <div className="mission-card">
            <div className="card-icon-wrapper">
              <i className="fas fa-bullseye"></i>
            </div>
            <h3>Sứ Mệnh</h3>
            <p>Mang đến những sản phẩm chất lượng vượt trội, thẩm mỹ tinh tế và thân thiện với môi trường, góp phần kiến tạo những không gian sống đẳng cấp, tiện nghi và ấm cúng.</p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="core-values">
        <div className="container">
          <h2 className="section-title-about text-center">Giá Trị Cốt Lõi</h2>
          <div className="divider-about center"></div>
          
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-award"></i>
              </div>
              <h4>Chất Lượng</h4>
              <p>Mỗi sản phẩm đưa tới tay khách hàng đều phải vượt qua những kiểm duyệt nghiêm ngặt nhất về chất lượng và độ bền.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h4>Uy Tín</h4>
              <p>Luôn đặt chữ tín lên hàng đầu, bảo vệ uy tín như bảo vệ danh dự của chính mình thông qua các cam kết chân thực.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h4>Sáng Tạo</h4>
              <p>Không ngừng đổi mới, cập nhật các xu hướng thiết kế và công nghệ vật liệu hiện đại nhất thế giới.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h4>Tận Tâm</h4>
              <p>Phục vụ khách hàng bằng cả sự nhiệt huyết, chu đáo, đồng hành cùng khách hàng từ khâu tư vấn đến hậu mãi lâu dài.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="about-cta">
        <div className="container cta-container">
          <h2>Liên hệ tư vấn và đặt hàng ngay hôm nay!</h2>
          <p>Đội ngũ chuyên viên Hưng Long Vĩnh Long luôn sẵn sàng hỗ trợ, tư vấn thiết kế và báo giá chi tiết nhất.</p>
          <div className="cta-buttons">
            <a href="tel:0796999353" className="btn-cta-phone">
              <i className="fas fa-phone-alt"></i> 0796 999 353
            </a>
            <a href="https://zalo.me/0796999353" target="_blank" rel="noopener noreferrer" className="btn-cta-zalo">
              <i className="fas fa-comment"></i> Chat qua Zalo
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
