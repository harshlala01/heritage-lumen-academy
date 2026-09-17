import React from 'react';
import PageBanner from '../../components/PageBanner';

export default function Management() {
  const trustees = [
    {
      name: 'Justice S. K. Mukherjee (Retd.)',
      role: 'Chairman, Board of Governors',
      bio: 'Former High Court Judge and eminent jurist dedicated to transparent institutional governance and constitutional ethics in education.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop'
    },
    {
      name: 'Prof. Aniruddha Roy, Ph.D.',
      role: 'Vice Chairman & Academic Trustee',
      bio: 'Senior academician, former Dean of University Studies, guiding pedagogical innovation, faculty recruitment, and research curricula.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop'
    },
    {
      name: 'Mrs. Sharmistha Sen',
      role: 'Managing Trustee & Treasurer',
      bio: 'Chartered Financial Analyst overseeing institutional sustainability, modern campus infrastructure development, and student scholarship endowments.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop'
    },
    {
      name: 'Dr. Vivek Sengupta, FRCS',
      role: 'Trustee & Community Welfare Director',
      bio: 'Renowned surgeon championing student physical health, medical safety protocols, and the Academy infirmary facilities.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop'
    }
  ];

  return (
    <div>
      <PageBanner
        title="Management & Governance"
        subtitle="Distinguished leaders and educationists stewarding Heritage Lumen with integrity, stewardship, and foresight."
        breadcrumbs={[
          { label: 'About Us', path: '/about/foundation' },
          { label: 'Management' }
        ]}
      />

      <section className="subpage-content-wrap">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="section-label">BOARD OF GOVERNORS</span>
            <h2 className="main-heading">Leadership & Board of Trustees</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
              Our managing committee blends legal, academic, medical, and financial acumen to ensure
              uncompromising standards across curriculum, student life, and ethical compliance.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '28px',
              marginBottom: '50px'
            }}
          >
            {trustees.map((t, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(11, 27, 61, 0.06)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <div style={{ height: '240px', overflow: 'hidden' }}>
                  <img
                    src={t.image}
                    alt={t.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '24px' }}>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--gold-dark)',
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {t.role}
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-primary)', margin: '6px 0 12px' }}>
                    {t.name}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {t.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Governance Pillars */}
          <div className="subpage-card">
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-primary)', marginBottom: '16px' }}>
              Institutional Governance Principles
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              <div>
                <h5 style={{ color: 'var(--navy-primary)', fontWeight: 700 }}>Child Protection & Safety</h5>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Strict POCSO compliance, round-the-clock CCTV surveillance, background-verified staff, and child counseling cell.
                </p>
              </div>
              <div>
                <h5 style={{ color: 'var(--navy-primary)', fontWeight: 700 }}>Faculty Enrichment</h5>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Regular professional development workshops in collaboration with British Council and Cambridge Assessment.
                </p>
              </div>
              <div>
                <h5 style={{ color: 'var(--navy-primary)', fontWeight: 700 }}>Need-Based Scholarships</h5>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Merit-cum-means scholarship endowment guaranteeing that financial constraints never hinder brilliant scholars.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
