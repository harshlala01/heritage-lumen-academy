import React, { useState } from 'react';
import { academyData } from '../data/academyData';

export default function NewsAndEvents({ onSelectEvent }) {
  const { news, events } = academyData;
  const [rsvpStatus, setRsvpStatus] = useState({});

  const handleAction = (evt) => {
    setRsvpStatus((prev) => ({
      ...prev,
      [evt.id]: 'Reserved'
    }));
    if (onSelectEvent) {
      onSelectEvent(evt.title);
    }
  };

  return (
    <section className="news-events-wrap" id="news">
      <div className="container">
        <div className="news-events-grid">
          {/* News */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="section-label">THE ACADEMY GAZETTE</span>
              <a href="#enquiry" className="feat-link">
                All News <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--navy-primary)' }}>
              Latest News & Honors
            </h3>

            <div className="news-items-grid">
              {news.map((item) => (
                <div className="news-card-single" key={item.id}>
                  <div className="news-card-thumb">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="news-card-content">
                    <span className="date">{item.date}</span>
                    <h5>{item.title}</h5>
                    <p>{item.desc}</p>
                    <a href="#enquiry" className="feat-link">
                      Read Story <i className="fa-solid fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="section-label">ENGAGEMENTS CALENDAR</span>
              <a href="#enquiry" className="feat-link">
                Full Calendar <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--navy-primary)' }}>
              Upcoming Events
            </h3>

            <div className="events-list-wrap">
              {events.map((evt) => (
                <div className="event-row" key={evt.id}>
                  <div className="event-cal-badge">
                    <span className="m">{evt.month}</span>
                    <span className="d">{evt.day}</span>
                  </div>
                  <div className="event-details">
                    <h5>{evt.title}</h5>
                    <p>
                      <span>
                        <i className="fa-regular fa-clock"></i> {evt.time}
                      </span>
                      <span>
                        <i className="fa-solid fa-location-dot"></i> {evt.location}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleAction(evt)}
                    className={`btn-outline-navy ${rsvpStatus[evt.id] ? 'btn-rsvp-done' : ''}`}
                    style={{
                      padding: '8px 14px',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      background: rsvpStatus[evt.id] ? 'var(--navy-primary)' : 'transparent',
                      color: rsvpStatus[evt.id] ? 'var(--gold-primary)' : 'var(--navy-primary)',
                      border: '1.5px solid var(--navy-primary)',
                      borderRadius: '4px',
                      fontWeight: 600,
                      transition: 'all 0.2s'
                    }}
                  >
                    {rsvpStatus[evt.id] ? (
                      <>
                        <i className="fa-solid fa-check"></i> {rsvpStatus[evt.id]}
                      </>
                    ) : (
                      evt.action
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
