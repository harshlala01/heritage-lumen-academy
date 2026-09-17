import React from 'react';
import PageBanner from '../../components/PageBanner';
import { Link } from 'react-router-dom';

export default function SchoolFoundation() {
  return (
    <div>
      <PageBanner
        title="School Foundation"
        subtitle="The enduring vision, historic heritage, and guiding philosophy that shapes every scholar at Heritage Lumen."
        breadcrumbs={[
          { label: 'About Us', path: '/about/foundation' },
          { label: 'School Foundation' }
        ]}
      />

      <section className="subpage-content-wrap">
        <div className="container">
          <div className="about-split-grid" style={{ marginBottom: '50px' }}>
            <div>
              <span className="section-label">OUR GENESIS & HERITAGE</span>
              <h2 className="main-heading">Founding Principles of Heritage Lumen</h2>
              <div className="about-body">
                <p>
                  Established in 2003, Heritage Lumen Preparatory Academy was established with the
                  singular aspiration to pioneer a learning sanctuary where classical humanist values
                  harmoniously converge with cutting-edge 21st-century inquiry.
                </p>
                <p>
                  Under the stewardship of visionary educationists and philanthropists, the Academy
                  expanded from its initial historic collegiate quadrangle to become one of the premier
                  CISCE (ICSE & ISC) co-educational day institutions in the region.
                </p>
              </div>
            </div>

            <div className="about-photo-wrap">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=900&auto=format&fit=crop"
                alt="Academy Campus Quad"
                style={{ borderRadius: '12px' }}
              />
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="feature-cards-grid" style={{ marginBottom: '50px' }}>
            <div className="feat-card">
              <div className="feat-icon-box">
                <i className="fa-solid fa-eye"></i>
              </div>
              <h3>Our Vision</h3>
              <p>
                To sculpt ethical, agile, and compassionate leaders equipped with deep intellectual
                curiosity, capable of solving multifaceted global challenges with integrity.
              </p>
            </div>

            <div className="feat-card">
              <div className="feat-icon-box">
                <i className="fa-solid fa-compass"></i>
              </div>
              <h3>Our Mission</h3>
              <p>
                To provide holistic pedagogical excellence that harmonizes scientific inquiry,
                classical literature, athletic vigor, and artistic expression for all learners.
              </p>
            </div>

            <div className="feat-card">
              <div className="feat-icon-box">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3>Motto & Crest</h3>
              <p>
                <em>"Inspiring Intellect. Cultivating Character."</em> Symbolized by our golden crest
                representing truth, academic illumination, and selfless societal service.
              </p>
            </div>

            <div className="feat-card">
              <div className="feat-icon-box">
                <i className="fa-solid fa-award"></i>
              </div>
              <h3>Board Affiliation</h3>
              <p>
                Permanently affiliated to the Council for the Indian School Certificate Examinations
                (CISCE), New Delhi (WB 339) for ICSE (X) and ISC (XII).
              </p>
            </div>
          </div>

          {/* Historical Timeline */}
          <div className="subpage-card">
            <span className="section-label">CHRONICLE OF EXCELLENCE</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-primary)', marginBottom: '24px' }}>
              Milestones on Our Educational Journey
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div className="notice-date-badge">2003</div>
                <div>
                  <h5 style={{ color: 'var(--navy-primary)', fontWeight: 700 }}>Inception of Heritage Lumen</h5>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                    Foundation stone laid with 120 students, 14 faculty members, and a commitment to moral rigor.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div className="notice-date-badge">2010</div>
                <div>
                  <h5 style={{ color: 'var(--navy-primary)', fontWeight: 700 }}>Inauguration of McAllister Science Wing</h5>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                    State-of-the-art physics, chemistry, biology, and computer laboratories inaugurated.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div className="notice-date-badge">2018</div>
                <div>
                  <h5 style={{ color: 'var(--navy-primary)', fontWeight: 700 }}>Robotics & Olympic Athletic Complex</h5>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                    Expansion of campus to include indoor swimming arena, tennis courts, and maker lab.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div className="notice-date-badge">2025</div>
                <div>
                  <h5 style={{ color: 'var(--navy-primary)', fontWeight: 700 }}>Ranked #1 Day School for Academic Distinctions</h5>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                    100% university placement with scholars matriculating into Oxford, Cambridge, IITs, and Ivy League.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
