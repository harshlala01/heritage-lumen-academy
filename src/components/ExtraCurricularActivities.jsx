import React from 'react';
import { Link } from 'react-router-dom';
import { contentImage, useContent } from '../hooks/useContent';

export default function ExtraCurricularActivities() {
  const fallbackActivities = [
    {
      id: 1,
      title: 'COMMUNITY OUTREACH',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    },
    {
      id: 2,
      title: 'ANNUAL FEST',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    },
    {
      id: 3,
      title: 'SPORTS DAY',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    },
    {
      id: 4,
      title: 'SCIENCE EXHIBITION',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    },
    {
      id: 5,
      title: 'EXHIBITION AND BOOK FAIR',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    },
    {
      id: 6,
      title: 'CULTURAL FEST',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    },
    {
      id: 7,
      title: 'DEBATE COMPETITION',
      image: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    },
    {
      id: 8,
      title: 'MUSIC & DANCE PERFORMANCE',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
      link: '/activities'
    }
  ];
  const activities = useContent('activities', fallbackActivities);

  // Duplicate the array for a seamless infinite marquee
  const duplicatedActivities = [...activities, ...activities];

  return (
    <section className="extra-curricular-side-section">
      <div className="ec-side-container">
        {/* Left Column: Fixed Text Box */}
        <div className="ec-side-text-col">
          <span className="ec-side-tag">ACTIVITIES</span>
          <h2 className="ec-side-title">Extra Curricular</h2>
          <p className="ec-side-desc">
            The school has a wide range of co-curricular and extra curricular activities in the entire academic session, enabling students to explore passions outside traditional academics.
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





