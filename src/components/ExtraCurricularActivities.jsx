import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ExtraCurricularActivities() {
  const viewportRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [cardStep, setCardStep] = useState(280);

  // Drag / Swipe states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const activities = [
    {
      id: 1,
      title: 'Exhibition And Book Fair',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    },
    {
      id: 2,
      title: 'Community Outreach',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    },
    {
      id: 3,
      title: 'Annual Function',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    },
    {
      id: 4,
      title: 'Fancy Dress Competition',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    },
    {
      id: 5,
      title: 'Various Days Observed In School',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    },
    {
      id: 6,
      title: 'Inter-School Sports Meet',
      image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    },
    {
      id: 7,
      title: 'Science & Robotics Conclave',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    },
    {
      id: 8,
      title: 'Art, Craft & Creative Workshop',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    }
  ];

  // Calculate visible cards count and dynamic card step width on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (viewportRef.current) {
        const width = viewportRef.current.offsetWidth;
        const step = width < 640 ? 236 : 280; // card width + gap
        setCardStep(step);
        const count = Math.max(1, Math.floor(width / step));
        setVisibleCount(count);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const maxIndex = Math.max(0, activities.length - visibleCount);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -50) {
      handleNext();
    } else if (dragOffset > 50) {
      handlePrev();
    }
    setDragOffset(0);
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -50) {
      handleNext();
    } else if (dragOffset > 50) {
      handlePrev();
    }
    setDragOffset(0);
  };

  const translateX = currentIndex * cardStep - dragOffset;

  return (
    <section className="extra-curricular-section">
      <div className="container">
        <div className="extra-curricular-grid">
          {/* Left Column: Descriptive Text matching screenshot */}
          <div className="ec-text-box">
            <div className="ec-sub">Activities</div>
            <h2 className="ec-title">Extra Curricular</h2>
            <p>
              The school has a wide range of co-curricular and extra curricular activities
              in the entire academic session.
            </p>
            <Link to="/activities" className="btn-ec-view">
              VIEW DETAILS
            </Link>
          </div>

          {/* Right Column: Sliding Activity Cards with Animated Transform */}
          <div className="ec-slider-container">
            {/* Viewport Mask */}
            <div
              className="ec-cards-viewport"
              ref={viewportRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => {
                if (isDragging) {
                  setIsDragging(false);
                  setDragOffset(0);
                }
              }}
            >
              {/* Smooth Animated Transform Track */}
              <div
                className="ec-cards-track"
                style={{
                  transform: `translateX(-${translateX}px)`,
                  transition: isDragging ? 'none' : 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
              >
                {activities.map((item, index) => (
                  <Link
                    to={item.link}
                    className="ec-card"
                    key={item.id}
                    onClick={(e) => {
                      if (Math.abs(dragOffset) > 10) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop';
                      }}
                    />
                    <div className="ec-card-gradient">
                      <h3 className="ec-card-title">{item.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Exactly two round buttons at the bottom right matching screenshot */}
            <div className="ec-nav-bottom-row">
              <button
                className="ec-circle-nav-btn outline"
                onClick={handlePrev}
                aria-label="Previous activities"
                title="Previous"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button
                className="ec-circle-nav-btn solid"
                onClick={handleNext}
                aria-label="Next activities"
                title="Next"
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



