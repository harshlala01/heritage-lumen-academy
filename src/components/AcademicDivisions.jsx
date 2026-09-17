import React from 'react';
import { academyData } from '../data/academyData';

export default function AcademicDivisions() {
  const { divisions } = academyData;

  return (
    <section className="divisions-section" id="divisions">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-label">STRUCTURED FOR EVERY STAGE</span>
          <h2 className="main-heading">Academic Divisions & Curriculum</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto' }}>
            Phased developmental continuum designed to cultivate curiosity and university readiness.
          </p>
        </div>

        <div className="divisions-grid">
          {divisions.map((div) => (
            <div className="division-box" key={div.id}>
              <div>
                <div className="division-head">
                  <div className={`div-icon ${div.iconColor}`}>
                    <i className={`fa-solid ${div.icon}`}></i>
                  </div>
                  <span className="age-badge">{div.age}</span>
                </div>
                <h4>{div.title}</h4>
                <p>{div.desc}</p>
              </div>
              <a href="#enquiry" className="feat-link">
                Division Details <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
