import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageBanner from '../components/PageBanner';

const API_BASE = 'http://localhost:5000';

export default function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const albumParam = searchParams.get('album');

  const [albums, setAlbums] = useState([]);
  const [albumsLoading, setAlbumsLoading] = useState(true);
  const [selectedAlbumSlug, setSelectedAlbumSlug] = useState(albumParam || null);
  const [liveAlbumItems, setLiveAlbumItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Sync state with URL parameter if present
  useEffect(() => {
    if (albumParam) {
      setSelectedAlbumSlug(albumParam);
    } else {
      setSelectedAlbumSlug(null);
    }
  }, [albumParam]);

  // Load all albums dynamically from backend
  const loadAlbums = () => {
    setAlbumsLoading(true);
    fetch(`${API_BASE}/api/gallery/albums`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) {
          setAlbums(data);
        } else {
          setAlbums([]);
        }
        setAlbumsLoading(false);
      })
      .catch(() => {
        setAlbums([]);
        setAlbumsLoading(false);
      });
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  const currentAlbum = albums.find((a) => a.slug === selectedAlbumSlug);

  // Load live items for the selected album
  useEffect(() => {
    if (!selectedAlbumSlug) {
      setLiveAlbumItems([]);
      return;
    }
    setItemsLoading(true);
    fetch(`${API_BASE}/api/gallery/items/${selectedAlbumSlug}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item) => ({
            id: `live_${item.id}`,
            title: item.title || currentAlbum?.title || 'Heritage Day School',
            image: item.media_url.startsWith('http')
              ? item.media_url
              : `${API_BASE}${item.media_url}`,
            itemType: item.item_type,
            mediaUrl: item.media_url
          }));
          setLiveAlbumItems(formatted);
        } else {
          setLiveAlbumItems([]);
        }
        setItemsLoading(false);
      })
      .catch(() => {
        setLiveAlbumItems([]);
        setItemsLoading(false);
      });
  }, [selectedAlbumSlug, currentAlbum?.title]);

  const openAlbum = (slug) => {
    setSelectedAlbumSlug(slug);
    setSearchParams({ album: slug });
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const closeAlbum = () => {
    setSelectedAlbumSlug(null);
    setSearchParams({});
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  // Lightbox handlers for current album
  const currentPhotos = liveAlbumItems;
  const activeLightboxPhoto = lightboxIndex !== null ? currentPhotos[lightboxIndex] : null;

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev > 0 ? prev - 1 : currentPhotos.length - 1));
    }
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev < currentPhotos.length - 1 ? prev + 1 : 0));
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev > 0 ? prev - 1 : currentPhotos.length - 1));
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev < currentPhotos.length - 1 ? prev + 1 : 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, currentPhotos.length]);

  return (
    <div>
      <PageBanner
        title="Campus Photo Gallery"
        subtitle={
          currentAlbum
            ? `Viewing Collection: ${currentAlbum.title}`
            : 'Visual chronicles of campus life, academic excellence, pre-primary wonder, and cherished school traditions.'
        }
        breadcrumbs={
          currentAlbum
            ? [{ label: 'Gallery', link: '/gallery' }, { label: currentAlbum.title }]
            : [{ label: 'Gallery' }]
        }
      />

      <section className="subpage-content-wrap">
        <div className="container">
          {/* VIEW 1: ALBUM SECTIONS GRID (When no album is selected) */}
          {!currentAlbum && (
            <div>
              <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 35px' }}>
                <span className="section-label">CHRONICLES &amp; MEMORIES</span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: '#0B1B3D', margin: '6px 0 12px' }}>
                  Photo Albums &amp; Sections
                </h2>
                <p style={{ color: '#57534E', fontSize: '1rem', lineHeight: '1.6' }}>
                  Click on any section card below to open and explore the photo collection for that category.
                </p>
              </div>

              {albumsLoading ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748B' }}>
                  <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '28px', color: '#D4AF37', marginBottom: '12px' }}></i>
                  <p style={{ margin: 0, fontSize: '0.95rem' }}>Loading photo albums...</p>
                </div>
              ) : albums.length > 0 ? (
                <div className="gallery-albums-grid">
                  {albums.map((album) => {
                    const coverUrl = album.cover_image
                      ? (album.cover_image.startsWith('http') ? album.cover_image : `${API_BASE}${album.cover_image}`)
                      : null;

                    return (
                      <div
                        key={album.id || album.slug}
                        className="gallery-album-card"
                        onClick={() => openAlbum(album.slug)}
                        title={`Click to open ${album.title} photos`}
                      >
                        {coverUrl ? (
                          <img
                            src={coverUrl}
                            alt={album.title}
                            className="gallery-album-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div style={{
                            height: '240px',
                            background: 'linear-gradient(135deg, #0B1B3D 0%, #162C5B 100%)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px',
                            textAlign: 'center',
                            position: 'relative'
                          }}>
                            <div style={{
                              width: '56px',
                              height: '56px',
                              borderRadius: '50%',
                              background: 'rgba(212, 175, 55, 0.15)',
                              border: '1.5px solid #D4AF37',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginBottom: '12px',
                              color: '#D4AF37',
                              fontSize: '22px'
                            }}>
                              <i className="fa-regular fa-images"></i>
                            </div>
                            <span style={{ color: '#D4AF37', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                              {album.item_count > 0 ? `${album.item_count} Photographs` : 'Album Ready'}
                            </span>
                          </div>
                        )}

                        <div className="gallery-album-badge">
                          <i className="fa-solid fa-images" style={{ marginRight: '6px' }}></i>
                          {album.item_count || 0} {album.item_count === 1 ? 'Photo' : 'Photos'}
                        </div>

                        {/* Golden/navy bottom overlay */}
                        <div className="gallery-album-overlay">
                          <h3 className="gallery-album-title">{album.title}</h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '70px 24px',
                  background: '#FAF7F2',
                  borderRadius: '20px',
                  border: '1.5px dashed rgba(212, 175, 55, 0.45)',
                  margin: '30px auto',
                  maxWidth: '680px'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#FAF5EA',
                    border: '1.5px solid #D4AF37',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 18px',
                    color: '#D4AF37',
                    fontSize: '26px'
                  }}>
                    <i className="fa-regular fa-images"></i>
                  </div>
                  <h3 style={{ color: '#0B1B3D', fontSize: '1.4rem', fontWeight: 700, marginBottom: '10px' }}>
                    No Photographs Published Yet
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '0.98rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
                    Official school photo albums and campus moments will be published here soon.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* VIEW 2: INSIDE SELECTED ALBUM PHOTOS */}
          {currentAlbum && (
            <div>
              {/* Back to Albums Bar */}
              <div className="gallery-back-bar">
                <button className="btn-back-to-albums" onClick={closeAlbum}>
                  <i className="fa-solid fa-arrow-left"></i> Back to All Albums
                </button>
                <div className="gallery-section-heading">
                  <h2>{currentAlbum.title}</h2>
                  <p>{currentAlbum.description}</p>
                </div>
                <div style={{ fontWeight: '700', color: '#0B1B3D', fontSize: '0.95rem' }}>
                  <i className="fa-solid fa-camera" style={{ marginRight: '6px', color: '#D4AF37' }}></i>
                  {currentPhotos.length} {currentPhotos.length === 1 ? 'Photograph' : 'Photographs'}
                </div>
              </div>

              {/* Photos Grid for this Album */}
              {itemsLoading ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748B' }}>
                  <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '28px', color: '#D4AF37', marginBottom: '12px' }}></i>
                  <p style={{ margin: 0, fontSize: '0.95rem' }}>Loading photographs...</p>
                </div>
              ) : currentPhotos.length > 0 ? (
                <div className="gallery-photos-grid">
                  {currentPhotos.map((photo, idx) => (
                    <div
                      key={photo.id || idx}
                      className="gallery-photo-item"
                      onClick={() => setLightboxIndex(idx)}
                      title="Click to view full photo"
                    >
                      <img src={photo.image} alt={photo.title} loading="lazy" />
                      <div className="gallery-photo-caption">
                        <h5>{photo.title}</h5>
                        <span style={{ fontSize: '0.75rem', color: '#FBBF24', marginTop: '4px' }}>
                          Click to enlarge <i className="fa-solid fa-expand" style={{ marginLeft: '4px' }}></i>
                        </span>
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
                  border: '1.5px dashed rgba(212, 175, 55, 0.4)',
                  margin: '30px 0'
                }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#FAF5EA',
                    border: '1px solid #D4AF37',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: '#D4AF37',
                    fontSize: '22px'
                  }}>
                    <i className="fa-regular fa-images"></i>
                  </div>
                  <h4 style={{ color: '#0B1B3D', fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                    No Photographs in this Album Yet
                  </h4>
                  <p style={{ color: '#64748B', fontSize: '0.92rem', maxWidth: '460px', margin: '0 auto', lineHeight: 1.5 }}>
                    Photographs for this section will be published soon.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal with Next / Prev Navigation */}
      {activeLightboxPhoto && (
        <div
          className="modal-bg active"
          onClick={() => setLightboxIndex(null)}
          style={{ cursor: 'zoom-out' }}
        >
          <div
            className="modal-box-card"
            style={{
              maxWidth: '860px',
              padding: '18px',
              background: '#0B1B3D',
              color: '#ffffff',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container */}
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '10px' }}>
              <img
                src={activeLightboxPhoto.image}
                alt={activeLightboxPhoto.title}
                style={{
                  width: '100%',
                  maxHeight: '74vh',
                  objectFit: 'contain',
                  background: '#07132B'
                }}
              />

              {/* Previous / Next Arrow Controls */}
              <div className="lightbox-controls">
                <button
                  className="lightbox-arrow-btn"
                  onClick={handlePrevPhoto}
                  title="Previous (Left Arrow)"
                  aria-label="Previous photo"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button
                  className="lightbox-arrow-btn"
                  onClick={handleNextPhoto}
                  title="Next (Right Arrow)"
                  aria-label="Next photo"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: '#DC2626',
                  color: '#ffffff',
                  border: '2px solid #ffffff',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                  zIndex: 10
                }}
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Bottom Caption & Counter */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 6px 4px',
                flexWrap: 'wrap',
                gap: '8px'
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: '#FBBF24',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}
                >
                  {currentAlbum ? currentAlbum.title : 'Gallery'}
                </span>
                <h4 style={{ fontFamily: 'var(--font-serif)', color: '#ffffff', margin: '2px 0 0' }}>
                  {activeLightboxPhoto.title}
                </h4>
              </div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', fontWeight: '600' }}>
                Photo {lightboxIndex + 1} of {currentPhotos.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
