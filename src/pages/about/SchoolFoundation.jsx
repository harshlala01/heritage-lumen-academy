import React from 'react';
import PageBanner from '../../components/PageBanner';
import RevealTextBlock from '../../components/RevealTextBlock';

export default function SchoolFoundation() {
  return (
    <div>
      <PageBanner
        title="School Foundation"
        subtitle="The enduring vision, historic heritage, and guiding philosophy that shapes every scholar at The Rabindra Bharati Heritage Day School."
        breadcrumbs={[
          { label: 'About Us', path: '/about/foundation' },
          { label: 'School Foundation' }
        ]}
      />

      <section className="subpage-content-wrap">
        <div className="container">
          <div className="about-split-grid" style={{ marginBottom: '50px' }}>
            <RevealTextBlock>
              <div className="about-badge-tagline">
                <span className="tagline-ornament">❖</span>
                <span>OUR GENESIS & HERITAGE</span>
                <span className="tagline-ornament">❖</span>
              </div>
              <h2 className="about-heritage-headline" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', display: 'block' }}>
                <span className="about-dropcap-letter">F</span>ounding Principles of The Rabindra Bharati Heritage Day School
              </h2>
              <div className="about-paragraph-stack">
                <p className="about-paragraph">
                  Established in 2019, The Rabindra Bharati Heritage Day School was established with the
                  singular aspiration to pioneer a learning sanctuary where classical humanist values
                  harmoniously converge with cutting-edge 21st-century inquiry.
                </p>
                <p className="about-paragraph">
                  Under the stewardship of visionary educationists and philanthropists, the institution
                  expanded from its initial historic campus to become one of the premier
                  CBSE co-educational day institutions in the region.
                </p>
              </div>
            </RevealTextBlock>

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
                Affiliated to the Central Board of Secondary Education (CBSE), New Delhi,
                delivering standardized academic rigor from Pre-Primary through Secondary (Class X).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
