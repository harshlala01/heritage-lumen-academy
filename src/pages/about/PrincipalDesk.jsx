import React from 'react';
import PageBanner from '../../components/PageBanner';
import { Link } from 'react-router-dom';
import principalImg from '../../assets/principal.png';

export default function PrincipalDesk() {
  return (
    <div>
      <PageBanner
        title="Principal's Desk"
        subtitle="Words of inspiration and academic leadership from our Head of Institution, Mithu Sinha Bhattacharya."
        breadcrumbs={[
          { label: 'About Us', path: '/about/foundation' },
          { label: "Principal's Desk" }
        ]}
      />

      <section className="subpage-content-wrap">
        <div className="container">
          <div className="principal-grid" style={{ marginBottom: '50px' }}>
            <div className="principal-portrait">
              <img
                src={principalImg}
                alt="Mithu Sinha Bhattacharya"
              />
              <div className="principal-name-tag">
                <h4>Mithu Sinha Bhattacharya</h4>
                <p>Principal</p>
              </div>
            </div>

            <div>
              <span className="section-label">FROM THE PRINCIPAL'S DESK</span>
              <blockquote className="principal-quote-text">
                "Education at The Rabindra Bharati Heritage Day School is not simply the acquisition of facts, but the ignition
                of intellect and ethical stewardship for an interconnected world."
              </blockquote>
              <p className="principal-body" style={{ marginBottom: '16px' }}>
                Dear Scholars, Parents, and Visitors,
              </p>
              <p className="principal-body" style={{ marginBottom: '16px' }}>
                When a young mind enters The Rabindra Bharati Heritage Day School, they do not just join a school;
                they enter an intellectual fellowship. We nurture our learners to cultivate independent
                thinking, empirical skepticism, and profound empathy for others.
              </p>
              <p className="principal-body" style={{ marginBottom: '16px' }}>
                Our faculty members act not merely as instructors, but as mentors and catalysts. Whether in
                advanced molecular biology labs, Socratic literature discussions, or during heated Model UN
                debates, we challenge our students to transcend standard exam scores and discover the joyful
                depth of true knowledge.
              </p>
              <p className="principal-body" style={{ marginBottom: '24px' }}>
                We invite you to walk through our gates, meet our impassioned faculty, and witness firsthand
                the quiet confidence and scholarly joy that characterizes every scholar at The Rabindra Bharati Heritage Day School.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn-gold" style={{ fontSize: '0.85rem' }}>
                  Request Principal's Appointment <i className="fa-solid fa-calendar-check"></i>
                </Link>
                <Link to="/academics" className="btn-outline-navy" style={{ fontSize: '0.85rem' }}>
                  Academic Curriculum Overview <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="subpage-card">
            <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-primary)', marginBottom: '16px' }}>
              Academic & Pedagogical Credo
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
              <div style={{ borderLeft: '3px solid var(--gold-primary)', paddingLeft: '16px' }}>
                <h5 style={{ color: 'var(--navy-primary)', fontWeight: 700 }}>Inquiry-Based Learning</h5>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Replacing rote memorization with experiential experiments, mathematical problem solving, and analytical essay writing.
                </p>
              </div>
              <div style={{ borderLeft: '3px solid var(--gold-primary)', paddingLeft: '16px' }}>
                <h5 style={{ color: 'var(--navy-primary)', fontWeight: 700 }}>Pastoral Care & Mental Well-being</h5>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  A student is a whole human being. Full-time counseling staff and housemasters provide empathetic emotional guidance.
                </p>
              </div>
              <div style={{ borderLeft: '3px solid var(--gold-primary)', paddingLeft: '16px' }}>
                <h5 style={{ color: 'var(--navy-primary)', fontWeight: 700 }}>University Readiness</h5>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Comprehensive guidance counseling for SAT, CUET, JEE/NEET, and international university applications starting in Grade IX.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
