import React from 'react';
import { Link } from 'react-router-dom';

export default function CtaBanner() {
  return (
    <section className="invitation-cta-section">
      {/* Floating Animated Gold Particles */}
      <div className="cta-particles-layer">
        <span className="particle p1"></span>
        <span className="particle p2"></span>
        <span className="particle p3"></span>
        <span className="particle p4"></span>
        <span className="particle p5"></span>
        <span className="particle p6"></span>
      </div>

      <div className="container">
        <div className="invitation-cta-inner">
          <span className="cta-eyebrow-gold">THE INVITATION • ADMISSIONS 2025–2026</span>
          
          <h2 className="cta-huge-heading">
            Your Journey of Discovery Begins at <span className="cta-gold-highlight">Heritage Lumen</span>
          </h2>

          <p className="cta-cream-subtext">
            Join an exceptional scholarly community where academic rigor, ethical stewardship, and lifelong intellectual curiosity meet. Admissions are now open for the upcoming academic cycle.
          </p>

          <div className="cta-action-wrap">
            <Link
              to="/contact"
              className="btn-apply-pulse"
              title="Apply for Admission"
            >
              APPLY ONLINE <span className="cta-btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

