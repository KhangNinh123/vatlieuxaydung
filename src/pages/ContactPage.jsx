import { useState } from 'react';
import { addInquiry } from '../data/db';
import './ContactPage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Vui lòng điền đầy đủ Họ tên và Số điện thoại!');
      return;
    }

    addInquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message
    });

    setSubmitted(true);
    setFormData({ name: '', phone: '', email: '', message: '' });
    
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="contact-page">
      {/* Contact Hero */}
      <section className="contact-hero">
        <div className="container contact-hero-container">
          <h1 className="animate-fade-in">Liên Hệ Với Chúng Tôi</h1>
          <p className="animate-slide-up">Hưng Long Vĩnh Long luôn sẵn sàng lắng nghe và hỗ trợ tư vấn cho công trình của bạn</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-section-body">
        <div className="container contact-grid">
          {/* Info Card */}
          <div className="contact-info-panel">
            <div className="info-header">
              <h2>Thông Tin Showroom</h2>
              <p>Trực thuộc hệ thống Khang Ninh - Phân phối vật liệu xây dựng & trang trí nội thất hàng đầu.</p>
            </div>

            <div className="info-list">
              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="info-texts">
                  <strong>Địa chỉ Showroom</strong>
                  <span>Đường Nguyễn Huệ, Phường 2, Thành phố Vĩnh Long, Tỉnh Vĩnh Long</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="info-texts">
                  <strong>Hotline tư vấn</strong>
                  <span><a href="tel:0796999353">0796 999 353</a></span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <i className="far fa-envelope"></i>
                </div>
                <div className="info-texts">
                  <strong>Email liên hệ</strong>
                  <span><a href="mailto:hunglongvinhlong@gmail.com">hunglongvinhlong@gmail.com</a></span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="info-texts">
                  <strong>Giờ làm việc</strong>
                  <span>Thứ 2 - Chủ Nhật: 7:30 - 18:00</span>
                </div>
              </div>
            </div>

            {/* Microcta */}
            <div className="contact-support-badge">
              <div className="badge-avatar">
                <i className="fas fa-comments"></i>
              </div>
              <div className="badge-desc">
                <h4>Hỗ trợ trực tuyến 24/7</h4>
                <p>Chat trực tiếp với chúng tôi qua Zalo hoặc Hotline để có báo giá nhanh trong 5 phút.</p>
                <div className="badge-actions">
                  <a href="https://zalo.me/0796999353" target="_blank" rel="noopener noreferrer" className="btn-badge-zalo">
                    <i className="fab fa-whatsapp"></i> Chat Zalo
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="contact-form-panel">
            <h2>Gửi Yêu Cầu Tư Vấn</h2>
            <p>Vui lòng để lại thông tin bên dưới, chuyên viên tư vấn của Hưng Long sẽ liên hệ lại với bạn sớm nhất có thể.</p>

            {submitted && (
              <div className="success-banner animate-fade-in">
                <i className="fas fa-circle-check"></i>
                <div>
                  <h4>Gửi yêu cầu thành công!</h4>
                  <p>Cảm ơn bạn. Yêu cầu của bạn đã được chuyển tới phòng kinh doanh Hưng Long.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group-float">
                <input 
                  type="text" 
                  id="contact-name" 
                  placeholder=" " 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <label htmlFor="contact-name">Họ và tên của bạn *</label>
              </div>

              <div className="form-group-float">
                <input 
                  type="tel" 
                  id="contact-phone" 
                  placeholder=" " 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
                <label htmlFor="contact-phone">Số điện thoại *</label>
              </div>

              <div className="form-group-float">
                <input 
                  type="email" 
                  id="contact-email" 
                  placeholder=" " 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <label htmlFor="contact-email">Địa chỉ Email (nếu có)</label>
              </div>

              <div className="form-group-float">
                <textarea 
                  id="contact-message" 
                  rows="4" 
                  placeholder=" " 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
                <label htmlFor="contact-message">Nội dung yêu cầu (Mẫu sản phẩm cần báo giá, diện tích thi công...)</label>
              </div>

              <button type="submit" className="btn-contact-submit">
                <i className="fas fa-paper-plane"></i> Gửi yêu cầu tư vấn
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Embed Section */}
      <section className="contact-map-section">
        <div className="container">
          <div className="map-wrapper card-shadow">
            {/* Embedded Google Maps mock or premium styled layout */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.2410884631376!2d105.9555776!3d10.2421443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a83e020286817%3A0xe54e60155a0179a6!2zTmd1eeG7hW4gSHXhu4csIFBow7RuZyAyLCBWxKluaCBMb25nLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1680000000000!5m2!1sen!2s" 
              width="100%" 
              height="400" 
              style={{ border: 0, borderRadius: '12px' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Showroom Hưng Long Vĩnh Long"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
