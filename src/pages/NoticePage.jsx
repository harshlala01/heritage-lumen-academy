import React, { useState, useEffect } from 'react';
import PageBanner from '../components/PageBanner';

const API_BASE = 'http://localhost:5000';

export default function NoticePage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [liveNotices, setLiveNotices] = useState([]);
  const [admissionsNoticeText, setAdmissionsNoticeText] = useState(
    'Admissions Open for Academic Session 2026–2027. Registration forms available Monday to Friday (10:30 AM to 3:00 PM). Visit school admissions desk for details.'
  );

  const [categories, setCategories] = useState([
    { id: 'all', label: 'All Notices' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'recruitment', label: 'Recruitment' },
    { id: 'academic', label: 'Academic' },
    { id: 'examination', label: 'Examinations' },
    { id: 'events', label: 'Events' },
    { id: 'holidays', label: 'Holidays' }
  ]);

  useEffect(() => {
    // 1. Fetch live notices
    fetch(`${API_BASE}/api/notices`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const formatted = data.map((n) => ({
            id: `live_${n.id}`,
            date: n.notice_date,
            subject: n.title,
            description: n.description,
            hasDownload: Boolean(n.attachment_path),
            attachmentPath: n.attachment_path,
            fileName: n.attachment_name || `${n.title}.pdf`,
            category: n.category || 'admissions'
          }));
          setLiveNotices(formatted);
        } else {
          setLiveNotices([]);
        }
      })
      .catch(() => setLiveNotices([]));

    // 2. Fetch live admission setting banner
    fetch(`${API_BASE}/api/settings/admission_config`)
      .then((res) => res.json())
      .then((cfg) => {
        if (cfg && cfg.headline) {
          setAdmissionsNoticeText(cfg.headline);
        }
      })
      .catch(() => {});

    // 3. Fetch dynamic notice categories from admin settings
    fetch(`${API_BASE}/api/settings/notice_categories`)
      .then((res) => res.json())
      .then((cats) => {
        if (Array.isArray(cats) && cats.length > 0) {
          setCategories([{ id: 'all', label: 'All Notices' }, ...cats]);
        }
      })
      .catch(() => {});
  }, []);

  const handleDownload = (notice) => {
    if (notice.attachmentPath) {
      window.open(`${API_BASE}${notice.attachmentPath}`, '_blank');
      return;
    }

    const content = notice.downloadContent || `=====================================================
THE RABINDRA BHARATI HERITAGE DAY SCHOOL
CBSE AFFILIATED
OFFICIAL CIRCULAR / NOTICE
=====================================================
Date: ${notice.date}
Subject: ${notice.subject}

This is an authentic digital notice published by the Administrative Office of The Rabindra Bharati Heritage Day School.
For further inquiries, contact therabindrabharatihds@gmail.com or call +91 8001271960.
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = notice.fileName || `Notice_${notice.date.replace(/\//g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Strictly display live notices from backend
  const displayedNotices = liveNotices;

  const filteredNotices = displayedNotices.filter((notice) => {
    const noticeCat = (notice.category || '').toLowerCase().trim();
    const activeFilter = filter.toLowerCase().trim();

    const matchesCategory =
      activeFilter === 'all' ||
      noticeCat === activeFilter ||
      (activeFilter === 'examination' && (noticeCat === 'exam' || noticeCat === 'examinations')) ||
      (activeFilter === 'exam' && (noticeCat === 'examination' || noticeCat === 'examinations')) ||
      (activeFilter === 'admissions' && noticeCat === 'admission') ||
      (activeFilter === 'events' && noticeCat === 'event');

    const matchesSearch =
      notice.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.date.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <PageBanner
        title="Official Notices & Circulars"
        subtitle="Up-to-date administrative announcements, recruitment notices, academic schedules, and official bulletins."
        breadcrumbs={[{ label: 'Notice' }]}
      />

      <section className="subpage-content-wrap" style={{ padding: '40px 0 80px' }}>
        <div className="container">
          {/* Important Urgent Notification Alert */}
          <div
            style={{
              background: 'rgba(212, 175, 55, 0.12)',
              border: '1.5px solid var(--gold-primary)',
              borderRadius: '10px',
              padding: '16px 20px',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px'
            }}
          >
            <i className="fa-solid fa-bullhorn" style={{ color: 'var(--gold-dark)', fontSize: '1.4rem' }}></i>
            <div style={{ flexGrow: 1 }}>
              <strong style={{ color: 'var(--navy-primary)' }}>IMPORTANT NOTICE:</strong>{' '}
              <span style={{ color: 'var(--text-dark)' }}>
                {admissionsNoticeText}
              </span>
            </div>
          </div>

          {/* Controls Header: Category Tabs & Search */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '24px'
            }}
          >
            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '24px',
                    border: '1px solid',
                    borderColor: filter === tab.id ? 'var(--gold-primary)' : '#CBD5E1',
                    background: filter === tab.id ? 'var(--navy-primary)' : '#FFFFFF',
                    color: filter === tab.id ? 'var(--gold-light)' : '#334155',
                    fontWeight: 600,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div style={{ position: 'relative', minWidth: '240px' }}>
              <i
                className="fa-solid fa-magnifying-glass"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94A3B8',
                  fontSize: '0.85rem'
                }}
              ></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notices..."
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 34px',
                  borderRadius: '20px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.85rem',
                  outline: 'none',
                  background: '#FFFFFF'
                }}
              />
            </div>
          </div>

          {/* Official School Notice Board Table (Matching User Screenshot) */}
          <div className="school-notice-card-wrap">
            <div className="school-notice-table-container">
              <table className="school-notice-table">
                <thead>
                  <tr>
                    <th className="th-date">Date</th>
                    <th className="th-subject">Subject</th>
                    <th className="th-download">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNotices.length > 0 ? (
                    filteredNotices.map((n) => (
                      <tr key={n.id}>
                        <td className="td-date">{n.date}</td>
                        <td className="td-subject">{n.subject}</td>
                        <td className="td-download">
                          {n.hasDownload ? (
                            <button
                              type="button"
                              className="notice-download-btn-green"
                              onClick={() => handleDownload(n)}
                              title={`Download circular: ${n.subject}`}
                              aria-label={`Download ${n.subject}`}
                            >
                              <i className="fa-solid fa-download"></i>
                            </button>
                          ) : null}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'center', padding: '48px 20px', color: '#64748B' }}>
                        <i className="fa-solid fa-bullhorn" style={{ fontSize: '2rem', color: '#CBD5E1', marginBottom: '14px', display: 'block' }}></i>
                        <strong style={{ fontSize: '1rem', color: '#0B1B3A', display: 'block' }}>
                          No Notices Currently Published
                        </strong>
                        <span style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginTop: '6px' }}>
                          Official administrative circulars, schedules, and notifications will appear here once published from the Admin Portal.
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ textAlign: 'right', fontSize: '0.82rem', color: '#64748B' }}>
            <i className="fa-solid fa-shield-halved" style={{ marginRight: '6px', color: '#D4AF37' }}></i>
            Official digital publications certified by CBSE Affiliated School
          </div>
        </div>
      </section>
    </div>
  );
}
