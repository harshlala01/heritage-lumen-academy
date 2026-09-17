import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
  return (
    <section className="about-custom-section" id="about">
      <div className="container">
        <div className="about-custom-grid">
          {/* Left Column: Narrative Content */}
          <div>
            <div className="about-sub-header">
              Welcome to Heritage Lumen Preparatory Academy
            </div>
            <h2 className="about-headline">About Us</h2>

            <div className="about-custom-text">
              <p style={{ marginBottom: '16px' }}>
                With the advancement of human civilization, education has evolved into an indispensable
                foundation that enriches life with intellectual depth, moral integrity, and purposeful discovery.
                At Heritage Lumen Preparatory Academy, learning is celebrated not as mere instructional routine,
                but as the holistic awakening of young minds towards thoughtful global leadership.
              </p>
              <p>
                Our pedagogy thoughtfully bridges time-honored ethical principles with modern empirical science.
                In an increasingly interconnected world, developing linguistic mastery, analytical clarity, and
                unwavering ethical discernment ensures that our scholars rise above standard examinations to
                create meaningful contributions to society.
              </p>
            </div>

            {/* Callout Highlight Quote Box */}
            <div className="about-callout-quote-box">
              We began our journey in <strong>2003</strong> with <strong>14 scholars</strong> in an intimate
              campus facility, anchored by an enduring promise of excellence.
            </div>

            {/* Read More Action Button */}
            <Link to="/about/foundation" className="btn-about-readmore">
              READ MORE <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.75rem' }}></i>
            </Link>
          </div>

          {/* Right Column: Composite Circular Artwork */}
          <div className="about-image-composition">
            {/* Subtle decorative background ring */}
            <div className="about-deco-ring" />

            {/* Main Circular Campus Facade Image */}
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=900&auto=format&fit=crop"
              alt="Heritage Lumen Academy Campus Facade"
              className="about-main-circle-img"
            />

            {/* Overlapping Secondary Circular Image (Engaged Young Scholars) */}
            <img
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop"
              alt="Joyful Scholars in Class"
              className="about-sub-circle-img"
            />

            {/* Organic Floating Journey Badge */}
            <div className="about-journey-badge">
              <span>We started our journey in</span>
              <h3>2003</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
