import React, { useState } from 'react';
import PageBanner from '../components/PageBanner';

export default function NoticePage() {
  const [filter, setFilter] = useState('all');

  const notices = [
    {
      id: 1,
      category: 'admissions',
      title: 'Admissions Open for Academic Year 2025–2026: Information Brochure & Forms',
      date: 'OCT 18, 2025',
      summary: 'Applications are now being received for Pre-Primary, Primary, and Grade XI (Science, Commerce, Humanities). Online portal submission deadline is December 15, 2025.',
      tag: 'Admissions'
    },
    {
      id: 2,
      category: 'exam',
      title: 'ICSE & ISC Board Pre-Board Examination Schedule 2025–26 Released',
      date: 'NOV 05, 2025',
      summary: 'Timetable and laboratory practical examination regulations for Grades X and XII have been published on the scholar intranet portal.',
      tag: 'Examinations'
    },
    {
      id: 3,
      category: 'academic',
      title: 'Annual Science, STEM & Robotics Exhibition 2025: Guidelines for Participants',
      date: 'NOV 12, 2025',
      summary: 'Scholars in Grades VI–XII may submit synopsis for innovative working prototypes to the STEM HOD by November 25, 2025.',
      tag: 'Academic'
    },
    {
      id: 4,
      category: 'events',
      title: 'Winter Carnival & Founders’ Day Celebrations Notice',
      date: 'NOV 20, 2025',
      summary: 'Heritage Lumen Annual Founders’ Day & Gala will be celebrated on December 18 at McAllister Auditorium. Parents are cordially invited.',
      tag: 'Events'
    },
    {
      id: 5,
      category: 'holidays',
      title: 'Notification of Winter Vacation Schedule & School Re-opening Dates',
      date: 'DEC 01, 2025',
      summary: 'The Academy will observe winter recess from December 24, 2025 to January 02, 2026. Normal classes resume on Monday, January 05, 2026.',
      tag: 'Holidays'
    },
    {
      id: 6,
      category: 'admissions',
      title: 'Merit-Cum-Means Scholarship Aptitude Test Date Announced',
      date: 'DEC 10, 2025',
      summary: 'Eligible candidates seeking financial endowment for Grade IX and XI entry must attend the written test on Saturday, January 10, 2026.',
      tag: 'Admissions'
    }
  ];

  const filtered = filter === 'all'
    ? notices
    : notices.filter((n) => n.category === filter);

  return (
    <div>
      <PageBanner
        title="Official Notices & Circulars"
        subtitle="Up-to-date administrative announcements, academic schedules, examination routines, and official bulletins."
        breadcrumbs={[{ label: 'Notice' }]}
      />

      <section className="subpage-content-wrap">
        <div className="container">
          {/* Important Urgent Notification Alert */}
          <div
            style={{
              background: 'rgba(212, 175, 55, 0.12)',
              border: '1.5px solid var(--gold-primary)',
              borderRadius: '10px',
              padding: '16px 20px',
              marginBottom: '36px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px'
            }}
          >
            <i className="fa-solid fa-bullhorn" style={{ color: 'var(--gold-dark)', fontSize: '1.4rem' }}></i>
            <div style={{ flexGrow: 1 }}>
              <strong style={{ color: 'var(--navy-primary)' }}>IMPORTANT NOTICE:</strong>{' '}
              <span style={{ color: 'var(--text-dark)' }}>
                Admissions for Academic Session 2025–26 are ongoing. Desk hours for prospectus collection: Monday to Friday 10:30 AM to 3:00 PM.
              </span>
            </div>
          </div>

          {/* Filter Pills */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '36px'
            }}
          >
            {[
              { id: 'all', label: 'All Notices' },
              { id: 'admissions', label: 'Admissions' },
              { id: 'exam', label: 'Examinations' },
              { id: 'academic', label: 'Academic' },
              { id: 'events', label: 'Events & Functions' },
              { id: 'holidays', label: 'Holidays' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                style={{
                  padding: '9px 20px',
                  borderRadius: '30px',
                  border: '1.5px solid',
                  borderColor: filter === tab.id ? 'var(--gold-primary)' : 'var(--border-color)',
                  background: filter === tab.id ? 'var(--navy-primary)' : '#ffffff',
                  color: filter === tab.id ? 'var(--gold-light)' : 'var(--text-dark)',
                  fontWeight: 600,
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Notices List */}
          <div>
            {filtered.map((notice) => (
              <div key={notice.id} className="notice-item-card">
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span className="notice-date-badge">{notice.date}</span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}
                    >
                      {notice.tag}
                    </span>
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-primary)', margin: '0 0 8px' }}>
                    {notice.title}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0, lineHeight: '1.6' }}>
                    {notice.summary}
                  </p>
                </div>

                <button
                  onClick={() => alert(`Downloading circular: ${notice.title}`)}
                  className="btn-outline-navy"
                  style={{
                    padding: '9px 16px',
                    fontSize: '0.8rem',
                    flexShrink: 0,
                    cursor: 'pointer',
                    borderRadius: '6px'
                  }}
                >
                  <i className="fa-solid fa-file-pdf"></i> Download Circular
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
