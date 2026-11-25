import React from 'react';
import { Link } from 'react-router-dom';
import { contentImage, useContent } from '../hooks/useContent';

export default function ExtraCurricularActivities() {
  const fallbackActivities = [
    {
      id: 1,
      title: 'DANCE',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    },
    {
      id: 2,
      title: 'DRAWING',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    },
    {
      id: 3,
      title: 'FOOTBALL',
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    },
    {
      id: 4,
      title: 'VOLLEY BALL',
      image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    },
    {
      id: 5,
      title: 'CRICKET',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    }
  ];
  const fetchedActivities = useContent('activities', fallbackActivities);
  const activities = fetchedActivities && fetchedActivities.length > 0 ? fetchedActivities : fallbackActivities;

  // Duplicate the array for a seamless infinite marquee
  const duplicatedActivities = [...activities, ...activities];

  return (
    <section className="extra-curricular-side-section">
      <div className="ec-side-container">
        {/* Left Column: Fixed Text Box */}
        <div className="ec-side-text-col">
          <span className="ec-side-tag">ACTIVITIES</span>
          <h2 className="ec-side-title">Extra Curricular Activities</h2>
          <p className="ec-side-desc">
            The school provides structured coaching in Dance, Drawing, Football, Volley Ball, and Cricket, enabling students to explore passions outside traditional academics.
          </p>
          <Link to="/activities" className="btn-ec-view-details">
            VIEW DETAILS
          </Link>
        </div>

        {/* Right Column: Sliding Horizontal Carousel */}
        <div className="ec-side-carousel-col">
          <div className="ec-side-marquee-track">
            {duplicatedActivities.map((item, idx) => (
              <Link
                to={item.link || '/activities'}
                key={`${item.id}-${idx}`}
                className="ec-side-card"
                title={`Explore ${item.title}`}
              >
                <div className="ec-side-card-inner">
                  <img
                    src={contentImage(item.image_path || item.image)}
                    alt={item.title}
                    className="ec-side-img"
                    loading="lazy"
                  />
                  {/* Top-Right Yellow/Gold READ Badge */}
                  <div className="ec-side-read-pill">
                    READ
                  </div>
                  {/* Bottom Dark Gradient with White Title */}
                  <div className="ec-side-caption-overlay">
                    <h3 className="ec-side-card-title">{item.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}





