import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ClassDivisionBanner() {
  const [activeId, setActiveId] = useState(3); // Default to Upper Primary (Active row)

  const divisions = [
    {
      id: 1,
      num: '01',
      className: 'Pre-Primary',
      grades: '(Nursery, KG-I, KG-II)',
      tag: null,
      subBadge: null,
      age: 'Ages 3–5',
      desc: 'Tactile Discovery • Early Numeracy • Sensorial Coordination',
      link: '/academics',
      location: 'MAIN READING QUADRANGLE',
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 2,
      num: '02',
      className: 'Primary',
      grades: '(Class I-V)',
      tag: null,
      subBadge: null,
      age: 'Ages 6–10',
      desc: 'Foundational Literacy & Empirical Reasoning • Bilingual Speech',
      link: '/academics',
      location: 'MAIN READING QUADRANGLE',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 3,
      num: '03',
      className: 'Upper Primary',
      grades: '(Class VI-VIII)',
      tag: null,
      subBadge: null,
      age: 'Ages 11–13',
      desc: 'Middle School Rigor & Experimental Labs • Computational Thinking',
      link: '/academics',
      location: 'MAIN READING QUADRANGLE',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 4,
      num: '04',
      className: 'Secondary',
      grades: '(Class IX & X)',
      tag: { text: 'ICSE', type: 'icse' },
      subBadge: 'Board Examination',
      age: 'Ages 14–16',
      desc: 'Standardized Precision & Board Candidacy • Applied Sciences',
      link: '/academics',
      location: 'STEM & SCIENCE LABS',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 5,
      num: '05',
      className: 'Senior Secondary',
      grades: '(Class XI & XII)',
      tag: { text: 'ISC', type: 'isc' },
      subBadge: 'Pre-University',
      age: 'Ages 16–18',
      desc: 'Pure Science • Commerce & Economics • Humanities & Fine Arts',
      link: '/academics',
      location: 'COLLEGIATE SCHOLARS TOWER',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  const current = divisions.find((d) => d.id === activeId) || divisions[2];

  return (
    <section className="class-division-magazine-section">
      <div className="container">
        {/* Top Header */}
        <div className="cdm-header">
          <div className="cdm-header-left">
            <h2 className="cdm-main-title">Class Division</h2>
            <p className="cdm-subtext">
              A rigorous continuum of developmental stages designed for intellectual depth, ethical stewardship, and collegiate excellence across four distinct academic quadrants.
            </p>
          </div>

          <div className="cdm-header-right">
            <div className="cdm-eyebrow">PEDAGOGICAL FRAMEWORK</div>
            <div className="cdm-meta-stream">ICSE &amp; ISC Stream • Est. 1912</div>
            <div className="cdm-meta-cycle">Institutional Cycle 2025-2026</div>
          </div>
        </div>

        {/* Two Columns Layout (40% Left, 60% Right) */}
        <div className="cdm-grid">
          {/* Left Column (40%) */}
          <div className="cdm-left-col">
            <div className="cdm-image-frame">
              <img 
                src={current.image} 
                alt="Colloquium & Seminar Hall" 
                className="cdm-classroom-img"
              />
              
              {/* Top-left: White pill badge in Navy Blue text */}
              <div className="cdm-badge-quadrangle">
                {current.location}
              </div>

              {/* Bottom-left: Semi-transparent dark overlay */}
              <div className="cdm-dark-overlay">
                <span className="cdm-live-tag">LIVE ENVIRONMENT</span>
                <p className="cdm-quote-statement">
                  Designed for discourse, quiet contemplation, and empirical discovery.
                </p>
              </div>
            </div>

            {/* Below the image: Small grey text + VERIFIED badge */}
            <div className="cdm-figure-caption">
              <span>Fig. 1.0 — Colloquium &amp; Seminar Hall, East Quadrangle • EST. 1912 • Ratio 14:1</span>
              <span className="cdm-verified-tag">VERIFIED</span>
            </div>
          </div>

          {/* Right Column (60%): 5 Rows */}
          <div className="cdm-right-col">
            {divisions.map((row) => {
              const isActive = row.id === activeId;
              return (
                <div
                  key={row.id}
                  className={`cdm-row ${isActive ? 'active' : ''}`}
                  onMouseEnter={() => setActiveId(row.id)}
                  onClick={() => setActiveId(row.id)}
                >
                  {/* Large number 56px serif */}
                  <div className="cdm-row-num">{row.num}</div>

                  {/* Middle content */}
                  <div className="cdm-row-middle">
                    <div className="cdm-row-title-line">
                      <h3 className="cdm-row-name">{row.className}</h3>
                      <span className="cdm-row-grades">{row.grades}</span>

                      {/* Tag for ICSE / ISC */}
                      {row.tag?.type === 'icse' && (
                        <span className="cdm-tag-icse">{row.tag.text}</span>
                      )}
                      {row.tag?.type === 'isc' && (
                        <span className="cdm-tag-isc">{row.tag.text}</span>
                      )}
                      {row.subBadge && (
                        <span className="cdm-sub-badge">{row.subBadge}</span>
                      )}
                    </div>

                    <div className="cdm-row-age-desc">
                      <span className="cdm-age-text">{row.age}</span>
                      <span className="cdm-desc-divider">•</span>
                      <span className="cdm-desc-text">{row.desc}</span>
                    </div>
                  </div>

                  {/* Right side circular arrow button */}
                  <Link
                    to={row.link}
                    className={`cdm-arrow-btn ${isActive ? 'active-btn' : 'inactive-btn'}`}
                    title={`Explore ${row.className}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


