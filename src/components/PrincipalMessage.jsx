import React from 'react';
import { Link } from 'react-router-dom';

export default function PrincipalMessage() {
  return (
    <section className="principal-banner">
      <div className="container">
        <div className="principal-grid">
          <div className="principal-portrait">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
              alt="Dr. Eleanor Vance - Principal"
            />
            <div className="principal-name-tag">
              <h4>Dr. Eleanor Vance, Ph.D.</h4>
              <p>Head of Institution / Principal</p>
            </div>
          </div>

          <div>
            <span className="section-label">PRINCIPAL'S DESK</span>
            <blockquote className="principal-quote-text">
              "Education at Heritage Lumen is not simply the acquisition of facts, but the ignition
              of intellect, curiosity, and ethical stewardship for an interconnected world."
            </blockquote>
            <p className="principal-body">
              When a young scholar steps through our gates, they enter an intellectual covenant. We
              do not simply teach; we mentor. Our educators are committed to fostering an environment
              that nurtures academic rigor, compassionate global citizenship, scientific discovery, and creative pursuit.
            </p>
            <div className="principal-links">
              <Link to="/about/principal-desk" className="btn-gold" style={{ fontSize: '0.85rem' }}>
                Read Full Address <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link to="/contact" className="btn-outline-navy">
                <i className="fa-solid fa-calendar-check"></i> Schedule an Interaction
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

