import React from 'react';
import { Link } from 'react-router-dom';

export default function PageBanner({ title, subtitle, breadcrumbs = [] }) {
  return (
    <section className="subpage-banner">
      <div className="container">
        <div className="subpage-breadcrumbs">
          <Link to="/">
            <i className="fa-solid fa-house"></i> Home
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.65rem' }}></i>
              {crumb.path ? (
                <Link to={crumb.path}>{crumb.label}</Link>
              ) : (
                <span>{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <h1 className="subpage-title">{title}</h1>
        {subtitle && <p className="subpage-desc">{subtitle}</p>}
      </div>
    </section>
  );
}
