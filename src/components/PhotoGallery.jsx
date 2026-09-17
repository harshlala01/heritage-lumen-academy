import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { academyData } from '../data/academyData';

export default function PhotoGallery() {
  const { gallery } = academyData;
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <section className="gallery-wrap">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="section-label">EXPERIENCE THE VIBRANCY</span>
            <h2 className="main-heading" style={{ marginBottom: 0 }}>
              Campus Moments & Traditions
            </h2>
          </div>
          <Link to="/gallery" className="feat-link" title="Open Full Photo Gallery">
            View Full Gallery <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>

        <div className="bento-grid">
          {gallery.map((item) => (
            <div
              className={`bento-cell ${item.spanClass}`}
              key={item.id}
              onClick={() => setActivePhoto(item)}
              style={{ cursor: 'pointer' }}
              title="Click to view full photo"
            >
              <img src={item.image} alt={item.title} />
              <div className="bento-caption">
                <span>{item.category}</span>
                <h5>{item.title}</h5>
              </div>
            </div>
          ))}
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
            style={{ maxWidth: '780px', padding: '16px', background: '#0B1B3D', color: '#fff' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative' }}>
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                style={{ borderRadius: '8px', maxHeight: '70vh', width: '100%', objectFit: 'cover' }}
              />
              <button
                onClick={() => setActivePhoto(null)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(7, 19, 43, 0.7)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Close photo"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div style={{ padding: '16px 8px 8px', textAlign: 'left' }}>
              <span className="section-label" style={{ color: 'var(--gold-light)' }}>
                {activePhoto.category}
              </span>
              <h4 style={{ fontFamily: 'var(--font-serif)', color: '#fff', marginTop: '4px' }}>
                {activePhoto.title}
              </h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
