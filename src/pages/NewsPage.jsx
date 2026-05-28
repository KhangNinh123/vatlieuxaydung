import { useState } from 'react'
import './NewsPage.css'

const newsArticles = [
  {
    id: 1,
    title: 'Xu hướng gạch ốp lát năm 2026: Sang trọng và gần gũi thiên nhiên',
    category: 'Xu hướng',
    date: '20/05/2026',
    image: '/gallery_livingroom2.png',
    summary: 'Năm 2026 chứng kiến sự lên ngôi của các dòng gạch khổ lớn vân đá tự nhiên và các gam màu ấm áp, mộc mạc mang thiên nhiên vào ngôi nhà của bạn.',
    content: `Xu hướng thiết kế nội thất năm 2026 đang hướng mạnh mẽ về sự bền vững, sang trọng nhưng không kém phần mộc mạc, gần gũi với thiên nhiên. Trong đó, gạch ốp lát đóng vai trò chủ đạo định hình phong cách cho toàn bộ ngôi nhà.

Dưới đây là 3 xu hướng nổi bật được các kiến trúc sư đánh giá cao nhất:

1. Gạch Khổ Lớn (Big Slab): Các kích thước như 80x160cm, 120x240cm ngày càng phổ biến. Với ít đường ron nối hơn, gạch khổ lớn tạo ra một bề mặt liền mạch, mở rộng tối đa không gian và toát lên vẻ sang trọng quyền quý.

2. Vân Đá Marble Tự Nhiên & Tone Màu Ấm: Thay vì các gam màu lạnh của các năm trước, năm nay các tông màu ấm áp như beige, nâu đất kết hợp với các đường vân marble sâu thẳm, tinh tế đang cực kỳ được ưa chuộng.

3. Bề Mặt Nhám (Matt) Và Vân Nổi Sần: Mang đến cảm giác chân thực như đá tự nhiên hoặc gỗ tự nhiên dưới lòng bàn chân, đồng thời chống trơn trượt vô cùng hiệu quả, phù hợp cho cả gia đình có người già và trẻ nhỏ.`
  },
  {
    id: 2,
    title: 'Cách chọn thiết bị vệ sinh phù hợp cho phòng tắm diện tích nhỏ',
    category: 'Cẩm nang',
    date: '15/05/2026',
    image: '/banner_bathroom.png',
    summary: 'Bí quyết tối ưu hóa diện tích phòng tắm nhỏ hẹp bằng việc chọn thiết bị vệ sinh âm tường, bồn cầu thông minh và gương đèn LED sang trọng.',
    content: `Phòng tắm có diện tích hạn chế luôn là bài toán đau đầu đối với gia chủ khi xây dựng hoặc cải tạo nhà. Tuy nhiên, bằng việc khéo léo chọn lựa thiết bị vệ sinh phù hợp, bạn hoàn toàn có thể biến phòng tắm nhỏ hẹp trở nên rộng rãi và tiện nghi.

Hãy tham khảo ngay các mẹo sau:

1. Sử dụng Thiết Bị Âm Tường: Bồn cầu treo tường âm két nước, sen tắm âm tường... giúp giải phóng không gian mặt sàn cực kỳ tốt, làm phòng tắm có cảm giác rộng ra từ 20-30%.

2. Lavabo Kết Hợp Tủ Chậu (Tủ Lavabo): Tận dụng không gian bên dưới chậu rửa để làm tủ đựng đồ dùng cá nhân, sữa tắm, khăn tắm. Cách này giúp giữ phòng tắm luôn gọn gàng, sạch sẽ.

3. Màu Sắc Và Ánh Sáng: Chọn thiết bị vệ sinh có sứ trắng bóng để phản chiếu ánh sáng tốt hơn. Kết hợp một chiếc gương LED thông minh hình tròn hoặc chữ nhật lớn để tạo chiều sâu ảo cho không gian.`
  },
  {
    id: 3,
    title: 'Bí quyết bảo quản gạch giả gỗ luôn sáng bóng như mới',
    category: 'Cẩm nang',
    date: '10/05/2026',
    image: '/gallery_kitchen.png',
    summary: 'Gạch giả gỗ mang lại vẻ đẹp ấm cúng như gỗ tự nhiên nhưng có độ bền cao hơn. Tìm hiểu ngay cách vệ sinh và bảo quản gạch luôn bền đẹp.',
    content: `Gạch giả gỗ là sự thay thế hoàn hảo cho sàn gỗ công nghiệp hay sàn gỗ tự nhiên vì khả năng chống nước tuyệt đối, không sợ mối mọt hay cong vênh. Để nền gạch giả gỗ luôn giữ được vẻ đẹp tự nhiên ấm cúng như ngày đầu, hãy bỏ túi các lưu ý dưới đây:

1. Vệ Sinh Hàng Ngày Đúng Cách: Nên quét sạch bụi bẩn hoặc hút bụi trước khi lau sàn. Sử dụng cây lau nhà ẩm cùng nước lau sàn dịu nhẹ, tránh dùng các chất tẩy rửa chứa axit mạnh vì có thể làm mất đi độ bóng hoặc lớp bảo vệ bề mặt gạch.

2. Xử Lý Vết Bẩn Cứng Đầu Ngay Lập Tức: Đối với các vết dầu mỡ hoặc cà phê đổ ra sàn, hãy dùng khăn mềm ẩm lau ngay. Bạn có thể sử dụng một ít baking soda pha loãng để tẩy sạch nhẹ nhàng mà không gây hại cho men gạch.

3. Hạn Chế Kéo Lê Vật Nặng: Mặc dù gạch giả gỗ có khả năng chống trầy xước rất tốt so với gỗ tự nhiên, nhưng việc kéo lê các chân bàn ghế kim loại sắt nhọn vẫn có nguy cơ tạo ra các vết trầy xước nông, lâu ngày tích tụ bụi bẩn gây mất thẩm mỹ.`
  },
  {
    id: 4,
    title: 'Hưng Long Vĩnh Long khai trương Showroom mới với nhiều ưu đãi lớn',
    category: 'Tin công ty',
    date: '05/05/2026',
    image: '/gallery_outdoor.png',
    summary: 'Hưng Long Vĩnh Long chính thức khai trương không gian mua sắm vật liệu xây dựng và trang trí nội thất hiện đại bậc nhất khu vực.',
    content: `Nhằm đáp ứng nhu cầu tham quan và mua sắm vật liệu xây dựng cao cấp ngày càng tăng của quý khách hàng, Hưng Long Vĩnh Long vui mừng thông báo khai trương Showroom mới khang trang và hiện đại hơn.

Showroom mới được thiết kế theo phong cách hiện đại với nhiều không gian trải nghiệm thực tế:

1. Khu trưng bày gạch nhập khẩu trực tiếp: Nơi tập hợp hàng trăm mẫu gạch khổ lớn, gạch trang trí nhũ vàng, gạch mosaic nhập khẩu từ Ấn Độ, Tây Ban Nha, Ý, Việt Nam...

2. Không gian nhà mẫu vệ sinh: Các module phòng tắm được setup hoàn chỉnh với các sản phẩm sen vòi, bồn cầu treo tường cao cấp giúp quý khách dễ dàng hình dung và lựa chọn.

3. Chương trình ưu đãi khai trương hấp dẫn:
- Giảm giá lên tới 20% cho toàn bộ các dòng gạch Ấn Độ cao cấp.
- Tặng ngay quà tặng giá trị cho đơn hàng thiết bị vệ sinh trọn gói.
- Miễn phí vận chuyển tận nơi trong khu vực nội thành.`
  }
]

function NewsPage() {
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [activeCategory, setActiveCategory] = useState('Tất cả')

  const categories = ['Tất cả', 'Xu hướng', 'Cẩm nang', 'Tin công ty']

  const filteredArticles = activeCategory === 'Tất cả' 
    ? newsArticles 
    : newsArticles.filter(art => art.category === activeCategory)

  const handleOpenArticle = (article) => {
    setSelectedArticle(article)
    document.body.style.overflow = 'hidden' // prevent body scrolling
  }

  const handleCloseArticle = () => {
    setSelectedArticle(null)
    document.body.style.overflow = 'auto' // restore scrolling
  }

  return (
    <div className="news-page">
      {/* Hero Banner Section */}
      <section className="news-hero">
        <div className="container hero-container">
          <h1 className="hero-title animate-fade-in">Tin Tức & Cẩm Nang</h1>
          <p className="hero-subtitle animate-slide-up">Cập nhật xu hướng thiết kế nội thất và kinh nghiệm chọn vật liệu xây dựng tốt nhất</p>
        </div>
      </section>

      {/* Filter Category */}
      <section className="news-filter-section">
        <div className="container">
          <div className="categories-tab">
            {categories.map((cat, idx) => (
              <button 
                key={idx} 
                className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="news-grid-section">
        <div className="container">
          <div className="news-grid">
            {filteredArticles.map(article => (
              <article key={article.id} className="news-card">
                <div className="news-image-box">
                  <span className={`news-category-badge ${article.category.toLowerCase().replace(/\s+/g, '-')}`}>
                    {article.category}
                  </span>
                  <img src={article.image} alt={article.title} />
                </div>
                <div className="news-body">
                  <span className="news-date">
                    <i className="far fa-calendar-alt"></i> {article.date}
                  </span>
                  <h3 className="news-card-title">{article.title}</h3>
                  <p className="news-card-summary">{article.summary}</p>
                  <button 
                    onClick={() => handleOpenArticle(article)} 
                    className="btn-readmore"
                  >
                    Đọc tiếp <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="modal-backdrop" onClick={handleCloseArticle}>
          <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="btn-modal-close" onClick={handleCloseArticle}>
              <i className="fas fa-times"></i>
            </button>
            <div className="modal-header-img">
              <img src={selectedArticle.image} alt={selectedArticle.title} />
              <div className="modal-header-overlay">
                <span className="modal-badge">{selectedArticle.category}</span>
                <h2>{selectedArticle.title}</h2>
              </div>
            </div>
            <div className="modal-body-content">
              <div className="modal-meta-info">
                <span><i className="far fa-calendar-alt"></i> Ngày đăng: {selectedArticle.date}</span>
                <span><i className="far fa-user"></i> Đăng bởi: Ban biên tập Hưng Long</span>
              </div>
              <div className="modal-text-content">
                {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              {/* CTA Inside Modal */}
              <div className="modal-cta-box">
                <h4>Quý khách cần tư vấn hoặc báo giá nhanh?</h4>
                <p>Vui lòng liên hệ với chúng tôi để nhận sự hỗ trợ tận tình nhất từ chuyên viên.</p>
                <div className="modal-cta-buttons">
                  <a href="tel:0796999353" className="modal-btn-phone">
                    <i className="fas fa-phone-alt"></i> Gọi điện: 0796 999 353
                  </a>
                  <a href="https://zalo.me/0796999353" target="_blank" rel="noopener noreferrer" className="modal-btn-zalo">
                    <i className="fas fa-comment"></i> Chat Zalo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewsPage
