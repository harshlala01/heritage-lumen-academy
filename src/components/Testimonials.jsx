import React from 'react';
import { academyData } from '../data/academyData';

export default function Testimonials() {
  const { testimonials } = academyData;

  return (
    <section className="testimonials-wrap">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-label">COMMUNITY VOICES</span>
          <h2 className="main-heading">Reflections from Our Community</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="testi-card" key={t.id}>
              <div>
                <div className="star-row">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p>"{t.quote}"</p>
              </div>
              <div className="author-box">
                <img src={t.avatar} alt={t.author} />
                <div>
                  <h5>{t.author}</h5>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
