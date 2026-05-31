import { Link } from 'react-router-dom';
import './Footer.css';
import logoImg from '../../assets/logo.png';

function Footer() {
  return (
    <footer className="footer">
      {/* Top Footer with Newsletter */}
      <div className="footer-newsletter">
        <div className="container newsletter-container">
          <div className="newsletter-text">
            <i className="fas fa-envelope-open-text"></i>
            <div>
              <h3>Đăng ký nhận bản tin</h3>
              <p>Nhận ngay thông tin khuyến mãi và xu hướng nội thất mới nhất.</p>
            </div>
          </div>
          <form className="newsletter-form">
            <input type="email" placeholder="Nhập địa chỉ email của bạn..." required />
            <button type="submit">Đăng ký</button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="container footer-grid">
          
          {/* Column 1: About */}
          <div className="footer-col about-col">
            <div className="footer-logo">
              <img src={logoImg} alt="Hưng Long Vĩnh Long Logo" className="footer-logo-img" />
              <span className="logo-text">Hưng Long<span className="dot">.</span></span>
            </div>
            <p className="company-desc">
              Chuyên nhập khẩu và phân phối trực tiếp các sản phẩm gạch ốp lát cao cấp, thiết bị vệ sinh, vật liệu xây dựng và đồ gỗ nội thất chất lượng hàng đầu tại Việt Nam.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon" title="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon" title="YouTube"><i className="fab fa-youtube"></i></a>
              <a href="#" className="social-icon" title="Zalo"><i className="fas fa-comment"></i></a>
            </div>
          </div>

          {/* Column 2: Contact */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Thông Tin Liên Hệ</h4>
            <ul className="contact-info">
              <li>
                <i className="fas fa-phone-alt"></i>
                <div className="contact-phones">
                  <a href="tel:0796999353">0796 999 353</a>
                </div>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <a href="mailto:hunglongvinhlong@gmail.com">hunglongvinhlong@gmail.com</a>
              </li>
              <li>
                <i className="fas fa-globe"></i>
                <a href="http://vatlieuxaydung.com.vn" target="_blank" rel="noreferrer">www.vatlieuxaydung.com.vn</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="footer-col links-col">
            <h4 className="footer-heading">Danh Mục Sản Phẩm</h4>
            <ul className="footer-links">
              <li><a href="#"><i className="fas fa-angle-right"></i> Gạch Ấn Độ</a></li>
              <li><a href="#"><i className="fas fa-angle-right"></i> Gạch Nhập Khẩu</a></li>
              <li><a href="#"><i className="fas fa-angle-right"></i> Gạch Tây Ban Nha - Italy</a></li>
              <li><a href="#"><i className="fas fa-angle-right"></i> Gạch Nội</a></li>
              <li><a href="#"><i className="fas fa-angle-right"></i> Thiết Bị Vệ Sinh</a></li>
              <li><a href="#"><i className="fas fa-angle-right"></i> Đồ Gỗ Nội Thất</a></li>
            </ul>
          </div>

          {/* Column 4: Customer Support */}
          <div className="footer-col links-col">
            <h4 className="footer-heading">Hỗ Trợ Khách Hàng</h4>
            <ul className="footer-links">
              <li><a href="#"><i className="fas fa-angle-right"></i> Hướng Dẫn Mua Hàng</a></li>
              <li><a href="#"><i className="fas fa-angle-right"></i> Chính Sách Bảo Hành</a></li>
              <li><a href="#"><i className="fas fa-angle-right"></i> Chính Sách Đổi Trả</a></li>
              <li><a href="#"><i className="fas fa-angle-right"></i> Vận Chuyển & Giao Nhận</a></li>
              <li><a href="#"><i className="fas fa-angle-right"></i> Tư Vấn Thiết Kế</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container bottom-container">
          <p className="copyright">
            &copy; {new Date().getFullYear()} <strong>Hưng Long Vĩnh Long</strong>. Tất cả quyền được bảo lưu. | <Link to="/admin" style={{ color: '#94a3b8', textDecoration: 'none', marginLeft: '8px' }}><i className="fas fa-user-gear" style={{ marginRight: '4px' }}></i>Quản lý</Link>
          </p>
          <div className="payment-methods">
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-jcb"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
