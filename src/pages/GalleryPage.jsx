import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageBanner from '../components/PageBanner';

export default function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const albumParam = searchParams.get('album');

  const [selectedAlbumId, setSelectedAlbumId] = useState(albumParam || null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Sync state with URL parameter if present
  useEffect(() => {
    if (albumParam) {
      setSelectedAlbumId(albumParam);
    } else {
      setSelectedAlbumId(null);
    }
  }, [albumParam]);

  const albums = [
    {
      id: 'campus',
      title: 'Campus',
      cover: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop',
      description: 'Explore our state-of-the-art academic architecture, expansive courtyards, smart facilities, and lush sports grounds.',
      photos: [
        {
          id: 1,
          title: 'Main Academic Block & Heritage Quadrangle',
          image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 2,
          title: 'Historic Central Library & Digital Research Wing',
          image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 3,
          title: 'Modern Science & Innovation Wing',
          image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 4,
          title: 'Olympic-Standard Heated Aquatic Center',
          image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 5,
          title: 'St. Jude’s Lawn & Open-Air Courtyard',
          image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 6,
          title: 'Auditorium & Performing Arts Complex',
          image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop'
        }
      ]
    },
    {
      id: 'pre-primary',
      title: 'Pre-Primary Activities',
      cover: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop',
      description: 'Joyful snapshots of early childhood wonder, playful learning, fancy dress festivals, and foundational activities.',
      photos: [
        {
          id: 1,
          title: 'Tiny Tots Eco-Green & Nature Day Celebration',
          image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 2,
          title: 'Kindergarten Fancy Dress Carnival Parade',
          image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 3,
          title: 'Sensory Playroom & Montessori Learning Toys',
          image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 4,
          title: 'Clay Modeling & Finger Painting Workshop',
          image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 5,
          title: 'Junior Sports Day & Fun Obstacle Races',
          image: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 6,
          title: 'Storytelling Circle & Puppet Theater Hour',
          image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop'
        }
      ]
    },
    {
      id: 'achievements',
      title: 'Achievements',
      cover: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop',
      description: 'Honoring our academic toppers, board merit lists, scholarship winners, and state championship honors.',
      photos: [
        {
          id: 1,
          title: 'CISCE Class X & XII All-India Rankers Felicitation',
          image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 2,
          title: 'National Robotics Olympiad Gold Laurels',
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 3,
          title: 'State Inter-School Championship Debate Trophy',
          image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 4,
          title: 'Regional Swimming Meet Medals & Honors',
          image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 5,
          title: 'Governor’s Green Award for Campus Eco-Initiative',
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 6,
          title: 'Academic Excellence Annual Scholarship Awards',
          image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop'
        }
      ]
    },
    {
      id: 'investiture',
      title: 'Events & Investiture',
      cover: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop',
      description: 'The induction of the Student Prefectorial Board, house color traditions, and solemn school assemblies.',
      photos: [
        {
          id: 1,
          title: 'House Captains & Student Council Flag Ceremony',
          image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 2,
          title: 'Head Boy & Head Girl Oath of Office',
          image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 3,
          title: 'Inter-House March Past & Grand Parade',
          image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 4,
          title: 'Founder’s Memorial Day Floral Homage',
          image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 5,
          title: 'Independence Day National Flag Hoisting Ceremony',
          image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 6,
          title: 'Valedictory Commencement & Sash Presentation',
          image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop'
        }
      ]
    },
    {
      id: 'annual-function',
      title: 'Annual Function & Celebrations',
      cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop',
      description: 'Spectacular nights of theater, choir, musical ensembles, and festive illuminations across the campus.',
      photos: [
        {
          id: 1,
          title: 'Night Illumination & Festive Campus Fair',
          image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 2,
          title: 'Symphony Orchestra & Classical Fusion Choir',
          image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 3,
          title: 'Senior Dance Troupe Theatrical Performance',
          image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 4,
          title: 'English Shakespearean Drama Onstage',
          image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 5,
          title: 'Christmas Tree Lighting & Carolers Evening',
          image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 6,
          title: 'Grand Finale Confetti & School Anthem Chorus',
          image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop'
        }
      ]
    },
    {
      id: 'excursions',
      title: 'Excursions & Outreach',
      cover: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1000&auto=format&fit=crop',
      description: 'Educational expeditions, heritage walks, nature camps, and community health awareness rallies.',
      photos: [
        {
          id: 1,
          title: 'Public Health & Dengue Awareness Street Rally',
          image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 2,
          title: 'Heritage Archaeological Site & Historical Study Tour',
          image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 3,
          title: 'Science Center & Planetary Space Observatory Visit',
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 4,
          title: 'Eco-Club Botanical Reserve Nature Trail',
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 5,
          title: 'Blood Donation & Community Health Checkup Camp',
          image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop'
        },
        {
          id: 6,
          title: 'Rural Education Outreach & Book Distribution Drive',
          image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop'
        }
      ]
    }
  ];

  const currentAlbum = albums.find((a) => a.id === selectedAlbumId);

  const openAlbum = (albumId) => {
    setSelectedAlbumId(albumId);
    setSearchParams({ album: albumId });
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const closeAlbum = () => {
    setSelectedAlbumId(null);
    setSearchParams({});
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  // Lightbox handlers for current album
  const currentPhotos = currentAlbum ? currentAlbum.photos : [];
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
                <span className="section-label">CHRONICLES & MEMORIES</span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: '#7C2D12', margin: '6px 0 12px' }}>
                  Photo Albums & Sections
                </h2>
                <p style={{ color: '#57534E', fontSize: '1rem', lineHeight: '1.6' }}>
                  Click on any section card below to open and explore the high-resolution photo collection for that category.
                </p>
              </div>

              {/* Grid of Section Cards matching screenshot */}
              <div className="gallery-albums-grid">
                {albums.map((album) => (
                  <div
                    key={album.id}
                    className="gallery-album-card"
                    onClick={() => openAlbum(album.id)}
                    title={`Click to open ${album.title} photos`}
                  >
                    <img
                      src={album.cover}
                      alt={album.title}
                      className="gallery-album-cover"
                      loading="lazy"
                    />
                    <div className="gallery-album-badge">
                      <i className="fa-solid fa-images" style={{ marginRight: '6px' }}></i>
                      {album.photos.length} Photos
                    </div>
                    {/* Golden/warm bottom overlay matching screenshot */}
                    <div className="gallery-album-overlay">
                      <h3 className="gallery-album-title">{album.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
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
                <div style={{ fontWeight: '700', color: '#7C2D12', fontSize: '0.95rem' }}>
                  <i className="fa-solid fa-camera" style={{ marginRight: '6px' }}></i>
                  {currentAlbum.photos.length} Photographs
                </div>
              </div>

              {/* Photos Grid for this Album */}
              <div className="gallery-photos-grid">
                {currentAlbum.photos.map((photo, idx) => (
                  <div
                    key={photo.id}
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

