import React from 'react';
import { academyData } from '../data/academyData';

export default function QuickLinks() {
  const { quickLinks } = academyData;

  return (
    <section className="quick-ribbon">
      <div className="container">
        <div className="ribbon-header">
          <span className="section-label">DIRECT CONNECTIONS</span>
          <h3>Explore The Rabindra Bharati Heritage Day School</h3>
          <p>Self-service resources for candidates, families & faculty.</p>
        </div>
        <div className="quick-icons-row">
          {quickLinks.map((link) => (
            <a href={link.href} className="quick-icon-pill" key={link.id}>
              <div className="icon-circle">
                <i className={`fa-solid ${link.icon}`}></i>
              </div>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
