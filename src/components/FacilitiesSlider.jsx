import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { contentImage, useContent } from '../hooks/useContent';
import AutoImageCarousel from './AutoImageCarousel';

const SCIENCE_LAB_IMAGES = [
  'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop'
];

export default function FacilitiesSlider() {
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const fallbackFacilities = [
    {
      id: 1,
      name: 'SPACIOUS CLASSROOMS',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop',
      link: '/facilities'
    },
    {
      id: 2,
      name: 'SMART CLASS',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
      link: '/facilities'
    },
    {
      id: 3,
      name: 'LIBRARY',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop',
      link: '/facilities'
    },
    {
      id: 4,
      name: 'SCIENCE & STEM LABS',
      image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800&auto=format&fit=crop',
      images: SCIENCE_LAB_IMAGES,
      link: '/facilities'
    },
    {
      id: 5,
      name: 'COMPUTER LAB',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
      link: '/facilities'
    },
    {
      id: 6,
      name: 'SPORTS ARENA',
      image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=800&auto=format&fit=crop',
      link: '/facilities'
    },
    {
      id: 7,
      name: 'PERFORMING ARTS HALL',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
      link: '/facilities'
    }
  ];

  const facilities = useContent('facilities', fallbackFacilities);

  const scroll = (direction) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const card = track.querySelector('.facility-slide-card');
    const scrollAmount = card ? card.offsetWidth + 24 : 360;

    if (direction === 'left') {
      if (track.scrollLeft <= 10) {
        track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    } else {
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Auto-scroll cards left-to-right every interval
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      scroll('right');
    }, 1500);

    return () => clearInterval(timer);
  }, [isPaused, facilities]);

  return (
    <section className="facilities-slider-section">
      <div className="container">
        <div className="facilities-slider-header">
          <div className="facilities-slider-sub">Facilities</div>
          <h2 className="facilities-slider-title">
            We offer various facilities to our students
          </h2>
        </div>

        <div
          className="facilities-carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="facilities-cards-track" ref={trackRef}>
            {facilities.map((fac) => {
              const label = fac.title || fac.name || '';
              const isScienceLab =
                fac.id === 4 ||
                label.toUpperCase().includes('SCIENCE') ||
                label.toUpperCase().includes('STEM');

              const carouselImages =
                fac.images && fac.images.length > 0
                  ? fac.images
                  : isScienceLab
                  ? SCIENCE_LAB_IMAGES
                  : null;

              return (
                <Link to={fac.link || '/facilities'} className="facility-slide-card" key={fac.id}>
                  <div className="facility-card-image-box">
                    {carouselImages ? (
                      <AutoImageCarousel
                        images={carouselImages}
                        alt={label}
                        interval={1000}
                      />
                    ) : (
                      <img
                        src={contentImage(fac.image_path || fac.image)}
                        alt={label}
                      />
                    )}
                  </div>
                  <div className="facility-card-bottom-bar">
                    <span className="facility-card-label">{label}</span>
                    <div className="facility-card-circle-btn">
                      <i className="fa-solid fa-arrow-right"></i>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="facilities-nav-controls">
            <button
              onClick={() => scroll('left')}
              className="facility-nav-arrow-btn"
              aria-label="Scroll left"
              title="Previous facilities"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button
              onClick={() => scroll('right')}
              className="facility-nav-arrow-btn"
              aria-label="Scroll right"
              title="Next facilities"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}