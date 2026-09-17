import React, { useState } from 'react';
import PageBanner from '../components/PageBanner';
import { Link } from 'react-router-dom';

export default function AcademicsPage() {
  const [activeTab, setActiveTab] = useState('divisions');

  const divisions = [
    {
      title: 'Pre-Primary School (Ages 3–5)',
      badge: 'Early Years',
      desc: 'Play-way methodology, Montessori-inspired sensory exploration, phonics foundation, early numeracy, and emotional socialization.',
      subjects: ['Sensory Exploration', 'Phonics & Early Reading', 'Number Concepts', 'Music & Movement', 'Art & Craft']
    },
    {
      title: 'Primary School (Grades I–V)',
      badge: 'Foundational Stage',
      desc: 'Structured inquiry-based learning developing core bilingual fluency, arithmetic reasoning, environmental awareness, and computer literacy.',
      subjects: ['English Language & Literature', 'Mathematics', 'Environmental Studies / Science', 'Second Language (Bengali / Hindi)', 'Computing & Robotics', 'Physical Education']
    },
    {
      title: 'Middle School (Grades VI–VIII)',
      badge: 'Preparatory Stage',
      desc: 'Transition into rigorous departmentalized academic disciplines. Laboratory experiments, historical research projects, and foreign language options.',
      subjects: ['Physics, Chemistry, Biology', 'Advanced Mathematics', 'History & Civics', 'Geography', 'Third Language (Sanskrit / French)', 'Computer Applications']
    },
    {
      title: 'Senior School (Grades IX–X) - ICSE Board',
      badge: 'Secondary Stage',
      desc: 'Rigorous preparation for CISCE ICSE Board Examinations. Emphasis on deep conceptual clarity, Olympiads, and analytical problem-solving.',
      subjects: ['English (Compulsory)', 'Second Language', 'History, Civics & Geography', 'Science (Physics, Chem, Bio) OR Commercial Studies', 'Mathematics', 'Computer Applications / Art / PE']
    },
    {
      title: 'Senior Secondary (Grades XI–XII) - ISC Board',
      badge: 'Junior College',
      desc: 'Specialized pre-university academic pathways with dedicated faculty mentoring for JEE, NEET, CLAT, CUET, and foreign university admissions.',
      subjects: [
        'Science Stream: Physics, Chemistry, Mathematics, Biology / Computer Science',
        'Commerce Stream: Accounts, Economics, Commerce, Business Studies / Maths',
        'Humanities Stream: Psychology, Political Science, History, Sociology / English Elective'
      ]
    }
  ];

  return (
    <div>
      <PageBanner
        title="Academics & Curriculum"
        subtitle="A continuum of intellectual challenge and nurturing mentorship designed to prepare scholars for premier global universities."
        breadcrumbs={[{ label: 'Academics' }]}
      />

      <section className="subpage-content-wrap">
        <div className="container">
          {/* Navigation Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '40px'
            }}
          >
            {[
              { id: 'divisions', label: 'Academic Divisions' },
              { id: 'methodology', label: 'Pedagogy & Assessment' },
              { id: 'results', label: 'Board Results & Placements' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '30px',
                  border: '1.5px solid',
                  borderColor: activeTab === tab.id ? 'var(--gold-primary)' : 'var(--border-color)',
                  background: activeTab === tab.id ? 'var(--navy-primary)' : '#ffffff',
                  color: activeTab === tab.id ? 'var(--gold-light)' : 'var(--text-dark)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Divisions */}
          {activeTab === 'divisions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {divisions.map((div, idx) => (
                <div key={idx} className="subpage-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-primary)' }}>
                      {div.title}
                    </h3>
                    <span className="badge-admissions-open" style={{ fontSize: '0.8rem', padding: '4px 12px' }}>
                      {div.badge}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    {div.desc}
                  </p>
                  <div>
                    <h5 style={{ fontSize: '0.85rem', color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                      Key Curriculum Elements:
                    </h5>
                    <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {div.subjects.map((sub, sIdx) => (
                        <li
                          key={sIdx}
                          style={{
                            background: 'var(--cream-bg)',
                            padding: '6px 14px',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            color: 'var(--navy-primary)',
                            border: '1px solid var(--border-warm)',
                            fontWeight: 600
                          }}
                        >
                          <i className="fa-solid fa-check" style={{ color: 'var(--gold-primary)', marginRight: '6px' }}></i>
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Pedagogy & Assessment */}
          {activeTab === 'methodology' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="subpage-card">
                <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-primary)', marginBottom: '16px' }}>
                  Pedagogical Framework
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '20px' }}>
                  Our educational philosophy is grounded in experiential inquiry and critical thinking.
                  Rather than passive ingestion of lecture material, students engage in hands-on research,
                  collaborative seminars, peer critique, and Socratic dialogues.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                  <div style={{ background: 'var(--cream-bg)', padding: '20px', borderRadius: '8px' }}>
                    <h5 style={{ color: 'var(--navy-primary)' }}>Continuous Assessment</h5>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                      Regular formative quizzes, project submissions, and practical laboratory journals rather than only high-stakes final exams.
                    </p>
                  </div>
                  <div style={{ background: 'var(--cream-bg)', padding: '20px', borderRadius: '8px' }}>
                    <h5 style={{ color: 'var(--navy-primary)' }}>Remedial & Enrichment Support</h5>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                      Special doubt-clearing clinics after school hours for learners needing reinforcement, and Olympiad problem tracks for advanced minds.
                    </p>
                  </div>
                  <div style={{ background: 'var(--cream-bg)', padding: '20px', borderRadius: '8px' }}>
                    <h5 style={{ color: 'var(--navy-primary)' }}>Parent-Teacher Conferences</h5>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                      Scheduled one-on-one parent conferences every term with granular analytical diagnostic cards highlighting child progress.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Results & Placements */}
          {activeTab === 'results' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="stats-kpi-grid" style={{ marginBottom: '30px' }}>
                <div className="kpi-item">
                  <h4>100%</h4>
                  <p>ICSE & ISC Pass Rate</p>
                </div>
                <div className="kpi-item">
                  <h4>98.4%</h4>
                  <p>Highest School Aggregate</p>
                </div>
                <div className="kpi-item">
                  <h4>64%</h4>
                  <p>Scholars Scoring Above 90%</p>
                </div>
                <div className="kpi-item">
                  <h4>100+</h4>
                  <p>National Olympiad Laurels</p>
                </div>
              </div>

              <div className="subpage-card">
                <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-primary)', marginBottom: '16px' }}>
                  Recent University Matriculations
                </h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
                  Our graduates are routinely admitted into top collegiate institutions worldwide:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                  {[
                    'University of Oxford',
                    'University of Cambridge',
                    'Imperial College London',
                    'Columbia University',
                    'IIT Kharagpur & Bombay',
                    'AIIMS New Delhi',
                    'National Law School (NLSIU)',
                    'St. Stephen’s College',
                    'Presidency University',
                    'NUS Singapore'
                  ].map((univ, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '10px 18px',
                        background: '#ffffff',
                        border: '1.5px solid var(--border-color)',
                        borderRadius: '8px',
                        fontWeight: 600,
                        color: 'var(--navy-primary)',
                        fontSize: '0.9rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                      }}
                    >
                      <i className="fa-solid fa-graduation-cap" style={{ color: 'var(--gold-primary)', marginRight: '8px' }}></i>
                      {univ}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/contact" className="btn-gold" style={{ display: 'inline-flex' }}>
              Apply for Admissions 2025–26 <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
