import React from 'react';
import { Link } from 'react-router-dom';

export default function TopBar({ onOpenBanner }) {
  return (
    <div className="top-bar">
      <div className="container top-bar-inner">
        <div className="top-left-info">
          <a href="tel:+918001271960">
            <i className="fa-solid fa-phone"></i> +91 8001271960
          </a>
          <a href="mailto:therabindrabharatihds@gmail.com">
            <i className="fa-solid fa-envelope"></i> therabindrabharatihds@gmail.com
          </a>
          <span>
            <i className="fa-solid fa-clock"></i> Office: Mon–Fri 10:30 am to 3:00 pm
          </span>
        </div>
        <div className="top-right-links">
          <Link to="/contact">
            <i className="fa-solid fa-user-lock"></i> Portal Login
          </Link>
          <Link to="/notice">Noticeboard</Link>
          <Link to="/about/foundation">CISCE (WB 339)</Link>
          <button
            onClick={onOpenBanner}
            className="badge-admissions-open"
            style={{ border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            title="View School Achievement & Announcement Banner"
          >
            <i className="fa-solid fa-bullhorn"></i> ANNOUNCEMENT
          </button>
        </div>
      </div>
    </div>
  );
}
