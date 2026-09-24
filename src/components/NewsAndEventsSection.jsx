import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NewsAndEventsSection.css';

const API_BASE = 'http://localhost:5000';

// Helper to parse date strings for chronological sorting
const parseDateForSort = (dateStr) => {
  if (!dateStr) return 0;
  const str = String(dateStr).trim();
  const match = str.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (match) {
    const [, d, m, y] = match;
    const monthMap = {
      jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
      jul: 6, aug: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11
    };
    const mIdx = monthMap[m.toLowerCase().slice(0, 3)] ?? (monthMap[m.toLowerCase()] ?? 0);
    return new Date(parseInt(y, 10), mIdx, parseInt(d, 10)).getTime();
  }
  const ddmmyyyy = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (ddmmyyyy) {
    const [, d, m, y] = ddmmyyyy;
    return new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10)).getTime();
  }
  const parsed = new Date(str);
  return isNaN(parsed.getTime()) ? 0 : parsed.getTime();
};

// Helper to format any date format into DD MMM YYYY (e.g. 02 SEPT 2026)
const formatDisplayDate = (dateStr) => {
  if (!dateStr) return '';
  const trimmed = String(dateStr).trim();

  // Already in DD MMM YYYY or DD MONTH YYYY format
  if (/^\d{1,2}\s+[A-Za-z]{3,}\s+\d{4}$/.test(trimmed)) {
    return trimmed.toUpperCase();
  }

  const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];

  // Check DD/MM/YYYY or DD-MM-YYYY
  const ddmmyyyy = trimmed.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (ddmmyyyy) {
    const [, d, m, y] = ddmmyyyy;
    const mIndex = parseInt(m, 10) - 1;
    const monthName = MONTHS[mIndex] || m;
    return `${d.padStart(2, '0')} ${monthName} ${y}`;
  }

  // Check YYYY-MM-DD
  const yyyymmdd = trimmed.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/);
  if (yyyymmdd) {
    const [, y, m, d] = yyyymmdd;
    const mIndex = parseInt(m, 10) - 1;
    const monthName = MONTHS[mIndex] || m;
    return `${d.padStart(2, '0')} ${monthName} ${y}`;
  }

  // General Date parse
  const parsed = new Date(trimmed);
  if (!isNaN(parsed.getTime())) {
    return `${String(parsed.getDate()).padStart(2, '0')} ${MONTHS[parsed.getMonth()]} ${parsed.getFullYear()}`;
  }

  return trimmed.toUpperCase();
};

export default function NewsAndEventsSection() {
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null); // { type: 'notice' | 'event', data }

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/notices`).then((res) => (res.ok ? res.json() : [])).catch(() => []),
      fetch(`${API_BASE}/api/events`).then((res) => (res.ok ? res.json() : [])).catch(() => [])
    ])
      .then(([noticesData, eventsData]) => {
        if (Array.isArray(noticesData)) {
          const sorted = [...noticesData].sort((a, b) => {
            const dateA = parseDateForSort(a.notice_date);
            const dateB = parseDateForSort(b.notice_date);
            return dateB - dateA;
          });
          setNotices(sorted);
        } else {
          setNotices([]);
        }

        if (Array.isArray(eventsData)) {
          setEvents(eventsData);
        } else {
          setEvents([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setNotices([]);
        setEvents([]);
        setLoading(false);
      });
  }, []);

  // Split notices for the exact layout
  const topNotices = notices.slice(0, 2);
  const bottomNotice = notices.length >= 3 ? notices[2] : null;

  // Up to 4 upcoming events for timeline
  const displayedEvents = events.slice(0, 4);

  return (
    <section className="hla-news-events-section" id="news-events">
      <div className="hla-news-events-container">
        <div className="hla-news-events-grid">
          {/* ================= LEFT: NEWS & ANNOUNCEMENTS ================= */}
          <div className="hla-news-col">
            <div className="hla-news-header">
              <div className="hla-news-heading-wrap">
                <span className="hla-news-bell-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    <path d="M2 8C2 5.5 3 3.5 5 2" />
                    <path d="M22 8c0-2.5-1-4.5-3-6" />
                  </svg>
                </span>
                <h2 className="hla-news-heading">News &amp; Announcements</h2>
              </div>

              <Link to="/notice" className="hla-view-notice-btn">
                <span>View Notice</span>
                <span>&rarr;</span>
              </Link>
            </div>

            <div className="hla-notices-cards-container">
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94A3B8' }}>
                  <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '24px', color: '#D4AF37', marginBottom: '8px' }}></i>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>Loading notices...</p>
                </div>
              ) : notices.length === 0 ? (
                <div style={{
                  padding: '50px 24px',
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1.5px dashed rgba(212, 175, 55, 0.35)',
                  borderRadius: '16px',
                  margin: '10px 0'
                }}>
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid #D4AF37',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 14px',
                    color: '#D4AF37',
                    fontSize: '22px'
                  }}>
                    <i className="fa-solid fa-bell"></i>
                  </div>
                  <h4 style={{ color: '#FFFFFF', fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>
                    No Notices Published Yet
                  </h4>
                  <p style={{ color: '#94A3B8', fontSize: '0.9rem', maxWidth: '380px', margin: '0 auto', lineHeight: 1.5 }}>
                    New administrative notices, circulars, and announcements will appear here once published.
                  </p>
                </div>
              ) : (
                <>
                  {/* Top Row: Cards */}
                  <div className="hla-notices-top-grid">
                    {topNotices.map((item, idx) => (
                      <div
                        key={item.id || idx}
                        className="hla-notice-card"
                        onClick={() => setSelectedItem({ type: 'notice', data: item })}
                        title="Click to view full notice"
                      >
                        <div className="hla-notice-meta-bar">
                          <div className="hla-notice-badge-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                          </div>
                          <span className="hla-notice-date">
                            {formatDisplayDate(item.notice_date)}
                          </span>
                        </div>

                        <h3 className="hla-notice-title">{item.title}</h3>

                        <div className="hla-notice-desc-box">
                          <p>{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Row: 1 Full-Width Horizontal Card (when 3 or more notices exist) */}
                  {bottomNotice && (
                    <div
                      className="hla-notice-horizontal-card"
                      onClick={() => setSelectedItem({ type: 'notice', data: bottomNotice })}
                      title="Click to view full notice"
                    >
                      <div className="hla-notice-badge-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                      </div>

                      <span className="hla-notice-date">
                        {formatDisplayDate(bottomNotice.notice_date)}
                      </span>

                      <h3 className="hla-notice-horizontal-title">
                        {bottomNotice.title}
                      </h3>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* ================= RIGHT: EVENTS ================= */}
          <div className="hla-events-col">
            <div className="hla-events-card">
              {/* Decorative circular watermark */}
              <div className="hla-events-watermark" />

              <div>
                <div className="hla-events-header">
                  <span className="hla-events-cal-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                      <circle cx="8" cy="14" r="1" fill="currentColor" />
                      <circle cx="12" cy="14" r="1" fill="currentColor" />
                      <circle cx="16" cy="14" r="1" fill="currentColor" />
                      <circle cx="8" cy="18" r="1" fill="currentColor" />
                      <circle cx="12" cy="18" r="1" fill="currentColor" />
                    </svg>
                  </span>
                  <h2 className="hla-events-title">Events</h2>
                </div>

                {/* Vertical Timeline or Clean Empty State */}
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '30px 10px', color: '#94A3B8' }}>
                    <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '20px', color: '#D4AF37', marginBottom: '8px' }}></i>
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>Loading events...</p>
                  </div>
                ) : displayedEvents.length === 0 ? (
                  <div style={{
                    padding: '40px 18px',
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1.5px dashed rgba(212, 175, 55, 0.35)',
                    borderRadius: '14px',
                    margin: '10px 0'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'rgba(212, 175, 55, 0.1)',
                      border: '1px solid #D4AF37',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px',
                      color: '#D4AF37',
                      fontSize: '20px'
                    }}>
                      <i className="fa-regular fa-calendar-xmark"></i>
                    </div>
                    <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>
                      No Upcoming Events
                    </h4>
                    <p style={{ color: '#94A3B8', fontSize: '0.85rem', maxWidth: '320px', margin: '0 auto', lineHeight: 1.5 }}>
                      Scheduled campus events and ceremonies will appear here once announced.
                    </p>
                  </div>
                ) : (
                  <div className="hla-events-timeline">
                    <div className="hla-events-timeline-line" />

                    {displayedEvents.map((evt, idx) => {
                      const isFirst = idx === 0;
                      return (
                        <div
                          key={evt.id || idx}
                          className="hla-event-item"
                          onClick={() => setSelectedItem({ type: 'event', data: evt })}
                          title="Click to view event details"
                        >
                          <div className={`hla-event-node-icon ${isFirst ? 'first' : 'subsequent'}`}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                          </div>
                          <h4 className="hla-event-item-name">{evt.title}</h4>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= DYNAMIC DETAILS MODAL ================= */}
      {selectedItem && (
        <div className="hla-modal-overlay" onClick={() => setSelectedItem(null)}>
          <div
            className="hla-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`hla-modal-header ${selectedItem.type}`}>
              <span className="hla-modal-badge">
                {selectedItem.type === 'notice' ? 'Announcement' : 'Event Details'}
              </span>
              <button
                className="hla-modal-close-btn"
                onClick={() => setSelectedItem(null)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <div className="hla-modal-body">
              <h3 className="hla-modal-title">{selectedItem.data.title}</h3>

              <div className="hla-modal-meta-row">
                {selectedItem.type === 'notice' ? (
                  <>
                    <span><strong>Date:</strong> {formatDisplayDate(selectedItem.data.notice_date)}</span>
                    {selectedItem.data.category && (
                      <span><strong>Category:</strong> {selectedItem.data.category}</span>
                    )}
                  </>
                ) : (
                  <>
                    <span><strong>Date:</strong> {selectedItem.data.event_date}</span>
                    {selectedItem.data.event_time && (
                      <span><strong>Time:</strong> {selectedItem.data.event_time}</span>
                    )}
                    {selectedItem.data.venue && (
                      <span><strong>Venue:</strong> {selectedItem.data.venue}</span>
                    )}
                  </>
                )}
              </div>

              <div className="hla-modal-desc">
                {selectedItem.data.description}
              </div>

              {selectedItem.data.attachment_path && (
                <div className="hla-modal-attachment">
                  <span>Attachment Document:</span>
                  <a
                    href={`${API_BASE}${selectedItem.data.attachment_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Download {selectedItem.data.attachment_name || 'File'}</span>
                    <span>&darr;</span>
                  </a>
                </div>
              )}
            </div>

            <div className="hla-modal-footer">
              <button
                className="hla-modal-ok-btn"
                onClick={() => setSelectedItem(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
