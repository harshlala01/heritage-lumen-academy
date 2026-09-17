import React from 'react';
import { Link } from 'react-router-dom';
import { academyData } from '../data/academyData';

export default function Hero() {
  const { hero } = academyData;

  return (
    <section className="hero-banner">
      <div className="container">
        <div className="hero-text-wrap">
          <div className="hero-pill-badge">
            <i className="fa-solid fa-star"></i> {hero.badge}
          </div>
          <h1>{hero.title}</h1>
          <p>{hero.subtitle}</p>
          <div className="hero-cta-row">
            <Link to="/contact" className="btn-gold">
              {hero.applyCta} <i className="fa-solid fa-arrow-right"></i>
            </Link>
            <Link to="/facilities" className="btn-outline-white">
              {hero.tourCta} <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
