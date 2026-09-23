import React, { useState } from 'react';

export default function StatutoryAuditTable() {
  const [selectedGrade, setSelectedGrade] = useState('all');

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

  const feeData = [
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

  return (
    <section className="statutory-audit-section" id="fee-structure">
      <div className="container">
        {/* 1. FILTER DIVISION PILL BAR */}
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

        {/* 2. TABLE HEADER TITLE & SUBTEXT */}
        <div className="audit-table-header-block">
          <div>
            <div className="audit-school-eyebrow">HERITAGE DAY SCHOOL</div>
            <h2 className="audit-main-title">Fee structure for the session 2026-2027</h2>
          </div>
          <span className="audit-subtext">
            All values denominated in Indian Rupees (INR) • Verified Institutional Schedule
          </span>
        </div>

        {/* 3. FEE STRUCTURE TABLE */}
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
                  {/* Sl. No. */}
                  <td style={{ textAlign: 'center', fontWeight: 700, color: '#0F172A' }}>
                    {row.slNo}
                  </td>

                  {/* Fees Particulars */}
                  <td>
                    <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.96rem' }}>
                      {row.particulars}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                      {row.tag}
                    </div>
                  </td>

                  {/* Refundable / Not Refundable */}
                  <td>
                    <span className="fee-badge-nonrefundable">
                      {row.refundable}
                    </span>
                  </td>

                  {/* Grade Amounts */}
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

        {/* 4. GRADE LEVEL QUICK CARDS (HIGHLY READABLE ON MOBILE & DESKTOP) */}
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
      </div>
    </section>
  );
}
