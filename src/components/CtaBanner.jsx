import React from 'react';
import { Link } from 'react-router-dom';

export default function CtaBanner() {
  return (
    <section className="cta-dark-banner">
      <div className="container">
        <div className="cta-inner">
          <span className="section-label" style={{ color: 'var(--gold-light)' }}>
            JOIN OUR ACADEMIC COHORT
          </span>
          <h2>Your Journey of Discovery Begins at Heritage Lumen.</h2>
          <p>
            Applications are now open for the upcoming academic year. Limited seats available across
            grade levels.
          </p>
          <Link
            to="/contact"
            className="btn-gold"
            style={{ fontSize: '0.95rem', padding: '14px 28px' }}
          >
            Apply Online Now <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
