import React, { useState } from 'react';
import PageBanner from '../components/PageBanner';

export default function NoticePage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const officialNotices = [
    {
      id: 'n1',
      date: '23/09/2023',
      subject: 'Teacher recruitment',
      hasDownload: true,
      fileName: 'Teacher_Recruitment_Notice_2023.txt',
      category: 'recruitment',
      downloadContent: `=====================================================
HERITAGE LUMEN PREPARATORY ACADEMY
Affiliated to the CISCE, New Delhi (School Code: WB 339)
OFFICIAL EMPLOYMENT CIRCULAR: TEACHER RECRUITMENT
=====================================================

Notice Date: 23/09/2023
Ref No: HLPA/ADMIN/REC/2023-09

Applications are cordially invited from qualified, experienced, and dedicated teaching professionals for academic appointments across Primary, Middle, and Senior Secondary departments for the upcoming academic session.

VACANCIES:
1. PGT English & Literature (ISC Level)
2. TGT Mathematics & Pure Physics
3. TGT Computer Applications & STEM
4. Primary & Montessori Trained Educators
5. Physical Education & Athletics Coach

ELIGIBILITY CRITERIA:
- Postgraduate / Graduate in relevant discipline with recognized B.Ed.
- Minimum 2–3 years teaching experience in an ICSE / ISC or recognized Board curriculum.
- Excellent command over spoken and written English.
- Proficiency with digital smart-board technology and blended learning methodology.

APPLICATION PROCEDURE:
Eligible candidates may submit their comprehensive CV along with passport-size photographs and attested copies of educational certificates directly to the Principal's Secretariat or via email to: careers@heritagelumen.edu / admin@heritagelumen.edu within 15 days of publication of this notice.

By Order,
Head of Institution / Secretary
Heritage Lumen Preparatory Academy
=====================================================`
    },
    {
      id: 'n2',
      date: '18/09/2023',
      subject: 'New Admissions will commence from 3rd October 2023, onwards. Monday to Friday. Time: 11 am to 3pm. Visit school office for more details.',
      hasDownload: false,
      category: 'admissions'
    },
    {
      id: 'n3',
      date: '18/10/2025',
      subject: 'Admissions Open for Academic Year 2025–2026: Information Brochure, Prospectus & Registration Guidelines for Pre-Primary to Grade XI.',
      hasDownload: true,
      fileName: 'Admissions_2025_2026_Guidelines.txt',
      category: 'admissions',
      downloadContent: `=====================================================
HERITAGE LUMEN PREPARATORY ACADEMY
ADMISSIONS ANNOUNCEMENT 2025–2026
=====================================================
Date: 18/10/2025

Online registration and prospectus issuance for Academic Session 2025–2026 are currently in progress.

Key Highlights:
- Grades Open: Early Years (Kindergarten), Grades I through IX, and Grade XI (Science, Commerce, Humanities).
- Desk Timings: Monday to Friday: 10:30 AM to 3:00 PM.
- Online Form: Accessible under the "APPLY ONLINE" tab on our official website.

Admissions Directorate
Heritage Lumen Preparatory Academy`
    },
    {
      id: 'n4',
      date: '05/11/2025',
      subject: 'ICSE & ISC Board Pre-Board Examination Schedule 2025–26 Timetable & Practical Laboratory Guidelines.',
      hasDownload: true,
      fileName: 'PreBoard_Examination_Schedule_2025.txt',
      category: 'exam',
      downloadContent: `=====================================================
HERITAGE LUMEN PREPARATORY ACADEMY
EXAMINATION SECRETARIAT — PRE-BOARD NOTIFICATION
=====================================================
Date: 05/11/2025
Grades: Class X (ICSE) & Class XII (ISC)

The Pre-Board Examination routine and laboratory practical schedules are formally released. Scholars are instructed to strictly observe reporting times and uniform protocols.`
    },
    {
      id: 'n5',
      date: '12/11/2025',
      subject: 'Annual Science, STEM & Robotics Exhibition 2025: Participation Guidelines & Working Prototype Submission Dates.',
      hasDownload: true,
      fileName: 'STEM_Exhibition_2025_Guidelines.txt',
      category: 'academic'
    },
    {
      id: 'n6',
      date: '20/11/2025',
      subject: 'Winter Carnival & Annual Founders’ Day Celebrations Notice: McAllister Auditorium, Heritage Lumen Campus.',
      hasDownload: true,
      fileName: 'Founders_Day_Gala_2025.txt',
      category: 'events'
    },
    {
      id: 'n7',
      date: '01/12/2025',
      subject: 'Notification of Winter Vacation Schedule & School Re-opening Dates (Dec 24, 2025 to Jan 02, 2026). Normal classes resume Jan 05, 2026.',
      hasDownload: false,
      category: 'holidays'
    },
    {
      id: 'n8',
      date: '10/12/2025',
      subject: 'Merit-Cum-Means Scholarship Aptitude Test Date Announced for Grade IX and Grade XI Entrants.',
      hasDownload: true,
      fileName: 'Scholarship_Aptitude_Test_2026.txt',
      category: 'admissions'
    }
  ];

  const handleDownload = (notice) => {
    const content = notice.downloadContent || `=====================================================
HERITAGE LUMEN PREPARATORY ACADEMY
CISCE AFFILIATED (WB 339)
OFFICIAL CIRCULAR / NOTICE
=====================================================
Date: ${notice.date}
Subject: ${notice.subject}

This is an authentic digital notice published by the Administrative Office of Heritage Lumen Preparatory Academy.
For further inquiries, contact admissions@heritagelumen.edu or call +1 (555) 234-5678.
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

  const filteredNotices = officialNotices.filter((notice) => {
    const matchesCategory = filter === 'all' || notice.category === filter;
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
                New Admissions will commence from 3rd October 2023, onwards. Monday to Friday. Time: 11 am to 3pm. Visit school office for more details.
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
              {[
                { id: 'all', label: 'All Notices' },
                { id: 'recruitment', label: 'Recruitment' },
                { id: 'admissions', label: 'Admissions' },
                { id: 'exam', label: 'Examinations' },
                { id: 'events', label: 'Events' },
                { id: 'holidays', label: 'Holidays' }
              ].map((tab) => (
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
                      <td colSpan="3" style={{ textAlign: 'center', padding: '30px', color: '#64748B' }}>
                        No notices found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ textAlign: 'right', fontSize: '0.82rem', color: '#64748B' }}>
            <i className="fa-solid fa-shield-halved" style={{ marginRight: '6px', color: '#D4AF37' }}></i>
            Official digital publications certified by CISCE Affiliated School Code WB 339
          </div>
        </div>
      </section>
    </div>
  );
}
