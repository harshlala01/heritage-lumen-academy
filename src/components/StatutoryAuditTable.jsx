import React, { useState, useEffect } from 'react';

export default function StatutoryAuditTable() {
  const [activeView, setActiveView] = useState('ledger'); // 'ledger' (Image 1) or 'table' (Image 2)
  const [expandedId, setExpandedId] = useState('nursery'); // default expanded or null
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [sessionYear, setSessionYear] = useState('2026-2027');

  const filterOptions = [
    { id: 'all', label: 'ALL GRADES' },
    { id: 'nursery', label: 'NURSERY - UKG' },
    { id: 'primary', label: 'CLASS I TO CLASS IV' },
    { id: 'middle', label: 'CLASS V TO CLASS VIII' },
    { id: 'secondary', label: 'CLASS IX- CLASS X' }
  ];

  const gradeColumns = [
    { id: 'nursery', label: 'Nursery - UKG', stage: 'Early Childhood' },
    { id: 'primary', label: 'Class I to Class IV', stage: 'Primary Stage' },
    { id: 'middle', label: 'Class V to Class VIII', stage: 'Middle Stage' },
    { id: 'secondary', label: 'Class IX- Class X', stage: 'Secondary (CBSE)' }
  ];

  const initialFeeData = [
    {
      slNo: 1,
      particulars: 'Admission Fees',
      refundable: 'Not Refundable',
      tag: 'One-Time Payment',
      amounts: {
        nursery: '5,000',
        primary: '8,000',
        middle: '10,000',
        secondary: '10,000'
      }
    },
    {
      slNo: 2,
      particulars: 'Monthly Fees',
      refundable: 'Not Refundable',
      tag: 'Per Month Tuition',
      amounts: {
        nursery: '1,500',
        primary: '1,700',
        middle: '1,900',
        secondary: '2,100'
      }
    }
  ];

  const [feeData, setFeeData] = useState(initialFeeData);

  // Dynamic fee configuration from backend
  const [apiConfig, setApiConfig] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/settings/fee_structure')
      .then((res) => (res.ok ? res.json() : null))
      .then((cfg) => {
        if (cfg && cfg.admissionFees && cfg.monthlyFees) {
          setApiConfig(cfg);
          if (cfg.session) setSessionYear(cfg.session);
          setFeeData([
            {
              slNo: 1,
              particulars: 'Admission Fees',
              refundable: cfg.refundable || 'Not Refundable',
              tag: 'One-Time Payment',
              amounts: {
                nursery: cfg.admissionFees.nursery || '5,000',
                primary: cfg.admissionFees.primary || '8,000',
                middle: cfg.admissionFees.middle || '10,000',
                secondary: cfg.admissionFees.secondary || '10,000'
              }
            },
            {
              slNo: 2,
              particulars: 'Monthly Fees',
              refundable: cfg.refundable || 'Not Refundable',
              tag: 'Per Month Tuition',
              amounts: {
                nursery: cfg.monthlyFees.nursery || '1,500',
                primary: cfg.monthlyFees.primary || '1,700',
                middle: cfg.monthlyFees.middle || '1,900',
                secondary: cfg.monthlyFees.secondary || '2,100'
              }
            }
          ]);
        }
      })
      .catch(() => {});
  }, []);

  // Exact data from Image 1: Class Division Ledger
  const divisions = [
    {
      id: 'nursery',
      num: '01',
      className: 'Pre-Primary',
      grades: '(Nursery, KG-I, KG-II)',
      age: 'AGES 3–5',
      badge: null,
      desc: 'Tactile Discovery • Early Numeracy • Sensorial Coordination • Language Labs',
      tuitionTerm: '₹18,500 / TERM',
      annualDuesLabel: 'ANNUAL DUES',
      annualDues: '₹14,000',
      annualTotal: '₹88,000',
      admissionFee: apiConfig?.admissionFees?.nursery || '5,000',
      monthlyFee: apiConfig?.monthlyFees?.nursery || '1,500',
      breakdown: [
        { item: 'Admission & Enrolment', cycle: 'One-Time (On Entry)', status: 'Not Refundable', amount: '₹5,000' },
        { item: 'Monthly Tuition (April – March)', cycle: 'Monthly (12 Months)', status: 'Not Refundable', amount: '₹1,500 / mo' },
        { item: 'Academic Curriculum & Term Dues', cycle: 'Quarterly (4 Terms)', status: 'Not Refundable', amount: '₹18,500 / term' },
        { item: 'Early Learning Labs & Activity Materials', cycle: 'Annual Scheduled', status: 'Not Refundable', amount: 'Included in Annual Dues' },
        { item: 'Total Annual Investment (FY Schedule)', cycle: 'Annualized', status: 'Verified Fee', amount: '₹88,000' }
      ]
    },
    {
      id: 'primary',
      num: '02',
      className: 'Primary',
      grades: '(Class I–V)',
      age: 'AGES 6–10',
      badge: null,
      desc: 'Foundational Literacy • Empirical Reasoning • Bilingual Speech • Physical Wellness',
      tuitionTerm: '₹24,000 / TERM',
      annualDuesLabel: 'ANNUAL DUES',
      annualDues: '₹18,000',
      annualTotal: '₹1,14,000',
      admissionFee: apiConfig?.admissionFees?.primary || '8,000',
      monthlyFee: apiConfig?.monthlyFees?.primary || '1,700',
      breakdown: [
        { item: 'Admission & Enrolment', cycle: 'One-Time (On Entry)', status: 'Not Refundable', amount: '₹8,000' },
        { item: 'Monthly Tuition (April – March)', cycle: 'Monthly (12 Months)', status: 'Not Refundable', amount: '₹1,700 / mo' },
        { item: 'Academic Curriculum & Term Dues', cycle: 'Quarterly (4 Terms)', status: 'Not Refundable', amount: '₹24,000 / term' },
        { item: 'Composite STEM Lab & Library Amenities', cycle: 'Annual Scheduled', status: 'Not Refundable', amount: 'Included in Annual Dues' },
        { item: 'Total Annual Investment (FY Schedule)', cycle: 'Annualized', status: 'Verified Fee', amount: '₹1,14,000' }
      ]
    },
    {
      id: 'middle',
      num: '03',
      className: 'Upper Primary',
      grades: '(Class VI–VIII)',
      age: 'AGES 11–13',
      badge: null,
      desc: 'Middle School Rigor • Experimental Laboratories • Computational Thinking • Latin/Sanskrit',
      tuitionTerm: '₹29,500 / TERM',
      annualDuesLabel: 'ANNUAL DUES',
      annualDues: '₹22,000',
      annualTotal: '₹1,40,000',
      admissionFee: apiConfig?.admissionFees?.middle || '10,000',
      monthlyFee: apiConfig?.monthlyFees?.middle || '1,900',
      breakdown: [
        { item: 'Admission & Enrolment', cycle: 'One-Time (On Entry)', status: 'Not Refundable', amount: '₹10,000' },
        { item: 'Monthly Tuition (April – March)', cycle: 'Monthly (12 Months)', status: 'Not Refundable', amount: '₹1,900 / mo' },
        { item: 'Academic Curriculum & Term Dues', cycle: 'Quarterly (4 Terms)', status: 'Not Refundable', amount: '₹29,500 / term' },
        { item: 'Advanced Science Practicals & Robotics', cycle: 'Annual Scheduled', status: 'Not Refundable', amount: 'Included in Annual Dues' },
        { item: 'Total Annual Investment (FY Schedule)', cycle: 'Annualized', status: 'Verified Fee', amount: '₹1,40,000' }
      ]
    },
    {
      id: 'secondary',
      num: '04',
      className: 'Secondary',
      grades: '(Class IX & X)',
      age: 'AGES 14–16',
      badge: { text: 'CBSE BOARD', type: 'cbse' },
      desc: 'Standardized Precision • Board Candidacy • Physics, Chemistry, Biology & Robolab Practicals',
      tuitionTerm: '₹36,000 / TERM',
      annualDuesLabel: 'ANNUAL + BOARD',
      annualDues: '₹34,500',
      annualTotal: '₹1,78,500',
      admissionFee: apiConfig?.admissionFees?.secondary || '10,000',
      monthlyFee: apiConfig?.monthlyFees?.secondary || '2,100',
      breakdown: [
        { item: 'Admission & Enrolment', cycle: 'One-Time (On Entry)', status: 'Not Refundable', amount: '₹10,000' },
        { item: 'Monthly Tuition (April – March)', cycle: 'Monthly (12 Months)', status: 'Not Refundable', amount: '₹2,100 / mo' },
        { item: 'Academic Curriculum & Term Dues', cycle: 'Quarterly (4 Terms)', status: 'Not Refundable', amount: '₹36,000 / term' },
        { item: 'CBSE Board Candidacy & High-Performance Prep', cycle: 'Annual Scheduled', status: 'Not Refundable', amount: 'Included in Board Dues' },
        { item: 'Total Annual Investment (FY Schedule)', cycle: 'Annualized', status: 'Verified Fee', amount: '₹1,78,500' }
      ]
    },
    {
      id: 'senior_secondary',
      num: '05',
      className: 'Senior Secondary',
      grades: '(Class XI & XII)',
      age: 'AGES 16–18',
      badge: { text: 'CBSE STREAM', type: 'stream' },
      desc: 'Pure Science (PCM/PCB) • Commerce & Economics • Humanities & Fine Arts • Pre-University',
      tuitionTerm: '₹42,500 / TERM',
      annualDuesLabel: 'ANNUAL + ADVANCED LABS',
      annualDues: '₹44,000',
      annualTotal: '₹2,14,000',
      admissionFee: '12,000',
      monthlyFee: '2,500',
      breakdown: [
        { item: 'Admission & Enrolment', cycle: 'One-Time (On Entry)', status: 'Not Refundable', amount: '₹12,000' },
        { item: 'Monthly Tuition (April – March)', cycle: 'Monthly (12 Months)', status: 'Not Refundable', amount: '₹2,500 / mo' },
        { item: 'Academic Curriculum & Term Dues', cycle: 'Quarterly (4 Terms)', status: 'Not Refundable', amount: '₹42,500 / term' },
        { item: 'Pre-University & Entrance Coaching Laboratory', cycle: 'Annual Scheduled', status: 'Not Refundable', amount: 'Included in Advanced Labs' },
        { item: 'Total Annual Investment (FY Schedule)', cycle: 'Annualized', status: 'Verified Fee', amount: '₹2,14,000' }
      ]
    }
  ];

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleEnquireScroll = (className) => {
    const el = document.getElementById('enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="class-division-ledger-section" id="fee-structure">
      <div className="container">
        {/* 1. TOP HEADER (CURRICULAR QUADRANTS / Class Division Ledger) */}
        <div className="cdl-header-block">
          <div>
            <span className="cdl-eyebrow">CURRICULAR QUADRANTS</span>
            <h2 className="cdl-main-title">Class Division Ledger</h2>
          </div>

          <div className="cdl-header-right">
            <span className="cdl-annualized-tag">
              ANNUALIZED FY {sessionYear}
            </span>

            {/* View switcher between Ledger (Image 1) and Full Table (Image 2) */}
            <div className="cdl-view-toggle-group">
              <button
                type="button"
                className={`cdl-toggle-btn ${activeView === 'ledger' ? 'active' : ''}`}
                onClick={() => setActiveView('ledger')}
              >
                Ledger Cards
              </button>
              <button
                type="button"
                className={`cdl-toggle-btn ${activeView === 'table' ? 'active' : ''}`}
                onClick={() => setActiveView('table')}
              >
                Full Matrix Table
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* VIEW 1: CLASS DIVISION LEDGER CARDS (MATCHING 1ST IMAGE)       */}
        {/* ============================================================== */}
        {activeView === 'ledger' && (
          <div className="cdl-cards-stack">
            {divisions.map((item) => {
              const isExpanded = expandedId === item.id;

              return (
                <div
                  key={item.id}
                  className={`cdl-card ${isExpanded ? 'is-expanded' : ''}`}
                  onClick={() => toggleExpand(item.id)}
                >
                  {/* MAIN SUMMARY ROW (EXACT 1ST IMAGE LAYOUT) */}
                  <div className="cdl-card-row">
                    {/* Big Serif Number (01, 02, ...) */}
                    <div className="cdl-num-cell">{item.num}</div>

                    {/* Middle Info Block */}
                    <div className="cdl-main-info">
                      <div className="cdl-title-line">
                        <h3 className="cdl-class-title">{item.className}</h3>
                        <span className="cdl-grades-sub">{item.grades}</span>

                        {item.badge && (
                          <span
                            className={`cdl-pill-badge ${
                              item.badge.type === 'cbse' ? 'pill-cbse' : 'pill-stream'
                            }`}
                          >
                            {item.badge.text}
                          </span>
                        )}

                        <span className="cdl-pill-badge pill-age">{item.age}</span>
                      </div>

                      <p className="cdl-desc-text">{item.desc}</p>

                      <div className="cdl-terms-line">
                        <span>TUITION: {item.tuitionTerm}</span>
                        <span className="dot-separator">•</span>
                        <span>{item.annualDuesLabel}: {item.annualDues}</span>
                      </div>
                    </div>

                    {/* Right Side: Annual Total & Circle Arrow */}
                    <div className="cdl-right-cell">
                      <div className="cdl-annual-block">
                        <span className="cdl-annual-label">ANNUAL TOTAL</span>
                        <div className="cdl-annual-amount">{item.annualTotal}</div>
                      </div>

                      <div
                        className="cdl-arrow-button"
                        aria-label={isExpanded ? 'Collapse fee details' : 'View class fee structure'}
                        title={isExpanded ? 'Click to collapse' : 'Click to view fee structure'}
                      >
                        <i className="fa-solid fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>

                  {/* ========================================================== */}
                  {/* EXPANDED CLASS-WISE FEE STRUCTURE DRAWER (SHOWS ON CLICK)  */}
                  {/* ========================================================== */}
                  {isExpanded && (
                    <div
                      className="cdl-drawer"
                      onClick={(e) => e.stopPropagation()} // Prevent closing when interacting inside
                    >
                      <div className="cdl-drawer-header">
                        <div className="cdl-drawer-title-group">
                          <h4>
                            {item.className} {item.grades} — Detailed Fee Structure
                          </h4>
                          <p>
                            Verified Institutional Schedule • Academic Session {sessionYear} • Non-Refundable
                          </p>
                        </div>

                        <span className="fee-badge-nonrefundable">
                          Verified Fee Schedule
                        </span>
                      </div>

                      {/* 4 Summary Highlight Cards for this Class */}
                      <div className="cdl-drawer-kpi-grid">
                        <div className="cdl-kpi-card">
                          <div className="cdl-kpi-card-label">
                            <span>Admission Fees</span>
                            <span className="badge-pill-micro">One-Time</span>
                          </div>
                          <div className="cdl-kpi-card-value">₹{item.admissionFee}</div>
                          <div className="cdl-kpi-card-sub">Payable upon initial enrolment</div>
                        </div>

                        <div className="cdl-kpi-card">
                          <div className="cdl-kpi-card-label">
                            <span>Monthly Fees</span>
                            <span className="badge-pill-micro">12 Cycles</span>
                          </div>
                          <div className="cdl-kpi-card-value">₹{item.monthlyFee} <small style={{ fontSize: '0.8rem', color: '#64748B' }}>/ mo</small></div>
                          <div className="cdl-kpi-card-sub">Per month instructional dues</div>
                        </div>

                        <div className="cdl-kpi-card">
                          <div className="cdl-kpi-card-label">
                            <span>Quarterly Term Tuition</span>
                            <span className="badge-pill-micro">4 Terms</span>
                          </div>
                          <div className="cdl-kpi-card-value">{item.tuitionTerm.replace(' / TERM', '')}</div>
                          <div className="cdl-kpi-card-sub">Quarterly assessment &amp; curriculum</div>
                        </div>

                        <div className="cdl-kpi-card" style={{ borderColor: 'rgba(180, 83, 9, 0.3)', background: '#FFFDF9' }}>
                          <div className="cdl-kpi-card-label">
                            <span style={{ color: '#9A3412' }}>Annualized Commitment</span>
                            <span className="badge-pill-micro" style={{ background: '#FEF3C7', color: '#92400E' }}>Full Cycle</span>
                          </div>
                          <div className="cdl-kpi-card-value" style={{ color: '#9A3412' }}>{item.annualTotal}</div>
                          <div className="cdl-kpi-card-sub">Net scheduled annual investment</div>
                        </div>
                      </div>

                      {/* Detailed Particulars Breakdown Table for this Class */}
                      <div className="cdl-drawer-table-wrap">
                        <table className="cdl-drawer-table">
                          <thead>
                            <tr>
                              <th style={{ width: '45%' }}>Fee Component / Particulars</th>
                              <th style={{ width: '25%' }}>Billing Frequency</th>
                              <th style={{ width: '15%' }}>Policy</th>
                              <th style={{ width: '15%', textAlign: 'right' }}>Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.breakdown.map((row, idx) => (
                              <tr key={idx}>
                                <td style={{ fontWeight: 600 }}>{row.item}</td>
                                <td>{row.cycle}</td>
                                <td>
                                  <span style={{ fontSize: '0.75rem', color: '#64748B', background: '#F1F5F9', padding: '2px 8px', borderRadius: '4px' }}>
                                    {row.status}
                                  </span>
                                </td>
                                <td style={{ textAlign: 'right', fontWeight: 700, color: '#0F172A' }}>
                                  {row.amount}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Drawer Actions */}
                      <div className="cdl-drawer-actions">
                        <button
                          type="button"
                          className="cdl-btn-secondary"
                          onClick={() => {
                            setSelectedGrade(item.id === 'senior_secondary' ? 'secondary' : item.id);
                            setActiveView('table');
                          }}
                        >
                          <i className="fa-solid fa-table-cells"></i> View in Full Matrix Table
                        </button>

                        <button
                          type="button"
                          className="cdl-btn-primary"
                          onClick={() => handleEnquireScroll(item.className)}
                        >
                          <i className="fa-solid fa-paper-plane"></i> Enquire / Apply for {item.className}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: FULL COMPARATIVE TABLE SCHEDULE (MATCHING 2ND IMAGE)   */}
        {/* ============================================================== */}
        {activeView === 'table' && (
          <div className="statutory-audit-table-wrapper" style={{ animation: 'fadeIn 0.25s ease' }}>
            {/* Filter Pills */}
            <div className="audit-filter-wrapper">
              <div className="audit-filter-bar">
                <span className="audit-filter-label">FILTER DIVISION:</span>
                <div className="audit-filter-pills">
                  {filterOptions.map((opt) => {
                    const isActive = selectedGrade === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        className={`audit-pill ${isActive ? 'active' : ''}`}
                        onClick={() => setSelectedGrade(opt.id)}
                        aria-pressed={isActive}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* School Eyebrow & Title */}
            <div className="audit-table-header-block">
              <div>
                <div className="audit-school-eyebrow">HERITAGE DAY SCHOOL</div>
                <h2 className="audit-main-title">Fee structure for the session {sessionYear}</h2>
              </div>
              <span className="audit-subtext">
                All values denominated in Indian Rupees (INR) • Verified Institutional Schedule
              </span>
            </div>

            {/* Official Table */}
            <div className="audit-table-responsive">
              <table className="audit-table official-fee-table">
                <thead>
                  <tr>
                    <th style={{ width: '80px', textAlign: 'center' }}>Sl. No.</th>
                    <th>Fees Particulars</th>
                    <th>Refundable/ Not Refundable</th>
                    {gradeColumns.map((col) => {
                      const isHighlighted = selectedGrade === 'all' || selectedGrade === col.id;
                      return (
                        <th
                          key={col.id}
                          className={selectedGrade === col.id ? 'th-active-grade' : ''}
                          style={{
                            textAlign: 'center',
                            opacity: isHighlighted ? 1 : 0.45,
                            transition: 'opacity 0.2s ease'
                          }}
                        >
                          <div>{col.label}</div>
                          <div className="th-stage-subtext">{col.stage}</div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {feeData.map((row) => (
                    <tr key={row.slNo} className="audit-tr">
                      <td style={{ textAlign: 'center', fontWeight: 700, color: '#0F172A' }}>
                        {row.slNo}
                      </td>

                      <td>
                        <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.96rem' }}>
                          {row.particulars}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                          {row.tag}
                        </div>
                      </td>

                      <td>
                        <span className="fee-badge-nonrefundable">
                          {row.refundable}
                        </span>
                      </td>

                      {gradeColumns.map((col) => {
                        const isHighlighted = selectedGrade === 'all' || selectedGrade === col.id;
                        const amount = row.amounts[col.id];
                        return (
                          <td
                            key={col.id}
                            className={`fee-amount-cell ${selectedGrade === col.id ? 'td-active-grade' : ''}`}
                            style={{
                              textAlign: 'center',
                              opacity: isHighlighted ? 1 : 0.45,
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <span className="fee-currency-symbol">₹</span>
                            <strong className="fee-amount-value">{amount}</strong>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom 4 Summary Cards from Image 2 */}
            <div className="fee-cards-summary-grid">
              {gradeColumns.map((col) => {
                const isMatch = selectedGrade === 'all' || selectedGrade === col.id;
                return (
                  <div
                    key={col.id}
                    className={`fee-summary-card ${selectedGrade === col.id ? 'selected' : ''}`}
                    style={{ opacity: isMatch ? 1 : 0.6 }}
                    onClick={() => setSelectedGrade(col.id)}
                  >
                    <div className="fsc-header">
                      <h4>{col.label}</h4>
                      <span className="fsc-badge">{col.stage}</span>
                    </div>
                    <div className="fsc-row">
                      <span>Admission Fees:</span>
                      <strong>₹{feeData[0].amounts[col.id]}</strong>
                    </div>
                    <div className="fsc-row">
                      <span>Monthly Fees:</span>
                      <strong style={{ color: '#0F172A' }}>₹{feeData[1].amounts[col.id]} / mo</strong>
                    </div>
                    <div className="fsc-status-tag">Not Refundable</div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button
                type="button"
                className="cdl-btn-secondary"
                onClick={() => setActiveView('ledger')}
              >
                <i className="fa-solid fa-arrow-left"></i> Switch back to Class Division Ledger Cards
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
