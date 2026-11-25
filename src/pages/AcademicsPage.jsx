import React from 'react';
import PageBanner from '../components/PageBanner';
import RevealTextBlock from '../components/RevealTextBlock';
import { Link } from 'react-router-dom';

export default function AcademicsPage() {

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
      title: 'Secondary School (Grades IX–X) - CBSE Board',
      badge: 'Secondary Stage',
      desc: 'Rigorous preparation for CBSE All-India Secondary School Examinations (AISSE). Emphasis on deep conceptual clarity, Olympiads, and analytical problem-solving.',
      subjects: ['English (Compulsory)', 'Second Language (Hindi / Bengali)', 'Mathematics', 'Science (Physics, Chem, Bio)', 'Social Science (History, Civics, Geography, Economics)', 'Information Technology / AI']
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
          {/* Academic Divisions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {divisions.map((div, idx) => (
              <RevealTextBlock key={idx} className="subpage-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-primary)' }}>
                    {div.title}
                  </h3>
                  <span className="badge-admissions-open" style={{ fontSize: '0.8rem', padding: '4px 12px' }}>
                    {div.badge}
                  </span>
                </div>
                <p className="about-paragraph" style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '20px' }}>
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
              </RevealTextBlock>
            ))}
          </div>

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
