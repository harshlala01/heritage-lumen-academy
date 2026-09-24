import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = 'http://localhost:5000';

export default function PhotoGallery() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch live gallery items across all albums from backend
    fetch(`${API_BASE}/api/gallery/all`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.slice(0, 4).map((item) => ({
            id: item.id,
            category: (item.album_title || item.album_slug || 'MOMENTS').toUpperCase(),
            title: item.title || 'Campus Moment',
            image: item.media_url.startsWith('http')
              ? item.media_url
              : `${API_BASE}${item.media_url}`
          }));
          setMoments(formatted);
          setLoading(false);
        } else {
          // Check /api/content/gallery
          fetch(`${API_BASE}/api/content/gallery`)
            .then((r) => (r.ok ? r.json() : []))
            .then((cData) => {
              if (Array.isArray(cData) && cData.length > 0) {
                const formatted = cData.slice(0, 4).map((item) => ({
                  id: item.id,
                  category: (item.subtitle || 'CAMPUS').toUpperCase(),
                  title: item.title,
                  image: item.image_path.startsWith('http')
                    ? item.image_path
                    : `${API_BASE}${item.image_path}`
                }));
                setMoments(formatted);
              } else {
                setMoments([]); // Completely empty when user deleted all photos!
              }
              setLoading(false);
            })
            .catch(() => {
              setMoments([]);
              setLoading(false);
            });
        }
      })
      .catch(() => {
        setMoments([]);
        setLoading(false);
      });
  }, []);

  return (
    <section className="campus-moments-vibrancy-section">
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

        {/* Dynamic Photo Grid or Clean Empty State */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: '#64748B' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '24px', color: '#D4AF37', marginBottom: '10px' }}></i>
            <p style={{ margin: 0, fontSize: '0.92rem' }}>Loading campus moments...</p>
          </div>
        ) : moments.length > 0 ? (
          <div className="cm-vibrancy-2x2-grid">
            {moments.map((item) => (
              <div
                className="cm-vibrancy-card"
                key={item.id}
                onClick={() => setActivePhoto(item)}
                title={`Inspect ${item.title}`}
              >
                <div className="cm-vibrancy-card-inner">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="cm-vibrancy-img"
                    loading="lazy"
                  />
                  <div className="cm-vibrancy-gradient-overlay">
                    <span className="cm-vibrancy-category">{item.category}</span>
                    <h3 className="cm-vibrancy-title">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 24px',
            background: '#FAF7F2',
            borderRadius: '16px',
            border: '1.5px dashed rgba(212, 175, 55, 0.45)',
            margin: '20px 0'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#FAF5EA',
              border: '1.5px solid #D4AF37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: '#D4AF37',
              fontSize: '24px'
            }}>
              <i className="fa-regular fa-images"></i>
            </div>
            <h4 style={{ color: '#0B1B3D', fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
              No Photographs Published Yet
            </h4>
            <p style={{ color: '#64748B', fontSize: '0.95rem', maxWidth: '460px', margin: '0 auto', lineHeight: 1.6 }}>
              Photographs of campus events and student activities will be published here soon.
            </p>
          </div>
        )}
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
            style={{ maxWidth: '840px', padding: '16px', background: '#07132B', color: '#fff', borderRadius: '18px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                style={{ maxHeight: '72vh', width: '100%', objectFit: 'cover' }}
              />
              <button
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
                  justifyContent: 'center'
                }}
                aria-label="Close photo"
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '16px 8px 8px', textAlign: 'left' }}>
              <span style={{ color: '#D4AF37', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '1px' }}>
                {activePhoto.category}
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
