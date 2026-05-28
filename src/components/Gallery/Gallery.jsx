import { useState } from 'react';
import './Gallery.css';

const galleryItems = [
  {
    id: 1,
    image: '/banner_living_room.png',
    title: 'Phòng Khách Sang Trọng',
    category: 'living',
    description: 'Gạch vân đá marble trắng – Tạo không gian rộng rãi, đẳng cấp.'
  },
  {
    id: 2,
    image: '/banner_bathroom.png',
    title: 'Phòng Tắm Hiện Đại',
    category: 'bathroom',
    description: 'Gạch ceramic tông tối – Phong cách tối giản, tinh tế.'
  },
  {
    id: 3,
    image: '/gallery_kitchen.png',
    title: 'Nhà Bếp Cao Cấp',
    category: 'kitchen',
    description: 'Gạch trang trí backsplash – Điểm nhấn nghệ thuật cho gian bếp.'
  },
  {
    id: 4,
    image: '/gallery_bedroom.png',
    title: 'Phòng Ngủ Ấm Cúng',
    category: 'bedroom',
    description: 'Gạch giả gỗ – Mang thiên nhiên vào không gian nghỉ ngơi.'
  },
  {
    id: 5,
    image: '/gallery_outdoor.png',
    title: 'Sân Vườn & Hồ Bơi',
    category: 'outdoor',
    description: 'Đá lát sân – Bền bỉ với thời tiết, sang trọng vượt thời gian.'
  },
  {
    id: 6,
    image: '/product_tile_marble.png',
    title: 'Gạch Vân Đá Calacatta',
    category: 'material',
    description: 'Nhập khẩu Ấn Độ – Vân vàng tự nhiên, bề mặt bóng kính.'
  },
  {
    id: 7,
    image: '/gallery_hallway.png',
    title: 'Sảnh Biệt Thự Đẳng Cấp',
    category: 'living',
    description: 'Gạch marble bóng kính khổ lớn – Tôn vinh vẻ đẹp kiến trúc cổ điển hiện đại.'
  },
  {
    id: 8,
    image: '/gallery_spa.png',
    title: 'Phòng Tắm Spa Nhiệt Đới',
    category: 'bathroom',
    description: 'Đá ốp tự nhiên kết hợp bồn tắm freestanding – Không gian thư giãn như resort.'
  },
  {
    id: 9,
    image: '/gallery_dining.png',
    title: 'Phòng Ăn Hiện Đại',
    category: 'living',
    description: 'Gạch nền marble trắng bóng – Không gian tiệc tối sang trọng, quý phái.'
  },
  {
    id: 10,
    image: '/gallery_terrace.png',
    title: 'Sân Thượng Hoàng Hôn',
    category: 'outdoor',
    description: 'Gạch porcelain chống trơn – Hoàn hảo cho không gian ngoài trời, bền đẹp với thời tiết.'
  },
  {
    id: 11,
    image: '/gallery_shower.png',
    title: 'Phòng Tắm Đứng Tối Giản',
    category: 'bathroom',
    description: 'Gạch đá xám khổ lớn – Phong cách Scandinavian, hốc đèn LED ấm áp.'
  },
  {
    id: 12,
    image: '/gallery_livingroom2.png',
    title: 'Phòng Khách Gạch Xương Cá',
    category: 'living',
    description: 'Gạch giả gỗ xếp herringbone – Ấm cúng, gần gũi thiên nhiên, phù hợp mọi phong cách.'
  },
];

const filters = [
  { key: 'all', label: 'Tất Cả', icon: 'fas fa-th' },
  { key: 'living', label: 'Phòng Khách', icon: 'fas fa-couch' },
  { key: 'bathroom', label: 'Phòng Tắm', icon: 'fas fa-bath' },
  { key: 'kitchen', label: 'Nhà Bếp', icon: 'fas fa-utensils' },
  { key: 'bedroom', label: 'Phòng Ngủ', icon: 'fas fa-bed' },
  { key: 'outdoor', label: 'Ngoại Thất', icon: 'fas fa-tree' },
  { key: 'material', label: 'Vật Liệu', icon: 'fas fa-layer-group' },
];

function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const openLightbox = (item, index) => {
    setLightbox(item);
    setLightboxIndex(index);
  };

  const closeLightbox = () => setLightbox(null);

  const goNext = () => {
    const nextIndex = (lightboxIndex + 1) % filteredItems.length;
    setLightboxIndex(nextIndex);
    setLightbox(filteredItems[nextIndex]);
  };

  const goPrev = () => {
    const prevIndex = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxIndex(prevIndex);
    setLightbox(filteredItems[prevIndex]);
  };

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        {/* Section Header */}
        <div className="gallery-header">
          <span className="section-tag">Cảm hứng thiết kế</span>
          <h2 className="gallery-title">Hình Ảnh Đẹp</h2>
          <p className="gallery-desc">
            Khám phá các không gian sống đẳng cấp được thi công bằng vật liệu cao cấp từ Hưng Long Vĩnh Long.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="gallery-filters">
          {filters.map(f => (
            <button
              key={f.key}
              className={`filter-tab ${activeFilter === f.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              <i className={f.icon}></i>
              {f.label}
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="gallery-counter">
          <span>{filteredItems.length} hình ảnh</span>
        </div>

        {/* Masonry Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`gallery-item ${index === 0 ? 'wide' : ''} ${index === 3 ? 'tall' : ''}`}
              onClick={() => openLightbox(item, index)}
            >
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="gallery-overlay">
                <div className="overlay-content">
                  <span className="overlay-category">{filters.find(f => f.key === item.category)?.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="overlay-icon">
                    <i className="fas fa-search-plus"></i>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <i className="fas fa-times"></i>
            </button>

            {/* Navigation Arrows */}
            <button className="lightbox-nav lightbox-prev" onClick={goPrev}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="lightbox-nav lightbox-next" onClick={goNext}>
              <i className="fas fa-chevron-right"></i>
            </button>

            <img src={lightbox.image} alt={lightbox.title} />
            <div className="lightbox-info">
              <span className="lightbox-category">{filters.find(f => f.key === lightbox.category)?.label}</span>
              <h3>{lightbox.title}</h3>
              <p>{lightbox.description}</p>
              <span className="lightbox-counter">{lightboxIndex + 1} / {filteredItems.length}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;
