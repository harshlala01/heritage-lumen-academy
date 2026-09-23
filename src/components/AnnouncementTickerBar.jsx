import React from 'react';

export default function AnnouncementTickerBar({ onOpenBanner }) {
  const announcements = [
    'Admissions Open for Academic Year 2025–2026. Limited seats available for Nursery to Grade XI.',
    'The Rabindra Bharati Heritage Day School scholars achieve 100% distinction across CBSE National Board Examinations.',
    'Merit-cum-Means Scholarships: Applications now open for prospective scholars.',
    'Annual Inter-School Laureate Conclave scheduled for November 15th.'
  ];

  return (
    <aside className="announcement-bar-slim" aria-label="Important Announcements">
      <div className="announcement-marquee-wrapper">
        <div className="announcement-marquee-track">
          {/* Loop 1 */}
          <div className="announcement-marquee-group">
            {announcements.map((text, idx) => (
              <span key={`a1-${idx}`} className="announcement-item">
                <span className="announcement-bullet">✦</span>
                <span className="announcement-text">{text}</span>
                <button
                  type="button"
                  onClick={onOpenBanner}
                  className="announcement-view-link"
                >
                  View Details →
                </button>
              </span>
            ))}
          </div>
          {/* Loop 2 (Continuous marquee) */}
          <div className="announcement-marquee-group" aria-hidden="true">
            {announcements.map((text, idx) => (
              <span key={`a2-${idx}`} className="announcement-item">
                <span className="announcement-bullet">✦</span>
                <span className="announcement-text">{text}</span>
                <button
                  type="button"
                  onClick={onOpenBanner}
                  className="announcement-view-link"
                >
                  View Details →
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
