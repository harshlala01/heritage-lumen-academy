import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { contentImage, useContent } from '../hooks/useContent';

const DEFAULT_GALLERY = [
  {
    id: 1,
    category: 'TRADITIONS',
    title: 'Annual Valedictory & Commencement Convocation',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 2,
    category: 'ATHLETICS',
    title: 'Morning Crew & Athletics Fellowship',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 3,
    category: 'PERFORMING ARTS',
    title: 'Symphony Rehearsal & Brass Ensemble',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 4,
    category: 'INNOVATION',
    title: 'Genomics & Applied Chemistry Laboratory',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop'
  }
];

export default function PhotoGallery() {
  const [activePhoto, setActivePhoto] = useState(null);
  const rawMoments = useContent('gallery', DEFAULT_GALLERY);

  // Filter out any corrupted test entries like 'xcvbnm'
  const validMoments = (rawMoments && rawMoments.length > 0)
    ? rawMoments.filter(m => m.title && m.title !== 'xcvbnm')
    : [];

  const moments = validMoments.length >= 4 ? validMoments : DEFAULT_GALLERY;

  return (
    <section className="campus-moments-vibrancy-section" id="gallery-moments">
      <div className="container">
        {/* Header */}
        <div className="cm-vibrancy-header">
          <div className="cm-vibrancy-header-left">
            <span className="cm-vibrancy-eyebrow">EXPERIENCE THE VIBRANCY</span>
            <h2 className="cm-vibrancy-heading">Campus Moments &amp; Traditions</h2>
          </div>
          <Link to="/gallery" className="cm-vibrancy-top-link">
            VIEW FULL GALLERY <span className="cm-vibrancy-arrow">→</span>
          </Link>
        </div>

        {/* 2x2 Grid */}
        <div className="cm-vibrancy-2x2-grid">
          {moments.slice(0, 4).map((item, idx) => {
            const fallbackImg = DEFAULT_GALLERY[idx % DEFAULT_GALLERY.length].image;
            const imgSrc = contentImage(item.image_path || item.image || fallbackImg);
            const categoryText = item.category || item.subtitle || 'CAMPUS LIFE';

            return (
              <div
                className="cm-vibrancy-card"
                key={item.id || idx}
                onClick={() => setActivePhoto({ ...item, resolvedImg: imgSrc, categoryText })}
                title={`Inspect ${item.title}`}
              >
                <div className="cm-vibrancy-card-inner">
                  <img
                    src={imgSrc}
                    alt={item.title}
                    className="cm-vibrancy-img"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = fallbackImg;
                    }}
                  />
                  <div className="cm-vibrancy-gradient-overlay">
                    <span className="cm-vibrancy-category">{categoryText}</span>
                    <h3 className="cm-vibrancy-title">{item.title}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="modal-bg active"
          onClick={() => setActivePhoto(null)}
          style={{ cursor: 'zoom-out' }}
        >
          <div
            className="modal-box-card"
            style={{
              maxWidth: '840px',
              padding: '16px',
              background: '#07132B',
              color: '#fff',
              borderRadius: '18px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
              <img
                src={activePhoto.resolvedImg || contentImage(activePhoto.image_path || activePhoto.image)}
                alt={activePhoto.title}
                style={{ maxHeight: '72vh', width: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = DEFAULT_GALLERY[0].image;
                }}
              />
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(7, 19, 43, 0.85)',
                  color: '#D4AF37',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                aria-label="Close photo"
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '16px 8px 8px', textAlign: 'left' }}>
              <span style={{ color: '#D4AF37', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '1px' }}>
                {activePhoto.categoryText || activePhoto.category || activePhoto.subtitle || 'CAMPUS LIFE'}
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: '#FAF7F2', marginTop: '4px', fontSize: '1.35rem' }}>
                {activePhoto.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
