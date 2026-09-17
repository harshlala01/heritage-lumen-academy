import React from 'react';
import { academyData } from '../data/academyData';

export default function Facilities() {
  const { facilities } = academyData;

  return (
    <section className="facilities-section" id="facilities">
      <div className="container">
        <div className="facilities-top-row">
          <div>
            <span className="section-label">PHYSICAL ENVIRONMENT</span>
            <h2 className="main-heading" style={{ marginBottom: 0 }}>
              Campus & Modern Facilities
            </h2>
          </div>
          <a href="#enquiry" className="btn-outline-navy">
            <i className="fa-solid fa-map-location-dot"></i> View Interactive Campus Map
          </a>
        </div>

        <div className="facilities-grid">
          {facilities.map((fac) => (
            <div className="facility-card-item" key={fac.id}>
              <div className="facility-img-box">
                <img src={fac.image} alt={fac.title} />
                <span className={`facility-tag ${fac.tagClass}`}>{fac.tag}</span>
              </div>
              <div className="facility-info">
                <div>
                  <h4>{fac.title}</h4>
                  <p>{fac.desc}</p>
                </div>
                <div className="facility-bottom-links">
                  <a href="#enquiry" className="feat-link">
                    Explore Space <i className="fa-solid fa-arrow-right"></i>
                  </a>
                  <a
                    href="#enquiry"
                    style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy-primary)' }}
                  >
                    View Virtual Tour
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
