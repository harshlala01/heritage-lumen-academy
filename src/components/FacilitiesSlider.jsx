import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { contentImage, useContent } from '../hooks/useContent';

export default function FacilitiesSlider() {
  const trackRef = useRef(null);

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
    if (trackRef.current) {
      const scrollAmount = 360;
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="facilities-slider-section">
      <div className="container">
        {/* Header matching 2nd screenshot */}
        <div className="facilities-slider-header">
          <div className="facilities-slider-sub">Facilities</div>
          <h2 className="facilities-slider-title">
            We offer various facilities to our students
          </h2>
        </div>

        {/* Carousel Wrapper */}
        <div className="facilities-carousel-wrapper">
          <div className="facilities-cards-track" ref={trackRef}>
            {facilities.map((fac) => (
              <Link to={fac.link} className="facility-slide-card" key={fac.id}>
                <div className="facility-card-image-box">
                  <img src={contentImage(fac.image_path || fac.image)} alt={fac.title || fac.name} />
                </div>
                <div className="facility-card-bottom-bar">
                  <span className="facility-card-label">{fac.title || fac.name}</span>
                  <div className="facility-card-circle-btn">
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Underneath Scroller Arrows matching 2nd screenshot */}
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
