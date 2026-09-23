import React from 'react';
import PageBanner from '../../components/PageBanner';
import { Link } from 'react-router-dom';

export default function SecretaryDesk() {
  return (
    <div>
      <PageBanner
        title="Secretary's Desk"
        subtitle="Insights and strategic vision from the Secretary of the Managing Committee."
        breadcrumbs={[
          { label: 'About Us', path: '/about/foundation' },
          { label: "Secretary's Desk" }
        ]}
      />

      <section className="subpage-content-wrap">
        <div className="container">
          <div className="principal-grid" style={{ marginBottom: '50px' }}>
            <div className="principal-portrait">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                alt="Secretary"
              />
              <div className="principal-name-tag">
                <h4>Mr. Debabrata Roy, M.A., LL.B.</h4>
                <p>Honorary Secretary</p>
              </div>
            </div>

            <div>
              <span className="section-label">FROM THE SECRETARY'S DESK</span>
              <blockquote className="principal-quote-text">
                "Our constant endeavor is to provide an infrastructure where curiosity meets discipline,
                and where every child is empowered to reach their highest self."
              </blockquote>
              <p className="principal-body" style={{ marginBottom: '16px' }}>
                Dear Parents, Guardians, and Esteemed Well-Wishers,
              </p>
              <p className="principal-body" style={{ marginBottom: '16px' }}>
                At The Rabindra Bharati Heritage Day School, we perceive educational administration not as mere
                logistics, but as the deliberate crafting of an inspiring habitat. Over the past two decades,
                we have consistently invested in modern pedagogical infrastructure: from digital interactive
                classrooms and robotics laboratories to pristine sports arenas and expansive libraries.
              </p>
              <p className="principal-body" style={{ marginBottom: '24px' }}>
                We believe that education must transcend textbooks. Our transparent administrative framework
                ensures that every parent is an active collaborator in our journey. Our office is always open
                to progressive dialogue, constructive suggestions, and unified efforts for the holistic
                well-being of our students.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn-gold" style={{ fontSize: '0.85rem' }}>
                  Contact Secretary's Office <i className="fa-solid fa-envelope"></i>
                </Link>
                <Link to="/facilities" className="btn-outline-navy" style={{ fontSize: '0.85rem' }}>
                  Explore Campus Facilities <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="subpage-card">
            <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-primary)', marginBottom: '16px' }}>
              Key Administrative Commitments
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div>
                <h6 style={{ color: 'var(--navy-primary)', fontWeight: 700 }}>Seamless Digital Communication</h6>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  Real-time mobile app updates for attendance, fee receipts, examination reports, and announcements.
                </p>
              </div>
              <div>
                <h6 style={{ color: 'var(--navy-primary)', fontWeight: 700 }}>Sustainable Green Campus</h6>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  Solar-powered academic blocks, rainwater harvesting, zero single-use plastic, and lush botanical flora.
                </p>
              </div>
              <div>
                <h6 style={{ color: 'var(--navy-primary)', fontWeight: 700 }}>Safe Fleet Transportation</h6>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  GPS-monitored air-conditioned school buses with speed governors, female attendants, and live parent tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
