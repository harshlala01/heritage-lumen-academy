import React from 'react';
import { academyData } from '../data/academyData';

export default function DifferencePillars() {
  const { cardinalTraits } = academyData;

  return (
    <section className="values-section">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-label">OUR CARDINAL TRAITS</span>
          <h2 className="main-heading">The Rabindra Bharati Heritage Difference</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto' }}>
            Four pedagogical foundations that transform education into transformation and
            university readiness.
          </p>
        </div>

        <div className="values-grid">
          {cardinalTraits.map((trait) => (
            <div className="value-box" key={trait.id}>
              <div>
                <div className="value-icon">
                  <i className={`fa-solid ${trait.icon}`}></i>
                </div>
                <h4>{trait.title}</h4>
                <p>{trait.desc}</p>
              </div>
              <a href="#divisions" className="feat-link">
                {trait.linkText} <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
