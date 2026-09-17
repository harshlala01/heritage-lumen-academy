import React from 'react';
import { academyData } from '../data/academyData';

export default function FeatureCards() {
  const { featureCards } = academyData;

  return (
    <div className="hero-cards-section">
      <div className="container">
        <div className="feature-cards-grid">
          {featureCards.map((card) => (
            <div className="feat-card" key={card.id}>
              <div>
                <div className="feat-icon-box">
                  <i className={`fa-solid ${card.icon}`}></i>
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
              <a href={card.link} className="feat-link">
                {card.tag} <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
