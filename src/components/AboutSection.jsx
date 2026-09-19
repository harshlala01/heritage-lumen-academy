import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [yearCount, setYearCount] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Intersection observer for section entry
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2003 Count up animation (Duration: 2 seconds, ease-out)
  useEffect(() => {
    if (!inView) return;

    let startTime = null;
    const duration = 2000; // 2 seconds
    const targetYear = 2018;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutCubic(progress);

      setYearCount(Math.round(easedProgress * targetYear));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    const frameId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(frameId);
  }, [inView]);

  // Subtle parallax effect on mouse hover over right side
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 15, y: y * 15 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section ref={sectionRef} className="about-heritage-section" id="about">
      {/* Paper texture overlay */}
      <div className="about-paper-texture-overlay"></div>

      <div className="container about-heritage-container">
        <div className="about-heritage-grid">
          {/* Left Column: Narrative Content with Drop Cap Heading & Paragraph Reveals */}
          <div className={`about-heritage-left ${inView ? 'revealed' : ''}`}>
            <div className="about-badge-tagline">
              <span className="tagline-ornament">❖</span>
              <span>THE HERITAGE & PEDAGOGY</span>
              <span className="tagline-ornament">❖</span>
            </div>

            <h2 className="about-heritage-headline">
              <span className="about-dropcap-letter">A</span>bout Us
            </h2>

            <div className="about-paragraph-stack">
              <p className="about-paragraph para-1">
                With the advancement of human civilization, education has evolved into an indispensable
                foundation that enriches life with intellectual depth, moral integrity, and purposeful discovery.
                At Heritage Lumen Preparatory Academy, learning is celebrated not as mere instructional routine,
                but as the holistic awakening of young minds towards thoughtful global leadership.
              </p>

              <p className="about-paragraph para-2">
                Our pedagogy thoughtfully bridges time-honored ethical principles with modern empirical science.
                In an increasingly interconnected world, developing linguistic mastery, analytical clarity, and
                unwavering ethical discernment ensures that our scholars rise above standard examinations to
                create meaningful contributions to society.
              </p>

              <p className="about-paragraph para-3">
                Guided by visionary educators, bespoke Harkness discussions, and state-of-the-art research laboratories,
                we cultivate scholars who excel in world-class universities and lead with empathy, humility, and courage.
              </p>
            </div>

            {/* Enduring Quote Box */}
            <div className="about-quote-card">
              <div className="quote-icon-gold">“</div>
              <p>
                We began our journey in <strong>2003</strong> with <strong>14 scholars</strong> in an intimate
                campus facility, anchored by an enduring promise of excellence and enlightenment.
              </p>
            </div>

            {/* Read More Button */}
            <div className="about-cta-action">
              <Link to="/about/foundation" className="btn-about-readmore">
                <span>READ MORE ABOUT OUR FOUNDATION</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>

          {/* Right Column: Circular Images of Students in Artistic Arrangement with subtle parallax */}
          <div
            className="about-heritage-right"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="about-composition-canvas"
              style={{
                transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
              }}
            >
              {/* Decorative Geometric Rings */}
              <div className="composition-ring ring-outer"></div>
              <div className="composition-ring ring-inner"></div>

              {/* Main Circular Campus Facade Image */}
              <div className="about-circle-frame frame-main">
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=900&auto=format&fit=crop"
                  alt="Heritage Lumen Academy Classical Campus Facade"
                  className="about-circle-img"
                />
                <div className="circle-glass-glare"></div>
              </div>

              {/* Secondary Circular Image (Engaged Young Scholars in Library / Class) */}
              <div
                className="about-circle-frame frame-sub"
                style={{
                  transform: `translate3d(${mouseOffset.x * -0.6}px, ${mouseOffset.y * -0.6}px, 0)`,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=700&auto=format&fit=crop"
                  alt="Scholars Engaged in Academic Dialogue"
                  className="about-circle-img"
                />
              </div>

              {/* Tertiary Accent Circular Image (Innovation / Science Laboratory) */}
              <div
                className="about-circle-frame frame-tertiary"
                style={{
                  transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0)`,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=500&auto=format&fit=crop"
                  alt="Scholars in Robotics Lab"
                  className="about-circle-img"
                />
              </div>

              {/* "2003" BADGE WITH COUNTING ANIMATION & 360° ROTATION ON HOVER */}
              <div
                className="about-heritage-seal-badge"
                title="Established 2003"
              >
                <div className="seal-rotating-shimmer"></div>
                <div className="seal-inner-core">
                  <div className="seal-crest-crown">
                    <i className="fa-solid fa-crown"></i>
                  </div>
                  <div className="seal-number-display">{yearCount}</div>
                  <div className="seal-caption">WE STARTED OUR JOURNEY IN</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
