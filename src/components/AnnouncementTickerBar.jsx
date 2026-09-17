import React from 'react';

export default function AnnouncementTickerBar({ onOpenBanner }) {
  const tickerItems = [
    'New Admission Open for the session 2025–2026. For more details please visit school office: Monday to Friday 10:30 am to 3:00 pm.',
    'Congratulations Class X (ICSE) & Class XII (ISC) Scholars for 100% Board Results & All India Top Ranks!',
    'Merit-Cum-Means Scholarship Aptitude Test registrations are now open for Grade IX and XI entry.',
    'Heritage Lumen Robotics Contingent secures 1st Prize at National STEM Conclave.'
  ];

  return (
    <div className="announcement-ticker-bar">
      {/* Left Yellow Announcement Pill matching screenshot */}
      <button
        className="announcement-badge-pill"
        onClick={onOpenBanner}
        title="Click to view full announcement banner"
      >
        <i className="fa-solid fa-bullhorn"></i>
        <span>Announcement</span>
      </button>

      {/* Marquee Ticker Track */}
      <div className="announcement-marquee-track" onClick={onOpenBanner} title="Click to view details">
        <div className="announcement-marquee-content">
          {/* First loop */}
          {tickerItems.map((text, idx) => (
            <span key={`loop1-${idx}`}>{text}</span>
          ))}
          {/* Second duplicate loop for seamless continuous scrolling */}
          {tickerItems.map((text, idx) => (
            <span key={`loop2-${idx}`}>{text}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
